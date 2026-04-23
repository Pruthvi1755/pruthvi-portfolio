import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWindowStore, type AppType } from '../store/useWindowStore'
import { useThemeStore } from '../store/useThemeStore'
import finderDark from '@/assets/finder_dark.png'
import finderLight from '@/assets/finder_light.png'
import safariDark from '@/assets/safari_dark.png'
import safariLight from '@/assets/safari_light.png'
import photosDark from '@/assets/photos_dark.png'
import photosLight from '@/assets/photos_light.png'
import contactDark from '@/assets/contact_dark.png'
import contactLight from '@/assets/contact_light.png'
import terminalDark from '@/assets/terminal_dark.png'
import terminalLight from '@/assets/terminal_light.png'
import trashDark from '@/assets/trash_dark.png'
import trashLight from '@/assets/trash_light.png'

interface DockItem {
  id: AppType | 'trash'
  label: string
  disabled?: boolean
  darkIcon: string
  lightIcon: string
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'finder', label: 'Finder', darkIcon: finderDark, lightIcon: finderLight },
  { id: 'safari', label: 'Safari', darkIcon: safariDark, lightIcon: safariLight },
  { id: 'gallery', label: 'Photos', darkIcon: photosDark, lightIcon: photosLight },
  { id: 'contact', label: 'Contact', darkIcon: contactDark, lightIcon: contactLight },
  { id: 'terminal', label: 'Terminal', darkIcon: terminalDark, lightIcon: terminalLight },
  { id: 'trash', label: 'Trash', disabled: true, darkIcon: trashDark, lightIcon: trashLight },
]

function DockIcon({ item, isOpen }: { item: DockItem; isOpen: boolean }) {
  const { openWindow, setIconPosition } = useWindowStore()
  const theme = useThemeStore(s => s.resolvedTheme)
  const ref = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (ref.current && item.id !== 'trash') {
      const rect = ref.current.getBoundingClientRect()
      setIconPosition(item.id as AppType, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      })
    }
  }, [setIconPosition, item.id])

  const handleClick = () => {
    if (item.disabled) return
    openWindow(item.id as AppType)
  }

  return (
    <div className="flex flex-col items-center relative">
      <motion.button
        ref={ref}
        onClick={handleClick}
        whileHover={{ scale: 1.5, y: -10 }}
        whileTap={{ scale: 0.9, y: -2 }}
        transition={{ type: 'spring', stiffness: 520, damping: 24, mass: 0.55 }}
        className={`w-14 h-14 rounded-[12px] flex items-center justify-center relative ${
          item.disabled ? 'opacity-60 cursor-default' : 'cursor-pointer'
        }`}
      >
        <img
          src={theme === 'dark' ? item.darkIcon : item.lightIcon}
          alt={item.label}
          className="w-14 h-14 object-contain rounded-[12px] drop-shadow-lg"
          draggable={false}
        />
      </motion.button>

      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.4 }}
        className="w-1 h-1 rounded-full bg-white/80 mt-0.5"
      />
    </div>
  )
}

export function Dock() {
  const { windows } = useWindowStore()
  const theme = useThemeStore(s => s.resolvedTheme)
  const openTypes = new Set(windows.map(w => w.type))
  const isDark = theme === 'dark'

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9998]">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
        className="flex items-end gap-6 px-5 py-3 rounded-2xl"
        style={{
          background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.58)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.75)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 10px 32px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {DOCK_ITEMS.map(item => (
          <DockIcon
            key={item.id}
            item={item}
            isOpen={item.id !== 'trash' && openTypes.has(item.id as AppType)}
          />
        ))}
      </motion.div>
    </div>
  )
}
