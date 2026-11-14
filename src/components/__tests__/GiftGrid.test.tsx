import { render, screen, fireEvent } from '../../test/test-utils';
import { GiftGrid } from '../GiftGrid';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/site.config';
import { describe, it, expect } from 'vitest';

function RegionSwitcher() {
  const { setRegion } = useLanguage();
  return (
    <>
      <button onClick={() => setRegion('br')}>to-br</button>
      <button onClick={() => setRegion('ar')}>to-ar</button>
      <button onClick={() => setRegion('en')}>to-en</button>
    </>
  );
}

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

  it('re-prices and re-names cart items when the language changes', () => {
    const gift = siteConfig.gifts[0];
    const fmt = (n: number, loc: string) => n.toLocaleString(loc);
    render(<><RegionSwitcher /><GiftGrid /></>);

    // Add the first gift while in Brazil (BRL)
    fireEvent.click(screen.getAllByRole('button', { name: /adicionar|presentear|escolher|carrinho/i })[0]);
    expect(screen.getAllByText(new RegExp(fmt(gift.localized.br.price, 'pt-BR'))).length).toBeGreaterThan(0);

    // Switch to Argentina: same gift, ARS price and name, no stale BRL values
    fireEvent.click(screen.getByText('to-ar'));
    expect(screen.getAllByText(new RegExp(fmt(gift.localized.ar.price, 'es-AR'))).length).toBeGreaterThan(0);
    expect(screen.getAllByText(gift.localized.ar.name).length).toBeGreaterThan(0);
    expect(screen.queryByText(new RegExp(`\\$\\s${gift.localized.br.price}\\b`))).toBeNull();

    // And to English (GBP)
    fireEvent.click(screen.getByText('to-en'));
    expect(screen.getAllByText(new RegExp(fmt(gift.localized.en.price, 'en-US'))).length).toBeGreaterThan(0);
  });
});
