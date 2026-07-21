import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "manifesto", label: "MANIFESTO" },
  { id: "works", label: "WORKS" },
  { id: "trajectory", label: "TRAJECTORY" },
  { id: "contact", label: "CONTACT" },
];

export default function BrutalHeader() {
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const triggers = [];
    let wasScrolled = window.scrollY > 100;
    setScrolled(wasScrolled);

    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const nextScrolled = self.scroll() > 100;
          if (nextScrolled !== wasScrolled) {
            wasScrolled = nextScrolled;
            setScrolled(nextScrolled);
          }

          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress });
          }
        },
      }),
    );

    NAV_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id),
        }),
      );
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);

    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis && !prefersReducedMotion()) {
        window.lenis.scrollTo(el, { offset: -72, duration: 1.05 });
      } else {
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`brutal-header ${scrolled ? "brutal-header--scrolled" : ""}`}
        role="banner"
      >
        <div className="brutal-header__inner">
          {/* Logo */}
          <a
            href="#top"
            className="brutal-header__logo"
            aria-label="Back to top"
          >
            <span className="brutal-header__logo-text">VP</span>
            <span className="brutal-header__logo-dot" aria-hidden="true" />
          </a>

          {/* Desktop Nav */}
          <nav
            className="brutal-header__nav"
            role="navigation"
            aria-label="Main"
          >
            <ul className="brutal-header__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="brutal-header__nav-item">
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`brutal-header__nav-link ${activeSection === item.id ? "brutal-header__nav-link--active" : ""}`}
                    aria-current={
                      activeSection === item.id ? "location" : undefined
                    }
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Status indicator */}
          <div className="brutal-header__status">
            <span className="brutal-header__status-dot" />
            <span className="brutal-header__status-text">AVAILABLE</span>
          </div>

          {/* Mobile toggle */}
          <button
            className={`brutal-header__toggle ${isOpen ? "brutal-header__toggle--active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="brutal-header__toggle-bar" />
            <span className="brutal-header__toggle-bar" />
          </button>
        </div>
        <span className="brutal-header__progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </header>

      {/* Mobile overlay */}
      <div
        className={`brutal-mobile ${isOpen ? "brutal-mobile--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="brutal-mobile__content">
          <nav className="brutal-mobile__nav">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="brutal-mobile__link"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="brutal-mobile__link-text">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="brutal-mobile__footer">
            <a
              href="mailto:voanhphi.dev@gmail.com"
              className="brutal-mobile__email"
            >
              voanhphi.dev@gmail.com
            </a>
            <div className="brutal-mobile__social">
              <a href="#" target="_blank" rel="noopener">
                [GITHUB]
              </a>
              <a href="#" target="_blank" rel="noopener">
                [LINKEDIN]
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
