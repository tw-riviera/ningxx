import { useEffect, useRef, useState } from 'react'

const timelineData = [
  {
    year: '1933',
    image: '/timeline-1933.jpg',
    title: '1933 — 茲威基的瘋狂點子',
    body: '瑞士天文學家弗里茨·茲威基觀察后髮座星系團時發現：星系移動的速度遠比可見質量允許的快。他大膽推斷：一定存在大量「看不見的物質」在提供額外的引力。他稱之為「dunkle Materie」——暗物質。當時沒有人相信他。',
  },
  {
    year: '1970',
    image: '/timeline-1970.jpg',
    title: '1970年代 — 魯賓的致命一擊',
    body: '薇拉·魯賓測量了數十個螺旋星系邊緣恆星的旋轉速度。根據牛頓力學，離中心越遠的恆星應該轉得越慢。但它們沒有。所有恆星都以幾乎相同的速度旋轉——這意味著每個星系都被一個巨大的隱形物質暈包裹著。魯賓的數據無可辯駁。',
  },
  {
    year: '1998',
    image: '/timeline-1998.jpg',
    title: '1998 — 宇宙在加速膨脹',
    body: '兩個獨立的研究團隊觀測遙遠的超新星，發現宇宙膨脹不僅沒有減速，反而在加速。這意味著除了暗物質，還存在一種更神秘的「暗能量」，佔據了宇宙68%的質能。宇宙的成分圖變得更加撲朔迷離。',
  },
  {
    year: '2006',
    image: '/timeline-2006.jpg',
    title: '2006 — 子彈星團的鐵證',
    body: 'NASA的錢卓拉X射線望遠鏡捕捉到了兩個星系團相撞的畫面——後來被稱為「子彈星團」。粉紅色的熱氣體（普通物質）在碰撞後滯後了，但藍色的引力透鏡訊號（暗物質）繼續前進。這是人類首次「直接看見」暗物質與普通物質分離。懷疑論者終於沉默了。',
  },
]

function TimelineNode({
  data,
  index,
  isVisible,
}: {
  data: (typeof timelineData)[0]
  index: number
  isVisible: boolean
}) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex w-full items-start gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* Timeline axis node */}
      <div className="absolute left-4 top-0 z-10 flex flex-col items-center lg:left-1/2 lg:-translate-x-1/2">
        <div
          className="h-3 w-3 rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: 'var(--indigo)',
            backgroundColor: isVisible ? 'var(--indigo)' : 'transparent',
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transitionDelay: `${index * 0.2}s`,
          }}
        />
      </div>

      {/* Year label */}
      <div
        className={`hidden font-mono-dm text-sm lg:block lg:w-1/2 ${isLeft ? 'text-right pr-12' : 'text-left pl-12'}`}
        style={{
          color: 'var(--indigo)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          transitionDelay: `${index * 0.2 + 0.1}s`,
        }}
      >
        {data.year}
      </div>

      {/* Card */}
      <div
        className={`ml-12 lg:ml-0 lg:w-1/2 ${isLeft ? 'lg:pl-12' : 'lg:pr-12'}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0)'
            : isLeft
              ? 'translateX(-60px)'
              : 'translateX(60px)',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: `${index * 0.2 + 0.15}s`,
        }}
      >
        <div
          className="glass-panel overflow-hidden rounded-xl p-6"
          style={{ maxWidth: '420px' }}
        >
          {/* Mobile year */}
          <div
            className="mb-2 font-mono-dm text-sm lg:hidden"
            style={{ color: 'var(--indigo)' }}
          >
            {data.year}
          </div>

          {/* Image */}
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={data.image}
              alt={data.title}
              className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              style={{
                maxHeight: '250px',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease',
                transitionDelay: `${index * 0.2 + 0.25}s`,
              }}
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h3
            className="mb-3 font-sans text-xl font-bold"
            style={{ color: 'var(--white)' }}
          >
            {data.title}
          </h3>

          {/* Body */}
          <p
            className="font-sans text-[15px] font-light leading-[1.7]"
            style={{ color: 'var(--silver)' }}
          >
            {data.body}
          </p>

          {/* Ghost button */}
          <button className="ghost-button mt-4 text-xs">了解更多 &rarr;</button>
        </div>
      </div>
    </div>
  )
}

export default function HistorySection() {
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

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: 'linear-gradient(180deg, #1A1A1A 0%, #1a1a3e 100%)',
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
          <span className="section-label">● SECTION 02 — 發現之旅</span>
        </div>

        {/* Headline */}
        <h2
          className="mb-20 text-center font-sans font-bold leading-[1.0] tracking-[0.01em]"
          style={{
            fontSize: 'clamp(36px, 6vw, 90px)',
            color: 'var(--white)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.1s',
          }}
        >
          一百年的追尋
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline axis */}
          <div
            className="absolute left-4 top-0 h-full w-px lg:left-1/2 lg:-translate-x-1/2"
            style={{ backgroundColor: 'rgba(197, 203, 211, 0.15)' }}
          >
            {/* Animated fill */}
            <div
              className="w-full"
              style={{
                height: isVisible ? '100%' : '0%',
                background: 'linear-gradient(to bottom, var(--indigo), rgba(197, 203, 211, 0.15))',
                transition: 'height 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>

          {/* Timeline nodes */}
          <div className="space-y-20">
            {timelineData.map((item, index) => (
              <TimelineNode
                key={item.year}
                data={item}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
