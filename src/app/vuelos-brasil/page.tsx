import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, ExternalLink, Plane, Bus, Check } from 'lucide-react';
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

type OutboundOption = {
  id: number;
  type: string;
  airline: string;
  dateLabel: string;
  fromTime: string;
  toTime: string;
  arrivalDetail: string;
  route: string;
};

const outboundOptions: OutboundOption[] = [
  {
    id: 1,
    type: 'Directo',
    airline: 'Aerolíneas Argentinas',
    dateLabel: 'Jueves 4 mar 2027',
    fromTime: '19:10',
    toTime: '23:30',
    arrivalDetail: 'en SSA',
    route: 'AEP → SSA',
  },
  {
    id: 2,
    type: 'Con escala',
    airline: 'Gol',
    dateLabel: '4 / 5 mar 2027',
    fromTime: '18:05',
    toTime: '02:15',
    arrivalDetail: 'en SSA',
    route: 'AEP → GRU → SSA',
  },
];

type ReturnOption = {
  id: number;
  dateLabel: string;
  airline: string;
  flightType: string;
  fromTime: string | null;
  fromAirport: string | null;
  toTime: string | null;
  toAirport: string | null;
  // Combined ida + vuelta totals per departure choice. null = a confirmar.
  comboWithDep1Usd: number | null; // with Salida 1 (Directo · Aerolíneas Argentinas)
  comboWithDep2Usd: number | null; // with Salida 2 (Con escala · Gol)
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
    comboWithDep1Usd: 689,
    comboWithDep2Usd: null,
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
    comboWithDep1Usd: 689,
    comboWithDep2Usd: null,
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
    comboWithDep1Usd: null,
    comboWithDep2Usd: 573,
  },
  {
    id: 4,
    dateLabel: 'Domingo (a confirmar)',
    airline: 'Por confirmar',
    flightType: 'A confirmar con la agencia',
    fromTime: null,
    fromAirport: null,
    toTime: null,
    toAirport: null,
    comboWithDep1Usd: null,
    comboWithDep2Usd: null,
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
                La empresa organizadora del viaje grupal tiene{' '}
                <strong className='text-background'>financiación propia</strong>
                : pagás un anticipo en junio y 6 cuotas hasta diciembre,{' '}
                <strong className='text-background'>
                  sin usar tu tarjeta de crédito
                </strong>{' '}
                ni consumir tu límite.
              </p>
              <ul className='space-y-2.5 mb-8'>
                {[
                  'Anticipo en junio + 6 cuotas (julio a diciembre)',
                  'Sin tarjeta de crédito ni límite consumido',
                  'La agencia coordina todo el viaje grupal',
                ].map((item) => (
                  <li
                    key={item}
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
                <MessageCircle size={15} />
                Escribir por WhatsApp
              </a>
            </div>

            <div
              className='px-7 md:px-10 py-6 bg-background'
              style={{ borderTop: `1px solid ${NAVY}1f` }}
            >
              <p className='text-sm md:text-base text-foreground/75 leading-relaxed mb-3'>
                ¿Preferís pagar con tu tarjeta de crédito? Podés comprar los
                vuelos directamente en Despegar — te dejamos la búsqueda con
                todas las fechas ya configuradas.
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

        <section className='mb-20'>
          <div className='flex items-baseline justify-between mb-5'>
            <h2 className='font-heading text-2xl md:text-3xl'>Viaje de ida</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {outboundOptions.length} opciones
            </span>
          </div>

          <div className='md:hidden space-y-4'>
            {outboundOptions.map((opt) => (
              <article
                key={opt.id}
                className='rounded-2xl border p-5 bg-background'
                style={{ borderColor: `${NAVY}1f` }}
              >
                <div className='mb-3'>
                  <p className='text-[11px] uppercase tracking-[0.25em] text-primary mb-1'>
                    Salida {opt.id} · {opt.type}
                  </p>
                  <p className='font-heading text-xl leading-tight'>{opt.airline}</p>
                </div>
                <dl className='space-y-2.5 text-sm border-t border-accent/40 pt-4'>
                  <Row label='Fecha' value={opt.dateLabel} />
                  <Row label='Ruta' value={opt.route} />
                  <Row
                    label='Horario'
                    value={`${opt.fromTime} → ${opt.toTime} (${opt.arrivalDetail})`}
                  />
                </dl>
              </article>
            ))}
          </div>

          <div
            className='hidden md:block overflow-hidden rounded-2xl border'
            style={{ borderColor: `${NAVY}1f` }}
          >
            <table className='w-full text-left'>
              <thead style={{ backgroundColor: NAVY }} className='text-background'>
                <tr>
                  <Th>Salida</Th>
                  <Th>Aerolínea</Th>
                  <Th>Fecha</Th>
                  <Th>Horario</Th>
                  <Th>Ruta</Th>
                </tr>
              </thead>
              <tbody>
                {outboundOptions.map((opt, i) => (
                  <tr
                    key={opt.id}
                    className={
                      i < outboundOptions.length - 1
                        ? 'border-b border-accent/40'
                        : ''
                    }
                  >
                    <Td>
                      <span className='font-heading text-xl' style={{ color: NAVY }}>
                        {opt.id}
                      </span>
                      <div className='text-xs text-foreground/55 mt-0.5'>{opt.type}</div>
                    </Td>
                    <Td>
                      <span className='font-medium'>{opt.airline}</span>
                    </Td>
                    <Td>{opt.dateLabel}</Td>
                    <Td>
                      <div className='text-sm'>
                        {opt.fromTime} → {opt.toTime}
                      </div>
                      <div className='text-xs text-foreground/55'>{opt.arrivalDetail}</div>
                    </Td>
                    <Td>{opt.route}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className='text-xs md:text-sm text-foreground/60 italic mt-5 max-w-3xl'>
            El precio total del viaje (ida + vuelta) se muestra en cada opción
            de vuelta, según la combinación elegida con la salida 1 o la salida 2.
          </p>

          <div className='mt-3 flex items-center gap-2 text-sm text-foreground/70'>
            <Bus size={16} className='text-primary' />
            <span>Transfer incluido desde el aeropuerto al hotel de la boda.</span>
          </div>
        </section>

        <section className='mb-12'>
          <div className='flex items-baseline justify-between mb-5'>
            <h2 className='font-heading text-2xl md:text-3xl'>Viaje de vuelta</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {returnOptions.length} opciones
            </span>
          </div>

          <div className='md:hidden space-y-4'>
            {returnOptions.map((opt) => (
              <article
                key={opt.id}
                className='rounded-2xl border p-5 bg-background'
                style={{ borderColor: `${NAVY}1f` }}
              >
                <div className='mb-4'>
                  <p className='text-[11px] uppercase tracking-[0.25em] text-primary mb-1'>
                    Vuelta {opt.id}
                  </p>
                  <p className='font-heading text-xl leading-tight'>{opt.dateLabel}</p>
                </div>
                <dl className='space-y-2.5 text-sm border-t border-accent/40 pt-4'>
                  <Row
                    label='Vuelo'
                    value={`${opt.airline} · ${opt.flightType}`}
                  />
                  {opt.fromTime && opt.toTime && (
                    <Row
                      label='Horario'
                      value={`${opt.fromTime} → ${opt.toTime}`}
                    />
                  )}
                  {opt.fromAirport && opt.toAirport && (
                    <Row label='Ruta' value={`${opt.fromAirport} → ${opt.toAirport}`} />
                  )}
                </dl>
                <div className='mt-4 pt-4 border-t border-accent/40 grid grid-cols-2 gap-3'>
                  <ComboPrice
                    label='Con Salida 1'
                    sub='Directo · AA'
                    value={opt.comboWithDep1Usd}
                  />
                  <ComboPrice
                    label='Con Salida 2'
                    sub='Con escala · Gol'
                    value={opt.comboWithDep2Usd}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className='hidden md:block overflow-hidden rounded-2xl border' style={{ borderColor: `${NAVY}1f` }}>
            <table className='w-full text-left'>
              <thead style={{ backgroundColor: NAVY }} className='text-background'>
                <tr>
                  <Th>Vuelta</Th>
                  <Th>Fecha</Th>
                  <Th>Vuelo</Th>
                  <Th>Horarios</Th>
                  <Th className='text-right'>
                    <div>Con Salida 1</div>
                    <div className='text-[10px] font-normal opacity-70'>Directo · AA</div>
                  </Th>
                  <Th className='text-right'>
                    <div>Con Salida 2</div>
                    <div className='text-[10px] font-normal opacity-70'>Con escala · Gol</div>
                  </Th>
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
                      {opt.fromTime && opt.toTime ? (
                        <>
                          <div className='text-sm'>
                            {opt.fromTime} → {opt.toTime}
                          </div>
                          {opt.fromAirport && opt.toAirport && (
                            <div className='text-xs text-foreground/55'>
                              {opt.fromAirport} → {opt.toAirport}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className='text-foreground/45'>—</span>
                      )}
                    </Td>
                    <Td className='text-right'>
                      <PriceCell value={opt.comboWithDep1Usd} />
                    </Td>
                    <Td className='text-right'>
                      <PriceCell value={opt.comboWithDep2Usd} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className='text-xs md:text-sm text-foreground/60 italic mt-5 md:mt-6 max-w-3xl'>
            Cada precio es el total del viaje (ida + vuelta) según la salida
            elegida. Las combinaciones marcadas «—» están a confirmar con
            la agencia. Precios grupales sujetos a disponibilidad.
          </p>
        </section>

        <section className='mb-12 text-center'>
          <p className='text-sm text-foreground/65 mb-3'>
            ¿Dudas? Escribinos por WhatsApp a la agencia organizadora del viaje:
          </p>
          <a
            href={AGENCY_WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-base md:text-lg font-heading hover:opacity-80 transition-opacity'
            style={{ color: NAVY }}
          >
            <MessageCircle size={18} />
            {AGENCY_PHONE_DISPLAY}
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

function PriceCell({ value }: { value: number | null }) {
  if (value == null) {
    return <span className='text-foreground/45'>—</span>;
  }
  return (
    <span className='font-heading text-xl' style={{ color: NAVY }}>
      ${value.toLocaleString('es-AR')}
    </span>
  );
}

function ComboPrice({
  label,
  sub,
  value,
}: {
  label: string;
  sub: string;
  value: number | null;
}) {
  return (
    <div>
      <p className='text-[10px] uppercase tracking-[0.22em] text-primary mb-0.5'>
        {label}
      </p>
      <p className='text-[10px] uppercase tracking-[0.2em] text-foreground/55 mb-1'>
        {sub}
      </p>
      {value != null ? (
        <p className='font-heading text-xl' style={{ color: NAVY }}>
          US$ {value.toLocaleString('es-AR')}
        </p>
      ) : (
        <p className='text-foreground/45'>—</p>
      )}
    </div>
  );
}
