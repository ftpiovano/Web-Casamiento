import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Plane, Check } from 'lucide-react';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: `Paquetes de Vuelo · Brasil 2027 | ${siteConfig.names.bride} & ${siteConfig.names.groom.ar}`,
  description:
    'Opciones de vuelo grupal Buenos Aires ↔ Salvador de Bahía para nuestra boda — marzo 2027.',
};

const AGENCY_PHONE_DISPLAY = '+54 9 11 6963-0806';
const AGENCY_WHATSAPP_URL = 'https://wa.me/5491169630806';
const DESPEGAR_URL =
  'https://www.despegar.com.ar/shop/flights/results/roundtrip/BUE/SSA/2027-03-04/2027-03-14/1/0/0?from=SB&di=1&currency=USD';

const NAVY = '#13234d';
const IDA_BLUE = '#7aa8ff';
const VUELTA_GREEN = '#7be0a9';

type FlightLeg = {
  kind: 'ida' | 'vuelta';
  route: string; // e.g. "AEP → SSA"
  type: string; // e.g. "directo"
  dateLabel: string;
  fromTime: string;
  toTime: string;
  airline: string;
};

type TripPackage = {
  id: number;
  tag?: string;
  legs: FlightLeg[];
  adultUsd: number;
  childUsd: number;
};

const packages: TripPackage[] = [
  {
    id: 1,
    legs: [
      {
        kind: 'ida',
        route: 'AEP → SSA',
        type: 'directo',
        dateLabel: 'Jueves 4 mar 2027',
        fromTime: '19:10',
        toTime: '23:30',
        airline: 'Aerolíneas Argentinas',
      },
      {
        kind: 'vuelta',
        route: 'SSA → AEP',
        type: 'directo',
        dateLabel: 'Lunes 8 mar 2027',
        fromTime: '00:30',
        toTime: '05:00',
        airline: 'Aerolíneas Argentinas',
      },
    ],
    adultUsd: 795,
    childUsd: 627,
  },
  {
    id: 2,
    tag: 'Más días',
    legs: [
      {
        kind: 'ida',
        route: 'AEP → SSA',
        type: 'directo',
        dateLabel: 'Jueves 4 mar 2027',
        fromTime: '19:10',
        toTime: '23:30',
        airline: 'Aerolíneas Argentinas',
      },
      {
        kind: 'vuelta',
        route: 'SSA → AEP',
        type: 'directo',
        dateLabel: 'Sábado 13 mar 2027',
        fromTime: '15:10',
        toTime: '20:05',
        airline: 'Gol',
      },
    ],
    adultUsd: 652,
    childUsd: 568,
  },
];

type Inclusion = { icon: string; label: string };
const inclusions: Inclusion[] = [
  { icon: '🎁', label: 'Kit de bienvenida de regalo' },
  { icon: '📋', label: 'Check-in incluido' },
  { icon: '🔄', label: 'Soporte ante cambios' },
  { icon: '🎒', label: 'Carry on + mochila' },
];

export default function VuelosBrasilPage() {
  return (
    <main className='min-h-screen bg-background text-foreground px-6 py-10 md:py-16'>
      <div className='max-w-5xl mx-auto'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors mb-10'
        >
          <ArrowLeft size={14} />
          Volver al sitio
        </Link>

        <header className='text-center mb-14 md:mb-20'>
          <Image
            src='/branding/wedding-logo.png'
            alt={`${siteConfig.names.bride} & ${siteConfig.names.groom.ar}`}
            width={969}
            height={1279}
            priority
            className='w-28 md:w-36 h-auto mx-auto mb-6 select-none'
          />
          <p className='text-[11px] uppercase tracking-[0.4em] text-primary mb-4'>
            Boda · Brasil · Marzo 2027
          </p>
          <h1 className='font-heading text-4xl md:text-5xl leading-tight mb-3'>
            Paquetes de Vuelo
          </h1>
          <div className='inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/50'>
            <span>Buenos Aires</span>
            <Plane size={14} className='text-primary/70' />
            <span>Salvador de Bahía</span>
          </div>
        </header>

        <section className='max-w-2xl mx-auto mb-12 text-center'>
          <p className='text-base md:text-lg leading-relaxed text-foreground/80'>
            ¡Hola! 😊 Estamos organizando el viaje a Brasil 2027 con motivo de
            nuestra boda y como no queremos que faltes, te sugerimos las
            opciones del viaje grupal.
          </p>
        </section>

        <section className='mb-20'>
          <div
            className='rounded-3xl overflow-hidden border-2 shadow-sm'
            style={{ borderColor: NAVY }}
          >
            <div
              className='p-7 md:p-10'
              style={{ backgroundColor: NAVY }}
            >
              <p className='text-[10px] uppercase tracking-[0.35em] text-background/70 mb-3'>
                Te recomendamos
              </p>
              <h2 className='font-heading text-2xl md:text-3xl text-background mb-4 leading-tight'>
                Reservar con la agencia
              </h2>
              <p className='text-background/85 leading-relaxed mb-7 max-w-2xl'>
                La empresa organizadora del viaje grupal te ofrece{' '}
                <strong className='text-background'>varias formas de pago</strong>
                . Elegí la que mejor se acomode a vos:
              </p>
              <ul className='space-y-2.5 mb-8'>
                {[
                  <>
                    6 cuotas mensuales con financiación propia (anticipo
                    en junio + cuotas hasta diciembre,{' '}
                    <strong className='text-background'>
                      sin tarjeta de crédito
                    </strong>
                    )
                  </>,
                  'Pago con tarjeta de crédito',
                  'Pago de contado',
                  'La agencia coordina todo el viaje grupal',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className='flex items-start gap-3 text-background/85'
                  >
                    <Check
                      size={16}
                      className='mt-1 shrink-0 text-background/60'
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={AGENCY_WHATSAPP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-background text-foreground text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-opacity'
              >
                <WhatsAppIcon size={15} />
                Escribir por WhatsApp
              </a>
            </div>

            <div
              className='px-7 md:px-10 py-6 bg-background'
              style={{ borderTop: `1px solid ${NAVY}1f` }}
            >
              <p className='text-sm md:text-base text-foreground/75 leading-relaxed mb-3'>
                ¿Preferís sacar el vuelo por tu cuenta y manejarlo a tu manera?
                Podés comprarlo directamente en Despegar — te dejamos la
                búsqueda con todas las fechas ya configuradas.
              </p>
              <a
                href={DESPEGAR_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium hover:opacity-80 transition-opacity'
                style={{ color: NAVY }}
              >
                Ver en Despegar
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className='mb-16'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              Opciones de viaje
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {packages.length} opciones
            </span>
          </div>

          <div className='space-y-6'>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <p className='text-xs md:text-sm text-foreground/60 italic mt-5 max-w-3xl'>
            Precios por pasajero, incluyen ida + vuelta. Sujetos a
            disponibilidad y confirmación por la agencia.
          </p>
        </section>

        <section className='mb-16'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>Lo que incluye</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              En ambos paquetes
            </span>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {inclusions.map((inc) => (
              <div
                key={inc.label}
                className='rounded-2xl p-5 flex flex-col items-start gap-3'
                style={{ backgroundColor: NAVY }}
              >
                <span className='text-3xl leading-none select-none' aria-hidden>
                  {inc.icon}
                </span>
                <p className='text-sm text-background/90 leading-snug font-medium'>
                  {inc.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className='mb-12 text-center'>
          <p className='text-sm md:text-base text-foreground/70 mb-5 max-w-lg mx-auto'>
            Para coordinar tu viaje, escribile a la agencia organizadora del
            viaje por WhatsApp:
          </p>
          <a
            href={AGENCY_WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#25D366] text-white text-base md:text-lg font-medium shadow-[0_6px_20px_-8px_rgba(37,211,102,0.6)] hover:bg-[#1ebe57] hover:shadow-[0_8px_24px_-6px_rgba(37,211,102,0.7)] transition-all'
            aria-label={`Contactar a la agencia por WhatsApp (${AGENCY_PHONE_DISPLAY})`}
          >
            <WhatsAppIcon size={22} />
            Contactá la agencia
          </a>
        </section>

        <div className='text-center'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors'
          >
            <ArrowLeft size={14} />
            Volver al sitio principal
          </Link>
        </div>
      </div>
    </main>
  );
}

function PackageCard({ pkg }: { pkg: TripPackage }) {
  return (
    <article
      className='rounded-3xl overflow-hidden border shadow-sm'
      style={{ borderColor: `${NAVY}33`, backgroundColor: NAVY }}
    >
      <div className='flex items-baseline justify-between px-6 md:px-8 pt-6 md:pt-8 pb-4'>
        <div className='flex items-baseline gap-3 flex-wrap'>
          <p className='text-[10px] uppercase tracking-[0.35em] text-background/60'>
            Opción {pkg.id}
          </p>
          {pkg.tag && (
            <span
              className='text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-full'
              style={{ backgroundColor: '#d4a37340', color: '#f0c995' }}
            >
              {pkg.tag}
            </span>
          )}
        </div>
      </div>

      {/* Desktop legs table */}
      <div className='hidden md:block'>
        <div
          className='grid text-[11px] uppercase tracking-[0.2em] text-background/55 font-medium px-8 pb-3'
          style={{ gridTemplateColumns: '1.3fr 1fr 1fr 1.2fr' }}
        >
          <span>Tramo</span>
          <span>Fecha</span>
          <span>Horario</span>
          <span>Aerolínea</span>
        </div>
        <div className='border-t border-white/10'>
          {pkg.legs.map((leg, i) => (
            <div
              key={i}
              className='grid items-center px-8 py-5 text-background/95'
              style={{
                gridTemplateColumns: '1.3fr 1fr 1fr 1.2fr',
                borderBottom: i < pkg.legs.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div>
                <p className='font-medium' style={{ color: leg.kind === 'ida' ? IDA_BLUE : VUELTA_GREEN }}>
                  {leg.route}
                </p>
                <LegBadge kind={leg.kind} type={leg.type} />
              </div>
              <div className='text-sm'>{leg.dateLabel}</div>
              <div className='font-medium tabular-nums'>
                {leg.fromTime} → {leg.toTime}
              </div>
              <div className='text-sm'>{leg.airline}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stacked legs */}
      <div className='md:hidden border-t border-white/10'>
        {pkg.legs.map((leg, i) => (
          <div
            key={i}
            className='px-6 py-5 text-background/95'
            style={{
              borderBottom: i < pkg.legs.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            <div className='flex items-baseline justify-between mb-2'>
              <p className='font-medium text-base' style={{ color: leg.kind === 'ida' ? IDA_BLUE : VUELTA_GREEN }}>
                {leg.route}
              </p>
              <LegBadge kind={leg.kind} type={leg.type} />
            </div>
            <dl className='space-y-1 text-sm'>
              <div className='flex justify-between'>
                <dt className='text-background/55'>Fecha</dt>
                <dd>{leg.dateLabel}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='text-background/55'>Horario</dt>
                <dd className='tabular-nums'>{leg.fromTime} → {leg.toTime}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='text-background/55'>Aerolínea</dt>
                <dd>{leg.airline}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div
        className='px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3'
        style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.12)' }}
      >
        <p className='text-xs uppercase tracking-[0.25em] text-background/65'>
          Precio por pasajero · ida + vuelta
        </p>
        <div className='flex items-baseline gap-5'>
          <div className='flex items-baseline gap-2'>
            <span
              className='font-heading text-xl md:text-2xl tabular-nums'
              style={{ color: IDA_BLUE }}
            >
              USD {pkg.adultUsd}
            </span>
            <span className='text-[11px] uppercase tracking-[0.2em] text-background/65'>
              adulto
            </span>
          </div>
          <div className='flex items-baseline gap-2'>
            <span
              className='font-heading text-xl md:text-2xl tabular-nums'
              style={{ color: VUELTA_GREEN }}
            >
              USD {pkg.childUsd}
            </span>
            <span className='text-[11px] uppercase tracking-[0.2em] text-background/65'>
              niño
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function LegBadge({ kind, type }: { kind: 'ida' | 'vuelta'; type: string }) {
  const color = kind === 'ida' ? IDA_BLUE : VUELTA_GREEN;
  return (
    <span
      className='inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] font-medium px-2 py-0.5 rounded-full mt-1'
      style={{
        backgroundColor: `${color}24`,
        color,
        border: `1px solid ${color}55`,
      }}
    >
      {kind} · {type}
    </span>
  );
}

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
