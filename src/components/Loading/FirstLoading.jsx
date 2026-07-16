import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Preload images helper
const preloadImages = (urls) => {
    return Promise.all(
        urls.map(
            (url) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(url);
                    img.onerror = () => resolve(url); // resolve anyway to not block
                    img.src = url;
                })
        )
    );
};

// Wait for fonts to be ready
const waitForFonts = () => {
    if (document.fonts && document.fonts.ready) {
        return document.fonts.ready;
    }
    return Promise.resolve();
};

/**
 * phase: "loading" | "intro"
 * isFirstVisit: boolean - có phải lần đầu vào trang không
 * onDismiss: callback khi user dismiss overlay
 */
const FirstLoading = ({ phase, isFirstVisit, onDismiss }) => {
    const overlayRef = useRef(null);
    const firstLoadingRef = useRef(null);
    const githubRef = useRef(null);
    const linkedinRef = useRef(null);
    const welcomeRef = useRef(null);
    const portfolioRef = useRef(null);
    
    // Track if assets are ready for intro animation
    const [assetsReady, setAssetsReady] = useState(false);
    const animationStartedRef = useRef(false);

    const config = {
        wheelEventDelay: 2500,
        iconGithubDelay: 0.5,
        iconLinkedinDelay: 0.9,
        textAnimationDelay: 2000,
    };

    const addNoScroll = () => {
        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");
    };
    const removeNoScroll = () => {
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
    };

    // chặn mọi cuộn khi overlay đang mở
    const preventScroll = (e) => {
        e.preventDefault();
    };

    // drop-bounce y hệt code cũ
    const dropBounceToCenter = (target, midX, rotationDirection, delay) => {
        return gsap.to(target, {
            opacity: 1,
            x: midX,
            y: 0,
            rotate: rotationDirection * 360,
            duration: 0.8,
            ease: "power2.in",
            delay,
            onComplete: () => {
                gsap.to(target, {
                    y: -40,
                    rotate: rotationDirection * 180,
                    duration: 0.1,
                    ease: "power1.out",
                    onComplete: () => {
                        gsap.to(target, {
                            y: 0,
                            duration: 0.2,
                            ease: "power1.in",
                            onComplete: () => {
                                gsap.to(target, {
                                    x: 0,
                                    y: -30,
                                    rotate: rotationDirection * 720,
                                    duration: 0.6,
                                    ease: "power1.out",
                                    onComplete: () => {
                                        gsap.to(target, {
                                            y: 0,
                                            duration: 0.3,
                                            ease: "back.out(1.7)",
                                        });
                                    },
                                });
                            },
                        });
                    },
                });
            },
        });
    };

    // consume lần cuộn/chạm đầu tiên để tắt overlay, KHÔNG scroll nền
    const installDismissHandlers = () => {
        const handleWheelOnce = (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOverlay();
            window.removeEventListener("wheel", handleWheelOnce, true);
            window.removeEventListener("touchstart", handleTouchOnce, true);
        };
        const handleTouchOnce = (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOverlay();
            window.removeEventListener("wheel", handleWheelOnce, true);
            window.removeEventListener("touchstart", handleTouchOnce, true);
        };

        // remove chặn cứng, gắn handler "one-shot" ở capture để đi trước Lenis
        window.removeEventListener("wheel", preventScroll, { capture: true });
        window.addEventListener("wheel", handleWheelOnce, { passive: false, capture: true });
        window.addEventListener("touchstart", handleTouchOnce, { passive: false, capture: true });
    };

    const dismissOverlay = () => {
        // đảm bảo Lenis chưa chạy khi dismiss (nếu có)
        try { window.lenis?.stop(); } catch { }

        // Fade out intro content nếu đang ở phase intro
        if (firstLoadingRef.current && phase === "intro") {
            gsap.to(firstLoadingRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(firstLoadingRef.current, { display: "none" });
                },
            });
        }

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(overlayRef.current, { visibility: "hidden" });
                removeNoScroll();

                // Scroll về top
                window.scrollTo(0, 0);

                // delay 1 tick rồi mới start Lenis để đảm bảo wheel đầu đã bị consume
                setTimeout(() => {
                    try { window.lenis?.start(); } catch { }
                    onDismiss?.();
                }, 50);
            },
        });
    };

    // Handler để dismiss khi click vào overlay
    const handleOverlayClick = () => {
        // Chỉ cho phép click-to-dismiss khi đang ở phase intro
        if (phase === "intro") {
            dismissOverlay();
        }
    };

    // Initial setup - chỉ chạy 1 lần khi mount
    useEffect(() => {
        // Overlay luôn có từ LOADING tới khi user dismiss
        addNoScroll();
        gsap.set(overlayRef.current, { opacity: 1, visibility: "visible" });

        // dừng lenis trong giai đoạn overlay
        try { window.lenis?.stop(); } catch { }

        // khóa cuộn hoàn toàn cho tới khi mình cho phép
        window.addEventListener("wheel", preventScroll, { passive: false, capture: true });

        const handleKeydown = (e) => { if (e.key === " ") e.preventDefault(); };
        document.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("wheel", preventScroll, { capture: true });
            document.removeEventListener("keydown", handleKeydown);
        };
    }, []); // Chỉ chạy 1 lần khi mount

    // Preload assets khi component mount (nếu isFirstVisit)
    useEffect(() => {
        if (!isFirstVisit) {
            setAssetsReady(true);
            return;
        }

        const iconUrls = [
            "/img/icon/github-icon.svg",
            "/img/icon/linkedin-icon.svg",
        ];

        // Preload cả icons và fonts cùng lúc
        Promise.all([preloadImages(iconUrls), waitForFonts()])
            .then(() => {
                setAssetsReady(true);
            })
            .catch(() => {
                // Fallback: vẫn set ready để không block
                setAssetsReady(true);
            });
    }, [isFirstVisit]);

    // Handle phase transitions - chạy khi phase thay đổi VÀ assets đã ready
    useEffect(() => {
        // Chỉ animate khi: phase là intro, là first visit, assets đã ready, và chưa animate
        if (phase === "intro" && isFirstVisit && assetsReady && !animationStartedRef.current) {
            animationStartedRef.current = true;
            
            // Show intro content container
            gsap.set(firstLoadingRef.current, { display: "flex", opacity: 1 });

            // Setup initial states cho intro animation - thêm will-change để tối ưu GPU
            gsap.set(welcomeRef.current, { opacity: 0, x: -100, willChange: "transform, opacity" });
            gsap.set(portfolioRef.current, { opacity: 0, x: 100, willChange: "transform, opacity" });
            gsap.set(githubRef.current, { opacity: 0, x: -300, y: -300, rotate: 0, scale: 1, willChange: "transform, opacity" });
            gsap.set(linkedinRef.current, { opacity: 0, x: 300, y: -300, rotate: 0, scale: 1, willChange: "transform, opacity" });

            // Delay nhỏ để đảm bảo CSS đã apply xong
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Animate icons dropping
                    dropBounceToCenter(githubRef.current, -300, -1, config.iconGithubDelay);
                    dropBounceToCenter(linkedinRef.current, 300, 1, config.iconLinkedinDelay);

                    // Animate text
                    const t1 = setTimeout(() => {
                        gsap.to(welcomeRef.current, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
                    }, config.textAnimationDelay);

                    const t2 = setTimeout(() => {
                        gsap.to(portfolioRef.current, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
                    }, config.textAnimationDelay);

                    // Cho phép user dismiss sau khi animation xong
                    const allowTimer = setTimeout(() => {
                        installDismissHandlers();
                    }, config.wheelEventDelay);
                });
            });

            // Cleanup nằm ngoài requestAnimationFrame nên cần handle khác
        }
    }, [phase, isFirstVisit, assetsReady]);

    return (
        <>
            <div
                className="body-overlay"
                ref={overlayRef}
                onClick={handleOverlayClick}
                style={{ cursor: phase === "intro" ? "pointer" : "default" }}
            />
            {isFirstVisit && (
                <section className="first_loading" ref={firstLoadingRef} style={{ opacity: 0, display: "none" }}>
                    <div className="container">
                        <div className="first_loading-content">
                            <div className="first_loading-content-icon">
                                <a href="https://github.com/VoAnhPhi" className="icon-github" ref={githubRef}>
                                    <img 
                                        src="/img/icon/github2.svg" 
                                        alt="GitHub" 
                                        style={{ willChange: "transform" }}
                                        loading="eager"
                                        fill="currentColor"
                                        decoding="sync"
                                    />
                                </a>
                                <a href="https://www.linkedin.com/" className="icon-linkedin" ref={linkedinRef}>
                                    <img 
                                        src="/img/icon/link2.svg" 
                                        alt="LinkedIn" 
                                        style={{ willChange: "transform" }}
                                        loading="eager"
                                        decoding="sync"
                                    />
                                </a>
                            </div>
                            <div className="first_loading-content-text">
                                <h1 className="welcome" ref={welcomeRef}>welcome to my</h1>
                                <span className="portfolio" ref={portfolioRef}>portfolio website</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default FirstLoading;
