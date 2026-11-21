import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Camera, ClipboardList, Dumbbell, Menu, Plus, ScanLine, TrendingUp, UserRound, X } from 'lucide-react'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import '@fontsource-variable/inter/wght.css'
import { site, whatsappUrl } from './site'
import Application from './Application'
import './styles.css'

const links = [['Home', 'home'], ['About', 'about'], ['Coaching', 'coaching'], ['How It Works', 'process'], ['FAQ', 'faq']]
const steps = [
  { name: 'Apply', copy: 'Share your goals, training experience, and what you’d like to change.', Icon: ClipboardList },
  { name: 'Assess', copy: 'We discuss your schedule, equipment, preferences, and starting point.', Icon: ScanLine },
  { name: 'Build', copy: 'Get a training plan with clear sessions, targets, and progressions.', Icon: Dumbbell },
  { name: 'Progress', copy: 'Track your sessions and check in so we can adjust the plan as you improve.', Icon: TrendingUp },
]

function Wordmark() {
  return <a className="wordmark" href="#home" aria-label={`${site.brandName} home`}>
    <svg aria-hidden="true" width="25" height="25" viewBox="0 0 32 32"><path fill="currentColor" d="M9 4h23l-2 6H15l-2 5h13l-2 6H11L7 30H0z" /></svg>
    {site.brand}<span>.</span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!open) return
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
  function navigate(event) {
    setOpen(false)
    const section = document.getElementById(event.currentTarget.hash.slice(1))
    section?.focus({ preventScroll: true })
  }
  return <header className="header">
    <div className="wrap nav-row">
      <Wordmark />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="button nav-apply" href="#apply">APPLY NOW <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" ref={buttonRef} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={open ? 'mobile-nav' : undefined} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>
      {open && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"
        initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .18 }}>
        {[...links, ['Apply Now', 'apply']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={navigate}>{label}<ArrowUpRight size={18} /></a>)}
      </motion.nav>}
    </AnimatePresence>
  </header>
}

function Photo({ image, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  return <div className={`photo ${className}`}>
    {image && !failed ? <picture>{image.mobile && <source media="(max-width: 720px)" srcSet={image.mobile} />}<img src={image.src} alt={image.alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" onError={() => setFailed(true)} /></picture> : <div className="photo-placeholder" aria-hidden="true"><Camera size={28} strokeWidth={1.2} /></div>}
  </div>
}

function Hero() {
  const reduce = useReducedMotion()
  return <section className="hero" id="home" tabIndex={-1}>
    <Photo className="hero-photo" image={site.hero} eager />
    <div className="hero-shade" />
    <div className="wrap hero-inner">
      <div className="hero-content">
        {[
          <p className="eyebrow hero-kicker">ONLINE STRENGTH & FITNESS COACHING</p>,
          <h1>BUILD YOUR<br /><em>STRONGEST</em> SELF<span>.</span></h1>,
          <p className="hero-copy">Personalized online training built around your goals. Get stronger, make sustainable progress, and see what consistent work can do.</p>,
          <div className="hero-actions"><a className="button primary" href="#apply">START YOUR TRANSFORMATION <ArrowUpRight size={17} /></a><a className="button secondary" href="#coaching">EXPLORE COACHING <ArrowDownRight size={16} /></a></div>,
        ].map((item, index) => <motion.div key={index} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .42, delay: reduce ? 0 : index * .08 }}>{item}</motion.div>)}
      </div>
      <a className="scroll-link" href="#philosophy"><span><ArrowDown size={15} /></span> SCROLL TO EXPLORE</a>
    </div>
  </section>
}

function Reveal({ children, className }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { y: 12 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: reduce ? 0 : .4 }}>{children}</motion.div>
}

function Coaching({ select }) {
  return <section className="section coaching" id="coaching" tabIndex={-1}>
    <div className="wrap">
      <Reveal className="section-heading">
        <div><p className="eyebrow">COACHING SERVICES</p><h2>BUILT FOR <em>YOUR GOALS.</em></h2></div>
        <p className="section-copy">Choose the focus that matches what you want to achieve. Every plan starts with where you are today.</p>
      </Reveal>
      <div className="service-grid">
        {site.services.map(service => <article className="service-card" key={service.id}>
          <Photo image={service.photo} />
          <div className="service-content">
            <h3>{service.name}</h3><p>{service.description}</p>
            {service.price && <p className="service-price">{service.price}</p>}
            <a className="text-link" href="#apply" onClick={() => select(service.id)} aria-label={`Apply for ${service.name}`}>APPLY FOR THIS SERVICE <ArrowUpRight size={15} /></a>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}

function Process() {
  return <section className="section process" id="process" tabIndex={-1}><div className="wrap">
    <Reveal><p className="eyebrow">HOW IT WORKS</p><h2>FROM APPLICATION<br />TO <em>PROGRESS.</em></h2></Reveal>
    <ol className="timeline">{steps.map(({ name, copy, Icon }, index) => <li key={name}>
      <div className="step-top"><Icon size={23} strokeWidth={1.5} /><span>{String(index + 1).padStart(2, '0')}</span></div>
      <h3>{name}</h3><p>{copy}</p>
    </li>)}</ol>
  </div></section>
}

function About() {
  const { coach } = site
  return <section className="section about" id="about" tabIndex={-1}><div className="wrap about-grid">
    {coach.photo ? <Photo className="coach-photo" image={coach.photo} /> : <div className="coach-placeholder"><UserRound size={38} strokeWidth={1.2} /><span>COACH PORTRAIT PLACEHOLDER</span></div>}
    <Reveal>
      <p className="eyebrow">ABOUT THE COACH</p><h2>MEET YOUR <em>COACH.</em></h2>
      <h3>{coach.name}</h3><p>{coach.bio}</p><p>{coach.philosophy}</p>
      <h4>Qualifications & certifications</h4>
      {coach.qualifications.length ? <ul>{coach.qualifications.map(item => <li key={item}>{item}</li>)}</ul> : <p>Verified qualifications will be listed here.</p>}
      <h4>Areas of focus</h4><ul className="tags">{coach.specialties.map(item => <li key={item}>{item}</li>)}</ul>
    </Reveal>
  </div></section>
}

function Results() {
  return <section className="section results"><div className="wrap">
    <Reveal><p className="eyebrow">CLIENT RESULTS</p><h2>PROGRESS <em>IN PRACTICE.</em></h2></Reveal>
    {site.results.length ? <div className="service-grid">{site.results.map(result => <article className="service-card" key={result.name}>
      {result.photo && <Photo image={result.photo} />}<div className="service-content"><h3>{result.name}</h3><p>{result.summary}</p></div>
    </article>)}</div> : <div className="results-placeholder"><Camera size={25} strokeWidth={1.4} /><div><h3>Client story placeholder</h3><p>Client-approved stories and progress photos will appear here.</p></div></div>}
  </div></section>
}

function FAQ() {
  return <section className="section faq" id="faq" tabIndex={-1}><div className="wrap faq-grid">
    <Reveal><p className="eyebrow">COMMON QUESTIONS</p><h2>GOOD<br /><em>QUESTIONS.</em></h2></Reveal>
    <div>{site.faq.map(([question, answer]) => <details key={question} name="coaching-faq"><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
  </div></section>
}

function Footer() {
  return <footer className="footer"><div className="wrap">
    <div className="footer-main"><div><Wordmark /><p>{site.tagline}</p></div>
      <nav aria-label="Footer navigation">{links.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
      <div className="footer-contact">
        {site.instagram && <a href={site.instagram}>Instagram <ArrowUpRight size={14} /></a>}
        {whatsappUrl && <a href={whatsappUrl}>WhatsApp <ArrowUpRight size={14} /></a>}
        {site.email && <a href={`mailto:${site.email}`}>Email <ArrowUpRight size={14} /></a>}
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {site.brandName}</span><p><strong>Privacy.</strong> This site keeps your application in the current tab. WhatsApp handles the details once you continue there.</p></div>
  </div></footer>
}

function App() {
  const [service, select] = useState('')
  return <MotionConfig reducedMotion="user"><a className="skip" href="#main">Skip to content</a><Header />
    <main id="main" tabIndex={-1}>
      <Hero />
      <section className="section philosophy" id="philosophy"><Reveal className="wrap philosophy-grid">
        <div><p className="eyebrow">THE FORMA PHILOSOPHY</p><h2>NO SHORTCUTS.<br /><em>JUST SMARTER PROGRESS.</em></h2></div>
        <div><p className="section-copy">Good training gives you a reason for every session. FORMA combines smart programming, consistent effort, and sustainable habits to make progress you can measure and keep.</p><a className="text-link" href="#process">SEE HOW IT WORKS <ArrowRight size={16} /></a></div>
      </Reveal></section>
      <Coaching select={select} /><Process /><About /><Results />
      <Application selectedService={service} onServiceChange={select} /><FAQ />
      <section className="final-cta"><div className="wrap"><h2>YOUR NEXT CHAPTER<br />STARTS HERE.</h2><a className="button" href="#apply">APPLY FOR COACHING <ArrowUpRight size={17} /></a></div></section>
    </main>
    <Footer />
  </MotionConfig>
}

createRoot(document.getElementById('root')).render(<App />)
