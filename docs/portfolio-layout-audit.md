# Portfolio layout audit

> Mục đích: ảnh chụp hiện trạng giao diện để làm cơ sở lập kế hoạch nâng cấp layout.  
> Phạm vi: source hiện tại tại `src/`; chưa đề xuất hoặc thay đổi thiết kế trong tài liệu này.

## 1. Tổng quan sản phẩm

- **Stack:** React 19 + Vite, React Router, GSAP/ScrollTrigger, Lenis smooth scroll, Three.js; styling dùng SCSS và một phần hệ sinh thái Tailwind đã được cài đặt.
- **Phong cách thị giác:** brutalist/editorial: typography chữ hoa lớn, số thứ tự section, các layout lệch cột, accent/decoration lớn, màu nhấn và chuyển động cuộn.
- **Luồng vào trang:** loading screen preload font/ảnh/chunk, sau đó first-visit intro; nội dung chỉ hiện khi hoàn thành. Mỗi lần đã truy cập thì bỏ qua intro.
- **Điều hướng:** header fixed, menu desktop/mobile scroll đến các anchor section. Menu hiện không có liên kết đến Hero, dù logo `VP` dẫn tới `#`.
- **Routes:** `/` là Home; `/:slug` là trang chi tiết dự án; còn lại là NotFound. Layout chung bọc bởi `MainLayout`.

## 2. Bản đồ trải nghiệm hiện tại

```text
Loading / first-visit intro
        ↓
Header (desktop nav / mobile overlay)
        ↓
Hero (không đánh số, không anchor)
        ↓
01 About me
        ↓
02 Manifesto
        ↓
03 Works → /:slug (project detail)
        ↓
04 Trajectory
        ↓
05 Contact
        ↓
Footer (qua MainLayout)
```

## 3. Thành phần khung chung

### Loading và intro

- `LoadingScreen` preload icon social, ảnh hero, font và một số component trước khi hiện content.
- `FirstLoading` là overlay cho lần truy cập đầu, được điều khiển bằng `localStorage.hasVisited`.
- Đây là một phần đáng kể của first impression: hiện tại animation của các section còn phụ thuộc vào thời điểm content-ready và ScrollTrigger refresh.

### Header

- Logo `VP`, trạng thái **AVAILABLE**, menu desktop và menu overlay mobile.
- 5 nav item: **01 About**, **02 Manifesto**, **03 Works**, **04 Trajectory**, **05 Contact**.
- Khi scroll quá 100px, header chuyển sang state `--scrolled`.
- Mobile: có toggle 2 thanh, đóng bằng Escape hoặc sau khi chọn một mục; khoá scroll body trong lúc menu mở.
- Footer mobile của overlay chứa email và placeholder links GitHub/LinkedIn (`#`).

### Footer

- Có brand `voanhphi`, tagline “Design. Build. Ship — with care.” và dòng copyright theo năm hiện tại.
- Khu vực actions hiện để trống, nên footer chưa bổ sung chức năng điều hướng hay CTA thứ hai.

## 4. Trang chủ: các section theo thứ tự đọc

### Hero — `BrutalHero`

- **Vai trò:** giới thiệu cá nhân ngay đầu trang, không có `id` hoặc số section.
- **Nội dung:** tên được split theo ký tự để reveal animation; role, metadata, skill list, social links, lời nhắc scroll và visual/decor nền.
- **Chuyển động:** entry timeline nhiều tầng (accent → số trang trí → tên → role/meta → skills/social/scroll → visual), cộng thêm parallax cho tiêu đề và decor khi cuộn.
- **Ý nghĩa layout:** mật độ thông tin và chuyển động cao nhất trang; đây là điểm định vị thương hiệu/cá nhân chính.
- **Lưu ý khi redesign:** không nằm trong menu anchor; thêm `id="home"` hoặc điều hướng logo về top sẽ giúp luồng quay lại đầu trang rõ ràng hơn.

### 01 — About me — `#about`

- **Vai trò:** profile chuyên môn chi tiết, là section có lượng nội dung lớn nhất Home.
- **Header:** tiêu đề “ABOUT ME”, đoạn giới thiệu software engineer (full-stack, fintech/real estate, React/Next.js/NestJS, architecture/API/data flow, LLM/chatbot/workflow) và quote “Building scalable systems, not just interfaces”.
- **Bố cục:** grid bất đối xứng hai cột.
  - Cột trái: **Experience** và **Education**.
  - Cột phải: **Tech Stack** theo Frameworks / Databases / Others, sau đó **Tech Skills** dạng grid.
- **Dữ liệu kinh nghiệm hiện có:** R&D and Full Stack Developer tại Hopper Solution & Education (May–Sep 2025); Freelance Front-End Developer tại NhaNgonSaiGon (Jan–Apr 2025).
- **Chuyển động:** reveal số thứ tự, từng ký tự tiêu đề, intro, experience cards, tech categories/tags, skills, education; tiêu đề có parallax.
- **Ý nghĩa layout:** section chứng minh năng lực và độ tin cậy, nhưng có thể tạo “wall of content” nếu spacing, độ rộng dòng hoặc hierarchy chưa đủ rõ.

### 02 — Manifesto — `#manifesto`

- **Vai trò:** statement thương hiệu/nguyên tắc làm việc, là nhịp nghỉ giữa About chi tiết và Works.
- **Nội dung chính:** “I BUILD / DIGITAL EXPERIENCES / THAT STAND OUT.”; đoạn mô tả về bold aesthetics và purposeful interactions.
- **Nội dung phụ:** 3 statistics: `1+ Years Building`, `15+ Projects`, và `∞ Curiosity`; có số decoration/parallax lớn.
- **Chuyển động:** ba dòng headline reveal stagger khi scroll vào vùng nhìn thấy; counter chạy parallax.
- **Ý nghĩa layout:** section có thông điệp rõ, ít CTA; dùng để thiết lập cảm xúc hơn là hỗ trợ quyết định tuyển dụng/hợp tác.

### 03 — Works — `#works`

- **Vai trò:** portfolio projects và cổng vào các case study chi tiết.
- **Header:** “WORKS” kèm số lượng dự án (hiện 4).
- **Bố cục:** danh sách project dạng broken/alternating grid, item so le left/right.
- **Mỗi project card:** ảnh lazy-loaded; overlay “VIEW PROJECT”; index, category, year; title link; description; tech tags; border đổi trạng thái khi hover.
- **Dự án hiện có:**
  1. Tomatohub — AI Platform (2026), Next.js/FastAPI/PostgreSQL.
  2. Sonaspace — Web Platform (2025), React/Node.js/MongoDB.
  3. Cinema Booking System — Web App (2024), React/Node.js/MongoDB.
  4. Vexa Blog — Content Platform (2025), Next.js/Tailwind/Markdown.
- **CTA phụ:** “VIEW ALL PROJECTS” hiện là link `#`, chưa dẫn tới destination thực.
- **Chuyển động:** project cards reveal theo thứ tự; tiêu đề section parallax ngang.
- **Ý nghĩa layout:** section quan trọng nhất cho conversion; để dễ quét hơn, đặc biệt nên đánh giá tỷ lệ ảnh/text, thứ tự ưu tiên dự án, và tín hiệu CTA trên mobile.

### 04 — Trajectory — `#trajectory`

- **Vai trò:** kết nối năng lực kỹ thuật với ownership sản phẩm.
- **Nội dung chính:** headline “FROM CODE / TO PRODUCT”, timeline ngang và ba pha: **Build**, **Think**, **Own**.
- **Nội dung phụ:** một đoạn note giải thích mở rộng ownership từ engineer đến product owner; số decoration “03”.
- **Chuyển động:** line scale-in; 3 phase reveal stagger; counter parallax.
- **Ý nghĩa layout:** lý giải góc nhìn/định hướng nghề nghiệp sau khi người xem đã thấy project, nhưng headline và phase copy có thể cần tối ưu line length trên màn nhỏ.

### 05 — Contact — `#contact`

- **Vai trò:** CTA kết thúc trang.
- **Nội dung chính:** “LET’S BUILD SOMETHING TOGETHER.” và email `voanhphi.dev@gmail.com` qua `mailto:`.
- **Thông tin hỗ trợ:** Vietnam / Remote, trạng thái Available for work, GitHub/LinkedIn, copyright 2024.
- **Chuyển động:** CTA scale/fade khi scroll vào section.
- **Lưu ý nội dung:** GitHub và LinkedIn đang link tới domain chung (`https://github.com`, `https://linkedin.com`) thay vì profile; năm copyright khác với footer theo năm động.

## 5. Trang chi tiết dự án — `/:slug`

Mỗi project chọn từ Works sẽ mở một case study, gồm:

1. **Hero:** index/category/year, title/subtitle, role/client/duration, link live/source code và ảnh chính.
2. **01 Overview:** tóm tắt dự án.
3. **02 Tech Stack:** technologies dạng tags.
4. **03 The Challenge / 04 The Solution:** hai block so sánh trong một section.
5. **05 Key Features:** danh sách feature có số thứ tự và mô tả.
6. **06 Visual Gallery:** gallery ảnh, item đầu kích thước lớn.
7. **Navigation/CTA:** Back to Works và Get in touch.

Các block ở trang chi tiết được animate theo scroll; gallery, feature list, tech tags có hiệu ứng reveal riêng.

## 6. Tính nhất quán và điểm cần nhớ cho planning

- **Điểm mạnh:** cấu trúc kể chuyện rõ (identity → credentials → philosophy → evidence → direction → contact); section numbering giúp định hướng; animations và motion language nhất quán.
- **Tính lặp lại có chủ đích:** số index, counter trang trí, headline uppercase, offset grid và GSAP ScrollTrigger xuất hiện xuyên suốt.
- **Những khu vực cần kiểm tra khi bắt đầu nâng cấp layout:**
  - hierarchy/độ dễ quét trong About và Works;
  - khoảng trắng, chiều dài dòng, stacking và CTA ở breakpoint mobile/tablet;
  - điều hướng về Hero/top;
  - destination thật cho GitHub/LinkedIn và “View all projects”;
  - tính đồng nhất của năm copyright và các placeholder;
  - hiệu năng/khả năng đọc khi kết hợp Lenis, intro loading, GSAP và Three.js.

## 7. File liên quan chính

| Khu vực            | File chính                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| App/loading/scroll | `src/App.jsx`, `src/components/Loading/*`, `src/utils/SmoothScrollProvider.jsx`                                                                   |
| Routes/layout      | `src/routes/index.jsx`, `src/layouts/MainLayout.jsx`                                                                                              |
| Home order         | `src/pages/Home/Home.jsx`                                                                                                                         |
| Header/footer      | `src/components/Header/BrutalHeader.jsx`, `src/components/Footer/Footer.jsx`                                                                      |
| Home sections      | `src/components/Section/BrutalHero.jsx`, `BrutalAbout.jsx`, `BrutalManifesto.jsx`, `BrutalWorks.jsx`, `BrutalTrajectory.jsx`, `BrutalContact.jsx` |
| Case study         | `src/pages/Detail/BrutalDetail.jsx`, `src/data/projects.js`                                                                                       |
