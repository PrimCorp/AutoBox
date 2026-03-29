import { useState } from 'react'
import Machine3D from './Machine3D'
import { MODELS, PANTALLA } from '../data/prices'

function ModalPersonalizada({ onClose }) {
  const [otrasMedias, setOtrasMedias] = useState(false)

  // Config para Mini/Estándar con pantalla
  const [config, setConfig] = useState({
    base: 'mini',
    outlets: 1,
    sys: 'arduino',
    pantalla: false,
    nota: ''
  })

  // Config para Otras medidas
  const [custom, setCustom] = useState({
    ancho: '',
    alto: '',
    profundidad: '',
    salidas: '',
    sys: 'arduino',
    pantalla: false,
    nota: ''
  })

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  function updateConfig(key, val) {
    setConfig(prev => {
      const next = { ...prev, [key]: val }
      if (key === 'base') {
        next.outlets = val === 'mini' ? 1 : 3
        next.sys = 'arduino'
        next.pantalla = false
      }
      return next
    })
  }

  function updateCustom(key, val) {
    setCustom(prev => ({ ...prev, [key]: val }))
  }

  const baseModel = MODELS[config.base]
  const priceRow = baseModel.prices[config.outlets]

  function getPrice() {
    if (!priceRow) return null
    const base = config.sys === 'arduino' ? priceRow.arduino : priceRow.plc
    if (base === null) return null
    const extra = config.pantalla ? (config.sys === 'arduino' ? PANTALLA.arduino : PANTALLA.plc) : 0
    return base + extra
  }

  const totalPrice = getPrice()

  function sendWhatsApp() {
    const name = clientName || 'Cliente'
    let txt = `*COTIZACIÓN PERSONALIZADA - AUTOBOX*\n\n`
    txt += `Nombre: ${name}\n`
    if (clientPhone) txt += `Telefono: ${clientPhone}\n`
    txt += `\n*Configuracion:*\n`

    if (otrasMedias) {
      txt += `- Medidas: ${custom.ancho || '?'}cm ancho x ${custom.profundidad || '?'}cm prof x ${custom.alto || '?'}cm alto\n`
      txt += `- Salidas: ${custom.salidas || '?'}\n`
      txt += `- Sistema: ${custom.sys === 'arduino' ? 'Microcontrolador' : 'PLC'}\n`
      txt += `- Pantalla LCD: ${custom.pantalla ? 'Si' : 'No'}\n`
      txt += `- Precio: A consultar\n`
      if (custom.nota) txt += `\nNotas: ${custom.nota}`
    } else {
      txt += `- Base: ${baseModel.name}\n`
      txt += `- Medidas: ${baseModel.medidas}\n`
      txt += `- Salidas: ${config.outlets}\n`
      txt += `- Sistema: ${config.sys === 'arduino' ? 'Microcontrolador' : 'PLC'}\n`
      txt += `- Pantalla LCD: ${config.pantalla ? 'Si' : 'No'}\n`
      if (totalPrice) txt += `- Precio estimado: $${totalPrice}\n`
      if (config.nota) txt += `\nNotas: ${config.nota}`
    }

    const num = '+593994816398'
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(txt)}`, '_blank')
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--borde)',
    borderRadius: '8px', padding: '10px 14px', color: 'var(--blanco)',
    fontFamily: "'Exo 2', sans-serif", fontSize: '0.85rem',
    outline: 'none', width: '100%'
  }

  const labelStyle = {
    fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase',
    color: 'var(--gris)', marginBottom: '8px', display: 'block'
  }

  const sysOptions = (sysList, currentSys, onChange) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {sysList.map(sys => (
        <div key={sys} onClick={() => onChange(sys)} style={{
          border: `2px solid ${currentSys === sys ? 'var(--verde)' : 'var(--borde)'}`,
          borderRadius: '10px', padding: '14px', cursor: 'pointer',
          background: currentSys === sys ? 'rgba(0,255,170,0.05)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
            {sys === 'arduino' ? '⚡ Microcontrolador' : '🔧 PLC'}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--gris)' }}>
            {sys === 'arduino' ? 'Sin garantía' : 'Con garantía'}
          </div>
        </div>
      ))}
    </div>
  )

  const pantallaOptions = (currentVal, onChange, currentSys) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {[
        { val: false, label: '❌ Sin pantalla', desc: 'Precio base' },
        {
          val: true, label: '🖥️ Con pantalla',
          desc: currentSys === 'arduino'
            ? `Funcional · Cuenta monedas · +$${PANTALLA.arduino}`
            : `Solo informativa · No cuenta monedas · +$${PANTALLA.plc}`
        }
      ].map(opt => (
        <div key={String(opt.val)} onClick={() => onChange(opt.val)} style={{
          border: `2px solid ${currentVal === opt.val ? 'var(--amarillo)' : 'var(--borde)'}`,
          borderRadius: '10px', padding: '14px', cursor: 'pointer',
          background: currentVal === opt.val ? 'rgba(255,215,0,0.05)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>{opt.label}</div>
          <div style={{ color: 'var(--gris)', fontSize: '0.7rem' }}>{opt.desc}</div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', overflowY: 'auto'
    }} onClick={e => e.target === e.currentTarget && onClose()}>

      <div style={{
        background: 'var(--card)', border: '1px solid var(--borde)',
        borderRadius: '20px', padding: '36px', width: '100%', maxWidth: '900px',
        maxHeight: '90vh', overflowY: 'auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'
      }}>

        {/* COLUMNA IZQUIERDA */}
        <div>
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.68rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--azul)', marginBottom: '6px' }}>
                Máquina personalizada
              </div>
              <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.8rem' }}>CONFIGURA</div>
            </div>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--borde)',
              borderRadius: '8px', padding: '8px 14px', color: 'var(--gris)',
              cursor: 'pointer', fontFamily: "'Exo 2', sans-serif", fontSize: '0.85rem'
            }}>✕ Cerrar</button>
          </div>

          {/* TOGGLE OTRAS MEDIDAS */}
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setOtrasMedias(!otrasMedias)} style={{
              width: '100%', padding: '14px',
              background: otrasMedias ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${otrasMedias ? 'var(--amarillo)' : 'var(--borde)'}`,
              borderRadius: '10px', cursor: 'pointer',
              color: otrasMedias ? 'var(--amarillo)' : 'var(--gris)',
              fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '1px', transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              {otrasMedias ? '✓ Medidas personalizadas activadas' : '📐 ¿Necesitas otras medidas?'}
            </button>
          </div>

          {!otrasMedias ? (
            <>
              {/* BASE */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Modelo base</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {['mini', 'estandar'].map(key => (
                    <div key={key} onClick={() => updateConfig('base', key)} style={{
                      border: `2px solid ${config.base === key ? 'var(--azul)' : 'var(--borde)'}`,
                      borderRadius: '10px', padding: '14px', cursor: 'pointer',
                      background: config.base === key ? 'rgba(0,200,255,0.06)' : 'rgba(255,255,255,0.02)',
                      transition: 'all 0.3s'
                    }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{MODELS[key].icon}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{MODELS[key].name}</div>
                      <div style={{ color: 'var(--gris)', fontSize: '0.7rem', marginTop: '2px' }}>{MODELS[key].medidas}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SALIDAS */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Número de salidas</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {baseModel.outlets.map(n => (
                    <button key={n} onClick={() => updateConfig('outlets', n)} style={{
                      flex: '1', minWidth: '60px', padding: '10px 8px',
                      border: `2px solid ${config.outlets === n ? 'var(--azul)' : 'var(--borde)'}`,
                      borderRadius: '8px', cursor: 'pointer',
                      background: config.outlets === n ? 'rgba(0,200,255,0.08)' : 'rgba(255,255,255,0.02)',
                      color: config.outlets === n ? 'var(--azul)' : 'var(--blanco)',
                      fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.82rem'
                    }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* SISTEMA */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Sistema de control</label>
                {sysOptions(baseModel.systems, config.sys, val => updateConfig('sys', val))}
              </div>

              {/* PANTALLA */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Pantalla LCD</label>
                {pantallaOptions(config.pantalla, val => updateConfig('pantalla', val), config.sys)}
              </div>

              {/* NOTA */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Notas adicionales</label>
                <textarea value={config.nota} onChange={e => updateConfig('nota', e.target.value)}
                  placeholder="Describe cualquier detalle adicional..." rows={2}
                  style={{ ...inputStyle, resize: 'none' }} />
              </div>
            </>
          ) : (
            <>
              {/* MEDIDAS CUSTOM */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Medidas (cm)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { key: 'ancho', label: 'Ancho' },
                    { key: 'profundidad', label: 'Prof.' },
                    { key: 'alto', label: 'Alto' }
                  ].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--gris)', marginBottom: '4px' }}>{f.label}</div>
                      <input type="number" value={custom[f.key]}
                        onChange={e => updateCustom(f.key, e.target.value)}
                        placeholder="cm" style={inputStyle} min={10} max={500} />
                    </div>
                  ))}
                </div>
              </div>

              {/* SALIDAS CUSTOM */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Número de salidas</label>
                <input type="number" value={custom.salidas}
                  onChange={e => updateCustom('salidas', e.target.value)}
                  placeholder="¿Cuántas salidas necesitas?" style={inputStyle} min={1} max={50} />
              </div>

              {/* SISTEMA */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Sistema de control</label>
                {sysOptions(['arduino', 'plc'], custom.sys, val => updateCustom('sys', val))}
              </div>

              {/* PANTALLA */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Pantalla LCD</label>
                {pantallaOptions(custom.pantalla, val => updateCustom('pantalla', val), custom.sys)}
              </div>

              {/* NOTA */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Notas adicionales</label>
                <textarea value={custom.nota} onChange={e => updateCustom('nota', e.target.value)}
                  placeholder="Describe cualquier requerimiento especial..." rows={2}
                  style={{ ...inputStyle, resize: 'none' }} />
              </div>
            </>
          )}

          {/* CONTACTO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="Tu nombre" value={clientName}
              onChange={e => setClientName(e.target.value)} style={inputStyle} />
            <input type="tel" placeholder="Tu teléfono (opcional)" value={clientPhone}
              onChange={e => setClientPhone(e.target.value)} style={inputStyle} />
            <button onClick={sendWhatsApp} style={{
              background: 'linear-gradient(120deg, #25D366, #128C7E)',
              color: 'white', padding: '15px', border: 'none', borderRadius: '8px',
              fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.88rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '9px', width: '100%', letterSpacing: '1px'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar cotización por WhatsApp
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1rem', letterSpacing: '2px', color: 'var(--azul)' }}>
            VISTA PREVIA
          </div>

          <Machine3D
            outlets={otrasMedias ? (parseInt(custom.salidas) || 1) : config.outlets}
            modelType={otrasMedias ? 'estandar' : config.base}
            height={300}
            small={true}
            showLCD={otrasMedias ? custom.pantalla : config.pantalla}
          />

          {/* RESUMEN */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--borde)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {otrasMedias ? (
                <>
                  {[
                    { label: 'Ancho', value: custom.ancho ? `${custom.ancho} cm` : '—' },
                    { label: 'Profundidad', value: custom.profundidad ? `${custom.profundidad} cm` : '—' },
                    { label: 'Alto', value: custom.alto ? `${custom.alto} cm` : '—' },
                    { label: 'Salidas', value: custom.salidas || '—' },
                    { label: 'Sistema', value: custom.sys === 'arduino' ? 'Microcontrolador' : 'PLC' },
                    { label: 'Pantalla', value: custom.pantalla ? 'Sí' : 'No' }
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--gris)' }}>{row.label}</span>
                      <span style={{ fontWeight: 700 }}>{row.value}</span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { label: 'Base', value: baseModel.name },
                    { label: 'Medidas', value: baseModel.medidas },
                    { label: 'Salidas', value: config.outlets },
                    { label: 'Sistema', value: config.sys === 'arduino' ? 'Microcontrolador' : 'PLC' },
                    { label: 'Pantalla', value: config.pantalla ? `Sí (+$${config.sys === 'arduino' ? PANTALLA.arduino : PANTALLA.plc})` : 'No' }
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--gris)' }}>{row.label}</span>
                      <span style={{ fontWeight: 700 }}>{row.value}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div style={{ height: '1px', background: 'var(--borde)', margin: '14px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gris)' }}>
                Total estimado
              </span>
              <span style={{
                fontFamily: "'Black Ops One', cursive", fontSize: '2rem',
                background: 'linear-gradient(120deg, var(--azul), var(--verde))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {otrasMedias ? 'A consultar' : (totalPrice !== null ? `$${totalPrice}` : '—')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ModalPersonalizada
