import { memo } from 'react'

interface DarkMatterHaloProps {
  className?: string
  style?: React.CSSProperties
}

const DarkMatterHalo = memo(function DarkMatterHalo({ className, style }: DarkMatterHaloProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="halo-gradient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(39, 61, 176, 0.25)" />
          <stop offset="30%" stopColor="rgba(39, 61, 176, 0.12)" />
          <stop offset="60%" stopColor="rgba(39, 61, 176, 0.04)" />
          <stop offset="100%" stopColor="rgba(39, 61, 176, 0)" />
        </radialGradient>
        <radialGradient id="galaxy-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(232, 220, 200, 0.4)" />
          <stop offset="50%" stopColor="rgba(232, 220, 200, 0.1)" />
          <stop offset="100%" stopColor="rgba(232, 220, 200, 0)" />
        </radialGradient>
        <filter id="halo-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dark matter halo - large translucent sphere */}
      <circle
        cx="400"
        cy="400"
        r="280"
        fill="url(#halo-gradient)"
      >
        <animate
          attributeName="r"
          values="280;285;280"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Halo boundary ring */}
      <circle
        cx="400"
        cy="400"
        r="280"
        fill="none"
        stroke="rgba(39, 61, 176, 0.08)"
        strokeWidth="1"
        strokeDasharray="8 8"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 400 400"
          to="360 400 400"
          dur="120s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner halo ring */}
      <circle
        cx="400"
        cy="400"
        r="180"
        fill="none"
        stroke="rgba(39, 61, 176, 0.06)"
        strokeWidth="0.5"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 400 400"
          to="0 400 400"
          dur="80s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Central galaxy glow */}
      <circle
        cx="400"
        cy="400"
        r="60"
        fill="url(#galaxy-glow)"
      />

      {/* Spiral galaxy - simplified representation */}
      <g transform="translate(400, 400)">
        {/* Spiral arms */}
        <g stroke="rgba(232, 220, 200, 0.3)" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Arm 1 */}
          <path d="M 0 0 Q 20 -30 45 -20 Q 55 -10 50 5">
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.4;0.2"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          {/* Arm 2 */}
          <path d="M 0 0 Q -20 30 -45 20 Q -55 10 -50 -5">
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.4;0.2"
              dur="4s"
              repeatCount="indefinite"
              begin="2s"
            />
          </path>
          {/* Arm 3 */}
          <path d="M 0 0 Q 30 20 20 45 Q 10 55 -5 50">
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.4;0.2"
              dur="4s"
              repeatCount="indefinite"
              begin="1s"
            />
          </path>
          {/* Arm 4 */}
          <path d="M 0 0 Q -30 -20 -20 -45 Q -10 -55 5 -50">
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.4;0.2"
              dur="4s"
              repeatCount="indefinite"
              begin="3s"
            />
          </path>
        </g>

        {/* Galaxy center */}
        <circle r="8" fill="#E8DCC8" filter="url(#halo-blur)">
          <animate
            attributeName="r"
            values="8;9;8"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="4" fill="#F0F0F0" />
      </g>

      {/* Labels */}
      <text
        x="400"
        y="720"
        textAnchor="middle"
        fill="rgba(197, 203, 211, 0.4)"
        fontSize="13"
        fontFamily="'Space Mono', monospace"
        letterSpacing="0.05em"
      >
        暗物質暈 (看不見)
      </text>
      <text
        x="400"
        y="120"
        textAnchor="middle"
        fill="rgba(232, 220, 200, 0.4)"
        fontSize="11"
        fontFamily="'Space Mono', monospace"
        letterSpacing="0.05em"
      >
        銀河系 (看得見)
      </text>

      {/* Size indicator */}
      <g transform="translate(680, 400)">
        <line x1="0" y1="-280" x2="0" y2="0" stroke="rgba(197, 203, 211, 0.15)" strokeWidth="0.5" />
        <circle cx="0" cy="-280" r="2" fill="rgba(197, 203, 211, 0.3)" />
        <circle cx="0" cy="0" r="2" fill="rgba(197, 203, 211, 0.3)" />
        <text
          x="8"
          y="-140"
          fill="rgba(197, 203, 211, 0.3)"
          fontSize="10"
          fontFamily="'Space Mono', monospace"
          writingMode="tb"
        >
          ~100 kpc
        </text>
      </g>
    </svg>
  )
})

export default DarkMatterHalo
