import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

export default function Navbar({ onGetStarted, lenisRef }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, toggleLanguage, language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items in chronological order matching the page sections
  const navItems = [
    { name: t('navTechnology'), href: 'features' },
    { name: t('navAbout'), href: 'about' },
    { name: t('navContact'), href: 'contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Use Lenis for smooth scrolling if available, otherwise fallback
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(element, { 
          duration: 2.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { 
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="nav-container">
          <a href="#" className="nav-logo" onClick={scrollToTop}>
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#logo-gradient)" strokeWidth="2"/>
                <circle cx="16" cy="16" r="6" stroke="url(#logo-gradient)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="logo-gradient" x1="4" y1="2" x2="28" y2="30">
                    <stop stopColor="#00c853"/>
                    <stop offset="1" stopColor="#10b981"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">NexusMed</span>
          </a>

          <div className="nav-links">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={`#${item.href}`}
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
              >
                <span className="link-number">0{index + 1}</span>
                <span className="link-text">{item.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="nav-actions">
            <motion.button
              className="btn-lang"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              {language === 'sk' ? 'EN' : 'SK'}
            </motion.button>

            <motion.button
              className="btn-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => {
                scrollToSection('contact')
                onGetStarted?.()
              }}
            >
              {t('navGetStarted')}
            </motion.button>

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="mobile-menu-content">
              <motion.button
                className="btn-lang mobile-lang"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={toggleLanguage}
              >
                {language === 'sk' ? 'Switch to English' : 'Prepnúť na Slovenčinu'}
              </motion.button>
              
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`#${item.href}`}
                  className="mobile-link"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                >
                  <span className="mobile-link-number">0{index + 1}</span>
                  <span className="mobile-link-text">{item.name}</span>
                </motion.a>
              ))}
              <motion.button
                className="btn btn-primary mobile-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                onClick={() => {
                  scrollToSection('contact')
                  onGetStarted?.()
                }}
              >
                {t('navGetStarted')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
