import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import OrbitalDiagram from '../../components/svgs/OrbitalDiagram'

const StarfieldBackground = lazy(() => import('../../components/StarfieldBackground'))

// Fog particles component
function FogParticles() {
  const particles = [
    { size: 400, top: '10%', left: '-5%', delay: '0s', duration: '15s' },
    { size: 300, top: '60%', left: '70%', delay: '-5s', duration: '18s' },
    { size: 500, top: '30%', left: '40%', delay: '-10s', duration: '20s' },
    { size: 250, top: '80%', left: '10%', delay: '-3s', duration: '16s' },
    { size: 350, top: '5%', left: '60%', delay: '-8s', duration: '22s' },
    { size: 200, top: '45%', left: '85%', delay: '-12s', duration: '14s' },
  ]

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26, 26, 62, 0.3) 0%, transparent 70%)',
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
            zIndex: 1,
          }}
        />
      ))}
    </>
  )
}

// Silver haze overlay with lens flare
function SilverHazeOverlay() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 2 }}
    >
      {/* Radial gradient haze */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(197, 203, 211, 0.05) 0%, transparent 60%)',
          filter: 'blur(60px) brightness(1.05)',
        }}
      />
      {/* Lens flare streak */}
      <div
        className="absolute"
        style={{
          width: '200%',
          height: '2px',
          top: '40%',
          left: '-50%',
          background: 'linear-gradient(90deg, transparent, rgba(197, 203, 211, 0.08), transparent)',
          transform: `rotate(-15deg) translateX(${mousePos.x * 0.05}px) translateY(${mousePos.y * 0.05}px)`,
          filter: 'blur(1px)',
          transition: 'transform 0.5s ease-out',
        }}
      />
    </div>
  )
}

// Character-by-character animated title
function AnimatedTitle({ text, delay = 0.3 }: { text: string; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  const characters = text.split('')

  return (
    <div ref={containerRef} className="overflow-hidden">
      <h1
        className="font-sans font-bold leading-[1.1] tracking-[0.02em]"
        style={{
          fontSize: 'clamp(48px, 12vw, 180px)',
          color: 'var(--white)',
          textShadow: '0 0 80px rgba(39, 61, 176, 0.3)',
        }}
      >
        {characters.map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              transform: visible ? 'translateY(0)' : 'translateY(100%)',
              opacity: visible ? 1 : 0,
              transition: `transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)`,
              transitionDelay: visible ? `${i * 0.04}s` : '0s',
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById('overview')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden"
      style={{ backgroundColor: 'var(--deep-void)' }}
    >
      {/* Layer 1: Three.js Starfield */}
      <Suspense
        fallback={
          <div
            className="absolute inset-0"
            style={{
              zIndex: 0,
              backgroundImage: 'url(/hero-starfield.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        }
      >
        <StarfieldBackground
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 2s ease',
          }}
        />
      </Suspense>

      {/* Layer 2: Fallback image (hidden when WebGL loads) */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage: 'url(/hero-starfield.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 3: Fog particles */}
      <FogParticles />

      {/* Layer 4: Silver haze overlay */}
      <SilverHazeOverlay />

      {/* Layer 5: Orbital diagram SVG */}
      <div
        className="absolute hidden md:block"
        style={{
          top: '15%',
          right: '10%',
          width: '300px',
          zIndex: 3,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease',
          transitionDelay: '1.2s',
        }}
      >
        <OrbitalDiagram className="w-full" />
      </div>

      {/* Layer 6: Text content */}
      <div
        className="relative flex min-h-[100dvh] flex-col justify-center px-[5vw]"
        style={{ zIndex: 4 }}
      >
        <div className="max-w-4xl" style={{ transform: 'translateY(-5%)' }}>
          {/* Hero Title */}
          <AnimatedTitle text="暗物質" delay={0.3} />

          {/* Subtitle */}
          <p
            className="mt-6 font-sans font-light tracking-wide"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
              color: 'var(--silver)',
              lineHeight: 1.6,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '1s',
            }}
          >
            探索佔據宇宙27%的最大物理學謎團
          </p>

          {/* CTA Button */}
          <div
            className="mt-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '1.3s',
            }}
          >
            <a href="#overview" onClick={handleExploreClick} className="cta-button">
              開始探索
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: loaded ? 0.5 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: '2s',
          }}
        >
          <div className="scroll-indicator flex flex-col items-center gap-2">
            <span
              className="font-mono-dm text-xs tracking-[0.1em]"
              style={{ color: 'var(--silver)' }}
            >
              SCROLL
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              style={{ color: 'var(--silver)' }}
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="8"
                cy="8"
                r="2"
                fill="currentColor"
              >
                <animate
                  attributeName="cy"
                  values="8;14;8"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
