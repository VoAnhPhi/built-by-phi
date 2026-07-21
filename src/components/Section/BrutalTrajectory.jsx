import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";
import { MOTION, prefersReducedMotion } from "@/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalTrajectory() {
  const sectionRef = useRef(null);
  const isContentReady = useContentReady();

  useLayoutEffect(() => {
    if (!isContentReady || !sectionRef.current) return undefined;

    if (prefersReducedMotion()) {
      const reducedContext = gsap.context(() => {
        gsap.set(
          [
            ".brutal-trajectory__phase",
            ".brutal-trajectory__headline-line",
            ".brutal-trajectory__footer",
          ],
          { clearProps: "transform,opacity", opacity: 1 },
        );
        gsap.set(".brutal-trajectory__line", {
          clearProps: "transform",
        });
      }, sectionRef);
      return () => reducedContext.revert();
    }

    const context = gsap.context(() => {
      gsap.set(".brutal-trajectory__line", { scaleX: 0 });

      gsap.to(".brutal-trajectory__line", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".brutal-trajectory__content",
          start: "top 72%",
          end: "bottom 45%",
          scrub: 0.8,
        },
      });

      gsap.utils
        .toArray(".brutal-trajectory__headline-line")
        .forEach((line, index) => {
          gsap.fromTo(
            line,
            { xPercent: index === 0 ? -13 : 13, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: MOTION.duration.scene,
              ease: MOTION.ease.enter,
              scrollTrigger: {
                trigger: ".brutal-trajectory__statement",
                start: "top 80%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray(".brutal-trajectory__phase")
        .forEach((phase, index) => {
          gsap.from(phase, {
            y: MOTION.distance.large,
            x: index === 1 ? 0 : index === 0 ? -28 : 28,
            opacity: 0,
            duration: MOTION.duration.reveal,
            ease: MOTION.ease.enter,
            scrollTrigger: {
              trigger: phase,
              start: "top 82%",
              once: true,
            },
          });
        });

      gsap.from(".brutal-trajectory__footer", {
        y: 28,
        opacity: 0,
        duration: MOTION.duration.reveal,
        ease: MOTION.ease.soft,
        scrollTrigger: {
          trigger: ".brutal-trajectory__footer",
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [isContentReady]);

  return (
    <section
      id="trajectory"
      className="brutal-trajectory brutal-section"
      ref={sectionRef}
    >
      <div className="brutal-trajectory__container">
        {/* Main content */}
        <div className="brutal-trajectory__content">
          {/* The statement */}
          <div className="brutal-trajectory__statement">
            <h2 className="brutal-trajectory__headline">
              <span className="brutal-trajectory__headline-line">
                FROM CODE
              </span>
              <span className="brutal-trajectory__headline-line brutal-trajectory__headline-line--accent">
                TO PRODUCT
              </span>
            </h2>
          </div>

          {/* Horizontal line - the trajectory */}
          <div className="brutal-trajectory__line" aria-hidden="true"></div>

          {/* Three phases */}
          <div className="brutal-trajectory__phases">
            <article className="brutal-trajectory__phase brutal-trajectory__phase--01">
              <span className="brutal-trajectory__phase-index">01</span>
              <h3 className="brutal-trajectory__phase-title">UNDERSTAND</h3>
              <p className="brutal-trajectory__phase-desc">
                Real user problems.
                <br />
                Product requirements.
                <br />
                Business context.
              </p>
            </article>

            <article className="brutal-trajectory__phase brutal-trajectory__phase--02">
              <span className="brutal-trajectory__phase-index">02</span>
              <h3 className="brutal-trajectory__phase-title">BUILD</h3>
              <p className="brutal-trajectory__phase-desc">
                Reliable systems. <br /> Clean architecture. <br /> Scalable
                foundations.
              </p>
            </article>

            <article className="brutal-trajectory__phase brutal-trajectory__phase--03">
              <span className="brutal-trajectory__phase-index">03</span>
              <h3 className="brutal-trajectory__phase-title">OWN</h3>
              <p className="brutal-trajectory__phase-desc">
                Outcomes over outputs.
                <br />
                User value first.
                <br />
                End-to-end responsibility.
              </p>
            </article>
          </div>

          {/* Footer note */}
          <div className="brutal-trajectory__footer">
            <p className="brutal-trajectory__note">
              Good engineering is not only about writing code. It is about
              understanding the problem and owning the outcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { BrutalTrajectory };
