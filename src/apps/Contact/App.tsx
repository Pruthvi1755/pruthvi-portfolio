import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Globe } from 'lucide-react'

interface SocialLink {
  label: string
  handle: string
  url: string
  Icon: React.ElementType
  bg: string
  hoverBg: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    handle: 'Pruthvi1755',
    url: 'https://github.com/Pruthvi1755',
    Icon: Github,
    bg: 'bg-red-500',
    hoverBg: 'hover:bg-red-400',
  },
  {
    label: 'Portfolio',
    handle: 'pruthvibe.web.app',
    url: 'https://pruthvibe.web.app',
    Icon: Globe,
    bg: 'bg-green-500',
    hoverBg: 'hover:bg-green-400',
  },
  {
    label: 'Focus',
    handle: 'AI/ML + Data Science',
    url: 'https://github.com/Pruthvi1755',
    Icon: Twitter,
    bg: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-400',
  },
  {
    label: 'LinkedIn',
    handle: 'Pruthvi T S',
    url: 'https://linkedin.com/in/PruthviTS',
    Icon: Linkedin,
    bg: 'bg-cyan-500',
    hoverBg: 'hover:bg-cyan-400',
  },
]

export function ContactApp() {
  return (
    <div className="flex flex-col h-full" style={{ background: '#1a1a1c' }}>
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
            <div
              className="w-full h-full flex items-center justify-center text-xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
            >
              PS
            </div>
          </div>

          <div className="pt-1">
            <h2 className="text-white text-lg font-bold">Pruthvi T S</h2>
            <p className="text-white/50 text-[12px] mt-1 leading-relaxed max-w-xs">
              Computer Science Engineering student focused on AI/ML, data science, and scalable full-stack data applications.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-6 border-b border-white/8" />

      <div className="flex-1 px-6 py-4 overflow-y-auto" data-no-drag>
        <div className="grid grid-cols-2 gap-3">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`${link.bg} ${link.hoverBg} rounded-xl p-4 flex items-center gap-3 transition-colors cursor-pointer group`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <link.Icon size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-[13px]">{link.label}</p>
                <p className="text-white/70 text-[10px]">{link.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center">
            <span className="text-blue-400 text-sm">@</span>
          </div>
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-wider">Email</p>
            <a
              href="mailto:stevepruthvi@gmail.com"
              className="text-blue-400 text-[12px] hover:underline"
            >
              stevepruthvi@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-400 text-[11px]">Open to AI/ML, data science, and full-stack opportunities</span>
        </div>
      </div>
    </div>
  )
}
