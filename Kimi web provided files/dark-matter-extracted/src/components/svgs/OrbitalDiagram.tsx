import { memo } from 'react'

interface OrbitalDiagramProps {
  className?: string
  style?: React.CSSProperties
}

const OrbitalDiagram = memo(function OrbitalDiagram({ className, style }: OrbitalDiagramProps) {
  const planets = [
    { rx: 40, ry: 20, duration: '8s', size: 3, delay: '0s' },
    { rx: 70, ry: 35, duration: '12s', size: 4, delay: '-3s' },
    { rx: 100, ry: 50, duration: '16s', size: 3.5, delay: '-6s' },
    { rx: 130, ry: 65, duration: '20s', size: 5, delay: '-9s' },
    { rx: 160, ry: 80, duration: '24s', size: 3, delay: '-12s' },
  ]

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central star */}
      <circle
        cx="200"
        cy="200"
        r="6"
        fill="#E8DCC8"
        filter="url(#star-glow)"
      />
      <circle cx="200" cy="200" r="3" fill="#F0F0F0" />

      {/* Orbit paths */}
      {planets.map((planet, i) => (
        <ellipse
          key={`orbit-${i}`}
          cx="200"
          cy="200"
          rx={planet.rx}
          ry={planet.ry}
          stroke="rgba(197, 203, 211, 0.15)"
          strokeWidth="0.5"
          fill="none"
        />
      ))}

      {/* Planets with orbit animation */}
      {planets.map((planet, i) => (
        <g key={`planet-${i}`}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 200 200`}
            to={`360 200 200`}
            dur={planet.duration}
            repeatCount="indefinite"
            begin={planet.delay}
          />
          <circle
            cx={200 + planet.rx}
            cy="200"
            r={planet.size}
            fill="#273db0"
          >
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </circle>
        </g>
      ))}
    </svg>
  )
})

export default OrbitalDiagram
