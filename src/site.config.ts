export const siteConfig = {
  names: {
    groom: { ar: 'Tomi', br: 'Chico', en: 'Chico' },
    bride: 'Alexita',
  },
  // Photos for "The Couple" section. Leave src empty to fall back to
  // the User-icon placeholder; drop a file in /public/branding/ and
  // set src + natural width/height here so the frame matches the
  // photo's aspect (no letterbox bars).
  couplePhotos: {
    bride: { src: '/branding/couple-alexita.jpg', width: 862, height: 1062 },
    groom: { src: '/branding/couple-chico.jpg', width: 856, height: 1055 },
  },
  eventDate: '2027-03-06T17:00:00', // Reference date for general countdown
  theme: {
    colors: {
      background: '#faf8f5', // Warm off-white
      foreground: '#222222', // Charcoal
      primary: '#d4a373',    // Configurable primary (sand/beige)
      accent: '#e9edc9',     // Soft accent
    },
    fonts: {
      heading: 'var(--font-playfair)',
      body: 'var(--font-inter)',
    },
  },
  // Detailed Event Information
  events: {
    ar: {
      id: 'argentina',
      title: 'Argentina',
      dateTime: '2027-02-27T11:00:00',
      locationName: 'Club de Campo San Diego',
      address: 'Au Acceso Oeste Km 42, B1744 Moreno, Provincia de Buenos Aires, Argentina',
      mapLink: 'https://www.google.com/maps/place/Club+de+Campo+San+Diego/@-34.6147323,-58.8543517,17z/data=!3m1!4b1!4m6!3m5!1s0x95bc9437abeabf2b:0xd3205ac9847354cf!8m2!3d-34.6147323!4d-58.8517768!16s%2Fg%2F11tk8ps8f?entry=ttu',
      flightPackagesUrl: '#',
      backgroundImage: '/branding/argentina-bg.jpg',
    },
    br: {
      id: 'brasil',
      title: 'Brasil',
      dateTime: '2027-03-06T16:00:00',
      locationName: 'Hotel Boutique & Spa Ponta de Inhambupe',
      address: 'Loteamento Ponta de Inhambupe, 189 - Baixio, Esplanada - BA, 48370-000, Brasil',
      mapLink: 'https://www.google.com/maps/place/Hotel+Boutique+%26+Spa+Ponta+de+Inhambupe+by+Slaviero+Hot%C3%A9is/@-12.1023221,-37.6930429,17z/data=!3m1!4b1!4m9!3m8!1s0x717376dd6887931:0x6d4526a6d0ab8dea!5m2!4m1!1i2!8m2!3d-12.1023221!4d-37.690468!16s%2Fg%2F11pdxwrbyd?entry=ttu',
      flightPackagesUrl: '/vuelos-brasil',
      // Hospedagens button temporarily hidden — set to '' so the
      // EventDetails conditional skips rendering it. The page at
      // /hospedagens-brasil is still live; switch back to
      // '/hospedagens-brasil' to surface the button again.
      accommodationsUrl: '',
      backgroundImage: '/branding/brasil-bg.jpg',
      backgroundPosition: 'center 25%',
    },
  },
  // Centralized Gift Registry — comic edition.
  // `emoji` renders as the card visual until an `image` path is set
  // (drop a photo under /public/branding/gifts/ and reference it here).
  gifts: [
    {
      id: 1,
      emoji: '💐',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Taxa para a noiva não jogar o buquê na sua namorada',
          description:
            'Para o buquê voar em outra direção e o destino não apressar o seu compromisso.',
          price: 400,
        },
        ar: {
          name: 'Tasa para que la novia no le tire el ramo a tu novia',
          description:
            'Para que el ramo vuele en otra dirección y el destino no te apure el compromiso.',
          price: 100000,
        },
        en: {
          name: 'Fee for the bride not to throw the bouquet at your girlfriend',
          description:
            'So the bouquet flies the other way and destiny doesn’t rush your engagement.',
          price: 60,
        },
      },
    },
    {
      id: 19,
      emoji: '🇧🇷',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Camisa do Brasil para o noivo curtir a Copa do Mundo',
          description: 'Estratégia diplomática para os jogos que dividem o casal.',
          price: 140,
        },
        ar: {
          name: 'Camiseta de Brasil para que el novio disfrute el Mundial',
          description: 'Estrategia diplomática para los partidos que dividen a la pareja.',
          price: 2500000,
        },
        en: {
          name: 'Brazil jersey for the groom to enjoy the World Cup',
          description: 'Diplomatic strategy for the matches that divide the couple.',
          price: 350,
        },
      },
    },
    {
      id: 20,
      emoji: '🇦🇷',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Camisa da Argentina para a noiva curtir a Copa do Mundo',
          description: 'Para empatar o placar antes mesmo da bola rolar.',
          price: 2500,
        },
        ar: {
          name: 'Camiseta de Argentina para que la novia disfrute el Mundial',
          description: 'Para empatar el marcador antes incluso de que ruede la pelota.',
          price: 1000,
        },
        en: {
          name: 'Argentina jersey for the bride to enjoy the World Cup',
          description: 'To even the score before the ball even starts rolling.',
          price: 90,
        },
      },
    },
    {
      id: 2,
      emoji: '🥖',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Rolo de macarrão caso o noivo não se comporte',
          description:
            'Recurso pedagógico clássico para manter a vida a dois em harmonia.',
          price: 250,
        },
        ar: {
          name: 'Palo de amasar por si el novio no se porta bien',
          description:
            'Recurso pedagógico clásico para mantener la vida en pareja en armonía.',
          price: 30000,
        },
        en: {
          name: 'Rolling pin in case the groom misbehaves',
          description:
            'A classic pedagogical resource to keep married life in harmony.',
          price: 20,
        },
      },
    },
    {
      id: 3,
      emoji: '⛑️',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Capacete para proteger o noivo do rolo de macarrão',
          description:
            'Combo prevenção: melhor evitar o problema do que sofrer com ele.',
          price: 300,
        },
        ar: {
          name: 'Casco para proteger al novio del palo de amasar',
          description:
            'Combo prevención: mejor evitar el problema que sufrirlo.',
          price: 60000,
        },
        en: {
          name: 'Helmet to protect the groom from the rolling pin',
          description:
            'Prevention combo: better to dodge the problem than endure it.',
          price: 30,
        },
      },
    },
    {
      id: 4,
      emoji: '💈',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: '6 meses de corte de cabelo para o noivo',
          description: 'Plano semestral — para quem é tão otimista quanto generoso.',
          price: 150,
        },
        ar: {
          name: '6 meses de corte de pelo para el novio',
          description: 'Plan semestral — para quien es tan optimista como generoso.',
          price: 40000,
        },
        en: {
          name: '6 months of haircuts for the groom',
          description: 'A six-month plan — for those as optimistic as they are generous.',
          price: 70,
        },
      },
    },
    {
      id: 5,
      emoji: '🪜',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Escada para a noiva conseguir beijar o noivo no altar',
          description:
            'Solução criativa para alcançar os lábios do noivo sem abrir mão da elegância.',
          price: 350,
        },
        ar: {
          name: 'Escalera para que la novia llegue a besar al novio en el altar',
          description:
            'Solución creativa para llegar a los labios del novio sin perder la elegancia.',
          price: 150000,
        },
        en: {
          name: 'Ladder so the bride can kiss the groom at the altar',
          description:
            'A creative way to reach the groom’s lips without giving up the elegance.',
          price: 100,
        },
      },
    },
    {
      id: 6,
      emoji: '🛏️',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Cobertor para a noiva, que sempre está coberta de razão',
          description:
            'Para os dias em que ela ganha a discussão antes mesmo de começar.',
          price: 100,
        },
        ar: {
          name: 'Manta para la novia, que siempre está cubierta de razón',
          description:
            'Para los días en que ella gana la discusión antes incluso de empezar.',
          price: 200000,
        },
        en: {
          name: 'Blanket for the bride — she’s always covered in being right',
          description:
            'For the days when she wins the argument before it even starts.',
          price: 40,
        },
      },
    },
    {
      id: 7,
      emoji: '🍽️',
      image: '',
      category: { br: 'VIP', ar: 'VIP', en: 'VIP' },
      localized: {
        br: {
          name: 'Primeiro lugar na fila do buffet',
          description: 'Sem espera. Direto à comida. Sem julgamentos.',
          price: 360,
        },
        ar: {
          name: 'Primer puesto en la fila del buffet',
          description: 'Sin esperar. Directo a la comida. Sin juicios.',
          price: 180000,
        },
        en: {
          name: 'First in line at the buffet',
          description: 'No waiting. Straight to the food. No judgment.',
          price: 150,
        },
      },
    },
    {
      id: 8,
      emoji: '✈️',
      image: '',
      category: { br: 'VIP', ar: 'VIP', en: 'VIP' },
      localized: {
        br: {
          name: 'Ir junto com os noivos para a lua de mel',
          description:
            'Toalha de praia incluída. Apartamento separado, prometemos.',
          price: 5000,
        },
        ar: {
          name: 'Acompañar a los novios en la luna de miel',
          description:
            'Toalla de playa incluida. Departamento aparte, lo prometemos.',
          price: 3000000,
        },
        en: {
          name: 'Join the couple on their honeymoon',
          description:
            'Beach towel included. Separate apartment, we promise.',
          price: 2000,
        },
      },
    },
    {
      id: 9,
      emoji: '🏰',
      image: '',
      category: { br: 'VIP', ar: 'VIP', en: 'VIP' },
      localized: {
        br: {
          name: 'Prioridade no quarto de hóspedes dos noivos na Inglaterra',
          description:
            'Pernoites garantidos, chá das cinco incluído e fila zero.',
          price: 700,
        },
        ar: {
          name: 'Prioridad en el cuarto de huéspedes de los novios en Inglaterra',
          description:
            'Estadías garantizadas, té de las cinco incluido y sin filas.',
          price: 250000,
        },
        en: {
          name: 'Priority access to the couple’s guest room in England',
          description:
            'Stays guaranteed, five-o’clock tea included, no queue.',
          price: 230,
        },
      },
    },
    {
      id: 10,
      emoji: '🧘',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Dose de paciência para a noiva',
          description: 'Pequena dose diária para sobreviver aos detalhes da vida real.',
          price: 180,
        },
        ar: {
          name: 'Dosis de paciencia para la novia',
          description: 'Pequeña dosis diaria para sobrevivir a los detalles de la vida real.',
          price: 300000,
        },
        en: {
          name: 'A dose of patience for the bride',
          description: 'A tiny daily dose to survive the small things of real life.',
          price: 80,
        },
      },
    },
    {
      id: 11,
      emoji: '🎧',
      image: '',
      category: { br: 'VIP', ar: 'VIP', en: 'VIP' },
      localized: {
        br: {
          name: 'Pedir suas músicas para o DJ',
          description: 'Crédito direto na cabine: três pedidos garantidos durante a festa.',
          price: 330,
        },
        ar: {
          name: 'Pedir tus canciones al DJ',
          description: 'Crédito directo en la cabina: tres pedidos garantizados durante la fiesta.',
          price: 450000,
        },
        en: {
          name: 'Request your songs from the DJ',
          description: 'Direct credit at the booth: three guaranteed requests during the party.',
          price: 300,
        },
      },
    },
    {
      id: 12,
      emoji: '🩲',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Cueca especial para o noivo na noite de núpcias',
          description: 'Modelo edição limitada — usada uma única vez, mas a história fica.',
          price: 90,
        },
        ar: {
          name: 'Calzoncillo especial para el novio en la noche de bodas',
          description: 'Modelo edición limitada — usado una sola vez, pero la historia queda.',
          price: 90000,
        },
        en: {
          name: 'Special underwear for the groom on the wedding night',
          description: 'Limited-edition model — worn just once, but the story stays.',
          price: 35,
        },
      },
    },
    {
      id: 13,
      emoji: '🇹🇷',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Implante capilar na Turquia para o noivo',
          description:
            'Procedimento estético internacional para resolver de uma vez por todas — passagem para Istambul incluída na imaginação.',
          price: 2500,
        },
        ar: {
          name: 'Implante capilar en Turquía para el novio',
          description:
            'Procedimiento estético internacional para resolverlo de una vez por todas — pasaje a Estambul incluido en la imaginación.',
          price: 1000000,
        },
        en: {
          name: 'Hair transplant in Turkey for the groom',
          description:
            'An international cosmetic procedure to settle it once and for all — flight to Istanbul included in spirit.',
          price: 1500,
        },
      },
    },
    {
      id: 14,
      emoji: '🍳',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Curso de culinária para a Alexita',
          description: 'Investimento no futuro gastronômico do casal — agradecimentos antecipados, Chico.',
          price: 500,
        },
        ar: {
          name: 'Curso de cocina para Alexita',
          description: 'Inversión en el futuro gastronómico de la pareja — gracias por adelantado, Tomi.',
          price: 500000,
        },
        en: {
          name: 'Cooking course for Alexita',
          description: 'An investment in the couple’s culinary future — thanks in advance, Chico.',
          price: 160,
        },
      },
    },
    {
      id: 15,
      emoji: '😴',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Tampão de ouvido para não escutar os roncos do Chico',
          description: 'Tecnologia de ponta para preservar a saúde mental da noiva.',
          price: 50,
        },
        ar: {
          name: 'Tapones para no escuchar los ronquidos de Tomi',
          description: 'Tecnología de punta para preservar la salud mental de la novia.',
          price: 15000,
        },
        en: {
          name: 'Earplugs to block out Chico’s snoring',
          description: 'Cutting-edge technology to preserve the bride’s sanity.',
          price: 15,
        },
      },
    },
    {
      id: 16,
      emoji: '🍔',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Ajude a Alexita a comer para não ficar mal-humorada',
          description: 'Vale-lanche permanente. Investimento certeiro na paz doméstica.',
          price: 170,
        },
        ar: {
          name: 'Ayudá a Alexita a comer para que no se ponga de mal humor',
          description: 'Vale-merienda permanente. Inversión certera en la paz doméstica.',
          price: 35000,
        },
        en: {
          name: 'Help Alexita eat — so she doesn’t get hangry',
          description: 'A permanent snack voucher. A sure-fire investment in domestic peace.',
          price: 45,
        },
      },
    },
    {
      id: 17,
      emoji: '🥩',
      image: '',
      category: { br: 'VIP', ar: 'VIP', en: 'VIP' },
      localized: {
        br: {
          name: '1 ano de bife para o noivo na Inglaterra',
          description: 'Porque saudade de churrasco se cura com proteína de qualidade.',
          price: 550,
        },
        ar: {
          name: '1 año de bife para el novio en Inglaterra',
          description: 'Porque la nostalgia del asado se cura con proteína de calidad.',
          price: 350000,
        },
        en: {
          name: '1 year of steaks for the groom in England',
          description: 'Because longing for proper grilled meat is cured with quality protein.',
          price: 120,
        },
      },
    },
    {
      id: 18,
      emoji: '🪙',
      image: '',
      category: { br: 'Brincadeira', ar: 'Broma', en: 'Joke' },
      localized: {
        br: {
          name: 'Só para não dizer que não dei nada',
          description: 'Você paga isto e ainda conta para todos que não deu nada. Vitória dupla.',
          price: 100,
        },
        ar: {
          name: 'Una boludez para los novios',
          description: 'Pagás esto y aun así contás a todos que no regalaste nada. Doble victoria.',
          price: 10000,
        },
        en: {
          name: 'Just to say I didn’t give anything',
          description: 'You pay for this and still tell everyone you gave nothing. Double win.',
          price: 10,
        },
      },
    },
  ],
  // Travel tips — destinations to suggest to guests visiting northeast Brazil.
  // Distances are relative to the BR venue (Hotel Ponta de Inhambupe, Esplanada-BA).
  travelTips: [
    {
      id: 'praia-do-forte',
      reelUrl: 'https://www.instagram.com/reel/CZmlopxFhbT/',
      mapLink: 'https://www.google.com/maps/place/Praia+do+Forte,+Mata+de+S%C3%A3o+Jo%C3%A3o+-+State+of+Bahia',
      localized: {
        br: {
          name: 'Praia do Forte',
          blurb: 'Vila litorânea charmosa, sede do Projeto Tamar e com praias tranquilas de água quente.',
          distance: '≈ 1h de carro',
          distanceFromSsa: '≈ 1h de carro',
          highlights: 'Projeto Tamar (santuário de tartarugas), ruínas do Castelo Garcia d’Ávila, Alameda do Sol e piscinas naturais na maré baixa.',
          stay: 'Iberostar Selection Praia do Forte (5★ all-inclusive) ou Sobrado da Vila (charme e a melhor localização na vila).',
          budget: 'R$ 700–1.300',
        },
        ar: {
          name: 'Praia do Forte',
          blurb: 'Pueblito costero con encanto, sede del Projeto Tamar (tortugas marinas) y playas tranquilas.',
          distance: '≈ 1h en auto',
          distanceFromSsa: '≈ 1h en auto',
          highlights: 'Projeto Tamar (santuario de tortugas), ruinas del Castelo Garcia d’Ávila, Alameda do Sol y piscinas naturales con marea baja.',
          stay: 'Iberostar Selection Praia do Forte (5★ all-inclusive) o Sobrado da Vila (con encanto y la mejor ubicación en el pueblo).',
          budget: 'R$ 700–1.300',
        },
        en: {
          name: 'Praia do Forte',
          blurb: 'Charming coastal village with the Tamar sea-turtle sanctuary and warm, quiet beaches.',
          distance: '≈ 1h drive',
          distanceFromSsa: '≈ 1h drive',
          highlights: 'Tamar sea-turtle sanctuary, the Garcia d’Ávila castle ruins, the Alameda do Sol pedestrian street, and tide pools at low tide.',
          stay: 'Iberostar Selection Praia do Forte (5★ all-inclusive) or Sobrado da Vila (charming, with the best location in the village).',
          budget: 'R$ 700–1,300',
        },
      },
    },
    {
      id: 'aracaju',
      reelUrl: 'https://www.instagram.com/reel/DOZUTlzEWZU/',
      mapLink: 'https://www.google.com/maps/place/Aracaju,+State+of+Sergipe',
      localized: {
        br: {
          name: 'Aracaju',
          blurb: 'Capital de Sergipe com praias urbanas tranquilas, a Orla de Atalaia e a charmosa Praia da Caueira.',
          distance: '≈ 2h30 de carro',
          distanceFromSsa: '≈ 4h de carro',
          highlights: 'Orla de Atalaia (4,6 km de calçadão), Mercado Central, bate-volta aos Cânions do Xingó e a calma Praia da Caueira.',
          stay: 'Aquários Praia Hotel (na Orla de Atalaia) ou Real Praia Hotel (clássico, na mesma orla).',
          budget: 'R$ 450–800',
        },
        ar: {
          name: 'Aracaju',
          blurb: 'Capital de Sergipe con playas urbanas tranquilas, la Orla de Atalaia y la encantadora Praia da Caueira.',
          distance: '≈ 2h30 en auto',
          distanceFromSsa: '≈ 4h en auto',
          highlights: 'Orla de Atalaia (4,6 km de rambla), Mercado Central, excursión a los Cañones de Xingó y la tranquila Praia da Caueira.',
          stay: 'Aquários Praia Hotel (sobre la Orla de Atalaia) o Real Praia Hotel (clásico, sobre la misma rambla).',
          budget: 'R$ 450–800',
        },
        en: {
          name: 'Aracaju',
          blurb: 'Sergipe’s capital — calm urban beaches, the Atalaia boardwalk, and the lovely Caueira beach.',
          distance: '≈ 2h30 drive',
          distanceFromSsa: '≈ 4h drive',
          highlights: 'The 4.6 km Atalaia boardwalk, Central Market, a day-trip to the Xingó canyons, and quiet Caueira beach.',
          stay: 'Aquários Praia Hotel (on the Atalaia seafront) or Real Praia Hotel (a classic just up the same boardwalk).',
          budget: 'R$ 450–800',
        },
      },
    },
    {
      id: 'morro-de-sao-paulo',
      reelUrl: 'https://www.instagram.com/reel/DTX3zCVD3fH/',
      mapLink: 'https://www.google.com/maps/place/Morro+de+S%C3%A3o+Paulo,+Cair%C3%BA+-+State+of+Bahia',
      localized: {
        br: {
          name: 'Morro de São Paulo',
          blurb: 'Ilha sem carros com praias numeradas paradisíacas, vida noturna e barcos saindo de Salvador.',
          distance: '≈ 4h (carro + barco)',
          distanceFromSsa: '≈ 3h30 (carro + barco)',
          highlights: 'As Quatro Praias numeradas (Segunda é a mais animada, Quarta é paradisíaca), tirolesa sobre a Primeira, pôr do sol na Toca do Morcego e snorkel nas piscinas naturais de Garapuá.',
          stay: 'Pousada Minha Louca Paixão (Segunda Praia, charmosa e bem localizada) ou Pousada Dona Moça (charme pé-na-areia, também na Segunda Praia).',
          budget: 'R$ 700–1.500',
        },
        ar: {
          name: 'Morro de São Paulo',
          blurb: 'Isla sin autos, con playas paradisíacas numeradas, vida nocturna y catamaranes desde Salvador.',
          distance: '≈ 4h (auto + lancha)',
          distanceFromSsa: '≈ 3h30 (auto + lancha)',
          highlights: 'Las Cuatro Playas numeradas (Segunda es la más movida, Cuarta es paradisíaca), tirolesa sobre la Primeira, atardecer en Toca do Morcego y snorkel en las piscinas naturales de Garapuá.',
          stay: 'Pousada Minha Louca Paixão (Segunda Praia, encantadora y bien ubicada) o Pousada Dona Moça (encanto pie-en-la-arena, también en Segunda Praia).',
          budget: 'R$ 700–1.500',
        },
        en: {
          name: 'Morro de São Paulo',
          blurb: 'Car-free island with numbered paradise beaches, lively nights, and boats from Salvador.',
          distance: '≈ 4h (drive + ferry)',
          distanceFromSsa: '≈ 3h30 (drive + ferry)',
          highlights: 'The numbered beaches (Segunda is the social hub, Quarta is the paradise one), the Primeira-Praia zipline, sunset at Toca do Morcego, and snorkeling Garapuá’s natural pools.',
          stay: 'Pousada Minha Louca Paixão (Segunda Praia, charming and well located) or Pousada Dona Moça (a charming beachfront spot, also on Segunda Praia).',
          budget: 'R$ 700–1,500',
        },
      },
    },
    {
      id: 'maragogi',
      reelUrl: 'https://www.instagram.com/reel/DPquUfXjf87/',
      mapLink: 'https://www.google.com/maps/place/Maragogi,+State+of+Alagoas',
      localized: {
        br: {
          name: 'Maragogi',
          blurb: 'Conhecida como o Caribe brasileiro: piscinas naturais, recifes e águas cristalinas em Alagoas.',
          distance: '≈ 5h de carro',
          distanceFromSsa: '≈ 1h de avião (via Maceió) + 2h de carro',
          highlights: 'Catamarã às piscinas naturais dos Galés (6 km mar adentro — vá no primeiro horário), Praia do Toque, Praia de Antunes e passeio de jangada às Taocas com almoço de lagosta.',
          stay: 'Salinas Maragogi (all-inclusive clássico) ou Pousada Olho d’Água (pé-na-areia, mais tranquila e charmosa).',
          budget: 'R$ 900–1.800',
        },
        ar: {
          name: 'Maragogi',
          blurb: 'Conocida como el Caribe brasileño: piscinas naturales, arrecifes y aguas cristalinas en Alagoas.',
          distance: '≈ 5h en auto',
          distanceFromSsa: '≈ 1h en avión (vía Maceió) + 2h en auto',
          highlights: 'Catamarán a las piscinas naturales de Galés (6 km mar adentro — ir en el primer turno), Praia do Toque, Praia de Antunes y paseo en jangada a Taocas con almuerzo de langosta.',
          stay: 'Salinas Maragogi (all-inclusive clásico) o Pousada Olho d’Água (pie-en-la-arena, más tranquila y con encanto).',
          budget: 'R$ 900–1.800',
        },
        en: {
          name: 'Maragogi',
          blurb: 'Known as Brazil’s Caribbean — natural pools, reefs, and crystal-clear waters in Alagoas.',
          distance: '≈ 5h drive',
          distanceFromSsa: '≈ 1h flight (via Maceió) + 2h drive',
          highlights: 'Catamaran to the Galés natural pools (6 km offshore — book the first slot), Praia do Toque, Praia de Antunes, and a jangada ride to Taocas for a lobster lunch.',
          stay: 'Salinas Maragogi (the classic all-inclusive resort) or Pousada Olho d’Água (feet-in-the-sand, quieter and charming).',
          budget: 'R$ 900–1,800',
        },
      },
    },
    {
      id: 'chapada-diamantina',
      reelUrl: 'https://www.instagram.com/reel/CZX5CeoFDCD/',
      mapLink: 'https://www.google.com/maps/place/Chapada+Diamantina+National+Park',
      localized: {
        br: {
          name: 'Chapada Diamantina',
          blurb: 'Parque nacional no interior baiano: cachoeiras, grutas, trilhas e paisagens de tirar o fôlego.',
          distance: '≈ 6h de carro',
          distanceFromSsa: '≈ 6h de carro ou voo regional para Lençóis',
          highlights: 'Poço Azul e Poço Encantado (feixes de luz nas águas azul-elétrico, abr–set), Cachoeira da Fumaça (340 m), Vale do Pati, pôr do sol no Morro do Pai Inácio e a vila de pedra de Lençóis como base.',
          stay: 'Pousada Vila Serrano (charme rústico em Lençóis) ou Hotel Canto das Águas (à beira-rio, mais conforto).',
          budget: 'R$ 450–800',
        },
        ar: {
          name: 'Chapada Diamantina',
          blurb: 'Parque nacional en el interior bahiano: cascadas, grutas, senderos y paisajes asombrosos.',
          distance: '≈ 6h en auto',
          distanceFromSsa: '≈ 6h en auto o vuelo regional a Lençóis',
          highlights: 'Poço Azul y Poço Encantado (haces de luz sobre aguas azul-eléctrico, abr–sep), Cachoeira da Fumaça (340 m), Vale do Pati, atardecer en el Morro do Pai Inácio y el pueblito de piedra de Lençóis como base.',
          stay: 'Pousada Vila Serrano (encanto rústico en Lençóis) o Hotel Canto das Águas (al borde del río, más confort).',
          budget: 'R$ 450–800',
        },
        en: {
          name: 'Chapada Diamantina',
          blurb: 'Inland national park: waterfalls, caves, hiking trails, and breathtaking rock formations.',
          distance: '≈ 6h drive',
          distanceFromSsa: '≈ 6h drive or regional flight to Lençóis',
          highlights: 'Poço Azul and Poço Encantado (sunbeams turn the cave water electric blue, Apr–Sep), the 340 m Cachoeira da Fumaça, the Vale do Pati trek, sunset on Morro do Pai Inácio, and the cobblestone town of Lençóis as your base.',
          stay: 'Pousada Vila Serrano (rustic charm in Lençóis) or Hotel Canto das Águas (riverside, more comfort).',
          budget: 'R$ 450–800',
        },
      },
    },
    {
      id: 'porto-de-galinhas',
      reelUrl: 'https://www.instagram.com/reel/DPbcDtPjS8c/',
      mapLink: 'https://www.google.com/maps/place/Porto+de+Galinhas,+Ipojuca+-+State+of+Pernambuco',
      localized: {
        br: {
          name: 'Porto de Galinhas',
          blurb: 'Piscinas naturais transparentes, jangadas coloridas e o azul-verde mais icônico do nordeste pernambucano.',
          distance: '≈ 1h30 de avião + 1h de carro',
          distanceFromSsa: '≈ 1h30 de avião (via Recife) + 1h de carro',
          highlights: 'Piscinas naturais de jangada na maré baixa (consulte a tábua de marés), pôr do sol no Pontal de Maracaípe com os cavalos-marinhos, surf na Praia de Maracaípe e a vida noturna da Rua da Esperança.',
          stay: 'Nannai Resort (5★ luxo pé-na-areia, bangalôs), Hotel Village Porto de Galinhas (estilo vila boutique, ótima localização) ou Pousada Tabapitanga (boutique aconchegante perto da vila).',
          budget: 'R$ 700–1.500',
        },
        ar: {
          name: 'Porto de Galinhas',
          blurb: 'Piscinas naturales cristalinas, jangadas coloridas y el verde-azulado más icónico del nordeste brasileño.',
          distance: '≈ 1h30 en avión + 1h en auto',
          distanceFromSsa: '≈ 1h30 en avión (vía Recife) + 1h en auto',
          highlights: 'Piscinas naturales en jangada con marea baja (consultá la tabla de mareas), atardecer en el Pontal de Maracaípe con los caballitos de mar, surf en Praia de Maracaípe y la noche en la Rua da Esperança.',
          stay: 'Nannai Resort (5★ lujo pie-en-la-arena, bungalows), Hotel Village Porto de Galinhas (estilo villa boutique, ubicación inmejorable) o Pousada Tabapitanga (boutique acogedor cerca del pueblo).',
          budget: 'R$ 700–1.500',
        },
        en: {
          name: 'Porto de Galinhas',
          blurb: 'Crystal-clear natural tide pools, colorful jangada rafts, and the most iconic turquoise waters of Pernambuco.',
          distance: '≈ 1h30 flight + 1h drive',
          distanceFromSsa: '≈ 1h30 flight (via Recife) + 1h drive',
          highlights: 'Jangada rides to the natural tide pools at low tide (check the tide chart), sunset at Pontal de Maracaípe with the seahorses, surfing at Maracaípe beach, and nightlife along Rua da Esperança.',
          stay: 'Nannai Resort (5★ beachfront luxury bungalows), Hotel Village Porto de Galinhas (boutique village-style with a great location) or Pousada Tabapitanga (cozy boutique near the village).',
          budget: 'R$ 700–1,500',
        },
      },
    },
  ],
  // Region-specific configurations
  regions: {
    br: {
      region: 'br',
      label: 'Brasil',
      language: 'pt',
      currency: 'BRL',
      currencySymbol: 'R$',
      content: {
        nav: {
          home: 'Início',
          couple: 'O Casal',
          ceremony: 'Cerimônia',
          travel: 'Viagem',
          gifts: 'Lista de Presentes',
          rsvp: 'Confirmação',
          messages: 'Mensagens',
        },
        welcomeTitle: 'Bem-vindos',
        welcomeText: 'Estamos muito felizes em compartilhar este momento tão especial com vocês.',
        giftListTitle: 'Lista de Presentes',
        giftButton: 'Presentear',
        cartTitle: 'Meu Carrinho',
        addMoreGifts: 'Adicionar mais presentes',
        continueCheckout: 'Continuar com a compra',
        gifterInfoTitle: 'Sua Mensagem',
        paymentTitle: 'Pagamento',
        orderSummary: 'Resumo do pedido',
        totalLabel: 'Total a pagar',
        successTitle: 'Pedido Confirmado!',
        backToSite: 'Voltar para o site',
        travelTipsTitle: 'Dicas de Viagem',
        travelTipsIntro: 'Sugestões para conhecer o Nordeste brasileiro durante a sua viagem.',
        travelMapButton: 'Ver no Mapa',
        travelLabelDistance: 'Da boda',
        travelLabelDistanceSsa: 'Do aeroporto (SSA)',
        travelLabelHighlights: 'Não pode faltar',
        travelLabelStay: 'Onde ficar',
        travelLabelBudget: 'Orçamento / dia',
        coupleTitle: 'A Nossa História',
        coupleStory:
          'Era uma vez… uma garota incrível, que carregava no olhar um brilho de quem nasceu para viver grandes histórias. Ela deixou sua terra, sua família e amigos para seguir o coração e explorar o mundo. E o destino… ah, o destino sabia exatamente onde queria levá-la. No meio do caminho, apareceu ele. Um argentino com sotaque marcante, sorriso fácil… e um jeito de olhar que dizia tudo sem dizer nada. Entre uma conversa e outra, ele encontrou um lar no sorriso dela. E ela… percebeu que encontrou amor nos braços dele. Vieram viagens, risadas, abraços apertados e até desafios — porque a vida real é feita disso. Mas em cada momento, a escolha sempre foi a mesma: ficar. Ficar, porque juntos, tudo faz sentido.',
        coupleAttribution: 'Gessy (amiga da noiva)',
        countdown: { days: 'Dias', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
      },
    },
    ar: {
      region: 'ar',
      label: 'Argentina',
      language: 'es',
      currency: 'ARS',
      currencySymbol: '$',
      content: {
        nav: {
          home: 'Inicio',
          couple: 'La Pareja',
          ceremony: 'Ceremonia',
          travel: 'Viaje',
          gifts: 'Lista de Regalos',
          rsvp: 'Confirmación',
          messages: 'Mensajes',
        },
        welcomeTitle: 'Bienvenidos',
        welcomeText: 'Estamos muy felices de compartir este momento tan especial con ustedes.',
        giftListTitle: 'Lista de Regalos',
        giftButton: 'Regalar',
        cartTitle: 'Mi Carrito',
        addMoreGifts: 'Agregar más regalos',
        continueCheckout: 'Continuar con el regalo',
        gifterInfoTitle: 'Tu Mensaje',
        paymentTitle: 'Pago',
        orderSummary: 'Resumen del pedido',
        totalLabel: 'Total a pagar',
        successTitle: '¡Pedido Confirmado!',
        backToSite: 'Volver al sitio',
        travelTipsTitle: 'Tips de Viaje',
        travelTipsIntro: 'Sugerencias para descubrir el Nordeste brasileño durante el viaje.',
        travelMapButton: 'Ver en Mapa',
        travelLabelDistance: 'De la boda',
        travelLabelDistanceSsa: 'Del aeropuerto (SSA)',
        travelLabelHighlights: 'Imperdible',
        travelLabelStay: 'Dónde alojarse',
        travelLabelBudget: 'Presupuesto / día',
        coupleTitle: 'Nuestra Historia',
        coupleStory:
          'Érase una vez… una chica increíble, que llevaba en la mirada el brillo de quien nació para vivir grandes historias. Dejó su tierra, su familia y sus amigos para seguir el corazón y descubrir el mundo. Y el destino… ah, el destino sabía exactamente a dónde la quería llevar. En el medio del camino, apareció él. Un argentino de acento marcado, sonrisa fácil… y una manera de mirar que lo decía todo sin decir nada. Entre una charla y otra, él encontró un hogar en su sonrisa. Y ella… descubrió que encontró amor en sus brazos. Vinieron viajes, risas, abrazos apretados y hasta desafíos — porque la vida real está hecha de eso. Pero en cada momento, la elección siempre fue la misma: quedarse. Quedarse, porque juntos, todo tiene sentido.',
        coupleAttribution: 'Gessy (amiga de la novia)',
        countdown: { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
      },
    },
    en: {
      region: 'en',
      label: 'International',
      language: 'en',
      currency: 'GBP',
      currencySymbol: '£',
      content: {
        nav: {
          home: 'Home',
          couple: 'The Couple',
          ceremony: 'Ceremony',
          travel: 'Travel',
          gifts: 'Gift List',
          rsvp: 'RSVP',
          messages: 'Messages',
        },
        welcomeTitle: 'Welcome',
        welcomeText: 'We are very happy to share this special moment with you.',
        giftListTitle: 'Gift List',
        giftButton: 'Gift',
        cartTitle: 'My Cart',
        addMoreGifts: 'Add more gifts',
        continueCheckout: 'Continue to checkout',
        gifterInfoTitle: 'Your Message',
        paymentTitle: 'Payment',
        orderSummary: 'Order Summary',
        totalLabel: 'Total to pay',
        successTitle: 'Order Confirmed!',
        backToSite: 'Back to site',
        travelTipsTitle: 'Travel Tips',
        travelTipsIntro: 'Recommendations for exploring northeast Brazil while you’re here.',
        travelMapButton: 'View on Map',
        travelLabelDistance: 'From the wedding',
        travelLabelDistanceSsa: 'From the airport (SSA)',
        travelLabelHighlights: 'Don’t miss',
        travelLabelStay: 'Where to stay',
        travelLabelBudget: 'Budget / day',
        coupleTitle: 'Our Story',
        coupleStory:
          'Once upon a time… an incredible girl who carried in her gaze the sparkle of someone born to live great stories. She left her land, her family and her friends to follow her heart and explore the world. And destiny… ah, destiny knew exactly where it wanted to take her. Along the way, he appeared. An Argentine with a striking accent, an easy smile… and a way of looking that said everything without saying a word. Between one conversation and another, he found a home in her smile. And she… realized she had found love in his arms. There came trips, laughter, tight hugs and even challenges — because real life is made of that. But in every moment, the choice was always the same: to stay. To stay, because together, everything makes sense.',
        coupleAttribution: 'Gessy (friend of the bride)',
        countdown: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
      },
    },
  },
  // Bank details for manual transfers
  bankDetails: {
    ar: {
      ars: {
        label: 'Pesos (ARS)',
        bank: 'Banco Galicia',
        alias: 'boda.alexita.chico',
        cbu: '0070000000000000000000',
        holder: 'Alexita & Chico',
      },
      usd: {
        label: 'Dólares (USD)',
        bank: 'Banco Galicia',
        alias: 'boda.usd.alexita',
        cbu: '0070000000000000000001',
        holder: 'Alexita & Chico',
      },
    },
  },
};
