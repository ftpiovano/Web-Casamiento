import { render, screen, fireEvent } from '../../test/test-utils';
import { RSVPForm } from '../RSVPForm';
import { Guestbook } from '../Guestbook';
import { describe, it, expect, vi } from 'vitest';
import { findInvite, listInvites, getInviteLink } from '@/app/actions';

// Mock server actions
vi.mock('@/app/actions', () => ({
  submitRSVP: vi.fn(() => Promise.resolve({ success: true })),
  findInvite: vi.fn(),
  listInvites: vi.fn(),
  getInviteLink: vi.fn(),
  submitGuestbookMessage: vi.fn(() => Promise.resolve({ success: true })),
  getGuestbookMessages: vi.fn(() => Promise.resolve({ success: true, data: [] })),
}));

describe('Forms', () => {
  it('shows the personal invitation link when the guest is found', async () => {
    vi.mocked(findInvite).mockResolvedValueOnce({
      success: true, found: true, inviteName: 'Test Guest', url: 'https://assessoriavip.com.br/rsvp/abc',
    });
    render(<RSVPForm />);
    fireEvent.change(screen.getByLabelText(/Seu nome ou telefone/i), { target: { value: 'Test Guest' } });
    fireEvent.click(screen.getByText(/Encontrar meu convite/i));

    const link = await screen.findByRole('link', { name: /Abrir meu convite/i });
    expect(link.getAttribute('href')).toBe('https://assessoriavip.com.br/rsvp/abc');
    expect(screen.queryByLabelText(/E-mail/i)).toBeNull();
  });

  it('falls back to the RSVP form when the guest is not found', async () => {
    vi.mocked(findInvite).mockResolvedValueOnce({ success: true, found: false });
    render(<RSVPForm />);
    expect(screen.queryByLabelText(/E-mail/i)).toBeNull();

    fireEvent.change(screen.getByLabelText(/Seu nome ou telefone/i), { target: { value: 'Nobody Here' } });
    fireEvent.click(screen.getByText(/Encontrar meu convite/i));

    const emailInput = await screen.findByLabelText(/E-mail/i);
    fireEvent.change(screen.getByLabelText(/^Nome Completo$/i), { target: { value: 'Test Guest' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Telefone$/i), { target: { value: '+55 11 99999-9999' } });
    fireEvent.click(screen.getByText(/Enviar Confirmação/i));

    const successMessage = await screen.findByText(/Obrigado/i);
    expect(successMessage).toBeDefined();
  });

  it('filters the full guest list while typing and opens the picked invitation', async () => {
    vi.mocked(listInvites).mockResolvedValueOnce({
      success: true,
      invites: [
        { id: '11111111-1111-1111-1111-111111111111', name: 'Alderi e Mylena', aliases: ['alderi lima', 'mylena saldenha'] },
        { id: '22222222-2222-2222-2222-222222222222', name: 'Tía Dora', aliases: ['tia dora'] },
      ],
    });
    vi.mocked(getInviteLink).mockResolvedValueOnce({ success: true, found: true, inviteName: 'Alderi e Mylena', url: 'https://assessoriavip.com.br/rsvp/xyz' });
    render(<RSVPForm />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect((await screen.findAllByRole('option')).length).toBe(2);

    // matches a guest's full name (alias) and ignores accents/case
    fireEvent.change(input, { target: { value: 'SALDENHA' } });
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(1);
    expect(options[0].textContent).toBe('Alderi e Mylena');

    fireEvent.click(options[0]);
    const link = await screen.findByRole('link', { name: /Abrir meu convite/i });
    expect(link.getAttribute('href')).toBe('https://assessoriavip.com.br/rsvp/xyz');
    expect(getInviteLink).toHaveBeenCalledWith('11111111-1111-1111-1111-111111111111');
  });

  it('shows a message when no name matches', async () => {
    vi.mocked(listInvites).mockResolvedValueOnce({ success: true, invites: [{ id: '33333333-3333-3333-3333-333333333333', name: 'Rafa', aliases: [] }] });
    render(<RSVPForm />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    await screen.findAllByRole('option');
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.queryAllByRole('option').length).toBe(0);
    expect(screen.getByText(/Nenhum nome encontrado/i)).toBeDefined();
  });

  it('renders Guestbook and allows message entry', () => {
    render(<Guestbook />);
    expect(screen.getByPlaceholderText(/Seu Nome/i)).toBeDefined();
    expect(screen.getByText(/Enviar/i)).toBeDefined();
  });
});
