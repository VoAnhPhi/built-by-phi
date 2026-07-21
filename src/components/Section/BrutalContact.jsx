import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";
import { MOTION, prefersReducedMotion } from "@/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalContact() {
  const sectionRef = useRef(null);
  const isContentReady = useContentReady();

  useLayoutEffect(() => {
    if (!isContentReady || !sectionRef.current) return undefined;

    if (prefersReducedMotion()) {
      const reducedMotionContext = gsap.context(() => {
        gsap.set(
          [
            ".brutal-contact__title-line > span",
            ".brutal-contact__email",
            ".brutal-contact__footer",
          ],
          {
            clearProps: "transform,opacity",
            opacity: 1,
          },
        );
      }, sectionRef);

      return () => reducedMotionContext.revert();
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: MOTION.ease.enter },
      });

      timeline
        .from(".brutal-contact__title-line > span", {
          yPercent: 112,
          rotate: 1.2,
          duration: MOTION.duration.scene,
          stagger: 0.09,
        })
        .from(
          ".brutal-contact__email",
          { y: 28, opacity: 0, duration: MOTION.duration.reveal },
          "-=0.54",
        )
        .from(
          ".brutal-contact__footer",
          { y: 22, opacity: 0, duration: MOTION.duration.normal },
          "-=0.38",
        );

      gsap.to(".brutal-contact__title", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isContentReady]);

  return (
    <section
      id="contact"
      className="brutal-contact brutal-section brutal-section--no-border"
      ref={sectionRef}
    >
      <div className="brutal-contact__inner">
        {/* Main CTA */}
        <div className="brutal-contact__cta">
          <h2 className="brutal-contact__title">
            <span className="brutal-contact__title-line">
              <span>LET'S BUILD</span>
            </span>
            <span className="brutal-contact__title-line">
              <span className="brutal-contact__title--highlight">
                SOMETHING
              </span>
            </span>
            <span className="brutal-contact__title-line">
              <span>TOGETHER.</span>
            </span>
          </h2>

          <a
            href="mailto:voanhphi.dev@gmail.com"
            className="brutal-contact__email"
          >
            voanhphi.dev@gmail.com
          </a>
        </div>

        {/* Footer info */}
        <div className="brutal-contact__footer">
          <div className="brutal-contact__footer-left">
            <span className="brutal-contact__location">VIETNAM / REMOTE</span>
            <span className="brutal-contact__availability">
              <span className="brutal-contact__availability-dot" />
              AVAILABLE FOR WORK
            </span>
          </div>

          <div className="brutal-contact__footer-right">
            <div className="brutal-contact__social" aria-label="Social links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img src="/img/icon/github2.svg" alt="" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/img/icon/link2.svg" alt="" aria-hidden="true" />
              </a>
            </div>
            <span className="brutal-contact__copyright">© 2026 ANH PHI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
