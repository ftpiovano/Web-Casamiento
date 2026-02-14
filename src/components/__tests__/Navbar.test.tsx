import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeDefined();
    expect(screen.getByText(/The Couple/i)).toBeDefined();
    expect(screen.getByText(/Ceremony/i)).toBeDefined();
    expect(screen.getByText(/Reception/i)).toBeDefined();
    expect(screen.getByText(/Gift List/i)).toBeDefined();
    expect(screen.getByText(/RSVP/i)).toBeDefined();
    expect(screen.getByText(/Messages/i)).toBeDefined();
  });
});
