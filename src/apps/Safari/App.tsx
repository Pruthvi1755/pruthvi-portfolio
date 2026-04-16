import { useEffect, useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, Copy, Plus, RotateCcw, Share } from 'lucide-react'
import { blogPosts } from '../../data/projects'
import { useWindowStore } from '../../store/useWindowStore'

export function SafariApp() {
  const { safariUrl, setSafariUrl } = useWindowStore()
  const [url, setUrl] = useState(safariUrl)
  const [inputVal, setInputVal] = useState(safariUrl)

  useEffect(() => {
    setUrl(safariUrl)
    setInputVal(safariUrl)
  }, [safariUrl])

  const navigate = (value: string) => {
    const nextUrl = value.includes('.') && !value.startsWith('http') ? `https://${value}` : value
    setUrl(value)
    setSafariUrl(value)
    if (nextUrl.startsWith('http')) window.open(nextUrl, '_blank')
  }

  const handleNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') navigate(inputVal)
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
        <button onClick={() => navigate(inputVal)} className="text-white/45 hover:text-white/75 p-1 transition-colors">
          <RotateCcw size={13} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6" data-no-drag>
        <h1 className="text-[#ff3b6b] text-xl font-bold mb-5">Pruthvi's Notes</h1>

        <div>
          {blogPosts.map((post, i) => (
            <div key={post.id}>
              <div className="flex gap-4 py-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <p className="text-white/42 text-[11px] mb-1">{post.date}</p>
                  <h3 className="text-white text-[13px] font-semibold leading-snug mb-2">{post.title}</h3>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[11px] hover:underline flex items-center gap-1">
                    Check out the full post -&gt;
                  </a>
                </div>
              </div>
              {i < blogPosts.length - 1 && <div className="border-b border-white/6" />}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl border border-white/8 bg-white/4">
          <h2 className="text-white/82 text-sm font-semibold mb-2">About the Author</h2>
          <p className="text-white/45 text-[11px] leading-relaxed">
            Computer Science Engineering student focused on AI/ML, data science, and building full-stack systems that turn data into useful products.
            Exploring machine learning pipelines, fraud detection, analytics dashboards, and practical backend APIs.
          </p>
        </div>

        <p className="text-white/25 text-[10px] text-center mt-4">{url}</p>
      </div>
    </div>
  )
}
