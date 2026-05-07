'use client'

import { useMemo, useState, useEffect } from 'react'
import { Bot, MessageCircle, Send, Volume2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  id: number
  role: 'user' | 'bot'
  text: string
}

const roshiniProfileResponse =
  "I'm Roshini M, a passionate and dedicated aspiring software developer with a strong enthusiasm for web development, modern technologies, and innovative digital solutions. As a recipient of the IIT Bhubaneswar 5th Prize, I have gained valuable experience in problem-solving, teamwork, and building impactful technology-driven solutions in competitive environments. I enjoy transforming ideas into interactive and user-friendly applications while continuously strengthening my technical expertise in React, HTML, CSS, Bootstrap, Python, MySQL, and modern UI/UX design. Along with technical knowledge, I possess strong leadership, communication, and collaboration skills, enabling me to work effectively within teams, manage responsibilities confidently, and contribute positively to project development and execution.\n\nI am deeply interested in building technology that creates real-world impact and enhances user experiences. Over time, I have worked on multiple projects ranging from responsive web platforms to innovative solutions such as Hybrid Renewable Energy Orchestration systems and sales data analysis platforms. I believe that combining creativity, consistency, leadership, and technical knowledge is the key to building meaningful digital products. I continuously explore emerging technologies, improve my problem-solving abilities, and challenge myself through innovation, teamwork, and continuous learning. My goal is to grow into a skilled full-stack developer and technology professional who contributes to future-focused projects while creating impactful and inspiring digital experiences."

const femaleVoiceHints = [
  'female',
  'zira',
  'samantha',
  'susan',
  'karen',
  'victoria',
  'tessa',
  'veena',
  'heera',
  'google uk english female',
  'google us english',
]

export function EchoChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLight, setIsLight] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'bot',
      text: roshiniProfileResponse,
    },
  ])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find((voice) => {
      const voiceName = voice.name.toLowerCase()
      return voice.lang.toLowerCase().startsWith('en') && femaleVoiceHints.some((hint) => voiceName.includes(hint))
    })

    if (preferredVoice) {
      utterance.voice = preferredVoice
      utterance.lang = preferredVoice.lang
    } else {
      utterance.lang = 'en-IN'
    }

    utterance.rate = 0.9
    utterance.pitch = 1.18
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const update = () => setIsLight(document.documentElement.classList.contains('light'))
    update()
    setMounted(true)
    const obs = new MutationObserver(() => update())
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const sendMessage = () => {
    const text = input.trim()

    if (!text) {
      return
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text },
      { id: Date.now() + 1, role: 'bot', text: roshiniProfileResponse },
    ])
    setInput('')
    speak(roshiniProfileResponse)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' as const }}
            className={`mb-4 flex h-[520px] w-[min(calc(100vw-2.5rem),380px)] flex-col overflow-hidden rounded-2xl transition-all ` +
              (mounted && isLight
                  ? 'border border-slate-200 bg-white/95 text-slate-900 shadow-sm'
                  : 'border border-cyan-200/15 bg-[#071027]/95 text-slate-100 shadow-[0_24px_90px_rgba(0,0,0,0.42),0_0_40px_rgba(34,211,238,0.14)] backdrop-blur-2xl')
            }
          >
                <div className={`flex items-center justify-between border-b px-4 py-3 ` + (mounted && isLight ? 'border-slate-200 bg-white/60' : 'border-white/10 bg-white/[0.055]')}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                    <h3 className={`text-sm font-black ${mounted && isLight ? 'text-slate-900' : 'text-white'}`}>Roshini Chatbot</h3>
                    <p className={`text-xs ${mounted && isLight ? 'text-slate-600' : 'text-cyan-100/75'}`}>Responds with ROSHINI M&apos;s profile</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chatbot"
                onClick={() => setIsOpen(false)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ` + (mounted && isLight ? 'border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100' : 'border border-white/10 bg-white/[0.06] text-slate-200 hover:border-cyan-300/45 hover:bg-cyan-300/12 hover:text-white')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-lg ${
                      message.role === 'user'
                        ? (mounted && isLight ? 'bg-cyan-300 text-slate-900' : 'bg-cyan-300 text-slate-950')
                        : (mounted && isLight ? 'border border-slate-200 bg-white text-slate-900' : 'border border-cyan-200/10 bg-white/[0.07] text-slate-100')
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className={`border-t p-3 ` + (mounted && isLight ? 'border-slate-200 bg-white/80' : 'border-white/10 bg-slate-950/45')}>
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      sendMessage()
                    }
                  }}
                  rows={2}
                  placeholder="Type text..."
                  className={`min-h-[46px] flex-1 resize-none rounded-xl border px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ` + (mounted && isLight ? 'border-slate-200 bg-white text-slate-900 focus:border-sky-400 focus:ring-sky-200' : 'border border-cyan-200/15 bg-white/[0.06] text-white focus:border-cyan-300/55 focus:ring-2 focus:ring-cyan-300/20')}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!canSend}
                  className={`inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl transition disabled:cursor-not-allowed disabled:opacity-45 ` + (mounted && isLight ? 'bg-sky-500 text-white shadow-sm hover:bg-sky-600' : 'bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)] hover:bg-cyan-200')}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300 text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.34)] transition hover:scale-105 hover:bg-cyan-200"
        aria-label="Open chatbot"
      >
        {isOpen ? <Volume2 className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  )
}
