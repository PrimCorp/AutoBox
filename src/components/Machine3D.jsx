import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Machine3D({ outlets = 1, modelType = 'mini', height = 480, small = false, showLCD = false }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = canvas.clientWidth || 400
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(w, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / height, 0.1, 100)
    camera.position.set(0, 0.3, 4)

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const dir = new THREE.DirectionalLight(0x00c8ff, 2)
    dir.position.set(3, 5, 4)
    scene.add(dir)
    const rim = new THREE.DirectionalLight(0x00ffaa, 1)
    rim.position.set(-3, -2, -3)
    scene.add(rim)
    const point = new THREE.PointLight(0x00c8ff, 1.5, 10)
    point.position.set(0, 2, 3)
    scene.add(point)

    // Materiales
    const bodyMat   = new THREE.MeshPhongMaterial({ color: 0x0d1a28, specular: 0x002244, shininess: 60 })
    const frontMat  = new THREE.MeshPhongMaterial({ color: 0x111e2e, specular: 0x003355, shininess: 80 })
    const ledRed    = new THREE.MeshPhongMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 0.8 })
    const ledBlue   = new THREE.MeshPhongMaterial({ color: 0x2244ff, emissive: 0x2244ff, emissiveIntensity: 0.8 })
    const lcdMat    = new THREE.MeshPhongMaterial({ color: 0x001a0d, emissive: 0x00ff88, emissiveIntensity: 0.5 })
    const slotMat   = new THREE.MeshPhongMaterial({ color: 0x050a10, emissive: 0xff6a00, emissiveIntensity: 0.2 })
    const coinMat   = new THREE.MeshPhongMaterial({ color: 0x1a2a3a, specular: 0x00c8ff, shininess: 40 })
    const edgeLine  = new THREE.LineBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.3 })
    const whiteMat  = new THREE.MeshPhongMaterial({ color: 0xeef2ff, specular: 0x333333, shininess: 30 })

    const group = new THREE.Group()
    scene.add(group)

    function buildMachine(numOutlets, type, showLCD = false) {
      while (group.children.length) group.remove(group.children[0])

      const isMini = type === 'mini'

      // Dimensiones
      let W = isMini ? 1.0 : 1.4
      let H = isMini ? 1.4 : 1.8
      let D = 0.7

      // ── CUERPO ──
      const bodyGeo = new THREE.BoxGeometry(W, H, D)
      const body = new THREE.Mesh(bodyGeo, bodyMat)
      group.add(body)

      // Bordes
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), edgeLine))

      // ── PANEL FRONTAL (cara delantera ligeramente diferenciada) ──
      const panelGeo = new THREE.PlaneGeometry(W - 0.04, H - 0.04)
      const panel = new THREE.Mesh(panelGeo, frontMat)
      panel.position.set(0, 0, D / 2 + 0.001)
      group.add(panel)

      if (isMini) {
        // ── MINI: ventana cuadrada arriba izquierda ──
        const winW = 0.28 + numOutlets * 0.06
        const winH = 0.28 + numOutlets * 0.04
        const winGeo = new THREE.BoxGeometry(winW, winH, 0.06)
        const win = new THREE.Mesh(winGeo, slotMat)
        win.position.set(-W * 0.22, H * 0.22, D / 2 - 0.01)
        group.add(win)

        // Marco ventana
        const frameGeo = new THREE.EdgesGeometry(winGeo)
        const frame = new THREE.LineSegments(frameGeo, new THREE.LineBasicMaterial({ color: 0x00c8ff, opacity: 0.6, transparent: true }))
        frame.position.copy(win.position)
        group.add(frame)

        // ── LED ROJO ──
        const ledR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16), ledRed)
        ledR.rotation.x = Math.PI / 2
        ledR.position.set(-W * 0.05, H * 0.22, D / 2 + 0.01)
        group.add(ledR)

        // ── PULSADORES AZULES ──
        for (let i = 0; i < numOutlets; i++) {
          const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.025, 16), ledBlue)
          btn.rotation.x = Math.PI / 2
          btn.position.set(W * 0.08 + i * 0.18, H * 0.22, D / 2 + 0.01)
          group.add(btn)
        }

        // ── MONEDERO derecha ──
        const coin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.05), coinMat)
        coin.position.set(W * 0.36, H * 0.18, D / 2 + 0.02)
        group.add(coin)
        group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.1, 0.2, 0.05)), new THREE.LineBasicMaterial({ color: 0x00c8ff, opacity: 0.5, transparent: true })))
        group.children[group.children.length - 1].position.copy(coin.position)

      } else {
        // ── ESTÁNDAR / PREMIUM ──

        // LCD arriba centro (solo si showLCD)
        if (showLCD) {
          const lcd = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.02), lcdMat)
          lcd.position.set(-0.1, H * 0.4, D / 2 + 0.01)
          group.add(lcd)
          group.add(new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.BoxGeometry(0.35, 0.1, 0.02)),
            new THREE.LineBasicMaterial({ color: 0x00ff88, opacity: 0.7, transparent: true })
          ))
          group.children[group.children.length - 1].position.copy(lcd.position)
        }

        // MONEDERO arriba derecha
        const coin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.05), coinMat)
        coin.position.set(W * 0.38, H * 0.38, D / 2 + 0.02)
        group.add(coin)
        group.add(new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(0.1, 0.22, 0.05)),
          new THREE.LineBasicMaterial({ color: 0x00c8ff, opacity: 0.5, transparent: true })
        ))
        group.children[group.children.length - 1].position.copy(coin.position)

        // PULSADORES en fila horizontal
        const totalBtns = Math.min(numOutlets, 8)
        const spacing = (W * 0.7) / (totalBtns + 1)
        for (let i = 0; i < totalBtns; i++) {
          const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.025, 16), i === 0 ? ledRed : ledBlue)
          btn.rotation.x = Math.PI / 2
          btn.position.set(-W * 0.35 + spacing * (i + 1), H * 0.25, D / 2 + 0.01)
          group.add(btn)
        }

        // VENTANA horizontal ancha en el centro
        const winW = W * 0.88
        const winH = 0.28
        const winGeo = new THREE.BoxGeometry(winW, winH, 0.07)
        const win = new THREE.Mesh(winGeo, slotMat)
        win.position.set(0, H * 0.05, D / 2 - 0.01)
        group.add(win)

        const frameGeo = new THREE.EdgesGeometry(winGeo)
        const frame = new THREE.LineSegments(frameGeo, new THREE.LineBasicMaterial({ color: 0x00c8ff, opacity: 0.6, transparent: true }))
        frame.position.copy(win.position)
        group.add(frame)
      }

      // ── LOGO AUTOBOX ──
const logoCanvas = document.createElement('canvas')
logoCanvas.width = 512
logoCanvas.height = 128
const ctx = logoCanvas.getContext('2d')
ctx.clearRect(0, 0, 512, 128)
ctx.fillStyle = 'rgba(0,200,255,0.15)'
ctx.fillRect(0, 0, 512, 128)
ctx.font = 'bold 72px Black Ops One, monospace'
ctx.fillStyle = '#00c8ff'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.letterSpacing = '8px'
ctx.fillText('AUTOBOX', 256, 64)
const logoTex = new THREE.CanvasTexture(logoCanvas)
const logoGeo = new THREE.PlaneGeometry(W * 0.55, 0.12)
const logoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true })
const logoMesh = new THREE.Mesh(logoGeo, logoMat)
logoMesh.position.set(0, -H * 0.3, D / 2 + 0.003)
group.add(logoMesh)

      // ── RUEDAS ──
      const wGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16)
      const wheelMat = new THREE.MeshPhongMaterial({ color: 0x111122 })
      ;[
        [-W / 2 + 0.12, -H / 2 - 0.03, -D / 2 + 0.1],
        [ W / 2 - 0.12, -H / 2 - 0.03, -D / 2 + 0.1],
        [-W / 2 + 0.12, -H / 2 - 0.03,  D / 2 - 0.1],
        [ W / 2 - 0.12, -H / 2 - 0.03,  D / 2 - 0.1],
      ].forEach(pos => {
        const w = new THREE.Mesh(wGeo, wheelMat)
        w.position.set(...pos)
        group.add(w)
      })
    }

    // ── CONTROLES ORBIT ──
    let isDragging = false, prevX = 0, prevY = 0
    let rotX = 0.2, rotY = 0.5, targetRotX = 0.2, targetRotY = 0.5
    let zoom = 1, targetZoom = 1
    let autoRotate = true

    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; autoRotate = false })
    window.addEventListener('mouseup', () => isDragging = false)
    window.addEventListener('mousemove', e => {
      if (!isDragging) return
      targetRotY += (e.clientX - prevX) * 0.012
      targetRotX += (e.clientY - prevY) * 0.008
      targetRotX = Math.max(-0.8, Math.min(0.8, targetRotX))
      prevX = e.clientX; prevY = e.clientY
    })
    canvas.addEventListener('wheel', e => {
      e.preventDefault()
      targetZoom = Math.max(0.5, Math.min(2, targetZoom + e.deltaY * 0.001))
    }, { passive: false })

    let touchPrev = { x: 0, y: 0 }
    canvas.addEventListener('touchstart', e => { touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; autoRotate = false })
    canvas.addEventListener('touchmove', e => {
      e.preventDefault()
      targetRotY += (e.touches[0].clientX - touchPrev.x) * 0.012
      targetRotX += (e.touches[0].clientY - touchPrev.y) * 0.008
      touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }, { passive: false })

    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      if (autoRotate) targetRotY += 0.004
      rotX += (targetRotX - rotX) * 0.08
      rotY += (targetRotY - rotY) * 0.08
      zoom += (targetZoom - zoom) * 0.08
      group.rotation.x = rotX
      group.rotation.y = rotY
      camera.position.z = 4 * zoom
      renderer.render(scene, camera)
    }

    buildMachine(outlets, modelType)
    animate()
    sceneRef.current = { buildMachine, renderer, scene, camera }

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
    }
  }, [])
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.buildMachine(outlets, modelType, showLCD)
    }
  }, [outlets, modelType, showLCD])

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.buildMachine(outlets, modelType)
    }
  }, [outlets, modelType])

  return (
    <div>
      <canvas ref={canvasRef} style={{
        width: '100%', height: `${height}px`, borderRadius: small ? '10px' : '16px',
        background: 'radial-gradient(ellipse at center, #0a0a1a, #040408)',
        border: '1px solid var(--borde)', cursor: 'grab', display: 'block',
        marginBottom: small ? '20px' : '0'
      }} />
      {!small && (
        <div style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--gris)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '10px' }}>
          🖱️ Arrastra para rotar · Scroll para zoom
        </div>
      )}
    </div>
  )
}

export default Machine3D
