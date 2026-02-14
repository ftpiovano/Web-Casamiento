'use client';

import { useState } from 'react';
import { Section, Typography, Card, Button } from './Base';

/**
 * RSVP form component for guest confirmation.
 * @return {JSX.Element} The rendered RSVP form.
 */
export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    adults: 1,
    kids: 0,
    email: '',
    notes: '',
  });

  /**
   * Handles RSVP form submission and saves to LocalStorage.
   * @param {React.FormEvent} e The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to LocalStorage
    const existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    localStorage.setItem('wedding_rsvps', JSON.stringify([...existingRSVPs, { ...formData, date: new Date().toISOString() }]));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section id='rsvp' className='bg-background'>
        <Card className='max-w-xl mx-auto text-center py-12'>
          <Typography as='h2' className='text-primary'>Obrigado!</Typography>
          <Typography>Sua confirmação foi salva com sucesso. Mal podemos esperar para celebrar com você!</Typography>
          <Button onClick={() => setSubmitted(false)} variant='outline' className='mt-8'>Voltar</Button>
        </Card>
      </Section>
    );
  }

  return (
    <Section id='rsvp' className='bg-background'>
      <Typography as='h2'>Confirmar Presença</Typography>
      <Card className='max-w-2xl mx-auto'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-name' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Nome Completo</label>
              <input
                id='rsvp-name'
                required
                type='text'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-email' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>E-mail</label>
              <input
                id='rsvp-email'
                required
                type='email'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Você comparecerá?</label>
            <div className='flex gap-4'>
              <button
                type='button'
                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                className={`flex-1 py-3 rounded-lg border transition-all ${formData.attending === 'yes' ? 'bg-primary text-white border-primary' : 'bg-transparent border-accent/20'}`}
              >
                Sim, com certeza!
              </button>
              <button
                type='button'
                onClick={() => setFormData({ ...formData, attending: 'no' })}
                className={`flex-1 py-3 rounded-lg border transition-all ${formData.attending === 'no' ? 'bg-primary text-white border-primary' : 'bg-transparent border-accent/20'}`}
              >
                Infelizmente não
              </button>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-adults' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Adultos</label>
              <input
                id='rsvp-adults'
                type='number'
                min='1'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50'
                value={formData.adults || ''}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value === '' ? 0 : parseInt(e.target.value) })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-kids' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Crianças</label>
              <input
                id='rsvp-kids'
                type='number'
                min='0'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50'
                value={formData.kids === 0 ? '0' : formData.kids}
                onChange={(e) => setFormData({ ...formData, kids: e.target.value === '' ? 0 : parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='rsvp-notes' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>Mensagem ou Observações</label>
            <textarea
              id='rsvp-notes'
              className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 min-h-[100px]'
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <Button type='submit' className='w-full py-4'>Enviar Confirmação</Button>
        </form>
      </Card>
    </Section>
  );
}
