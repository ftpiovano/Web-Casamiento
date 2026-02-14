import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPage from '../page';
import { describe, it, expect, vi } from 'vitest';

// Mock server actions
vi.mock('@/app/actions', () => ({
  getRSVPs: vi.fn(() => Promise.resolve({ success: true, data: [] })),
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
});
