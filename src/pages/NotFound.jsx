import React, { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NotFound() {
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".nf__title", {
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out",
			});

			gsap.from(".nf__subtitle", {
				y: 20,
				opacity: 0,
				duration: 0.6,
				delay: 0.2,
			});

			gsap.from(".nf__actions", {
				y: 20,
				opacity: 0,
				duration: 0.6,
				delay: 0.4,
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<section className="notfound">
			<div className="container">
				<div className="notfound__content">
					<h1 className="nf__title">404</h1>
					<p className="nf__subtitle">Oops! The page you're looking for doesn't exist.</p>

					<div className="nf__actions">
						<a href="/" className="nf__btn">
							Go to Homepage
						</a>
						<a href="mailto:voanhphi.dev@gmail.com" className="nf__btn-secondary">
							Contact Support
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
