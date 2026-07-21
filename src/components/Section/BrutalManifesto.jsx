import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";
import { MOTION, prefersReducedMotion } from "@/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "Fintech Products",
  "Real Estate Platforms",
  "SaaS Applications",
  "Product Requirements",
  "Responsive Interfaces",
  "Motion & Interaction",
  "State Management",
  "RESTful API Development",
  "Database Design",
  "Frontend-Backend Integration",
  "System Architecture",
  "AI-Powered Features",
  "Full-Stack Engineering",
];

export default function BrutalManifesto() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const isContentReady = useContentReady();

  useLayoutEffect(() => {
    if (!isContentReady || !sectionRef.current) return undefined;

    if (prefersReducedMotion()) {
      const reducedContext = gsap.context(() => {
        gsap.set(
          [
            ".brutal-manifesto__line",
            ".brutal-manifesto__description",
            ".brutal-manifesto__stat",
          ],
          { clearProps: "transform,opacity", opacity: 1 },
        );
      }, sectionRef);
      return () => reducedContext.revert();
    }

    let marqueeTween;
    const context = gsap.context(() => {
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".brutal-manifesto__content",
          start: "top 78%",
          once: true,
        },
        defaults: { ease: MOTION.ease.enter },
      });

      reveal
        .from(".brutal-manifesto__line", {
          yPercent: 115,
          rotate: 1.5,
          opacity: 0,
          duration: MOTION.duration.reveal,
          stagger: 0.085,
        })
        .from(
          ".brutal-manifesto__description",
          { y: 32, opacity: 0, duration: MOTION.duration.normal },
          "-=0.36",
        )
        .from(
          ".brutal-manifesto__stat",
          {
            y: 28,
            opacity: 0,
            duration: MOTION.duration.normal,
            stagger: 0.08,
          },
          "-=0.25",
        );

      gsap.utils.toArray(".brutal-manifesto__line").forEach((line, index) => {
        gsap.to(line, {
          xPercent: index === 1 ? 7 : -5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });

      marqueeTween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 48,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    const handleLenisScroll = (event) => {
      if (!marqueeTween) return;
      const speed = gsap.utils.clamp(
        1,
        3.2,
        1 + Math.abs(event.detail?.velocity ?? 0) * 0.08,
      );
      gsap.to(marqueeTween, {
        timeScale: speed,
        duration: 0.18,
        overwrite: true,
        onComplete: () => {
          gsap.to(marqueeTween, { timeScale: 1, duration: 0.7 });
        },
      });
    };

    window.addEventListener("lenis-scroll", handleLenisScroll);
    return () => {
      window.removeEventListener("lenis-scroll", handleLenisScroll);
      context.revert();
    };
  }, [isContentReady]);

  return (
    <section
      id="manifesto"
      className="brutal-manifesto brutal-section"
      ref={sectionRef}
    >
      <div className="brutal-manifesto__container">
        {/* Main content - overlapping text blocks */}
        <div className="brutal-manifesto__content">
          <div className="brutal-manifesto__text">
            <p className="brutal-manifesto__line brutal-manifesto__line--large">
              I BUILD
            </p>
            <p className="brutal-manifesto__line brutal-manifesto__line--highlight">
              DIGITAL PRODUCTS
            </p>
            <p className="brutal-manifesto__line brutal-manifesto__line--large">
              THAT STAND OUT.
            </p>
          </div>

          <div className="brutal-manifesto__description">
            <p className="brutal-manifesto__desc-text">
              Purpose-led products built with solid engineering and thoughtful
              interfaces.
            </p>
          </div>
        </div>

        {/* Stats - raw, offset */}
        <div className="brutal-manifesto__stats">
          <div className="brutal-manifesto__stat">
            <span className="brutal-manifesto__stat-value">1+</span>
            <span className="brutal-manifesto__stat-label">
              YEARS OF EXPERIENCE
            </span>
          </div>
          <div className="brutal-manifesto__stat">
            <span className="brutal-manifesto__stat-value">5+</span>
            <span className="brutal-manifesto__stat-label">
              PROJECTS SHIPPED
            </span>
          </div>
          <div className="brutal-manifesto__stat">
            <span className="brutal-manifesto__stat-value">∞</span>
            <span className="brutal-manifesto__stat-label">CURIOSITY</span>
          </div>
        </div>

        <div
          className="brutal-manifesto__marquee"
          role="region"
          aria-label={`Areas of expertise: ${MARQUEE_ITEMS.join(", ")}`}
        >
          <div
            className="brutal-manifesto__marquee-track"
            ref={marqueeRef}
            aria-hidden="true"
          >
            {[0, 1].map((groupIndex) => (
              <div className="brutal-manifesto__marquee-group" key={groupIndex}>
                {MARQUEE_ITEMS.map((item) => (
                  <span className="brutal-manifesto__marquee-item" key={item}>
                    <i>◆</i>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
