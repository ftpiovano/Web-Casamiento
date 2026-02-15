import { render, screen, fireEvent } from '../../test/test-utils';
import { GiftGrid } from '../GiftGrid';
import { describe, it, expect, vi } from 'vitest';

// Mock server actions
vi.mock('@/app/actions', () => ({
  createPaymentIntent: vi.fn(() => Promise.resolve({ success: true, clientSecret: 'test_secret' })),
  submitGiftMessage: vi.fn(() => Promise.resolve({ success: true })),
}));

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
    expect(screen.getByText(/Escaneie o QR Code/i)).toBeDefined();
    
    const finishBtn = screen.getByText(/Já realizei/i);
    fireEvent.click(finishBtn);
    
    const successMsg = await screen.findByText(/Confirmado/i);
    expect(successMsg).toBeDefined();
    expect(screen.getByText(/John Doe/i)).toBeDefined();
  });
});
