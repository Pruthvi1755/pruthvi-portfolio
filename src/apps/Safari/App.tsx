import { useEffect, useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, Copy, Plus, RotateCcw, Share } from 'lucide-react'

import { useWindowStore } from '../../store/useWindowStore'
import { SafariContent } from './SafariContent'

export function SafariApp() {
  const { safariUrl, setSafariUrl } = useWindowStore()
  const [inputVal, setInputVal] = useState(safariUrl)

  useEffect(() => {
    setInputVal(safariUrl)
  }, [safariUrl])

  const navigate = (value: string) => {
    const nextUrl = value.includes('.') && !value.startsWith('http') ? `https://${value}` : value
    setSafariUrl(value)
    if (nextUrl.startsWith('http')) window.open(nextUrl, '_blank')
  }

  const [reloadKey, setReloadKey] = useState(0)

  const handleNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') navigate(inputVal)
  }

  const handleReload = () => {
    setReloadKey(prev => prev + 1)
  }

  return (
    <div className="flex flex-col h-full bg-[#1a1a1c]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/8 bg-[#242426]">
        <button className="text-white/45 hover:text-white/75 transition-colors p-1">
          <BookOpen size={14} />
        </button>
        <button className="text-white/30 p-1 cursor-not-allowed">
          <ChevronLeft size={16} />
        </button>
        <button className="text-white/30 p-1 cursor-not-allowed">
          <ChevronRight size={16} />
        </button>

        <div className="flex-1 flex items-center gap-2 bg-white/8 rounded-lg px-3 py-1.5 border border-white/8">
          <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleNavigate}
            className="flex-1 bg-transparent text-white/84 text-[12px] text-center outline-none placeholder:text-white/30"
            placeholder="Search or enter website name"
            data-no-drag
          />
        </div>

        <button className="text-white/45 hover:text-white/75 p-1 transition-colors">
          <Share size={14} />
        </button>
        <button className="text-white/45 hover:text-white/75 p-1 transition-colors">
          <Plus size={14} />
        </button>
        <button className="text-white/45 hover:text-white/75 p-1 transition-colors">
          <Copy size={14} />
        </button>
        <button onClick={handleReload} className="text-white/45 hover:text-white/75 p-1 transition-colors">
          <RotateCcw size={13} />
        </button>
      </div>

      <SafariContent key={reloadKey} />
    </div>
  )
}
