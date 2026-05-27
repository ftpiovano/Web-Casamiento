import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Phone, ExternalLink, Plane, Bus } from 'lucide-react';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: `Paquetes de Vuelo · Brasil 2027 | ${siteConfig.names.bride} & ${siteConfig.names.groom}`,
  description:
    'Opciones de vuelo grupal Buenos Aires ↔ Salvador de Bahía para nuestra boda — marzo 2027.',
};

// TODO(alexita): replace these placeholders with the agency's real details.
const TOURISM_AGENCY_NAME = 'Agencia de viajes';
const TOURISM_PHONE = '+54 11 0000-0000';
const TOURISM_PHONE_TEL = '+541100000000';
const DESPEGAR_URL =
  'https://www.despegar.com.ar/shop/flights/results/roundtrip/BUE/SSA/2027-03-04/2027-03-14/1/0/0?from=SB&di=1&currency=USD';

const outbound = {
  dayLabel: 'Jueves 4 mar 2027',
  airline: 'Gol',
  origin: 'Aeroparque · AEP',
  departure: '18:05',
  stop: 'Escala en São Paulo',
  arrivalLabel: '07:00 hs',
  destination: 'Hotel Ponta de Inhambupe · Baixio',
};

type ReturnOption = {
  id: number;
  dateLabel: string;
  airline: string;
  flightType: string;
  fromTime: string;
  fromAirport: string;
  toTime: string;
  toAirport: string;
  totalUsd: number;
  depositUsd: number;
  installmentsCount: number;
  installmentUsd: number;
};

const returnOptions: ReturnOption[] = [
  {
    id: 1,
    dateLabel: 'Lunes 8 mar 2027',
    airline: 'Aerolíneas Argentinas',
    flightType: 'Vuelo directo',
    fromTime: '00:30',
    fromAirport: 'Salvador · SSA',
    toTime: '05:00',
    toAirport: 'Aeroparque · AEP',
    totalUsd: 689,
    depositUsd: 206.7,
    installmentsCount: 6,
    installmentUsd: 80.38,
  },
  {
    id: 2,
    dateLabel: 'Jueves 11 mar 2027',
    airline: 'Aerolíneas Argentinas',
    flightType: 'Vuelo directo',
    fromTime: '00:30',
    fromAirport: 'Salvador · SSA',
    toTime: '05:00',
    toAirport: 'Aeroparque · AEP',
    totalUsd: 689,
    depositUsd: 206.7,
    installmentsCount: 6,
    installmentUsd: 80.38,
  },
  {
    id: 3,
    dateLabel: 'Sábado 13 mar 2027',
    airline: 'Gol',
    flightType: 'Vuelo directo',
    fromTime: '15:10',
    fromAirport: 'Salvador · SSA',
    toTime: '20:05',
    toAirport: 'Aeroparque · AEP',
    totalUsd: 573,
    depositUsd: 171.9,
    installmentsCount: 6,
    installmentUsd: 66.85,
  },
];

const NAVY = '#13234d';

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
            alt={`${siteConfig.names.bride} & ${siteConfig.names.groom}`}
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

        <section className='max-w-2xl mx-auto mb-16 text-center'>
          <p className='text-base md:text-lg leading-relaxed text-foreground/80'>
            ¡Hola! 😊 Estamos organizando el viaje a Brasil 2027 con motivo de
            nuestra boda y como no queremos que faltes, te sugerimos las
            opciones del viaje grupal.
          </p>
        </section>

        <section className='mb-20'>
          <div className='flex items-baseline justify-between mb-5'>
            <h2 className='font-heading text-2xl md:text-3xl'>Viaje de ida</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              Una sola opción
            </span>
          </div>
          <article
            className='rounded-2xl bg-background border shadow-sm p-6 md:p-8'
            style={{ borderColor: `${NAVY}1f` }}
          >
            <div className='grid sm:grid-cols-3 gap-6'>
              <Field label='Salida' value='18:05' sub={`${outbound.dayLabel} · ${outbound.origin}`} />
              <Field label='Aerolínea' value={outbound.airline} sub={outbound.stop} />
              <Field
                label='Llegada al hotel'
                value={outbound.arrivalLabel}
                sub={outbound.destination}
              />
            </div>
            <div className='mt-6 pt-6 border-t border-accent/40 flex items-center gap-2 text-sm text-foreground/70'>
              <Bus size={16} className='text-primary' />
              <span>Transfer incluido desde el aeropuerto al hotel de la boda.</span>
            </div>
          </article>
        </section>

        <section className='mb-12'>
          <div className='flex items-baseline justify-between mb-5'>
            <h2 className='font-heading text-2xl md:text-3xl'>Viaje de vuelta</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              3 opciones
            </span>
          </div>

          <div className='md:hidden space-y-4'>
            {returnOptions.map((opt) => (
              <article
                key={opt.id}
                className='rounded-2xl border p-5 bg-background'
                style={{ borderColor: `${NAVY}1f` }}
              >
                <div className='flex items-baseline justify-between mb-4'>
                  <div>
                    <p className='text-[11px] uppercase tracking-[0.25em] text-primary mb-1'>
                      Opción {opt.id}
                    </p>
                    <p className='font-heading text-xl leading-tight'>{opt.dateLabel}</p>
                  </div>
                  <p className='font-heading text-2xl' style={{ color: NAVY }}>
                    US$ {opt.totalUsd}
                  </p>
                </div>
                <dl className='space-y-2.5 text-sm border-t border-accent/40 pt-4'>
                  <Row
                    label='Vuelo'
                    value={`${opt.airline} · ${opt.flightType}`}
                  />
                  <Row
                    label='Salida'
                    value={`${opt.fromTime} — ${opt.fromAirport}`}
                  />
                  <Row label='Llegada' value={`${opt.toTime} — ${opt.toAirport}`} />
                  <Row
                    label='Plan'
                    value={`Anticipo US$ ${opt.depositUsd} + ${opt.installmentsCount} cuotas de US$ ${opt.installmentUsd}`}
                  />
                </dl>
              </article>
            ))}
          </div>

          <div className='hidden md:block overflow-hidden rounded-2xl border' style={{ borderColor: `${NAVY}1f` }}>
            <table className='w-full text-left'>
              <thead style={{ backgroundColor: NAVY }} className='text-background'>
                <tr>
                  <Th>Opción</Th>
                  <Th>Fecha</Th>
                  <Th>Vuelo</Th>
                  <Th>Horarios</Th>
                  <Th className='text-right'>Total USD</Th>
                  <Th>Financiación</Th>
                </tr>
              </thead>
              <tbody>
                {returnOptions.map((opt, i) => (
                  <tr
                    key={opt.id}
                    className={
                      i < returnOptions.length - 1
                        ? 'border-b border-accent/40'
                        : ''
                    }
                  >
                    <Td>
                      <span className='font-heading text-xl' style={{ color: NAVY }}>
                        {opt.id}
                      </span>
                    </Td>
                    <Td>
                      <span className='font-medium'>{opt.dateLabel}</span>
                    </Td>
                    <Td>
                      <div>{opt.airline}</div>
                      <div className='text-xs text-foreground/55'>
                        {opt.flightType}
                      </div>
                    </Td>
                    <Td>
                      <div className='text-sm'>
                        {opt.fromTime} → {opt.toTime}
                      </div>
                      <div className='text-xs text-foreground/55'>
                        {opt.fromAirport} → {opt.toAirport}
                      </div>
                    </Td>
                    <Td className='text-right'>
                      <span
                        className='font-heading text-xl'
                        style={{ color: NAVY }}
                      >
                        ${opt.totalUsd}
                      </span>
                    </Td>
                    <Td>
                      <div className='text-xs leading-relaxed text-foreground/70'>
                        Anticipo <strong className='text-foreground'>US$ {opt.depositUsd}</strong>
                        <br />
                        {opt.installmentsCount} cuotas de{' '}
                        <strong className='text-foreground'>US$ {opt.installmentUsd}</strong>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className='text-xs md:text-sm text-foreground/60 italic mt-5 md:mt-6 max-w-3xl'>
            Financiación propia de la empresa organizadora — no es necesario
            abonar con tarjeta de crédito. El anticipo se abona en junio; las
            cuotas se distribuyen de julio a diciembre. Los precios son grupales
            y están sujetos a confirmación según disponibilidad.
          </p>
        </section>

        <section className='mb-16 rounded-2xl bg-accent/15 p-8 md:p-12 text-center'>
          <p className='text-[11px] uppercase tracking-[0.3em] text-primary mb-3'>
            Reservas & consultas
          </p>
          <h2 className='font-heading text-2xl md:text-3xl mb-4'>
            {TOURISM_AGENCY_NAME}
          </h2>
          <p className='text-foreground/70 max-w-md mx-auto mb-7'>
            La agencia coordina todo el viaje grupal — comunicate por teléfono
            o consultá los vuelos directamente en Despegar.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-md mx-auto'>
            <a
              href={`tel:${TOURISM_PHONE_TEL}`}
              className='inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-90 text-background'
              style={{ backgroundColor: NAVY }}
            >
              <Phone size={15} />
              {TOURISM_PHONE}
            </a>
            <a
              href={DESPEGAR_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm uppercase tracking-[0.2em] border transition-opacity hover:opacity-80'
              style={{ borderColor: NAVY, color: NAVY }}
            >
              Ver en Despegar
              <ExternalLink size={14} />
            </a>
          </div>
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

function Field({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className='text-[10px] uppercase tracking-[0.25em] text-primary mb-1.5'>
        {label}
      </p>
      <p className='text-lg font-medium leading-tight'>{value}</p>
      {sub && <p className='text-sm text-foreground/60 mt-1'>{sub}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-start gap-3'>
      <dt className='text-[10px] uppercase tracking-[0.25em] text-primary min-w-16 pt-1'>
        {label}
      </dt>
      <dd className='flex-1'>{value}</dd>
    </div>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`py-4 px-5 text-[11px] uppercase tracking-[0.2em] font-medium ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-5 px-5 align-top ${className}`}>{children}</td>;
}
