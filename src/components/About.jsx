import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './About.css'

export default function About({ onShowStory }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <motion.div
            ref={titleRef}
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">{t('aboutSectionLabel')}</span>
            <h2 className="about-title">
              {t('aboutTitle1')}
              <span className="gradient-text"> {t('aboutTitle2')}</span>
            </h2>
            <p className="about-description">
              {t('aboutDesc1')}
            </p>
            <p className="about-description">
              {t('aboutDesc2')}
            </p>

            <div className="about-highlights">
              <div className="highlight">
                <div className="highlight-icon">⬡</div>
                <div className="highlight-content">
                  <h4>{t('aboutFdaTitle')}</h4>
                  <p>{t('aboutFdaDesc')}</p>
                </div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">◈</div>
                <div className="highlight-content">
                  <h4>{t('aboutGlobalTitle')}</h4>
                  <p>{t('aboutGlobalDesc')}</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onShowStory}>
              {t('ourStory')}
            </button>
          </motion.div>

          <motion.div
            className="about-visual"
            style={{ y }}
          >
            <div className="visual-frame">
              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>
              
              <div className="visual-content">
                <div className="stat-block">
                  <span className="stat-value">2024</span>
                  <span className="stat-desc">{t('founded')}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value">500+</span>
                  <span className="stat-desc">{t('scientists')}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value">$2.1B</span>
                  <span className="stat-desc">{t('funding')}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value">15</span>
                  <span className="stat-desc">{t('patents')}</span>
                </div>
              </div>

              <div className="visual-bg">
                <div className="hex-pattern"></div>
              </div>
            </div>

            <motion.div
              className="floating-badge"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <span>🧬</span>
              <span style={{ whiteSpace: 'pre-line' }}>{t('nextGenBiotech')}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
