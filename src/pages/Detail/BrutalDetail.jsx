import React, { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalDetail() {
  const sectionRef = useRef(null);
  const { slug } = useParams();

  // Get project data by slug (default to first project if no slug or invalid slug)
  const project = getProjectBySlug(slug);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    // Scroll native về top
    window.scrollTo(0, 0);

    // Scroll Lenis về top nếu có
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }

    // Refresh ScrollTrigger để recalculate positions
    ScrollTrigger.refresh(true);
  }, [slug]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".brutal-detail__hero-index", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
      });

      gsap.from(".brutal-detail__hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });

      gsap.from(".brutal-detail__hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
      });

      gsap.from(".brutal-detail__hero-meta-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
      });

      gsap.from(".brutal-detail__hero-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });

      // Sections scroll animations
      gsap.utils.toArray(".brutal-detail__section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Gallery items
      gsap.from(".brutal-detail__gallery-item", {
        scrollTrigger: {
          trigger: ".brutal-detail__gallery",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
      });

      // Feature items
      gsap.from(".brutal-detail__feature", {
        scrollTrigger: {
          trigger: ".brutal-detail__features",
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
      });

      // Tech tags
      gsap.from(".brutal-detail__tech-tag", {
        scrollTrigger: {
          trigger: ".brutal-detail__tech",
          start: "top 85%",
        },
        scale: 0.8,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [slug]);

  return (
    <main className="brutal-detail" ref={sectionRef}>
      {/* ============ HERO SECTION ============ */}
      <section className="brutal-detail__hero">
        <div className="brutal-detail__hero-content">
          {/* Left - Info */}
          <div className="brutal-detail__hero-info">
            <div className="brutal-detail__hero-header">
              <span className="brutal-detail__hero-index">{project.index}</span>
              <span className="brutal-detail__hero-category">
                {project.category}
              </span>
              <span className="brutal-detail__hero-year">{project.year}</span>
            </div>

            <h1 className="brutal-detail__hero-title">{project.title}</h1>

            <p className="brutal-detail__hero-subtitle">{project.subtitle}</p>

            <div className="brutal-detail__hero-meta">
              <div className="brutal-detail__hero-meta-item">
                <span className="brutal-detail__hero-meta-label">ROLE</span>
                <span className="brutal-detail__hero-meta-value">
                  {project.role}
                </span>
              </div>
              <div className="brutal-detail__hero-meta-item">
                <span className="brutal-detail__hero-meta-label">CLIENT</span>
                <span className="brutal-detail__hero-meta-value">
                  {project.client}
                </span>
              </div>
              <div className="brutal-detail__hero-meta-item">
                <span className="brutal-detail__hero-meta-label">DURATION</span>
                <span className="brutal-detail__hero-meta-value">
                  {project.duration}
                </span>
              </div>
            </div>

            <div className="brutal-detail__hero-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-detail__hero-btn brutal-detail__hero-btn--primary"
                >
                  VIEW LIVE →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-detail__hero-btn brutal-detail__hero-btn--secondary"
                >
                  SOURCE CODE
                </a>
              )}
              {project.githubUrls?.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-detail__hero-btn brutal-detail__hero-btn--secondary"
                >
                  {source.label}
                </a>
              ))}
              {project.apiUrl && (
                <a
                  href={project.apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-detail__hero-btn brutal-detail__hero-btn--secondary"
                >
                  API STATUS
                </a>
              )}
            </div>
          </div>

          {/* Right - Main Image */}
          <div className="brutal-detail__hero-visual">
            <div className="brutal-detail__hero-image">
              <img src={project.mainImage} alt={project.title} />
            </div>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="brutal-detail__hero-accent"></div>
      </section>

      {/* ============ OVERVIEW SECTION ============ */}
      <section className="brutal-detail__section brutal-detail__overview">
        <div className="brutal-detail__container">
          <div className="brutal-detail__section-header">
            <span className="brutal-detail__section-index">01</span>
            <h2 className="brutal-detail__section-title">OVERVIEW</h2>
          </div>

          <div className="brutal-detail__overview-content">
            <p className="brutal-detail__overview-text">{project.overview}</p>
          </div>
        </div>
      </section>

      {/* ============ TECH STACK SECTION ============ */}
      <section className="brutal-detail__section brutal-detail__tech">
        <div className="brutal-detail__container">
          <div className="brutal-detail__section-header">
            <span className="brutal-detail__section-index">02</span>
            <h2 className="brutal-detail__section-title">TECH STACK</h2>
          </div>

          <div className="brutal-detail__tech-list">
            {project.technologies.map((tech, index) => (
              <span key={index} className="brutal-detail__tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHALLENGE & SOLUTION ============ */}
      <section className="brutal-detail__section brutal-detail__problem">
        <div className="brutal-detail__container">
          <div className="brutal-detail__problem-grid">
            <div className="brutal-detail__problem-block">
              <div className="brutal-detail__section-header">
                <span className="brutal-detail__section-index">03</span>
                <h2 className="brutal-detail__section-title">THE CHALLENGE</h2>
              </div>
              <p className="brutal-detail__problem-text">{project.challenge}</p>
            </div>

            <div className="brutal-detail__problem-block brutal-detail__problem-block--solution">
              <div className="brutal-detail__section-header">
                <span className="brutal-detail__section-index">04</span>
                <h2 className="brutal-detail__section-title">THE SOLUTION</h2>
              </div>
              <p className="brutal-detail__problem-text">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="brutal-detail__section brutal-detail__features">
        <div className="brutal-detail__container">
          <div className="brutal-detail__section-header">
            <span className="brutal-detail__section-index">05</span>
            <h2 className="brutal-detail__section-title">KEY FEATURES</h2>
          </div>

          <div className="brutal-detail__features-list">
            {project.features.map((feature, index) => (
              <div key={index} className="brutal-detail__feature">
                <span className="brutal-detail__feature-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="brutal-detail__feature-content">
                  <h3 className="brutal-detail__feature-title">
                    {feature.title}
                  </h3>
                  <p className="brutal-detail__feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY SECTION ============ */}
      <section className="brutal-detail__section brutal-detail__gallery-section">
        <div className="brutal-detail__container brutal-detail__container--full">
          <div className="brutal-detail__section-header">
            <span className="brutal-detail__section-index">06</span>
            <h2 className="brutal-detail__section-title">VISUAL GALLERY</h2>
          </div>

          <div className="brutal-detail__gallery">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                className={`brutal-detail__gallery-item brutal-detail__gallery-item--${index === 0 ? "large" : "small"}`}
              >
                <img
                  src={image}
                  alt={`${project.title} - Screenshot ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NAVIGATION SECTION ============ */}
      <section className="brutal-detail__nav">
        <div className="brutal-detail__container">
          <div className="brutal-detail__nav-inner">
            <Link to="/" className="brutal-detail__nav-link">
              <span className="brutal-detail__nav-arrow">←</span>
              <span className="brutal-detail__nav-text">BACK TO WORKS</span>
            </Link>

            <div className="brutal-detail__nav-cta">
              <span className="brutal-detail__nav-cta-label">
                INTERESTED IN WORKING TOGETHER?
              </span>
              <a
                href="mailto:voanhphi.dev@gmail.com"
                className="brutal-detail__nav-cta-link"
              >
                GET IN TOUCH →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
