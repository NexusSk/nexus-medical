import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  sk: {
    // Navbar
    navAbout: 'O nás',
    navTechnology: 'Technológia',
    navResearch: 'Výskum',
    navContact: 'Kontakt',
    navGetStarted: 'Začať',
    
    // Hero
    heroBadge: 'Revolucionizujeme zdravotníctvo',
    heroTitleLine1: 'Budúcnosť',
    heroTitleLine2: 'Medicíny',
    heroTitleLine3: 'Začína tu',
    heroDescription: 'Priekopnícke liečby prostredníctvom pokročilej biotechnológie a objavovania liekov pomocou AI. Kde sa veda stretáva s inováciou.',
    heroDiscoverMore: 'Zistiť viac',
    heroWatchDemo: 'Pozrieť demo',
    heroClinicalTrials: 'Klinických štúdií',
    heroPatientsReached: 'Dosiahnutých pacientov',
    heroSuccessRate: 'Úspešnosť',
    scrollToExplore: 'Posúvajte sa a objavujte',
    
    // Features
    featuresSectionLabel: 'Naša technológia',
    featuresTitle1: 'Prelomová',
    featuresTitle2: 'Inovácia',
    featuresSubtitle: 'Štyri piliere nášho revolučného prístupu k modernej medicíne',
    feature1Title: 'AI-riadený objav',
    feature1Desc: 'Využívanie algoritmov strojového učenia na identifikáciu sľubných kandidátov na lieky 10x rýchlejšie ako tradičné metódy.',
    feature1Details: 'Naša AI platforma analyzuje milióny molekulárnych štruktúr na nájdenie najsľubnejších kandidátov na lieky.',
    feature2Title: 'Precízna medicína',
    feature2Desc: 'Prispôsobenie liečby individuálnym genetickým profilom pre maximálnu účinnosť a minimálne vedľajšie účinky.',
    feature2Details: 'Používame genetické profilovanie na vytvorenie personalizovaných plánov liečby pre každého pacienta.',
    feature3Title: 'Nano doručovanie',
    feature3Desc: 'Revolučné nanočasticové doručovacie systémy, ktoré cielene pôsobia na špecifické bunky s bezprecedentnou presnosťou.',
    feature3Details: 'Naše nanočastice dokážu doručiť lieky priamo do chorých buniek a pritom šetriť zdravé tkanivo.',
    feature4Title: 'Génová terapia',
    feature4Desc: 'Špičková technológia CRISPR na opravu genetických mutácií priamo pri ich zdroji.',
    feature4Details: 'Priekopníme v liečbe génovou editáciou pre predtým neliečiteľné genetické poruchy.',
    learnMore: 'Zistiť viac',
    
    // About
    aboutSectionLabel: '// O nás',
    aboutTitle1: 'Predefinujeme čo je',
    aboutTitle2: 'Možné',
    aboutDesc1: 'Založení v roku 2020, zhromaždili sme tím svetových vedcov, inžinierov a vizionárov zdravotníctva zjednotených jedinou misiou: transformovať spôsob, akým ľudstvo bojuje s chorobami.',
    aboutDesc2: 'Naša proprietárna platforma kombinuje kvantové počítače, pokročilú AI a špičkovú biotechnológiu na urýchlenie objavovania liekov z rokov na mesiace.',
    aboutFdaTitle: 'FDA Fast Track',
    aboutFdaDesc: '3 liečby v zrýchlenom schvaľovacom procese',
    aboutGlobalTitle: 'Globálny dosah',
    aboutGlobalDesc: 'Operácie v 24 krajinách po celom svete',
    ourStory: 'Náš príbeh',
    founded: 'Založené',
    scientists: 'Vedcov',
    funding: 'Financovanie',
    patents: 'Patentov',
    nextGenBiotech: 'Next-Gen\nBiotechnológia',
    
    // Contact
    contactSectionLabel: '// Kontaktujte nás',
    contactTitle1: 'Pripravení',
    contactTitle2: 'Transformovať',
    contactTitle3: 'Zdravotníctvo?',
    contactDescription: 'Pripojte sa k nám v našej misii revolucionizovať medicínu. Či ste výskumník, investor alebo poskytovateľ zdravotnej starostlivosti, radi vás vypočujeme.',
    scheduleCall: 'Naplánovať hovor',
    partnershipInquiry: 'Partnerský dopyt',
    email: 'Email',
    location: 'Lokalita',
    locationValue: 'Bratislava, Slovensko',
    
    // Footer
    footerTagline: 'Priekopníci budúcnosti medicíny.',
    footerPrivacy: 'Súkromie',
    footerTerms: 'Podmienky',
    footerCareers: 'Kariéra',
    footerCopyright: '© 2026 NexusMed. Všetky práva vyhradené.',
    
    // Modals
    modalProductDemo: 'Demo produktu',
    modalGetInTouch: 'Kontaktujte nás',
    modalOurJourney: 'Naša cesta',
    modalFeatureDetails: 'Detaily funkcie',
    modalSuccess: 'Úspech',
    
    // Demo Modal
    demoVideoPlaceholder: 'Video demo produktu',
    demoDescription: 'Zažite našu revolučnú AI-riadenú platformu objavovania liekov v akcii. Pozrite sa, ako urýchľujeme cestu z laboratória k pacientovi.',
    demoFeature1: 'AI Dizajn molekúl',
    demoFeature2: '10x rýchlejší objav',
    demoFeature3: 'Precízne cielenie',
    
    // Contact Form
    formName: 'Meno',
    formNamePlaceholder: 'Vaše meno',
    formEmail: 'Email',
    formEmailPlaceholder: 'vas@email.sk',
    formCompany: 'Spoločnosť',
    formCompanyPlaceholder: 'Vaša spoločnosť',
    formMessage: 'Správa',
    formMessagePlaceholder: 'Povedzte nám o vašich potrebách...',
    formSend: 'Odoslať správu',
    
    // Success Modal
    successThankYou: 'Ďakujeme!',
    successMessage: 'Prijali sme vašu správu a odpovieme vám do 24 hodín.',
    successGotIt: 'Rozumiem',
    
    // Story Modal
    storyYear2020: '2020',
    storyTitle2020: 'Začiatok',
    storyDesc2020: 'Založené tímom výskumníkov zo Stanfordu a veteránov biotechnológie s víziou revolucionizovať objavovanie liekov.',
    storyYear2022: '2022',
    storyTitle2022: 'Prelom',
    storyDesc2022: 'Naša AI platforma úspešne identifikovala 3 nových kandidátov na lieky, čím skrátila čas objavovania o 80%.',
    storyYear2024: '2024',
    storyTitle2024: 'Uznanie FDA',
    storyDesc2024: 'Získali sme označenie FDA Fast Track pre náš hlavný program onkologickej liečby.',
    storyYear2026: '2026',
    storyTitle2026: 'Globálny dopad',
    storyDesc2026: 'Expanzia do 24 krajín, partnerstvá s poprednými zdravotníckymi inštitúciami po celom svete.',
    
    // Feature button
    learnMoreAboutThis: 'Zistiť viac o tomto',
    
    // Language
    language: 'SK',
  },
  en: {
    // Navbar
    navAbout: 'About',
    navTechnology: 'Technology',
    navResearch: 'Research',
    navContact: 'Contact',
    navGetStarted: 'Get Started',
    
    // Hero
    heroBadge: 'Revolutionizing Healthcare',
    heroTitleLine1: 'The Future of',
    heroTitleLine2: 'Medicine',
    heroTitleLine3: 'Starts Here',
    heroDescription: 'Pioneering breakthrough treatments through advanced biotechnology and AI-driven drug discovery. Where science meets innovation.',
    heroDiscoverMore: 'Discover More',
    heroWatchDemo: 'Watch Demo',
    heroClinicalTrials: 'Clinical Trials',
    heroPatientsReached: 'Patients Reached',
    heroSuccessRate: 'Success Rate',
    scrollToExplore: 'Scroll to explore',
    
    // Features
    featuresSectionLabel: 'Our Technology',
    featuresTitle1: 'Breakthrough',
    featuresTitle2: 'Innovation',
    featuresSubtitle: 'Four pillars of our revolutionary approach to modern medicine',
    feature1Title: 'AI-Driven Discovery',
    feature1Desc: 'Leveraging machine learning algorithms to identify promising drug candidates 10x faster than traditional methods.',
    feature1Details: 'Our AI platform analyzes millions of molecular structures to find the most promising drug candidates.',
    feature2Title: 'Precision Medicine',
    feature2Desc: 'Tailoring treatments to individual genetic profiles for maximum efficacy and minimal side effects.',
    feature2Details: 'We use genetic profiling to create personalized treatment plans for each patient.',
    feature3Title: 'Nano Delivery',
    feature3Desc: 'Revolutionary nanoparticle delivery systems that target specific cells with unprecedented accuracy.',
    feature3Details: 'Our nanoparticles can deliver drugs directly to diseased cells while sparing healthy tissue.',
    feature4Title: 'Gene Therapy',
    feature4Desc: 'Cutting-edge CRISPR technology to correct genetic mutations at their source.',
    feature4Details: 'We are pioneering gene editing treatments for previously untreatable genetic disorders.',
    learnMore: 'Learn more',
    
    // About
    aboutSectionLabel: '// About Us',
    aboutTitle1: 'Redefining What\'s',
    aboutTitle2: 'Possible',
    aboutDesc1: 'Founded in 2020, we\'ve assembled a world-class team of scientists, engineers, and healthcare visionaries united by a single mission: to transform how humanity fights disease.',
    aboutDesc2: 'Our proprietary platform combines quantum computing, advanced AI, and cutting-edge biotechnology to accelerate drug discovery from years to months.',
    aboutFdaTitle: 'FDA Fast Track',
    aboutFdaDesc: '3 treatments in accelerated approval pipeline',
    aboutGlobalTitle: 'Global Reach',
    aboutGlobalDesc: 'Operations across 24 countries worldwide',
    ourStory: 'Our Story',
    founded: 'Founded',
    scientists: 'Scientists',
    funding: 'Funding',
    patents: 'Patents',
    nextGenBiotech: 'Next-Gen\nBiotech',
    
    // Contact
    contactSectionLabel: '// Get in Touch',
    contactTitle1: 'Ready to',
    contactTitle2: 'Transform',
    contactTitle3: 'Healthcare?',
    contactDescription: 'Join us in our mission to revolutionize medicine. Whether you\'re a researcher, investor, or healthcare provider, we\'d love to hear from you.',
    scheduleCall: 'Schedule a Call',
    partnershipInquiry: 'Partnership Inquiry',
    email: 'Email',
    location: 'Location',
    locationValue: 'Bratislava, Slovakia',
    
    // Footer
    footerTagline: 'Pioneering the future of medicine.',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerCareers: 'Careers',
    footerCopyright: '© 2026 NexusMed. All rights reserved.',
    
    // Modals
    modalProductDemo: 'Product Demo',
    modalGetInTouch: 'Get in Touch',
    modalOurJourney: 'Our Journey',
    modalFeatureDetails: 'Feature Details',
    modalSuccess: 'Success',
    
    // Demo Modal
    demoVideoPlaceholder: 'Product Demo Video',
    demoDescription: 'Experience our revolutionary AI-driven drug discovery platform in action. See how we\'re accelerating the path from lab to patient.',
    demoFeature1: 'AI Molecule Design',
    demoFeature2: '10x Faster Discovery',
    demoFeature3: 'Precision Targeting',
    
    // Contact Form
    formName: 'Name',
    formNamePlaceholder: 'Your name',
    formEmail: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formCompany: 'Company',
    formCompanyPlaceholder: 'Your company',
    formMessage: 'Message',
    formMessagePlaceholder: 'Tell us about your needs...',
    formSend: 'Send Message',
    
    // Success Modal
    successThankYou: 'Thank You!',
    successMessage: 'We\'ve received your message and will get back to you within 24 hours.',
    successGotIt: 'Got it',
    
    // Story Modal
    storyYear2020: '2020',
    storyTitle2020: 'The Beginning',
    storyDesc2020: 'Founded by a team of Stanford researchers and biotech veterans with a vision to revolutionize drug discovery.',
    storyYear2022: '2022',
    storyTitle2022: 'Breakthrough',
    storyDesc2022: 'Our AI platform successfully identified 3 novel drug candidates, reducing discovery time by 80%.',
    storyYear2024: '2024',
    storyTitle2024: 'FDA Recognition',
    storyDesc2024: 'Received FDA Fast Track designation for our lead oncology treatment program.',
    storyYear2026: '2026',
    storyTitle2026: 'Global Impact',
    storyDesc2026: 'Expanded to 24 countries, partnering with leading healthcare institutions worldwide.',
    
    // Feature button
    learnMoreAboutThis: 'Learn More About This',
    
    // Language
    language: 'EN',
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('sk') // Slovak as default
  
  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('nexusmed-lang')
    if (savedLang && (savedLang === 'sk' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
  }, [])
  
  const toggleLanguage = () => {
    const newLang = language === 'sk' ? 'en' : 'sk'
    setLanguage(newLang)
    localStorage.setItem('nexusmed-lang', newLang)
    // Update document language
    document.documentElement.lang = newLang
  }
  
  const t = (key) => {
    return translations[language][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

