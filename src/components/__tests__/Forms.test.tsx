import { render, screen, fireEvent } from '@testing-library/react';
import { RSVPForm } from '../RSVPForm';
import { Guestbook } from '../Guestbook';
import { describe, it, expect } from 'vitest';

describe('Forms', () => {
  it('submits RSVP form', () => {
    render(<RSVPForm />);
    const nameInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const submitBtn = screen.getByText(/Enviar/i);

    fireEvent.change(nameInput, { target: { value: 'Test Guest' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Obrigado/i)).toBeDefined();
  });

  it('renders Guestbook and allows message entry', () => {
    render(<Guestbook />);
    expect(screen.getByPlaceholderText(/Seu Nome/i)).toBeDefined();
    expect(screen.getByText(/Enviar/i)).toBeDefined();
  });
});
