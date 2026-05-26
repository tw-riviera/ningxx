import { useEffect, useRef, useState } from 'react'

const whatIfScenarios = [
  {
    title: '修正引力理論（MOND）',
    body: '也許牛頓和愛因斯坦的引力理論在極大尺度上並不完全正確。一些科學家提出了「修正牛頓動力學」，試圖用新的物理定律取代暗物質。但這個理論至今無法解釋子彈星團和CMB數據。',
  },
  {
    title: '額外維度的洩漏',
    body: '也許引力比其他基本力更弱，是因為它在額外的空間維度中「洩漏」了。暗物質的現象可能只是高維空間幾何的投影。',
  },
  {
    title: '我們生活在一個模擬中',
    body: '這是最瘋狂但也最有趣的假設。如果宇宙是一個電腦模擬，暗物質可能只是程式設計師偷懶的結果——用簡化的物理模型填充大部分計算空間。',
  },
]

function WhatIfToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="mx-auto max-w-[640px] overflow-hidden rounded-xl"
      style={{
        background: 'rgba(26, 26, 30, 0.6)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(197, 203, 211, 0.1)',
      }}
    >
      {/* Toggle header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-[rgba(39,61,176,0.05)]"
      >
        <span
          className="font-sans text-lg font-normal"
          style={{ color: 'var(--white)' }}
        >
          如果暗物質不存在呢？
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center text-2xl transition-transform duration-300"
          style={{
            color: 'var(--indigo)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? '600px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.4s ease',
        }}
      >
        <div className="space-y-6 p-6 pt-0">
          {whatIfScenarios.map((scenario, index) => (
            <div key={index}>
              <h4
                className="mb-2 font-sans text-base font-bold"
                style={{ color: 'var(--indigo)' }}
              >
                {scenario.title}
              </h4>
              <p
                className="font-sans text-[15px] font-light leading-[1.7]"
                style={{ color: 'var(--silver)' }}
              >
                {scenario.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FrontierSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleContinueClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="frontier"
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: 'transparent',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-xl)',
      }}
    >
      <div className="mx-auto max-w-[800px] px-[5vw]">
        {/* Section Label */}
        <div
          className="mb-8 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span className="section-label">● SECTION 06 — 無盡前沿</span>
        </div>

        {/* Closing Headline */}
        <h2
          className="mb-12 text-center font-sans font-bold leading-[1.0] tracking-[0.01em]"
          style={{
            fontSize: 'clamp(36px, 8vw, 120px)',
            color: 'var(--white)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.1s',
          }}
        >
          也許，我們才剛剛開始
        </h2>

        {/* Closing Body */}
        <div
          className="mb-16 space-y-6 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease',
            transitionDelay: '0.3s',
          }}
        >
          <p
            className="mx-auto max-w-[640px] font-sans text-xl font-light leading-[1.9]"
            style={{ color: 'var(--silver)' }}
          >
            暗物質的搜尋已經持續了近一個世紀。我們建造了越來越大的探測器，發射了越來越精密的衛星，在地下深處和太空深處同時尋找它的蹤跡。
          </p>
          <p
            className="mx-auto max-w-[640px] font-sans text-xl font-light leading-[1.9]"
            style={{ color: 'var(--silver)' }}
          >
            也許明天就會有突破。也許還需要一百年。也許暗物質根本不是我們想像中的任何東西——而是一個更深層次的物理定律的徵兆，指向我們尚未夢想過的現實。
          </p>
          <p
            className="mx-auto max-w-[640px] font-sans text-xl font-light leading-[1.9]"
            style={{ color: 'var(--silver)' }}
          >
            但這正是科學最美的地方：承認自己的無知，然後義無反顧地追尋答案。
          </p>
        </div>

        {/* What If Toggle */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.5s',
          }}
        >
          <WhatIfToggle />
        </div>

        {/* CTA */}
        <div
          className="mt-16 flex flex-col items-center gap-6 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.7s',
          }}
        >
          <a href="#" onClick={handleContinueClick} className="cta-button">
            繼續你的宇宙之旅
          </a>

          {/* Resource links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: 'NASA 暗物質專題', href: 'https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy/' },
              { label: 'CERN 研究更新', href: 'https://home.cern/science/physics/dark-matter' },
              { label: '維基百科條目', href: 'https://zh.wikipedia.org/wiki/暗物质' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm transition-colors duration-300 hover:text-[var(--indigo)]"
                style={{ color: 'var(--silver)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
