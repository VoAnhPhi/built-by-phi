export const PROJECT_DATA = {
  tomatohub: {
    id: 1,
    slug: "tomatohub",
    index: "01",
    title: "TOMATOHUB",
    subtitle:
      "AI-assisted campaign platform với recommendation, priority scoring và transparency tracking.",
    category: "AI PLATFORM",
    year: "2026",
    role: "FULL-STACK ENGINEER",
    client: "HACKATHON / SOCIAL IMPACT",
    duration: "6 WEEKS",
    mainImage:
      "https://images.unsplash.com/photo-1469571486292-b53601020c0d?q=80&w=2670&auto=format&fit=crop",
    technologies: [
      "NEXT.JS",
      "FASTAPI",
      "POSTGRESQL",
      "SQLALCHEMY",
      "ALEMBIC",
      "JWT",
      "OPENAI",
    ],
    overview:
      "A platform for managing emergency campaigns with AI-assisted workflows, ensuring transparency and structured donation operations.",
    challenge:
      "Delivering a fast MVP while maintaining auditability, role-based access control, and consistent data flow across campaign lifecycle.",
    solution:
      "Built modular architecture with Next.js + FastAPI, implemented AI modules for normalization, recommendation, and reporting, while keeping human-in-the-loop control.",
    features: [
      {
        title: "AI Campaign Assistant",
        desc: "Suggests campaign data from raw input, editable before publish",
      },
      {
        title: "Priority Scoring",
        desc: "Weighted scoring system with override + audit logs",
      },
      {
        title: "Data Normalization",
        desc: "Standardizes messy Excel inputs into structured schema",
      },
      {
        title: "Transparency Reports",
        desc: "Auto-generated reports after each campaign check-in",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },

  sonaspace: {
    id: 2,
    slug: "sonaspace",
    index: "02",
    title: "SONASPACE",
    subtitle:
      "A full-stack interior commerce platform connecting curated products, room inspiration, personalized shopping, and operational management.",
    category: "INTERIOR E-COMMERCE",
    year: "2025",
    role: "FULL-STACK DEVELOPER / BUSINESS ANALYST",
    client: "TEAM PROJECT",
    duration: "2-3 MONTHS",
    mainImage: "/img/project/sonaspace/sonaspace-thumbnail-v2.png",
    technologies: [
      "REACT 19",
      "TYPESCRIPT",
      "VITE 6",
      "EXPRESS",
      "MYSQL",
      "JWT",
      "SOCKET.IO",
      "CLOUDINARY",
      "GEMINI AI",
      "VNPAY",
    ],
    overview:
      "SonaSpace is a responsive interior e-commerce experience built around the complete shopping journey. Customers can explore furniture by category or living space, compare variants, save favorites, manage a persistent cart, place and track orders, and get product guidance from an AI assistant. A connected administration system supports products, categories, rooms, content, customers, and order operations.",
    challenge:
      "The main challenge was keeping a content-rich furniture catalog easy to browse while coordinating product variants, inventory, authentication, cart state, checkout, payment, media, and administrative workflows across a separate React client and Express API.",
    solution:
      "We designed the experience around room-first discovery and reusable product flows, then connected the React 19 storefront to a modular Express and MySQL backend. JWT authentication, Cloudinary media, real-time Socket.IO features, VNPay checkout, and an AI shopping assistant extend the platform beyond a static catalog while keeping customer and admin responsibilities clearly separated.",
    features: [
      {
        title: "Room-first Product Discovery",
        desc: "Browse furniture by category or living space with filters, recommendations, variants, inventory, and related products.",
      },
      {
        title: "Complete Shopping Journey",
        desc: "Persistent wishlist and cart flows lead into validated checkout, VNPay payment, and order tracking.",
      },
      {
        title: "AI Shopping Assistant",
        desc: "A Gemini-powered conversational assistant helps customers discover and understand suitable products.",
      },
      {
        title: "Commerce Administration",
        desc: "Operational dashboards manage products, categories, rooms, content, customers, media, and order statuses.",
      },
    ],
    gallery: [
      "/img/project/sonaspace/sonaspace-home-screenshot.png",
      "/img/project/sonaspace/sonaspace.png",
    ],
    liveUrl: "https://sona-space.vercel.app/",
    apiUrl: "https://sona-space-server.onrender.com/",
    githubUrls: [
      {
        label: "CLIENT SOURCE",
        url: "https://github.com/VoAnhPhi/SONA_SPACE-Client",
      },
      {
        label: "SERVER SOURCE",
        url: "https://github.com/VoAnhPhi/SONA_SPACE-Server",
      },
    ],
  },

  "portfolio-v2": {
    id: 111,
    slug: "portfolio-v2",
    index: "03",
    title: "PORTFOLIO V2",
    subtitle:
      "Personal portfolio với animation, performance focus và custom UI/UX.",
    category: "WEBSITE",
    year: "2025",
    role: "FRONTEND DEVELOPER",
    client: "PERSONAL",
    duration: "2 MONTHS",
    mainImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop",
    technologies: ["REACT", "VITE", "SCSS", "GSAP"],
    overview:
      "A personal portfolio showcasing projects, skills, and development journey with focus on performance and interaction.",
    challenge:
      "Balancing visual effects with performance and maintaining clean component structure.",
    solution:
      "Used GSAP for animation, optimized rendering, and structured reusable components.",
    features: [
      {
        title: "Smooth Animations",
        desc: "Scroll-based and interaction animations using GSAP",
      },
      {
        title: "Component Architecture",
        desc: "Reusable and scalable UI structure",
      },
      {
        title: "Performance Optimization",
        desc: "Lazy loading and optimized assets",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },

  "cinema-booking-system": {
    id: 3,
    slug: "cinema-booking-system",
    index: "03",
    title: "CINEMA BOOKING SYSTEM",
    subtitle:
      "Website đặt vé phim với quản lý phim, suất chiếu và admin dashboard.",
    category: "WEB APP",
    year: "2024",
    role: "FULL-STACK DEVELOPER",
    client: "ACADEMIC PROJECT",
    duration: "2 MONTHS",
    mainImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop",
    technologies: ["REACT", "NODE.JS", "EXPRESS", "MONGODB"],
    overview:
      "A web-based cinema booking system allowing users to browse movies, book tickets, and manage schedules.",
    challenge:
      "Handling booking logic and ensuring consistent seat availability.",
    solution:
      "Implemented CRUD APIs, booking validation logic, and admin panel for movie/showtime management.",
    features: [
      {
        title: "Movie Management",
        desc: "CRUD operations for movies and categories",
      },
      { title: "Booking System", desc: "Seat selection and booking flow" },
      { title: "Admin Dashboard", desc: "Manage movies and schedules" },
    ],
    gallery: [],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },

  "interface-style-comparison": {
    id: 4,
    slug: "interface-style-comparison",
    index: "04",
    title: "UI STYLE RESEARCH",
    subtitle:
      "Interactive research workspace for comparing UI/UX styles through live previews, design tokens, and use-case guidance.",
    category: "DESIGN RESEARCH TOOL",
    year: "2026",
    role: "FRONTEND DEVELOPER / UI RESEARCHER",
    client: "PERSONAL RESEARCH PROJECT",
    duration: "ONGOING",
    mainImage:
      "/img/project/interface-style-comparison/interface-style-comparison-mockup.png",
    technologies: ["REACT 19", "TYPESCRIPT", "VITE 6", "CSS", "RESPONSIVE UI"],
    overview:
      "A visual research workspace for scanning, filtering, and deeply comparing 13 UI/UX design styles. Each dossier combines live previews, design tokens, patterns, implementation guidance, accessibility risks, and surface-fit recommendations.",
    challenge:
      "Organizing a large and growing body of design research without overwhelming users, while keeping comparisons fast, previews legible, and the experience useful across desktop and mobile.",
    solution:
      "Built a responsive three-part research shell with a searchable style catalog, focused dossier tabs, and a decision rail. Structured style data around reusable tokens and suitability signals so new styles can be added without redesigning the interface.",
    features: [
      {
        title: "13 Style Dossiers",
        desc: "Focused research for modern, editorial, brutalist, material, futuristic, and other UI directions",
      },
      {
        title: "Search & Tag Filtering",
        desc: "Fast catalog discovery through text search and use-case tags",
      },
      {
        title: "Tokens & Patterns",
        desc: "Color, typography, radius, shadow, spacing, density, motion, and component guidance",
      },
      {
        title: "Decision Guide",
        desc: "Surface-fit matrix, strengths, risks, recommended uses, and implementation notes",
      },
    ],
    gallery: [
      "/img/project/interface-style-comparison/interface-style-comparison-screenshot.jpg",
    ],
    liveUrl: "https://interface-style-comparison.vercel.app/",
    githubUrl: "https://github.com/VoAnhPhi/interface-style-comparison",
  },
};

// Helpers
export const DEFAULT_SLUG = Object.keys(PROJECT_DATA)[0];
export const getProjectsArray = () => Object.values(PROJECT_DATA);
export const getProjectBySlug = (slug) =>
  PROJECT_DATA[slug] || PROJECT_DATA[DEFAULT_SLUG];
