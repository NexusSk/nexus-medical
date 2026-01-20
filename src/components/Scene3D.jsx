import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
// Removed postprocessing for stability
import * as THREE from 'three'

// Pill capsule using sphere + cylinder (compatible approach)
function SinglePill({ position, rotation, scale = 1, color = '#00c853', speed = 1 }) {
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

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Top hemisphere */}
      <mesh position={[0, bodyLength / 2, 0]}>
        <sphereGeometry args={[radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Body cylinder */}
      <mesh>
        <cylinderGeometry args={[radius, radius, bodyLength, 32]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Bottom hemisphere */}
      <mesh position={[0, -bodyLength / 2, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  )
}

// DNA Helix
function DNAHelix({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const helixPoints = useMemo(() => {
    const points1 = []
    const points2 = []
    const connectors = []
    const segments = 60
    
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
      
      if (i % 4 === 0) {
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

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Helix strand 1 */}
      <mesh>
        <tubeGeometry args={[curve1, 100, 0.08, 12, false]} />
        <meshStandardMaterial color="#00c853" emissive="#00c853" emissiveIntensity={0.2} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Helix strand 2 */}
      <mesh>
        <tubeGeometry args={[curve2, 100, 0.08, 12, false]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Base pair connectors */}
      {helixPoints.connectors.map((connector, i) => {
        const midPoint = connector.start.clone().add(connector.end).multiplyScalar(0.5)
        const direction = connector.end.clone().sub(connector.start)
        const length = direction.length()
        
        return (
          <group key={i}>
            {/* Connector line */}
            <mesh position={midPoint.toArray()} quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction.normalize()
            )}>
              <cylinderGeometry args={[0.03, 0.03, length, 8]} />
              <meshStandardMaterial color="#a7f3d0" opacity={0.8} transparent />
            </mesh>
            {/* Base spheres */}
            <mesh position={connector.start.toArray()}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#5efc82" emissive="#5efc82" emissiveIntensity={0.15} />
            </mesh>
            <mesh position={connector.end.toArray()}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#009624" emissive="#009624" emissiveIntensity={0.15} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// Molecule structure
function Molecule({ position, scale = 1 }) {
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

  const bonds = useMemo(() => [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
  ], [])

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {atoms.map((atom, i) => (
        <Float key={i} speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={atom.pos}>
            <sphereGeometry args={[atom.size, 32, 32]} />
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
      {bonds.map((bond, i) => {
        const start = new THREE.Vector3(...atoms[bond.from].pos)
        const end = new THREE.Vector3(...atoms[bond.to].pos)
        const mid = start.clone().add(end).multiplyScalar(0.5)
        const direction = end.clone().sub(start)
        const length = direction.length()
        
        return (
          <mesh 
            key={i} 
            position={mid.toArray()} 
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction.normalize()
            )}
          >
            <cylinderGeometry args={[0.05, 0.05, length, 8]} />
            <meshStandardMaterial color="#e0e0e0" opacity={0.7} transparent />
          </mesh>
        )
      })}
    </group>
  )
}

// Floating orb
function GlassOrb({ position, scale = 1, color = "#a7f3d0" }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 64, 64]} />
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
}

// Particle field
function ParticleField() {
  return (
    <Sparkles
      count={100}
      scale={30}
      size={1.2}
      speed={0.15}
      opacity={0.3}
      color="#00c853"
    />
  )
}

// Camera controller that responds to scroll
function CameraController({ scrollProgress }) {
  const { camera } = useThree()
  
  useFrame(() => {
    const progress = Math.max(0, Math.min(1, scrollProgress || 0))
    
    // Smooth zoom in and orbit effect
    const targetZ = 14 - progress * 6
    const targetX = Math.sin(progress * Math.PI) * 5
    const targetY = Math.cos(progress * Math.PI * 0.5) * 2
    
    // Smooth interpolation
    camera.position.x += (targetX - camera.position.x) * 0.02
    camera.position.y += (targetY - camera.position.y) * 0.02
    camera.position.z += (targetZ - camera.position.z) * 0.02
    
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Main 3D Scene
function Scene({ scrollProgress = 0 }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle continuous rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollProgress * Math.PI * 0.5
    }
  })

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#ffffff', 15, 50]} />
      
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[0, 10, 10]} intensity={0.3} color="#ffffff" />
      
      <CameraController scrollProgress={scrollProgress} />
      
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

export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div className="canvas-container interactive">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff')
        }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
