import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

export default function Contact({ onScheduleCall, onPartnershipInquiry }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact-bg">
        <div className="contact-gradient"></div>
        <div className="contact-lines"></div>
      </div>

      <div className="contact-container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">{t('contactSectionLabel')}</span>
          <h2 className="contact-title">
            {t('contactTitle1')}<br />
            <span className="gradient-text">{t('contactTitle2')}</span><br />
            {t('contactTitle3')}
          </h2>
          <p className="contact-description">
            {t('contactDescription')}
          </p>

          <div className="contact-cta">
            <button 
              className="btn btn-primary btn-large"
              onClick={onScheduleCall}
            >
              {t('scheduleCall')}
            </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={onPartnershipInquiry}
            >
              {t('partnershipInquiry')}
            </button>
          </div>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">{t('email')}</span>
              <a href="mailto:contact@nexusmed.sk" className="info-value">contact@nexusmed.sk</a>
            </div>
            <div className="info-item">
              <span className="info-label">{t('location')}</span>
              <span className="info-value">{t('locationValue')}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="dna-visual">
            <div className="dna-strand">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="dna-base" style={{ '--i': i }}>
                  <div className="base-left"></div>
                  <div className="base-connector"></div>
                  <div className="base-right"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-logo">NexusMed</span>
            <p>{t('footerTagline')}</p>
          </div>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert(`${t('footerPrivacy')} - Coming Soon`); }}>{t('footerPrivacy')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert(`${t('footerTerms')} - Coming Soon`); }}>{t('footerTerms')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert(`${t('footerCareers')} - Coming Soon`); }}>{t('footerCareers')}</a>
          </div>
          <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <div className="footer-copyright">
            <span>{t('footerCopyright')}</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
