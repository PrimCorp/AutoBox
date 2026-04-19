export const MODELS = {
  mini: {
    name: 'MINI',
    medidas: '50 frontal × 60 prof × 80 alto cm',
    description: 'Compacto, ideal para un solo producto con hasta 2 salidas. Perfecto para espacios reducidos.',
    icon: '📦',
    outlets: [1, 2],
    systems: ['arduino', 'plc'],
    prices: {
      1: { arduino: 350, plc: 500 },
      2: { arduino: 450, plc: 600 }
    }
  },
  estandar: {
    name: 'ESTÁNDAR',
    medidas: '60 frontal × 50 prof × 140 alto cm',
    description: '3 a 6 salidas, almacena hasta 6 recipientes.',
    icon: '🗄️',
    outlets: [3, 4, 5, 6],
    systems: ['arduino', 'plc'],
    prices: {
      3: { arduino: 550, plc: 800 },
      4: { arduino: null, plc: 870 },
      5: { arduino: null, plc: 940 },
      6: { arduino: null, plc: 1000 }
    }
  },
  premium: {
    name: 'PERSONALIZADA',
    medidas: 'Diseño a medida del cliente',
    description: 'Alta capacidad con hasta 12 recipientes. Sistema PLC exclusivo.',
    icon: '🏭',
    outlets: [6, 7, 8],
    systems: ['plc'],
    prices: {
      6: { plc: 1000 },
      7: { plc: 1080 },
      8: { plc: 1160 }
    }
  }
}

export const PANTALLA = {
  arduino: 50,
  plc: 80
}
