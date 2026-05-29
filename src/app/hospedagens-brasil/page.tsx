import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BedDouble, Sparkles } from 'lucide-react';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: `Hospedagens · Brasil 2027 | ${siteConfig.names.bride} & ${siteConfig.names.groom.br}`,
  description:
    'Categorias de quarto reservadas para os convidados no Hotel Ponta de Inhambupe — sexta a domingo.',
};

const NAVY = '#13234d';

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

const formatBrl = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function HospedagensBrasilPage() {
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
          <div className='flex items-start gap-4'>
            <Sparkles
              size={20}
              className='shrink-0 mt-1'
              style={{ color: NAVY }}
            />
            <div>
              <h2 className='font-heading text-xl md:text-2xl mb-3'>
                Como reservar
              </h2>
              <p className='text-foreground/80 leading-relaxed mb-2'>
                As reservas devem ser feitas diretamente com o hotel,
                informando que você é convidado(a) do casamento de{' '}
                <strong>
                  {siteConfig.names.bride} &amp; {siteConfig.names.groom.br}
                </strong>{' '}
                no dia 6 de março de 2027.
              </p>
              <p className='text-xs text-foreground/60 italic'>
                Valores e disponibilidade sujeitos a confirmação pelo hotel.
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
