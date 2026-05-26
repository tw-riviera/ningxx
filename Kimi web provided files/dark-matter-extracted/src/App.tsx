import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Home section="overview" />} />
        <Route path="/history" element={<Home section="history" />} />
        <Route path="/evidence" element={<Home section="evidence" />} />
        <Route path="/search" element={<Home section="search" />} />
        <Route path="/frontier" element={<Home section="frontier" />} />
      </Routes>
    </Layout>
  )
}
