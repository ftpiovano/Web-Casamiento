import { render, screen } from '../../test/test-utils';
import { EventDetails } from '../EventDetails';
import { describe, it, expect } from 'vitest';

describe('EventDetails', () => {
  it('renders argentina and brasil headings', () => {
    render(<EventDetails />);
    const argentinaElements = screen.getAllByText(/Argentina/i);
    const brasilElements = screen.getAllByText(/Brasil/i);
    
    expect(argentinaElements.length).toBeGreaterThan(0);
    expect(brasilElements.length).toBeGreaterThan(0);
  });

  it('shows the outfit inspiration link only on the Bahia card', () => {
    render(<EventDetails />);
    const links = screen.getAllByRole('link', { name: /Inspirações de Looks/i });
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://pin.it/4DbRqOul1');
    expect(links[0].getAttribute('target')).toBe('_blank');
  });
});
