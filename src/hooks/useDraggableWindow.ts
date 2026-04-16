import { useRef, useCallback } from 'react'
import { useWindowStore } from '../store/useWindowStore'
import { clamp } from '../utils/helpers'

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  startPosX: number
  startPosY: number
}

export function useDraggableWindow(id: string, position: { x: number; y: number }) {
  const updatePosition = useWindowStore(s => s.updatePosition)
  const focusWindow = useWindowStore(s => s.focusWindow)
  const dragState = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startPosX: position.x,
    startPosY: position.y,
  })

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.current.isDragging) return
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    const newX = clamp(dragState.current.startPosX + dx, -200, window.innerWidth - 100)
    const newY = clamp(dragState.current.startPosY + dy, 44, window.innerHeight - 50)
    updatePosition(id, { x: newX, y: newY })
  }, [id, updatePosition])

  const onMouseUp = useCallback(() => {
    dragState.current.isDragging = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [onMouseMove])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    e.preventDefault()
    focusWindow(id)
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [id, position.x, position.y, focusWindow, onMouseMove, onMouseUp])

  // Touch support
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return
    focusWindow(id)
    const touch = e.touches[0]
    dragState.current = {
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }

    const onTouchMove = (te: TouchEvent) => {
      if (!dragState.current.isDragging) return
      const t = te.touches[0]
      const dx = t.clientX - dragState.current.startX
      const dy = t.clientY - dragState.current.startY
      const newX = clamp(dragState.current.startPosX + dx, 0, window.innerWidth - 100)
      const newY = clamp(dragState.current.startPosY + dy, 44, window.innerHeight - 50)
      updatePosition(id, { x: newX, y: newY })
    }

    const onTouchEnd = () => {
      dragState.current.isDragging = false
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }

    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)
  }, [id, position.x, position.y, focusWindow, updatePosition])

  return { onMouseDown, onTouchStart }
}
