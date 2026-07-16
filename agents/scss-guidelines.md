# SCSS Guidelines - Portfolio_V2

> **Mục đích:** Hướng dẫn chi tiết về SCSS architecture, variables, mixins và best practices cho project Portfolio_V2

---

## 📋 Mục Lục

1. [Import Structure](#1-import-structure)
2. [Variables Reference](#2-variables-reference)
3. [Mixins Reference](#3-mixins-reference)
4. [Responsive Guidelines](#4-responsive-guidelines)
5. [File Organization](#5-file-organization)
6. [Best Practices](#6-best-practices)

---

## 1. Import Structure

### 1.1. Thứ Tự Import Bắt Buộc

**File:** `src/styles/scss/style.scss`

```scss
// ============================================
// 1. CORE - Foundation (LUÔN IMPORT TRƯỚC)
// ============================================
@import "core/reset"; // Normalize CSS, reset defaults
@import "core/variables"; // SCSS variables + CSS custom properties
@import "core/mixins"; // All mixins & helper functions
@import "core/layouts"; // Grid system, container, utilities
@import "core/fonts"; // @font-face declarations
@import "core/bootstrap_mini"; // Minimal Bootstrap utilities

// ============================================
// 2. COMPONENTS - Reusable UI Elements
// ============================================
@import "components/heading"; // Header component
@import "components/footer"; // Footer component
// Thêm components mới ở đây theo alphabet order

// ============================================
// 3. SECTIONS - Page Sections
// ============================================
@import "sections/hero";
@import "sections/info";
@import "sections/showcase";
@import "sections/profile";
@import "sections/test";
// Thêm sections mới ở đây

// ============================================
// 4. PAGES - Page-specific Styles
// ============================================
@import "pages/homepage";
@import "pages/showcase";
@import "pages/notfound";
// Thêm pages mới ở đây
```

### 1.2. Quy Tắc Thêm Import Mới

#### ✅ **Khi thêm Component SCSS:**

```scss
// components/_my-component.scss (tạo file mới)
// Sau đó thêm vào style.scss:

@import "components/footer"; // ← Existing
@import "components/my-component"; // ← NEW (alphabetical order)
```

#### ✅ **Khi thêm Section SCSS:**

```scss
// Thêm vào phần SECTIONS theo thứ tự xuất hiện trên trang
@import "sections/hero";
@import "sections/my-section"; // ← NEW
@import "sections/info";
```

#### ❌ **KHÔNG BAO GIỜ:**

- Import file core sau khi import components/sections
- Import file SCSS trong JSX component (`import './style.scss'` ← SAI!)
- Tạo file SCSS riêng cho component nhỏ (<30 dòng)

---

## 2. Variables Reference

### 2.1. Static Variables (SCSS Variables)

**File:** `core/_variables.scss`

#### Breakpoints (Desktop-first)

```scss
// Minimum widths
$xxl-min: 1660px; // Màn hình lớn (27" monitor)
$lg-min: 1440px; // Desktop chuẩn
$md-min: 992px; // Laptop / Tablet ngang
$sm-min: 768px; // Tablet dọc
$xs-min: 576px; // Mobile lớn

// Maximum widths (auto-calculated)
$xxl-max: 1659px; // = $xxl-min - 1px
$lg-max: 1439px; // = $lg-min - 1px
$md-max: 991px; // = $md-min - 1px
$sm-max: 767px; // = $sm-min - 1px
$xs-max: 575px; // = $xs-min - 1px
```

#### Colors

```scss
$primary-cl: #fdfbf0; // Màu nền chính (cream white)
$secondary-cl: #030302; // Màu text chính (near black)
$highlight-cl: #550707; // Màu nhấn 1 (dark red)
$highlight-cl-2: #4c6851; // Màu nhấn 2 (dark green)
```

**Sử dụng:**

```scss
.component {
	background-color: $primary-cl;
	color: $secondary-cl;
	border-color: $highlight-cl;
}
```

#### Spacing

```scss
$pmobile: 16px; // Padding mobile
$ptablet: 50px; // Padding tablet
$ptop: 80px; // Padding top sections
$pbtm: 100px; // Padding bottom sections
```

#### Transitions

```scss
$t: 0.4s; // Duration mặc định
$cubic: cubic-bezier(0.84, 0.13, 0.33, 0.97); // Easing curve

// Sử dụng:
.button {
	transition: all $t $cubic;
}
```

### 2.2. Dynamic Variables (CSS Custom Properties)

**File:** `core/_variables.scss` (trong `:root {}`)

#### Typography Sizes

```scss
:root {
	// Heading 1
	--h1-fs: 7.2rem; // font-size
	--h1-lh: 8rem; // line-height

	// Heading 2
	--h2-fs: 5.2rem;
	--h2-lh: 6rem;

	// Heading 3
	--h3-fs: 3.2rem;
	--h3-lh: 4.2rem;

	// Heading 4
	--h4-fs: 2.4rem;
	--h4-lh: 3.2rem;

	// Heading 5
	--h5-fs: 2rem;
	--h5-lh: 3rem;

	// Body 16
	--body16-fs: 1.6rem;
	--body16-lh: 2.6rem;

	// Body 14
	--body14-fs: 1.4rem;
	--body14-lh: 2.2rem;
}
```

**Sử dụng:**

```scss
h1 {
	font-size: var(--h1-fs);
	line-height: var(--h1-lh);
}
```

#### Layout Variables

```scss
:root {
	--gap: 60px; // Grid gap & container padding
	--height-header: 80px; // Header height (fixed)
	--height-button: 56px; // Button height
	--ptop: 76px; // Page padding top (below header)
	--pd-section: 120px; // Section padding top/bottom
}
```

#### Mobile Overrides

```scss
:root {
	// Desktop values (xem trên)

	@media (max-width: $xs-max) {
		// ≤575px
		// Override cho mobile
		--h1-fs: 3.6rem;
		--h1-lh: 4.2rem;

		--h2-fs: 2.8rem;
		--h2-lh: 3.8rem;

		--h3-fs: 2.2rem;
		--h3-lh: 3rem;

		--h4-fs: 2rem;
		--h4-lh: 3.2rem;

		--gap: 20px;
		--height-header: 70px;
		--pd-section: 50px;
		--ptop: 120px;
	}
}
```

---

## 3. Mixins Reference

**File:** `core/_mixins.scss`

### 3.1. Responsive Mixins

#### Breakpoint Mixins

```scss
// Large desktop (≥1660px)
@include xxl {
	/* styles */
}

// Desktop (1440px - 1659px)
@include lg {
	/* styles */
}

// Laptop / Tablet landscape (992px - 1439px)
@include md {
	/* styles */
}

// Tablet portrait (768px - 991px)
@include sm {
	/* styles */
}

// Mobile (≤767px)
@include xs {
	/* styles */
}

// Small mobile (≤575px)
@include xxs {
	/* styles */
}
```

**Ví dụ sử dụng:**

```scss
.hero {
	padding: 120px 0;

	@include xs {
		padding: 60px 0; // Mobile: padding nhỏ hơn
	}

	@include xxs {
		padding: 40px 0; // Small mobile: padding nhỏ hơn nữa
	}
}
```

#### Custom Width/Height Mixins

```scss
// Max width
@include maxW(1200px) {
	/* styles */
}

// Min width
@include minW(800px) {
	/* styles */
}

// Max height
@include maxH(600px) {
	/* styles */
}

// Min height
@include minH(800px) {
	/* styles */
}
```

#### Orientation Mixins

```scss
// Desktop landscape
@include mdX {
	/* max-width: 991px + landscape */
}

// Tablet landscape
@include smX {
	/* max-width: 767px + landscape */
}

// Mobile landscape
@include xsX {
	/* max-width: 575px + landscape */
}
```

### 3.2. Animation Mixins

```scss
// Keyframe animation (with vendor prefixes)
@include keyframes(fade-in) {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

// Animation property
@include animation(fade-in 0.5s ease-in-out);

// Transform
@include transform(translate(-50%, -50%));

// Transform origin
@include transform-origin(center center);

// Transition
@include transition(all 0.3s ease);

// Transition delay
@include transition-delay(0.2s);
```

### 3.3. Layout Mixins

#### Centering

```scss
// Absolute centering (transform)
@include mid; // position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);

// Flexbox centering
@include mid(flex); // display: flex; align-items: center; justify-content: center;
```

**Ví dụ:**

```scss
.modal {
	@include mid; // Center modal in viewport
}

.card {
	@include mid(flex); // Center content with flexbox
}
```

#### Fullscreen

```scss
// Fullscreen (absolute)
@include fullscreen; // width: 100%; height: 100%; top: 0; left: 0; position: absolute;

// Fullscreen (fixed)
@include fullscreen(fixed); // Same as above but position: fixed;
```

#### Size

```scss
// Square
@include size(50px); // width: 50px; height: 50px;

// Rectangle
@include size(100px, 50px); // width: 100px; height: 50px;
```

#### Border Radius

```scss
@include br(8px); // border-radius: 8px; background-clip: padding-box;
```

### 3.4. Utility Mixins

#### Visibility Toggle

```scss
// Visible
@include visible(1); // opacity: 1; pointer-events: auto;

// Hidden
@include visible(0); // opacity: 0; pointer-events: none;
```

#### Image Centering

```scss
.image-wrapper {
	position: relative;

	img {
		@include midimg(120%); // Center image + max-width: 120%;
	}
}
```

#### Text Ellipsis

```scss
// Single line ellipsis
.title {
	@include overtext(1); // Truncate after 1 line
}

// Multi-line ellipsis
.description {
	@include overtext(3); // Truncate after 3 lines
}
```

#### Custom Scrollbar

```scss
.scrollable-container {
	@include customscroll(8px, #000, #ddd);
	// width: 8px
	// track background: #000
	// thumb background: #ddd
}
```

#### Typography

```scss
@include text($font-size: 1.6rem, $font-family: "Arial", $line-height: 2.4rem, $color: #333, $text-transform: uppercase);
```

---

## 4. Responsive Guidelines

### 4.1. Desktop-First Approach

Portfolio_V2 sử dụng **desktop-first approach** (khác với mobile-first):

```scss
.component {
	// Desktop styles (default)
	padding: 120px 60px;
	font-size: 2.4rem;

	// Override cho màn hình nhỏ hơn
	@include xs {
		// ≤767px (Mobile)
		padding: 60px 20px;
		font-size: 1.8rem;
	}

	@include xxs {
		// ≤575px (Small mobile)
		padding: 40px 16px;
		font-size: 1.6rem;
	}
}
```

### 4.2. Khi Nào Dùng SCSS Variables vs CSS Custom Properties?

| Loại                 | Dùng SCSS Variables | Dùng CSS Custom Properties    |
| -------------------- | ------------------- | ----------------------------- |
| **Colors**           | ✅ `$primary-cl`    | ❌ Không cần                  |
| **Static spacing**   | ✅ `$pmobile`       | ❌ Không cần                  |
| **Breakpoints**      | ✅ `$sm-max`        | ❌ Không hỗ trợ media queries |
| **Typography sizes** | ❌ Không flexible   | ✅ `--h1-fs` (responsive)     |
| **Layout sizes**     | ❌ Không flexible   | ✅ `--gap`, `--pd-section`    |

**Lý do:** CSS Custom Properties có thể override trong media queries, SCSS variables không thể.

### 4.3. Responsive Checklist

Khi code responsive, luôn kiểm tra:

- [ ] Desktop (1440px+) - Styles mặc định
- [ ] Laptop (992px - 1439px) - `@include md`
- [ ] Tablet (768px - 991px) - `@include sm`
- [ ] Mobile (≤767px) - `@include xs`
- [ ] Small Mobile (≤575px) - `@include xxs`
- [ ] Landscape modes (nếu cần)

---

## 5. File Organization

### 5.1. Core Files

```
core/
├── _reset.scss          # CSS reset + normalize
├── _variables.scss      # Variables (static + dynamic)
├── _mixins.scss         # All mixins
├── _layouts.scss        # Grid, container, layout utilities
├── _fonts.scss          # @font-face declarations
└── _bootstrap_mini.scss # Minimal Bootstrap utilities
```

**Quy tắc:** Không sửa file core trừ khi có lý do cụ thể.

### 5.2. Component Files

```
components/
├── _heading.scss   # Header component styles
├── _footer.scss    # Footer component styles
└── ...
```

**Naming convention:**

- File name: `_component-name.scss` (lowercase, dash-separated)
- Class names: `.component-name` (BEM)

### 5.3. Section Files

```
sections/
├── _hero.scss
├── _info.scss
├── _showcase.scss
├── _profile.scss
└── ...
```

### 5.4. Page Files

```
pages/
├── _homepage.scss
├── _showcase.scss
├── _notfound.scss
└── ...
```

---

## 6. Best Practices

### 6.1. Khi Tạo File SCSS Mới

#### Step 1: Tạo file với underscore prefix

```bash
# Đúng
src/styles/scss/components/_my-component.scss

# Sai (thiếu underscore)
src/styles/scss/components/my-component.scss
```

#### Step 2: Sử dụng BEM naming

```scss
// _my-component.scss
.my-component {
	// Block styles

	&__element {
		// Element styles
	}

	&__element-child {
		// Nested element
	}

	&--modifier {
		// Modifier styles
	}
}
```

#### Step 3: Import vào `style.scss`

```scss
// style.scss
@import "components/my-component"; // NO underscore, NO .scss extension
```

### 6.2. Nesting Rules

#### ✅ GOOD: Nesting có giới hạn

```scss
.hero {
	padding: 120px 0;

	&__content {
		// .hero__content
		display: flex;
	}

	&__title {
		// .hero__title
		font-size: var(--h1-fs);
	}

	@include xs {
		// Media query
		padding: 60px 0;
	}
}
```

#### ❌ BAD: Nesting quá sâu

```scss
.hero {
	.content {
		.left {
			.title {
				.text {
					// ← 5 levels! Too deep!
					color: red;
				}
			}
		}
	}
}

// Tạo ra selector: .hero .content .left .title .text (quá specific!)
```

**Quy tắc:** Không nest quá 3 levels (trừ media queries và pseudo-selectors).

### 6.3. Variables Best Practices

#### ✅ GOOD: Semantic naming

```scss
$primary-cl: #fdfbf0; // ✅ Tên mang ý nghĩa
$highlight-cl: #550707; // ✅ Mô tả mục đích

--gap: 60px; // ✅ Ngắn gọn, rõ ràng
--pd-section: 120px; // ✅ Descriptive
```

#### ❌ BAD: Generic naming

```scss
$color1: #fdfbf0; // ❌ Không mang ý nghĩa
$color2: #550707; // ❌ Khó nhớ

--spacing-1: 60px; // ❌ Không rõ dùng cho gì
--padding-sections: 120px; // ❌ Quá dài
```

### 6.4. Commenting Best Practices

```scss
//=============================================
// SECTION DIVIDER (for major sections)
//=============================================

// Single-line comment (for brief explanations)

/*
 * Multi-line comment
 * For longer explanations
 */

.component {
	// TODO: Optimize this later
	// FIXME: Bug with IE11
	// NOTE: This requires GSAP loaded
}
```

### 6.5. Performance Tips

#### ✅ GOOD: Efficient selectors

```scss
.button {
} // ✅ Fast
.button--primary {
} // ✅ Fast
```

#### ❌ BAD: Inefficient selectors

```scss
div.button {
} // ❌ Unnecessary tag
.container .row .col .button {
} // ❌ Too specific
[class*="button"] {
} // ❌ Attribute selector (slow)
```

### 6.6. Avoiding !important

```scss
// ❌ BAD: Overusing !important
.button {
	color: red !important;
	background: blue !important; // Hard to override
}

// ✅ GOOD: Increase specificity instead
.component .button {
	color: red;
	background: blue;
}

// ✅ BETTER: Use modifier classes
.button {
	color: blue;
	background: white;
}

.button--primary {
	color: red;
	background: blue;
}
```

**Quy tắc:** Chỉ dùng `!important` khi override third-party CSS (Bootstrap, etc.)

---

## 7. Checklist Khi Viết SCSS

- [ ] Import đúng thứ tự trong `style.scss`
- [ ] Sử dụng BEM naming convention
- [ ] Không nest quá 3 levels
- [ ] Sử dụng mixins cho responsive
- [ ] Sử dụng CSS Custom Properties cho giá trị responsive
- [ ] Sử dụng SCSS variables cho giá trị static
- [ ] Comment code phức tạp
- [ ] Tránh `!important`
- [ ] Test trên tất cả breakpoints

---

## 📚 Tài Liệu Tham Khảo

- [BEM Methodology](http://getbem.com/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

**Last Updated:** 2025-12-04  
**Maintainer:** VoAnhPhi
