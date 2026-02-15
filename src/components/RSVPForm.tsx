'use client';

import { useState } from 'react';
import { Section, Typography, Card, Button } from './Base';
import { submitRSVP } from '@/app/actions';
import { useLanguage } from '@/context/LanguageContext';

/**
 * RSVP form component for guest confirmation with database integration.
 * @return {JSX.Element} The rendered RSVP form.
 */
export function RSVPForm() {
  const { region } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    adults: 1,
    kids: 0,
    email: '',
    notes: '',
  });

  const i18n = {
    br: {
      title: 'Confirmar Presença',
      nameLabel: 'Nome Completo',
      emailLabel: 'E-mail',
      attendingLabel: 'Você comparecerá?',
      yesOption: 'Sim, com certeza!',
      noOption: 'Infelizmente não',
      adultsLabel: 'Adultos',
      kidsLabel: 'Crianças',
      notesLabel: 'Mensagem ou Observações',
      submitBtn: 'Enviar Confirmação',
      submittingBtn: 'Enviando...',
      successTitle: 'Obrigado!',
      successText: 'Sua confirmação foi salva com sucesso. Mal podemos esperar para celebrar com você!',
      backBtn: 'Voltar',
    },
    ar: {
      title: 'Confirmar Asistencia',
      nameLabel: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      attendingLabel: '¿Asistirás?',
      yesOption: '¡Sí, por supuesto!',
      noOption: 'Lamentablemente no',
      adultsLabel: 'Adultos',
      kidsLabel: 'Niños',
      notesLabel: 'Mensaje u Observaciones',
      submitBtn: 'Enviar Confirmación',
      submittingBtn: 'Enviando...',
      successTitle: '¡Gracias!',
      successText: 'Tu confirmación ha sido guardada con éxito. ¡No podemos esperar para celebrar con vos!',
      backBtn: 'Volver',
    },
    en: {
      title: 'Confirm Attendance',
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      attendingLabel: 'Will you attend?',
      yesOption: 'Yes, definitely!',
      noOption: 'Unfortunately not',
      adultsLabel: 'Adults',
      kidsLabel: 'Children',
      notesLabel: 'Message or Notes',
      submitBtn: 'Send Confirmation',
      submittingBtn: 'Sending...',
      successTitle: 'Thank You!',
      successText: 'Your confirmation has been successfully saved. We can\'t wait to celebrate with you!',
      backBtn: 'Back',
    },
  };

  const t = i18n[region] || i18n.en;

  /**
   * Handles RSVP form submission and saves to the database via Server Action.
   * @param {React.FormEvent} e The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const result = await submitRSVP(formData);
    
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Error. Try again.');
    }
    
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <Section id='rsvp' className='bg-background'>
        <Card className='max-w-xl mx-auto text-center py-12'>
          <Typography as='h2' className='text-primary'>{t.successTitle}</Typography>
          <Typography>{t.successText}</Typography>
          <Button onClick={() => setSubmitted(false)} variant='outline' className='mt-8'>{t.backBtn}</Button>
        </Card>
      </Section>
    );
  }

  return (
    <Section id='rsvp' className='bg-background'>
      <Typography as='h2'>{t.title}</Typography>
      <Card className='max-w-2xl mx-auto'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-name' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.nameLabel}</label>
              <input
                id='rsvp-name'
                required
                disabled={isSubmitting}
                type='text'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors disabled:opacity-50'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-email' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.emailLabel}</label>
              <input
                id='rsvp-email'
                required
                disabled={isSubmitting}
                type='email'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors disabled:opacity-50'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.attendingLabel}</label>
            <div className='flex gap-4'>
              <button
                type='button'
                disabled={isSubmitting}
                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                className={`flex-1 py-3 rounded-lg border transition-all disabled:opacity-50 ${formData.attending === 'yes' ? 'bg-primary text-white border-primary' : 'bg-transparent border-accent/20'}`}
              >
                {t.yesOption}
              </button>
              <button
                type='button'
                disabled={isSubmitting}
                onClick={() => setFormData({ ...formData, attending: 'no' })}
                className={`flex-1 py-3 rounded-lg border transition-all disabled:opacity-50 ${formData.attending === 'no' ? 'bg-primary text-white border-primary' : 'bg-transparent border-accent/20'}`}
              >
                {t.noOption}
              </button>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-adults' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.adultsLabel}</label>
              <input
                id='rsvp-adults'
                disabled={isSubmitting}
                type='number'
                min='1'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 disabled:opacity-50'
                value={formData.adults || ''}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value === '' ? 0 : parseInt(e.target.value) })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='rsvp-kids' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.kidsLabel}</label>
              <input
                id='rsvp-kids'
                disabled={isSubmitting}
                type='number'
                min='0'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 disabled:opacity-50'
                value={formData.kids === 0 ? '0' : formData.kids}
                onChange={(e) => setFormData({ ...formData, kids: e.target.value === '' ? 0 : parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='rsvp-notes' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.notesLabel}</label>
            <textarea
              id='rsvp-notes'
              disabled={isSubmitting}
              className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 min-h-[100px] disabled:opacity-50'
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <Button type='submit' className='w-full py-4' disabled={isSubmitting}>
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </Button>
        </form>
      </Card>
    </Section>
  );
}
