import { render, screen, fireEvent } from '../../test/test-utils';
import { GiftGrid } from '../GiftGrid';
import { describe, it, expect } from 'vitest';

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

  it('completes purchase and shows success screen', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    fireEvent.click(screen.getByText(/(Continuar)/i));
    
    const nameInput = screen.getByLabelText(/Nome/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    fireEvent.click(screen.getByText(/(pagamento|pago)/i));
    
    const finishBtn = screen.getAllByText(/(Pix|realicé|realizei)/i)[0];
    fireEvent.click(finishBtn);
    
    expect(screen.getByText(/Confirmado/i)).toBeDefined();
    expect(screen.getByText(/John Doe/i)).toBeDefined();
  });
});
