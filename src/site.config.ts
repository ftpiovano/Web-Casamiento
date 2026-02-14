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
