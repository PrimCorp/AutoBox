export const MODELS = {
  mini: {
    name: 'MINI',
    medidas: '50 frontal × 60 prof × 80 alto cm',
    description: 'Compacto, ideal para un solo producto con hasta 2 salidas. Perfecto para espacios reducidos.',
    icon: '📦',
    outlets: [1, 2],
    systems: ['arduino', 'plc'],
    prices: {
      1: { arduino: 250, plc: 450 },
      2: { arduino: 350, plc: 550 }
    }
  },
  estandar: {
    name: 'ESTÁNDAR',
    medidas: '60 frontal × 50 prof × 1.40 alto cm',
    description: '3 a 6 salidas, almacena hasta 6 recipientes.',
    icon: '🗄️',
    outlets: [3, 4, 5, 6],
    systems: ['arduino', 'plc'],
    prices: {
      3: { arduino: 450, plc: 700 },
      4: { arduino: null, plc: 770 },
      5: { arduino: null, plc: 840 },
      6: { arduino: null, plc: 900 }
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
      6: { plc: 900 },
      7: { plc: 980 },
      8: { plc: 1060 }
    }
  }
}

export const PANTALLA = {
  arduino: 50,
  plc: 80
}
