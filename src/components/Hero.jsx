import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

export default function Hero({ onWatchDemo, lenisRef }) {
  const { t } = useLanguage()
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Use Lenis for smooth scrolling if available
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(element, { 
          duration: 2.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="badge-dot"></span>
          <span>{t('heroBadge')}</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="title-line">{t('heroTitleLine1')}</span>
          <span className="title-line gradient-text">{t('heroTitleLine2')}</span>
          <span className="title-line">{t('heroTitleLine3')}</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {t('heroDescription')}
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('features')}
          >
            {t('heroDiscoverMore')}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onWatchDemo}
          >
            {t('heroWatchDemo')}
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">{t('heroClinicalTrials')}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">12M</span>
            <span className="stat-label">{t('heroPatientsReached')}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">{t('heroSuccessRate')}</span>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
