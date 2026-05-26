import { useEffect, useRef, useState } from 'react'

const approachCards = [
  {
    image: '/detector-lab.jpg',
    title: '深入地下數公里',
    body: '在義大利格蘭薩索山的地下實驗室、在南達科他州的廢棄金礦深處，科學家建造了極其敏感的探測器。它們在極低溫下運作，等待一個暗物質粒子（WIMP）偶爾撞擊原子核的那一刻。這就像在一場暴風雨中，等待一顆特定的雨滴落入一個特定的杯子。',
    tag: '直接探測',
    offset: '0',
  },
  {
    image: '/lhc-tunnel.jpg',
    title: '重現宇宙誕生的瞬間',
    body: '日內瓦地底27公里長的大型強子對撞機（LHC）以接近光速撞擊質子。每一次碰撞都重現了大爆炸後百萬分之一秒的環境。如果暗物質粒子存在，它們可能在這些極端條件下被創造出來。探測器記錄每一個飛出的粒子——如果發現能量「無故消失」，那可能就是暗物質逃離了探測器的跡象。',
    tag: '粒子對撞',
    offset: '10%',
  },
  {
    image: '/particle-vertex-data.jpg',
    title: '追蹤引力的指紋',
    body: '如果暗物質會自我湮滅，它應該會產生可探測的輻射——高能伽馬射線或正電子。費米伽馬射線太空望遠鏡和國際空間站上的阿爾法磁譜儀正在掃描宇宙，尋找這些「暗物質湮滅」的訊號。這就像在黑暗中尋找一盞可能並不存在的小燈。',
    tag: '間接探測',
    offset: '5%',
  },
]

function ApproachCard({
  data,
}: {
  data: (typeof approachCards)[0]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="w-full"
      style={{
        maxWidth: '700px',
        marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? data.offset : '0',
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <div
        className="group overflow-hidden rounded-2xl transition-all duration-400"
        style={{
          background: 'rgba(26, 26, 30, 0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(197, 203, 211, 0.08)',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(250px, 30vw, 400px)' }}>
          {/* Accent line */}
          <div
            className="absolute left-0 right-0 top-0 z-10 h-1"
            style={{ backgroundColor: 'var(--indigo)' }}
          />
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
            style={{
              opacity: cardVisible ? 1 : 0,
              transition: 'opacity 1s ease, transform 1s ease',
            }}
          />
        </div>

        {/* Text content */}
        <div className="p-8">
          {/* Tag */}
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 font-mono-dm text-xs"
            style={{
              color: 'var(--indigo)',
              backgroundColor: 'rgba(39, 61, 176, 0.1)',
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.4s ease',
              transitionDelay: '0.3s',
            }}
          >
            {data.tag}
          </span>

          {/* Title */}
          <h3
            className="mb-4 font-sans text-2xl font-bold"
            style={{
              color: 'var(--white)',
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
              transitionDelay: '0.2s',
            }}
          >
            {data.title}
          </h3>

          {/* Body */}
          <p
            className="font-sans text-base font-light leading-[1.7]"
            style={{
              color: 'var(--silver)',
              opacity: cardVisible ? 1 : 0,
              transition: 'opacity 0.8s ease',
              transitionDelay: '0.3s',
            }}
          >
            {data.body}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SearchSection() {
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
      id="search"
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
          <span className="section-label">● SECTION 05 — 搜尋行動</span>
        </div>

        {/* Headline */}
        <h2
          className="mb-16 font-sans font-bold leading-[1.0] tracking-[0.01em]"
          style={{
            fontSize: 'clamp(36px, 6vw, 90px)',
            color: 'var(--white)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: '0.1s',
          }}
        >
          人類最雄心勃勃的追捕
        </h2>

        {/* Approach Cards - staggered layout */}
        <div className="flex flex-col gap-16">
          {approachCards.map((card) => (
            <ApproachCard
              key={card.title}
              data={card}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
