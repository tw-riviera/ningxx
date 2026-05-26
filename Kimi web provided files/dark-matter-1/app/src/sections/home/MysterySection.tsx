import { useEffect, useRef, useState } from 'react'
import DarkMatterHalo from '../../components/svgs/DarkMatterHalo'

export default function MysterySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: '#1A1A1A',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
      }}
    >
      <div className="mx-auto max-w-container px-[5vw]">
        {/* Section Label */}
        <div
          className="mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span className="section-label">● SECTION 01 — 宇宙概覽</span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left: Text content (55%) */}
          <div className="lg:w-[55%]">
            {/* Headline */}
            <h2
              className="mb-8 font-sans font-bold leading-[1.0] tracking-[0.01em]"
              style={{
                fontSize: 'clamp(36px, 6vw, 90px)',
                color: 'var(--white)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: '0.1s',
              }}
            >
              看不見，但真實存在
            </h2>

            {/* Body text */}
            <div
              className="max-w-[520px] space-y-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: '0.2s',
              }}
            >
              <p
                className="font-sans text-lg font-light leading-[1.8]"
                style={{ color: 'var(--silver)', letterSpacing: '0.02em' }}
              >
                抬頭仰望星空，你看到的閃爍光芒——恆星、行星、星雲——其實只佔了宇宙物質的不到5%。
              </p>
              <p
                className="font-sans text-lg font-light leading-[1.8]"
                style={{ color: 'var(--silver)', letterSpacing: '0.02em' }}
              >
                那麼，剩下的95%是什麼？科學家給了它一個名字：暗物質。它佔了宇宙總質能的27%，卻不發光、不發熱、不與電磁力作用。你無法看見它，無法觸摸它，甚至無法直接偵測到它。
              </p>
              <p
                className="font-sans text-lg font-light leading-[1.8]"
                style={{ color: 'var(--silver)', letterSpacing: '0.02em' }}
              >
                但它在每一個星系的旋轉中留下指紋，在遙遠光線的彎曲中顯露痕跡。就像風——你看不見風，但你可以看見樹葉的搖動。
              </p>
            </div>
          </div>

          {/* Right: Interactive visualization (45%) */}
          <div className="relative flex min-h-[400px] items-center justify-center lg:w-[45%]">
            {/* Dark Matter Halo SVG */}
            <div
              style={{
                opacity: isVisible ? 0.4 : 0,
                transition: 'opacity 1s ease',
                transitionDelay: '0.4s',
              }}
            >
              <DarkMatterHalo className="w-full max-w-[400px]" />
            </div>

            {/* Stats overlay */}
            <div
              className="absolute bottom-4 right-4 font-mono-dm text-xs"
              style={{
                color: 'var(--silver)',
                opacity: isVisible ? 0.6 : 0,
                transition: 'opacity 0.8s ease',
                transitionDelay: '0.8s',
              }}
            >
              暗物質佔比: 27% | 暗能量: 68% | 普通物質: 5%
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
