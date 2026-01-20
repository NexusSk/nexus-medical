import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero({ onWatchDemo }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
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
          <span>Revolutionizing Healthcare</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="title-line">The Future of</span>
          <span className="title-line gradient-text">Medicine</span>
          <span className="title-line">Starts Here</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Pioneering breakthrough treatments through advanced biotechnology
          and AI-driven drug discovery. Where science meets innovation.
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
            Discover More
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onWatchDemo}
          >
            Watch Demo
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
            <span className="stat-label">Clinical Trials</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">12M</span>
            <span className="stat-label">Patients Reached</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => scrollToSection('features')}
        style={{ cursor: 'pointer' }}
      >
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
