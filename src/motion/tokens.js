export const MOTION = {
  duration: {
    fast: 0.22,
    normal: 0.48,
    reveal: 0.78,
    scene: 1.1,
  },
  ease: {
    enter: "power4.out",
    soft: "power3.out",
    transform: "power2.inOut",
  },
  distance: {
    small: 20,
    medium: 44,
    large: 72,
  },
};

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;
