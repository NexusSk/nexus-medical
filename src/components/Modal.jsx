import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import './Modal.css'

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <div className="modal-wrapper">
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="modal-content">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Demo Modal Content
export function DemoContent() {
  const { t } = useLanguage()
  
  return (
    <div className="demo-content">
      <div className="demo-video">
        <div className="video-placeholder">
          <div className="play-button">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p>{t('demoVideoPlaceholder')}</p>
        </div>
      </div>
      <p className="demo-description">
        {t('demoDescription')}
      </p>
      <div className="demo-features">
        <div className="demo-feature">
          <span className="feature-icon">🧬</span>
          <span>{t('demoFeature1')}</span>
        </div>
        <div className="demo-feature">
          <span className="feature-icon">⚡</span>
          <span>{t('demoFeature2')}</span>
        </div>
        <div className="demo-feature">
          <span className="feature-icon">🎯</span>
          <span>{t('demoFeature3')}</span>
        </div>
      </div>
    </div>
  )
}

// Contact Form Modal Content
export function ContactFormContent({ onSubmit }) {
  const { t } = useLanguage()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">{t('formName')}</label>
          <input type="text" id="name" placeholder={t('formNamePlaceholder')} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t('formEmail')}</label>
          <input type="email" id="email" placeholder={t('formEmailPlaceholder')} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="company">{t('formCompany')}</label>
        <input type="text" id="company" placeholder={t('formCompanyPlaceholder')} />
      </div>
      <div className="form-group">
        <label htmlFor="message">{t('formMessage')}</label>
        <textarea id="message" rows="4" placeholder={t('formMessagePlaceholder')} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-full">
        {t('formSend')}
      </button>
    </form>
  )
}

// Success Modal Content
export function SuccessContent({ message, onClose }) {
  const { t } = useLanguage()
  
  return (
    <div className="success-content">
      <div className="success-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      </div>
      <h4>{t('successThankYou')}</h4>
      <p>{message || t('successMessage')}</p>
      <button className="btn btn-primary" onClick={onClose}>
        {t('successGotIt')}
      </button>
    </div>
  )
}

// Story Modal Content
export function StoryContent() {
  const { t } = useLanguage()
  
  return (
    <div className="story-content">
      <div className="story-timeline">
        <div className="timeline-item">
          <span className="timeline-year">{t('storyYear2020')}</span>
          <div className="timeline-content">
            <h4>{t('storyTitle2020')}</h4>
            <p>{t('storyDesc2020')}</p>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-year">{t('storyYear2022')}</span>
          <div className="timeline-content">
            <h4>{t('storyTitle2022')}</h4>
            <p>{t('storyDesc2022')}</p>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-year">{t('storyYear2024')}</span>
          <div className="timeline-content">
            <h4>{t('storyTitle2024')}</h4>
            <p>{t('storyDesc2024')}</p>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-year">{t('storyYear2026')}</span>
          <div className="timeline-content">
            <h4>{t('storyTitle2026')}</h4>
            <p>{t('storyDesc2026')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
