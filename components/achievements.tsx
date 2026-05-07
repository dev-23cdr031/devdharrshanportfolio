'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Activity, Award, Brain, Cloud, Code2, Database, Flame, Medal, Rocket, ShieldCheck, Sparkles, Target, Trophy, X, Zap } from 'lucide-react'

interface Achievement {
  id: number
  title: string
  description: string
  date: string
  impact?: string
  image: string
  images?: string[]
  category: 'award' | 'certificate' | 'graph'
}

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: 'SIH Finalist - Software Edition',
    description: 'Selected as a finalist in the Smart India Hackathon (Software edition).',
    date: '2025',
    impact: 'Finalist',
    image: '/images/sih-finalist-achievement.jpeg',
    category: 'award',
  },
  {
    id: 2,
    title: 'KPIT Sparkle - Pre-Finalist',
    description: 'Reached the pre-final stage in the KPIT Sparkle competition.',
    date: '2025',
    impact: 'Pre-finalist',
    image: '/images/kpit-sparkle-achievement.jpg',
    category: 'award',
  },
  {
    id: 3,
    title: 'Gen-AI Buildathon - 5th Prize',
    description: 'Secured 5th prize in a Gen-AI themed buildathon showcasing generative AI projects.',
    date: '2025',
    impact: '5th Prize',
    image: '/images/gen-ai-buildathon-achievement.jpg',
    category: 'award',
  },
  {
    id: 4,
    title: 'PoC Dep Level - 2nd Prize',
    description: 'Awarded 2nd prize for proof-of-concept at department-level competition.',
    date: '2024',
    impact: '2nd Prize',
    image: '/images/poc-2nd-prize-achievement.jpg',
    category: 'award',
  },
  {
    id: 5,
    title: 'IIT Bhubaneswar Hackathon Finals',
    description: 'Competed in the IIT Bhubaneswar hackathon finals and secured 5th place.',
    date: '2026',
    impact: '5th Prize',
    image: '/images/iit-bhubaneswar-finals-achievement.jpg',
    category: 'award',
  },
  {
    id: 6,
    title: 'Hyrup Hackathon',
    description: 'Selected as a finalist in the Hyrup Hackathon.',
    date: '2026',
    impact: 'Finalist',
    image: '/images/hyrup-hackathon-achievement.jpg',
    category: 'award',
  },
  {
    id: 7,
    title: 'SIH Finals Certificate',
    description: 'Participation certificate for the Smart India Hackathon 2025 Grand Finale.',
    date: '2025',
    impact: 'Certificate',
    image: '/images/sih-finals-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 8,
    title: 'KPIT Sparkle Pre-Finals Certificate',
    description: 'Certificate for reaching the KPIT Sparkle 2026 Pre-Finale round.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/kpit-sparkle-pre-finals-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 9,
    title: 'KPIT Sparkle Project 2 Certificate',
    description: 'Certificate for reaching the KPIT Sparkle 2026 Pre-Finale round with Hybrid Renewable Energy.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/kpit-sparkle-project-2-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 10,
    title: 'NextWave Buildathon - 8th Prize',
    description: 'National-level certificate for securing 8th position in India at the GenAI Buildathon Grand Finale 2025.',
    date: '2025',
    impact: 'Certificate',
    image: '/images/nextwave-buildathon-8th-prize-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 11,
    title: 'State-Level Buildathon Qualification',
    description: 'Certificate for qualifying to the State-Level Buildathon in the OpenAI Academy x NxtWave Buildathon.',
    date: '2025',
    impact: 'Certificate',
    image: '/images/state-level-buildathon-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 12,
    title: 'IIT Bhubaneswar - 5th Prize Certificate',
    description: 'Certificate for the Web Hackathon conducted by Pravaah 2026 at IIT Bhubaneswar.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/iit-bhubaneswar-5th-prize-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 13,
    title: 'IIT Delhi Startup Finals Certificate',
    description: 'Certificate of participation in Startup - The Debate 4.0 organized by IIT Delhi.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/iit-delhi-startup-finals-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 14,
    title: 'IIT Varanasi Participation Certificate',
    description: 'Certificate for outstanding performance in the Eureka event at Codefest 2026, IIT BHU Varanasi.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/iit-varanasi-participation-certificate.png',
    category: 'certificate',
  },
  {
    id: 15,
    title: 'National Cloud Innovation Challenge',
    description: 'Certificate for participating in Phase 3 prototype evaluation of the National Cloud Innovation Challenge by 3SVK.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/national-cloud-innovation-challenge-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 16,
    title: 'HYRUP FixForward Ideathon Finalist',
    description: 'Certificate of achievement for emerging as a finalist at the HYRUP FixForward Ideathon 2026.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/hyrup-fixforward-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 17,
    title: 'Hackovium: Vibecraft Edition',
    description: 'Certificate of participation for actively participating in the 24-hour Hackovium: Vibecraft Edition hackathon.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/hackovium-vibecraft-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 18,
    title: 'Other CLG Events',
    description: 'Collection of four certificates from technical symposiums, hackathons, and college-level events.',
    date: '2026',
    impact: 'Events',
    image: '/images/other-clg-events-certificates.jpg',
    category: 'certificate',
  },
  {
    id: 19,
    title: 'Publication Certificates',
    description: 'Four publication certificates for AI originality checker, Smart Tourist Safety, SHAADISPOT, and HACKCONNECT.',
    date: '2026',
    impact: '4 Certificates',
    image: '/images/certificate-13-ijsci-originality.png',
    images: [
      '/images/certificate-13-ijsci-originality.png',
      '/images/certificate-13-ijsret-tourist-safety.png',
      '/images/certificate-13-irjmets-shaadispot.jpg',
      '/images/certificate-13-ijprems-hackconnect.jpg',
    ],
    category: 'certificate',
  },
  {
    id: 20,
    title: 'India AI Impact Buildathon',
    description: 'Certificate of participation in the India AI Impact Buildathon conducted at the India AI Impact Summit 2026.',
    date: '2026',
    impact: 'Certificate',
    image: '/images/india-ai-impact-buildathon-certificate.jpg',
    category: 'certificate',
  },
  {
    id: 21,
    title: 'Proof of Concept Ideathon',
    description: 'Certificate of appreciation for winning 2nd prize in the Proof of Concept phase of Ideathon 2025.',
    date: '2025',
    impact: '2nd Prize',
    image: '/images/certificate-15-poc-ideathon-2025.jpg',
    category: 'certificate',
  },
]

const filters = [
  { label: 'Awards', value: 'award', icon: Trophy },
  { label: 'Certificates', value: 'certificate', icon: ShieldCheck },
  { label: 'Graph', value: 'graph', icon: Activity },
] as const

const categoryLabels = {
  award: 'Award',
  certificate: 'Certificate',
  graph: 'Graph',
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: 'easeOut' as const,
    },
  },
}

const statVariants = {
  hidden: (idx: number) => ({
    opacity: 0,
    x: idx === 0 ? -44 : idx === 2 ? 44 : 0,
    y: idx === 1 ? 34 : 20,
    scale: 0.96,
  }),
  visible: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: idx * 0.12,
      ease: 'easeOut' as const,
    },
  }),
}

const graphSkillData = [
  { label: 'Frontend', value: 91, icon: Code2, color: 'from-cyan-300 to-blue-500' },
  { label: 'Backend', value: 85, icon: Database, color: 'from-blue-300 to-indigo-500' },
  { label: 'AI/ML', value: 87, icon: Brain, color: 'from-violet-300 to-cyan-400' },
  { label: 'Cloud', value: 82, icon: Cloud, color: 'from-sky-300 to-emerald-400' },
  { label: 'Hackathons', value: 90, icon: Zap, color: 'from-amber-300 to-orange-500' },
]

const graphMilestones = [
  { year: '2024', label: 'PoC + Tech Symposiums', value: 38 },
  { year: '2025', label: 'SIH, KPIT, GenAI, Publications', value: 72 },
  { year: '2026', label: 'IITs, Cloud, AI Impact, HYRUP', value: 96 },
]

const graphTrendData = [
  { label: 'Apr 24', value: 34, note: 'CIT Intellina' },
  { label: 'Oct 24', value: 48, note: 'PSG Srishti' },
  { label: 'Jan 25', value: 43, note: 'Project grind' },
  { label: 'Feb 25', value: 62, note: 'Xenviron' },
  { label: 'Sep 25', value: 56, note: 'HackSpora' },
  { label: 'Dec 25', value: 78, note: 'SIH + KPIT' },
  { label: 'Feb 26', value: 70, note: 'AI Impact' },
  { label: 'Apr 26', value: 88, note: 'IIT + Cloud' },
  { label: 'May 26', value: 96, note: 'HYRUP + NCIC' },
]

const graphHighlights = [
  { value: 6, label: 'Award Milestones', detail: 'Finals, prizes, finalist selections', icon: Trophy },
  { value: 15, label: 'Certificates', detail: 'Participation, publications, college events', icon: ShieldCheck },
  { value: 5, label: 'Featured Projects', detail: 'AI, full-stack, mobile, cloud systems', icon: Rocket },
  { value: 4, label: 'Research Signals', detail: 'Publication certificates grouped in portfolio', icon: Target },
]

function GraphDashboard() {
  const chartWidth = 720
  const chartHeight = 320
  const chartPadding = { top: 32, right: 34, bottom: 54, left: 54 }
  const chartInnerWidth = chartWidth - chartPadding.left - chartPadding.right
  const chartInnerHeight = chartHeight - chartPadding.top - chartPadding.bottom
  const chartPoints = graphTrendData.map((item, index) => {
    const x = chartPadding.left + (index * chartInnerWidth) / (graphTrendData.length - 1)
    const y = chartPadding.top + chartInnerHeight - (item.value / 100) * chartInnerHeight
    return { ...item, x, y }
  })
  const linePath = chartPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const areaPath = `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - chartPadding.bottom} L ${chartPoints[0].x} ${chartHeight - chartPadding.bottom} Z`

  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      key="graph-dashboard"
      initial="hidden"
      animate="visible"
    >
      <motion.article
        variants={cardVariants}
        className="relative overflow-hidden rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-white/[0.09] via-white/[0.05] to-blue-950/30 p-4 shadow-[0_28px_110px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.18),transparent_42%),radial-gradient(circle_at_92%_90%,rgba(168,85,247,0.14),transparent_42%)]" />
        <div className="relative z-10">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                Performance Graph
              </span>
              <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                Portfolio Growth Curve
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300/85">
                A clean up-and-down graph of your progress across college events, hackathons,
                national challenges, publications, and AI/cloud milestones.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[360px]">
              {[
                { value: '2024', label: 'Started' },
                { value: '+62%', label: 'Growth' },
                { value: '2026', label: 'Peak' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-cyan-200/10 bg-slate-950/45 px-3 py-3">
                  <div className="text-lg font-black text-white">{item.value}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-cyan-200/10 bg-slate-950/60 p-3 sm:p-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.055)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="relative z-10 block h-auto w-full"
              role="img"
              aria-label="Up and down portfolio growth line graph"
            >
              <defs>
                <linearGradient id="graph-line-gradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="48%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="graph-area-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <filter id="graph-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {[0, 25, 50, 75, 100].map((tick) => {
                const y = chartPadding.top + chartInnerHeight - (tick / 100) * chartInnerHeight
                return (
                  <g key={tick}>
                    <line x1={chartPadding.left} y1={y} x2={chartWidth - chartPadding.right} y2={y} stroke="rgba(125,211,252,0.14)" strokeWidth="1" />
                    <text x="16" y={y + 4} fill="rgba(203,213,225,0.72)" fontSize="11" fontWeight="700">
                      {tick}
                    </text>
                  </g>
                )
              })}

              <line x1={chartPadding.left} y1={chartPadding.top} x2={chartPadding.left} y2={chartHeight - chartPadding.bottom} stroke="rgba(125,211,252,0.22)" />
              <line x1={chartPadding.left} y1={chartHeight - chartPadding.bottom} x2={chartWidth - chartPadding.right} y2={chartHeight - chartPadding.bottom} stroke="rgba(125,211,252,0.22)" />

              <motion.path
                d={areaPath}
                fill="url(#graph-area-gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke="url(#graph-line-gradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#graph-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.25, ease: 'easeOut' as const }}
              />

              {chartPoints.map((point, index) => (
                <g key={point.label}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="7"
                    fill="#071027"
                    stroke="#67e8f9"
                    strokeWidth="3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.45 + index * 0.08 }}
                  />
                  <text x={point.x} y={chartHeight - 22} textAnchor="middle" fill="rgba(226,232,240,0.82)" fontSize="11" fontWeight="800">
                    {point.label}
                  </text>
                  <text x={point.x} y={point.y - 16} textAnchor="middle" fill="#cffafe" fontSize="11" fontWeight="900">
                    {point.value}
                  </text>
                </g>
              ))}
            </svg>

            <div className="relative z-10 mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {chartPoints.slice(-3).map((point) => (
                <div key={point.note} className="rounded-xl border border-cyan-200/10 bg-white/[0.045] px-3 py-2">
                  <div className="text-xs font-black text-cyan-100">{point.label}</div>
                  <div className="mt-1 text-xs text-slate-300">{point.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.article>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <motion.article
          variants={cardVariants}
          className="relative overflow-hidden rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-white/[0.08] via-white/[0.045] to-blue-950/25 p-5 shadow-[0_22px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        >
          <h3 className="text-xl font-black text-white">Capability Mix</h3>
          <div className="mt-5 space-y-4">
            {graphSkillData.map((item, index) => (
              <div key={item.label} className="grid grid-cols-[42px_1fr] items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.18)]`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-100">{item.label}</span>
                    <span className="font-bold text-cyan-100">{item.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800/75">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.85, delay: index * 0.08, ease: 'easeOut' as const }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          variants={cardVariants}
          className="relative overflow-hidden rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-white/[0.08] via-white/[0.045] to-blue-950/25 p-5 shadow-[0_22px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        >
          <h3 className="text-xl font-black text-white">Portfolio Signals</h3>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {graphHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-cyan-200/10 bg-slate-950/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <item.icon className="mb-3 h-5 w-5 text-cyan-200" />
                <div className="text-3xl font-black text-white">{item.value}</div>
                <div className="mt-1 text-xs font-bold text-cyan-100">{item.label}</div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.article>
      </div>

      <motion.article
        variants={cardVariants}
        className="relative overflow-hidden rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-white/[0.08] via-white/[0.045] to-blue-950/25 p-5 shadow-[0_22px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
      >
        <h3 className="text-xl font-black text-white">Growth Timeline</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {graphMilestones.map((item, index) => (
            <div key={item.year} className="rounded-xl border border-cyan-200/10 bg-slate-950/45 p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-black text-cyan-100">{item.year}</span>
                  <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                </div>
                <span className="text-sm font-bold text-white">{item.value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800/75 ring-1 ring-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.9, delay: index * 0.12, ease: 'easeOut' as const }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.article>
    </motion.div>
  )
}

export function Achievements() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['value']>('award')
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null)
  const filteredAchievements = achievementsData.filter((achievement) => achievement.category === activeFilter)
  const selectedCertificateImages = selectedCertificate?.images?.length
    ? selectedCertificate.images
    : selectedCertificate
      ? [selectedCertificate.image]
      : []

  useEffect(() => {
    if (!selectedCertificate) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCertificate(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCertificate])

  return (
    <section id="achievements" className="relative overflow-hidden bg-[#070b1f] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-8 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/16 blur-3xl"
        animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.35, 0.58, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-cyan-400/12 blur-3xl"
        animate={{ x: [0, 36, 0], y: [0, -20, 0], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div aria-hidden="true" className="absolute left-[9%] top-32 -z-10 h-1 w-1 rounded-full bg-cyan-200/80 shadow-[120px_24px_0_rgba(125,211,252,0.42),310px_-12px_0_rgba(96,165,250,0.36),610px_58px_0_rgba(34,211,238,0.32),850px_8px_0_rgba(96,165,250,0.3)] animate-pulse" />

      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        >
          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Awards &{' '}
            <span className="bg-[linear-gradient(100deg,#67e8f9_0%,#60a5fa_52%,#c084fc_100%)] bg-[length:220%_auto] bg-clip-text text-transparent animate-gradient-shift">
              Milestones
            </span>
          </h2>
          <motion.div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-56 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
              boxShadow: [
                '0 0 0 rgba(34,211,238,0)',
                '0 0 18px rgba(34,211,238,0.7)',
                '0 0 18px rgba(34,211,238,0.7)',
                '0 0 0 rgba(34,211,238,0)',
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.45,
              ease: 'easeOut' as const,
            }}
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.value

            return (
              <motion.button
                key={filter.value}
                type="button"
                variants={cardVariants}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveFilter(filter.value)}
                className={`group relative overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-2xl transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-300/55 bg-cyan-300/15 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.2)]'
                    : 'border-cyan-200/10 bg-white/[0.045] text-slate-300 hover:border-cyan-300/35 hover:bg-white/[0.075] hover:text-cyan-100'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              </motion.button>
            )
          })}
        </motion.div>

        {activeFilter === 'graph' ? (
          <GraphDashboard />
        ) : (
          <motion.div
            className={`grid grid-cols-1 items-stretch gap-5 lg:gap-6 ${
              activeFilter === 'certificate' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'
            }`}
            variants={containerVariants}
            key={activeFilter}
            initial="hidden"
            animate="visible"
          >
            {filteredAchievements.map((achievement) => {
              const isCertificate = achievement.category === 'certificate'
              const certificateImages = achievement.images?.length ? achievement.images : [achievement.image]
              const hasMultipleCertificates = certificateImages.length > 1

              return (
              <motion.article
                key={achievement.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.014, rotateX: 1.2, rotateY: -1.2 }}
                transition={{ duration: 0.25, ease: 'easeOut' as const }}
                className={`group relative flex overflow-hidden rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-white/[0.08] via-white/[0.045] to-blue-950/25 p-4 shadow-[0_22px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-300/45 hover:shadow-[0_28px_110px_rgba(34,211,238,0.18)] sm:p-5 ${isCertificate ? 'min-h-[520px]' : 'min-h-[430px]'}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_92%_110%,rgba(59,130,246,0.14),transparent_42%)] opacity-70" />
                <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

                <div className="relative z-10 flex h-full w-full flex-col">
                  <div
                    role={isCertificate ? 'button' : undefined}
                    tabIndex={isCertificate ? 0 : undefined}
                    aria-label={isCertificate ? `View full ${achievement.title}` : undefined}
                    onClick={() => {
                      if (isCertificate) {
                        setSelectedCertificate(achievement)
                      }
                    }}
                    onKeyDown={(event) => {
                      if (isCertificate && (event.key === 'Enter' || event.key === ' ')) {
                        event.preventDefault()
                        setSelectedCertificate(achievement)
                      }
                    }}
                    className={`relative mb-5 overflow-hidden rounded-xl border border-cyan-200/10 bg-slate-950 ${isCertificate ? 'aspect-square h-auto w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#070b1f]' : 'h-44'}`}
                  >
                    {hasMultipleCertificates ? (
                      <div className="relative z-10 grid h-full w-full grid-cols-2 gap-1.5 bg-slate-950 p-2">
                        {certificateImages.map((image, imageIdx) => (
                          <div key={image} className="relative overflow-hidden rounded-lg border border-cyan-200/10 bg-white">
                            <Image
                              src={image}
                              alt={`${achievement.title} ${imageIdx + 1}`}
                              fill
                              sizes="(min-width: 768px) 25vw, 50vw"
                              className="object-contain p-1 opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={`${isCertificate ? 'object-contain p-3' : 'object-cover'} opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071027] via-[#071027]/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cyan-400/20 to-transparent blur-xl" />
                    {hasMultipleCertificates ? (
                      <span className="absolute right-3 top-3 z-20 rounded-full border border-cyan-200/20 bg-slate-950/80 px-3 py-1 text-xs font-bold text-cyan-100 backdrop-blur-xl">
                        4 in 1
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5 transition-colors duration-300 group-hover:border-cyan-300/25">
                    <motion.div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-orange-400 to-cyan-400 text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.22)]"
                      animate={{ y: [0, -5, 0], scale: [1, 1.04, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Trophy className="h-5 w-5" />
                    </motion.div>

                    <div className="space-y-2 text-right">
                      <span className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.16)]">
                        {categoryLabels[achievement.category]}
                      </span>
                      <p className="text-xs font-semibold text-slate-400 transition-colors duration-300 group-hover:text-cyan-200">
                        {achievement.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-100 sm:text-xl">
                      {achievement.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-300/82 transition-colors duration-300 group-hover:text-slate-100">
                      {achievement.description}
                    </p>
                  </div>

                  {achievement.impact ? (
                    <div className="mt-7 border-t border-white/10 pt-5 transition-colors duration-300 group-hover:border-cyan-300/25">
                      {isCertificate ? (
                        <button
                          type="button"
                          onClick={() => setSelectedCertificate(achievement)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/12 px-4 py-3 text-sm font-bold text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)] transition hover:border-cyan-300/65 hover:bg-cyan-300/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#070b1f]"
                        >
                          Click to View
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)] transition-colors duration-300 group-hover:border-cyan-300/55 group-hover:bg-cyan-300/15">
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                            <Flame className="h-4 w-4" />
                          </motion.div>
                          <span>{achievement.impact}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </motion.article>
              )
            })}
          </motion.div>
        )}

        {activeFilter !== 'graph' && filteredAchievements.length === 0 ? (
          <motion.div
            className="rounded-2xl border border-cyan-200/10 bg-white/[0.055] p-8 text-center text-slate-300 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Certificate cards will appear here once you add certificate images/details.
          </motion.div>
        ) : null}

      </div>

      {selectedCertificate ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/92 p-4 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCertificate.title}
          onClick={() => setSelectedCertificate(null)}
        >
          <button
            type="button"
            aria-label="Close certificate"
            onClick={() => setSelectedCertificate(null)}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200/20 bg-white/10 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.18)] backdrop-blur-xl transition hover:border-cyan-300/55 hover:bg-cyan-300/15 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            className="relative max-h-[86vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-cyan-200/15 bg-slate-950 shadow-[0_30px_140px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' as const }}
            onClick={(event) => event.stopPropagation()}
          >
            {selectedCertificateImages.length > 1 ? (
              <div className="grid gap-4 p-3 sm:grid-cols-2 sm:p-6">
                {selectedCertificateImages.map((image, index) => (
                  <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cyan-200/15 bg-white">
                    <Image
                      src={image}
                      alt={`${selectedCertificate.title} ${index + 1}`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative h-[86vh] w-full">
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-3 sm:p-6"
                  priority
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  )
}
