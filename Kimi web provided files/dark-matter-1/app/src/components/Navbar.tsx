import { useState, useEffect, useCallback } from 'react'

const navLinks = [
  { label: '宇宙概覽', href: '#overview', sectionId: 'overview' },
  { label: '歷史發現', href: '#history', sectionId: 'history' },
  { label: '關鍵證據', href: '#evidence', sectionId: 'evidence' },
  { label: '搜尋行動', href: '#search', sectionId: 'search' },
  { label: '無盡前沿', href: '#frontier', sectionId: 'frontier' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.15, rootMargin: '-64px 0px 0px 0px' }
    )

    navLinks.forEach((link) => {
      const el = document.getElementById(link.sectionId)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(13, 13, 18, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="mx-auto flex h-full max-w-container items-center justify-between px-[5vw]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-sans text-base font-bold tracking-wide"
            style={{ color: 'var(--white)' }}
          >
            暗物質
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative font-sans text-base tracking-[0.05em] transition-colors duration-300"
                style={{
                  color: activeSection === link.sectionId ? 'var(--white)' : 'var(--silver)',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--indigo)',
                    width: activeSection === link.sectionId ? '100%' : undefined,
                  }}
                />
                <span
                  className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: 'var(--indigo)' }}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#overview"
            onClick={(e) => handleNavClick(e, '#overview')}
            className="cta-button hidden text-sm md:flex"
            style={{ padding: '10px 24px' }}
          >
            開始探索
          </a>

          {/* Mobile Hamburger */}
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[2px] w-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--white)',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block h-[2px] w-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--white)',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[2px] w-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--white)',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            backgroundColor: 'rgba(13, 13, 18, 0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans text-2xl font-light tracking-[0.05em]"
              style={{ color: 'var(--white)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#overview"
            onClick={(e) => handleNavClick(e, '#overview')}
            className="cta-button mt-4"
          >
            開始探索
          </a>
        </div>
      )}
    </>
  )
}
