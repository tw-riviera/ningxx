import { memo } from 'react'

interface ParticleCollisionProps {
  className?: string
  style?: React.CSSProperties
}

const ParticleCollision = memo(function ParticleCollision({ className, style }: ParticleCollisionProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="collision-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="spark-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left particle approaching */}
      <g>
        <circle cx="120" cy="200" r="12" fill="#273db0" opacity="0.8">
          <animate
            attributeName="cx"
            values="80;200"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Trail */}
        <line x1="60" y1="200" x2="120" y2="200" stroke="#273db0" strokeWidth="1" opacity="0.3" strokeDasharray="4 4">
          <animate
            attributeName="x2"
            values="80;200"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Right particle approaching */}
      <g>
        <circle cx="480" cy="200" r="10" fill="#C5CBD3" opacity="0.7">
          <animate
            attributeName="cx"
            values="520;400"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;0.3;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Trail */}
        <line x1="540" y1="200" x2="480" y2="200" stroke="#C5CBD3" strokeWidth="1" opacity="0.3" strokeDasharray="4 4">
          <animate
            attributeName="x1"
            values="520;400"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Collision center - spark burst */}
      <g filter="url(#spark-glow)">
        <circle cx="300" cy="200" r="4" fill="#F0F0F0">
          <animate
            attributeName="r"
            values="2;20;2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Spark rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = 300 + Math.cos(angle) * 15
          const y1 = 200 + Math.sin(angle) * 15
          const x2 = 300 + Math.cos(angle) * 50
          const y2 = 200 + Math.sin(angle) * 50
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? '#273db0' : '#E8DCC8'}
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <animate
                attributeName="x2"
                values={`${300 + Math.cos(angle) * 10};${300 + Math.cos(angle) * 70};${300 + Math.cos(angle) * 10}`}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values={`${200 + Math.sin(angle) * 10};${200 + Math.sin(angle) * 70};${200 + Math.sin(angle) * 10}`}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          )
        })}
      </g>

      {/* Detection rings emanating outward */}
      {[1, 2, 3].map((ring) => (
        <circle
          key={ring}
          cx="300"
          cy="200"
          r="20"
          fill="none"
          stroke="#273db0"
          strokeWidth="0.5"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="20;150;20"
            dur="2s"
            repeatCount="indefinite"
            begin={`${ring * 0.15}s`}
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="2s"
            repeatCount="indefinite"
            begin={`${ring * 0.15}s`}
          />
        </circle>
      ))}

      {/* Labels */}
      <text
        x="80"
        y="360"
        textAnchor="middle"
        fill="rgba(197, 203, 211, 0.4)"
        fontSize="11"
        fontFamily="'Space Mono', monospace"
        letterSpacing="0.05em"
      >
        入射粒子
      </text>
      <text
        x="520"
        y="360"
        textAnchor="middle"
        fill="rgba(197, 203, 211, 0.4)"
        fontSize="11"
        fontFamily="'Space Mono', monospace"
        letterSpacing="0.05em"
      >
        靶核
      </text>
      <text
        x="300"
        y="360"
        textAnchor="middle"
        fill="#273db0"
        fontSize="12"
        fontFamily="'Space Mono', monospace"
        letterSpacing="0.05em"
      >
        碰撞 + 探測
      </text>
    </svg>
  )
})

export default ParticleCollision
