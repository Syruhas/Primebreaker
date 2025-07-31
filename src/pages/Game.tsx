import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

function Game() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mount.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5

    let animationId: number

    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      
      if (mount.current && renderer.domElement.parentNode) {
        mount.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <Link 
        to="/" 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px', 
          zIndex: 10,
          color: 'white',
          textDecoration: 'none',
          padding: '10px 15px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Home
      </Link>
      <div ref={mount} />
    </div>
  )
}

export default Game