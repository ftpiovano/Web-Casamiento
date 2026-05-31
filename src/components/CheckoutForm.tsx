'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Typography } from './Base';
import { useLanguage } from '@/context/LanguageContext';

type Region = 'br' | 'ar' | 'en';

const copy: Record<
  Region,
  {
    cardDetails: string;
    processing: string;
    payLabel: string;
    back: string;
    validationError: string;
    unexpectedError: string;
    currencySymbol: string;
    numberLocale: string;
  }
> = {
  br: {
    cardDetails: 'Detalhes do Cartão',
    processing: 'Processando…',
    payLabel: 'Pagar',
    back: 'Voltar',
    validationError: 'Erro de validação',
    unexpectedError: 'Ocorreu um erro inesperado.',
    currencySymbol: 'R$',
    numberLocale: 'pt-BR',
  },
  ar: {
    cardDetails: 'Detalles de la Tarjeta',
    processing: 'Procesando…',
    payLabel: 'Pagar',
    back: 'Volver',
    validationError: 'Error de validación',
    unexpectedError: 'Ocurrió un error inesperado.',
    currencySymbol: 'R$',
    numberLocale: 'es-AR',
  },
  en: {
    cardDetails: 'Card Details',
    processing: 'Processing…',
    payLabel: 'Pay',
    back: 'Back',
    validationError: 'Validation error',
    unexpectedError: 'Something went wrong.',
    currencySymbol: '£',
    numberLocale: 'en-GB',
  },
};

/**
 * Stripe Checkout Form component for secure card payments.
 * @param {Object} props component properties.
 * @return {JSX.Element} The rendered form.
 */
export function CheckoutForm({ amount, onSuccess, onCancel }: { amount: number, onSuccess: () => void, onCancel: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { region } = useLanguage();
  const t = copy[region];

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
        setMessage(error.message || t.validationError);
      } else {
        setMessage(t.unexpectedError);
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    }

    setIsLoading(false);
  };

  const formattedAmount = (amount / 100).toLocaleString(t.numberLocale);

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='space-y-6'>
      <Typography as='h3' className='text-left mb-4'>{t.cardDetails}</Typography>

      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />

      {message && <div id='payment-message' className='text-red-500 text-sm'>{message}</div>}

      <div className='flex flex-col gap-3 pt-4'>
        <Button
          disabled={isLoading || !stripe || !elements}
          type='submit'
          className='w-full py-4'
        >
          {isLoading ? t.processing : `${t.payLabel} ${t.currencySymbol} ${formattedAmount}`}
        </Button>
        <Button
          variant='outline'
          onClick={onCancel}
          disabled={isLoading}
          className='w-full'
        >
          {t.back}
        </Button>
      </div>
    </form>
  );
}
