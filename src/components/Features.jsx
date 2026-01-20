import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Features.css'

const features = [
  {
    number: '01',
    title: 'AI-Driven Discovery',
    description: 'Leveraging machine learning algorithms to identify promising drug candidates 10x faster than traditional methods.',
    icon: '◈',
    color: 'teal',
    details: 'Our AI platform analyzes millions of molecular structures to find the most promising drug candidates.'
  },
  {
    number: '02',
    title: 'Precision Medicine',
    description: 'Tailoring treatments to individual genetic profiles for maximum efficacy and minimal side effects.',
    icon: '⬡',
    color: 'pink',
    details: 'We use genetic profiling to create personalized treatment plans for each patient.'
  },
  {
    number: '03',
    title: 'Nano Delivery',
    description: 'Revolutionary nanoparticle delivery systems that target specific cells with unprecedented accuracy.',
    icon: '◇',
    color: 'purple',
    details: 'Our nanoparticles can deliver drugs directly to diseased cells while sparing healthy tissue.'
  },
  {
    number: '04',
    title: 'Gene Therapy',
    description: 'Cutting-edge CRISPR technology to correct genetic mutations at their source.',
    icon: '⬢',
    color: 'cyan',
    details: 'We are pioneering gene editing treatments for previously untreatable genetic disorders.'
  }
]

function FeatureCard({ feature, index, onLearnMore }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`feature-card feature-${feature.color}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <div className="feature-header">
        <span className="feature-number">{feature.number}</span>
        <span className="feature-icon">{feature.icon}</span>
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
      <div 
        className="feature-link"
        onClick={() => onLearnMore(feature)}
        style={{ cursor: 'pointer' }}
      >
        <span>Learn more</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  )
}

export default function Features({ onLearnMore }) {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section className="features" id="features">
      <div className="features-container">
        <motion.div
          ref={titleRef}
          className="features-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Our Technology</span>
          <h2 className="features-title">
            <span>Breakthrough</span>
            <span className="gradient-text-secondary">Innovation</span>
          </h2>
          <p className="features-subtitle">
            Four pillars of our revolutionary approach to modern medicine
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.number} 
              feature={feature} 
              index={index}
              onLearnMore={onLearnMore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
