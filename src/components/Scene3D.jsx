import { useRef, useMemo, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'

// Pill capsule - optimized geometry
const SinglePill = memo(function SinglePill({ position, rotation, scale = 1, color = '#00c853', speed = 1 }) {
  const groupRef = useRef()
  const time = useRef(Math.random() * 100)

  useFrame((state, delta) => {
    time.current += delta * speed
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.3 + rotation[0]
      groupRef.current.rotation.z = Math.cos(time.current * 0.3) * 0.2 + rotation[2]
      groupRef.current.position.y = position[1] + Math.sin(time.current * 0.4) * 0.3
    }
  })

  const radius = 0.3
  const bodyLength = 0.6

  const material = useMemo(() => (
    <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
  ), [color])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, bodyLength / 2, 0]}>
        <sphereGeometry args={[radius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {material}
      </mesh>
      <mesh>
        <cylinderGeometry args={[radius, radius, bodyLength, 16]} />
        {material}
      </mesh>
      <mesh position={[0, -bodyLength / 2, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[radius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {material}
      </mesh>
    </group>
  )
})

// DNA Helix
const DNAHelix = memo(function DNAHelix({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  
  const helixPoints = useMemo(() => {
    const points1 = []
    const points2 = []
    const connectors = []
    const segments = 40
    
    for (let i = 0; i < segments; i++) {
      const t = i / segments
      const y = t * 8 - 4
      const angle = t * Math.PI * 4
      const radius = 0.8
      
      points1.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ))
      
      points2.push(new THREE.Vector3(
        Math.cos(angle + Math.PI) * radius,
        y,
        Math.sin(angle + Math.PI) * radius
      ))
      
      if (i % 5 === 0) {
        connectors.push({
          start: points1[points1.length - 1].clone(),
          end: points2[points2.length - 1].clone()
        })
      }
    }
    
    return { points1, points2, connectors }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const curve1 = useMemo(() => new THREE.CatmullRomCurve3(helixPoints.points1), [helixPoints])
  const curve2 = useMemo(() => new THREE.CatmullRomCurve3(helixPoints.points2), [helixPoints])

  const connectorElements = useMemo(() => helixPoints.connectors.map((connector, i) => {
    const midPoint = connector.start.clone().add(connector.end).multiplyScalar(0.5)
    const direction = connector.end.clone().sub(connector.start)
    const length = direction.length()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    )
    
    return (
      <group key={i}>
        <mesh position={midPoint.toArray()} quaternion={quaternion}>
          <cylinderGeometry args={[0.03, 0.03, length, 6]} />
          <meshStandardMaterial color="#a7f3d0" opacity={0.8} transparent />
        </mesh>
        <mesh position={connector.start.toArray()}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#5efc82" emissive="#5efc82" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={connector.end.toArray()}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#009624" emissive="#009624" emissiveIntensity={0.15} />
        </mesh>
      </group>
    )
  }), [helixPoints])

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <tubeGeometry args={[curve1, 60, 0.08, 8, false]} />
        <meshStandardMaterial color="#00c853" emissive="#00c853" emissiveIntensity={0.2} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 60, 0.08, 8, false]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} metalness={0.3} roughness={0.4} />
      </mesh>
      {connectorElements}
    </group>
  )
})

// Molecule structure
const Molecule = memo(function Molecule({ position, scale = 1 }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const atoms = useMemo(() => [
    { pos: [0, 0, 0], size: 0.35, color: '#00c853' },
    { pos: [0.9, 0, 0], size: 0.25, color: '#10b981' },
    { pos: [-0.7, 0.7, 0], size: 0.25, color: '#5efc82' },
    { pos: [-0.7, -0.7, 0], size: 0.25, color: '#009624' },
    { pos: [0, 0, 0.9], size: 0.28, color: '#a7f3d0' },
    { pos: [0, 0, -0.9], size: 0.28, color: '#00c853' },
  ], [])

  const bondElements = useMemo(() => {
    const bonds = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 0, to: 5 },
    ]
    
    return bonds.map((bond, i) => {
      const start = new THREE.Vector3(...atoms[bond.from].pos)
      const end = new THREE.Vector3(...atoms[bond.to].pos)
      const mid = start.clone().add(end).multiplyScalar(0.5)
      const direction = end.clone().sub(start)
      const length = direction.length()
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
      )
      
      return (
        <mesh key={i} position={mid.toArray()} quaternion={quaternion}>
          <cylinderGeometry args={[0.05, 0.05, length, 6]} />
          <meshStandardMaterial color="#e0e0e0" opacity={0.7} transparent />
        </mesh>
      )
    })
  }, [atoms])

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {atoms.map((atom, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh position={atom.pos}>
            <sphereGeometry args={[atom.size, 16, 16]} />
            <meshStandardMaterial 
              color={atom.color} 
              emissive={atom.color} 
              emissiveIntensity={0.2}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
      {bondElements}
    </group>
  )
})

// Floating orb
const GlassOrb = memo(function GlassOrb({ position, scale = 1, color = "#a7f3d0" }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
})

// Particle field
const ParticleField = memo(function ParticleField() {
  return (
    <Sparkles
      count={60}
      scale={30}
      size={1.0}
      speed={0.1}
      opacity={0.25}
      color="#00c853"
    />
  )
})

// Simple smooth camera that gently moves on its own
function SmoothCamera() {
  const cameraRef = useRef({ x: 0, y: 0 })
  
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime
    
    // Gentle automatic camera sway - no scroll dependency
    const targetX = Math.sin(t * 0.1) * 1.5
    const targetY = Math.cos(t * 0.08) * 0.8
    
    // Smooth interpolation
    cameraRef.current.x += (targetX - cameraRef.current.x) * 0.02
    cameraRef.current.y += (targetY - cameraRef.current.y) * 0.02
    
    camera.position.x = cameraRef.current.x
    camera.position.y = cameraRef.current.y
    camera.position.z = 14
    
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Main 3D Scene - pure time-based animation, no scroll dependency
function Scene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Pure time-based rotation - smooth and consistent
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 15, 50]} />
      
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[0, 10, 10]} intensity={0.3} color="#ffffff" />
      
      <SmoothCamera />
      
      <group ref={groupRef}>
        {/* Central DNA - main focus */}
        <DNAHelix position={[0, 0, 0]} scale={1} />
        
        {/* Floating pills - distributed around */}
        <SinglePill position={[-5, 2, -2]} rotation={[0.5, 0.3, 0.8]} scale={1.3} color="#00c853" speed={0.6} />
        <SinglePill position={[5, -1, -3]} rotation={[0.2, 0.8, 0.3]} scale={1} color="#10b981" speed={0.8} />
        <SinglePill position={[-4, -3, 1]} rotation={[0.8, 0.2, 0.5]} scale={0.9} color="#5efc82" speed={0.7} />
        <SinglePill position={[4, 3, -1]} rotation={[0.3, 0.5, 0.2]} scale={1.1} color="#00c853" speed={0.5} />
        <SinglePill position={[6, 0, 2]} rotation={[0.1, 0.9, 0.4]} scale={0.85} color="#009624" speed={0.9} />
        <SinglePill position={[-6, 1, -1]} rotation={[0.6, 0.4, 0.1]} scale={1.2} color="#10b981" speed={0.65} />
        <SinglePill position={[0, 5, -4]} rotation={[1, 0.2, 0.3]} scale={0.95} color="#a7f3d0" speed={0.75} />
        <SinglePill position={[0, -5, 3]} rotation={[0.4, 0.7, 0.9]} scale={1.05} color="#00c853" speed={0.55} />
        
        {/* Molecules */}
        <Molecule position={[7, -4, -6]} scale={1} />
        <Molecule position={[-7, 4, -5]} scale={0.8} />
        <Molecule position={[3, -6, 4]} scale={0.7} />
        
        {/* Orbs */}
        <GlassOrb position={[-3, 5, -3]} scale={1.8} color="#a7f3d0" />
        <GlassOrb position={[3, -5, -2]} scale={1.5} color="#5efc82" />
        <GlassOrb position={[0, 0, -8]} scale={2.5} color="#00c853" />
        <GlassOrb position={[-8, 0, 0]} scale={1.3} color="#10b981" />
        <GlassOrb position={[8, 2, -4]} scale={1.6} color="#a7f3d0" />
      </group>
      
      <ParticleField />
    </>
  )
}

// Main component - completely simplified, no scroll logic
const Scene3D = memo(function Scene3D() {
  return (
    <div className="canvas-container interactive">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000')
        }}
        frameloop="always"
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Scene />
      </Canvas>
    </div>
  )
})

export default Scene3D
