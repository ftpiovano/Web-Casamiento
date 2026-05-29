import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Utensils, Sparkles } from 'lucide-react';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: `Guia de Buenos Aires | ${siteConfig.names.bride} & ${siteConfig.names.groom.br}`,
  description:
    'Onde comer, o que ver e como se mover em Buenos Aires durante a sua visita ao casamento civil.',
};

const NAVY = '#13234d';

type Neighborhood = {
  id: string;
  name: string;
  blurb: string;
  highlights: string;
  food: string;
  vibe: string;
};

const neighborhoods: Neighborhood[] = [
  {
    id: 'palermo',
    name: 'Palermo',
    blurb:
      'O bairro com mais energia da cidade — Soho, Hollywood, Bosques e a melhor cena gastronômica.',
    highlights:
      'Palermo Soho e Hollywood, Bosques de Palermo, Jardim Botânico, MALBA.',
    food:
      'Don Julio (parrilla mítica, reservar antes), Tegui (alta gastronomia), Anchoita, La Mar.',
    vibe: 'Cosmopolita, dia e noite.',
  },
  {
    id: 'recoleta',
    name: 'Recoleta',
    blurb:
      'Elegância afrancesada — o cemitério mais belo do mundo, museus e cafés clássicos.',
    highlights:
      'Cemitério da Recoleta (túmulo da Evita), MNBA, Floralis Genérica, Av. Alvear.',
    food: 'La Biela (café clássico), Rufino, Sottovoce, Roux.',
    vibe: 'Sofisticado, ideal para café da tarde e caminhada.',
  },
  {
    id: 'san-telmo',
    name: 'San Telmo',
    blurb:
      'Coração histórico e bohemio — aos domingos a feira da Plaza Dorrego ferve, com tango ao vivo.',
    highlights:
      'Feira de Domingo, Plaza Dorrego, Mercado de San Telmo, ruas de paralelepípedo.',
    food: 'Café San Juan, La Brigada (parrilla), Hierro.',
    vibe: 'Antigo, tango, perfeito para uma manhã de domingo.',
  },
  {
    id: 'puerto-madero',
    name: 'Puerto Madero',
    blurb:
      'Beira-rio moderna, com a Ponte da Mulher e a Reserva Ecológica para correr ou caminhar.',
    highlights: 'Puente de la Mujer, Reserva Ecológica, Costanera Sur.',
    food: 'Cabaña Las Lilas (parrilla com vista), I Latina, Florería Atlántico.',
    vibe: 'Moderno, executivo, com vista para o rio.',
  },
  {
    id: 'microcentro',
    name: 'Microcentro & Plaza de Mayo',
    blurb:
      'Centro político e arquitetônico — Casa Rosada, Cabildo, Catedral e a histórica Av. de Mayo.',
    highlights:
      'Casa Rosada, Cabildo, Catedral Metropolitana, Café Tortoni, Teatro Colón (tour ou função).',
    food: 'Café Tortoni (clássico), Pizzería Güerrín, Las Cuartetas.',
    vibe: 'Histórico e monumental, ideal pela manhã.',
  },
  {
    id: 'la-boca',
    name: 'La Boca',
    blurb:
      'Cores vibrantes do Caminito e o estádio do Boca Juniors — visita curta e estritamente diurna.',
    highlights: 'Caminito, La Bombonera (tour ou jogo).',
    food:
      'Melhor almoçar de volta em San Telmo — a zona é muito turística aqui.',
    vibe: 'Colorido, fotogênico, só de dia.',
  },
];

const itinerary = [
  {
    day: 'Dia 1',
    blocks: [
      {
        time: 'Manhã',
        text: 'Recoleta — Cemitério, MNBA, café no La Biela.',
      },
      {
        time: 'Tarde',
        text: 'Palermo — Bosques, Jardim Botânico, lojas no Soho.',
      },
      {
        time: 'Noite',
        text: 'Jantar de parrilla em Don Julio (reservar com bastante antecedência).',
      },
    ],
  },
  {
    day: 'Dia 2',
    blocks: [
      {
        time: 'Manhã',
        text: 'San Telmo — feira de domingo, tango na Plaza Dorrego, mercado.',
      },
      {
        time: 'Tarde',
        text: 'Microcentro — Plaza de Mayo, Casa Rosada, Café Tortoni.',
      },
      {
        time: 'Noite',
        text: 'Puerto Madero — Reserva Ecológica ao entardecer + jantar com vista.',
      },
    ],
  },
];

const tips = [
  {
    title: 'Moeda',
    text:
      'Leve dólares e troque em cuevas ou Western Union (taxa "blue" ou MEP). Cartão funciona, mas a taxa oficial é pior.',
  },
  {
    title: 'Transporte',
    text:
      'SUBE para metrô (subte) e ônibus. Uber e Cabify são abundantes e baratos. O centro é caminhável.',
  },
  {
    title: 'Idioma',
    text:
      'Espanhol básico ajuda muito. Inglês é limitado fora das zonas turísticas — apps de tradução resolvem.',
  },
  {
    title: 'Refeições',
    text:
      'Almoço entre 13h e 15h, jantar a partir das 21h. Asado de domingo é tradição — reserve antes.',
  },
  {
    title: 'Wi-Fi & dados',
    text:
      'eSIM (Holafly, Airalo) é o caminho mais rápido. Cafés têm Wi-Fi confiável.',
  },
  {
    title: 'Não esquecer',
    text:
      'Adaptador de tomada tipo C ou I, e uma noite reservada para uma milonga (La Catedral Club, Almagro).',
  },
];

export default function BuenosAiresPage() {
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
            Guia · Buenos Aires · Fev 2027
          </p>
          <h1 className='font-heading text-4xl md:text-5xl leading-tight mb-3'>
            Buenos Aires para os Convidados
          </h1>
          <p className='inline-block text-xs uppercase tracking-[0.3em] text-foreground/50'>
            O que ver, onde comer e como se mover
          </p>
        </header>

        <section className='max-w-2xl mx-auto mb-16 text-center'>
          <p className='text-base md:text-lg leading-relaxed text-foreground/80'>
            Bem-vindo à cidade do tango! Reunimos uma pequena seleção de bairros
            para você descobrir antes ou depois do nosso casamento civil — com
            o suficiente para uma ótima estadia de 2 a 3 dias.
          </p>
        </section>

        <section className='mb-20'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              Bairros para explorar
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {neighborhoods.length} bairros
            </span>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {neighborhoods.map((n, i) => (
              <article
                key={n.id}
                className='rounded-2xl border bg-background p-6 flex flex-col h-full transition-shadow hover:shadow-md'
                style={{ borderColor: `${NAVY}1f` }}
              >
                <div className='flex items-baseline gap-3 mb-3'>
                  <span
                    className='font-heading text-sm tracking-[0.2em]'
                    style={{ color: NAVY }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className='font-heading text-2xl leading-tight'>
                    {n.name}
                  </h3>
                </div>
                <p className='italic text-foreground/75 leading-relaxed mb-5'>
                  {n.blurb}
                </p>
                <dl className='space-y-3.5 border-t border-accent/30 pt-4 flex-grow'>
                  <CardRow
                    icon={<Sparkles size={14} />}
                    label='Não pode faltar'
                    value={n.highlights}
                  />
                  <CardRow
                    icon={<Utensils size={14} />}
                    label='Onde comer'
                    value={n.food}
                  />
                  <CardRow
                    icon={<MapPin size={14} />}
                    label='Vibe'
                    value={n.vibe}
                  />
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className='mb-20'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              48 horas em Buenos Aires
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              Sugestão de roteiro
            </span>
          </div>

          <div
            className='rounded-3xl overflow-hidden border-2 shadow-sm'
            style={{ borderColor: NAVY }}
          >
            <div
              className='grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x'
              style={{ borderColor: NAVY }}
            >
              {itinerary.map((day) => (
                <div
                  key={day.day}
                  className='p-7 md:p-10 bg-background'
                  style={{ borderColor: `${NAVY}1f` }}
                >
                  <p
                    className='text-[10px] uppercase tracking-[0.35em] mb-4'
                    style={{ color: NAVY }}
                  >
                    {day.day}
                  </p>
                  <ul className='space-y-5'>
                    {day.blocks.map((b) => (
                      <li key={b.time}>
                        <p className='text-[11px] uppercase tracking-[0.25em] text-primary mb-1'>
                          {b.time}
                        </p>
                        <p className='text-sm md:text-base text-foreground/85 leading-relaxed'>
                          {b.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='mb-16'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>Dicas práticas</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              Sobreviver e curtir
            </span>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {tips.map((t) => (
              <article
                key={t.title}
                className='rounded-2xl bg-accent/15 p-6'
              >
                <p
                  className='text-[10px] uppercase tracking-[0.3em] mb-2'
                  style={{ color: NAVY }}
                >
                  {t.title}
                </p>
                <p className='text-sm text-foreground/80 leading-relaxed'>
                  {t.text}
                </p>
              </article>
            ))}
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

function CardRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className='flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium text-primary/80 mb-1'>
        <span style={{ color: NAVY }}>{icon}</span>
        {label}
      </dt>
      <dd className='text-sm leading-snug text-foreground/80'>{value}</dd>
    </div>
  );
}
