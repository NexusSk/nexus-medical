import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

export default function About({ onShowStory }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })
  
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
            <span className="section-label">// About Us</span>
            <h2 className="about-title">
              Redefining What's
              <span className="gradient-text"> Possible</span>
            </h2>
            <p className="about-description">
              Founded in 2020, we've assembled a world-class team of scientists, 
              engineers, and healthcare visionaries united by a single mission: 
              to transform how humanity fights disease.
            </p>
            <p className="about-description">
              Our proprietary platform combines quantum computing, advanced AI, 
              and cutting-edge biotechnology to accelerate drug discovery from 
              years to months.
            </p>

            <div className="about-highlights">
              <div className="highlight">
                <div className="highlight-icon">⬡</div>
                <div className="highlight-content">
                  <h4>FDA Fast Track</h4>
                  <p>3 treatments in accelerated approval pipeline</p>
                </div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">◈</div>
                <div className="highlight-content">
                  <h4>Global Reach</h4>
                  <p>Operations across 24 countries worldwide</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onShowStory}>
              Our Story
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
                  <span className="stat-desc">Founded</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value">500+</span>
                  <span className="stat-desc">Scientists</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value">$2.1B</span>
                  <span className="stat-desc">Funding</span>
                </div>
                <div className="stat-block">
                  <span className="stat-value">15</span>
                  <span className="stat-desc">Patents</span>
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
              <span>Next-Gen<br/>Biotech</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
