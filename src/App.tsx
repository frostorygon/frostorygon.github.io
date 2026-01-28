
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { FloatingDock } from "@/components/aceternity/floating-dock"
import { motion, AnimatePresence } from "framer-motion"
import {
  IconBrandGithub,
  IconHome,
  IconTerminal2,
} from "@tabler/icons-react"

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Projects",
    icon: (
      <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#projects",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/frostorygon",
  },
]


function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Track scroll position
    const handleScroll = () => {
      // Trigger after scrolling past ~80% of viewport height (hero section)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <main className="bg-background min-h-screen w-full overflow-hidden antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <Hero />
      <Projects />
      <Contact />

      {/* Animated Floating Dock */}
      <AnimatePresence mode="wait">
        {!isScrolled ? (
          // Horizontal dock at bottom
          <motion.div
            key="horizontal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 w-full flex justify-center z-50 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <FloatingDock items={links} />
            </div>
          </motion.div>
        ) : (
          // Vertical dock on right side
          <motion.div
            key="vertical"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <FloatingDock items={links} vertical />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
