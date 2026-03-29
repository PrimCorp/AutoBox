function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px',
      background: 'rgba(8,8,16,0.9)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--borde)'
    }}>
      <div style={{
        fontFamily: "'Black Ops One', cursive",
        fontSize: '1.7rem', letterSpacing: '5px',
        background: 'linear-gradient(120deg, var(--azul), var(--verde))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>
        AUTOBOX
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        <a href="#modelos" style={{
          color: 'var(--gris)', textDecoration: 'none',
          fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase'
        }}>Modelos</a>
        <a href="#configurador" style={{
          color: 'var(--gris)', textDecoration: 'none',
          fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase'
        }}>Cotizar</a>
      </div>
    </nav>
  )
}

export default Navbar
