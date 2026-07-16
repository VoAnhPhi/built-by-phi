import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

/**
 * PageTransition - Hiển thị loading overlay khi chuyển trang
 * Wrap component này quanh Routes để trigger animation mỗi khi pathname thay đổi
 */
export default function PageTransition({ children }) {
    const location = useLocation();
    const overlayRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayLocation, setDisplayLocation] = useState(location);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip animation on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setDisplayLocation(location);
            return;
        }

        // Nếu location thay đổi, trigger transition
        if (location.pathname !== displayLocation.pathname) {
            setIsTransitioning(true);

            // Stop Lenis scroll during transition
            if (window.lenis) {
                window.lenis.stop();
            }

            // Animate overlay in
            gsap.to(overlayRef.current, {
                scaleY: 1,
                duration: 0.4,
                ease: "power1.out",
                onComplete: () => {
                    // Update location để render page mới
                    setDisplayLocation(location);
                    
                    // Scroll về top
                    window.scrollTo(0, 0);
                    if (window.lenis) {
                        window.lenis.scrollTo(0, { immediate: true });
                    }

                    // Short delay rồi animate overlay out
                    gsap.to(overlayRef.current, {
                        scaleY: 0,
                        duration: 0.9,
                        delay: 0.4,
                        ease: "power3.inOut",
                        transformOrigin: "top",
                        onComplete: () => {
                            setIsTransitioning(false);
                            // Resume Lenis
                            if (window.lenis) {
                                window.lenis.start();
                            }
                        },
                    });
                },
            });
        }
    }, [location, displayLocation]);

    return (
        <>
            {/* Transition Overlay */}
            <div
                ref={overlayRef}
                className="page-transition"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0a0a0a",
                    zIndex: 9999,
                    transform: "scaleY(0)",
                    transformOrigin: "bottom",
                    pointerEvents: isTransitioning ? "all" : "none",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#f5f5f0",
                        fontFamily: "'B-vn-Medium', monospace",
                        fontSize: "1.8rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                    }}
                >
                    LOADING
                </div>
            </div>

            {/* Render children với displayLocation */}
            {children}
        </>
    );
}
