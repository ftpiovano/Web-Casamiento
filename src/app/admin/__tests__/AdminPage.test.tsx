import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPage from '../page';
import { describe, it, expect, vi } from 'vitest';

// Mock server actions
vi.mock('@/app/actions', () => ({
  getRSVPs: vi.fn(() => Promise.resolve({ success: true, data: [] })),
  getGiftMessages: vi.fn(() => Promise.resolve({ success: true, data: [] })),
  validateAdminPassword: vi.fn((pw) => Promise.resolve({ success: pw === 'correct' })),
}));

describe('AdminPage', () => {
  it('renders login form initially', () => {
    render(<AdminPage />);
    expect(screen.getByText(/Admin Login/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Senha/i)).toBeDefined();
  });

  it('shows error on wrong password', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<AdminPage />);
    const input = screen.getByPlaceholderText(/Senha/i);
    const button = screen.getByText(/Entrar/i);

    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Senha incorreta');
    });
  });

  it('shows one row per checkout with the latest status, and does not sum unconfirmed Pix', async () => {
    const actions = await import('@/app/actions');
    const A = '11111111-1111-1111-1111-111111111111';
    const B = '22222222-2222-2222-2222-222222222222';
    vi.mocked(actions.getGiftMessages).mockResolvedValueOnce({
      success: true,
      data: [
        // newest first: A confirmed after copying; B only copied
        { id: '3', created_at: '2026-11-17T12:00:00Z', name: 'Ana', items: 'Presente A', amount: 100, region: 'br', payment_method: 'Pix', status: 'pagamento_informado', attempt_id: A, note: '' },
        { id: '2', created_at: '2026-11-17T11:59:00Z', name: 'Bia', items: 'Presente B', amount: 250, region: 'br', payment_method: 'Pix', status: 'pix_copiado', attempt_id: B, note: '' },
        { id: '1', created_at: '2026-11-17T11:58:00Z', name: 'Ana', items: 'Presente A', amount: 100, region: 'br', payment_method: 'Pix', status: 'pix_copiado', attempt_id: A, note: '' },
      ],
    } as never);
    sessionStorage.setItem('admin_pw', 'correct');
    render(<AdminPage />);

    await waitFor(() => expect(screen.getByText('Bia')).toBeDefined());
    expect(screen.getAllByText('Ana').length).toBe(1);               // collapsed
    expect(screen.getByText('Informou pagamento')).toBeDefined();
    expect(screen.getByText('Copiou o Pix')).toBeDefined();
    expect(screen.getByText(/1 copiou o Pix, sem confirmar/i)).toBeDefined();
    // total card + Ana's row = 2; the unconfirmed 250 appears only in Bia's row (not summed); no 350 total
    expect(screen.getAllByText(/R\$\s*100,00/).length).toBe(2);
    expect(screen.getAllByText(/R\$\s*250,00/).length).toBe(1);
    expect(screen.queryByText(/R\$\s*350,00/)).toBeNull();
    sessionStorage.removeItem('admin_pw');
  });
});
