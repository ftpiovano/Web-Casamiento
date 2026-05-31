import { render, screen, fireEvent } from '../../test/test-utils';
import { GiftGrid } from '../GiftGrid';
import { describe, it, expect } from 'vitest';

describe('GiftGrid', () => {
  it('renders gift items', () => {
    render(<GiftGrid />);
    expect(screen.getByText(/Taxa para a noiva/i)).toBeDefined();
    expect(screen.getByText(/Ir junto com os noivos/i)).toBeDefined();
  });

  it('changes sort order', () => {
    render(<GiftGrid />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'price-asc' } });
    expect(select.value).toBe('price-asc');
  });
});
