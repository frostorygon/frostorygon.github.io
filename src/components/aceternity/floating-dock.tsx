
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef, useState } from "react";


// Smooth scroll handler for anchor links

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
    vertical = false,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    desktopClassName?: string;
    mobileClassName?: string;
    vertical?: boolean;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} vertical={vertical} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <a
                                    href={item.href}
                                    key={item.title}
                                    onClick={(e) => {
                                        if (item.href.startsWith('#')) {
                                            e.preventDefault();
                                            const target = item.href === '#' ? document.body : document.querySelector(item.href);
                                            target?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center"
                                >
                                    <div className="h-4 w-4">{item.icon}</div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
    vertical = false,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
    vertical?: boolean;
}) => {
    let mouseX = useMotionValue(Infinity);
    let mouseY = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => {
                mouseX.set(e.pageX);
                mouseY.set(e.pageY);
            }}
            onMouseLeave={() => {
                mouseX.set(Infinity);
                mouseY.set(Infinity);
            }}
            className={cn(
                "mx-auto hidden md:flex gap-3 items-center rounded-2xl bg-neutral-900/90 backdrop-blur-sm p-3",
                vertical ? "flex-col" : "flex-row",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer
                    mouseX={mouseX}
                    mouseY={mouseY}
                    key={item.title}
                    vertical={vertical}
                    {...item}
                />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    mouseY,
    title,
    icon,
    href,
    vertical = false,
}: {
    mouseX: MotionValue;
    mouseY: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    vertical?: boolean;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(vertical ? mouseY : mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
        if (vertical) {
            return val - bounds.y - bounds.height / 2;
        }
        return val - bounds.x - bounds.width / 2;
    });

    let sizeTransform = useTransform(distance, [-100, 0, 100], [36, 56, 36]);

    let size = useSpring(sizeTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={href}
            onClick={(e) => {
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = href === '#' ? document.body : document.querySelector(href);
                    target?.scrollIntoView({ behavior: 'smooth' });
                }
            }}
        >
            <motion.div
                ref={ref}
                style={{ width: size, height: size }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-neutral-800 flex items-center justify-center relative"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, x: vertical ? -10 : 0, y: vertical ? 0 : 10 }}
                            animate={{ opacity: 1, x: vertical ? -10 : "-50%", y: vertical ? "-50%" : 0 }}
                            exit={{ opacity: 0, x: vertical ? -5 : 0, y: vertical ? 0 : 5 }}
                            className={cn(
                                "px-2 py-0.5 whitespace-pre rounded-md bg-neutral-800 border border-neutral-700 text-white absolute w-fit text-xs",
                                vertical
                                    ? "right-full mr-2 top-1/2 -translate-y-1/2"
                                    : "left-1/2 -translate-x-1/2 -top-8"
                            )}
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: sizeTransform, height: sizeTransform }}
                    className="flex items-center justify-center p-2"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </a>
    );
}
