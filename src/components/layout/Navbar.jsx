import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Globe, ShoppingCart, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import { useThemeStore, useCartStore } from '../../store'

const LANGS = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const { dark, toggle } = useThemeStore()
  const cartCount = useCartStore((s) => s.count())
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const changeLang = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('medicore-lang', code)
    setLangOpen(false)
  }

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/qa', label: t('nav.qa') },
    { to: '/pharmacy', label: t('nav.pharmacy') },
    { to: '/doctors', label: t('nav.doctors') },
    { to: '/map', label: t('nav.map') },
  ]

  const currentLang = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-xl shadow-black/5 dark:shadow-black/20' : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/"><Logo size={34} /></Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <motion.span
                  className={`relative px-4 py-2 rounded-xl text-sm font-500 font-body transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {location.pathname === link.to && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary-500/10 dark:bg-primary-400/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="relative hidden sm:block">
              <motion.button
                onClick={() => setLangOpen(!langOpen)}
                className="btn-ghost text-slate-600 dark:text-slate-400"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                <span className="text-base">{currentLang.flag}</span>
                <span className="text-xs font-600">{currentLang.code.toUpperCase()}</span>
              </motion.button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 glass-strong rounded-2xl shadow-2xl overflow-hidden min-w-[140px]"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {LANGS.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLang(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary-500/10 transition-colors ${
                          lang.code === i18n.language ? 'text-primary-600 dark:text-primary-400 font-600' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              className="btn-ghost text-slate-600 dark:text-slate-400"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={dark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Cart */}
            <Link to="/pharmacy">
              <motion.div
                className="relative btn-ghost text-slate-600 dark:text-slate-400"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="badge"
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 text-white text-[10px] font-700 flex items-center justify-center"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* Mobile menu */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden btn-ghost text-slate-600 dark:text-slate-400"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-20 pb-8 px-6 glass-strong"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-5 py-4 rounded-2xl font-display font-600 text-lg transition-all ${
                      location.pathname === link.to
                        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            {/* Language in mobile */}
            <div className="mt-6 flex gap-2">
              {LANGS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all ${
                    lang.code === i18n.language
                      ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </>
  )
}
