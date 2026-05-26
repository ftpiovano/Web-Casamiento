import { render, screen, fireEvent } from '../../test/test-utils';
import { Navbar } from '../Navbar';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Portuguese navigation labels by default (region br)', () => {
    render(<Navbar />);
    expect(screen.getByText('Início')).toBeDefined();
    expect(screen.getByText('O Casal')).toBeDefined();
    expect(screen.getByText('Cerimônia')).toBeDefined();
    expect(screen.getByText('Viagem')).toBeDefined();
    expect(screen.getByText('Lista de Presentes')).toBeDefined();
    expect(screen.getByText('Confirmação')).toBeDefined();
    expect(screen.getByText('Mensagens')).toBeDefined();
  });

  it('switches navigation labels when region changes', () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('The Couple')).toBeDefined();
    expect(screen.getByText('RSVP')).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'AR' }));
    expect(screen.getByText('Inicio')).toBeDefined();
    expect(screen.getByText('La Pareja')).toBeDefined();
    expect(screen.getByText('Confirmación')).toBeDefined();
  });
});
