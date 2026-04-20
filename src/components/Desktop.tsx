import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion } from 'framer-motion'
import { useWindowStore } from '../store/useWindowStore'
import { useThemeStore } from '../store/useThemeStore'
import folderIcon from '@/assets/Folder.png'
import wallpaperDark from '@/assets/wallpaper_dark.png'
import wallpaperLight from '@/assets/wallpaper_light.png'

interface DesktopIcon {
  id: string
  label: string
  project: string
}

const DESKTOP_ICONS: DesktopIcon[] = [
  { id: 'nike', label: 'Automated AI\nData Analyst', project: 'nike-ecommerce' },
  { id: 'ai', label: 'ScamShield', project: 'ai-resume-analyzer' },
  { id: 'food', label: 'Portfolio Web App', project: 'food-delivery-app' },
]

type DesktopIconPositions = Record<string, { x: number; y: number }>

const DEFAULT_ICON_POSITIONS: DesktopIconPositions = {
  nike: { x: 48, y: 104 },
  ai: { x: 48, y: 254 },
  food: { x: 48, y: 384 },
}

function loadIconPositions(): DesktopIconPositions {
  if (typeof window === 'undefined') return DEFAULT_ICON_POSITIONS

  try {
    const stored = window.localStorage.getItem('macos-portfolio-desktop-icons')
    if (!stored) return DEFAULT_ICON_POSITIONS
    return { ...DEFAULT_ICON_POSITIONS, ...JSON.parse(stored) }
  } catch {
    return DEFAULT_ICON_POSITIONS
  }
}

function FolderIcon({
  icon,
  position,
  onSelect,
  onOpen,
  onMove,
}: {
  icon: DesktopIcon
  selected: boolean
  position: { x: number; y: number }
  onSelect: () => void
  onOpen: () => void
  onMove: (position: { x: number; y: number }) => void
}) {
  const dragStartRef = useRef({
    pointerX: 0,
    pointerY: 0,
    iconX: 0,
    iconY: 0,
  })
  const isPointerDownRef = useRef(false)
  const didDragRef = useRef(false)

  const handlePointerDown = (event: PointerEvent) => {
    event.stopPropagation()
    onSelect()
    isPointerDownRef.current = true
    didDragRef.current = false
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      iconX: position.x,
      iconY: position.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (!isPointerDownRef.current) return

    const dx = event.clientX - dragStartRef.current.pointerX
    const dy = event.clientY - dragStartRef.current.pointerY

    if (Math.hypot(dx, dy) > 4) {
      didDragRef.current = true
    }

    if (didDragRef.current) {
      onMove({
        x: dragStartRef.current.iconX + dx,
        y: dragStartRef.current.iconY + dy,
      })
    }
  }

  const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation()
    isPointerDownRef.current = false

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (!didDragRef.current) {
      onOpen()
    }
  }

  const handlePointerCancel = (event: PointerEvent) => {
    isPointerDownRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <motion.div
      initial={false}
      whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 16px rgba(116, 196, 255, 0.55))' }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 520, damping: 28 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      tabIndex={0}
      className="absolute left-0 top-0 flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing w-[120px] focus:outline-none touch-none group"
      style={{ left: position.x, top: position.y }}
    >
      <div className="relative w-16 h-14">
        <img src={folderIcon} alt="" className="w-full h-full object-contain drop-shadow-lg" draggable={false} />
      </div>
      <span
        className="text-white text-[14px] text-center leading-tight px-2 py-1 rounded-md max-w-[120px] line-clamp-2 whitespace-pre-line transition-colors group-hover:bg-blue-600/80"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
      >
        {icon.label}
      </span>
    </motion.div>
  )
}

export function Desktop() {
  const openFinderProject = useWindowStore(s => s.openFinderProject)
  const resolvedTheme = useThemeStore(s => s.resolvedTheme)
  const desktopRef = useRef<HTMLDivElement>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [iconPositions, setIconPositions] = useState<DesktopIconPositions>(loadIconPositions)
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    window.localStorage.setItem('macos-portfolio-desktop-icons', JSON.stringify(iconPositions))
  }, [iconPositions])

  const moveIcon = (id: string, nextPosition: { x: number; y: number }) => {
    const clampedPosition = {
      x: Math.max(0, Math.min(nextPosition.x, window.innerWidth - 140)),
      y: Math.max(52, Math.min(nextPosition.y, window.innerHeight - 170)),
    }

    setIconPositions(current => ({ ...current, [id]: clampedPosition }))
  }

  return (
    <div
      ref={desktopRef}
      onPointerDown={event => {
        if (event.target === event.currentTarget) setSelectedIcon(null)
      }}
      className="fixed inset-0 pt-11 transition-[background] duration-700"
      style={{
        backgroundImage: `url(${isDark ? wallpaperDark : wallpaperLight})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.03)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.12), transparent 26%, rgba(0,0,0,0.12))',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ marginTop: '28px', paddingBottom: '80px' }}
      >
        <motion.p 
          className={`${isDark ? 'text-white/58' : 'text-slate-900/55'} text-lg font-light mb-2 pointer-events-auto cursor-default`}
          initial={false}
          whileHover={{
            textShadow: isDark 
              ? '-2px 0 0 rgba(0,255,255,0.8), 2px 0 0 rgba(255,0,0,0.8)' 
              : '-1px 0 0 rgba(0,255,255,0.8), 1px 0 0 rgba(255,0,0,0.8)',
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          style={{ textShadow: isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 12px rgba(255,255,255,0.55)' }}
        >
          Hey, I'm Pruthvi! welcome to my
        </motion.p>
        <motion.h1
          className={`${isDark ? 'text-white' : 'text-slate-950'} font-thin pointer-events-auto cursor-default`}
          initial={false}
          whileHover={{
            textShadow: isDark 
              ? '-4px 0 0 rgba(0,255,255,0.9), 4px 0 0 rgba(255,0,255,0.9)'
              : '-2px 0 0 rgba(0,200,255,0.8), 2px 0 0 rgba(255,0,200,0.8)',
            letterSpacing: '0.02em',
            scale: 1.03,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          style={{
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
            fontStyle: 'italic',
            letterSpacing: '0',
            textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(255,255,255,0.5)',
            opacity: 0.9,
          }}
        >
          portfolio.
        </motion.h1>
      </motion.div>

      <div className="absolute inset-0">
        {DESKTOP_ICONS.map(icon => (
          <FolderIcon
            key={icon.id}
            icon={icon}
            selected={selectedIcon === icon.id}
            position={iconPositions[icon.id] ?? DEFAULT_ICON_POSITIONS[icon.id]}
            onSelect={() => setSelectedIcon(icon.id)}
            onOpen={() => openFinderProject(icon.project)}
            onMove={position => moveIcon(icon.id, position)}
          />
        ))}
      </div>
    </div>
  )
}
