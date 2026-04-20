import { motion } from 'framer-motion'
import myAvatar from '../../assets/contact_avatar.jpg'

const GithubBrand = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedinBrand = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const InstagramBrand = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.869a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
  </svg>
)

const WhatsappBrand = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.765.46 3.491 1.332 5.01L2 22l5.088-1.332A9.97 9.97 0 0 0 12.031 22c5.541 0 10.031-4.49 10.031-10.031S17.572 2 12.031 2zM17.46 16.32c-.229.645-1.332 1.258-1.859 1.334-.527.076-1.127.152-3.32-.76-2.656-1.107-4.32-3.818-4.448-3.992-.128-.174-1.066-1.428-1.066-2.723 0-1.295.666-1.928.918-2.188.252-.26.553-.326.736-.326.183 0 .366 0 .524.009.167.01.385-.065.602.46.223.535.76 1.858.83 2.01.07.151.117.327.023.513-.094.187-.14.301-.28.461-.14.16-.291.345-.42.476-.14.14-.286.295-.12.583.166.288.74 1.229 1.597 1.996.848.759 1.777 1.053 2.062 1.189.285.136.452.112.619-.071.167-.183.714-.834.907-1.121.192-.287.384-.239.641-.143.257.094 1.624.767 1.902.906.278.14.464.21.532.327.067.117.067.683-.162 1.328z"/>
  </svg>
)

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
    Icon: GithubBrand,
    bg: 'bg-[#24292e]',
    hoverBg: 'hover:bg-[#2f363d]',
  },
  {
    label: 'LinkedIn',
    handle: 'pruthvi-t-s',
    url: 'https://www.linkedin.com/in/pruthvi-t-s-1547392a2/',
    Icon: LinkedinBrand,
    bg: 'bg-[#0077b5]',
    hoverBg: 'hover:bg-[#006097]',
  },
  {
    label: 'Instagram',
    handle: 'pruthvibe_',
    url: 'https://www.instagram.com/pruthvibe_/?hl=en',
    Icon: InstagramBrand,
    bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    hoverBg: 'hover:opacity-90',
  },
  {
    label: 'WhatsApp',
    handle: '+91XXXXXXXXXX',
    url: 'https://wa.link/h42bko',
    Icon: WhatsappBrand,
    bg: 'bg-[#25D366]',
    hoverBg: 'hover:bg-[#128C7E]',
  },
];

export function ContactApp() {
  return (
    <div className="flex flex-col h-full" style={{ background: '#1a1a1c' }}>
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10 bg-white/5">
            <img src={myAvatar} alt="Pruthvi T S" className="w-full h-full object-cover" />
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
