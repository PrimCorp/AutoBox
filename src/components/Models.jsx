import { MODELS } from '../data/prices'

function Models() {
  const minPrice = (model) => {
    return Math.min(...Object.values(model.prices).flatMap(p => 
      Object.values(p).filter(v => v !== null)
    ))
  }

  return (
    <>
      <div style={{ height: '1px', background: 'var(--borde)', position: 'relative', zIndex: 1 }} />
      <section className="section" id="modelos">
        <div className="sec-label">Catálogo</div>
        <h2 className="sec-title">Nuestros Modelos</h2>
        <p className="sec-sub">Desde compactos dispensadores hasta estaciones multi-producto de alta capacidad.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {Object.entries(MODELS).map(([key, model]) => (
            <div key={key} style={{
              background: 'var(--card)', border: '1px solid var(--borde)',
              borderRadius: '14px', padding: '28px 24px',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.35s', cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-7px)'
              e.currentTarget.style.borderColor = 'rgba(0,200,255,0.3)'
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--borde)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>{model.icon}</div>
              <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.15rem', letterSpacing: '1px', marginBottom: '8px' }}>
                {model.name}
              </div>
              <div style={{ color: 'var(--gris)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '16px' }}>
                {model.description}
              </div>
              <div style={{
                background: 'rgba(0,200,255,0.07)', border: '1px solid rgba(0,200,255,0.15)',
                borderRadius: '6px', padding: '8px 12px', fontSize: '0.72rem',
                color: 'var(--azul)', letterSpacing: '1px', marginBottom: '12px'
              }}>
                📐 {model.medidas}
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.25)',
                color: 'var(--naranja)', padding: '4px 10px', borderRadius: '50px',
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '18px'
              }}>
                {model.outlets[0]}–{model.outlets[model.outlets.length - 1]} salidas
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--gris)', textTransform: 'uppercase', letterSpacing: '1px' }}>Desde</div>
                <div style={{ fontFamily: "'Black Ops One', cursive", fontSize: '1.7rem', background: 'linear-gradient(120deg, var(--azul), var(--verde))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  ${minPrice(model)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div style={{ height: '1px', background: 'var(--borde)', position: 'relative', zIndex: 1 }} />
    </>
  )
}

export default Models
