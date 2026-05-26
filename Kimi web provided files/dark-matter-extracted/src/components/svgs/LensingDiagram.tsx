import { memo } from 'react'

interface LensingDiagramProps {
  className?: string
  style?: React.CSSProperties
}

const LensingDiagram = memo(function LensingDiagram({ className, style }: LensingDiagramProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="lens-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="cluster-mass" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(39, 61, 176, 0.5)" />
          <stop offset="100%" stopColor="rgba(39, 61, 176, 0.05)" />
        </radialGradient>
      </defs>

      {/* Distant galaxy (source) - top left */}
      <g>
        <ellipse cx="150" cy="150" rx="40" ry="20" fill="none" stroke="rgba(197, 203, 211, 0.2)" strokeWidth="1" transform="rotate(-30 150 150)" />
        <circle cx="150" cy="150" r="15" fill="rgba(232, 220, 200, 0.3)" />
        <text x="150" y="120" textAnchor="middle" fill="rgba(197, 203, 211, 0.5)" fontSize="12" fontFamily="'Space Mono', monospace">遙遠星系</text>
      </g>

      {/* Light rays from galaxy */}
      <g strokeDasharray="4 4" opacity="0.4">
        {/* Ray going above cluster */}
        <path d="M 165 140 Q 300 80 450 200" stroke="#C5CBD3" strokeWidth="1" fill="none" />
        {/* Ray going below cluster */}
        <path d="M 165 160 Q 300 320 450 200" stroke="#C5CBD3" strokeWidth="1" fill="none" />
        {/* Central ray bending */}
        <path d="M 160 150 Q 300 150 450 200" stroke="#C5CBD3" strokeWidth="1" fill="none" />
      </g>

      {/* Massive cluster (lens) - center */}
      <g>
        <circle cx="450" cy="200" r="80" fill="url(#cluster-mass)" />
        <circle cx="450" cy="200" r="50" fill="rgba(39, 61, 176, 0.15)" filter="url(#lens-glow)" />
        <circle cx="450" cy="200" r="8" fill="#273db0" />
        <text x="450" y="310" textAnchor="middle" fill="rgba(197, 203, 211, 0.5)" fontSize="12" fontFamily="'Space Mono', monospace">巨大質量團</text>
      </g>

      {/* Bent light rays after lens */}
      <g strokeDasharray="4 4" opacity="0.4">
        <path d="M 530 200 Q 600 180 700 250" stroke="#C5CBD3" strokeWidth="1" fill="none" />
        <path d="M 530 200 Q 600 220 700 150" stroke="#C5CBD3" strokeWidth="1" fill="none" />
        <path d="M 530 200 Q 600 200 700 200" stroke="#C5CBD3" strokeWidth="1" fill="none" />
      </g>

      {/* Einstein ring (result) - right side */}
      <g>
        <ellipse cx="700" cy="200" rx="50" ry="50" fill="none" stroke="rgba(232, 220, 200, 0.4)" strokeWidth="2" filter="url(#lens-glow)" />
        <ellipse cx="700" cy="200" rx="35" ry="45" fill="none" stroke="rgba(39, 61, 176, 0.3)" strokeWidth="1" />
        <ellipse cx="700" cy="200" rx="45" ry="35" fill="none" stroke="rgba(197, 203, 211, 0.2)" strokeWidth="1" />
        <text x="700" y="275" textAnchor="middle" fill="rgba(197, 203, 211, 0.5)" fontSize="12" fontFamily="'Space Mono', monospace">愛因斯坦環</text>
      </g>

      {/* Labels */}
      <text x="150" y="400" textAnchor="middle" fill="#273db0" fontSize="11" fontFamily="'Space Mono', monospace" letterSpacing="0.05em">光源</text>
      <text x="450" y="400" textAnchor="middle" fill="#273db0" fontSize="11" fontFamily="'Space Mono', monospace" letterSpacing="0.05em">透鏡</text>
      <text x="700" y="400" textAnchor="middle" fill="#273db0" fontSize="11" fontFamily="'Space Mono', monospace" letterSpacing="0.05em">成像</text>

      {/* Arrows */}
      <g stroke="#273db0" strokeWidth="1" fill="none" opacity="0.5">
        <line x1="200" y1="400" x2="380" y2="400" markerEnd="url(#arrowhead)" />
        <line x1="520" y1="400" x2="630" y2="400" markerEnd="url(#arrowhead)" />
      </g>

      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#273db0" opacity="0.5" />
        </marker>
      </defs>
    </svg>
  )
})

export default LensingDiagram
