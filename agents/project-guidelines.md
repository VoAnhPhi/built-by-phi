# Portfolio_V2 - Quy Định Project

> **Version:** 1.0.0  
> **Last Updated:** 2025-12-04  
> **Maintainer:** VoAnhPhi

---

## 📋 Mục Lục

- [1. Tổng Quan](#1-tổng-quan)
- [2. Tech Stack](#2-tech-stack)
- [3. Cấu Trúc Thư Mục](#3-cấu-trúc-thư-mục)
- [4. SCSS Architecture](#4-scss-architecture)
- [5. Coding Conventions](#5-coding-conventions)
- [6. Component Guidelines](#6-component-guidelines)
- [7. Git Workflow](#7-git-workflow)
- [8. Development Workflow](#8-development-workflow)

---

## 1. Tổng Quan

Portfolio_V2 là một **React-based personal portfolio website** được xây dựng với Vite, sử dụng SCSS tùy chỉnh và GSAP cho animations.

### Mục tiêu Project

- **Performance-first**: Tối ưu hóa tốc độ tải trang
- **Responsive Design**: Hỗ trợ đầy đủ các thiết bị (Desktop → Mobile)
- **Smooth Animations**: Sử dụng GSAP + ScrollTrigger
- **Clean Code**: Code dễ đọc, dễ maintain

---

## 2. Tech Stack

### Core Technologies

```json
{
	"framework": "React 19.1.1",
	"bundler": "Vite 7.1.7",
	"styling": "SCSS (Sass 1.93.2)",
	"routing": "React Router DOM 7.9.4",
	"animations": "GSAP 3.13.0",
	"smooth-scroll": "Lenis 1.0.42",
	"3D": "Three.js 0.181.0"
}
```

### Dev Tools

- **Linter**: ESLint 9.36.0
- **Formatter**: Prettier 3.6.2
- **CSS Utilities**: TailwindCSS 4.1.14 (minimal usage)

---

## 3. Cấu Trúc Thư Mục

```
Portfolio_V2/
├── public/                    # Static assets (images, icons, fonts)
├── src/
│   ├── assets/               # Dynamic assets (imported into components)
│   ├── components/           # Reusable UI components
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Section/          # Section components (Hero, Info, etc.)
│   │   ├── Loading/
│   │   └── ...
│   ├── pages/                # Page-level components
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Detail/
│   │   └── NotFound.jsx
│   ├── layouts/              # Layout wrappers
│   ├── routes/               # Route configuration
│   ├── context/              # React Context (LoadingContext, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API services / external integrations
│   ├── store/                # State management (if needed)
│   ├── utils/                # Utility functions (SmoothScrollProvider, etc.)
│   ├── styles/               # SCSS files
│   │   └── scss/
│   │       ├── core/         # Core SCSS (variables, mixins, reset, etc.)
│   │       ├── components/   # Component-specific styles
│   │       ├── sections/     # Section-specific styles
│   │       ├── pages/        # Page-specific styles
│   │       └── style.scss    # Main SCSS entry point
│   ├── App.jsx               # Root App component
│   └── main.jsx              # Entry point
├── agents/                   # AI Agent guidelines & documentation
│   ├── project-guidelines.md # This file
│   ├── scss-guidelines.md    # SCSS-specific guidelines
│   ├── walkthrough.md        # Project walkthrough
│   └── ...
├── .env.development          # Development environment variables
├── .env.production           # Production environment variables
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

### 📁 Quy Tắc Đặt Tên Thư Mục

| Loại             | Convention | Ví dụ                               |
| ---------------- | ---------- | ----------------------------------- |
| **Components**   | PascalCase | `Header/`, `Button/`                |
| **Pages**        | PascalCase | `Home/`, `About/`                   |
| **Utilities**    | camelCase  | `utils/`, `hooks/`                  |
| **SCSS folders** | lowercase  | `core/`, `components/`, `sections/` |

---

## 4. SCSS Architecture

### 4.1. Import Order trong `style.scss`

**QUAN TRỌNG:** Thứ tự import SCSS phải được tuân thủ nghiêm ngặt:

```scss
// 1. CORE - Base styles (LUÔN IMPORT TRƯỚC)
@import "core/reset"; // CSS Reset
@import "core/variables"; // Variables & CSS Custom Properties
@import "core/mixins"; // SCSS Mixins
@import "core/layouts"; // Layout system (container, grid)
@import "core/fonts"; // Font-face declarations
@import "core/bootstrap_mini"; // Minimal Bootstrap utilities

// 2. COMPONENTS - Reusable UI components
@import "components/heading";
@import "components/footer";

// 3. SECTIONS - Page sections
@import "sections/hero";
@import "sections/info";
@import "sections/showcase";
@import "sections/profile";
@import "sections/test";

// 4. PAGES - Page-specific styles
@import "pages/homepage";
@import "pages/showcase";
@import "pages/notfound";
```

### 4.2. SCSS Variables

Xem chi tiết trong [scss-guidelines.md](./scss-guidelines.md)

#### Static Variables (không thay đổi theo responsive)

```scss
// Colors
$primary-cl: #fdfbf0;
$secondary-cl: #030302;
$highlight-cl: #550707;
$highlight-cl-2: #4c6851;

// Spacing
$pmobile: 16px;
$ptablet: 50px;
$ptop: 80px;
$pbtm: 100px;

// Transitions
$t: 0.4s;
$cubic: cubic-bezier(0.84, 0.13, 0.33, 0.97);
```

#### Dynamic Variables (thay đổi theo responsive)

```scss
:root {
	// Typography
	--h1-fs: 7.2rem;
	--h1-lh: 8rem;
	--h2-fs: 5.2rem;
	--h2-lh: 6rem;
	// ... (xem chi tiết trong core/_variables.scss)

	// Layout
	--gap: 60px;
	--height-header: 80px;
	--pd-section: 120px;
	--ptop: 76px;
}
```

### 4.3. Responsive Breakpoints

```scss
// Desktop-first approach
$xxl-min: 1660px; // Large monitors
$lg-min: 1440px; // Desktop
$md-min: 992px; // Laptop / Tablet landscape
$sm-min: 768px; // Tablet portrait
$xs-min: 576px; // Mobile

// Usage with mixins
@include xxl {
	/* styles for ≥1660px */
}
@include lg {
	/* styles for 1440px-1659px */
}
@include md {
	/* styles for 992px-1439px */
}
@include sm {
	/* styles for 768px-991px */
}
@include xs {
	/* styles for ≤768px */
}
@include xxs {
	/* styles for ≤576px */
}
```

### 4.4. Khi Nào Tạo File SCSS Mới?

#### ✅ **NÊN** tạo file mới khi:

- Component có >50 dòng CSS
- Component được sử dụng ở nhiều nơi
- Section độc lập (Hero, About, Portfolio, etc.)
- Page có styles riêng biệt

#### ❌ **KHÔNG NÊN** tạo file mới khi:

- Component chỉ có <20 dòng CSS
- Styles có thể reuse từ utility classes
- One-time use component

#### 📝 Template File SCSS Mới

```scss
// components/_component-name.scss
.component-name {
	// Desktop styles

	@include xs {
		// Mobile styles
	}

	@include xxs {
		// Small mobile styles
	}
}
```

---

## 5. Coding Conventions

### 5.1. JavaScript / JSX

#### File Naming

```
PascalCase:  Header.jsx, HomePage.jsx, SmoothScrollProvider.jsx
camelCase:   utils.js, apiService.js, useScrollTrigger.js
```

#### Component Structure

```jsx
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

// Constants (nếu có)
const NAV_ITEMS = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
];

// Component
const ComponentName = ({ prop1, prop2 }) => {
	// 1. Hooks
	const [state, setState] = useState(false);

	// 2. Effects
	useEffect(() => {
		// Effect logic
		return () => {
			// Cleanup
		};
	}, []);

	// 3. Event handlers
	const handleClick = () => {
		// Handler logic
	};

	// 4. Render
	return <div className="component-name">{/* JSX */}</div>;
};

export default ComponentName;
```

#### Naming Conventions

| Loại           | Convention           | Ví dụ                                   |
| -------------- | -------------------- | --------------------------------------- |
| **Components** | PascalCase           | `Header`, `HeroSection`                 |
| **Functions**  | camelCase            | `handleClick`, `fetchData`              |
| **Constants**  | UPPER_SNAKE_CASE     | `API_URL`, `MAX_RETRY`                  |
| **Hooks**      | use + PascalCase     | `useScrollTrigger`, `useFormValidation` |
| **Context**    | PascalCase + Context | `LoadingContext`, `ThemeContext`        |

### 5.2. SCSS / CSS

#### Class Naming (BEM Convention)

```scss
// Block
.hero {
}

// Block__Element
.hero__content {
}
.hero__content-left {
}
.hero__content-left-title {
}

// Block__Element--Modifier
.hero__content--centered {
}
.hero__button--primary {
}
```

#### Quy Tắc Viết SCSS

```scss
// ❌ BAD: Nested quá sâu
.hero {
	.content {
		.left {
			.title {
				.text {
				} // Quá sâu!
			}
		}
	}
}

// ✅ GOOD: Flat BEM structure
.hero {
}
.hero__content {
}
.hero__content-left {
}
.hero__content-left-title {
}
.hero__content-left-title-text {
}
```

### 5.3. Git Commit Messages

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting (không ảnh hưởng code logic)
refactor: # Code restructuring
perf:     # Performance improvements
test:     # Adding tests
chore:    # Maintenance tasks

# Examples:
git commit -m "feat(hero): add GSAP scroll animations"
git commit -m "fix(header): mobile menu not closing on click"
git commit -m "docs(agents): update SCSS guidelines"
git commit -m "style(components): format Button component"
git commit -m "refactor(pages): extract Hero section to component"
```

---

## 6. Component Guidelines

### 6.1. Cấu Trúc Component Folder

```
ComponentName/
├── ComponentName.jsx    # Main component file
├── style.scss          # Component styles (optional)
└── index.jsx           # Barrel export (optional)
```

### 6.2. Props Validation

**Luôn định nghĩa rõ props** bằng destructuring:

```jsx
// ✅ GOOD
const Button = ({ label, onClick, variant = "primary" }) => {
	return <button onClick={onClick}>{label}</button>;
};

// ❌ BAD
const Button = (props) => {
	return <button onClick={props.onClick}>{props.label}</button>;
};
```

### 6.3. Event Handlers

```jsx
// ✅ GOOD: Handler function riêng biệt
const handleSubmit = (e) => {
	e.preventDefault();
	// Logic here
};

return <form onSubmit={handleSubmit}>...</form>;

// ❌ BAD: Inline arrow function
return (
	<form
		onSubmit={(e) => {
			e.preventDefault(); /* logic */
		}}
	>
		...
	</form>
);
```

### 6.4. Conditional Rendering

```jsx
// ✅ GOOD: Ternary cho simple conditions
{
	isLoading ? <Spinner /> : <Content />;
}

// ✅ GOOD: && cho single condition
{
	error && <ErrorMessage message={error} />;
}

// ✅ GOOD: Early return cho complex conditions
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
return <Content />;
```

---

## 7. Git Workflow

### 7.1. Branching Strategy

```
main                    # Production-ready code
├── develop            # Development branch
    ├── feature/xxx    # New features
    ├── fix/xxx        # Bug fixes
    └── refactor/xxx   # Code refactoring
```

### 7.2. Pull Request Guidelines

1. **Tạo PR từ feature branch → develop**
2. **Title**: Mô tả ngắn gọn thay đổi
3. **Description**:
    - Mô tả chi tiết thay đổi
    - Link đến issue (nếu có)
    - Screenshots (nếu có UI changes)
4. **Review**: Ít nhất 1 người review trước khi merge

---

## 8. Development Workflow

### 8.1. Scripts

```bash
# Development
npm run dev           # Start dev server (http://localhost:5173)

# Build
npm run build         # Build for production

# Linting
npm run lint          # Run ESLint

# Formatting
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

### 8.2. Environment Variables

```bash
# .env.development
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Portfolio_V2

# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_NAME=Portfolio_V2
```

**Sử dụng trong code:**

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

### 8.3. Adding New Dependencies

```bash
# Luôn kiểm tra trước khi cài package mới
npm search <package-name>

# Cài dependencies
npm install <package-name>

# Cài devDependencies
npm install -D <package-name>

# Commit package.json + package-lock.json
git add package.json package-lock.json
git commit -m "chore: add <package-name> dependency"
```

---

## 📞 Contact & Support

Nếu có thắc mắc về quy định này, vui lòng liên hệ:

- **Email**: voanhphi.dev@gmail.com
- **GitHub**: [@voanhphi](https://github.com/voanhphi)

---

## 📝 Ghi Chú

- File này được tạo và quản lý trong thư mục `agents/` để hỗ trợ AI agents hiểu rõ cấu trúc project
- Nên cập nhật file này khi có thay đổi lớn về architecture
- Xem [scss-guidelines.md](./scss-guidelines.md) để biết chi tiết về SCSS conventions
