import { render, screen, fireEvent } from '@testing-library/react';
import { GiftGrid } from '../GiftGrid';
import { describe, it, expect } from 'vitest';

describe('GiftGrid Checkout Flow', () => {
  it('adds items to cart and switches to cart view', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    
    // Add first item to cart
    fireEvent.click(presentearBtns[0]);
    
    // Should show cart view title
    expect(screen.getByText(/Meu Carrinho/i)).toBeDefined();
  });

  it('allows going back to grid from cart', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    const addMoreBtn = screen.getByText(/Adicionar mais presentes/i);
    fireEvent.click(addMoreBtn);
    
    // Should show grid view title again
    expect(screen.getByText(/Lista de Presentes/i)).toBeDefined();
  });

  it('transitions to Gifter Info step and accepts input', () => {
    render(<GiftGrid />);
    const presentearBtns = screen.getAllByText(/Presentear/i);
    fireEvent.click(presentearBtns[0]);
    
    const continueBtn = screen.getByText(/Continuar com a compra/i);
    fireEvent.click(continueBtn);
    
    expect(screen.getByText(/Sua Mensagem/i)).toBeDefined();
    
    const nameInput = screen.getByLabelText(/Seu Nome/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.getAttribute('value')).toBe('John Doe');
  });
});
