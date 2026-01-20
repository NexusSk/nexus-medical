import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Features.css'

function FeatureCard({ feature, index, onLearnMore, learnMoreText }) {
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
        <span>{learnMoreText}</span>
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
  const { t } = useLanguage()

  const features = [
    {
      number: '01',
      title: t('feature1Title'),
      description: t('feature1Desc'),
      icon: '◈',
      color: 'teal',
      details: t('feature1Details')
    },
    {
      number: '02',
      title: t('feature2Title'),
      description: t('feature2Desc'),
      icon: '⬡',
      color: 'pink',
      details: t('feature2Details')
    },
    {
      number: '03',
      title: t('feature3Title'),
      description: t('feature3Desc'),
      icon: '◇',
      color: 'purple',
      details: t('feature3Details')
    },
    {
      number: '04',
      title: t('feature4Title'),
      description: t('feature4Desc'),
      icon: '⬢',
      color: 'cyan',
      details: t('feature4Details')
    }
  ]

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
          <span className="section-label">{t('featuresSectionLabel')}</span>
          <h2 className="features-title">
            <span>{t('featuresTitle1')}</span>
            <span className="gradient-text-secondary">{t('featuresTitle2')}</span>
          </h2>
          <p className="features-subtitle">
            {t('featuresSubtitle')}
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.number} 
              feature={feature} 
              index={index}
              onLearnMore={onLearnMore}
              learnMoreText={t('learnMore')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
