import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Monitor, Moon, Search, Sun, User, Wifi } from 'lucide-react'
import { useThemeStore, type ThemeMode } from '../store/useThemeStore'
import { useWindowStore } from '../store/useWindowStore'
import { formatTime, formatDate } from '../utils/helpers'

const themeItems: { mode: ThemeMode; label: string; Icon: React.ElementType }[] = [
  { mode: 'system', label: 'System', Icon: Monitor },
  { mode: 'light', label: 'Light', Icon: Sun },
  { mode: 'dark', label: 'Dark', Icon: Moon },
]

export function MenuBar() {
  const [time, setTime] = useState(new Date())
  const [openMenu, setOpenMenu] = useState<'apple' | 'theme' | null>(null)
  const { openWindow } = useWindowStore()
  const { mode, resolvedTheme, setMode } = useThemeStore()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const close = () => setOpenMenu(null)
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [])

  const openApp = (app: 'finder' | 'contact' | 'resume') => {
    openWindow(app as any)
    setOpenMenu(null)
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-11 z-[9999] flex items-center px-5 justify-between transition-colors duration-300"
      style={{
        background: isDark ? 'rgba(0,0,0,0.48)' : 'rgba(255,255,255,0.48)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        color: isDark ? 'white' : '#111827',
      }}
      onPointerDown={e => e.stopPropagation()}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'apple' ? null : 'apple')}
            className="h-9 flex items-center opacity-90 hover:opacity-100 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </button>
          <MenuDropdown open={openMenu === 'apple'} align="left">
            <MenuButton onClick={() => openApp('finder')}>Projects</MenuButton>
            <MenuButton onClick={() => openApp('resume')}>Resume</MenuButton>
            <MenuButton onClick={() => openApp('contact')}>Contact</MenuButton>
          </MenuDropdown>
        </div>

        <span className="text-[15px] font-semibold opacity-90 cursor-default">Pruthvi's Portfolio</span>
        <button onClick={() => openApp('finder')} className="relative group text-[14px] opacity-80 transition-opacity">
          Projects
          <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
        </button>
        <button onClick={() => openApp('resume')} className="relative group text-[14px] opacity-80 transition-opacity">
          Resume
          <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
        </button>
        <button onClick={() => openApp('contact')} className="relative group text-[14px] opacity-80 transition-opacity">
          Contact
          <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-md flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/18 transition-all">
          <Wifi size={14} />
        </button>
        <button className="w-8 h-8 rounded-md flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/18 transition-all">
          <Search size={14} />
        </button>
        <button className="w-8 h-8 rounded-md flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/18 transition-all">
          <User size={14} />
        </button>
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'theme' ? null : 'theme')}
            className={`w-8 h-8 rounded-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all ${
              openMenu === 'theme' ? 'bg-white/22' : 'hover:bg-white/18'
            }`}
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <MenuDropdown open={openMenu === 'theme'} align="right">
            {themeItems.map(({ mode: itemMode, label, Icon }) => (
              <MenuButton key={itemMode} onClick={() => setMode(itemMode)}>
                <span className="flex items-center gap-2">
                  <Icon size={13} />
                  {label}
                </span>
                {mode === itemMode && <Check size={13} />}
              </MenuButton>
            ))}
          </MenuDropdown>
        </div>
        <span className="text-[14px] opacity-80 font-medium tabular-nums">
          {formatDate(time)} {formatTime(time)}
        </span>
      </div>
    </div>
  )
}

function MenuDropdown({ open, align, children }: { open: boolean; align: 'left' | 'right'; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.96, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -5, scale: 0.97, filter: 'blur(4px)' }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute top-11 ${align === 'right' ? 'right-0' : 'left-0'} min-w-44 rounded-lg border border-white/15 bg-[rgba(38,38,40,0.78)] p-1.5 text-white shadow-2xl backdrop-blur-2xl`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MenuButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[12px] text-white/88 hover:bg-blue-500/70 transition-colors"
    >
      {children}
    </button>
  )
}
