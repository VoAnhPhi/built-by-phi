import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useContentReady } from "@/hooks/useContentReady";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    slug: "sonaspace",
    title: "SONASPACE",
    category: "INTERIOR E-COMMERCE",
    year: "2025",
    tech: ["REACT 19", "EXPRESS", "MYSQL"],
    image: "/img/project/sonaspace/sonaspace-thumbnail-v2.png",
  },
  {
    id: 2,
    slug: "interface-style-comparison",
    title: "UI STYLE RESEARCH",
    category: "DESIGN RESEARCH TOOL",
    year: "2026",
    tech: ["REACT 19", "TYPESCRIPT", "VITE 6"],
    image:
      "/img/project/interface-style-comparison/interface-style-comparison-mockup.png",
  },
  {
    id: 3,
    slug: "tomatohub",
    title: "TOMATOHUB",
    category: "AI PLATFORM",
    year: "2026",
    tech: ["NEXT.JS", "FASTAPI", "POSTGRESQL"],
    image: "img/project/tomato/tomatohub.png",
  },
  {
    id: 4,
    slug: "cinema-booking-system",
    title: "CINEMA BOOKING SYSTEM",
    category: "WEB APP",
    year: "2024",
    tech: ["REACT", "NODE.JS", "MONGODB"],
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function BrutalWorks() {
  const sectionRef = useRef(null);
  const isContentReady = useContentReady();

  useLayoutEffect(() => {
    if (!isContentReady || !sectionRef.current) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionContext = gsap.context(() => {
        gsap.set([".brutal-works__item", ".brutal-works__title"], {
          clearProps: "transform,opacity",
          opacity: 1,
        });
      }, sectionRef);

      return () => reducedMotionContext.revert();
    }

    const ctx = gsap.context(() => {
      gsap.from(".brutal-works__item", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".brutal-works__list",
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(".brutal-works__title", {
        x: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isContentReady]);

  return (
    <section
      id="works"
      className="brutal-works brutal-section"
      ref={sectionRef}
    >
      <div className="brutal-works__container">
        <div className="brutal-works__header">
          <h2 className="brutal-works__title">
            <span>FEATURED</span>
            <span>PROJECTS</span>
          </h2>
          <span className="brutal-works__count">
            {String(PROJECTS.length).padStart(2, "0")} SELECTED WORKS
          </span>
        </div>

        <div className="brutal-works__list">
          {PROJECTS.map((project) => (
            <article key={project.id} className="brutal-works__item">
              <Link
                to={`/${project.slug}`}
                className="brutal-works__item-image"
              >
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="brutal-works__item-image-overlay">
                  <span>VIEW PROJECT</span>
                </div>
              </Link>

              <div className="brutal-works__item-content">
                <div className="brutal-works__item-heading">
                  <h3 className="brutal-works__item-title">
                    <Link to={`/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <span className="brutal-works__item-year">
                    {project.year}
                  </span>
                </div>

                <p className="brutal-works__item-meta">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.tech.join(" · ")}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
