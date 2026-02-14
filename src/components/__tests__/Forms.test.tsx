import { render, screen, fireEvent } from '@testing-library/react';
import { RSVPForm } from '../RSVPForm';
import { Guestbook } from '../Guestbook';
import { describe, it, expect, vi } from 'vitest';

// Mock server actions
vi.mock('@/app/actions', () => ({
  submitRSVP: vi.fn(() => Promise.resolve({ success: true })),
}));

describe('Forms', () => {
  it('submits RSVP form', async () => {
    render(<RSVPForm />);
    const nameInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const submitBtn = screen.getByText(/Enviar/i);

    fireEvent.change(nameInput, { target: { value: 'Test Guest' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitBtn);

    const successMessage = await screen.findByText(/Obrigado/i);
    expect(successMessage).toBeDefined();
  });

  it('renders Guestbook and allows message entry', () => {
    render(<Guestbook />);
    expect(screen.getByPlaceholderText(/Seu Nome/i)).toBeDefined();
    expect(screen.getByText(/Enviar/i)).toBeDefined();
  });
});
