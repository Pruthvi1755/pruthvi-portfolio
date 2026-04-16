import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeStore {
  mode: ThemeMode
  resolvedTheme: ResolvedTheme
  setMode: (mode: ThemeMode) => void
  setResolvedTheme: (theme: ResolvedTheme) => void
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'system',
      resolvedTheme: getSystemTheme(),
      setMode: (mode) => set({ mode, resolvedTheme: mode === 'system' ? getSystemTheme() : mode }),
      setResolvedTheme: (theme) => set({ resolvedTheme: theme }),
    }),
    {
      name: 'macos-portfolio-theme',
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.setResolvedTheme(state.mode === 'system' ? getSystemTheme() : state.mode)
      },
    }
  )
)
