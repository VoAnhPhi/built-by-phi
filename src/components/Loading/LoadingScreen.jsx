import { useEffect, useRef } from "react";
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
	keepScrollLockedOnComplete = false,
	// Fonts cần preload trước (quan trọng nhất cho loading screen UI)
	preloadFonts = DEFAULT_PRELOAD_FONTS,
}) => {
	const screenRef = useRef(null);
	const barRef = useRef(null);
	const textRef = useRef(null);

	const progressObj = useRef({ value: 0 }); // dùng tween mượt
	const tweenRef = useRef(null);

	// cập nhật UI
	const updateUI = (pct) => {
		const v = Math.max(0, Math.min(100, Math.round(pct)));
		if (barRef.current) barRef.current.style.width = `${v}%`;
		if (textRef.current) textRef.current.textContent = `LOADING ${v}%`;
	};
	// tween progress mượt
	const tweenTo = (toPct, durationMs = 300, ease = "power1.out", onComplete) => {
		tweenRef.current?.kill();
		const distance = Math.abs(toPct - progressObj.current.value);
		const readableDurationMs = Math.max(durationMs, distance * 12);
		tweenRef.current = gsap.to(progressObj.current, {
			value: toPct,
			duration: Math.max(0.05, readableDurationMs / 1000),
			ease,
			overwrite: true,
			onUpdate: () => updateUI(progressObj.current.value),
			onComplete: () => {
				updateUI(toPct);
				onComplete?.();
			},
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
		let finishTimer;
		let fadeTimer;

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
			window.clearTimeout(finishTimer);
			window.clearTimeout(fadeTimer);
			window.removeEventListener("wheel", preventScroll, { capture: true });
			window.removeEventListener("touchmove", preventScroll, { capture: true });
			window.scrollTo(0, 0);

			// FirstLoading owns the scroll lock during the intro phase.
			if (keepScrollLockedOnComplete) return;

			document.documentElement.classList.remove("no-scroll");
			document.body.classList.remove("no-scroll");
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

		// Progress 0 -> 90% phản ánh số tác vụ tải thực sự đã hoàn tất.
		// 90 -> 100% là bước xác nhận readiness và chuyển màn hình.
		progressObj.current.value = 0;
		updateUI(0);

		let completedTasks = 0;
		const trackedTasks = tasks.map((task) =>
			Promise.resolve(task).finally(() => {
				if (destroyed) return;
				completedTasks += 1;
				const actualProgress = (completedTasks / total) * 90;
				tweenTo(actualProgress, 300, "power1.out");
			}),
		);

		// Đợi tất cả tasks hoàn thành
		Promise.allSettled(trackedTasks).then(() => {
			if (destroyed) return;

			// Luôn hiển thị rõ mốc 90% trước khi xác nhận readiness.
			const finish = () => {
				if (destroyed) return;
				const elapsed = Date.now() - startAt;
				const remain = Math.max(0, minVisibleMs - elapsed);
				const showComplete = () => {
					tweenTo(100, 320, "power1.out", () => {
						fadeTimer = window.setTimeout(fadeOut, 180);
					});
				};

				if (remain > 0) {
					finishTimer = window.setTimeout(showComplete, remain);
				} else {
					showComplete();
				}
			};

			tweenTo(90, 600, "power1.out", finish);
		});

		return () => {
			destroyed = true;
			cleanup();
		};
	}, [assets, preloadChunks, preloadFonts, useFonts, minVisibleMs, idleDurationMs, fadeOutMs, keepScrollLockedOnComplete, onComplete]);

	return (
		<div className="loading-screen" ref={screenRef}>
			<div className="loading-logo">VOANHPHI</div>
			<div className="loading-container">
				<div className="loading-bar" ref={barRef} />
			</div>
			<div className="loading-text" ref={textRef}>
				LOADING 0%
			</div>
		</div>
	);
};

export default LoadingScreen;
