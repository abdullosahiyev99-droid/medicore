import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import Logo from '../ui/Logo'

const LIVE_PROJECT_URL = 'https://medicore-qgsx.vercel.app/'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative mt-20 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Logo size={36} />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span>Made with</span>
              <Heart size={12} className="text-red-400 fill-red-400" />
              <span>for better health</span>
            </div>
          </div>

          <div>
            <p className="font-display font-700 text-sm mb-5 text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              {t('footer.links')}
            </p>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {t('nav.home')}
              </Link>
              <a
                href={LIVE_PROJECT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink size={14} />
              </a>
            </nav>
          </div>

          <div>
            <p className="font-display font-700 text-sm mb-5 text-slate-700 dark:text-slate-300 uppercase tracking-widest">
              {t('footer.contact')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@medicore.uz"
                className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Mail size={14} className="text-primary-500 flex-shrink-0" />
                <span>hello@medicore.uz</span>
              </a>
              <a
                href="tel:+998710000000"
                className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Phone size={14} className="text-primary-500 flex-shrink-0" />
                <span>+998 71 000-00-00</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={14} className="text-primary-500 flex-shrink-0" />
                <span>Tashkent, Uzbekistan</span>
              </div>
              <a
                href={LIVE_PROJECT_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ExternalLink size={14} className="text-primary-500 flex-shrink-0" />
                <span>medicore-qgsx.vercel.app</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Copyright 2025 MediCore. {t('footer.rights')}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">v1.0.0</p>
        </div>
      </div>
    </footer>
  )
}
