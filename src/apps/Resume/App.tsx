import { Download } from 'lucide-react'
import resumePdf from '@/assets/resume.pdf'

export function ResumeApp() {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = resumePdf
    a.download = 'Pruthvi_Resume.pdf'
    a.click()
  }

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-black">
        <span className="text-white/68 text-[12px]">Resume.pdf</span>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center w-8 h-8 text-white/55 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          title="Download PDF"
          data-no-drag
        >
          <Download size={15} />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden bg-black p-5" data-no-drag>
        <div className="h-full max-w-[720px] mx-auto overflow-hidden bg-white shadow-2xl">
          <iframe
            src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1`}
            title="Pruthvi Resume PDF"
            className="w-full h-full bg-white"
          />
        </div>
      </div>
    </div>
  )
}
