'use client';

import { useState, useEffect } from 'react';
import { Section, Typography, Card, Button } from './Base';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CreditCard, Landmark, QrCode, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/site.config';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent, submitGiftMessage } from '@/app/actions';
import { CheckoutForm } from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

type CheckoutStep = 'grid' | 'cart' | 'info' | 'payment' | 'success';

/**
 * Component for displaying the sortable gift registry and checkout flow.
 * @return {JSX.Element} The rendered gift grid or checkout step.
 */
export function GiftGrid() {
  const { config, region } = useLanguage();
  const [step, setStep] = useState<CheckoutStep>('grid');
  const [cart, setCart] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [gifterInfo, setGifterInfo] = useState({ name: '', note: '' });
  const [showStripe, setShowStripe] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [lastPaymentMethod, setLastPaymentMethod] = useState<string | null>(null);

  // Map the centralized gifts to the current region's format
  const localizedGifts = siteConfig.gifts.map((gift) => ({
    id: gift.id,
    emoji: gift.emoji,
    image: gift.image,
    category: (gift.category as any)[region] || gift.category.en,
    name: (gift.localized as any)[region].name,
    description: (gift.localized as any)[region].description,
    price: (gift.localized as any)[region].price,
  }));

  const sortedGifts = [...localizedGifts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const addToCart = (item: any) => {
    setCart((prev) => [...prev, item]);
    setStep('cart');
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const handlePaymentSuccess = async (method: string) => {
    setLastPaymentMethod(method);
    await submitGiftMessage({
      gifterName: gifterInfo.name,
      note: gifterInfo.note,
      amount: totalPrice,
      items: cart.map((item) => item.name),
      paymentMethod: method,
      region: region,
    });
    setStep('success');
  };

  const stripeCurrency = region === 'en' ? 'gbp' : region === 'ar' ? 'ars' : 'brl';

  useEffect(() => {
    if (showStripe && totalPrice > 0) {
      setStripeError(null);
      const initStripe = async () => {
        const result = await createPaymentIntent(totalPrice * 100, stripeCurrency);
        if (result.success && result.clientSecret) {
          setClientSecret(result.clientSecret);
        } else {
          setStripeError(result.error || 'Failed to initialize Stripe');
        }
      };
      initStripe();
    } else if (!showStripe) {
      setClientSecret(null);
      setStripeError(null);
    }
  }, [showStripe, totalPrice, stripeCurrency]);

  /**
   * Renders the grid of gifts.
   */
  const renderGrid = () => (
    <>
      <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
        <Typography as='h2' className='mb-0'>{config.content.giftListTitle}</Typography>
        
        <div className='flex items-center gap-4'>
          <span className='text-sm uppercase tracking-widest text-foreground/40 font-medium'>
            {region === 'br' ? 'Ordenar por:' : region === 'ar' ? 'Ordenar por:' : 'Sort by:'}
          </span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'name')}
            className='bg-background border border-accent/20 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors'
          >
            <option value='name'>{region === 'br' ? 'Nome' : region === 'ar' ? 'Nombre' : 'Name'}</option>
            <option value='price-asc'>{region === 'br' ? 'Menor Preço' : region === 'ar' ? 'Menor Precio' : 'Lowest Price'}</option>
            <option value='price-desc'>{region === 'br' ? 'Maior Preço' : region === 'ar' ? 'Mayor Precio' : 'Highest Price'}</option>
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
              <Card className='h-full flex flex-col overflow-hidden'>
                <div
                  className='relative -mx-8 -mt-8 mb-6 h-32 bg-gradient-to-br from-accent/25 via-primary/5 to-accent/30 flex items-center justify-center overflow-hidden'
                  aria-hidden
                >
                  {gift.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={gift.image}
                      alt=''
                      className='w-full h-full object-cover'
                      loading='lazy'
                    />
                  ) : (
                    <span className='text-6xl leading-none select-none drop-shadow-sm'>
                      {gift.emoji}
                    </span>
                  )}
                </div>
                <div className='mb-4'>
                  <span className='text-[10px] uppercase tracking-[0.2em] text-primary font-bold bg-primary/10 px-3 py-1 rounded-full'>
                    {gift.category}
                  </span>
                </div>
                <Typography as='h4' className='mb-2'>{gift.name}</Typography>
                <Typography className='text-sm mb-6 flex-grow'>{gift.description}</Typography>
                <div className='flex justify-between items-center mt-auto border-t border-accent/10 pt-6'>
                  <span className='text-xl font-heading text-primary'>
                    {config.currencySymbol} {gift.price.toLocaleString(region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US')}
                  </span>
                  <Button variant='outline' className='px-6 py-2 text-xs' onClick={() => addToCart(gift)}>
                    {config.content.giftButton}
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
        <Typography as='h2' className='mb-0'>{config.content.cartTitle}</Typography>
      </div>

      <Card className='mb-8'>
        {cart.length === 0 ? (
          <div className='text-center py-12'>
            <Typography>
              {region === 'br' ? 'Seu carrinho está vazio.' : region === 'ar' ? 'Tu carrito está vacío.' : 'Your cart is empty.'}
            </Typography>
            <Button variant='outline' onClick={() => setStep('grid')} className='mt-4'>
              {config.content.backToSite}
            </Button>
          </div>
        ) : (
          <div className='space-y-6'>
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className='flex justify-between items-center border-b border-accent/10 pb-4 last:border-0 last:pb-0'>
                <div>
                  <Typography className='font-medium mb-0'>{item.name}</Typography>
                  <Typography className='text-xs text-primary'>
                    {config.currencySymbol} {item.price.toLocaleString(region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US')}
                  </Typography>
                </div>
                <button onClick={() => removeFromCart(index)} className='text-red-400 hover:text-red-600 transition-colors p-2'>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <div className='pt-6 flex justify-between items-center font-heading text-2xl text-primary border-t border-accent/20'>
              <span>{region === 'br' ? 'Total' : region === 'ar' ? 'Total' : 'Total'}</span>
              <span>{config.currencySymbol} {totalPrice.toLocaleString(region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US')}</span>
            </div>
          </div>
        )}
      </Card>

      {cart.length > 0 && (
        <div className='flex flex-col gap-4'>
          <Button onClick={() => setStep('info')} className='w-full py-4'>
            {config.content.continueCheckout}
          </Button>
          <Button variant='outline' onClick={() => setStep('grid')} className='w-full'>
            {config.content.addMoreGifts}
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
        <Typography as='h2' className='mb-0'>{config.content.gifterInfoTitle}</Typography>
      </div>

      <Card className='mb-8'>
        <form className='space-y-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='gifter-name' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>
              {region === 'br' ? 'Seu Nome' : region === 'ar' ? 'Tu Nombre' : 'Your Name'}
            </label>
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
            <label htmlFor='gifter-note' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>
              {region === 'br' ? 'Uma mensagem para o casal' : region === 'ar' ? 'Un mensaje para la pareja' : 'A message for the couple'}
            </label>
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
        {region === 'br' ? 'Ir para o pagamento' : region === 'ar' ? 'Ir al pago' : 'Proceed to payment'}
      </Button>
    </div>
  );

  /**
   * Renders the payment selection step.
   */
  const renderPayment = () => {
    if (showStripe) {
      return (
        <div className='max-w-2xl mx-auto w-full'>
          <div className='flex items-center gap-4 mb-8'>
            <button onClick={() => setShowStripe(false)} className='text-primary hover:opacity-70 transition-opacity'>
              <ArrowLeft size={24} />
            </button>
            <Typography as='h2' className='mb-0'>
              {region === 'br' ? 'Cartão de Crédito' : region === 'ar' ? 'Tarjeta de Crédito' : 'Credit Card'}
            </Typography>
          </div>
          
          {stripeError ? (
            <Card className='border-red-200 bg-red-50 text-center py-12'>
              <Typography className='text-red-600 font-bold mb-4 italic uppercase tracking-tighter'>
                {region === 'br' ? 'Erro de Conexão' : region === 'ar' ? 'Error de Conexión' : 'Connection Error'}
              </Typography>
              <Typography className='text-sm mb-8'>{stripeError}</Typography>
              <Button variant='outline' onClick={() => setShowStripe(false)}>
                {region === 'br' ? 'Tentar outro método' : region === 'ar' ? 'Intentar otro método' : 'Try another method'}
              </Button>
            </Card>
          ) : clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <CheckoutForm 
                amount={totalPrice * 100} 
                onSuccess={() => handlePaymentSuccess('Stripe')} 
                onCancel={() => setShowStripe(false)} 
              />
            </Elements>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 gap-4'>
              <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
              <Typography>
                {region === 'br' ? 'Preparando ambiente seguro...' : region === 'ar' ? 'Preparando entorno seguro...' : 'Preparing secure environment...'}
              </Typography>
            </div>
          )}
        </div>
      );
    }

    if (showPix) {
      return (
        <div className='max-w-2xl mx-auto w-full text-center'>
          <div className='flex items-center gap-4 mb-8'>
            <button onClick={() => setShowPix(false)} className='text-primary hover:opacity-70 transition-opacity'>
              <ArrowLeft size={24} />
            </button>
            <Typography as='h2' className='mb-0'>Pagar com Pix</Typography>
          </div>

          <Card className='mb-8 flex flex-col items-center'>
            <div className='w-48 h-48 bg-accent/10 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-accent/30'>
              <QrCode size={120} className='text-primary opacity-40' />
            </div>
            <Typography className='text-sm opacity-60 mb-6'>
              Escaneie o QR Code acima ou copie a chave abaixo para pagar via Pix.
            </Typography>
            
            <div className='w-full bg-accent/5 rounded-lg p-4 flex items-center justify-between border border-accent/10 mb-8'>
              <code className='text-xs font-mono break-all text-left truncate mr-4'>
                00020126580014br.gov.bcb.pix0136sua-chave-pix-aqui-placeholder
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText('sua-chave-pix-aqui-placeholder')}
                className='text-primary text-[10px] uppercase font-bold hover:underline shrink-0'
              >
                Copiar
              </button>
            </div>

            <Button onClick={() => handlePaymentSuccess('Pix')} className='w-full py-4'>
              Já realizei o Pix
            </Button>
          </Card>
        </div>
      );
    }

    return (
      <div className='max-w-2xl mx-auto w-full'>
        <div className='flex items-center gap-4 mb-8'>
          <button onClick={() => setStep('info')} className='text-primary hover:opacity-70 transition-opacity'>
            <ArrowLeft size={24} />
          </button>
          <Typography as='h2' className='mb-0'>
            {config.content.paymentTitle}
          </Typography>
        </div>

        <div className='space-y-4 mb-8'>
          {region === 'br' ? (
            <>
              <button className='w-full' onClick={() => setShowPix(true)}>
                <Card className='flex items-center gap-6 py-6 hover:border-primary/50 transition-colors text-left'>
                  <QrCode className='text-primary' size={32} />
                  <div>
                    <Typography className='font-bold mb-0'>Pagar com Pix</Typography>
                    <Typography className='text-xs opacity-60'>Liberação instantânea</Typography>
                  </div>
                </Card>
              </button>

              <button className='w-full' onClick={() => setShowStripe(true)}>
                <Card className='flex items-center gap-6 py-6 hover:border-primary/50 transition-colors text-left'>
                  <CreditCard className='text-primary' size={32} />
                  <div>
                    <Typography className='font-bold mb-0'>Cartão de Crédito</Typography>
                    <Typography className='text-xs opacity-60'>Seguro via Stripe</Typography>
                  </div>
                </Card>
              </button>
            </>
          ) : region === 'ar' ? (
            <div className='space-y-6'>
              <div className='bg-primary/5 rounded-2xl p-8 border border-primary/20'>
                <div className='flex items-center gap-4 mb-6 text-primary'>
                  <Landmark size={32} />
                  <Typography as='h3' className='mb-0'>Transferencia Bancaria</Typography>
                </div>
                
                <div className='grid md:grid-cols-2 gap-8'>
                  {/* ARS Account */}
                  <div className='space-y-4 text-left border-r border-accent/10 pr-4'>
                    <Typography className='text-xs font-bold uppercase text-primary'>{siteConfig.bankDetails.ar.ars.label}</Typography>
                    <div>
                      <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>Banco</label>
                      <Typography className='text-sm font-medium'>{siteConfig.bankDetails.ar.ars.bank}</Typography>
                    </div>
                    <div>
                      <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>Alias</label>
                      <Typography className='text-sm font-medium'>{siteConfig.bankDetails.ar.ars.alias}</Typography>
                    </div>
                    <div>
                      <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>CBU</label>
                      <Typography className='text-sm font-medium tabular-nums'>{siteConfig.bankDetails.ar.ars.cbu}</Typography>
                    </div>
                  </div>

                  {/* USD Account */}
                  <div className='space-y-4 text-left'>
                    <Typography className='text-xs font-bold uppercase text-primary'>{siteConfig.bankDetails.ar.usd.label}</Typography>
                    <div>
                      <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>Banco</label>
                      <Typography className='text-sm font-medium'>{siteConfig.bankDetails.ar.usd.bank}</Typography>
                    </div>
                    <div>
                      <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>Alias</label>
                      <Typography className='text-sm font-medium'>{siteConfig.bankDetails.ar.usd.alias}</Typography>
                    </div>
                    <div>
                      <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>CBU</label>
                      <Typography className='text-sm font-medium tabular-nums'>{siteConfig.bankDetails.ar.usd.cbu}</Typography>
                    </div>
                  </div>
                </div>
                <div className='mt-6 pt-6 border-t border-accent/10 text-left'>
                  <label className='text-[10px] uppercase tracking-widest font-bold opacity-40'>Titular</label>
                  <Typography className='font-medium'>{siteConfig.bankDetails.ar.ars.holder}</Typography>
                </div>
              </div>

              <Button onClick={() => handlePaymentSuccess('Transferencia AR')} className='w-full py-4'>
                Ya realicé la transferencia
              </Button>
            </div>
          ) : (
            <>
              <button className='w-full' onClick={() => setShowStripe(true)}>
                <Card className='flex items-center gap-6 py-6 hover:border-primary/50 transition-colors text-left'>
                  <CreditCard className='text-primary' size={32} />
                  <div>
                    <Typography className='font-bold mb-0'>Credit Card</Typography>
                    <Typography className='text-xs opacity-60'>Secure via Stripe</Typography>
                  </div>
                </Card>
              </button>
            </>
          )}
        </div>

        <div className='bg-primary/5 rounded-xl p-6 border border-primary/10'>
          <Typography className='text-sm mb-4 opacity-60 uppercase tracking-widest font-bold'>
            {config.content.orderSummary}:
          </Typography>
          <div className='space-y-2 mb-6 border-b border-primary/10 pb-4'>
            {cart.map((item, index) => (
              <div key={`summary-${item.id}-${index}`} className='flex justify-between text-sm'>
                <span className='opacity-80'>{item.name}</span>
                <span className='font-medium'>
                  {config.currencySymbol} {item.price.toLocaleString(region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US')}
                </span>
              </div>
            ))}
          </div>
          <div className='flex justify-between font-heading text-xl text-primary'>
            <span>{config.content.totalLabel}</span>
            <span>{config.currencySymbol} {totalPrice.toLocaleString(region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US')}</span>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders the success message.
   */
  const renderSuccess = () => (
    <div className='max-w-xl mx-auto text-center py-12'>
      <Card className='bg-primary/5 border-primary/20'>
        <div className='w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8'>
          <CreditCard className='text-white' size={40} />
        </div>
        <Typography as='h2' className='text-primary'>
          {config.content.successTitle}
        </Typography>
        <Typography>
          {region === 'br' 
            ? <>Obrigado pelo seu presente, <strong>{gifterInfo.name}</strong>! {lastPaymentMethod === 'Stripe' ? 'Seu pagamento foi processado com sucesso.' : lastPaymentMethod === 'Pix' ? 'Seu Pix foi confirmado. Mal podemos esperar para te ver!' : 'Suas instruções de pagamento foram enviadas por e-mail (simulação).'}</>
            : region === 'ar' 
            ? <>¡Gracias por tu regalo, <strong>{gifterInfo.name}</strong>! {lastPaymentMethod === 'Stripe' ? 'Tu pago ha sido procesado con éxito.' : 'Las instrucciones de pago han sido enviadas por e-mail (simulación).'}</>
            : <>Thank you for your gift, <strong>{gifterInfo.name}</strong>! {lastPaymentMethod === 'Stripe' ? 'Your payment was processed successfully.' : 'Payment instructions have been sent by email (simulation).'}</>
          }
        </Typography>
        <Button onClick={() => {
          setCart([]);
          setGifterInfo({ name: '', note: '' });
          setStep('grid');
          setShowStripe(false);
          setShowPix(false);
          setStripeError(null);
          setLastPaymentMethod(null);
        }} className='mt-8'>
          {config.content.backToSite}
        </Button>
      </Card>
    </div>
  );

  return (
    <Section id='gifts' className='bg-accent/5 overflow-hidden'>
      <div className='container max-w-5xl mx-auto w-full min-h-[600px] flex flex-col justify-center'>
        <motion.div
          key={step + (showStripe ? '-stripe' : '') + region}
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
