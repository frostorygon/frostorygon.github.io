import { cn } from "@/lib/utils";

interface ProjectCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    gradient?: string;
    href?: string;
    className?: string;
}

export function ProjectCard({
    title,
    description,
    icon,
    gradient = "from-violet-500 via-purple-500 to-blue-500",
    href = "#",
    className,
}: ProjectCardProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl",
                "bg-neutral-900/50 backdrop-blur-sm",
                "border border-neutral-800/50",
                "transition-all duration-300 ease-out",
                "hover:border-cyan-500/30 hover:-translate-y-1",
                "hover:shadow-[0_0_40px_rgba(0,217,255,0.1)]",
                className
            )}
        >
            {/* Gradient Header */}
            <div
                className={cn(
                    "aspect-[16/10] w-full",
                    "bg-gradient-to-br",
                    gradient,
                    "transition-transform duration-500 ease-out",
                    "group-hover:scale-105"
                )}
            />

            {/* Content */}
            <div className="flex flex-col gap-3 p-5 md:p-6">
                {/* Icon + Title Row */}
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800/80 text-neutral-400 group-hover:text-cyan-400 transition-colors">
                            {icon}
                        </div>
                    )}
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-100 group-hover:text-cyan-50 transition-colors">
                        {title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {description}
                </p>

                {/* View Project Link */}
                <div className="mt-auto pt-2 flex items-center gap-2 text-sm text-neutral-500 group-hover:text-cyan-400 transition-colors">
                    <span>View Project</span>
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-cyan-500/5 to-transparent" />
        </a>
    );
}
