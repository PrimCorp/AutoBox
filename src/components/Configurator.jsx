import { useState } from 'react'
import { MODELS } from '../data/prices'
import QuotePanel from './QuotePanel'
import ModalPersonalizada from './ModalPersonalizada'

function Configurator() {
  const [state, setState] = useState({ model: null, outlets: null, sys: null })
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientMsg, setClientMsg] = useState('')
  const [showModal, setShowModal] = useState(false)

  function pickModel(key) {
    setState({ model: key, outlets: null, sys: null })
  }

  function pickOutlets(n) {
    setState(prev => ({ ...prev, outlets: n, sys: null }))
  }

  function pickSys(s) {
    setState(prev => ({ ...prev, sys: s }))
  }

  const model = state.model ? MODELS[state.model] : null
  const priceRow = state.model && state.outlets ? MODELS[state.model].prices[state.outlets] : null

  return (
    <section className="section" id="configurador">
      <div className="sec-label">Cotizador interactivo</div>
      <h2 className="sec-title">Configura tu<br />Máquina Ideal</h2>
      <p className="sec-sub">Elige opciones, visualiza en 3D cómo queda y recibe tu cotización por WhatsApp.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '28px', alignItems: 'start' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* PASO 1 */}
          <StepBox number={1} title="Modelo" sub="Elige según la cantidad de productos">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {Object.entries(MODELS).filter(([key]) => key !== 'premium').map(([key, m]) => (
                <div key={key} onClick={() => pickModel(key)}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `2px solid ${state.model === key ? 'var(--azul)' : 'var(--borde)'}`,
                    borderRadius: '10px', padding: '16px 14px', cursor: 'pointer',
                    transition: 'all 0.3s', position: 'relative',
                    ...(state.model === key && { background: 'rgba(0,200,255,0.06)', boxShadow: '0 0 20px rgba(0,200,255,0.1)' })
                  }}>
                  {state.model === key && (
                    <div style={{
                      position: 'absolute', top: 8, right: 8,
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'var(--azul)', color: 'var(--negro)',
                      fontSize: '0.6rem', fontWeight: 900,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>✓</div>
                  )}
                  <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.name}</div>
                  <div style={{ color: 'var(--gris)', fontSize: '0.7rem', marginTop: '3px' }}>
                    {m.outlets[0]}-{m.outlets[m.outlets.length - 1]} salidas · {m.medidas}
                  </div>
                </div>
              ))}

              {/* PERSONALIZADA */}
              <div onClick={() => setShowModal(true)} style={{
                background: 'rgba(255,215,0,0.04)',
                border: '2px solid rgba(255,215,0,0.3)',
                borderRadius: '10px', padding: '16px 14px', cursor: 'pointer',
                transition: 'all 0.3s', gridColumn: '1 / -1'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--amarillo)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)'}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>🏭</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--amarillo)' }}>PERSONALIZADA</div>
                <div style={{ color: 'var(--gris)', fontSize: '0.7rem', marginTop: '3px' }}>
                  Medidas custom · Pantalla opcional · Configura a tu medida
                </div>
              </div>
            </div>
          </StepBox>

          {/* PASO 2 */}
          <StepBox number={2} title="Salidas de dispensado" sub="Cada salida es un producto o precio diferente">
            {model ? (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {model.outlets.map(n => (
                    <button key={n} onClick={() => pickOutlets(n)} style={{
                      flex: '1', minWidth: '70px', padding: '12px 8px',
                      border: `2px solid ${state.outlets === n ? 'var(--azul)' : 'var(--borde)'}`,
                      borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                      background: state.outlets === n ? 'rgba(0,200,255,0.08)' : 'rgba(255,255,255,0.02)',
                      color: state.outlets === n ? 'var(--azul)' : 'var(--blanco)',
                      fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.82rem',
                      transition: 'all 0.3s'
                    }}>
                      {n} {n === 1 ? 'salida' : 'salidas'}
                    </button>
                  ))}
                </div>
                {state.model === 'mini' && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--naranja)', marginTop: '10px' }}>
                    ⚠️ El modelo MINI soporta máximo 2 salidas.
                  </div>
                )}
              </>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--gris)', fontStyle: 'italic' }}>Primero selecciona un modelo</div>
            )}
          </StepBox>

          {/* PASO 3 */}
          <StepBox number={3} title="Sistema de control" sub="Microcontrolador más económico · PLC más robusto y con garantía">
            {state.outlets ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {model.systems.map(sys => {
                  const price = sys === 'arduino' ? priceRow?.arduino : priceRow?.plc
                  const disabled = price === null || price === undefined
                  return (
                    <div key={sys} onClick={() => !disabled && pickSys(sys)} style={{
                      border: `2px solid ${state.sys === sys ? 'var(--verde)' : 'var(--borde)'}`,
                      borderRadius: '10px', padding: '18px', cursor: disabled ? 'not-allowed' : 'pointer',
                      background: state.sys === sys ? 'rgba(0,255,170,0.05)' : 'rgba(255,255,255,0.02)',
                      opacity: disabled ? 0.25 : 1, transition: 'all 0.3s',
                      ...(state.sys === sys && { boxShadow: '0 0 20px rgba(0,255,170,0.08)' })
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>
                        {sys === 'arduino' ? '⚡ Microcontrolador' : '🔧 PLC'}
                      </div>
                      <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.4rem', color: 'var(--verde)', lineHeight: 1 }}>
                        {disabled ? 'N/D' : `$${price}`}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--gris)', letterSpacing: '1px', marginTop: '4px' }}>
                        {sys === 'arduino' ? 'Sin garantía' : 'Con garantía'}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--gris)', fontStyle: 'italic' }}>Primero selecciona las salidas</div>
            )}
          </StepBox>

        </div>

        {/* PANEL */}
        <QuotePanel
          state={state}
          clientName={clientName} clientPhone={clientPhone} clientMsg={clientMsg}
          onNameChange={setClientName} onPhoneChange={setClientPhone} onMsgChange={setClientMsg}
        />

      </div>

      {showModal && <ModalPersonalizada onClose={() => setShowModal(false)} />}
    </section>
  )
}

function StepBox({ number, title, sub, children }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--borde)',
      borderRadius: '14px', padding: '26px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(120deg, var(--azul), var(--verde))',
          color: 'var(--negro)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 900, fontSize: '0.82rem'
        }}>{number}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{title}</div>
          <div style={{ color: 'var(--gris)', fontSize: '0.75rem', marginTop: '2px' }}>{sub}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Configurator
