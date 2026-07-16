import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalContact() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brutal-contact__cta", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            LET'S BUILD
            <br />
            <span className="brutal-contact__title--highlight">SOMETHING</span>
            <br />
            TOGETHER.
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
            <span className="brutal-contact__copyright">© 2024 ANH PHI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
