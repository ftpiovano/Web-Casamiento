'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BedDouble, Sparkles, Mail } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { useLanguage } from '@/context/LanguageContext';

const NAVY = '#13234d';

const HOTEL_WHATSAPP_URL = 'https://wa.me/5575999526962';
const HOTEL_EMAIL = 'reservasbaixio@slavierohoteis.com.br';

type Room = {
  id: string;
  name: string;
  blurb: string;
  priceBrl: number;
  tag: string;
};

const rooms: Room[] = [
  {
    id: 'luxo-terreo',
    name: 'Quarto Luxo Térreo',
    blurb: 'Categoria base do hotel, no térreo, acesso direto ao jardim.',
    priceBrl: 1938,
    tag: '01',
  },
  {
    id: 'luxo-vista-mar',
    name: 'Quarto Luxo Vista Mar',
    blurb: 'Mesmo conforto do Luxo, com vista para o mar pelo andar superior.',
    priceBrl: 2142,
    tag: '02',
  },
  {
    id: 'suite-master',
    name: 'Suíte Master',
    blurb: 'A categoria mais ampla — sala, varanda privativa e o melhor enxoval.',
    priceBrl: 2754,
    tag: '03',
  },
];

const documentLabel: Record<'br' | 'ar' | 'en', string> = {
  br: 'CPF',
  ar: 'Pasaporte',
  en: 'Passport',
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

const formatBrl = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function HospedagensContent() {
  const { region } = useLanguage();
  const docLabel = documentLabel[region];

  return (
    <main className='min-h-screen bg-background text-foreground px-6 py-10 md:py-16'>
      <div className='max-w-5xl mx-auto'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors mb-10'
        >
          <ArrowLeft size={14} />
          Voltar ao site
        </Link>

        <header className='text-center mb-14 md:mb-20'>
          <Image
            src='/branding/wedding-logo.png'
            alt={`${siteConfig.names.bride} & ${siteConfig.names.groom.br}`}
            width={969}
            height={1279}
            priority
            className='w-28 md:w-36 h-auto mx-auto mb-6 select-none'
          />
          <p className='text-[11px] uppercase tracking-[0.4em] text-primary mb-4'>
            Hospedagem · Brasil · Mar 2027
          </p>
          <h1 className='font-heading text-4xl md:text-5xl leading-tight mb-3'>
            Hospedagens
          </h1>
          <p className='text-xs uppercase tracking-[0.3em] text-foreground/50'>
            Hotel Boutique &amp; Spa Ponta de Inhambupe
          </p>
        </header>

        <section className='max-w-2xl mx-auto mb-14 text-center'>
          <p className='text-base md:text-lg leading-relaxed text-foreground/80'>
            Reservamos categorias de quarto para os convidados no hotel-sede.
            Todos os valores abaixo são <strong>por quarto</strong>, com{' '}
            <strong>chegada na sexta-feira</strong> e{' '}
            <strong>saída no domingo</strong> — duas diárias incluídas.
          </p>
        </section>

        <section className='mb-16'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              Categorias disponíveis
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {rooms.length} opções
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
                  {room.blurb}
                </p>
                <div className='pt-5 border-t border-accent/40'>
                  <p className='text-[10px] uppercase tracking-[0.25em] text-primary mb-1'>
                    Total — sex a dom
                  </p>
                  <p className='font-heading text-3xl' style={{ color: NAVY }}>
                    R$ {formatBrl(room.priceBrl)}
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
                Como reservar
              </h2>
              <p className='text-foreground/80 leading-relaxed mb-4'>
                As reservas devem ser feitas diretamente com o setor de
                reservas do hotel pelos canais abaixo. Mencione o nome do
                evento como{' '}
                <strong>«Casamento Alexa e Francisco»</strong> e envie os
                dados de cada hóspede:{' '}
                <strong>nome completo, {docLabel} e e-mail</strong>.
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
              WhatsApp
            </a>
            <a
              href={`mailto:${HOTEL_EMAIL}`}
              className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm uppercase tracking-[0.2em] hover:bg-foreground/5 transition-colors'
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <Mail size={16} />
              E-mail
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
              Horário do setor de reservas
            </p>
            <ul className='space-y-1.5 text-sm text-foreground/80 max-w-md'>
              <li className='flex justify-between gap-4'>
                <span>Segunda a sexta-feira</span>
                <span className='tabular-nums'>08h às 19h</span>
              </li>
              <li className='flex justify-between gap-4'>
                <span>Sábados</span>
                <span className='tabular-nums'>08h às 12h</span>
              </li>
              <li className='flex justify-between gap-4'>
                <span>Domingos e feriados</span>
                <span className='italic text-foreground/55'>fechado</span>
              </li>
            </ul>
          </div>

          <p className='text-xs text-foreground/60 italic mt-6 ml-9'>
            Valores e disponibilidade sujeitos a confirmação pelo hotel.
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
                alt='Lagoa Azul — experiência inclusa para os convidados'
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
                Um bônus para os convidados
              </p>
              <h2 className='font-heading text-2xl md:text-3xl mb-4 leading-tight'>
                Experiência na Lagoa Azul
              </h2>
              <p className='text-foreground/80 leading-relaxed mb-3'>
                A sua hospedagem inclui uma pequena experiência na{' '}
                <strong>Lagoa Azul</strong>, próxima ao hotel — uma das
                paisagens mais bonitas da região.
              </p>
              <p className='text-sm text-foreground/65 italic'>
                Para mais detalhes (horários e logística), basta falar com a
                recepção do hotel durante a sua estadia.
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
            Voltar ao site principal
          </Link>
        </div>
      </div>
    </main>
  );
}
