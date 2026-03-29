import Machine3D from './Machine3D'

function Hero() {
  return (
    <section style={{
      position: 'relative', zIndex: 1,
      minHeight: '100vh',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '120px 48px 80px',
      gap: '40px',
      maxWidth: '1300px', margin: '0 auto'
    }}>
      {/* TEXTO */}
      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.25)',
          borderRadius: '50px', padding: '7px 18px',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--azul)', marginBottom: '28px'
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--verde)', boxShadow: '0 0 8px var(--verde)',
            display: 'inline-block', animation: 'pulse 2s infinite'
          }} />
          Fabricación propia · Ecuador
        </div>

        <h1 style={{
          fontFamily: "'Black Ops One', cursive",
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          lineHeight: 0.95, letterSpacing: '1px', marginBottom: '20px'
        }}>
          DISPENSADORES<br />
          <span style={{
            background: 'linear-gradient(120deg, var(--azul), var(--verde))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>AUTOBOX</span>
        </h1>

        <p style={{
          color: 'var(--gris)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.8,
          maxWidth: '460px', marginBottom: '40px'
        }}>
          Máquinas dispensadoras profesionales a medida. Configura tu equipo, visualiza el modelo 3D y recibe tu cotización al instante.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a href="#configurador" style={{
            background: 'linear-gradient(120deg, var(--azul), var(--verde))',
            color: 'var(--negro)', padding: '15px 34px', border: 'none', borderRadius: '6px',
            fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: '0.85rem',
            letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 0 30px rgba(0,200,255,0.25)'
          }}>Configurar ahora</a>
          <a href="#modelos" style={{
            background: 'transparent', color: 'var(--blanco)',
            padding: '15px 34px', border: '1px solid var(--borde)', borderRadius: '6px',
            fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.85rem',
            letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none'
          }}>Ver modelos</a>
        </div>
      </div>

      {/* 3D */}
      <div>
        <Machine3D outlets={1} modelType="mini" height={480} />
      </div>
    </section>
  )
}

export default Hero
