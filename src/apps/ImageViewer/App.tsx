import { useWindowStore } from '../../store/useWindowStore'

export function ImageViewerApp() {
  const imageUrl = useWindowStore(s => s.imageUrl)
  const imageTitle = useWindowStore(s => s.imageTitle)

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-full bg-black text-white/60 text-[13px]">
        No image selected.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-black">
        <span className="text-white/68 text-[12px] truncate">{imageTitle}</span>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden bg-black p-4" data-no-drag>
        <div className="h-full w-full rounded-xl bg-[#111827] p-4 flex items-center justify-center">
          <img src={imageUrl} alt={imageTitle ?? 'Image'} className="max-h-full max-w-full object-contain rounded-lg" />
        </div>
      </div>
    </div>
  )
}
