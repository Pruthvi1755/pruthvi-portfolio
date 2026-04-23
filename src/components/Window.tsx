import { useRef, useCallback, useMemo, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useWindowStore, type WindowState } from '../store/useWindowStore'
import { useDraggableWindow } from '../hooks/useDraggableWindow'
import { clamp } from '../utils/helpers'

interface WindowProps {
  window: WindowState
  children: ReactNode
}

export function Window({ window: win, children }: WindowProps) {
  const { 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow, 
    updateSize, 
    activeWindowId,
    iconPositions 
  } = useWindowStore()
  const { onMouseDown, onTouchStart } = useDraggableWindow(win.id, win.position)
  const resizeState = useRef({ isResizing: false, startX: 0, startY: 0, startW: 0, startH: 0 })

  const isActive = activeWindowId === win.id
  const iconPos = iconPositions[win.type] ?? { x: window.innerWidth / 2, y: window.innerHeight }

  // Calculate the relative vector to the dock icon
  const relativeTarget = useMemo(() => ({
    x: iconPos.x - (win.position.x + win.size.width / 2),
    y: iconPos.y - (win.position.y + win.size.height / 2)
  }), [iconPos, win.position, win.size])

  const genieVariants = {
    initial: {
      opacity: 0,
      scale: 0.2,
      x: relativeTarget.x,
      y: relativeTarget.y,
      filter: 'blur(20px)',
    },
    open: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 450,
        damping: 38,
        mass: 0.9,
      }
    },
    minimized: {
      opacity: 0,
      scale: 0.02,
      x: relativeTarget.x,
      y: relativeTarget.y,
      filter: 'blur(10px)',
      transition: {
        duration: 0.65,
        ease: [0.32, 0, 0.67, 0], // Cubic-in for sucking effect
      }
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 24,
      filter: 'blur(15px)',
      transition: {
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizeState.current = {
      isResizing: true,
      startX: e.clientX,
      startY: e.clientY,
      startW: win.size.width,
      startH: win.size.height,
    }
    document.body.style.cursor = 'se-resize'
    document.body.style.userSelect = 'none'

    const onMove = (me: MouseEvent) => {
      if (!resizeState.current.isResizing) return
      const newW = clamp(resizeState.current.startW + me.clientX - resizeState.current.startX, 320, window.innerWidth - win.position.x)
      const newH = clamp(resizeState.current.startH + me.clientY - resizeState.current.startY, 200, window.innerHeight - win.position.y)
      updateSize(win.id, { width: newW, height: newH })
    }
    const onUp = () => {
      resizeState.current.isResizing = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [win.id, win.size, win.position.x, win.position.y, updateSize])

  return (
    <motion.div
      key={win.id}
      variants={genieVariants}
      initial="initial"
      animate={win.minimized ? 'minimized' : 'open'}
      exit="exit"
      style={{
        position: 'fixed',
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
        pointerEvents: win.minimized ? 'none' : 'auto',
        transformOrigin: 'center center',
        boxShadow: isActive
          ? '0 34px 70px rgba(0,0,0,0.62), 0 0 0 1px rgba(255,255,255,0.09)'
          : '0 22px 54px rgba(0,0,0,0.46), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
      className="rounded-xl overflow-hidden flex flex-col will-change-transform"
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Window chrome */}
      <div
        className={`flex items-center gap-2 px-3 py-2.5 cursor-grab active:cursor-grabbing select-none flex-shrink-0 ${
          isActive
            ? 'bg-[#2d2d30]'
            : 'bg-[#222224]'
        }`}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5" data-no-drag>
          <button
            onClick={() => closeWindow(win.id)}
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all flex items-center justify-center group"
            title="Close"
          >
            <span className="hidden group-hover:block text-[7px] text-[#8b0000] font-bold leading-none">✕</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id) }}
            className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-110 transition-all flex items-center justify-center group"
            title="Minimize"
          >
            <span className="hidden group-hover:block text-[7px] text-[#7a4f00] font-bold leading-none">−</span>
          </button>
          <button
            onClick={() => maximizeWindow(win.id)}
            className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 transition-all flex items-center justify-center group"
            title="Maximize"
          >
            <span className="hidden group-hover:block text-[7px] text-[#003d00] font-bold leading-none">+</span>
          </button>
        </div>

        {/* Title */}
        <span className="flex-1 text-center text-[13px] font-medium text-[rgba(235,235,245,0.6)] pointer-events-none">
          {win.title}
        </span>

        {/* Spacer for symmetry */}
        <div className="w-14" />
      </div>

      {/* Window content */}
      <div className="flex-1 overflow-hidden" style={{ background: 'rgba(28,28,30,0.95)' }}>
        {children}
      </div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
          onMouseDown={handleResizeMouseDown}
        >
          <svg viewBox="0 0 16 16" className="w-full h-full opacity-20 hover:opacity-50 transition-opacity">
            <path d="M12 12L6 12M12 12L12 6M12 12L8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
