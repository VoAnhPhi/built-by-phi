# Coding Format & Conventions - Portfolio_V2

> **Mục đích:** Quy định chi tiết về code style, formatting, và best practices cho toàn bộ codebase

---

## 📋 Mục Lục

1. [JavaScript/JSX Formatting](#1-javascriptjsx-formatting)
2. [SCSS/CSS Formatting](#2-scsscss-formatting)
3. [File Naming Conventions](#3-file-naming-conventions)
4. [Code Organization](#4-code-organization)
5. [Comments & Documentation](#5-comments--documentation)
6. [Prettier & ESLint Rules](#6-prettier--eslint-rules)

---

## 1. JavaScript/JSX Formatting

### 1.1. Indentation & Spacing

```jsx
// ✅ GOOD: Tab = 4 spaces (hoặc 2 spaces, tùy config Prettier)
function Component() {
	return (
		<div className="wrapper">
			<h1>Title</h1>
		</div>
	);
}

// ❌ BAD: Inconsistent indentation
function Component() {
	return (
		<div className="wrapper">
			<h1>Title</h1>
		</div>
	);
}
```

### 1.2. Import Order

```jsx
// 1. React & core libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 2. Third-party libraries
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 3. Internal components
import Header from "@/components/Header/Header";
import Button from "@/components/Button";

// 4. Internal utilities & hooks
import { smoothScrollTo } from "@/utils/scroll";
import useWindowSize from "@/hooks/useWindowSize";

// 5. Styles (nếu có - nhưng Portfolio_V2 dùng global SCSS)
// import "./style.scss";  // ← KHÔNG DÙNG trong project này

// 6. Assets
import logoImg from "@/assets/logo.svg";

// 7. Constants & data
const NAV_ITEMS = [...];
```

**Auto-sort bằng Prettier plugin:**

```bash
npm install -D prettier-plugin-organize-imports
```

### 1.3. Component Structure Template

```jsx
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

// ========================================
// CONSTANTS (outside component)
// ========================================
const DEFAULT_CONFIG = {
	duration: 0.5,
	ease: "power2.out",
};

const NAV_ITEMS = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
];

// ========================================
// HELPER FUNCTIONS (outside component)
// ========================================
const formatDate = (date) => {
	return new Date(date).toLocaleDateString();
};

// ========================================
// MAIN COMPONENT
// ========================================
const ComponentName = ({ prop1, prop2, children }) => {
	// ---------------------------
	// 1. HOOKS (state, refs, context)
	// ---------------------------
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	// ---------------------------
	// 2. EFFECTS
	// ---------------------------
	useLayoutEffect(() => {
		// GSAP setup
		const ctx = gsap.context(() => {
			// Animations
		});

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		// Side effects

		return () => {
			// Cleanup
		};
	}, [isOpen]);

	// ---------------------------
	// 3. EVENT HANDLERS
	// ---------------------------
	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic here
	};

	// ---------------------------
	// 4. RENDER HELPERS (nếu cần)
	// ---------------------------
	const renderNavItems = () => {
		return NAV_ITEMS.map((item) => <li key={item.id}>{item.label}</li>);
	};

	// ---------------------------
	// 5. EARLY RETURNS
	// ---------------------------
	if (!prop1) {
		return <div>Loading...</div>;
	}

	// ---------------------------
	// 6. MAIN RENDER
	// ---------------------------
	return (
		<div className="component-name" ref={containerRef}>
			<h1>Title</h1>
			{children}
		</div>
	);
};

export default ComponentName;
```

### 1.4. Props Destructuring

```jsx
// ✅ GOOD: Destructure ở parameter, có default values
const Button = ({ label, onClick, variant = "primary", disabled = false }) => {
	return (
		<button className={`button button--${variant}`} onClick={onClick} disabled={disabled}>
			{label}
		</button>
	);
};

// ❌ BAD: Không destructure
const Button = (props) => {
	return <button onClick={props.onClick}>{props.label}</button>;
};
```

### 1.5. Conditional Rendering

```jsx
// ✅ GOOD: Ternary cho 2 cases
{
	isLoading ? <Spinner /> : <Content />;
}

// ✅ GOOD: && cho 1 case
{
	error && <ErrorMessage message={error} />;
}

// ✅ GOOD: Early return cho complex logic
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
if (!data) return null;
return <Content data={data} />;

// ❌ BAD: Nested ternary (khó đọc)
{
	isLoading ? <Spinner /> : error ? <Error /> : data ? <Content /> : null;
}
```

### 1.6. Array Rendering

```jsx
// ✅ GOOD: map với key
{
	items.map((item) => <div key={item.id}>{item.name}</div>);
}

// ❌ BAD: Dùng index làm key (chỉ khi list không thay đổi)
{
	items.map((item, index) => (
		<div key={index}>
			{" "}
			{/* ← Tránh nếu list có thể thay đổi */}
			{item.name}
		</div>
	));
}
```

### 1.7. Event Handlers

```jsx
// ✅ GOOD: Handler function riêng
const handleClick = (id) => {
	console.log("Clicked:", id);
};

return <button onClick={() => handleClick(item.id)}>Click</button>;

// ❌ BAD: Inline logic phức tạp
return (
	<button
		onClick={() => {
			console.log("Clicked:", item.id);
			setActive(item.id);
			fetchData(item.id);
			// ... more logic
		}}
	>
		Click
	</button>
);
```

### 1.8. String Formatting

```jsx
// ✅ GOOD: Template literals
const greeting = `Hello, ${name}!`;
const className = `button button--${variant}`;

// ❌ BAD: String concatenation
const greeting = "Hello, " + name + "!";
const className = "button button--" + variant;
```

### 1.9. Object & Array Shortcuts

```jsx
// ✅ GOOD: Spread operator
const newUser = { ...user, name: "Updated" };
const newItems = [...items, newItem];

// ✅ GOOD: Destructuring
const { name, email } = user;
const [first, second, ...rest] = items;

// ❌ BAD: Manual copy
const newUser = Object.assign({}, user, { name: "Updated" });
const newItems = items.concat([newItem]);
```

---

## 2. SCSS/CSS Formatting

### 2.1. Property Order

```scss
.component {
	// 1. Content
	content: "";

	// 2. Positioning
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;

	// 3. Display & Box Model
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100vh;
	margin: 20px 0;
	padding: 20px;

	// 4. Border & Background
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: $primary-cl;

	// 5. Typography
	font-size: var(--h1-fs);
	font-weight: 700;
	line-height: var(--h1-lh);
	color: $secondary-cl;
	text-align: center;

	// 6. Transforms & Transitions
	transform: translateY(-50%);
	transition: all $t $cubic;

	// 7. Other
	cursor: pointer;
	opacity: 1;
	pointer-events: auto;
}
```

**Prettier sẽ auto-sort nếu cài plugin:**

```bash
# (optional - chưa có trong project hiện tại)
npm install -D prettier-plugin-css-order
```

### 2.2. BEM Nesting

```scss
// ✅ GOOD: Flat BEM với &
.hero {
	padding: 120px 0;

	&__content {
		// → .hero__content
		display: flex;
	}

	&__content-left {
		// → .hero__content-left
		flex: 1;
	}

	&__title {
		// → .hero__title
		font-size: var(--h1-fs);
	}

	&--centered {
		// → .hero--centered
		text-align: center;
	}

	// Media query ở cuối
	@include xs {
		padding: 60px 0;
	}
}

// ❌ BAD: Nested quá sâu
.hero {
	.content {
		.left {
			.title {
				span {
					// ← Quá sâu!
					color: red;
				}
			}
		}
	}
}
```

### 2.3. Selector Naming

```scss
// ✅ GOOD: Lowercase, dash-separated
.hero-section {
}
.button-primary {
}
.nav-item-active {
}

// ❌ BAD: CamelCase trong CSS
.heroSection {
} // ← JSX style, không dùng trong CSS
.ButtonPrimary {
}
```

### 2.4. Colors & Units

```scss
// ✅ GOOD: Sử dụng variables
.component {
	color: $secondary-cl;
	background: $primary-cl;
	padding: $pmobile;
}

// ✅ GOOD: Sử dụng custom properties
.component {
	font-size: var(--h1-fs);
	gap: var(--gap);
}

// ❌ BAD: Hardcoded values
.component {
	color: #030302; // ← Nên dùng $secondary-cl
	padding: 16px; // ← Nên dùng $pmobile
}
```

### 2.5. Spacing & Line Breaks

```scss
// ✅ GOOD: Dòng trống giữa các blocks
.component {
	display: flex;
	padding: 20px;
}

.component__title {
	font-size: 2rem;
}

.component__description {
	color: #333;
}

// ❌ BAD: Không có spacing
.component {
	display: flex;
	padding: 20px;
}
.component__title {
	font-size: 2rem;
}
```

---

## 3. File Naming Conventions

### 3.1. Component Files

| Loại              | Convention            | Ví dụ                                     |
| ----------------- | --------------------- | ----------------------------------------- |
| **JSX Component** | PascalCase.jsx        | `Header.jsx`, `HeroSection.jsx`           |
| **SCSS Partial**  | \_kebab-case.scss     | `_header.scss`, `_hero-section.scss`      |
| **Utility**       | camelCase.js          | `smoothScroll.js`, `formatDate.js`        |
| **Hook**          | useCamelCase.js       | `useScrollTrigger.js`, `useWindowSize.js` |
| **Context**       | PascalCaseContext.jsx | `LoadingContext.jsx`, `ThemeContext.jsx`  |

### 3.2. Folder Structure

```
ComponentName/
├── ComponentName.jsx    # Main component
├── index.jsx            # Barrel export (optional)
└── style.scss           # Component styles (optional)
```

**Barrel export example (`index.jsx`):**

```jsx
export { default } from "./ComponentName";
```

**Usage:**

```jsx
// Without barrel export
import Header from "@/components/Header/Header";

// With barrel export
import Header from "@/components/Header"; // ← Cleaner
```

---

## 4. Code Organization

### 4.1. Folder Responsibilities

| Folder        | Purpose                | Examples                            |
| ------------- | ---------------------- | ----------------------------------- |
| `components/` | Reusable UI components | `Button`, `Header`, `Footer`        |
| `pages/`      | Page-level components  | `Home`, `About`, `NotFound`         |
| `layouts/`    | Layout wrappers        | `MainLayout`, `AuthLayout`          |
| `hooks/`      | Custom React hooks     | `useScrollTrigger`, `useWindowSize` |
| `utils/`      | Utility functions      | `formatDate`, `debounce`            |
| `context/`    | React Context          | `LoadingContext`, `ThemeContext`    |
| `services/`   | API calls              | `apiService`, `authService`         |
| `routes/`     | Route configuration    | `AppRoutes.jsx`                     |
| `assets/`     | Images, fonts, etc.    | `logo.svg`, `hero-bg.jpg`           |

### 4.2. Khi Component Nên Tách Riêng?

#### ✅ **NÊN** tách thành component khi:

- Code >100 dòng
- Logic được reuse ở >2 nơi
- Component có state/logic riêng
- Component đại diện cho 1 UI pattern (Button, Card, Modal)

#### ❌ **KHÔNG NÊN** tách khi:

- Component <30 dòng và chỉ dùng 1 lần
- Component chỉ là markup wrapper đơn giản
- Tách sẽ làm code khó hiểu hơn

---

## 5. Comments & Documentation

### 5.1. JSDoc Comments

```jsx
/**
 * Button component with multiple variants
 * @param {string} label - Button text
 * @param {function} onClick - Click handler
 * @param {string} variant - Button style variant (primary|secondary|outline)
 * @param {boolean} disabled - Disabled state
 * @returns {JSX.Element}
 */
const Button = ({ label, onClick, variant = "primary", disabled = false }) => {
	// Implementation
};
```

### 5.2. Inline Comments

```jsx
// ✅ GOOD: Explain WHY, not WHAT
// Disable pointer events during animation to prevent double-click
gsap.to(element, { pointerEvents: "none" });

// ❌ BAD: Obvious comment
// Set opacity to 0
gsap.to(element, { opacity: 0 });
```

### 5.3. Section Dividers

```jsx
// ========================================
// CONSTANTS
// ========================================

// ========================================
// HELPER FUNCTIONS
// ========================================

// ========================================
// MAIN COMPONENT
// ========================================
```

### 5.4. TODO/FIXME Comments

```jsx
// TODO: Add error handling
// FIXME: Memory leak in useEffect
// NOTE: This depends on GSAP loaded globally
// HACK: Temporary workaround for Safari bug
```

---

## 6. Prettier & ESLint Rules

### 6.1. Prettier Config

**File:** `.prettierrc` (nếu có)

```json
{
	"semi": true,
	"singleQuote": false,
	"tabWidth": 4,
	"trailingComma": "es5",
	"printWidth": 120,
	"arrowParens": "always",
	"endOfLine": "auto"
}
```

**Auto-format:**

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### 6.2. ESLint Rules

**File:** `eslint.config.js`

```js
export default defineConfig([
	{
		files: ["**/*.{js,jsx}"],
		rules: {
			// Warnings
			"no-unused-vars": [
				"error",
				{
					varsIgnorePattern: "^[A-Z_]", // Ignore unused CONSTANTS
				},
			],

			// Best practices
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
	},
]);
```

**Run linter:**

```bash
npm run lint
```

### 6.3. VS Code Settings (khuyến nghị)

**File:** `.vscode/settings.json` (tùy chọn)

```json
{
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascriptreact]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[scss]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	}
}
```

---

## 7. Pre-commit Checklist

Trước khi commit, kiểm tra:

- [ ] **Code formatted**: `npm run format`
- [ ] **No lint errors**: `npm run lint`
- [ ] **No console.log**: Xóa debug logs
- [ ] **No commented code**: Xóa code không dùng
- [ ] **Imports cleaned**: Xóa unused imports
- [ ] **Components tested**: Test trên Desktop + Mobile + Tablet

---

## 8. Code Review Checklist

Khi review PR, kiểm tra:

- [ ] **Naming**: Variables/functions có tên rõ ràng?
- [ ] **Structure**: Component structure đúng template?
- [ ] **Reusability**: Code có thể reuse?
- [ ] **Performance**: Có memory leaks? Unnecessary re-renders?
- [ ] **Accessibility**: Có aria-labels? Keyboard navigation?
- [ ] **Responsive**: Test trên tất cả breakpoints?
- [ ] **Comments**: Code phức tạp có comments?

---

**Last Updated:** 2025-12-04  
**Maintainer:** VoAnhPhi

**Tài liệu liên quan:**

- [project-guidelines.md](./project-guidelines.md)
- [scss-guidelines.md](./scss-guidelines.md)
