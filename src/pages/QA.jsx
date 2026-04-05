import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Send, Bot, User, AlertCircle, Sparkles, RotateCcw } from 'lucide-react'
import { mockAIResponses } from '../data'

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
    .replace(/^• /gm, '&bull; ')
}

export default function QA() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'assistant',
      text: "Hello! I'm MediCore AI, your personal health assistant. Ask me any health question — symptoms, medications, wellness tips, and more. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const suggestedQs = [
    t('qa.q1'), t('qa.q2'), t('qa.q3'), t('qa.q4'), t('qa.q5'),
  ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const ask = async (question) => {
    if (!question.trim() || loading) return
    const userMsg = { id: Date.now(), role: 'user', text: question }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1400 + Math.random() * 800))

    const lower = question.toLowerCase()
    let response
    if (lower.includes('flu') || lower.includes('influenza') || lower.includes('gripp')) {
      response = mockAIResponses.flu
    } else {
      response = mockAIResponses.default(question)
    }

    setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: response }])
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    ask(input)
  }

  const reset = () => {
    setMessages([{
      id: 0, role: 'assistant',
      text: "Hello! I'm MediCore AI, your personal health assistant. Ask me any health question — symptoms, medications, wellness tips, and more. How can I help you today?",
    }])
    setInput('')
  }

  return (
    <main className="min-h-screen pt-20 flex flex-col mesh-bg">
      <div className="noise absolute inset-0 pointer-events-none" />
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8 flex flex-col flex-1 relative z-10 max-w-3xl">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-primary-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/30">
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="font-display font-800 text-4xl text-slate-900 dark:text-white mb-2">{t('qa.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('qa.subtitle')}</p>
        </motion.div>

        {/* Chat */}
        <div className="flex-1 glass rounded-3xl p-4 sm:p-6 mb-4 overflow-y-auto flex flex-col gap-4 min-h-[360px] max-h-[500px]">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-primary-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-br-md shadow-lg shadow-primary-500/20'
                      : 'glass text-slate-700 dark:text-slate-300 rounded-bl-md'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={14} className="text-slate-600 dark:text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <motion.div
                className="flex gap-3 justify-start"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-primary-500 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="glass px-5 py-4 rounded-3xl rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary-500"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{t('qa.thinking')}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        {messages.length <= 2 && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles size={12} /> {t('qa.suggested')}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQs.map((q) => (
                <motion.button
                  key={q}
                  onClick={() => ask(q)}
                  className="px-4 py-2 glass rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('qa.placeholder')}
            disabled={loading}
            className="input-base flex-1"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary px-5 rounded-2xl disabled:opacity-40"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <Send size={18} />
          </motion.button>
          <motion.button
            type="button"
            onClick={reset}
            className="btn-secondary px-4 rounded-2xl"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            title="Clear chat"
          >
            <RotateCcw size={16} />
          </motion.button>
        </form>

        {/* Disclaimer */}
        <motion.div
          className="mt-4 flex items-start gap-2 p-4 glass rounded-2xl"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{t('qa.disclaimer')}</p>
        </motion.div>
      </div>
    </main>
  )
}
