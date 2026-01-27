
import { useEffect } from 'react'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen p-8 font-sans">
      <main className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter text-glow">
            FrostOrygon
          </h1>
          <p className="text-xl text-gray-400">
            Creation is the human experience
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 glow-cyan">
            <h2 className="text-2xl font-bold mb-2">Phase 1</h2>
            <p className="text-gray-400">High-performance skeleton active.</p>
            <div className="mt-4 font-mono text-sm text-primary">
              Run: Vite + Tailwind v4 + Lenis
            </div>
          </div>
          <div className="h-64 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 glow-purple">
            <h2 className="text-2xl font-bold mb-2">Status</h2>
            <p className="text-gray-400">Waiting for interaction.</p>
          </div>
        </section>

        <div className="h-[200vh] border-l border-white/10 pl-8 ml-4">
          <p className="py-8 text-gray-500">Scroll test area...</p>
        </div>
      </main>
    </div>
  )
}

export default App
