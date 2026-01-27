
import React from "react";
const Globe = React.lazy(() => import("@/components/aceternity/globe").then((mod) => ({ default: mod.Globe })));

export function Contact() {
    return (
        <footer id="contact" className="bg-neutral-950 border-t border-neutral-900 py-8 md:py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-2 relative z-10">
                <p className="text-neutral-500 text-sm">FrostOrygon © 2026. Creation is the human experience.</p>
            </div>

            <div className="flex items-center justify-center w-full h-full absolute inset-0 z-0 pointer-events-none opacity-50">
                <React.Suspense fallback={<div className="w-[400px] h-[400px] rounded-full bg-neutral-900/20" />}>
                    <Globe />
                </React.Suspense>
            </div>
        </footer>
    );
}
