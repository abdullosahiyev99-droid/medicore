import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Brain,
  Check,
  ExternalLink,
  Globe,
  MapPin,
  Pill,
  Shield,
  Star,
  Stethoscope,
  Users,
  Zap,
} from 'lucide-react'

const LIVE_PROJECT_URL = 'https://medicore-qgsx.vercel.app/'

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
  { key: 'f1', icon: Brain, color: 'from-violet-500 to-purple-600' },
  { key: 'f2', icon: Pill, color: 'from-emerald-500 to-teal-600' },
  { key: 'f3', icon: MapPin, color: 'from-blue-500 to-cyan-600' },
  { key: 'f4', icon: Stethoscope, color: 'from-rose-500 to-pink-600' },
]

function Blob({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 dark:opacity-20 ${className}`}
      animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

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
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden mesh-bg"
      >
        <div className="absolute inset-0 noise pointer-events-none" />

        <Blob className="w-96 h-96 bg-primary-400 top-20 -left-20" delay={0} />
        <Blob className="w-80 h-80 bg-violet-400 bottom-20 -right-10" delay={2} />
        <Blob className="w-64 h-64 bg-cyan-400 top-1/2 left-1/2" delay={4} />

        <FloatingCard className="hidden lg:block top-32 right-16 text-center" delay={0.8}>
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-600">
            <Stethoscope size={20} />
          </div>
          <p className="text-xs font-600 text-slate-700 dark:text-slate-300">120+ Doctors</p>
        </FloatingCard>

        <FloatingCard className="hidden lg:block bottom-40 left-12" delay={1.2}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
              <Check size={16} />
            </div>
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
            <motion.a
              href={LIVE_PROJECT_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-base px-8 py-4 rounded-2xl inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('hero.cta')}
              <ExternalLink size={18} />
            </motion.a>

            <motion.a
              href="#project-overview"
              className="btn-secondary text-base px-8 py-4 rounded-2xl inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t('hero.cta2')}
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>

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

      <section id="project-overview" className="section">
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
            {FEATURES.map(({ key, icon: Icon, color }, i) => (
              <motion.div key={key} {...fadeUp(i * 0.1)}>
                <div className="card h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-display font-700 text-lg text-slate-900 dark:text-white mb-2">
                    {t(`features.${key}_title`)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t(`features.${key}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-max">
          <motion.div
            className="relative overflow-hidden rounded-[32px] bg-slate-950 px-6 py-10 sm:px-10"
            {...fadeUp()}
          >
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at top left, rgba(45, 212, 191, 0.6), transparent 35%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.5), transparent 30%)',
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-700 uppercase tracking-[0.2em] text-white/70">
                  <Globe size={14} />
                  Official Project Link
                </div>
                <h2 className="font-display font-800 text-3xl sm:text-4xl text-white mb-4">
                  medicore-qgsx.vercel.app
                </h2>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                  This landing page now focuses only on your MediCore project. Demo sub-pages were removed from navigation so the site presents a single clear product.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={LIVE_PROJECT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Open Live Site
                  <ExternalLink size={18} />
                </motion.a>
                <motion.a
                  href="mailto:hello@medicore.uz"
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact
                  <Shield size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
