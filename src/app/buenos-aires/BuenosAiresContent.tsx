'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Utensils, Sparkles } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { useLanguage } from '@/context/LanguageContext';

const NAVY = '#13234d';

type Region = 'br' | 'ar' | 'en';

type NeighborhoodCopy = {
  blurb: string;
  highlights: string;
  food: string;
  vibe: string;
};

type Neighborhood = {
  id: string;
  name: string;
  copy: Record<Region, NeighborhoodCopy>;
};

const neighborhoods: Neighborhood[] = [
  {
    id: 'palermo',
    name: 'Palermo',
    copy: {
      br: {
        blurb:
          'O bairro com mais energia da cidade — Soho, Hollywood, Bosques e a melhor cena gastronômica.',
        highlights:
          'Palermo Soho e Hollywood, Bosques de Palermo, Jardim Botânico, MALBA.',
        food:
          'Don Julio (parrilla mítica, reservar antes), Tegui (alta gastronomia), Anchoita, La Mar.',
        vibe: 'Cosmopolita, dia e noite.',
      },
      ar: {
        blurb:
          'El barrio con más energía de la ciudad — Soho, Hollywood, los Bosques y la mejor escena gastronómica.',
        highlights:
          'Palermo Soho y Hollywood, Bosques de Palermo, Jardín Botánico, MALBA.',
        food:
          'Don Julio (parrilla mítica, reservar antes), Tegui (alta cocina), Anchoita, La Mar.',
        vibe: 'Cosmopolita, día y noche.',
      },
      en: {
        blurb:
          'The city’s most energetic neighborhood — Soho, Hollywood, the Bosques and the best food scene.',
        highlights:
          'Palermo Soho and Hollywood, Bosques de Palermo, Botanical Garden, MALBA.',
        food:
          'Don Julio (legendary parrilla — book ahead), Tegui (fine dining), Anchoita, La Mar.',
        vibe: 'Cosmopolitan, day and night.',
      },
    },
  },
  {
    id: 'recoleta',
    name: 'Recoleta',
    copy: {
      br: {
        blurb:
          'Elegância afrancesada — o cemitério mais belo do mundo, museus e cafés clássicos.',
        highlights:
          'Cemitério da Recoleta (túmulo da Evita), MNBA, Floralis Genérica, Av. Alvear.',
        food: 'La Biela (café clássico), Rufino, Sottovoce, Roux.',
        vibe: 'Sofisticado, ideal para café da tarde e caminhada.',
      },
      ar: {
        blurb:
          'Elegancia afrancesada — el cementerio más bello del mundo, museos y cafés clásicos.',
        highlights:
          'Cementerio de la Recoleta (tumba de Evita), MNBA, Floralis Genérica, Av. Alvear.',
        food: 'La Biela (café clásico), Rufino, Sottovoce, Roux.',
        vibe: 'Sofisticado, ideal para el café de la tarde y caminar.',
      },
      en: {
        blurb:
          'French-style elegance — the world’s most beautiful cemetery, museums and classic cafés.',
        highlights:
          'Recoleta Cemetery (Evita’s tomb), MNBA, Floralis Genérica, Av. Alvear.',
        food: 'La Biela (classic café), Rufino, Sottovoce, Roux.',
        vibe: 'Refined — perfect for an afternoon coffee and a stroll.',
      },
    },
  },
  {
    id: 'san-telmo',
    name: 'San Telmo',
    copy: {
      br: {
        blurb:
          'Coração histórico e bohemio — aos domingos a feira da Plaza Dorrego ferve, com tango ao vivo.',
        highlights:
          'Feira de Domingo, Plaza Dorrego, Mercado de San Telmo, ruas de paralelepípedo.',
        food: 'Café San Juan, La Brigada (parrilla), Hierro.',
        vibe: 'Antigo, tango, perfeito para uma manhã de domingo.',
      },
      ar: {
        blurb:
          'Corazón histórico y bohemio — los domingos la feria de Plaza Dorrego se llena, con tango en vivo.',
        highlights:
          'Feria de los Domingos, Plaza Dorrego, Mercado de San Telmo, calles empedradas.',
        food: 'Café San Juan, La Brigada (parrilla), Hierro.',
        vibe: 'Antiguo, tango, perfecto para un domingo a la mañana.',
      },
      en: {
        blurb:
          'Historic and bohemian — Sundays the Plaza Dorrego fair comes alive, live tango included.',
        highlights:
          'Sunday fair, Plaza Dorrego, San Telmo Market, cobblestone streets.',
        food: 'Café San Juan, La Brigada (parrilla), Hierro.',
        vibe: 'Old-world, tango, ideal for a Sunday morning.',
      },
    },
  },
  {
    id: 'puerto-madero',
    name: 'Puerto Madero',
    copy: {
      br: {
        blurb:
          'Beira-rio moderna, com a Ponte da Mulher e a Reserva Ecológica para correr ou caminhar.',
        highlights: 'Puente de la Mujer, Reserva Ecológica, Costanera Sur.',
        food: 'Cabaña Las Lilas (parrilla com vista), I Latina, Florería Atlántico.',
        vibe: 'Moderno, executivo, com vista para o rio.',
      },
      ar: {
        blurb:
          'Costanera moderna, con el Puente de la Mujer y la Reserva Ecológica para correr o caminar.',
        highlights: 'Puente de la Mujer, Reserva Ecológica, Costanera Sur.',
        food: 'Cabaña Las Lilas (parrilla con vista), I Latina, Florería Atlántico.',
        vibe: 'Moderno, ejecutivo, con vista al río.',
      },
      en: {
        blurb:
          'Modern waterfront with the Bridge of the Woman and the Ecological Reserve to walk or run.',
        highlights: 'Puente de la Mujer, Ecological Reserve, Costanera Sur.',
        food: 'Cabaña Las Lilas (parrilla with a view), I Latina, Florería Atlántico.',
        vibe: 'Modern, business-y, river views.',
      },
    },
  },
  {
    id: 'microcentro',
    name: 'Microcentro & Plaza de Mayo',
    copy: {
      br: {
        blurb:
          'Centro político e arquitetônico — Casa Rosada, Cabildo, Catedral e a histórica Av. de Mayo.',
        highlights:
          'Casa Rosada, Cabildo, Catedral Metropolitana, Café Tortoni, Teatro Colón (tour ou função).',
        food: 'Café Tortoni (clássico), Pizzería Güerrín, Las Cuartetas.',
        vibe: 'Histórico e monumental, ideal pela manhã.',
      },
      ar: {
        blurb:
          'Centro político y arquitectónico — Casa Rosada, Cabildo, Catedral y la histórica Av. de Mayo.',
        highlights:
          'Casa Rosada, Cabildo, Catedral Metropolitana, Café Tortoni, Teatro Colón (tour o función).',
        food: 'Café Tortoni (clásico), Pizzería Güerrín, Las Cuartetas.',
        vibe: 'Histórico y monumental, ideal a la mañana.',
      },
      en: {
        blurb:
          'Political and architectural heart — Casa Rosada, the Cabildo, the Cathedral and historic Av. de Mayo.',
        highlights:
          'Casa Rosada, Cabildo, Metropolitan Cathedral, Café Tortoni, Teatro Colón (tour or show).',
        food: 'Café Tortoni (classic), Pizzería Güerrín, Las Cuartetas.',
        vibe: 'Historic and monumental, best in the morning.',
      },
    },
  },
  {
    id: 'la-boca',
    name: 'La Boca',
    copy: {
      br: {
        blurb:
          'Cores vibrantes do Caminito e o estádio do Boca Juniors — visita curta e estritamente diurna.',
        highlights: 'Caminito, La Bombonera (tour ou jogo).',
        food:
          'Melhor almoçar de volta em San Telmo — a zona é muito turística aqui.',
        vibe: 'Colorido, fotogênico, só de dia.',
      },
      ar: {
        blurb:
          'Colores vibrantes del Caminito y la cancha de Boca Juniors — visita corta y estrictamente de día.',
        highlights: 'Caminito, La Bombonera (tour o partido).',
        food:
          'Mejor almorzar de vuelta en San Telmo — acá la zona es muy turística.',
        vibe: 'Colorido, fotogénico, solo de día.',
      },
      en: {
        blurb:
          'Vibrant colors of Caminito and Boca Juniors’ stadium — short, strictly daytime visit.',
        highlights: 'Caminito, La Bombonera (tour or match).',
        food:
          'Better to head back to San Telmo for lunch — this area is very touristy.',
        vibe: 'Colorful, photogenic, daytime only.',
      },
    },
  },
];

type Itinerary = { day: string; blocks: { time: string; text: string }[] }[];
const itineraries: Record<Region, Itinerary> = {
  br: [
    {
      day: 'Dia 1',
      blocks: [
        { time: 'Manhã', text: 'Recoleta — Cemitério, MNBA, café no La Biela.' },
        { time: 'Tarde', text: 'Palermo — Bosques, Jardim Botânico, lojas no Soho.' },
        { time: 'Noite', text: 'Jantar de parrilla em Don Julio (reservar com bastante antecedência).' },
      ],
    },
    {
      day: 'Dia 2',
      blocks: [
        { time: 'Manhã', text: 'San Telmo — feira de domingo, tango na Plaza Dorrego, mercado.' },
        { time: 'Tarde', text: 'Microcentro — Plaza de Mayo, Casa Rosada, Café Tortoni.' },
        { time: 'Noite', text: 'Puerto Madero — Reserva Ecológica ao entardecer + jantar com vista.' },
      ],
    },
  ],
  ar: [
    {
      day: 'Día 1',
      blocks: [
        { time: 'Mañana', text: 'Recoleta — Cementerio, MNBA, café en La Biela.' },
        { time: 'Tarde', text: 'Palermo — Bosques, Jardín Botánico, tiendas en el Soho.' },
        { time: 'Noche', text: 'Cena de parrilla en Don Julio (reservar con bastante anticipación).' },
      ],
    },
    {
      day: 'Día 2',
      blocks: [
        { time: 'Mañana', text: 'San Telmo — feria de los domingos, tango en Plaza Dorrego, mercado.' },
        { time: 'Tarde', text: 'Microcentro — Plaza de Mayo, Casa Rosada, Café Tortoni.' },
        { time: 'Noche', text: 'Puerto Madero — Reserva Ecológica al atardecer + cena con vista.' },
      ],
    },
  ],
  en: [
    {
      day: 'Day 1',
      blocks: [
        { time: 'Morning', text: 'Recoleta — Cemetery, MNBA, coffee at La Biela.' },
        { time: 'Afternoon', text: 'Palermo — Bosques, Botanical Garden, Soho shops.' },
        { time: 'Evening', text: 'Parrilla dinner at Don Julio (book well in advance).' },
      ],
    },
    {
      day: 'Day 2',
      blocks: [
        { time: 'Morning', text: 'San Telmo — Sunday fair, tango on Plaza Dorrego, the market.' },
        { time: 'Afternoon', text: 'Microcentro — Plaza de Mayo, Casa Rosada, Café Tortoni.' },
        { time: 'Evening', text: 'Puerto Madero — Ecological Reserve at sunset + dinner with a view.' },
      ],
    },
  ],
};

type Tip = { title: string; text: string };
const tips: Record<Region, Tip[]> = {
  br: [
    {
      title: 'Moeda',
      text: 'Leve dólares e troque em cuevas ou Western Union (taxa "blue" ou MEP). Cartão funciona, mas a taxa oficial é pior.',
    },
    {
      title: 'Transporte',
      text: 'SUBE para metrô (subte) e ônibus. Uber e Cabify são abundantes e baratos. O centro é caminhável.',
    },
    {
      title: 'Idioma',
      text: 'Espanhol básico ajuda muito. Inglês é limitado fora das zonas turísticas — apps de tradução resolvem.',
    },
    {
      title: 'Refeições',
      text: 'Almoço entre 13h e 15h, jantar a partir das 21h. Asado de domingo é tradição — reserve antes.',
    },
    {
      title: 'Wi-Fi & dados',
      text: 'eSIM (Holafly, Airalo) é o caminho mais rápido. Cafés têm Wi-Fi confiável.',
    },
    {
      title: 'Não esquecer',
      text: 'Adaptador de tomada tipo C ou I, e uma noite reservada para uma milonga (La Catedral Club, Almagro).',
    },
  ],
  ar: [
    {
      title: 'Moneda',
      text: 'Llevá dólares y cambiá en cuevas o Western Union (tasa «blue» o MEP). La tarjeta funciona, pero la tasa oficial es peor.',
    },
    {
      title: 'Transporte',
      text: 'SUBE para subte y colectivos. Uber y Cabify son abundantes y baratos. El centro es caminable.',
    },
    {
      title: 'Idioma',
      text: 'Acá hablamos castellano. Fuera de las zonas turísticas el inglés es limitado — los apps de traducción resuelven.',
    },
    {
      title: 'Comidas',
      text: 'Almuerzo entre 13h y 15h, cena a partir de las 21h. El asado del domingo es tradición — reservá antes.',
    },
    {
      title: 'Wi-Fi y datos',
      text: 'eSIM (Holafly, Airalo) es lo más rápido. Los cafés tienen Wi-Fi confiable.',
    },
    {
      title: 'No olvidar',
      text: 'Adaptador de toma tipo C o I, y una noche libre para una milonga (La Catedral Club, Almagro).',
    },
  ],
  en: [
    {
      title: 'Currency',
      text: 'Bring USD and exchange at cuevas or Western Union (the "blue" or MEP rate). Cards work, but the official rate is much worse.',
    },
    {
      title: 'Transport',
      text: 'SUBE card for the subway and buses. Uber and Cabify are abundant and cheap. The center is walkable.',
    },
    {
      title: 'Language',
      text: 'Basic Spanish helps a lot. English is limited outside tourist areas — translation apps do the trick.',
    },
    {
      title: 'Meals',
      text: 'Lunch 1–3 PM, dinner from 9 PM. Sunday asado is tradition — book ahead.',
    },
    {
      title: 'Wi-Fi & data',
      text: 'eSIM (Holafly, Airalo) is the fastest path. Cafés have reliable Wi-Fi.',
    },
    {
      title: 'Don’t forget',
      text: 'Type C or I plug adapter, and one night blocked off for a milonga (La Catedral Club, Almagro).',
    },
  ],
};

type PageCopy = {
  backTop: string;
  tag: string;
  title: string;
  subtitle: string;
  intro: string;
  neighborhoodsTitle: string;
  neighborhoodsUnit: string;
  cardHighlights: string;
  cardFood: string;
  cardVibe: string;
  itineraryTitle: string;
  itinerarySub: string;
  tipsTitle: string;
  tipsSub: string;
  backBottom: string;
};

const pageCopy: Record<Region, PageCopy> = {
  br: {
    backTop: 'Voltar ao site',
    tag: 'Guia · Buenos Aires · Fev 2027',
    title: 'Buenos Aires para os Convidados',
    subtitle: 'O que ver, onde comer e como se mover',
    intro:
      'Bem-vindo à cidade do tango! Reunimos uma pequena seleção de bairros para você descobrir antes ou depois do nosso casamento civil — com o suficiente para uma ótima estadia de 2 a 3 dias.',
    neighborhoodsTitle: 'Bairros para explorar',
    neighborhoodsUnit: 'bairros',
    cardHighlights: 'Não pode faltar',
    cardFood: 'Onde comer',
    cardVibe: 'Vibe',
    itineraryTitle: '48 horas em Buenos Aires',
    itinerarySub: 'Sugestão de roteiro',
    tipsTitle: 'Dicas práticas',
    tipsSub: 'Sobreviver e curtir',
    backBottom: 'Voltar ao site principal',
  },
  ar: {
    backTop: 'Volver al sitio',
    tag: 'Guía · Buenos Aires · Feb 2027',
    title: 'Buenos Aires para los Invitados',
    subtitle: 'Qué ver, dónde comer y cómo moverse',
    intro:
      '¡Bienvenido a la ciudad del tango! Armamos una pequeña selección de barrios para que descubras antes o después del civil — alcanza para una estadía linda de 2 a 3 días.',
    neighborhoodsTitle: 'Barrios para recorrer',
    neighborhoodsUnit: 'barrios',
    cardHighlights: 'Imperdible',
    cardFood: 'Dónde comer',
    cardVibe: 'Vibra',
    itineraryTitle: '48 horas en Buenos Aires',
    itinerarySub: 'Itinerario sugerido',
    tipsTitle: 'Tips prácticos',
    tipsSub: 'Sobrevivir y disfrutar',
    backBottom: 'Volver al sitio principal',
  },
  en: {
    backTop: 'Back to site',
    tag: 'Guide · Buenos Aires · Feb 2027',
    title: 'Buenos Aires for Guests',
    subtitle: 'What to see, where to eat and how to get around',
    intro:
      'Welcome to the city of tango! We put together a small selection of neighborhoods to discover before or after the civil ceremony — enough for a lovely 2-to-3-day stay.',
    neighborhoodsTitle: 'Neighborhoods to explore',
    neighborhoodsUnit: 'neighborhoods',
    cardHighlights: 'Don’t miss',
    cardFood: 'Where to eat',
    cardVibe: 'Vibe',
    itineraryTitle: '48 hours in Buenos Aires',
    itinerarySub: 'Suggested itinerary',
    tipsTitle: 'Practical tips',
    tipsSub: 'Survive and enjoy',
    backBottom: 'Back to the main site',
  },
};

export function BuenosAiresContent() {
  const { region } = useLanguage();
  const p = pageCopy[region];
  const dayBlocks = itineraries[region];
  const localTips = tips[region];

  return (
    <main className='min-h-screen bg-background text-foreground px-6 py-10 md:py-16'>
      <div className='max-w-5xl mx-auto'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors mb-10'
        >
          <ArrowLeft size={14} />
          {p.backTop}
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
            {p.tag}
          </p>
          <h1 className='font-heading text-4xl md:text-5xl leading-tight mb-3'>
            {p.title}
          </h1>
          <p className='inline-block text-xs uppercase tracking-[0.3em] text-foreground/50'>
            {p.subtitle}
          </p>
        </header>

        <section className='max-w-2xl mx-auto mb-16 text-center'>
          <p className='text-base md:text-lg leading-relaxed text-foreground/80'>
            {p.intro}
          </p>
        </section>

        <section className='mb-20'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              {p.neighborhoodsTitle}
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {neighborhoods.length} {p.neighborhoodsUnit}
            </span>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {neighborhoods.map((n, i) => {
              const c = n.copy[region];
              return (
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
                    {c.blurb}
                  </p>
                  <dl className='space-y-3.5 border-t border-accent/30 pt-4 flex-grow'>
                    <CardRow
                      icon={<Sparkles size={14} />}
                      label={p.cardHighlights}
                      value={c.highlights}
                    />
                    <CardRow
                      icon={<Utensils size={14} />}
                      label={p.cardFood}
                      value={c.food}
                    />
                    <CardRow
                      icon={<MapPin size={14} />}
                      label={p.cardVibe}
                      value={c.vibe}
                    />
                  </dl>
                </article>
              );
            })}
          </div>
        </section>

        <section className='mb-20'>
          <div className='flex items-baseline justify-between mb-6'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              {p.itineraryTitle}
            </h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {p.itinerarySub}
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
              {dayBlocks.map((day) => (
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
            <h2 className='font-heading text-2xl md:text-3xl'>{p.tipsTitle}</h2>
            <span className='text-[11px] uppercase tracking-[0.25em] text-foreground/50'>
              {p.tipsSub}
            </span>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {localTips.map((t) => (
              <article key={t.title} className='rounded-2xl bg-accent/15 p-6'>
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
            {p.backBottom}
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
