import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";
import { MOTION, prefersReducedMotion } from "@/motion/tokens";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    period: "Software Engineering / Ongoing",
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
    period: "Jan 2025 to Apr 2025",
    position: "Freelance Front-End Developer",
    company: "NhaNgonSaiGon",
    description:
      "Developed responsive UI for a real estate platform with search, filtering, and inquiry workflows. Integrated REST APIs and optimized performance across mobile and desktop.",
    techLabel: "Tech & Responsibilities",
    tech: ["React", "Next.js", "REST API", "Responsive UI"],
    projectUrl: "https://nhangonsaigon.com.vn/",
  },
  {
    period: "May 2025 to Sep 2025",
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
          src="/img/about/software-stack-800.webp"
          srcSet="/img/about/software-stack-400.webp 400w, /img/about/software-stack-600.webp 600w, /img/about/software-stack-800.webp 800w, /img/about/software-stack.webp 1122w"
          sizes="(max-width: 767px) 85vw, 50vw"
          width="1122"
          height="1402"
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
  const isContentReady = useContentReady();

  useLayoutEffect(() => {
    if (!isContentReady || !sectionRef.current || !experienceRef.current) {
      return undefined;
    }

    if (prefersReducedMotion()) {
      const reducedMotionContext = gsap.context(() => {
        gsap.set(
          [
            ".brutal-about__visual",
            ".brutal-about__profile-copy",
            ".brutal-about__experience-item",
          ],
          { clearProps: "transform,opacity,clipPath", opacity: 1 },
        );
        gsap.set(progressRef.current, { scaleX: 1 });
      }, sectionRef);

      return () => reducedMotionContext.revert();
    }

    const ctx = gsap.context(() => {
      const experienceItems = gsap.utils.toArray(
        ".brutal-about__experience-item",
      );

      gsap.fromTo(
        ".brutal-about__visual",
        { clipPath: "inset(8% 10% 8% 10%)", scale: 0.96 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: MOTION.duration.scene,
          ease: MOTION.ease.enter,
          scrollTrigger: {
            trigger: ".brutal-about__profile",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.from(".brutal-about__profile-copy > *", {
        y: MOTION.distance.medium,
        opacity: 0,
        duration: MOTION.duration.reveal,
        stagger: 0.09,
        ease: MOTION.ease.soft,
        scrollTrigger: {
          trigger: ".brutal-about__profile-copy",
          start: "top 72%",
          once: true,
        },
      });

      gsap.to(".brutal-about__stack-stage", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".brutal-about__profile",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      experienceItems.forEach((item, index) => {
        gsap.from(item, {
          y: MOTION.distance.large,
          opacity: 0,
          duration: MOTION.duration.reveal,
          ease: MOTION.ease.enter,
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
            once: true,
          },
        });

        gsap.from(item.querySelectorAll("time, h3, p, a"), {
          x: index % 2 === 0 ? 24 : -24,
          opacity: 0,
          duration: MOTION.duration.normal,
          stagger: 0.045,
          ease: MOTION.ease.soft,
          scrollTrigger: {
            trigger: item,
            start: "top 74%",
            once: true,
          },
        });
      });

      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      ScrollTrigger.create({
        trigger: ".brutal-about__experience-list",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          gsap.set(progressRef.current, { scaleX: self.progress });

          if (progressCountRef.current) {
            const activeIndex = Math.min(
              experienceItems.length - 1,
              Math.floor(self.progress * experienceItems.length),
            );
            progressCountRef.current.textContent = String(
              activeIndex + 1,
            ).padStart(2, "0");
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isContentReady]);

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
              layers, turning product requirements into responsive interfaces,
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
