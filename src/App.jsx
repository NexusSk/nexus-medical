import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Contact from './components/Contact'
import Modal, { DemoContent, ContactFormContent, SuccessContent, StoryContent } from './components/Modal'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef(null)
  
  // Modal states
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [storyModalOpen, setStoryModalOpen] = useState(false)
  const [featureModalOpen, setFeatureModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Track scroll progress
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      lenisRef.current?.destroy()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle form submission
  const handleContactSubmit = () => {
    setContactModalOpen(false)
    setSuccessMessage("We've received your message and will get back to you within 24 hours.")
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
      <Scene3D scrollProgress={scrollProgress} />

      {/* Background Elements */}
      <div className="grid-overlay"></div>

      {/* Navigation */}
      <Navbar onGetStarted={() => setContactModalOpen(true)} />

      {/* Main Content */}
      <main className="content-wrapper">
        <Hero onWatchDemo={() => setDemoModalOpen(true)} />
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
        title="Product Demo"
      >
        <DemoContent />
      </Modal>

      <Modal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)}
        title="Get in Touch"
      >
        <ContactFormContent onSubmit={handleContactSubmit} />
      </Modal>

      <Modal 
        isOpen={storyModalOpen} 
        onClose={() => setStoryModalOpen(false)}
        title="Our Journey"
      >
        <StoryContent />
      </Modal>

      <Modal 
        isOpen={featureModalOpen} 
        onClose={() => setFeatureModalOpen(false)}
        title={selectedFeature?.title || 'Feature Details'}
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
              Learn More About This
            </button>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)}
        title="Success"
      >
        <SuccessContent 
          message={successMessage}
          onClose={() => setSuccessModalOpen(false)}
        />
      </Modal>
    </>
  )
}

// Custom cursor effect component
function CursorEffect() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows immediately
      cursorDot.style.left = `${mouseX}px`
      cursorDot.style.top = `${mouseY}px`
    }

    // Smooth cursor following
    const animate = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY

      cursorX += dx * 0.1
      cursorY += dy * 0.1

      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Handle hover states
    const handleMouseEnter = () => {
      cursor.classList.add('hover')
      cursorDot.classList.add('hover')
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('hover')
      cursorDot.classList.remove('hover')
    }

    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .feature-link')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>
    </>
  )
}

export default App
