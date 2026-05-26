import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2500
const SPHERE_RADIUS = 800

function StarfieldParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const { camera } = useThree()

  // Precompute random positions for stable particle layout
  const { positions, randomOffsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const randomOffsets = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spherical distribution, denser toward center
      const r = SPHERE_RADIUS * Math.pow(Math.random(), 1 / 3)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Random offsets for wobble animation
      randomOffsets[i * 3] = Math.random() * Math.PI * 2
      randomOffsets[i * 3 + 1] = Math.random() * Math.PI * 2
      randomOffsets[i * 3 + 2] = Math.random() * 0.5 + 0.5
    }

    return { positions, randomOffsets }
  }, [])

  // Store original positions for reset
  const originalPositions = useMemo(() => new Float32Array(positions), [positions])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const positionAttr = pointsRef.current.geometry.attributes.position
    const posArray = positionAttr.array as Float32Array

    // Camera scroll: push camera forward slightly based on scroll
    const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 2), 1)
    camera.position.z = scrollProgress * 200

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Slow drift outward (radial velocity)
      const dx = originalPositions[i3]
      const dy = originalPositions[i3 + 1]
      const dz = originalPositions[i3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1

      const driftSpeed = 0.02
      posArray[i3] = originalPositions[i3] + (dx / dist) * driftSpeed * time * randomOffsets[i3 + 2]
      posArray[i3 + 1] = originalPositions[i3 + 1] + (dy / dist) * driftSpeed * time * randomOffsets[i3 + 2]
      posArray[i3 + 2] = originalPositions[i3 + 2] + (dz / dist) * driftSpeed * time * randomOffsets[i3 + 2]

      // Time-based sine wave wobble on X/Y axes
      const wobbleX = Math.sin(time * 0.3 + randomOffsets[i3]) * 2
      const wobbleY = Math.cos(time * 0.2 + randomOffsets[i3 + 1]) * 2

      posArray[i3] += wobbleX
      posArray[i3 + 1] += wobbleY
    }

    positionAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={2.5}
        color={new THREE.Color(1.0, 0.95, 0.9)}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0D0D12']} />
      <StarfieldParticles />
    </>
  )
}

interface StarfieldBackgroundProps {
  style?: React.CSSProperties
}

export default function StarfieldBackground({ style }: StarfieldBackgroundProps) {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
      }
    } catch {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported) {
    return (
      <div
        style={{
          ...style,
          backgroundImage: 'url(/hero-starfield.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    )
  }

  return (
    <div style={style}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 2000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
