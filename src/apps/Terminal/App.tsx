import { useState, useRef, useEffect } from 'react'
import { techStack, projects } from '../../data/projects'

interface TerminalLine {
  type: 'input' | 'output' | 'header' | 'row' | 'success' | 'blank'
  content: string
  color?: string
}

const INITIAL_LINES: TerminalLine[] = [
  { type: 'header', content: "Pruthvi's Portfolio Terminal v1.0.0" },
  { type: 'blank', content: '' },
  { type: 'output', content: 'Type "show tech stack" to see my skills.' },
  { type: 'output', content: 'Type "help" for all commands.' },
  { type: 'blank', content: '' },
]

const COMMANDS: Record<string, () => TerminalLine[]> = {
  'show tech stack': () => [
    { type: 'blank', content: '' },
    { type: 'header', content: 'Tech Stack' },
    { type: 'blank', content: '' },
    { type: 'row', content: `${'Category'.padEnd(14)}Technologies`, color: '#ffffff' },
    { type: 'blank', content: '' },
    ...techStack.map(s => ({
      type: 'row' as const,
      content: `ok  ${s.category.padEnd(12)}${s.techs}`,
      color: s.category === 'Languages' ? '#4ade80'
        : s.category === 'Data & ML' ? '#60a5fa'
        : s.category === 'Backend' ? '#fb923c'
        : s.category === 'Database' ? '#a78bfa'
        : s.category === 'Frontend' ? '#f472b6'
        : '#34d399',
    })),
    { type: 'blank', content: '' },
    { type: 'success', content: `ok  ${techStack.length} of ${techStack.length} stacks loaded successfully (100%)` },
    { type: 'output', content: 'Render time: 6ms' },
    { type: 'blank', content: '' },
  ],
  'help': () => [
    { type: 'blank', content: '' },
    { type: 'output', content: 'Available commands:' },
    { type: 'row', content: '  show tech stack    - Display full tech stack', color: '#60a5fa' },
    { type: 'row', content: '  whoami             - About me', color: '#60a5fa' },
    { type: 'row', content: '  projects           - List all projects', color: '#60a5fa' },
    { type: 'row', content: '  clear              - Clear terminal', color: '#60a5fa' },
    { type: 'blank', content: '' },
  ],
  'whoami': () => [
    { type: 'blank', content: '' },
    { type: 'output', content: 'Pruthvi T S - Computer Science Engineering Student' },
    { type: 'output', content: 'Focus: AI/ML, Data Science, and full-stack data applications' },
    { type: 'output', content: 'Speciality: Python, FastAPI, React, ML pipelines, fraud detection' },
    { type: 'output', content: 'Currently: Building data-driven systems and AI products' },
    { type: 'blank', content: '' },
  ],
  'projects': () => [
    { type: 'blank', content: '' },
    ...projects.map(project => ({ type: 'output' as const, content: project.name })),
    { type: 'blank', content: '' },
  ],
}

export function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const inputLine: TerminalLine = {
      type: 'input',
      content: `@pruthvi % ${cmd}`,
    }

    if (trimmed === 'clear') {
      setLines(INITIAL_LINES)
      setInput('')
      return
    }

    const handler = COMMANDS[trimmed]
    const output = handler
      ? handler()
      : [
          { type: 'output' as const, content: `Command not found: ${cmd}. Type "help" for available commands.`, color: '#ef4444' },
          { type: 'blank' as const, content: '' },
        ]

    setLines(prev => [...prev, inputLine, ...output])
    setHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(newIdx)
      setInput(history[newIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIdx)
      setInput(newIdx === -1 ? '' : history[newIdx])
    }
  }

  function lineColor(line: TerminalLine): string {
    if (line.color) return line.color
    switch (line.type) {
      case 'header': return '#ffffff'
      case 'input': return '#d1d5db'
      case 'success': return '#4ade80'
      default: return '#9ca3af'
    }
  }

  return (
    <div
      className="flex flex-col h-full font-mono text-[12px]"
      style={{ background: '#1a1a1c' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto px-4 py-3" data-no-drag>
        {lines.map((line, i) => (
          <div
            key={i}
            className={`leading-5 ${line.type === 'blank' ? 'h-2' : ''}`}
            style={{ color: lineColor(line) }}
          >
            {line.type === 'header' ? (
              <span className="font-bold">{line.content}</span>
            ) : line.type === 'row' ? (
              <span style={{ color: line.color ?? '#9ca3af' }}>{line.content}</span>
            ) : (
              line.content
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-t border-white/5">
        <span className="text-green-400 select-none">@pruthvi %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none caret-green-400"
          placeholder="Type a command..."
          autoFocus
          data-no-drag
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
