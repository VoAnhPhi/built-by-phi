import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    period: "Software Engineering — Ongoing",
    position: "Industrial University of Ho Chi Minh City",
    company: "Academic & Self-Directed Study",
    description:
      "Built a practical foundation in software engineering through structured study and hands-on projects, with a focus on translating core concepts into maintainable web applications.",
    techLabel: "Focus Areas",
    tech: [
      "Software Engineering",
      "Web Development",
      "Databases",
      "Team Projects",
    ],
  },
  {
    period: "Jan 2025 — Apr 2025",
    position: "Freelance Front-End Developer",
    company: "NhaNgonSaiGon",
    description:
      "Developed responsive UI for a real estate platform with search, filtering, and inquiry workflows. Integrated REST APIs and optimized performance across mobile and desktop.",
    techLabel: "Tech & Responsibilities",
    tech: ["React", "Next.js", "REST API", "Responsive UI"],
    projectUrl: "https://nhangonsaigon.com.vn/",
  },
  {
    period: "May 2025 — Sep 2025",
    position: "R&D and Full Stack Developer",
    company: "Hopper Solution & Education",
    description:
      "Built and integrated 15+ REST APIs using NestJS for fintech modules including deposit, saving, budgeting, and eKYC. Designed PostgreSQL schemas, implemented RBAC, and contributed across frontend and backend in Agile sprints.",
    techLabel: "Tech & Responsibilities",
    tech: ["NestJS", "PostgreSQL", "RBAC", "React"],
  },
];

const SOFTWARE_LAYERS = [
  {
    id: "presentation",
    title: "Presentation",
    lines: ["React + TypeScript", "Component-driven UI"],
  },
  {
    id: "application",
    title: "Application Logic",
    lines: ["Services, validation,", "and business rules"],
  },
  {
    id: "data",
    title: "Data & Access",
    lines: ["APIs, repositories,", "and data mapping"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    lines: ["Cloud, servers,", "and configuration"],
  },
];

function SoftwareStackVisual() {
  return (
    <div
      className="brutal-about__visual"
      role="img"
      aria-label="Layered software architecture stack with code and build terminals"
    >
      <div className="brutal-about__stack-stage">
        <img
          className="brutal-about__stack-image"
          src="/img/about/software-stack.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />

        <div className="brutal-about__layers" aria-hidden="true">
          {SOFTWARE_LAYERS.map((layer) => (
            <div
              className={`brutal-about__layer brutal-about__layer--${layer.id}`}
              key={layer.id}
            >
              <strong>{layer.title}</strong>
              <small>
                {layer.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </small>
            </div>
          ))}
        </div>

        <div
          className="brutal-about__terminal brutal-about__terminal--code"
          aria-hidden="true"
        >
          <div className="brutal-about__terminal-bar">
            <span />
            <span />
            <span />
            <b>TS</b>
          </div>
          <pre>
            <code>
              <span className="terminal-keyword">async function</span>{" "}
              getUser(id: string) {"{"}
              {"\n  "}
              <span className="terminal-keyword">const</span> res ={" "}
              <span className="terminal-keyword">await</span> api.get(`/users/$
              {"${id}"}`);
              {"\n  "}
              <span className="terminal-keyword">return</span> res.data;
              {"\n}"}
            </code>
          </pre>
        </div>

        <div
          className="brutal-about__terminal brutal-about__terminal--build"
          aria-hidden="true"
        >
          <div className="brutal-about__terminal-bar">
            <span />
            <span />
            <span />
            <b>CLI</b>
          </div>
          <pre>
            <code>
              $ npm run build{"\n"}
              <span className="terminal-success">✓ Build completed</span>
              {"\n"}
              <span className="terminal-success">✓ Tests passed</span>
              {"\n"}$
            </code>
          </pre>
        </div>

        <span className="brutal-about__code-badge" aria-hidden="true">
          &lt;/&gt;
        </span>
      </div>
    </div>
  );
}

export default function BrutalAbout() {
  const sectionRef = useRef(null);
  const experienceRef = useRef(null);
  const progressRef = useRef(null);
  const progressCountRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !experienceRef.current) return undefined;

    let journeyFrame;
    let updateJourneyProgress = () => {};
    const handleJourneyScroll = () => {
      if (journeyFrame) return;

      journeyFrame = window.requestAnimationFrame(() => {
        journeyFrame = undefined;
        updateJourneyProgress();
      });
    };

    const ctx = gsap.context(() => {
      const experienceItems = gsap.utils.toArray(
        ".brutal-about__experience-item",
      );
      const firstExperienceItem = experienceItems[0];
      const lastExperienceItem = experienceItems.at(-1);
      const getHeaderOffset = () =>
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--height-header",
          ),
        ) || 0;

      gsap.from(".brutal-about__visual, .brutal-about__profile-copy", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".brutal-about__profile",
          start: "top 60%",
          once: true,
        },
      });

      gsap.from(".brutal-about__experience-item", {
        y: 56,
        opacity: 0,
        duration: 0.75,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".brutal-about__experience-list",
          start: "top 76%",
          once: true,
        },
      });

      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      updateJourneyProgress = () => {
        const headerOffset = getHeaderOffset();
        const firstItemTop =
          firstExperienceItem.getBoundingClientRect().top + window.scrollY;
        const lastItemTop =
          lastExperienceItem.getBoundingClientRect().top + window.scrollY;
        const currentPosition = window.scrollY + headerOffset;
        const journeyLength = lastItemTop - firstItemTop;
        const exactProgress = gsap.utils.clamp(
          0,
          1,
          journeyLength > 0
            ? (currentPosition - firstItemTop) / journeyLength
            : 0,
        );

        gsap.set(progressRef.current, { scaleX: exactProgress });

        if (progressCountRef.current) {
          const activationLine = headerOffset + 1;
          const activeIndex = experienceItems.reduce(
            (currentIndex, item, index) =>
              item.getBoundingClientRect().top <= activationLine
                ? index
                : currentIndex,
            0,
          );

          progressCountRef.current.textContent = String(
            activeIndex + 1,
          ).padStart(2, "0");
        }
      };

      window.addEventListener("scroll", handleJourneyScroll, { passive: true });
      window.addEventListener("resize", handleJourneyScroll);

      gsap.to(progressRef.current, {
        "--journey-driver": 1,
        ease: "none",
        scrollTrigger: {
          trigger: firstExperienceItem,
          endTrigger: lastExperienceItem,
          start: () => `top top+=${getHeaderOffset()}`,
          end: () => `top top+=${getHeaderOffset()}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: updateJourneyProgress,
        },
      });

      updateJourneyProgress();
    }, sectionRef);

    return () => {
      window.removeEventListener("scroll", handleJourneyScroll);
      window.removeEventListener("resize", handleJourneyScroll);
      if (journeyFrame) window.cancelAnimationFrame(journeyFrame);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      className="brutal-about brutal-section"
      ref={sectionRef}
    >
      <div className="brutal-about__container">
        <div className="brutal-about__profile">
          <SoftwareStackVisual />

          <div className="brutal-about__profile-copy">
            <p className="brutal-about__eyebrow">About me</p>
            <h2 className="brutal-about__lead">
              I’m a Software Engineer who builds full-stack products by
              understanding the users, business goals, and problems behind every
              feature.
            </h2>

            <div className="brutal-about__copy-columns">
              <p>
                I work mainly with React, Next.js, and NestJS. On the frontend,
                I create clear, responsive interfaces that make complex
                workflows easier to use. On the backend, I build modular
                services, REST APIs, and reliable data flows that support
                long-term product growth.
              </p>
              <div>
                <p>
                  My experience spans fintech and real estate, where I have
                  worked across product requirements, system architecture,
                  database design, frontend development, and backend
                  integration.
                </p>
                <p>
                  I also explore AI-powered features, including LLM chatbots and
                  automated workflows, with a focus on practical use cases
                  rather than adding AI for its own sake.
                </p>
              </div>
            </div>

            <blockquote className="brutal-about__profile-quote">
              Every product begins with a clear purpose.
            </blockquote>

            <div
              className="brutal-about__profile-facts"
              aria-label="Professional profile summary"
            >
              <span>PRODUCT PURPOSE</span>
              <span>ENGINEERING</span>
              <span>USER EXPERIENCE</span>
            </div>
          </div>
        </div>

        <div className="brutal-about__experience" ref={experienceRef}>
          <aside className="brutal-about__experience-sticky">
            <p className="brutal-about__sticky-label">Career Journey</p>
            <h2 className="brutal-about__experience-heading">Experience</h2>
            <h3>From interfaces to scalable systems.</h3>
            <p className="brutal-about__experience-intro">
              I build digital products across frontend, backend, and data
              layers—turning product requirements into responsive interfaces,
              reliable APIs, and maintainable systems.
            </p>

            <dl className="brutal-about__experience-meta">
              <div>
                <dt>Current Direction</dt>
                <dd>Full-Stack Engineering</dd>
              </div>
              <div>
                <dt>Core Strengths</dt>
                <dd>Interfaces · APIs · Data Flows </dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>Understand · Build · Improve</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>Fintech · Real Estate · SaaS</dd>
              </div>
            </dl>

            <div className="brutal-about__scroll-progress">
              <span>Scroll to trace the journey</span>
              <strong>
                <span ref={progressCountRef}>01</span> /{" "}
                {String(EXPERIENCE.length).padStart(2, "0")}
              </strong>
              <div className="brutal-about__progress-track" aria-hidden="true">
                <span ref={progressRef} />
              </div>
              <div className="brutal-about__progress-ends" aria-hidden="true">
                <span>Start</span>
                <span>Latest</span>
              </div>
            </div>
          </aside>

          <div className="brutal-about__experience-list">
            {EXPERIENCE.map((experience, index) => (
              <article
                className="brutal-about__experience-item"
                key={experience.company}
              >
                <span className="brutal-about__experience-index">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <div className="brutal-about__experience-body">
                  <time>{experience.period}</time>
                  <h3>{experience.position}</h3>
                  <p className="brutal-about__experience-company">
                    {experience.company}
                  </p>
                  <p className="brutal-about__experience-description">
                    {experience.description}
                  </p>
                  <div className="brutal-about__experience-tech">
                    <span>{experience.techLabel}</span>
                    <p>{experience.tech.join(" / ")}</p>
                  </div>
                  {experience.projectUrl && (
                    <a
                      href={experience.projectUrl}
                      className="brutal-about__experience-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW LIVE PROJECT
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
