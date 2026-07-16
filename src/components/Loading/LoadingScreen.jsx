import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Helpers -------------------------------------------------
const preloadImage = (src) =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = img.onerror = () => resolve();
		img.src = src;
	});

// Preload font bằng FontFace API - đảm bảo font được load trước khi sử dụng
const preloadFont = (fontFamily, src, options = {}) =>
	new Promise((resolve) => {
		const font = new FontFace(fontFamily, `url(${src})`, {
			weight: options.weight || "normal",
			style: options.style || "normal",
		});
		font
			.load()
			.then((loadedFont) => {
				document.fonts.add(loadedFont);
				resolve();
			})
			.catch(() => resolve()); // không fail nếu font lỗi
	});

// Default fonts - đưa ra ngoài để tránh tạo mới mỗi render
const DEFAULT_PRELOAD_FONTS = [
	{
		family: "B-s-Bold",
		src: "/fonts/BigShouldersDisplay-Bold.woff2",
		weight: "700",
	},
	{
		family: "B-vn-Medium",
		src: "/fonts/BeVietnamPro-Medium.woff2",
		weight: "500",
	},
];

// Component -------------------------------------------------
const LoadingScreen = ({
	onComplete, // hàm gọi khi ẩn xong
	assets = [], // danh sách ảnh cần preload
	preloadChunks = [], // mảng hàm () => import('...')
	useFonts = true, // có đợi fonts.ready hay không
	minVisibleMs = 800, // tối thiểu màn loading hiển thị
	idleDurationMs = 700, // khi không có task, chạy giả lập trong thời gian này
	fadeOutMs = 500, // thời gian fade-out
	// Fonts cần preload trước (quan trọng nhất cho loading screen UI)
	preloadFonts = DEFAULT_PRELOAD_FONTS,
}) => {
	const screenRef = useRef(null);
	const barRef = useRef(null);
	const textRef = useRef(null);

	const progressObj = useRef({ value: 0 }); // dùng tween mượt
	const tweenRef = useRef(null);
	const [progress, setProgress] = useState(0);

	// cập nhật UI
	const updateUI = (pct) => {
		const v = Math.max(0, Math.min(100, Math.round(pct)));
		setProgress(v);
		if (barRef.current) barRef.current.style.width = `${v}%`;
		if (textRef.current) textRef.current.textContent = `LOADING ${v}%`;
	};
	// tween progress mượt
	const tweenTo = (toPct, durationMs = 300, ease = "power1.out", onComplete) => {
		tweenRef.current?.kill();
		tweenRef.current = gsap.to(progressObj.current, {
			value: toPct,
			duration: Math.max(0.05, durationMs / 1000),
			ease,
			onUpdate: () => updateUI(progressObj.current.value),
			onComplete,
		});
	};

	const fadeOut = () => {
		gsap.to(screenRef.current, {
			opacity: 0,
			duration: fadeOutMs / 1000,
			onComplete: () => {
				gsap.set(screenRef.current, { visibility: "hidden" });
				onComplete?.();
			},
		});
	};

	useEffect(() => {
		// Scroll về top ngay lập tức
		window.scrollTo(0, 0);

		// Chặn scroll khi loading - thêm cho CẢ html và body
		document.documentElement.classList.add("no-scroll");
		document.body.classList.add("no-scroll");

		// Dừng Lenis nếu có
		try {
			window.lenis?.stop();
		} catch {}

		// Chặn wheel và touch events
		const preventScroll = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};

		window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
		window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });

		const startAt = Date.now();
		let destroyed = false;

		// Build tasks list -----------------------------------
		const tasks = [];

		// 1) FONTS TRƯỚC TIÊN - ưu tiên cao nhất để loading screen hiển thị đẹp
		for (const fontConfig of preloadFonts) {
			const fontTask = preloadFont(fontConfig.family, fontConfig.src, {
					weight: fontConfig.weight,
					style: fontConfig.style,
				});
			tasks.push(fontTask);
		}

		// 2) Ảnh
		for (const src of assets) tasks.push(preloadImage(src));

		// 3) Đợi tất cả fonts trong document sẵn sàng
		if (useFonts && document.fonts && document.fonts.ready) {
			tasks.push(document.fonts.ready.catch(() => {}));
		}

		// 4) Code-split chunk
		for (const importer of preloadChunks) tasks.push(importer().catch(() => {}));

		const total = tasks.length;

		// Cleanup function
		const cleanup = () => {
			tweenRef.current?.kill();
			document.documentElement.classList.remove("no-scroll");
			document.body.classList.remove("no-scroll");
			window.removeEventListener("wheel", preventScroll, { capture: true });
			window.removeEventListener("touchmove", preventScroll, { capture: true });
			window.scrollTo(0, 0);
			setTimeout(() => {
				try {
					window.lenis?.start();
				} catch {}
			}, 50);
		};

		// Không có task: vẫn chạy load mượt rồi out
		if (total === 0) {
			progressObj.current.value = 0;
			updateUI(0);
			tweenTo(100, idleDurationMs, "linear", fadeOut);
			return () => {
				destroyed = true;
				cleanup();
			};
		}

		// === LOGIC MỚI: Progress chạy đều theo thời gian ===
		// Chạy linear từ 0 -> 90% trong suốt minVisibleMs
		// Khi tất cả tasks xong VÀ đã đủ minVisibleMs -> chạy tiếp 90 -> 100% rồi fade out

		progressObj.current.value = 0;
		updateUI(0);

		// Bắt đầu tween linear từ 0 -> 90% trong minVisibleMs
		tweenTo(90, minVisibleMs, "linear");

		// Đợi tất cả tasks hoàn thành
		Promise.allSettled(tasks).then(() => {
			if (destroyed) return;

			const elapsed = Date.now() - startAt;
			const remain = Math.max(0, minVisibleMs - elapsed);

			// Hàm kết thúc: chạy từ vị trí hiện tại -> 100% rồi fade out
			const finish = () => {
				if (destroyed) return;
				const currentProgress = progressObj.current.value;
				// Tính thời gian còn lại tỷ lệ với % còn phải chạy
				const remainingPercent = 100 - currentProgress;
				const finishDuration = Math.max(200, (remainingPercent / 10) * 100); // ~100ms mỗi 10%
				tweenTo(100, finishDuration, "power1.out", fadeOut);
			};

			if (remain > 0) {
				// Vẫn còn thời gian minVisible, đợi thêm rồi finish
				setTimeout(finish, remain);
			} else {
				// Đã đủ minVisible, finish ngay
				finish();
			}
		});

		return () => {
			destroyed = true;
			cleanup();
		};
	}, [assets, preloadChunks, preloadFonts, useFonts, minVisibleMs, idleDurationMs, fadeOutMs, onComplete]);

	return (
		<div className="loading-screen" ref={screenRef}>
			<div className="loading-logo">VOANHPHI</div>
			<div className="loading-container">
				<div className="loading-bar" ref={barRef} />
			</div>
			<div className="loading-text" ref={textRef}>
				LOADING {progress}%
			</div>
		</div>
	);
};

export default LoadingScreen;
