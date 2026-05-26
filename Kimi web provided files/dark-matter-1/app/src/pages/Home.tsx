import { useEffect } from 'react'
import Hero from '../sections/home/Hero'
import MysterySection from '../sections/home/MysterySection'
import HistorySection from '../sections/home/HistorySection'
import EvidenceSection from '../sections/home/EvidenceSection'
import CosmicScaleSection from '../sections/home/CosmicScaleSection'
import SearchSection from '../sections/home/SearchSection'
import FrontierSection from '../sections/home/FrontierSection'

interface HomeProps {
  section?: string
}

export default function Home({ section }: HomeProps) {
  // If a specific section is requested via route, scroll to it
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [section])

  return (
    <>
      <Hero />
      <MysterySection />
      <HistorySection />
      <EvidenceSection />
      <CosmicScaleSection />
      <SearchSection />
      <FrontierSection />
    </>
  )
}
