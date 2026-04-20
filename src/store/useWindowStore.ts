import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppType = 'finder' | 'safari' | 'terminal' | 'resume' | 'gallery' | 'contact' | 'image'

export interface WindowState {
  id: string
  type: AppType
  title: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  minimized: boolean
  maximized: boolean
}

interface WindowStore {
  windows: WindowState[]
  activeWindowId: string | null
  zIndexCounter: number
  safariUrl: string
  finderProjectId: string
  imageUrl: string | null
  imageTitle: string | null
  openWindow: (type: AppType) => void
  openFinderProject: (projectId: string) => void
  openSafariWithUrl: (url: string) => void
  openImageWithUrl: (url: string, title?: string) => void
  setSafariUrl: (url: string) => void
  setImageUrl: (url: string | null, title?: string) => void
  setFinderProjectId: (projectId: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  updatePosition: (id: string, position: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
}

const APP_DEFAULTS: Record<AppType, { title: string; size: { width: number; height: number } }> = {
  finder: { title: 'Finder', size: { width: 600, height: 420 } },
  safari: { title: 'Safari', size: { width: 680, height: 520 } },
  terminal: { title: 'Terminal', size: { width: 560, height: 400 } },
  resume: { title: 'Resume.pdf', size: { width: 720, height: 650 } },
  gallery: { title: 'Photos', size: { width: 640, height: 460 } },
  contact: { title: 'Contact Me', size: { width: 520, height: 380 } },
  image: { title: 'Image Viewer', size: { width: 720, height: 600 } },
}

function getInitialPosition(index: number): { x: number; y: number } {
  const offset = index * 30
  return {
    x: Math.max(60, window.innerWidth / 2 - 300 + offset),
    y: Math.max(40, window.innerHeight / 2 - 250 + offset),
  }
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      activeWindowId: null,
      zIndexCounter: 10,
      safariUrl: "pruthvi's_portfolio.com",
      finderProjectId: 'nike-ecommerce',
      imageUrl: null,
      imageTitle: null,

      openWindow: (type: AppType) => {
        const existing = get().windows.find(w => w.type === type)
        if (existing) {
          // Restore and focus if already open
          set(state => ({
            windows: state.windows.map(w =>
              w.id === existing.id ? { ...w, minimized: false } : w
            ),
            activeWindowId: existing.id,
            zIndexCounter: state.zIndexCounter + 1,
          }))
          get().focusWindow(existing.id)
          return
        }

        const id = `${type}-${Date.now()}`
        const zIndex = get().zIndexCounter + 1
        const defaults = APP_DEFAULTS[type]
        const position = getInitialPosition(get().windows.length)

        set(state => ({
          windows: [
            ...state.windows,
            {
              id,
              type,
              title: defaults.title,
              position,
              size: defaults.size,
              zIndex,
              minimized: false,
              maximized: false,
            },
          ],
          activeWindowId: id,
          zIndexCounter: zIndex,
        }))
      },

      openFinderProject: (projectId: string) => {
        set({ finderProjectId: projectId })
        get().openWindow('finder')
      },

      openImageWithUrl: (url: string, title = 'Image') => {
        set({ imageUrl: url, imageTitle: title })
        get().openWindow('image')
      },

      openSafariWithUrl: (url: string) => {
        set({ safariUrl: url })
        get().openWindow('safari')
      },

      setSafariUrl: (url: string) => {
        set({ safariUrl: url })
      },

      setImageUrl: (url: string | null, title = '') => {
        set({ imageUrl: url, imageTitle: title })
      },

      setFinderProjectId: (projectId: string) => {
        set({ finderProjectId: projectId })
      },

      closeWindow: (id: string) => {
        set(state => {
          const remaining = state.windows.filter(w => w.id !== id)
          return {
            windows: remaining,
            activeWindowId: remaining.length > 0 ? remaining[remaining.length - 1].id : null,
          }
        })
      },

      focusWindow: (id: string) => {
        const zIndex = get().zIndexCounter + 1
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, zIndex } : w
          ),
          activeWindowId: id,
          zIndexCounter: zIndex,
        }))
      },

      minimizeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, minimized: true } : w
          ),
          activeWindowId: null,
        }))
      },

      restoreWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, minimized: false } : w
          ),
          activeWindowId: id,
        }))
        get().focusWindow(id)
      },

      maximizeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id
              ? w.maximized
                ? { ...w, maximized: false }
                : {
                    ...w,
                    maximized: true,
                    position: { x: 0, y: 44 },
                    size: { width: window.innerWidth, height: window.innerHeight - 44 },
                  }
              : w
          ),
        }))
      },

      updatePosition: (id: string, position: { x: number; y: number }) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, position } : w
          ),
        }))
      },

      updateSize: (id: string, size: { width: number; height: number }) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, size } : w
          ),
        }))
      },
    }),
    {
      name: 'macos-portfolio-windows',
      partialize: (state) => ({
        windows: state.windows,
        zIndexCounter: state.zIndexCounter,
        finderProjectId: state.finderProjectId,
        imageUrl: state.imageUrl,
        imageTitle: state.imageTitle,
      }),
    }
  )
)
