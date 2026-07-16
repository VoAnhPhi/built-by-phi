import React, { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContentReady } from "@/hooks/useContentReady";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalTrajectory() {
	const sectionRef = useRef(null);
	const hasAnimatedRef = useRef(false);
	const isContentReady = useContentReady();

	// Set initial hidden states
	useLayoutEffect(() => {
		if (!sectionRef.current || hasAnimatedRef.current) return;

		gsap.context(() => {
			gsap.set(".brutal-trajectory__phase", {
				y: 60,
				opacity: 0,
			});
			gsap.set(".brutal-trajectory__line", {
				scaleX: 0,
			});
		}, sectionRef);
	}, []);

	// Setup ScrollTrigger animations when content is ready
	useEffect(() => {
		if (!isContentReady || hasAnimatedRef.current || !sectionRef.current) return;

		hasAnimatedRef.current = true;

		gsap.context(() => {
			// Line draws in
			gsap.to(".brutal-trajectory__line", {
				scaleX: 1,
				duration: 1.2,
				ease: "power2.inOut",
				scrollTrigger: {
					trigger: ".brutal-trajectory__content",
					start: "top 75%",
					once: true,
				},
			});

			// Phases reveal with stagger
			gsap.to(".brutal-trajectory__phase", {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".brutal-trajectory__content",
					start: "top 70%",
					once: true,
				},
			});
		}, sectionRef);

		return () => {
			ScrollTrigger.getAll().forEach((st) => {
				if (st.trigger?.closest?.(".brutal-trajectory")) {
					st.kill();
				}
			});
		};
	}, [isContentReady]);

	return (
		<section id="trajectory" className="brutal-trajectory brutal-section" ref={sectionRef}>
			<div className="brutal-trajectory__container">
				{/* Main content */}
				<div className="brutal-trajectory__content">
					{/* The statement */}
					<div className="brutal-trajectory__statement">
						<h2 className="brutal-trajectory__headline">
							<span className="brutal-trajectory__headline-line">FROM CODE</span>
							<span className="brutal-trajectory__headline-line brutal-trajectory__headline-line--accent">TO PRODUCT</span>
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
								Reliable systems. <br /> Clean architecture. <br /> Scalable foundations.
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
							Good engineering is not only about writing code. It is about understanding the problem and owning the outcome.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export { BrutalTrajectory };
