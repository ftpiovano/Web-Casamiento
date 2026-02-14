'use client';

import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Typography } from './Base';

/**
 * Stripe Checkout Form component for secure card payments.
 * @param {Object} props component properties.
 * @return {JSX.Element} The rendered form.
 */
export function CheckoutForm({ amount, onSuccess, onCancel }: { amount: number, onSuccess: () => void, onCancel: () => void }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the payment submission to Stripe.
   * @param {React.FormEvent} e The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Erro de validação');
      } else {
        setMessage('Ocorreu um erro inesperado.');
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='space-y-6'>
      <Typography as='h3' className='text-left mb-4'>Detalhes do Cartão</Typography>
      
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
      
      {message && <div id='payment-message' className='text-red-500 text-sm'>{message}</div>}

      <div className='flex flex-col gap-3 pt-4'>
        <Button
          disabled={isLoading || !stripe || !elements}
          type='submit'
          className='w-full py-4'
        >
          {isLoading ? 'Processando...' : `Pagar R$ ${(amount / 100).toLocaleString('pt-BR')}`}
        </Button>
        <Button
          variant='outline'
          onClick={onCancel}
          disabled={isLoading}
          className='w-full'
        >
          Voltar
        </Button>
      </div>
    </form>
  );
}
