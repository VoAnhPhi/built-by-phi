# Agents Directory - README

> **Thư mục này chứa các tài liệu hướng dẫn dành cho AI Agents và developers để hiểu rõ cấu trúc và quy định của Portfolio_V2 project.**

---

## 📚 Danh Sách Tài Liệu

### 1. [project-guidelines.md](./project-guidelines.md)

**Quy định tổng quan về project**

- Tech stack và dependencies
- Cấu trúc thư mục chi tiết
- SCSS architecture overview
- Coding conventions
- Component guidelines
- Git workflow
- Development workflow

**Đọc file này trước tiên** để có cái nhìn tổng quan về project.

---

### 2. [scss-guidelines.md](./scss-guidelines.md)

**Hướng dẫn chi tiết về SCSS**

- Import structure và thứ tự import bắt buộc
- SCSS variables reference (static & dynamic)
- Mixins reference với examples
- Responsive guidelines (desktop-first approach)
- File organization (core, components, sections, pages)
- Best practices và performance tips

**Đọc file này** khi làm việc với styles, responsive design, hoặc tạo SCSS files mới.

---

### 3. [coding-conventions.md](./coding-conventions.md)

**Quy định về code format và style**

- JavaScript/JSX formatting
- SCSS/CSS formatting
- File naming conventions
- Code organization
- Comments & documentation
- Prettier & ESLint rules
- Pre-commit checklist

**Đọc file này** khi code components mới, review code, hoặc setup dev environment.

---

### 4. [walkthrough.md](./walkthrough.md)

**Project walkthrough và implementation details**

- Chi tiết về các features đã implement
- GSAP animations setup
- Component implementations
- Testing results

**Đọc file này** để hiểu các features đã có và cách chúng được implement.

---

## 🎯 Quy Tắc Vàng

### Khi Bắt Đầu Làm Việc:

1. ✅ Đọc [project-guidelines.md](./project-guidelines.md) để hiểu project structure
2. ✅ Kiểm tra [scss-guidelines.md](./scss-guidelines.md) nếu làm việc với styles
3. ✅ Tuân thủ [coding-conventions.md](./coding-conventions.md) khi viết code

### Khi Tạo Component Mới:

1. ✅ Kiểm tra naming conventions trong [coding-conventions.md](./coding-conventions.md)
2. ✅ Sử dụng component structure template
3. ✅ Nếu tạo SCSS file, tuân thủ import order trong [scss-guidelines.md](./scss-guidelines.md)

### Khi Code SCSS:

1. ✅ Sử dụng BEM naming convention
2. ✅ Import theo đúng thứ tự: core → components → sections → pages
3. ✅ Sử dụng SCSS variables cho static values, CSS custom properties cho responsive values
4. ✅ Không nest quá 3 levels

### Trước Khi Commit:

1. ✅ `npm run format` - Format code
2. ✅ `npm run lint` - Check linter
3. ✅ Xóa console.log và commented code
4. ✅ Test trên Desktop + Mobile + Tablet

---

## 📖 Tài Liệu Bên Ngoài

- **React Documentation**: https://react.dev/
- **GSAP Documentation**: https://gsap.com/docs/
- **Sass Guidelines**: https://sass-guidelin.es/
- **BEM Methodology**: http://getbem.com/

---

## 📞 Liên Hệ

**Maintainer:** VoAnhPhi  
**Email:** voanhphi.dev@gmail.com  
**GitHub:** [@voanhphi](https://github.com/voanhphi)

---

## 🔄 Cập Nhật

**Last Updated:** 2025-12-04  
**Version:** 1.0.0

Khi có thay đổi lớn về architecture hoặc conventions, vui lòng cập nhật các file quy định tương ứng.
