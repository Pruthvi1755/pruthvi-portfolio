import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Image as ImageIcon, Images, MapPin, Search, Users, X, ZoomIn } from 'lucide-react'
import { galleryImages } from '../../data/projects'

type SidebarSection = 'Library' | 'Memories' | 'Places' | 'People' | 'Favorites'

const SIDEBAR_ITEMS: { label: SidebarSection; Icon: React.ElementType }[] = [
  { label: 'Library', Icon: Images },
  { label: 'Memories', Icon: ImageIcon },
  { label: 'Places', Icon: MapPin },
  { label: 'People', Icon: Users },
  { label: 'Favorites', Icon: Heart },
]

export function GalleryApp() {
  const [selectedSection, setSelectedSection] = useState<SidebarSection>('Library')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedImage = galleryImages.find(img => img.id === selectedId)

  return (
    <div className="flex h-full bg-[#1c1c1e] text-white selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-black/20 backdrop-blur-3xl border-r border-white/5 flex flex-col py-6 px-4">
        <div className="px-3 mb-6">
          <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Photos</span>
        </div>

        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map(({ label, Icon }) => {
            const isActive = selectedSection === label
            return (
              <button
                key={label}
                onClick={() => setSelectedSection(label)}
                className={`w-full group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive ? 'bg-blue-600/90 text-white shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                data-no-drag
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-blue-500 group-hover:text-blue-400'} />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto px-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/40">
            <p className="font-semibold text-white/60 mb-1">iCloud Storage</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-indigo-500" />
            </div>
            <span>75.2 GB of 100 GB used</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative" data-no-drag>
        {/* Header */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 bg-[#1c1c1e]/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{selectedSection}</h1>
            <p className="text-[11px] text-white/40 font-medium">Updated just now</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-[12px] outline-none focus:bg-white/10 focus:border-white/20 transition-all w-48"
              />
            </div>
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
              <button className="px-3 py-1 text-[11px] font-semibold bg-white/10 rounded-full shadow-sm">Years</button>
              <button className="px-3 py-1 text-[11px] font-semibold text-white/40 hover:text-white transition-colors">Months</button>
              <button className="px-3 py-1 text-[11px] font-semibold text-white/40 hover:text-white transition-colors">Days</button>
              <button className="px-3 py-1 text-[11px] font-semibold text-white/40 hover:text-white transition-colors">All</button>
            </div>
          </div>
        </header>

        {/* Scrollable Gallery */}
        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4">
          <div className="grid grid-cols-12 gap-4 auto-rows-[140px]">
            {galleryImages.map((img, i) => {
              // Custom grid classes for mosaic effect
              const gridClasses = [
                'col-span-8 row-span-3', // Featured large
                'col-span-4 row-span-3', // Tall right
                'col-span-4 row-span-2', // Small bottom left
                'col-span-8 row-span-2', // Wide bottom right
              ][i % 4]

              return (
                <motion.div
                  key={img.id}
                  layoutId={`img-${img.id}`}
                  onClick={() => setSelectedId(img.id)}
                  whileHover={{ scale: 0.985 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`${gridClasses} relative overflow-hidden rounded-2xl cursor-zoom-in group shadow-xl`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-[12px] font-medium text-white/90 truncate pr-4">{img.alt}</p>
                      <ZoomIn size={16} className="text-white/80" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[12px] text-white/20 font-medium">End of Library</p>
          </div>
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedId && selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-12"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all shadow-lg"
              >
                <X size={20} />
              </button>

              <motion.div
                layoutId={`img-${selectedId}`}
                className="w-full h-full flex flex-col items-center justify-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[85%] object-contain rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                />
                <div className="flex flex-col items-center gap-1">
                  <h2 className="text-lg font-bold text-white/90">{selectedImage.alt}</h2>
                  <p className="text-[12px] text-white/40 font-medium tracking-wide">Captured on iPhone 15 Pro • 48MP</p>
                </div>
                
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                      <Heart size={18} className="text-white/60 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] text-white/40 group-hover:text-white/80">Favorite</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                      <ImageIcon size={18} className="text-white/60 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] text-white/40 group-hover:text-white/80">Edit</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                      <X size={18} className="text-white/60 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] text-white/40 group-hover:text-white/80">Delete</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

