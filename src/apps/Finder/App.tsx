import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Folder, Search, Trash, X } from 'lucide-react'
import safariIcon from '@/assets/safari_light.png'
import folderIcon from '@/assets/Folder.png'
import imageFileIcon from '@/assets/finder_image_file.png'
import defaultFileIcon from '@/assets/finder_default_file.png'
import textFileIcon from '@/assets/finder_text_file.png'
import { projects, aiAnalystScreenshots } from '../../data/projects'
import { aiDataAnalystReadme, phishGuardReadme } from '../../data/readme'
import { useWindowStore } from '../../store/useWindowStore'

type FileType = 'app' | 'txt' | 'png' | 'fig' | 'folder'

interface FileItem {
  name: string
  type: FileType
  icon: React.ReactNode
  url?: string
  projectId?: string
  content?: string
}

interface PreviewState {
  file: FileItem
  projectName: string
  description: string
  image: string
}

function FinderFileIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} draggable={false} className="w-full h-full object-contain" />
}

const FILE_ICONS: Record<FileType, React.ReactNode> = {
  app: <FinderFileIcon src={safariIcon} alt="Safari link" />,
  txt: <FinderFileIcon src={textFileIcon} alt="Text file" />,
  png: <FinderFileIcon src={imageFileIcon} alt="Image file" />,
  fig: <FinderFileIcon src={defaultFileIcon} alt="Default file" />,
  folder: <FinderFileIcon src={folderIcon} alt="Folder" />,
}

function getFilesForProject(projectId: string): FileItem[] {
  const map: Record<string, FileItem[]> = {
    'nike-ecommerce': [
      { name: 'ai-data-analyst.app', type: 'app', icon: FILE_ICONS.app, url: 'https://automated-ai-data-analyst-three.vercel.app/' },
      { name: 'Automated AI Data Analyst.txt', type: 'txt', icon: FILE_ICONS.txt },
      { name: 'ai-data-analyst.png', type: 'png', icon: FILE_ICONS.png, url: aiAnalystScreenshots[1] },
      { name: 'ai-data-analyst-screenshot-2.png', type: 'png', icon: FILE_ICONS.png, url: aiAnalystScreenshots[2] },
      { name: 'ai-data-analyst-screenshot-3.png', type: 'png', icon: FILE_ICONS.png, url: aiAnalystScreenshots[3] },
      { name: 'README.md', type: 'txt', icon: FILE_ICONS.txt, content: aiDataAnalystReadme },
    ],
    'phish-guard': [
      { name: 'phishguard.app', type: 'app', icon: FILE_ICONS.app, url: 'https://phishing-detector-two-nu.vercel.app/' },
      { name: 'PhishGuard System.txt', type: 'txt', icon: FILE_ICONS.txt },
      { name: 'phish-guard-preview.png', type: 'png', icon: FILE_ICONS.png },
      { name: 'README.md', type: 'txt', icon: FILE_ICONS.txt, content: phishGuardReadme },
    ],
    'food-delivery-app': [
      { name: 'portfolio-web.app', type: 'app', icon: FILE_ICONS.app },
      { name: 'Portfolio Web App.txt', type: 'txt', icon: FILE_ICONS.txt },
      { name: 'portfolio-web.png', type: 'png', icon: FILE_ICONS.png },
      { name: 'ui-design-1.png', type: 'png', icon: FILE_ICONS.png },
      { name: 'ui-design-2.png', type: 'png', icon: FILE_ICONS.png },
      { name: 'Interface.fig', type: 'fig', icon: FILE_ICONS.fig },
    ],
  }
  return map[projectId] ?? []
}

export function FinderApp() {
  const [activeSidebar, setActiveSidebar] = useState('Work')
  const [searchQuery, setSearchQuery] = useState('')
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const openWindow = useWindowStore(s => s.openWindow)
  const openImageWithUrl = useWindowStore(s => s.openImageWithUrl)
  const selectedProject = useWindowStore(s => s.finderProjectId)
  const setSelectedProject = useWindowStore(s => s.setFinderProjectId)

  const currentProject = projects.find(p => p.id === selectedProject) ?? projects[0]
  const files = getFilesForProject(selectedProject)
  
  const resumeFiles: FileItem[] = [
    { name: 'Fullstack Resume.pdf', type: 'txt', icon: <FileText size={32} className="text-white/80" /> },
    { name: 'AI/ML Resume.pdf', type: 'txt', icon: <FileText size={32} className="text-white/80" /> }
  ]
  const workFolders: FileItem[] = projects.map(p => ({
    name: p.name,
    type: 'folder',
    icon: FILE_ICONS.folder,
    projectId: p.id
  }))

  let visibleFiles = files
  if (activeSidebar === 'Resume') {
    visibleFiles = resumeFiles
  } else if (activeSidebar === 'Work') {
    visibleFiles = workFolders
  } else if (activeSidebar === 'Trash') {
    visibleFiles = []
  }

  const filteredFiles = visibleFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sidebarSections = [
    {
      title: 'Favorites',
      items: ['Work', 'Resume', 'Trash'],
      icons: [Folder, FileText, Trash],
    },
    {
      title: 'Work',
      items: projects.map(p => p.name.length > 15 ? `${p.name.slice(0, 14)}...` : p.name),
      icons: projects.map(() => Folder),
      projectIds: projects.map(p => p.id),
    },
  ]

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder' && file.projectId) {
      setSelectedProject(file.projectId)
      setActiveSidebar(file.projectId)
      return
    }

    if (activeSidebar === 'Resume') {
      openWindow('resume')
      return
    }

    if (file.type === 'app') {
      window.open(file.url ?? currentProject.url ?? `https://${file.name}`, '_blank')
      return
    }

    if (file.type === 'png') {
      openImageWithUrl(file.url ?? currentProject.image, file.name)
      return
    }

    setPreview({
      file,
      projectName: currentProject.name,
      description: currentProject.description,
      image: currentProject.image,
    })
  }

  return (
    <div className="flex h-full text-white">
      <div className="w-44 flex-shrink-0 flex flex-col py-3 gap-4 bg-[rgba(22,22,24,0.86)] border-r border-white/10 backdrop-blur-xl">
        {sidebarSections.map(section => (
          <div key={section.title}>
            <p className="px-3 text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-1">
              {section.title}
            </p>
            {section.items.map((item, i) => {
              const Icon = item === 'Trash' ? Trash : section.icons[i]
              const isProject = 'projectIds' in section
              const projId = isProject ? section.projectIds![i] : null
              const isActive = isProject ? activeSidebar === projId : activeSidebar === item

              return (
                <button
                  key={item}
                  onClick={() => {
                    if (isProject && projId) {
                      setSelectedProject(projId)
                      setActiveSidebar(projId)
                    } else {
                      setActiveSidebar(item)
                    }
                  }}
                  className={`w-[calc(100%-8px)] flex items-center gap-2 px-3 py-1.5 text-[12px] text-left transition-colors rounded-md mx-1 ${
                    isActive ? 'bg-blue-600/55 text-white' : 'text-white/62 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-blue-300' : 'text-white/42'} />
                  <span className="truncate">{item}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-[rgba(32,32,34,0.95)]">
        <div className="flex items-center justify-end px-3 py-2 border-b border-white/8">
          <div className="flex items-center gap-2 bg-white/10 rounded-md px-2 py-1">
            <Search size={11} className="text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="bg-transparent text-white text-[11px] outline-none w-28 placeholder:text-white/30"
              data-no-drag
            />
          </div>
        </div>

        {activeSidebar === 'Resume' ? (
          <div className="px-4 py-2 border-b border-white/8">
            <h3 className="text-white/84 text-[12px] font-medium">Resume</h3>
            <p className="text-white/44 text-[10px] mt-0.5">Dual profiles: AI/ML and Fullstack Development</p>
          </div>
        ) : activeSidebar === 'Work' ? (
          <div className="px-4 py-2 border-b border-white/8">
            <h3 className="text-white/84 text-[12px] font-medium">Work</h3>
            <p className="text-white/44 text-[10px] mt-0.5">Projects and case studies</p>
          </div>
        ) : activeSidebar === 'Trash' ? (
          <div className="px-4 py-2 border-b border-white/8">
            <h3 className="text-white/84 text-[12px] font-medium">Trash</h3>
            <p className="text-white/44 text-[10px] mt-0.5">No items</p>
          </div>
        ) : (
          <div className="px-4 py-2 border-b border-white/8">
            <h3 className="text-white/84 text-[12px] font-medium">{currentProject.name}</h3>
            <p className="text-white/44 text-[10px] mt-0.5">{currentProject.description}</p>
            <div className="flex gap-1 mt-1 flex-wrap">
              {currentProject.tech.map(t => (
                <span key={t} className="text-[9px] bg-blue-600/30 text-blue-300 px-1.5 py-0.5 rounded">{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4" data-no-drag>
          <div className="grid grid-cols-3 gap-4">
            {filteredFiles.map(file => (
              <motion.button
                key={file.name}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg group"
                data-no-drag
                onClick={() => handleFileClick(file)}
              >
                {activeSidebar === 'Resume' ? (
                  <div className="relative w-12 h-14 bg-white rounded-sm shadow-lg flex items-center justify-center">
                    <div className="absolute right-0 top-0 border-l-[10px] border-b-[10px] border-l-transparent border-b-gray-300" />
                    <FileText size={26} className="text-gray-500" />
                  </div>
                ) : (
                  <div className="w-14 h-14 flex items-center justify-center group-hover:drop-shadow-[0_0_14px_rgba(96,165,250,0.35)] transition-[filter]">
                    {file.icon}
                  </div>
                )}
                <span className="text-[10px] text-white/72 group-hover:text-white text-center break-all leading-tight max-w-[84px]">
                  {file.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {preview && <PreviewModal preview={preview} onClose={() => setPreview(null)} />}
      </AnimatePresence>
    </div>
  )
}

function PreviewModal({ preview, onClose }: { preview: PreviewState; onClose: () => void }) {
  const { file, projectName, description, image } = preview

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm"
      data-no-drag
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 18 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        onClick={e => e.stopPropagation()}
        className="w-[min(520px,86%)] max-h-[78%] overflow-hidden rounded-xl border border-white/12 bg-[rgba(30,30,32,0.96)] shadow-2xl"
      >
        <div className="h-10 flex items-center justify-between px-3 border-b border-white/8 bg-white/5">
          <span className="text-[12px] text-white/72">{file.name}</span>
          <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white">
            <X size={14} />
          </button>
        </div>

        {file.type === 'png' && (
          <div className="p-5 flex flex-col items-center gap-4">
            <img src={image} alt={projectName} className="max-h-72 w-full object-contain rounded-lg bg-white/5" />
            <p className="text-[12px] text-white/55">{projectName}</p>
          </div>
        )}

        {file.type === 'txt' && (
          <div className="p-5 font-mono text-[12px] leading-6 text-white/76 whitespace-pre-wrap overflow-y-auto max-h-[60vh]">
            {file.content ? file.content : `${projectName}\n\n${description}\n\nStack: ${projects.find(p => p.name === projectName)?.tech.join(', ') ?? 'React, TypeScript'}\n\nStatus: polished portfolio case study ready for review.`}
          </div>
        )}

        {file.type === 'fig' && (
          <div className="p-8 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-orange-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold">Fig</div>
            <h3 className="text-white text-sm font-semibold">Design Preview</h3>
            <p className="text-white/50 text-[12px] max-w-xs">Interactive Figma embeds are not connected in this local desktop, but the project design file is ready.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
