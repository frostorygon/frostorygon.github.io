
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <AuroraBackground className="min-h-screen w-full bg-[var(--color-background)] relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4 relative z-10 text-center space-y-6">
                {/* Avatar with glowing border */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 blur-md opacity-75 animate-pulse" />
                    <img
                        src={`${import.meta.env.BASE_URL}avatar.jpg`}
                        alt="FrostOrygon"
                        className="relative w-full h-full rounded-full object-cover border-2 border-cyan-400/50"
                    />
                </motion.div>

                {/* Animated Title with Cyberpunk Gradient */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl md:text-8xl font-bold tracking-tight"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 animate-gradient bg-[length:200%_auto]">
                        FrostOrygon
                    </span>
                </motion.h1>

                {/* Animated Tagline with decorative lines */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center justify-center gap-3"
                >
                    <span className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-cyan-500" />
                    <p className="text-sm md:text-lg text-neutral-400 font-light tracking-widest uppercase">
                        Creating is the human experience
                    </p>
                    <span className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-fuchsia-500" />
                </motion.div>
            </div>
        </AuroraBackground>
    );
}
