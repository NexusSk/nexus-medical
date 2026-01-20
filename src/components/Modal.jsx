import { motion, AnimatePresence } from 'framer-motion'
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
            onClick={onClose}
          />
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
        </>
      )}
    </AnimatePresence>
  )
}

// Demo Modal Content
export function DemoContent() {
  return (
    <div className="demo-content">
      <div className="demo-video">
        <div className="video-placeholder">
          <div className="play-button">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p>Product Demo Video</p>
        </div>
      </div>
      <p className="demo-description">
        Experience our revolutionary AI-driven drug discovery platform in action. 
        See how we're accelerating the path from lab to patient.
      </p>
      <div className="demo-features">
        <div className="demo-feature">
          <span className="feature-icon">🧬</span>
          <span>AI Molecule Design</span>
        </div>
        <div className="demo-feature">
          <span className="feature-icon">⚡</span>
          <span>10x Faster Discovery</span>
        </div>
        <div className="demo-feature">
          <span className="feature-icon">🎯</span>
          <span>Precision Targeting</span>
        </div>
      </div>
    </div>
  )
}

// Contact Form Modal Content
export function ContactFormContent({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="your@email.com" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" placeholder="Your company" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" rows="4" placeholder="Tell us about your needs..." required></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-full">
        Send Message
      </button>
    </form>
  )
}

// Success Modal Content
export function SuccessContent({ message, onClose }) {
  return (
    <div className="success-content">
      <div className="success-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      </div>
      <h4>Thank You!</h4>
      <p>{message || "We've received your message and will get back to you within 24 hours."}</p>
      <button className="btn btn-primary" onClick={onClose}>
        Got it
      </button>
    </div>
  )
}

// Story Modal Content
export function StoryContent() {
  return (
    <div className="story-content">
      <div className="story-timeline">
        <div className="timeline-item">
          <span className="timeline-year">2020</span>
          <div className="timeline-content">
            <h4>The Beginning</h4>
            <p>Founded by a team of Stanford researchers and biotech veterans with a vision to revolutionize drug discovery.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-year">2022</span>
          <div className="timeline-content">
            <h4>Breakthrough</h4>
            <p>Our AI platform successfully identified 3 novel drug candidates, reducing discovery time by 80%.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-year">2024</span>
          <div className="timeline-content">
            <h4>FDA Recognition</h4>
            <p>Received FDA Fast Track designation for our lead oncology treatment program.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-year">2026</span>
          <div className="timeline-content">
            <h4>Global Impact</h4>
            <p>Expanded to 24 countries, partnering with leading healthcare institutions worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
