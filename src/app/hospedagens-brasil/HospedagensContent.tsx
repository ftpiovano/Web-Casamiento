'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BedDouble, Sparkles, Mail } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { useLanguage } from '@/context/LanguageContext';

const NAVY = '#13234d';

const HOTEL_WHATSAPP_URL = 'https://wa.me/5575999526962';
const HOTEL_EMAIL = 'reservasbaixio@slavierohoteis.com.br';

type Region = 'br' | 'ar' | 'en';

type RoomCopy = { blurb: string };
type Room = {
  id: string;
  name: string;
  priceBrl: number;
  tag: string;
  copy: Record<Region, RoomCopy>;
};

const rooms: Room[] = [
  {
    id: 'luxo-terreo',
    name: 'Quarto Luxo Térreo',
    priceBrl: 1938,
    tag: '01',
    copy: {
      br: { blurb: 'Categoria base do hotel, no térreo, acesso direto ao jardim.' },
      ar: { blurb: 'Categoría base del hotel, en planta baja, con acceso directo al jardín.' },
      en: { blurb: 'The hotel’s base category, ground floor with direct garden access.' },
    },
  },
  {
    id: 'luxo-vista-mar',
    name: 'Quarto Luxo Vista Mar',
    priceBrl: 2142,
    tag: '02',
    copy: {
      br: { blurb: 'Mesmo conforto do Luxo, com vista para o mar pelo andar superior.' },
      ar: { blurb: 'Mismo confort que el Luxo, con vista al mar desde el piso superior.' },
      en: { blurb: 'Same comfort as the Luxo, with sea view from the upper floor.' },
    },
  },
  {
    id: 'suite-master',
    name: 'Suíte Master',
    priceBrl: 2754,
    tag: '03',
    copy: {
      br: { blurb: 'A categoria mais ampla — sala, varanda privativa e o melhor enxoval.' },
      ar: { blurb: 'La categoría más amplia — sala, balcón privado y la mejor amenidad.' },
      en: { blurb: 'The largest category — living room, private balcony, and the best amenities.' },
    },
  },
];

type Copy = {
  backTop: string;
  tag: string;
  title: string;
  subtitle: string;
  intro: {
    lead: string;
    perRoom: string;
    conn1: string;
    arrival: string;
    conn2: string;
    departure: string;
    tail: string;
  };
  categoriesTitle: string;
  optionsLabel: string;
  totalLabel: string;
  howToBookTitle: string;
  howToBookLead: string;
  eventNameLabel: string;
  guestDataIntro: string;
  guestData: string;
  guestDataTail: string;
  whatsappLabel: string;
  emailLabel: string;
  hoursTitle: string;
  monFri: string;
  sat: string;
  sunHol: string;
  closed: string;
  disclaimer: string;
  bonus: string;
  lagoaTitle: string;
  lagoaBody: { lead: string; lagoa: string; tail: string };
  lagoaFrontDesk: string;
  backBottom: string;
  numberLocale: string;
};

const copy: Record<Region, Copy> = {
  br: {
    backTop: 'Voltar ao site',
    tag: 'Hospedagem · Brasil · Mar 2027',
    title: 'Hospedagens',
    subtitle: 'Hotel Boutique & Spa Ponta de Inhambupe',
    intro: {
      lead: 'Reservamos categorias de quarto para os convidados no hotel-sede. Todos os valores abaixo são ',
      perRoom: 'por quarto',
      conn1: ', com ',
      arrival: 'chegada na sexta-feira',
      conn2: ' e ',
      departure: 'saída no domingo',
      tail: ' — duas diárias incluídas.',
    },
    categoriesTitle: 'Categorias disponíveis',
    optionsLabel: 'opções',
    totalLabel: 'Total — sex a dom',
    howToBookTitle: 'Como reservar',
    howToBookLead:
      'As reservas devem ser feitas diretamente com o setor de reservas do hotel pelos canais abaixo. Mencione o nome do evento como ',
    eventNameLabel: '«Casamento Alexa e Francisco»',
    guestDataIntro: ' e envie os dados de cada hóspede: ',
    guestData: 'nome completo, CPF e e-mail',
    guestDataTail: '.',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'E-mail',
    hoursTitle: 'Horário do setor de reservas',
    monFri: 'Segunda a sexta-feira',
    sat: 'Sábados',
    sunHol: 'Domingos e feriados',
    closed: 'fechado',
    disclaimer: 'Valores e disponibilidade sujeitos a confirmação pelo hotel.',
    bonus: 'Um bônus para os convidados',
    lagoaTitle: 'Experiência na Lagoa Azul',
    lagoaBody: {
      lead: 'A sua hospedagem inclui uma pequena experiência na ',
      lagoa: 'Lagoa Azul',
      tail: ', próxima ao hotel — uma das paisagens mais bonitas da região.',
    },
    lagoaFrontDesk:
      'Para mais detalhes (horários e logística), basta falar com a recepção do hotel durante a sua estadia.',
    backBottom: 'Voltar ao site principal',
    numberLocale: 'pt-BR',
  },
  ar: {
    backTop: 'Volver al sitio',
    tag: 'Alojamiento · Brasil · Mar 2027',
    title: 'Alojamiento',
    subtitle: 'Hotel Boutique & Spa Ponta de Inhambupe',
    intro: {
      lead: 'Reservamos categorías de habitación para los invitados en el hotel sede. Todos los valores son ',
      perRoom: 'por habitación',
      conn1: ', con ',
      arrival: 'llegada el viernes',
      conn2: ' y ',
      departure: 'salida el domingo',
      tail: ' — dos noches incluidas.',
    },
    categoriesTitle: 'Categorías disponibles',
    optionsLabel: 'opciones',
    totalLabel: 'Total — vie a dom',
    howToBookTitle: 'Cómo reservar',
    howToBookLead:
      'Las reservas se hacen directamente con el sector de reservas del hotel por los canales de abajo. Mencioná el nombre del evento como ',
    eventNameLabel: '«Casamento Alexa e Francisco»',
    guestDataIntro: ' y enviá los datos de cada huésped: ',
    guestData: 'nombre completo, Pasaporte y correo electrónico',
    guestDataTail: '.',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Correo',
    hoursTitle: 'Horario del sector de reservas',
    monFri: 'Lunes a viernes',
    sat: 'Sábados',
    sunHol: 'Domingos y feriados',
    closed: 'cerrado',
    disclaimer: 'Valores y disponibilidad sujetos a confirmación por el hotel.',
    bonus: 'Un bonus para los invitados',
    lagoaTitle: 'Experiencia en la Lagoa Azul',
    lagoaBody: {
      lead: 'Tu hospedaje incluye una pequeña experiencia en la ',
      lagoa: 'Lagoa Azul',
      tail: ', cerca del hotel — uno de los paisajes más lindos de la región.',
    },
    lagoaFrontDesk:
      'Para más detalles (horarios y logística), hablá con la recepción del hotel durante tu estadía.',
    backBottom: 'Volver al sitio principal',
    numberLocale: 'es-AR',
  },
  en: {
    backTop: 'Back to site',
    tag: 'Accommodations · Brasil · Mar 2027',
    title: 'Accommodations',
    subtitle: 'Hotel Boutique & Spa Ponta de Inhambupe',
    intro: {
      lead: 'We have reserved room categories for our guests at the wedding hotel. All rates below are ',
      perRoom: 'per room',
      conn1: ', with ',
      arrival: 'arrival on Friday',
      conn2: ' and ',
      departure: 'departure on Sunday',
      tail: ' — two nights included.',
    },
    categoriesTitle: 'Available categories',
    optionsLabel: 'options',
    totalLabel: 'Total — Fri to Sun',
    howToBookTitle: 'How to book',
    howToBookLead:
      'Bookings are made directly with the hotel’s reservations team through the channels below. Mention the event name as ',
    eventNameLabel: '«Casamento Alexa e Francisco»',
    guestDataIntro: ' and send each guest’s details: ',
    guestData: 'full name, Passport and e-mail',
    guestDataTail: '.',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'E-mail',
    hoursTitle: 'Reservations desk hours',
    monFri: 'Monday to Friday',
    sat: 'Saturdays',
    sunHol: 'Sundays and holidays',
    closed: 'closed',
    disclaimer: 'Rates and availability subject to confirmation by the hotel.',
    bonus: 'A bonus for our guests',
    lagoaTitle: 'Lagoa Azul experience',
    lagoaBody: {
      lead: 'Your stay includes a small experience at ',
      lagoa: 'Lagoa Azul',
      tail: ', near the hotel — one of the region’s most beautiful landscapes.',
    },
    lagoaFrontDesk:
      'For details (timing and logistics), just speak with the hotel’s front desk during your stay.',
    backBottom: 'Back to the main site',
    numberLocale: 'en-US',
  },
};

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden
    >
      <path d='M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zM12.04 20.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14 0-.31-.02-.48-.02-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.55.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z' />
    </svg>
  );
}

const formatBrl = (v: number, locale: string) =>
  v.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function HospedagensContent() {
  const { region } = useLanguage();
  const t = copy[region];

  return (
    <main className='min-h-screen bg-background text-foreground px-6 py-10 md:py-16'>
      <div className='max-w-5xl mx-auto'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors mb-10'
        >
          <ArrowLeft size={14} />
          {t.backTop}
        </Link>

        <header className='text-center mb-14 md:mb-20'>
          <Image
            src='/branding/wedding-logo.png'
            alt={`${siteConfig.names.bride} & ${siteConfig.names.groom[region]}`}
            width={969}
            height={1279}
            priority
            className='w-28 md:w-36 h-auto mx-auto mb-6 select-none'
          />
          <p className='text-[11px] uppercase tracking-[0.4em] text-primary mb-4'>
            {t.tag}
          </p>
          <h1 className='font-heading text-4xl md:text-5xl leading-tight mb-3'>
            {t.title}
          </h1>
          <p className='text-xs uppercase tracking-[0.3em] text-foreground/50'>
            {t.subtitle}
          </p>
        </header>

        <section className='max-w-2xl mx-auto mb-14 text-center'>
          <p className='text-base md:text-lg leading-relaxed text-foreground/80'>
            {t.intro.lead}
            <strong>{t.intro.perRoom}</strong>
            {t.intro.conn1}
            <strong>{t.intro.arrival}</strong>
            {t.intro.conn2}
            <strong>{t.intro.departure}</strong>
            {t.intro.tail}
          </p>
        </section>

        <section className='mb-16'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              {t.categoriesTitle}
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {rooms.length} {t.optionsLabel}
            </span>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {rooms.map((room) => (
              <article
                key={room.id}
                className='rounded-2xl border bg-background p-6 md:p-7 flex flex-col h-full transition-shadow hover:shadow-md'
                style={{ borderColor: `${NAVY}1f` }}
              >
                <div className='flex items-baseline justify-between mb-4'>
                  <span
                    className='font-heading text-sm tracking-[0.2em]'
                    style={{ color: NAVY }}
                  >
                    {room.tag}
                  </span>
                  <BedDouble size={18} style={{ color: NAVY }} />
                </div>
                <h3 className='font-heading text-2xl leading-tight mb-3'>
                  {room.name}
                </h3>
                <p className='text-sm text-foreground/75 leading-relaxed mb-6 flex-grow'>
                  {room.copy[region].blurb}
                </p>
                <div className='pt-5 border-t border-accent/40'>
                  <p className='text-[10px] uppercase tracking-[0.25em] text-primary mb-1'>
                    {t.totalLabel}
                  </p>
                  <p className='font-heading text-3xl' style={{ color: NAVY }}>
                    R$ {formatBrl(room.priceBrl, t.numberLocale)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className='mb-16 rounded-3xl p-8 md:p-10 border-2'
          style={{ borderColor: NAVY, backgroundColor: `${NAVY}05` }}
        >
          <div className='flex items-start gap-4 mb-6'>
            <Sparkles
              size={20}
              className='shrink-0 mt-1'
              style={{ color: NAVY }}
            />
            <div>
              <h2 className='font-heading text-xl md:text-2xl mb-3'>
                {t.howToBookTitle}
              </h2>
              <p className='text-foreground/80 leading-relaxed mb-4'>
                {t.howToBookLead}
                <strong>{t.eventNameLabel}</strong>
                {t.guestDataIntro}
                <strong>{t.guestData}</strong>
                {t.guestDataTail}
              </p>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 sm:items-stretch sm:justify-start ml-9 mb-7'>
            <a
              href={HOTEL_WHATSAPP_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm uppercase tracking-[0.2em] shadow-[0_6px_20px_-8px_rgba(37,211,102,0.6)] hover:bg-[#1ebe57] transition-all'
            >
              <WhatsAppIcon size={18} />
              {t.whatsappLabel}
            </a>
            <a
              href={`mailto:${HOTEL_EMAIL}`}
              className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm uppercase tracking-[0.2em] hover:bg-foreground/5 transition-colors'
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <Mail size={16} />
              {t.emailLabel}
            </a>
          </div>

          <div
            className='ml-9 pt-6 border-t'
            style={{ borderColor: `${NAVY}1f` }}
          >
            <p
              className='text-[10px] uppercase tracking-[0.3em] mb-3'
              style={{ color: NAVY }}
            >
              {t.hoursTitle}
            </p>
            <ul className='space-y-1.5 text-sm text-foreground/80 max-w-md'>
              <li className='flex justify-between gap-4'>
                <span>{t.monFri}</span>
                <span className='tabular-nums'>08h às 19h</span>
              </li>
              <li className='flex justify-between gap-4'>
                <span>{t.sat}</span>
                <span className='tabular-nums'>08h às 12h</span>
              </li>
              <li className='flex justify-between gap-4'>
                <span>{t.sunHol}</span>
                <span className='italic text-foreground/55'>{t.closed}</span>
              </li>
            </ul>
          </div>

          <p className='text-xs text-foreground/60 italic mt-6 ml-9'>
            {t.disclaimer}
          </p>
        </section>

        <section
          className='mb-16 rounded-3xl overflow-hidden border bg-background'
          style={{ borderColor: `${NAVY}1f` }}
        >
          <div className='grid md:grid-cols-2'>
            <div className='relative aspect-[4/3] md:aspect-auto md:min-h-[320px]'>
              <Image
                src='/branding/lagoa-azul.jpg'
                alt={t.lagoaTitle}
                fill
                sizes='(min-width: 768px) 50vw, 100vw'
                className='object-cover'
              />
            </div>
            <div className='p-7 md:p-10 flex flex-col justify-center'>
              <p
                className='text-[11px] uppercase tracking-[0.35em] mb-3'
                style={{ color: NAVY }}
              >
                {t.bonus}
              </p>
              <h2 className='font-heading text-2xl md:text-3xl mb-4 leading-tight'>
                {t.lagoaTitle}
              </h2>
              <p className='text-foreground/80 leading-relaxed mb-3'>
                {t.lagoaBody.lead}
                <strong>{t.lagoaBody.lagoa}</strong>
                {t.lagoaBody.tail}
              </p>
              <p className='text-sm text-foreground/65 italic'>
                {t.lagoaFrontDesk}
              </p>
            </div>
          </div>
        </section>

        <div className='text-center'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors'
          >
            <ArrowLeft size={14} />
            {t.backBottom}
          </Link>
        </div>
      </div>
    </main>
  );
}
