import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import SmoothScrollProvider from "./utils/SmoothScrollProvider";
import LoadingScreen from "./components/Loading/LoadingScreen";
import FirstLoading from "./components/Loading/FirstLoading";
import PageTransition from "./components/Loading/PageTransition";
import { ContentReadyProvider } from "./hooks/useContentReady";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INITIAL_ASSETS = [
	"/img/icon/github2.svg",
	"/img/icon/link2.svg",
];
const PRELOAD_CHUNKS = [];

export default function App() {
	const [phase, setPhase] = useState("loading");

	// Kiểm tra lần truy cập đầu tiên
	const isFirstVisit = !localStorage.getItem("hasVisited");

	const handleLoadingDone = () => {
		if (isFirstVisit) {
			setPhase("intro");
		} else {
			setPhase("content");
		}
	};

	const handleIntroDismiss = () => {
		localStorage.setItem("hasVisited", "true");
		setPhase("content");
	};

	// Content is ready when phase is "content"
	const isContentReady = phase === "content";

	// Refresh ScrollTrigger và start Lenis khi content sẵn sàng
	useEffect(() => {
		if (isContentReady) {
			// Delay nhỏ để đảm bảo DOM đã render xong
			const timeoutId = setTimeout(() => {
				// Scroll về top
				window.scrollTo(0, 0);
				if (window.lenis) {
					window.lenis.scrollTo(0, { immediate: true });
					window.lenis.start();
				}
				// Refresh ScrollTrigger để tính lại positions
				ScrollTrigger.refresh(true);
			}, 100);

			return () => clearTimeout(timeoutId);
		}
	}, [isContentReady]);

	return (
		<ContentReadyProvider isReady={isContentReady}>
			{/* Loading Screen - chỉ hiển thị khi đang loading */}
			{phase === "loading" && (
				<LoadingScreen
					onComplete={handleLoadingDone}
					assets={INITIAL_ASSETS}
					preloadChunks={PRELOAD_CHUNKS}
					useFonts={false}
					minVisibleMs={900}
					idleDurationMs={700}
					fadeOutMs={250}
				/>
			)}

			{/* FirstLoading - persist để tránh flicker, control bằng phase */}
			{(phase === "loading" || phase === "intro") && <FirstLoading phase={phase} isFirstVisit={isFirstVisit} onDismiss={handleIntroDismiss} />}

			{/* SmoothScrollProvider wrap toàn bộ content */}
			<SmoothScrollProvider>
				{/* Main Content - use visibility instead of opacity to avoid GSAP conflicts */}
				<div
					data-content-ready={isContentReady}
					style={{
						visibility: isContentReady ? "visible" : "hidden",
						pointerEvents: isContentReady ? "auto" : "none",
					}}
				>
					<main>
						<PageTransition>
							<AppRoutes />
						</PageTransition>
					</main>
				</div>
			</SmoothScrollProvider>
		</ContentReadyProvider>
	);
}
