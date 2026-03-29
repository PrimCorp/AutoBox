import Machine3D from './Machine3D'
import { MODELS } from '../data/prices'

function QuotePanel({ state, onNameChange, onPhoneChange, onMsgChange, clientName, clientPhone, clientMsg }) {
  const model = state.model ? MODELS[state.model] : null

  function getPrice() {
    if (!state.model || !state.outlets || !state.sys) return null
    const p = MODELS[state.model].prices[state.outlets]
    if (!p) return null
    if (state.sys === 'arduino') return p.arduino
    if (state.sys === 'plc') return p.plc
    return null
  }

  const price = getPrice()

  function sendWhatsApp() {
    if (!state.model || !state.outlets || !state.sys) {
      alert('Completa todos los pasos primero.')
      return
    }
    const name = clientName || 'Cliente'
    let txt = `*COTIZACION AUTOBOX*\n\n`
    txt += `Nombre: ${name}\n`
    if (clientPhone) txt += `Telefono: ${clientPhone}\n`
    txt += `\n*Configuracion:*\n`
    txt += `- Modelo: ${model.name}\n`
    txt += `- Medidas: ${model.medidas}\n`
    txt += `- Salidas: ${state.outlets}\n`
    txt += `- Sistema: ${state.sys === 'arduino' ? 'Microcontrolador' : 'PLC'}\n`
    txt += `- Precio: $${price}\n`
    if (clientMsg) txt += `\nNotas: ${clientMsg}`
    const num = '+593994816398'
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(txt)}`, '_blank')
  }

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--borde)',
      borderRadius: '16px', padding: '28px', position: 'sticky', top: '96px'
    }}>
      <div style={{
        fontFamily: "'Black Ops One', cursive", fontSize: '1rem',
        letterSpacing: '2px', color: 'var(--azul)',
        textTransform: 'uppercase', marginBottom: '20px'
      }}>
        Tu Cotización
      </div>

      {/* CANVAS 3D */}
      <Machine3D
        outlets={state.outlets || 1}
        modelType={state.model || 'mini'}
        height={220}
        small={true}
      />

      {/* RESUMEN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
        {[
          { label: 'Modelo', value: model ? model.name : '—' },
          { label: 'Medidas', value: model ? model.medidas : '—' },
          { label: 'Salidas', value: state.outlets ? state.outlets : '—' },
          { label: 'Sistema', value: state.sys ? (state.sys === 'arduino' ? 'Microcontrolador' : 'PLC') : '—' }
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--gris)' }}>{row.label}</span>
            <span style={{ fontWeight: 700 }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: 'var(--borde)', margin: '14px 0' }} />

      {/* PRECIO */}
      {price !== null && price !== undefined ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '22px' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gris)' }}>
            Total estimado
          </span>
          <span style={{
            fontFamily: "'Black Ops One', cursive", fontSize: '2rem',
            background: 'linear-gradient(120deg, var(--azul), var(--verde))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            ${price}
          </span>
        </div>
      ) : (
        <div style={{ fontSize: '0.8rem', color: 'var(--gris)', fontStyle: 'italic', textAlign: 'center', padding: '18px 0' }}>
          Completa todos los pasos para ver el precio
        </div>
      )}

      {/* FORMULARIO */}
      {price !== null && price !== undefined && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Tu nombre"
            value={clientName} onChange={e => onNameChange(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--borde)', borderRadius: '8px', padding: '12px 14px', color: 'var(--blanco)', fontFamily: "'Exo 2', sans-serif", fontSize: '0.85rem', outline: 'none', width: '100%' }}
          />
          <input type="tel" placeholder="Tu teléfono (opcional)"
            value={clientPhone} onChange={e => onPhoneChange(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--borde)', borderRadius: '8px', padding: '12px 14px', color: 'var(--blanco)', fontFamily: "'Exo 2', sans-serif", fontSize: '0.85rem', outline: 'none', width: '100%' }}
          />
          <textarea placeholder="Detalle adicional..." rows={2}
            value={clientMsg} onChange={e => onMsgChange(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--borde)', borderRadius: '8px', padding: '12px 14px', color: 'var(--blanco)', fontFamily: "'Exo 2', sans-serif", fontSize: '0.85rem', outline: 'none', width: '100%', resize: 'none' }}
          />
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
            Enviar por WhatsApp
          </button>
        </div>
      )}
    </div>
  )
}

export default QuotePanel
