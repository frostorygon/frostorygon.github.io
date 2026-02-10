import { ProjectCard } from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";
import {
    IconDog,
    IconShoppingCart,
    IconBuilding,
    IconCake,
    IconGift,
    IconWorld,
    IconRobot,
} from "@tabler/icons-react";

export function Projects() {
    return (
        <section id="projects" className="py-24 md:py-40 bg-neutral-950">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl mx-auto px-6 md:px-8 mb-12 md:mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-100 mb-4">
                    Selected Work
                </h2>
                <p className="text-neutral-400 text-base md:text-lg max-w-xl">
                    A showcase of recent experiments and production applications.
                </p>
            </motion.div>

            {/* Project Grid */}
            <div className="max-w-5xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className="h-full"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                                ease: "easeOut",
                            }}
                        >
                            <ProjectCard
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                href={item.href}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const items = [
    {
        title: "Reddit Sentiment Analyzer",
        description: "AI-powered Apify Actor that scrapes Reddit posts and comments with automatic sentiment analysis, topic extraction, and entity recognition using Google Gemini AI.",
        icon: <IconRobot className="h-5 w-5" />,
        href: "https://apify.com/quakerish_joyride/reddit-sentiment-analyzer",
    },
    {
        title: "Vibe Weather Globe",
        description: "Interactive 3D Earth with NASA Blue Marble textures, live weather API integration, city markers, and smooth globe rotation for worldwide weather exploration.",
        icon: <IconWorld className="h-5 w-5" />,
        href: "https://frostorygon.github.io/vibe-weather-globe/",
    },
    {
        title: "3D Pet Dog",
        description: "Interactive Three.js virtual pet with click-to-move navigation, equippable helmets (Knight & Viking), fetch mechanics, and day/night cycle in a lush garden environment.",
        icon: <IconDog className="h-5 w-5" />,
        href: "https://frostorygon.github.io/vibe-3d-pet/",
    },
    {
        title: "Vibe POS",
        description: "Offline-first Progressive Web App Point of Sale system with cart management, receipt generation, and IndexedDB persistence for seamless retail operations.",
        icon: <IconShoppingCart className="h-5 w-5" />,
        href: "https://frostorygon.github.io/vibe-pos/",
    },
    {
        title: "Voxel Pagoda Garden",
        description: "Immersive voxel-art Japanese pagoda set in a vibrant garden with cherry blossoms, ambient particles, and atmospheric lighting using Three.js.",
        icon: <IconBuilding className="h-5 w-5" />,
        href: "https://frostorygon.github.io/vibe-glm-pagoda/",
    },
    {
        title: "Luxury Cakes Landing",
        description: "Elegant landing page for a premium cake business featuring hero sections, product showcases, testimonials, and conversion-optimized order flow.",
        icon: <IconCake className="h-5 w-5" />,
        href: "https://frostorygon.github.io/example-cakeshop/",
    },
    {
        title: "Bespoke Cakes Platform",
        description: "Full-featured frontend application with multi-page routing, gallery system, booking flow, and mock API integration for a custom cake business.",
        icon: <IconGift className="h-5 w-5" />,
        href: "https://frostorygon.github.io/bespoke-cakes/",
    },
];
