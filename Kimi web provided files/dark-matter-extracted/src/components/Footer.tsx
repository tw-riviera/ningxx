import { memo } from 'react'

const navLinks = [
  { label: '宇宙概覽', href: '#overview' },
  { label: '歷史發現', href: '#history' },
  { label: '關鍵證據', href: '#evidence' },
  { label: '搜尋行動', href: '#search' },
  { label: '無盡前沿', href: '#frontier' },
]

const Footer = memo(function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer
      className="relative w-full"
      style={{
        borderTop: '1px solid rgba(197, 203, 211, 0.1)',
        backgroundColor: 'var(--deep-void)',
      }}
    >
      {/* Marquee */}
      <div className="overflow-hidden py-6">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 inline-block font-mono-dm text-sm tracking-[0.1em]"
              style={{ color: 'rgba(197, 203, 211, 0.2)' }}
            >
              DARK MATTER — 暗物質 — UNIVERSE MYSTERY — 宇宙的奧祕 —
            </span>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 px-[5vw] py-8 md:flex-row">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-sans text-base font-bold"
          style={{ color: 'var(--white)' }}
        >
          暗物質
        </a>

        {/* Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans text-sm transition-colors duration-300 hover:text-[var(--indigo)]"
              style={{ color: 'rgba(197, 203, 211, 0.5)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="font-mono-dm text-xs"
          style={{ color: 'rgba(197, 203, 211, 0.4)' }}
        >
          &copy; 2025 一個關於宇宙的互動體驗
        </p>
      </div>
    </footer>
  )
})

export default Footer
