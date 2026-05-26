import { useEffect, useRef, useState } from 'react'
import LensingDiagram from '../../components/svgs/LensingDiagram'

const evidenceData = [
  {
    id: 'rotation',
    tabLabel: '星系旋轉曲線',
    image: '/galaxy-rotation-curve.jpg',
    title: '星系旋轉曲線',
    body: '就像旋轉的溜冰選手：當她收緊手臂，轉速會加快；張開手臂，轉速減慢。星系也應該如此——外圍恆星應該轉得更慢。但觀測結果卻是一條平坦的曲線。這意味著星系外圍存在大量看不見的質量，像一個隱形的籠子，把所有恆星「鎖住」在同一轉速。',
    stat: '需要額外 ~85% 的隱形質量來解釋觀測',
    hasDiagram: true,
  },
  {
    id: 'lensing',
    tabLabel: '引力透鏡效應',
    image: '/bullet-cluster-overlay.jpg',
    title: '引力透鏡效應',
    body: '愛因斯坦預言：質量會彎曲周圍的時空，就像保齡球放在彈簧床上。當遙遠星系的光線經過一個巨大質量體時，光線會被彎曲、扭曲，形成環狀或弧狀的像。科學家測量了這些扭曲，發現所需的質量遠超可見物質的總和。子彈星團的碰撞是這個效應最壯觀的展示。',
    stat: '引力扭曲程度 = 5倍可見物質質量',
    hasDiagram: false,
  },
  {
    id: 'cmb',
    tabLabel: '宇宙微波背景',
    image: '/cmb-sky-map.jpg',
    title: '宇宙微波背景',
    body: '大爆炸後38萬年，宇宙冷卻到足以讓光自由傳播。這道「第一縷光」至今仍在宇宙中迴盪，只是波長被拉伸到了微波波段——這就是宇宙微波背景（CMB）。普朗克衛星繪製的CMB地圖顯示：宇宙的結構形成速度遠快於僅靠可見物質能解釋的程度。暗物質是讓宇宙快速「長大」的隱形骨架。',
    stat: '暗物質 = 27% | 普通物質 = 5% | 暗能量 = 68%',
    hasDiagram: false,
  },
]

export default function EvidenceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

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

  const currentEvidence = evidenceData[activeTab]

  return (
    <section
      id="evidence"
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: '#1A1A1A',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
      }}
    >
      <div className="mx-auto max-w-content px-[5vw]">
        {/* Section Label */}
        <div
          className="mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span className="section-label">● SECTION 03 — 鐵證如山</span>
        </div>

        {/* Headline */}
        <h2
          className="mb-12 font-sans font-bold leading-[1.0] tracking-[0.01em]"
          style={{
            fontSize: 'clamp(36px, 6vw, 90px)',
            color: 'var(--white)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.1s',
          }}
        >
          三個無法反駁的證據
        </h2>

        {/* Desktop Tabs */}
        <div
          className="mb-10 hidden gap-4 md:flex"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.2s',
          }}
        >
          {evidenceData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className="ghost-button text-sm transition-all duration-300"
              style={{
                borderColor: activeTab === index ? 'var(--indigo)' : 'rgba(240, 240, 240, 0.3)',
                color: activeTab === index ? 'var(--indigo)' : 'var(--white)',
              }}
            >
              {item.tabLabel}
            </button>
          ))}
        </div>

        {/* Mobile: Accordion-style stacked cards */}
        <div className="space-y-6 md:hidden">
          {evidenceData.map((item, index) => (
            <MobileEvidenceCard
              key={item.id}
              data={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Desktop: Active tab content */}
        <div
          className="hidden md:block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.3s',
          }}
        >
          <div
            key={activeTab}
            className="animate-fade-in"
          >
            {/* Image */}
            <div className="relative mb-8 overflow-hidden rounded-xl">
              <img
                src={currentEvidence.image}
                alt={currentEvidence.title}
                className="h-auto w-full object-cover"
                style={{ maxHeight: '500px' }}
                loading="lazy"
              />
              {/* Diagram overlay for rotation curve */}
              {currentEvidence.hasDiagram && (
                <div className="absolute bottom-4 right-4 w-[200px] opacity-20">
                  <LensingDiagram />
                </div>
              )}
            </div>

            {/* Title */}
            <h3
              className="mb-4 font-sans text-2xl font-bold"
              style={{ color: 'var(--white)' }}
            >
              {currentEvidence.title}
            </h3>

            {/* Body */}
            <p
              className="mb-6 max-w-[800px] font-sans text-lg font-light leading-[1.8]"
              style={{ color: 'var(--silver)' }}
            >
              {currentEvidence.body}
            </p>

            {/* Stat */}
            <p
              className="font-display text-2xl font-light"
              style={{ color: 'var(--white)' }}
            >
              {currentEvidence.stat}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileEvidenceCard({
  data,
  index,
  isVisible,
}: {
  data: (typeof evidenceData)[0]
  index: number
  isVisible: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="glass-panel overflow-hidden rounded-xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease',
        transitionDelay: `${0.3 + index * 0.15}s`,
      }}
    >
      {/* Image */}
      <img
        src={data.image}
        alt={data.title}
        className="h-[200px] w-full object-cover"
        loading="lazy"
      />

      <div className="p-5">
        <h3
          className="mb-2 font-sans text-xl font-bold"
          style={{ color: 'var(--white)' }}
        >
          {data.title}
        </h3>

        <p
          className="mb-3 font-sans text-sm font-light leading-[1.7]"
          style={{
            color: 'var(--silver)',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? undefined : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {data.body}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm transition-colors duration-300 hover:text-[var(--indigo)]"
          style={{ color: 'var(--silver)' }}
        >
          {expanded ? '收起' : '展開更多'}
        </button>

        {expanded && (
          <p
            className="mt-3 font-display text-lg font-light"
            style={{ color: 'var(--white)' }}
          >
            {data.stat}
          </p>
        )}
      </div>
    </div>
  )
}
