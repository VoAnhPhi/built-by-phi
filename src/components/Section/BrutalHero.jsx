import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";

const ThreeScene = lazy(() => import("./Three"));

gsap.registerPlugin(ScrollTrigger);

const SKILLS = ["React", "JavaScript", "SCSS", "GSAP", "Three.js", "REST API"];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "/img/icon/github2.svg",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "/img/icon/link2.svg",
  },
  {
    name: "Email",
    url: "mailto:voanhphi.dev@gmail.com",
    icon: "/img/icon/envelope-at.svg",
  },
];

const ENTRANCE_ELEMENTS = [
  ".brutal-hero__eyebrow",
  ".brutal-hero__role",
  ".brutal-hero__skills",
  ".brutal-hero__social",
  ".brutal-hero__cta",
];

export default function BrutalHero() {
  const heroRef = useRef(null);
  const isContentReady = useContentReady();
  const hasAnimatedRef = useRef(false);
  const [shouldMountThree, setShouldMountThree] = useState(false);

  useEffect(() => {
    // Let the loading UI paint the completed font/image milestones before
    // WebGL shader compilation briefly occupies the main thread.
    const mountTimer = window.setTimeout(() => setShouldMountThree(true), 900);
    return () => window.clearTimeout(mountTimer);
  }, []);

  useLayoutEffect(() => {
    if (!heroRef.current || hasAnimatedRef.current) return undefined;

    // These labels must never inherit or wait for the 3D fade animation.
    gsap.set([".brutal-hero__visual-label", ".brutal-hero__index"], {
      opacity: 1,
      y: 0,
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      gsap.set(".brutal-hero__name-char", {
        yPercent: 0,
        rotateX: -80,
        opacity: 0,
      });
      gsap.set(ENTRANCE_ELEMENTS, { y: 28, opacity: 0 });
      // Fade only the Three.js canvas. Labels and visual UI stay fully opaque.
      gsap.set(".brutal-hero__visual-inner", { opacity: 0, scale: 0.9 });
    }, heroRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!isContentReady || hasAnimatedRef.current || !heroRef.current) {
      return undefined;
    }

    hasAnimatedRef.current = true;
    const heroElement = heroRef.current;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([".brutal-hero__name-char", ...ENTRANCE_ELEMENTS], {
          clearProps: "all",
          opacity: 1,
        });
        gsap.set(".brutal-hero__visual-inner", {
          opacity: 0.46,
          scale: 1,
        });
        return;
      }

      const timeline = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power4.out" },
      });

      timeline
        .to(".brutal-hero__name-char", {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.035,
        })
        .to(
          ".brutal-hero__eyebrow",
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.75",
        )
        .to(
          ".brutal-hero__role",
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.45",
        )
        .to(
          [".brutal-hero__skills", ".brutal-hero__social"],
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          "-=0.35",
        )
        .to(".brutal-hero__cta", { y: 0, opacity: 1, duration: 0.55 }, "-=0.45")
        .to(
          ".brutal-hero__visual-inner",
          {
            opacity: 0.46,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.35)",
          },
          "-=0.75",
        );

      gsap.to(".brutal-hero__name", {
        y: -72,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".brutal-hero__visual-inner", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }, heroElement);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === heroElement ||
          trigger.trigger === heroElement
        ) {
          trigger.kill();
        }
      });
    };
  }, [isContentReady]);

  const splitName = (text) =>
    text.split("").map((char, index) => (
      <span key={`${char}-${index}`} className="brutal-hero__name-char">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section id="top" className="brutal-hero brutal-section" ref={heroRef}>
      <div className="brutal-hero__layout">
        <div className="brutal-hero__content">
          <div className="brutal-hero__intro">
            <p className="brutal-hero__eyebrow">
              Software Engineer <span aria-hidden="true">·</span> Vietnam
            </p>

            <div className="brutal-hero__name-wrapper">
              <h1 className="brutal-hero__name" aria-label="Vo Anh Phi">
                <span className="brutal-hero__name-line">
                  <span className="brutal-hero__name-word">
                    {splitName("Vo")}
                  </span>
                </span>
                <span className="brutal-hero__name-line brutal-hero__name-line--offset">
                  <span className="brutal-hero__name-word">
                    {splitName("Anh")}
                  </span>
                  <span className="brutal-hero__name-word">
                    {splitName("Phi")}
                  </span>
                </span>
              </h1>
            </div>

            <div className="brutal-hero__role">
              <span className="brutal-hero__role-label">Role / 01</span>
              <p className="brutal-hero__role-copy">
                Building expressive digital experiences with code, motion and
                precise systems.
              </p>
            </div>
          </div>

          <figure className="brutal-hero__portrait">
            <img
              src="/img/main/voanhphi-640.webp"
              srcSet="/img/main/voanhphi-320.webp 320w, /img/main/voanhphi-560.webp 560w, /img/main/voanhphi-640.webp 640w, /img/main/voanhphi.webp 1122w"
              sizes="(max-width: 767px) 50vw, (max-width: 1199px) 40vw, 32vw"
              width="1122"
              height="1402"
              alt="Vo Anh Phi playing guitar"
              className="brutal-hero__portrait-image"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="brutal-hero__footer">
            <div className="brutal-hero__details">
              <div className="brutal-hero__skills">
                <span className="brutal-hero__skills-label">Stack</span>
                <div className="brutal-hero__skills-list">
                  {SKILLS.map((skill, index) => (
                    <span key={skill} className="brutal-hero__skills-item">
                      {skill}
                      {index < SKILLS.length - 1 && (
                        <span
                          className="brutal-hero__skills-separator"
                          aria-hidden="true"
                        >
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="brutal-hero__social" aria-label="Social links">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="brutal-hero__social-link"
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={link.name}
                  >
                    <span
                      className="brutal-hero__social-icon"
                      style={{ "--social-icon": `url("${link.icon}")` }}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            <a className="brutal-hero__cta" href="#works">
              <span>Explore work</span>
              <span className="brutal-hero__cta-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="brutal-hero__visual">
          <div className="brutal-hero__visual-grid" aria-hidden="true" />
          <span className="brutal-hero__visual-label">
            Interactive object / move
          </span>
          <span className="brutal-hero__index" aria-hidden="true">
            Portfolio / 2026
          </span>
          <div className="brutal-hero__visual-inner">
            {shouldMountThree && (
              <Suspense fallback={<div className="brutal-hero__visual-frame-3d" />}>
                <ThreeScene />
              </Suspense>
            )}
          </div>

          <div className="brutal-hero__scroll" aria-hidden="true">
            <span className="brutal-hero__scroll-text">Scroll</span>
            <span className="brutal-hero__scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
