import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-[100dvh]" style={{ backgroundColor: 'var(--deep-void)' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
