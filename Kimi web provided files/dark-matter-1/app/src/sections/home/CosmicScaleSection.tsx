import { useEffect, useRef, useState } from 'react'

const PIE_SIZE = 500
const PIE_STROKE_WIDTH = 40
const PIE_RADIUS = (PIE_SIZE - PIE_STROKE_WIDTH) / 2
const PIE_CIRCUMFERENCE = 2 * Math.PI * PIE_RADIUS

const segments = [
  { label: '暗能量', percent: 68, color: 'rgba(197, 203, 211, 0.15)', delay: 0 },
  { label: '暗物質', percent: 27, color: '#273db0', delay: 1.5 },
  { label: '普通物質', percent: 5, color: '#F0F0F0', delay: 2.5 },
]

export default function CosmicScaleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Calculate segment positions
  let currentOffset = 0
  const segmentPaths = segments.map((seg) => {
    const dashLength = (seg.percent / 100) * PIE_CIRCUMFERENCE
    const gapLength = PIE_CIRCUMFERENCE - dashLength
    const offset = -currentOffset
    currentOffset += dashLength
    return { ...seg, dashArray: `${dashLength} ${gapLength}`, offset }
  })

  return (
    <section
      id="scale"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #1a1a3e 0%, #0D0D12 70%, #0a0a0f 100%)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
      }}
    >
      <div className="mx-auto max-w-[1000px] px-[5vw]">
        {/* Section Label */}
        <div
          className="mb-8 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span className="section-label">● SECTION 04 — 宇宙成分</span>
        </div>

        {/* Headline */}
        <h2
          className="mb-8 text-center font-sans font-bold leading-[1.0] tracking-[0.01em]"
          style={{
            fontSize: 'clamp(36px, 6vw, 90px)',
            color: 'var(--white)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.1s',
          }}
        >
          我們幾乎一無所知
        </h2>

        {/* Body intro */}
        <p
          className="mx-auto mb-16 max-w-[600px] text-center font-sans text-xl font-light"
          style={{
            color: 'var(--silver)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.2s',
          }}
        >
          把整個宇宙的質能比喻成一塊大餅。你看得見、摸得著的一切——每一顆恆星、每一個行星、每一粒塵埃——只是上面的一小塊屑屑。
        </p>

        {/* Pie Chart */}
        <div className="relative mx-auto" style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vw)' }}>
          <svg
            viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`}
            className="w-full"
            style={{
              transform: 'rotate(-90deg)',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease',
              transitionDelay: '0.5s',
            }}
          >
            {/* Background circle */}
            <circle
              cx={PIE_SIZE / 2}
              cy={PIE_SIZE / 2}
              r={PIE_RADIUS}
              fill="none"
              stroke="rgba(197, 203, 211, 0.05)"
              strokeWidth={PIE_STROKE_WIDTH}
            />

            {/* Animated segments */}
            {segmentPaths.map((seg, i) => (
              <circle
                key={seg.label}
                cx={PIE_SIZE / 2}
                cy={PIE_SIZE / 2}
                r={PIE_RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={PIE_STROKE_WIDTH}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.offset}
                strokeLinecap="butt"
                style={{
                  strokeDasharray: isVisible ? seg.dashArray : `0 ${PIE_CIRCUMFERENCE}`,
                  transition: `stroke-dasharray ${i === 0 ? 1.5 : 1}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${seg.delay / 2}s`,
                }}
              />
            ))}
          </svg>

          {/* Center label */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease',
              transitionDelay: '3s',
            }}
          >
            <span
              className="font-display font-light"
              style={{
                fontSize: 'clamp(48px, 8vw, 100px)',
                color: 'var(--white)',
                lineHeight: 1,
              }}
            >
              95%
            </span>
            <span
              className="mt-2 font-sans text-base"
              style={{ color: 'var(--silver)' }}
            >
              我們無法解釋
            </span>
          </div>
        </div>

        {/* Floating stat labels */}
        <div className="mx-auto mt-16 grid max-w-[800px] gap-8 sm:grid-cols-3">
          {[
            { number: '68%', label: '暗能量 — 加速膨脹的推手', color: 'rgba(197, 203, 211, 0.4)' },
            { number: '27%', label: '暗物質 — 看不見的質量', color: '#273db0' },
            { number: '5%', label: '普通物質 — 你看到的全部', color: '#F0F0F0' },
          ].map((item, index) => (
            <div
              key={item.label}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
                transitionDelay: `${3.5 + index * 0.2}s`,
              }}
            >
              <span
                className="block font-display text-4xl font-light sm:text-5xl"
                style={{ color: item.color }}
              >
                {item.number}
              </span>
              <span
                className="mt-1 block font-sans text-sm"
                style={{ color: 'var(--silver)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Callout quote */}
        <blockquote
          className="mx-auto mt-16 max-w-[500px] border-l-[3px] pl-6"
          style={{
            borderColor: 'var(--indigo)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            transitionDelay: '4.5s',
          }}
        >
          <p
            className="font-sans text-xl font-light italic leading-[1.6]"
            style={{ color: 'var(--silver)' }}
          >
            「我們曾經以為科學已經解釋了宇宙。結果發現，我們連自己看到的是什麼都不知道。」
          </p>
          <cite
            className="mt-2 block font-sans text-sm not-italic"
            style={{ color: 'rgba(197, 203, 211, 0.4)' }}
          >
            — 匿名天文學家
          </cite>
        </blockquote>
      </div>
    </section>
  )
}
