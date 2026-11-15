import { render, screen, fireEvent } from '../../test/test-utils';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/site.config';
import { GiftGrid } from '../GiftGrid';
import { describe, it, expect, vi } from 'vitest';

// Mock server actions
vi.mock('@/app/actions', () => ({
  submitGiftMessage: vi.fn(() => Promise.resolve({ success: true })),
}));

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

/** Adds the first gift and walks to the payment step in the current region. */
function goToPayment() {
  fireEvent.click(screen.getAllByRole('button', { name: /presentear|regalar|gift/i })[0]);
  fireEvent.click(screen.getByText(/(Continuar|Continue)/i));
  fireEvent.change(screen.getByLabelText(/(Nome|Nombre|Name)/i), { target: { value: 'Test' } });
  fireEvent.click(screen.getByText(/(pagamento|pago|payment)/i));
}

describe('GiftGrid Checkout Flow', () => {
  it('adds items to cart and switches to cart view', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    
    // Add first item to cart
    fireEvent.click(presentearBtns[0]);
    
    // Should show cart view title
    expect(screen.getByText(/Carrinho/i)).toBeDefined();
  });

  it('allows going back to grid from cart', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    const addMoreBtn = screen.getByText(/(Adicionar|Agregar)/i);
    fireEvent.click(addMoreBtn);
    
    // Should show grid view title again
    expect(screen.getByText(/(Lista de|Regalos)/i)).toBeDefined();
  });

  it('transitions to Gifter Info step and accepts input', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    const continueBtn = screen.getByText(/(Continuar)/i);
    fireEvent.click(continueBtn);
    
    expect(screen.getAllByText(/Mensagem/i).length).toBeGreaterThan(0);
    
    const nameInput = screen.getByLabelText(/Nome/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.getAttribute('value')).toBe('John Doe');
  });

  it('transitions to Payment Selection step', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    fireEvent.click(screen.getByText(/(Continuar)/i));
    
    const nameInput = screen.getByLabelText(/Nome/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    fireEvent.click(screen.getByText(/(pagamento|pago)/i));
    
    expect(screen.getAllByText(/(Pix|Transferencia)/i).length).toBeGreaterThan(0);
  });

  it('completes purchase via Pix and shows success screen', async () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    fireEvent.click(screen.getByText(/(Continuar)/i));
    
    const nameInput = screen.getByLabelText(/Nome/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    fireEvent.click(screen.getByText(/(pagamento|pago)/i));
    
    // Click Pix option
    const pixOption = screen.getAllByText(/Pix/i)[0];
    fireEvent.click(pixOption);

    // Verify detailed Pix UI
    expect(screen.getByText(/Pix Copia e Cola/i)).toBeDefined();
    // The copy-and-paste code is a real BR Code pointing at the configured Pix key
    const payload = screen.getByText(/^000201.*br\.gov\.bcb\.pix/).textContent || '';
    expect(payload).toContain('alexalarissas21@gmail.com');
    expect(payload).toContain('5303986');
    
    const finishBtn = screen.getByText(/Já realizei/i);
    fireEvent.click(finishBtn);
    
    const successMsgs = await screen.findAllByText(/Confirmado/i);
    expect(successMsgs.length).toBeGreaterThan(0);
    expect(screen.getByText(/John Doe/i)).toBeDefined();
  });

  it('Brazil offers Pix only (no card)', () => {
    render(<GiftGrid />);
    goToPayment();
    expect(screen.getAllByText(/Pagar com Pix/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Cartão|Stripe|Credit Card/i)).toBeNull();
  });

  it('International guests see the UK bank details and no card option', async () => {
    render(<><RegionSwitcher /><GiftGrid /></>);
    fireEvent.click(screen.getByText('to-en'));
    goToPayment();
    const gbp = siteConfig.bankDetails.en.gbp;
    expect(screen.getByText(gbp.sortCode)).toBeDefined();
    expect(screen.getByText(gbp.accountNumber)).toBeDefined();
    expect(screen.queryByText(/Credit Card|Stripe/i)).toBeNull();
    fireEvent.click(screen.getByText(/I have made the transfer/i));
    expect(await screen.findByText(/recorded your gift/i)).toBeDefined();
  });
});
