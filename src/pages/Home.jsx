import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Brain, Pill, MapPin, Stethoscope, Star, Shield, Zap, Users } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const STATS = [
  { key: 'stat1', value: '50K+', icon: Users },
  { key: 'stat2', value: '2K+', icon: Pill },
  { key: 'stat3', value: '120+', icon: Stethoscope },
  { key: 'stat4', value: '30+', icon: MapPin },
]

const FEATURES = [
  { key: 'f1', icon: Brain,       color: 'from-violet-500 to-purple-600', link: '/qa' },
  { key: 'f2', icon: Pill,        color: 'from-emerald-500 to-teal-600',  link: '/pharmacy' },
  { key: 'f3', icon: MapPin,      color: 'from-blue-500 to-cyan-600',     link: '/map' },
  { key: 'f4', icon: Stethoscope, color: 'from-rose-500 to-pink-600',     link: '/doctors' },
]

// Floating blobs for the hero
function Blob({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 dark:opacity-20 ${className}`}
      animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

// Floating medicine card decoration
function FloatingCard({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute glass rounded-2xl p-3 shadow-xl ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ duration: 0.6, delay, y: { duration: 4 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <main className="overflow-hidden">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden mesh-bg"
      >
        {/* Noise texture */}
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Blobs */}
        <Blob className="w-96 h-96 bg-primary-400 top-20 -left-20" delay={0} />
        <Blob className="w-80 h-80 bg-violet-400 bottom-20 -right-10" delay={2} />
        <Blob className="w-64 h-64 bg-cyan-400 top-1/2 left-1/2" delay={4} />

        {/* Floating decorative cards */}
        <FloatingCard className="hidden lg:block top-32 right-16 text-center" delay={0.8}>
          <div className="text-2xl mb-1">🩺</div>
          <p className="text-xs font-600 text-slate-700 dark:text-slate-300">120+ Doctors</p>
        </FloatingCard>

        <FloatingCard className="hidden lg:block bottom-40 left-12" delay={1.2}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm">✓</div>
            <div>
              <p className="text-xs font-600 text-slate-700 dark:text-slate-300">AI Diagnosis</p>
              <p className="text-[10px] text-slate-400">Instant results</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="hidden xl:block top-48 left-20" delay={1.6}>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <p className="text-xs font-600 text-slate-700 dark:text-slate-300">4.9 / 5.0 Rating</p>
          </div>
        </FloatingCard>

        {/* Main hero content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className="badge-primary mx-auto mb-6 w-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Zap size={12} />
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            className="font-display font-800 text-5xl sm:text-7xl lg:text-8xl leading-none mb-6 text-balance"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-slate-900 dark:text-white">{t('hero.title')}</span>
            <br />
            <span className="gradient-text">{t('hero.title2')}</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/qa">
              <motion.button
                className="btn-primary text-base px-8 py-4 rounded-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t('hero.cta')}
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/doctors">
              <motion.button
                className="btn-secondary text-base px-8 py-4 rounded-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t('hero.cta2')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {STATS.map(({ key, value, icon: Icon }) => (
              <div key={key} className="glass rounded-2xl px-4 py-3 text-center">
                <Icon size={18} className="text-primary-500 mx-auto mb-1" />
                <p className="font-display font-800 text-xl text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t(`hero.${key}`)}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary-500 animate-pulse-slow" />
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container-max">
          <motion.div className="text-center mb-16" {...fadeUp()}>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-slate-900 dark:text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ key, icon: Icon, color, link }, i) => (
              <motion.div key={key} {...fadeUp(i * 0.1)}>
                <Link to={link}>
                  <motion.div
                    className="card h-full cursor-pointer group"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-display font-700 text-lg text-slate-900 dark:text-white mb-2">
                      {t(`features.${key}_title`)}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t(`features.${key}_desc`)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-600 group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BANNER ── */}
      <section className="section bg-gradient-to-r from-primary-600 to-primary-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        </div>
        <div className="container-max relative z-10 text-center">
          <motion.div {...fadeUp()}>
            <Shield size={48} className="text-white/80 mx-auto mb-4" />
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-white mb-4">
              Trusted by 50,000+ patients
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              HIPAA-compliant, end-to-end encrypted, and reviewed by licensed medical professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DOCTORS PREVIEW ── */}
      <section className="section">
        <div className="container-max">
          <motion.div className="flex items-end justify-between mb-12" {...fadeUp()}>
            <div>
              <h2 className="font-display font-800 text-4xl sm:text-5xl text-slate-900 dark:text-white mb-3">
                {t('doctors.title')}
              </h2>
              <p className="text-slate-500 dark:text-slate-400">{t('doctors.subtitle')}</p>
            </div>
            <Link to="/doctors" className="hidden sm:block">
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              >
                View all <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Sarah Chen', specialty: 'General Practitioner', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80', rating: 4.9, available: true },
              { name: 'Dr. Amir Karimov', specialty: 'Cardiologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80', rating: 4.8, available: true },
              { name: 'Dr. Nilufar Yusupova', specialty: 'Dermatologist', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=80', rating: 4.8, available: true },
            ].map((doc, i) => (
              <motion.div key={doc.name} {...fadeUp(i * 0.1)}>
                <motion.div
                  className="card flex items-center gap-4 cursor-pointer"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={doc.img}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    {doc.available && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-700 text-slate-900 dark:text-white truncate">{doc.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-600 text-slate-700 dark:text-slate-300">{doc.rating}</span>
                    </div>
                  </div>
                  <Link to="/doctors">
                    <motion.button
                      className="px-3 py-2 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-600 hover:bg-primary-500/20 transition-colors"
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      Book
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
