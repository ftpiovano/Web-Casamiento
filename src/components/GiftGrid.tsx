'use client';

import { useState } from 'react';
import { Section, Typography, Card, Button } from './Base';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CreditCard, Landmark, QrCode, Trash2 } from 'lucide-react';

/**
 * Interface for a gift item.
 */
interface GiftItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * Mock data for the gift registry.
 */
const mockGifts: GiftItem[] = [
  { id: 1, name: 'Jantar Romântico em Buenos Aires', description: 'Um jantar especial para o casal.', price: 500, category: 'Experiência' },
  { id: 2, name: 'Passagens Aéreas', description: 'Ajude-nos a chegar ao nosso destino.', price: 2000, category: 'Viagem' },
  { id: 3, name: 'Hospedagem em Resort', description: 'Uma noite de descanso e luxo.', price: 800, category: 'Viagem' },
  { id: 4, name: 'Passeio de Barco', description: 'Explorando as águas cristalinas.', price: 300, category: 'Experiência' },
  { id: 5, name: 'Jogo de Pratos', description: 'Para nossa nova casa.', price: 250, category: 'Casa' },
  { id: 6, name: 'Cafeteira Espresso', description: 'Para começar o dia bem.', price: 600, category: 'Casa' },
];

type CheckoutStep = 'grid' | 'cart' | 'info' | 'payment' | 'success';

/**
 * Component for displaying the sortable gift registry and checkout flow.
 * @return {JSX.Element} The rendered gift grid or checkout step.
 */
export function GiftGrid() {
  const [step, setStep] = useState<CheckoutStep>('grid');
  const [cart, setCart] = useState<GiftItem[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [gifterInfo, setGifterInfo] = useState({ name: '', note: '' });

  const sortedGifts = [...mockGifts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const addToCart = (item: GiftItem) => {
    setCart((prev) => [...prev, item]);
    setStep('cart');
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  /**
   * Renders the grid of gifts.
   */
  const renderGrid = () => (
    <>
      <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
        <Typography as='h2' className='mb-0'>Lista de Presentes</Typography>
        
        <div className='flex items-center gap-4'>
          <span className='text-sm uppercase tracking-widest text-foreground/40 font-medium'>Ordenar por:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'name')}
            className='bg-background border border-accent/20 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors'
          >
            <option value='name'>Nome</option>
            <option value='price-asc'>Menor Preço</option>
            <option value='price-desc'>Maior Preço</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <AnimatePresence mode='popLayout'>
          {sortedGifts.map((gift) => (
            <motion.div
              key={gift.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className='h-full flex flex-col'>
                <div className='mb-4'>
                  <span className='text-[10px] uppercase tracking-[0.2em] text-primary font-bold bg-primary/10 px-3 py-1 rounded-full'>
                    {gift.category}
                  </span>
                </div>
                <Typography as='h4' className='mb-2'>{gift.name}</Typography>
                <Typography className='text-sm mb-6 flex-grow'>{gift.description}</Typography>
                <div className='flex justify-between items-center mt-auto border-t border-accent/10 pt-6'>
                  <span className='text-xl font-heading text-primary'>
                    R$ {gift.price.toLocaleString('pt-BR')}
                  </span>
                  <Button variant='outline' className='px-6 py-2 text-xs' onClick={() => addToCart(gift)}>
                    Presentear
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );

  /**
   * Renders the cart view.
   */
  const renderCart = () => (
    <div className='max-w-2xl mx-auto w-full'>
      <div className='flex items-center gap-4 mb-8'>
        <button onClick={() => setStep('grid')} className='text-primary hover:opacity-70 transition-opacity'>
          <ArrowLeft size={24} />
        </button>
        <Typography as='h2' className='mb-0'>Meu Carrinho</Typography>
      </div>

      <Card className='mb-8'>
        {cart.length === 0 ? (
          <div className='text-center py-12'>
            <Typography>Seu carrinho está vazio.</Typography>
            <Button variant='outline' onClick={() => setStep('grid')} className='mt-4'>
              Ver lista de presentes
            </Button>
          </div>
        ) : (
          <div className='space-y-6'>
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className='flex justify-between items-center border-b border-accent/10 pb-4 last:border-0 last:pb-0'>
                <div>
                  <Typography className='font-medium mb-0'>{item.name}</Typography>
                  <Typography className='text-xs text-primary'>R$ {item.price.toLocaleString('pt-BR')}</Typography>
                </div>
                <button onClick={() => removeFromCart(index)} className='text-red-400 hover:text-red-600 transition-colors p-2'>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <div className='pt-6 flex justify-between items-center font-heading text-2xl text-primary border-t border-accent/20'>
              <span>Total</span>
              <span>R$ {totalPrice.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        )}
      </Card>

      {cart.length > 0 && (
        <div className='flex flex-col gap-4'>
          <Button onClick={() => setStep('info')} className='w-full py-4'>
            Continuar com a compra
          </Button>
          <Button variant='outline' onClick={() => setStep('grid')} className='w-full'>
            Adicionar mais presentes
          </Button>
        </div>
      )}
    </div>
  );

  /**
   * Renders the gifter info step.
   */
  const renderInfo = () => (
    <div className='max-w-2xl mx-auto w-full'>
      <div className='flex items-center gap-4 mb-8'>
        <button onClick={() => setStep('cart')} className='text-primary hover:opacity-70 transition-opacity'>
          <ArrowLeft size={24} />
        </button>
        <Typography as='h2' className='mb-0'>Sua Mensagem</Typography>
      </div>

      <Card className='mb-8'>
        <form className='space-y-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='gifter-name' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Seu Nome</label>
            <input
              id='gifter-name'
              required
              type='text'
              className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50'
              value={gifterInfo.name}
              onChange={(e) => setGifterInfo({ ...gifterInfo, name: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='gifter-note' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Uma mensagem para o casal</label>
            <textarea
              id='gifter-note'
              className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 min-h-[120px]'
              value={gifterInfo.note}
              onChange={(e) => setGifterInfo({ ...gifterInfo, note: e.target.value })}
            />
          </div>
        </form>
      </Card>

      <Button 
        onClick={() => setStep('payment')} 
        disabled={!gifterInfo.name} 
        className='w-full py-4 disabled:opacity-50'
      >
        Ir para o pagamento
      </Button>
    </div>
  );

  /**
   * Renders the payment selection step.
   */
  const renderPayment = () => (
    <div className='max-w-2xl mx-auto w-full'>
      <div className='flex items-center gap-4 mb-8'>
        <button onClick={() => setStep('info')} className='text-primary hover:opacity-70 transition-opacity'>
          <ArrowLeft size={24} />
        </button>
        <Typography as='h2' className='mb-0'>Pagamento</Typography>
      </div>

      <div className='space-y-4 mb-8'>
        <button className='w-full' onClick={() => setStep('success')}>
          <Card className='flex items-center gap-6 py-6 hover:border-primary/50 transition-colors'>
            <QrCode className='text-primary' size={32} />
            <div className='text-left'>
              <Typography className='font-bold mb-0'>Pagar com Pix</Typography>
              <Typography className='text-xs opacity-60'>Liberação instantânea</Typography>
            </div>
          </Card>
        </button>

        <button className='w-full' onClick={() => setStep('success')}>
          <Card className='flex items-center gap-6 py-6 hover:border-primary/50 transition-colors'>
            <Landmark className='text-primary' size={32} />
            <div className='text-left'>
              <Typography className='font-bold mb-0'>Transferência Bancária</Typography>
              <Typography className='text-xs opacity-60'>DOC ou TED</Typography>
            </div>
          </Card>
        </button>

        <button className='w-full' onClick={() => setStep('success')}>
          <Card className='flex items-center gap-6 py-6 hover:border-primary/50 transition-colors'>
            <CreditCard className='text-primary' size={32} />
            <div className='text-left'>
              <Typography className='font-bold mb-0'>Cartão de Crédito</Typography>
              <Typography className='text-xs opacity-60'>Em até 12x</Typography>
            </div>
          </Card>
        </button>
      </div>

      <div className='bg-primary/5 rounded-xl p-6 border border-primary/10'>
        <Typography className='text-sm mb-2 opacity-60'>Resumo da compra:</Typography>
        <div className='flex justify-between font-heading text-xl text-primary'>
          <span>Total a pagar</span>
          <span>R$ {totalPrice.toLocaleString('pt-BR')}</span>
        </div>
      </div>
    </div>
  );

  /**
   * Renders the success message.
   */
  const renderSuccess = () => (
    <div className='max-w-xl mx-auto text-center py-12'>
      <Card className='bg-primary/5 border-primary/20'>
        <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8'>
          <CreditCard className='text-white' size={40} />
        </div>
        <Typography as='h2' className='text-primary'>Pedido Confirmado!</Typography>
        <Typography>
          Obrigado pelo seu presente, <strong>{gifterInfo.name}</strong>! 
          Suas instruções de pagamento foram enviadas por e-mail (simulação).
        </Typography>
        <Button onClick={() => {
          setCart([]);
          setGifterInfo({ name: '', note: '' });
          setStep('grid');
        }} className='mt-8'>
          Voltar para o site
        </Button>
      </Card>
    </div>
  );

  return (
    <Section id='gifts' className='bg-accent/5 overflow-hidden'>
      <div className='container max-w-5xl mx-auto w-full min-h-[600px] flex flex-col justify-center'>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {step === 'grid' && renderGrid()}
          {step === 'cart' && renderCart()}
          {step === 'info' && renderInfo()}
          {step === 'payment' && renderPayment()}
          {step === 'success' && renderSuccess()}
        </motion.div>
      </div>
    </Section>
  );
}
