import { render, screen } from '../../test/test-utils';
import { Navbar } from '../Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeDefined();
    expect(screen.getByText(/Couple/i)).toBeDefined();
    expect(screen.getByText(/Ceremony/i)).toBeDefined();
    expect(screen.getByText(/Gift/i)).toBeDefined();
    expect(screen.getByText(/RSVP/i)).toBeDefined();
    expect(screen.getByText(/Messages/i)).toBeDefined();
  });
});
