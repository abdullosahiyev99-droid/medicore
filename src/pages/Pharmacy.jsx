import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Search, ShoppingCart, Star, X, Plus, Minus, Truck, Shield, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { medicines } from '../data'
import { useCartStore } from '../store'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

const CATS = ['all', 'vitamins', 'pain', 'cold', 'digestive', 'heart', 'skin']

function MedicineCard({ med, onAdd }) {
  const { t } = useTranslation()
  const [added, setAdded] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const handleAdd = () => {
    if (!med.inStock) return
    onAdd(med)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      className="card flex flex-col h-full overflow-hidden group"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      layout
    >
      {/* Image */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
        {!imgErr ? (
          <img
            src={med.image}
            alt={med.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">{med.emoji || '💊'}</div>
        )}
        {/* Out of stock overlay */}
        {!med.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-display font-700 text-sm px-3 py-1.5 rounded-full border border-white/30">Out of Stock</span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-2 right-2 badge-primary text-[10px] capitalize">{med.category}</span>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display font-700 text-slate-900 dark:text-white text-base mb-1 leading-tight">{med.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex-1 leading-relaxed">{med.desc}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          {[1,2,3,4,5].map(n => (
            <Star key={n} size={11} className={n <= Math.round(med.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'} />
          ))}
          <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">({med.reviews})</span>
        </div>

        {/* Price + button */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-display font-800 text-xl text-slate-900 dark:text-white">${med.price}</span>
          </div>
          <motion.button
            onClick={handleAdd}
            disabled={!med.inStock}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 transition-all duration-300 ${
              added
                ? 'bg-emerald-500 text-white'
                : med.inStock
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
            whileHover={med.inStock ? { scale: 1.05 } : {}}
            whileTap={med.inStock ? { scale: 0.95 } : {}}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  ✓ {t('pharmacy.added')}
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                  <ShoppingCart size={14} /> {t('pharmacy.cart')}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function CartDrawer({ open, onClose }) {
  const { t } = useTranslation()
  const { items, remove, add, total, clear } = useCartStore()
  const [ordered, setOrdered] = useState(false)

  const handleOrder = () => {
    setOrdered(true)
    setTimeout(() => {
      clear()
      setOrdered(false)
      onClose()
      toast.success(t('toast.order_success'))
    }, 1500)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass-strong shadow-2xl flex flex-col"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200/60 dark:border-slate-700/60">
              <h2 className="font-display font-700 text-xl">{t('nav.cart')}</h2>
              <motion.button onClick={onClose} className="btn-ghost" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <X size={20} />
              </motion.button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
                <ShoppingCart size={48} strokeWidth={1} />
                <p className="text-lg">{t('pharmacy.empty_cart')}</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-4 p-3 glass rounded-2xl"
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-600 text-sm text-slate-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button onClick={() => remove(item.id)} className="w-7 h-7 rounded-lg glass flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                        <Minus size={12} />
                      </motion.button>
                      <span className="font-700 text-sm w-4 text-center">{item.qty}</span>
                      <motion.button onClick={() => add(item)} className="w-7 h-7 rounded-lg bg-primary-500/10 text-primary-600 flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                        <Plus size={12} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-display font-700 text-lg">{t('pharmacy.total')}</span>
                  <span className="font-display font-800 text-2xl gradient-text">${total().toFixed(2)}</span>
                </div>
                <motion.button
                  onClick={handleOrder}
                  disabled={ordered}
                  className="w-full btn-primary justify-center py-4 rounded-2xl text-base"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  {ordered ? <><RefreshCw size={16} className="animate-spin" /> Processing...</> : <><Truck size={16} /> {t('pharmacy.order')}</>}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Pharmacy() {
  const { t } = useTranslation()
  const { add } = useCartStore()
  const cartCount = useCartStore((s) => s.count())
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)

  const filtered = medicines.filter((m) => {
    const matchCat = category === 'all' || m.category === category
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleAdd = (med) => {
    add(med)
    toast.success(t('toast.cart_add'))
  }

  return (
    <main className="min-h-screen pt-20 mesh-bg">
      <div className="noise absolute inset-0 pointer-events-none" />
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Header */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display font-800 text-4xl sm:text-5xl text-slate-900 dark:text-white mb-3">
                {t('pharmacy.title')}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">{t('pharmacy.subtitle')}</p>
            </div>
            <motion.button
              onClick={() => setCartOpen(true)}
              className="relative btn-primary flex-shrink-0"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">{t('pharmacy.checkout')}</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-primary-600 text-[11px] font-800 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              [Truck, 'Free delivery over $30'],
              [Shield, '100% Authentic medicines'],
              [RefreshCw, 'Easy returns'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Icon size={14} className="text-primary-500" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search + filter */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('pharmacy.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-11"
            />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex gap-2 flex-wrap mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
        >
          {CATS.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-600 transition-all duration-200 capitalize ${
                category === cat
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'glass hover:bg-primary-500/10 text-slate-600 dark:text-slate-400'
              }`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              {t(`pharmacy.categories.${cat}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence>
            {filtered.map((med, i) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                layout
              >
                <MedicineCard med={med} onAdd={handleAdd} />
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="col-span-full text-center py-20 text-slate-400"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-600">No medicines found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  )
}
