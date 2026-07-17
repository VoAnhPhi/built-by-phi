import React, { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
	"Fintech Products",
	"Real Estate Platforms",
	"SaaS Applications",
	"Product Requirements",
	"Responsive Interfaces",
	"Motion & Interaction",
	"State Management",
	"RESTful API Development",
	"Database Design",
	"Frontend–Backend Integration",
	"System Architecture",
	"AI-Powered Features",
	"Full-Stack Engineering",
];

export default function BrutalManifesto() {
	const sectionRef = useRef(null);
	const hasAnimatedRef = useRef(false);
	const isContentReady = useContentReady();

	// Set initial hidden states
	useLayoutEffect(() => {
		if (!sectionRef.current || hasAnimatedRef.current) return;

		gsap.context(() => {
			gsap.set(".brutal-manifesto__line", {
				y: 80,
				opacity: 0,
			});
		}, sectionRef);
	}, []);

	// Setup ScrollTrigger animations when content is ready
	useEffect(() => {
		if (!isContentReady || hasAnimatedRef.current || !sectionRef.current) return;

		hasAnimatedRef.current = true;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.set(".brutal-manifesto__line", {
				clearProps: "transform,opacity",
				opacity: 1,
			});
			return;
		}

		gsap.context(() => {
			// Reveal lines with stagger
			gsap.to(".brutal-manifesto__line", {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".brutal-manifesto__content",
					start: "top 80%",
					once: true, // Chỉ chạy 1 lần
				},
			});
		}, sectionRef);

		return () => {
			// Chỉ kill ScrollTrigger, không revert animation state
			ScrollTrigger.getAll().forEach((st) => {
				if (st.trigger?.closest?.(".brutal-manifesto")) {
					st.kill();
				}
			});
		};
	}, [isContentReady]);

	return (
		<section id="manifesto" className="brutal-manifesto brutal-section" ref={sectionRef}>
			<div className="brutal-manifesto__container">
				{/* Main content - overlapping text blocks */}
				<div className="brutal-manifesto__content">
					<div className="brutal-manifesto__text">
						<p className="brutal-manifesto__line brutal-manifesto__line--large">I BUILD</p>
						<p className="brutal-manifesto__line brutal-manifesto__line--highlight">DIGITAL PRODUCTS</p>
						<p className="brutal-manifesto__line brutal-manifesto__line--large">THAT STAND OUT.</p>
					</div>

					<div className="brutal-manifesto__description">
						<p className="brutal-manifesto__desc-text">Purpose-led products built with solid engineering and thoughtful interfaces.</p>
					</div>
				</div>

				{/* Stats - raw, offset */}
				<div className="brutal-manifesto__stats">
					<div className="brutal-manifesto__stat">
						<span className="brutal-manifesto__stat-value">1+</span>
						<span className="brutal-manifesto__stat-label">YEARS OF EXPERIENCE</span>
					</div>
					<div className="brutal-manifesto__stat">
						<span className="brutal-manifesto__stat-value">5+</span>
						<span className="brutal-manifesto__stat-label">PROJECTS SHIPPED</span>
					</div>
					<div className="brutal-manifesto__stat">
						<span className="brutal-manifesto__stat-value">∞</span>
						<span className="brutal-manifesto__stat-label">CURIOSITY</span>
					</div>
				</div>

				<div className="brutal-manifesto__marquee" role="region" aria-label={`Areas of expertise: ${MARQUEE_ITEMS.join(", ")}`}>
					<div className="brutal-manifesto__marquee-track" aria-hidden="true">
						{[0, 1].map((groupIndex) => (
							<div className="brutal-manifesto__marquee-group" key={groupIndex}>
								{MARQUEE_ITEMS.map((item) => (
									<span className="brutal-manifesto__marquee-item" key={item}>
										<i>◆</i>
										{item}
									</span>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
