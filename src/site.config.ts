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
  // Region-specific configurations
  regions: {
    br: {
      label: 'Brasil',
      language: 'pt',
      currency: 'BRL',
      currencySymbol: 'R$',
      content: {
        welcomeTitle: 'Bem-vindos',
        welcomeText: 'Estamos muito felizes em compartilhar este momento tão especial com vocês.',
        giftListTitle: 'Lista de Presentes',
        paymentMethods: ['Pix', 'Cartão de Crédito'],
      },
    },
    ar: {
      label: 'Argentina',
      language: 'es',
      currency: 'ARS',
      currencySymbol: '$',
      content: {
        welcomeTitle: 'Bienvenidos',
        welcomeText: 'Estamos muy felices de compartir este momento tan especial con ustedes.',
        giftListTitle: 'Lista de Regalos',
        paymentMethods: ['Transferencia Bancaria', 'Mercado Pago'],
      },
    },
  },
  // Bank details for manual transfers
  bankDetails: {
    ar: {
      bank: 'Banco Galicia',
      alias: 'boda.alexita.chico',
      cbu: '0070000000000000000000',
      holder: 'Alexita & Chico',
    },
  },
};
