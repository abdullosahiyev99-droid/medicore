import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Clock, Navigation, Locate, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { pharmacies } from '../data'
import { useLocationStore } from '../store'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

// Simple SVG map visualization (no API key needed)
function MapVisualization({ pharmacies, userCoords }) {
  // Center of Tashkent
  const centerLat = 41.2995
  const centerLng = 69.2401

  const toSvg = (lat, lng) => {
    const x = 50 + (lng - centerLng) * 900
    const y = 50 + (centerLat - lat) * 900
    return { x: Math.max(20, Math.min(680, x)), y: Math.max(20, Math.min(380, y)) }
  }

  return (
    <div className="w-full h-80 glass rounded-3xl overflow-hidden relative">
      {/* Map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        {/* Street lines */}
        <svg className="w-full h-full" viewBox="0 0 700 400">
          {/* Grid / road network */}
          {[60, 120, 180, 240, 300, 360].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="700" y2={y} stroke="rgba(148,163,184,0.2)" strokeWidth="1.5" />
          ))}
          {[70, 140, 210, 280, 350, 420, 490, 560, 630].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="rgba(148,163,184,0.2)" strokeWidth="1.5" />
          ))}
          {/* Major roads */}
          <line x1="0" y1="160" x2="700" y2="180" stroke="rgba(148,163,184,0.5)" strokeWidth="4" />
          <line x1="0" y1="260" x2="700" y2="240" stroke="rgba(148,163,184,0.4)" strokeWidth="3" />
          <line x1="280" y1="0" x2="300" y2="400" stroke="rgba(148,163,184,0.5)" strokeWidth="4" />
          <line x1="490" y1="0" x2="460" y2="400" stroke="rgba(148,163,184,0.4)" strokeWidth="3" />
          {/* Park area */}
          <ellipse cx="350" cy="200" rx="60" ry="40" fill="rgba(134,239,172,0.25)" />

          {/* Pharmacy pins */}
          {pharmacies.map((ph) => {
            const { x, y } = toSvg(ph.lat, ph.lng)
            return (
              <g key={ph.id}>
                <circle cx={x} cy={y} r="18" fill={ph.open ? 'rgba(20,184,166,0.2)' : 'rgba(148,163,184,0.2)'} />
                <circle cx={x} cy={y} r="10" fill={ph.open ? '#14b8a6' : '#94a3b8'} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="white">💊</text>
                <text x={x} y={y + 26} textAnchor="middle" fontSize="8" fill="rgba(15,23,42,0.7)" fontWeight="600">{ph.name.split(' ')[0]}</text>
              </g>
            )
          })}

          {/* User location */}
          {userCoords && (() => {
            const { x, y } = toSvg(userCoords.lat, userCoords.lng)
            return (
              <g>
                <circle cx={x} cy={y} r="22" fill="rgba(99,102,241,0.2)" />
                <circle cx={x} cy={y} r="10" fill="#6366f1" />
                <circle cx={x} cy={y} r="4" fill="white" />
              </g>
            )
          })()}

          {!userCoords && (
            <>
              {/* Default "you are here" marker at center */}
              <circle cx="350" cy="200" r="22" fill="rgba(99,102,241,0.2)" />
              <circle cx="350" cy="200" r="10" fill="#6366f1" />
              <circle cx="350" cy="200" r="4" fill="white" />
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-primary-500" /><span>Open</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-400" /><span>Closed</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-indigo-500" /><span>You</span></div>
      </div>

      <div className="absolute top-4 right-4 badge-primary text-xs">Tashkent, UZ</div>
    </div>
  )
}

function PharmacyCard({ ph, index }) {
  const { t } = useTranslation()
  return (
    <motion.div
      className="card flex flex-col sm:flex-row items-start sm:items-center gap-5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3, scale: 1.01 }}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
        ph.open ? 'bg-primary-500/10' : 'bg-slate-200/80 dark:bg-slate-700/50'
      }`}>
        💊
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-display font-700 text-slate-900 dark:text-white">{ph.name}</h3>
          <span className={`badge text-[10px] ${ph.open ? 'badge-success' : 'badge-error'}`}>
            {ph.open ? <><CheckCircle size={9} />{t('map.open')}</> : <><XCircle size={9} />{t('map.closed')}</>}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary-500" />{ph.address}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary-500" />{ph.hours}</span>
          <span className="flex items-center gap-1.5"><Navigation size={12} className="text-primary-500" />{ph.distance} {t('map.distance')}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-shrink-0">
        <motion.a
          href={`tel:${ph.phone}`}
          className="flex items-center gap-1.5 px-3 py-2 glass rounded-xl text-sm font-600 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          <Phone size={14} /> {t('map.call')}
        </motion.a>
        <motion.button
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl text-sm font-600 shadow-lg shadow-primary-500/20"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => window.open(`https://www.google.com/maps?q=${ph.lat},${ph.lng}`, '_blank')}
        >
          <Navigation size={14} /> {t('map.directions')}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function MapPage() {
  const { t } = useTranslation()
  const { coords, loading, error, fetch } = useLocationStore()

  const handleLocate = () => {
    fetch()
    if (!navigator.geolocation) {
      toast.error(t('toast.location_error'))
    }
  }

  // Sort pharmacies by distance
  const sorted = [...pharmacies].sort((a, b) => a.distance - b.distance)

  return (
    <main className="min-h-screen pt-20 mesh-bg">
      <div className="noise absolute inset-0 pointer-events-none" />
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-display font-800 text-4xl sm:text-5xl text-slate-900 dark:text-white mb-3">
              {t('map.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('map.subtitle')}</p>
          </div>
          <motion.button
            onClick={handleLocate}
            disabled={loading}
            className="btn-primary flex-shrink-0"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <><motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />{t('map.locating')}</>
            ) : (
              <><Locate size={16} />{t('map.locate')}</>
            )}
          </motion.button>
        </motion.div>

        {/* Map */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MapVisualization pharmacies={pharmacies} userCoords={coords} />
          {coords && (
            <motion.p
              className="mt-3 text-sm text-primary-600 dark:text-primary-400 flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <CheckCircle size={14} />
              Location detected: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </motion.p>
          )}
          {error && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-2">
              <XCircle size={14} /> {t('map.no_location')}
            </p>
          )}
        </motion.div>

        {/* Pharmacy list */}
        <div className="space-y-4">
          <motion.h2
            className="font-display font-700 text-xl text-slate-900 dark:text-white mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            {pharmacies.filter(p => p.open).length} pharmacies open now
          </motion.h2>
          {sorted.map((ph, i) => (
            <PharmacyCard key={ph.id} ph={ph} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
