let isThreeSceneReady = false;
let resolveThreeSceneReady;

const threeSceneReadyPromise = new Promise((resolve) => {
	resolveThreeSceneReady = resolve;
});

export const markThreeSceneReady = () => {
	if (isThreeSceneReady) return;
	isThreeSceneReady = true;
	resolveThreeSceneReady();
};

export const waitForThreeSceneReady = (timeoutMs = 12000) => {
	if (isThreeSceneReady) return Promise.resolve();

	let timeoutId;
	const timeoutPromise = new Promise((_, reject) => {
		timeoutId = window.setTimeout(() => {
			reject(new Error("Three.js did not render its first frame in time"));
		}, timeoutMs);
	});

	return Promise.race([threeSceneReadyPromise, timeoutPromise]).finally(() => {
		window.clearTimeout(timeoutId);
	});
};
