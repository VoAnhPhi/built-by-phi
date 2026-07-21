import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useContentReady } from "@/hooks/useContentReady";
import { getProjectsArray } from "@/data/projects";
import { MOTION, prefersReducedMotion } from "@/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_SLUGS = [
  "sonaspace",
  "interface-style-comparison",
  "tomatohub",
  "cinema-booking-system",
];

const THUMBNAILS = {
  sonaspace: "/img/project/sonaspace/sonaspace-thumbnail-v2.png",
  "interface-style-comparison":
    "/img/project/interface-style-comparison/interface-style-comparison-mockup.png",
  tomatohub: "/img/project/tomato/tomatohub.png",
};

const ALL_PROJECTS = getProjectsArray();
const PROJECTS = FEATURED_SLUGS.map((slug) =>
  ALL_PROJECTS.find((project) => project.slug === slug),
)
  .filter(Boolean)
  .map((project) => ({
    ...project,
    image: THUMBNAILS[project.slug] ?? project.mainImage,
    tech: project.technologies.slice(0, 3),
  }));

export default function BrutalWorks() {
  const sectionRef = useRef(null);
  const isContentReady = useContentReady();

  useLayoutEffect(() => {
    if (!isContentReady || !sectionRef.current) return undefined;

    if (prefersReducedMotion()) {
      const reducedMotionContext = gsap.context(() => {
        gsap.set(
          [
            ".brutal-works__item",
            ".brutal-works__title",
            ".brutal-works__item-image",
            ".brutal-works__item-image img",
          ],
          { clearProps: "transform,opacity,clipPath", opacity: 1 },
        );
      }, sectionRef);

      return () => reducedMotionContext.revert();
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".brutal-works__item").forEach((item, index) => {
        const image = item.querySelector(".brutal-works__item-image");
        const imageElement = item.querySelector("img");
        const content = item.querySelector(".brutal-works__item-content");

        gsap.fromTo(
          image,
          {
            clipPath:
              index % 2 === 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: MOTION.duration.scene,
            ease: MOTION.ease.enter,
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.from(imageElement, {
          scale: 1.12,
          duration: 1.3,
          ease: MOTION.ease.soft,
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(content, {
          x: index % 2 === 0 ? MOTION.distance.medium : -MOTION.distance.medium,
          y: MOTION.distance.small,
          opacity: 0,
          duration: MOTION.duration.reveal,
          ease: MOTION.ease.enter,
          scrollTrigger: {
            trigger: item,
            start: "top 76%",
            once: true,
          },
        });

        gsap.to(imageElement, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
          },
        });
      });

      gsap.to(".brutal-works__title", {
        xPercent: 7,
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
                  <span aria-hidden="true">/</span>
                  <span>{project.tech.join(" / ")}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
