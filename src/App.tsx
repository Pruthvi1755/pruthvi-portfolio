import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Loader } from './components/Loader'
import { MenuBar } from './components/MenuBar'
import { Desktop } from './components/Desktop'
import { Dock } from './components/Dock'
import { Window } from './components/Window'
import { useWindowStore } from './store/useWindowStore'
import { useThemeStore } from './store/useThemeStore'
import type { AppType } from './store/useWindowStore'

// Lazy load app components
const FinderApp = lazy(() => import('./apps/Finder/App').then(m => ({ default: m.FinderApp })))
const SafariApp = lazy(() => import('./apps/Safari/App').then(m => ({ default: m.SafariApp })))
const TerminalApp = lazy(() => import('./apps/Terminal/App').then(m => ({ default: m.TerminalApp })))
const ResumeApp = lazy(() => import('./apps/Resume/App').then(m => ({ default: m.ResumeApp })))
const GalleryApp = lazy(() => import('./apps/Gallery/App').then(m => ({ default: m.GalleryApp })))
const ContactApp = lazy(() => import('./apps/Contact/App').then(m => ({ default: m.ContactApp })))
const ImageViewerApp = lazy(() => import('./apps/ImageViewer/App').then(m => ({ default: m.ImageViewerApp })))

function AppContent({ type }: { type: AppType }) {
  switch (type) {
    case 'finder': return <FinderApp />
    case 'safari': return <SafariApp />
    case 'terminal': return <TerminalApp />
    case 'resume': return <ResumeApp />
    case 'gallery': return <GalleryApp />
    case 'contact': return <ContactApp />
    case 'image': return <ImageViewerApp />
    default: return null
  }
}

function AppLoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { windows } = useWindowStore()
  const { mode, resolvedTheme, setResolvedTheme } = useThemeStore()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const syncTheme = () => setResolvedTheme(mode === 'system' ? (media.matches ? 'dark' : 'light') : mode)

    syncTheme()
    media.addEventListener('change', syncTheme)
    return () => media.removeEventListener('change', syncTheme)
  }, [mode, setResolvedTheme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.dataset.theme = resolvedTheme
  }, [resolvedTheme])

  if (!loaded) {
    return <Loader onComplete={() => setLoaded(true)} />
  }

  return (
    <div className={resolvedTheme === 'dark' ? 'dark' : ''} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Desktop />

      <MenuBar />

      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} window={win}>
            <Suspense fallback={<AppLoadingFallback />}>
              <AppContent type={win.type} />
            </Suspense>
          </Window>
        ))}
      </AnimatePresence>

      <Dock />
    </div>
  )
}
