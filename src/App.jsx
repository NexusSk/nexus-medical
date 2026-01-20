import { useEffect, useState, useRef, useCallback, memo, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Contact from './components/Contact'
import Modal, { DemoContent, ContactFormContent, SuccessContent, StoryContent } from './components/Modal'
import { useLanguage } from './context/LanguageContext'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lenisRef = useRef(null)
  const velocityRef = useRef(0)
  
  // Modal states
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [storyModalOpen, setStoryModalOpen] = useState(false)
  const [featureModalOpen, setFeatureModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const { t } = useLanguage()

  useEffect(() => {
    // Initialize Lenis smooth scrolling with ultra-smooth configuration
    lenisRef.current = new Lenis({
      duration: 1.8, // Longer duration for smoother feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slower wheel for smoother scrolling
      touchMultiplier: 1.5,
      lerp: 0.075, // Very smooth lerp factor
      infinite: false,
    })

    // Track velocity for 3D objects
    lenisRef.current.on('scroll', ({ velocity, progress }) => {
      velocityRef.current = velocity
      setScrollVelocity(velocity)
      setScrollProgress(progress)
    })

    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  // Handle form submission
  const handleContactSubmit = () => {
    setContactModalOpen(false)
    setSuccessMessage(t('successMessage'))
    setSuccessModalOpen(true)
  }

  // Handle feature learn more
  const handleLearnMore = (feature) => {
    setSelectedFeature(feature)
    setFeatureModalOpen(true)
  }

  return (
    <>
      {/* 3D Background Scene */}
      <Scene3D scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />

      {/* Background Elements */}
      <div className="grid-overlay"></div>

      {/* Navigation */}
      <Navbar 
        onGetStarted={() => setContactModalOpen(true)} 
        lenisRef={lenisRef}
      />

      {/* Main Content */}
      <main className="content-wrapper">
        <Hero onWatchDemo={() => setDemoModalOpen(true)} lenisRef={lenisRef} />
        <Features onLearnMore={handleLearnMore} />
        <About onShowStory={() => setStoryModalOpen(true)} />
        <Contact 
          onScheduleCall={() => setContactModalOpen(true)}
          onPartnershipInquiry={() => setContactModalOpen(true)}
        />
      </main>

      {/* Cursor effect */}
      <CursorEffect />

      {/* Modals */}
      <Modal 
        isOpen={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)}
        title={t('modalProductDemo')}
      >
        <DemoContent />
      </Modal>

      <Modal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)}
        title={t('modalGetInTouch')}
      >
        <ContactFormContent onSubmit={handleContactSubmit} />
      </Modal>

      <Modal 
        isOpen={storyModalOpen} 
        onClose={() => setStoryModalOpen(false)}
        title={t('modalOurJourney')}
      >
        <StoryContent />
      </Modal>

      <Modal 
        isOpen={featureModalOpen} 
        onClose={() => setFeatureModalOpen(false)}
        title={selectedFeature?.title || t('modalFeatureDetails')}
      >
        {selectedFeature && (
          <div className="feature-modal-content">
            <div className="feature-modal-icon">{selectedFeature.icon}</div>
            <p className="feature-modal-description">{selectedFeature.description}</p>
            <p className="feature-modal-details">{selectedFeature.details}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setFeatureModalOpen(false)
                setContactModalOpen(true)
              }}
            >
              {t('learnMoreAboutThis')}
            </button>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)}
        title={t('modalSuccess')}
      >
        <SuccessContent 
          message={successMessage}
          onClose={() => setSuccessModalOpen(false)}
        />
      </Modal>
    </>
  )
}

// Custom cursor effect component - optimized with RAF and passive listeners
const CursorEffect = memo(function CursorEffect() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const rafRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Skip on touch devices for performance
    if ('ontouchstart' in window) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      // Dot follows immediately using transform (GPU accelerated)
      cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
    }

    // Smooth cursor following with RAF
    const animate = () => {
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y

      cursorPos.current.x += dx * 0.12
      cursorPos.current.y += dy * 0.12

      // Use transform for GPU acceleration
      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`

      rafRef.current = requestAnimationFrame(animate)
    }

    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    // Handle hover states with event delegation
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .feature-card, .feature-link')
      if (target) {
        cursor.classList.add('hover')
        cursorDot.classList.add('hover')
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .feature-card, .feature-link')
      if (target) {
        cursor.classList.remove('hover')
        cursorDot.classList.remove('hover')
      }
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>
    </>
  )
})

export default App
