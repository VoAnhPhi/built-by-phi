// SmoothScrollProvider.jsx
import React, { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

// Context để expose lenis instance
const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Tránh xung đột smooth native - force override CSS
        document.documentElement.style.setProperty("scroll-behavior", "auto", "important");
        document.body.style.setProperty("scroll-behavior", "auto", "important");

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lowPowerDevice =
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
            (navigator.deviceMemory && navigator.deviceMemory <= 4);

        // Native scrolling is cheaper and more reliable on low-power hardware.
        if (reduceMotion || lowPowerDevice) {
            window.lenis = null;
            return undefined;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothTouch: false, // Tắt smooth trên touch device để tránh lag
            touchMultiplier: 2,
            infinite: false,
            orientation: "vertical",
            gestureOrientation: "vertical",
            normalizeWheel: true,
            wheelMultiplier: 1,
        });
        lenisRef.current = lenis;
        
        // Expose lenis instance ra window để các component có thể access
        window.lenis = lenis;

        // Sync Lenis với ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Phát custom event mỗi lần Lenis scroll, kèm velocity
        const onLenisScroll = (e) => {
            window.dispatchEvent(
                new CustomEvent("lenis-scroll", {
                    detail: { velocity: e.velocity, scroll: e.scroll, progress: e.progress },
                })
            );
        };
        lenis.on("scroll", onLenisScroll);

        // Chạy Lenis theo GSAP ticker (đồng bộ với animations)
        const rafCallback = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);

        // Cấu hình ScrollTrigger để sử dụng Lenis
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                return arguments.length
                    ? lenis.scrollTo(value, { immediate: true })
                    : lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
        });

        // Refresh ScrollTrigger sau khi setup xong
        ScrollTrigger.refresh();

        // Cleanup
        return () => {
            gsap.ticker.remove(rafCallback);
            lenis.off("scroll", onLenisScroll);
            lenis.destroy();
            lenisRef.current = null;
            window.lenis = null; // Cleanup window reference
            ScrollTrigger.clearScrollMemory();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}
