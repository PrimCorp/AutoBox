import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Models from './components/Models'
import Configurator from './components/Configurator'
import './styles/global.css'

function Stats() {
  return (
    <div style={{
      position: 'relative', zIndex: 1,
      display: 'flex', justifyContent: 'center',
      borderTop: '1px solid var(--borde)', borderBottom: '1px solid var(--borde)',
      flexWrap: 'wrap'
    }}>
      {[
        { n: '3', l: 'Modelos' },
        { n: '2', l: 'Sistemas' },
        { n: '$350', l: 'Desde' },
        { n: '24H', l: 'Atención' },
      ].map(s => (
        <div key={s.l} style={{
          padding: '36px 48px', textAlign: 'center',
          borderRight: '1px solid var(--borde)', flex: 1, minWidth: '150px'
        }}>
          <div style={{
            fontFamily: "'Black Ops One', cursive", fontSize: '2.4rem',
            background: 'linear-gradient(120deg, var(--azul), var(--verde))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>{s.n}</div>
          <div style={{ color: 'var(--gris)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '5px' }}>{s.l}</div>
        </div>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--borde)', padding: '40px 48px', textAlign: 'center'
    }}>
      <div style={{
        fontFamily: "'Black Ops One', cursive", fontSize: '1.4rem', letterSpacing: '4px',
        background: 'linear-gradient(120deg, var(--azul), var(--verde))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: '8px'
      }}>AUTOBOX</div>
      <div style={{ color: 'var(--gris)', fontSize: '0.75rem', letterSpacing: '1px' }}>
        AutoBox-Máquinas dispensadoras Automaticas-QUITO ECUADOR
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <div className="bg-layer" />
      <div className="grid-layer" />
      <Navbar />
      <Hero />
      <Stats />
      <Models />
      <Configurator />
      <Footer />
    </>
  )
}

export default App
