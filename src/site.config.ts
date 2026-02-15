export const siteConfig = {
  names: {
    groom: 'Chico',
    bride: 'Alexita',
  },
  eventDate: '2027-03-06T17:00:00',
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
  links: {
    ceremony: 'https://maps.app.goo.gl/example',
    reception: 'https://maps.app.goo.gl/example',
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
        br: { name: 'Cafeteira Espresso', description: 'Para começar o dia bem.', price: 600 },
        ar: { name: 'Cafetera Espresso', description: 'Para empezar bien el día.', price: 20000 },
        en: { name: 'Espresso Machine', description: 'To start the day right.', price: 120 },
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
