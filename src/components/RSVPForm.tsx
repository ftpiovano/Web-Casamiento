'use client';

import { useState, useMemo } from 'react';
import { Section, Typography, Card, Button } from './Base';
import { submitRSVP, findInvite, listInvites, getInviteLink } from '@/app/actions';
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
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [allInvites, setAllInvites] = useState<{ id: string; name: string; aliases: string[] }[] | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lookup, setLookup] = useState<{ status: 'idle' | 'found' | 'notfound' | 'error'; inviteName?: string; url?: string }>({ status: 'idle' });
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    email: '',
    phone: '',
  });

  const i18n = {
    br: {
      title: 'Confirmar Presença',
      nameLabel: 'Nome Completo',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefone',
      attendingLabel: 'Você comparecerá?',
      yesOption: 'Sim, com certeza!',
      noOption: 'Infelizmente não',
      submitBtn: 'Enviar Confirmação',
      submittingBtn: 'Enviando...',
      successTitle: 'Obrigado!',
      successText: 'Sua confirmação foi salva com sucesso. Mal podemos esperar para celebrar com você!',
      backBtn: 'Voltar',
      noMatches: 'Nenhum nome encontrado. Tente o telefone ou preencha o formulário.',
      lookupIntro: 'Comece a digitar seu nome e escolha seu convite na lista. Se preferir, digite seu telefone e clique em buscar.',
      lookupLabel: 'Seu nome ou telefone',
      lookupBtn: 'Encontrar meu convite',
      lookupSearching: 'Buscando...',
      foundText: 'Encontramos seu convite!',
      openInvite: 'Abrir meu convite',
      notFoundText: 'Não encontramos seu convite. Confira o nome ou telefone, ou preencha o formulário abaixo.',
      lookupError: 'Não foi possível buscar agora. Tente novamente ou preencha o formulário abaixo.',
    },
    ar: {
      title: 'Confirmar Asistencia',
      nameLabel: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      phoneLabel: 'Teléfono',
      attendingLabel: '¿Asistirás?',
      yesOption: '¡Sí, por supuesto!',
      noOption: 'Lamentablemente no',
      submitBtn: 'Enviar Confirmación',
      submittingBtn: 'Enviando...',
      successTitle: '¡Gracias!',
      successText: 'Tu confirmación ha sido guardada con éxito. ¡No podemos esperar para celebrar con vos!',
      backBtn: 'Volver',
      noMatches: 'No encontramos ese nombre. Probá con el teléfono o completá el formulario.',
      lookupIntro: 'Empezá a escribir tu nombre y elegí tu invitación de la lista. Si preferís, escribí tu teléfono y tocá buscar.',
      lookupLabel: 'Tu nombre o teléfono',
      lookupBtn: 'Encontrar mi invitación',
      lookupSearching: 'Buscando...',
      foundText: '¡Encontramos tu invitación!',
      openInvite: 'Abrir mi invitación',
      notFoundText: 'No encontramos tu invitación. Revisá el nombre o teléfono, o completá el formulario de abajo.',
      lookupError: 'No pudimos buscar ahora. Intentá de nuevo o completá el formulario de abajo.',
    },
    en: {
      title: 'Confirm Attendance',
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      attendingLabel: 'Will you attend?',
      yesOption: 'Yes, definitely!',
      noOption: 'Unfortunately not',
      submitBtn: 'Send Confirmation',
      submittingBtn: 'Sending...',
      successTitle: 'Thank You!',
      successText: 'Your confirmation has been successfully saved. We can\'t wait to celebrate with you!',
      backBtn: 'Back',
      noMatches: 'No names found. Try your phone number or fill in the form.',
      lookupIntro: 'Start typing your name and pick your invitation from the list. If you prefer, type your phone number and press search.',
      lookupLabel: 'Your name or phone',
      lookupBtn: 'Find my invitation',
      lookupSearching: 'Searching...',
      foundText: 'We found your invitation!',
      openInvite: 'Open my invitation',
      notFoundText: 'We could not find your invitation. Check the name or phone, or fill in the form below.',
      lookupError: 'We could not search right now. Try again or fill in the form below.',
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

  /**
   * Looks up the guest's personal invitation link by name or phone.
   * @param {React.FormEvent} e The form event.
   */
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const result = await findInvite(query);
    if (!result.success) {
      setLookup({ status: 'error' });
    } else if (result.found) {
      setLookup({ status: 'found', inviteName: result.inviteName, url: result.url });
    } else {
      setLookup({ status: 'notfound' });
    }
    setIsSearching(false);
  };

  const normalize = (v: string) =>
    v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);

  const matches = useMemo(() => {
    if (!allInvites) return [];
    const tokens = normalize(query);
    if (tokens.length === 0) return allInvites;
    return allInvites.filter((inv) => {
      const hay = normalize(`${inv.name} ${inv.aliases.join(' ')}`).join(' ');
      return tokens.every((tok) => hay.includes(tok));
    });
  }, [allInvites, query]);

  /** Loads the guest list the first time the field is used. */
  const ensureList = async () => {
    setListOpen(true);
    if (allInvites) return;
    const result = await listInvites();
    setAllInvites(result.invites);
    if (!result.success) setLookup({ status: 'error' });
  };

  /**
   * Resolves the personal link of the invite picked from the dropdown.
   * @param {{id: string, name: string}} inv The selected invite.
   */
  const handlePick = async (inv: { id: string; name: string }) => {
    setQuery(inv.name);
    setListOpen(false);
    setActiveIndex(-1);
    setIsSearching(true);
    const result = await getInviteLink(inv.id);
    if (result.found) {
      setLookup({ status: 'found', inviteName: result.inviteName, url: result.url });
    } else {
      setLookup({ status: 'error' });
    }
    setIsSearching(false);
  };

  /**
   * Keyboard support for the dropdown (arrows, Enter, Escape).
   * @param {React.KeyboardEvent} e The key event.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setListOpen(true);
      setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && listOpen && activeIndex >= 0 && matches[activeIndex]) {
      e.preventDefault();
      handlePick(matches[activeIndex]);
    } else if (e.key === 'Escape') {
      setListOpen(false);
    }
  };

  const showFallbackForm = lookup.status === 'notfound' || lookup.status === 'error';

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
      <Card className='max-w-2xl mx-auto mb-8'>
        <form onSubmit={handleLookup} className='space-y-6'>
          <Typography>{t.lookupIntro}</Typography>
          <div className='flex flex-col gap-2 relative'>
            <label htmlFor='rsvp-lookup' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.lookupLabel}</label>
            <input
              id='rsvp-lookup'
              role='combobox'
              aria-expanded={listOpen}
              aria-controls='rsvp-lookup-list'
              aria-autocomplete='list'
              aria-activedescendant={activeIndex >= 0 ? `rsvp-opt-${activeIndex}` : undefined}
              required
              disabled={isSearching}
              type='text'
              autoComplete='off'
              className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors disabled:opacity-50'
              value={query}
              onFocus={ensureList}
              onBlur={() => setTimeout(() => setListOpen(false), 150)}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
                setListOpen(true);
                if (lookup.status !== 'idle') setLookup({ status: 'idle' });
              }}
            />
            {listOpen && allInvites && (
              <ul
                id='rsvp-lookup-list'
                role='listbox'
                className='absolute left-0 right-0 top-full mt-1 z-20 max-h-60 overflow-auto rounded-lg border border-accent/20 bg-background shadow-lg'
              >
                {matches.length === 0 && <li className='px-4 py-3 text-sm text-foreground/60'>{t.noMatches}</li>}
                {matches.map((inv, i) => (
                  <li
                    key={inv.id}
                    id={`rsvp-opt-${i}`}
                    role='option'
                    aria-selected={i === activeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handlePick(inv)}
                    className={`px-4 py-3 cursor-pointer hover:bg-primary/10 ${i === activeIndex ? 'bg-primary/10' : ''}`}
                  >
                    {inv.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type='submit' className='w-full py-4' disabled={isSearching}>
            {isSearching ? t.lookupSearching : t.lookupBtn}
          </Button>
          {lookup.status === 'found' && lookup.url && (
            <div className='text-center space-y-4'>
              <Typography className='text-primary'>{t.foundText}</Typography>
              <a
                href={lookup.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block px-8 py-3 rounded-full font-medium tracking-wide uppercase text-sm bg-primary text-white hover:bg-primary/90 transition-all duration-200'
              >
                {t.openInvite}
              </a>
            </div>
          )}
          {lookup.status === 'notfound' && <p role='status' className='text-sm text-foreground/70'>{t.notFoundText}</p>}
          {lookup.status === 'error' && <p role='alert' className='text-red-500 text-sm'>{t.lookupError}</p>}
        </form>
      </Card>
      {showFallbackForm && (
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
            <div className='flex flex-col gap-2 md:col-span-2'>
              <label htmlFor='rsvp-phone' className='text-xs uppercase tracking-widest font-bold text-foreground/40'>{t.phoneLabel}</label>
              <input
                id='rsvp-phone'
                required
                disabled={isSubmitting}
                type='tel'
                autoComplete='tel'
                className='bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-colors disabled:opacity-50'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <Button type='submit' className='w-full py-4' disabled={isSubmitting}>
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </Button>
        </form>
      </Card>
      )}
    </Section>
  );
}
