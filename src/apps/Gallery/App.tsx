import { motion } from 'framer-motion'
import { Heart, Image as ImageIcon, Images, MapPin, Users } from 'lucide-react'
import { galleryImages } from '../../data/projects'

type SidebarSection = 'Library' | 'Memories' | 'Places' | 'People' | 'Favorites'

const SIDEBAR_ITEMS: { label: SidebarSection; Icon: React.ElementType }[] = [
  { label: 'Library', Icon: Images },
  { label: 'Memories', Icon: ImageIcon },
  { label: 'Places', Icon: MapPin },
  { label: 'People', Icon: Users },
  { label: 'Favorites', Icon: Heart },
]

const TILE_CLASSES = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
]

export function GalleryApp() {
  return (
    <div className="flex h-full bg-[#282929] text-white">
      <aside className="w-48 flex-shrink-0 bg-[#2d2e2e] border-r border-black/20 px-5 py-5">
        <p className="text-white/28 text-[12px] font-semibold mb-4">Photos</p>
        <nav className="space-y-2">
          {SIDEBAR_ITEMS.map(({ label, Icon }, index) => {
            const active = index === 0

            return (
              <button
                key={label}
                className={`w-full h-9 flex items-center gap-3 rounded-md px-3 text-[14px] transition-colors ${
                  active ? 'bg-white/13 text-white' : 'text-white hover:bg-white/7'
                }`}
                data-no-drag
              >
                <Icon size={16} className="text-[#0a84ff]" />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 bg-[#202121] px-5 py-5 overflow-y-auto" data-no-drag>
        <div className="grid grid-cols-3 auto-rows-[125px] gap-3">
          {galleryImages.map((img, index) => (
            <motion.button
              key={img.id}
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.992 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className={`${TILE_CLASSES[index] ?? 'col-span-1 row-span-1'} overflow-hidden rounded-lg bg-white/5`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading={index > 3 ? 'lazy' : 'eager'}
                draggable={false}
              />
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  )
}
