export const siteConfig = {
  names: {
    groom: 'Chico',
    bride: 'Alexita',
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
      dateTime: '2027-02-20T11:00:00',
      locationName: 'Club de Campo San Diego',
      address: 'Au Acceso Oeste Km 42, B1744 Moreno, Provincia de Buenos Aires, Argentina',
      mapLink: 'https://www.google.com/maps/place/Club+de+Campo+San+Diego/@-34.6147323,-58.8543517,17z/data=!3m1!4b1!4m6!3m5!1s0x95bc9437abeabf2b:0xd3205ac9847354cf!8m2!3d-34.6147323!4d-58.8517768!16s%2Fg%2F11tk8ps8f?entry=ttu',
    },
    br: {
      id: 'brasil',
      title: 'Brasil',
      dateTime: '2027-03-06T16:00:00',
      locationName: 'Hotel Boutique & Spa Ponta de Inhambupe',
      address: 'Loteamento Ponta de Inhambupe, 189 - Baixio, Esplanada - BA, 48370-000, Brasil',
      mapLink: 'https://www.google.com/maps/place/Hotel+Boutique+%26+Spa+Ponta+de+Inhambupe+by+Slaviero+Hot%C3%A9is/@-12.1023221,-37.6930429,17z/data=!3m1!4b1!4m9!3m8!1s0x717376dd6887931:0x6d4526a6d0ab8dea!5m2!4m1!1i2!8m2!3d-12.1023221!4d-37.690468!16s%2Fg%2F11pdxwrbyd?entry=ttu',
    },
  },
  // Centralized Gift Registry
  gifts: [
    {
      id: 1,
      category: { br: 'Experiência', ar: 'Experiencia', en: 'Experience' },
      localized: {
        br: { name: 'Jantar Romântico em Buenos Aires', description: 'Um jantar especial para o casal.', price: 500 },
        ar: { name: 'Cena Romántica en Buenos Aires', description: 'Una cena especial para la pareja.', price: 15000 },
        en: { name: 'Romantic Dinner in Buenos Aires', description: 'A special dinner for the couple.', price: 100 },
      },
    },
    {
      id: 2,
      category: { br: 'Viagem', ar: 'Viaje', en: 'Travel' },
      localized: {
        br: { name: 'Passagens Aéreas', description: 'Ajude-nos a chegar ao nuestro destino.', price: 2000 },
        ar: { name: 'Pasajes Aéreos', description: 'Ayúdanos a llegar a nuestro destino.', price: 60000 },
        en: { name: 'Flight Tickets', description: 'Help us reach our destination.', price: 400 },
      },
    },
    {
      id: 3,
      category: { br: 'Viagem', ar: 'Viaje', en: 'Travel' },
      localized: {
        br: { name: 'Hospedagem em Resort', description: 'Uma noite de descanso e luxo.', price: 800 },
        ar: { name: 'Estadía en Resort', description: 'Una noche de descanso y lujo.', price: 25000 },
        en: { name: 'Resort Stay', description: 'A night of rest and luxury.', price: 150 },
      },
    },
    {
      id: 4,
      category: { br: 'Experiência', ar: 'Experiencia', en: 'Experience' },
      localized: {
        br: { name: 'Passeio de Barco', description: 'Explorando as águas cristalinas.', price: 300 },
        ar: { name: 'Paseo en Barco', description: 'Explorando las aguas cristalinas.', price: 10000 },
        en: { name: 'Boat Trip', description: 'Exploring crystalline waters.', price: 60 },
      },
    },
    {
      id: 5,
      category: { br: 'Casa', ar: 'Casa', en: 'Home' },
      localized: {
        br: { name: 'Jogo de Pratos', description: 'Para nossa nova casa.', price: 250 },
        ar: { name: 'Juego de Platos', description: 'Para nuestra nueva casa.', price: 8000 },
        en: { name: 'Dinnerware Set', description: 'For our new home.', price: 50 },
      },
    },
    {
      id: 6,
      category: { br: 'Casa', ar: 'Casa', en: 'Home' },
      localized: {
        br: { name: 'Cafeteira Espresso', description: 'Para começar o dia bem.', price: 100 },
        ar: { name: 'Cafetera Espresso', description: 'Para empezar bien el día.', price: 50000 },
        en: { name: 'Espresso Machine', description: 'To start the day right.', price: 120 },
      },
    },
  ],
  // Travel tips — destinations to suggest to guests visiting northeast Brazil.
  // Distances are relative to the BR venue (Hotel Ponta de Inhambupe, Esplanada-BA).
  travelTips: [
    {
      id: 'praia-do-forte',
      image: '',
      mapLink: 'https://www.google.com/maps/place/Praia+do+Forte,+Mata+de+S%C3%A3o+Jo%C3%A3o+-+State+of+Bahia',
      localized: {
        br: {
          name: 'Praia do Forte',
          blurb: 'Vila litorânea charmosa, sede do Projeto Tamar e com praias tranquilas de água quente.',
          distance: '≈ 1h de carro',
        },
        ar: {
          name: 'Praia do Forte',
          blurb: 'Pueblito costero con encanto, sede del Projeto Tamar (tortugas marinas) y playas tranquilas.',
          distance: '≈ 1h en auto',
        },
        en: {
          name: 'Praia do Forte',
          blurb: 'Charming coastal village with the Tamar sea-turtle sanctuary and warm, quiet beaches.',
          distance: '≈ 1h drive',
        },
      },
    },
    {
      id: 'morro-de-sao-paulo',
      image: '',
      mapLink: 'https://www.google.com/maps/place/Morro+de+S%C3%A3o+Paulo,+Cair%C3%BA+-+State+of+Bahia',
      localized: {
        br: {
          name: 'Morro de São Paulo',
          blurb: 'Ilha sem carros com praias numeradas paradisíacas, vida noturna e barcos saindo de Salvador.',
          distance: '≈ 4h (carro + barco)',
        },
        ar: {
          name: 'Morro de São Paulo',
          blurb: 'Isla sin autos, con playas paradisíacas numeradas, vida nocturna y catamaranes desde Salvador.',
          distance: '≈ 4h (auto + lancha)',
        },
        en: {
          name: 'Morro de São Paulo',
          blurb: 'Car-free island with numbered paradise beaches, lively nights, and boats from Salvador.',
          distance: '≈ 4h (drive + ferry)',
        },
      },
    },
    {
      id: 'chapada-diamantina',
      image: '',
      mapLink: 'https://www.google.com/maps/place/Chapada+Diamantina+National+Park',
      localized: {
        br: {
          name: 'Chapada Diamantina',
          blurb: 'Parque nacional no interior baiano: cachoeiras, grutas, trilhas e paisagens de tirar o fôlego.',
          distance: '≈ 6h de carro',
        },
        ar: {
          name: 'Chapada Diamantina',
          blurb: 'Parque nacional en el interior bahiano: cascadas, grutas, senderos y paisajes asombrosos.',
          distance: '≈ 6h en auto',
        },
        en: {
          name: 'Chapada Diamantina',
          blurb: 'Inland national park: waterfalls, caves, hiking trails, and breathtaking rock formations.',
          distance: '≈ 6h drive',
        },
      },
    },
    {
      id: 'trancoso',
      image: '',
      mapLink: 'https://www.google.com/maps/place/Trancoso,+Porto+Seguro+-+State+of+Bahia',
      localized: {
        br: {
          name: 'Trancoso',
          blurb: 'Vilarejo colonial famoso pelo Quadrado e pelas praias mais elegantes do sul da Bahia.',
          distance: '≈ 1h de avião + 1h de carro',
        },
        ar: {
          name: 'Trancoso',
          blurb: 'Pueblo colonial famoso por su Quadrado y las playas más elegantes del sur de Bahía.',
          distance: '≈ 1h en avión + 1h en auto',
        },
        en: {
          name: 'Trancoso',
          blurb: 'Colonial village famed for its Quadrado square and the upscale beaches of southern Bahia.',
          distance: '≈ 1h flight + 1h drive',
        },
      },
    },
    {
      id: 'maragogi',
      image: '',
      mapLink: 'https://www.google.com/maps/place/Maragogi,+State+of+Alagoas',
      localized: {
        br: {
          name: 'Maragogi',
          blurb: 'Conhecida como o Caribe brasileiro: piscinas naturais, recifes e águas cristalinas em Alagoas.',
          distance: '≈ 5h de carro',
        },
        ar: {
          name: 'Maragogi',
          blurb: 'Conocida como el Caribe brasileño: piscinas naturales, arrecifes y aguas cristalinas en Alagoas.',
          distance: '≈ 5h en auto',
        },
        en: {
          name: 'Maragogi',
          blurb: 'Known as Brazil’s Caribbean — natural pools, reefs, and crystal-clear waters in Alagoas.',
          distance: '≈ 5h drive',
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
      },
    },
    ar: {
      region: 'ar',
      label: 'Argentina',
      language: 'es',
      currency: 'ARS',
      currencySymbol: '$',
      content: {
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
      },
    },
    en: {
      region: 'en',
      label: 'International',
      language: 'en',
      currency: 'USD',
      currencySymbol: 'US$',
      content: {
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
