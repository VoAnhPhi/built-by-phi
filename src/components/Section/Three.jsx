// ThreeScene.jsx
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";

export default function ThreeScene() {
	const containerRef = useRef(null);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// ===== Palette khớp SCSS =====
		const PALETTE = {
			primary: 0xfcfcfc, // torus & specular tint
			secondary: 0x9c1b4d, // outline color #9c1b4d
			highlight: 0x721a1a, // subtle glass tint
		};

		const w = container.clientWidth || 300;
		const h = container.clientHeight || 300;

		// Renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.setSize(w, h);
		renderer.shadowMap.enabled = true;
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.0;
		renderer.setClearColor(0x000000, 0); // trong suốt
		container.appendChild(renderer.domElement);

		// Scene & Camera
		const scene = new THREE.Scene();

		// Tính toán camera distance dựa trên viewport để khối 3D giữ kích thước cố định ~800px
		const targetSize = 800; // Kích thước mong muốn của khối 3D (px)
		const minDimension = Math.min(w, h);
		const scaleFactor = targetSize / minDimension;
		const baseFov = 75;
		const adjustedFov = baseFov * Math.max(0.6, Math.min(1.2, scaleFactor));

		const camera = new THREE.PerspectiveCamera(adjustedFov, w / h, 0.1, 1000);
		// Điều chỉnh camera distance để khối 3D không quá lớn/nhỏ
		const cameraDistance = 8 * Math.max(1, scaleFactor * 0.8);
		camera.position.set(cameraDistance * 0.4, cameraDistance * 0.75, cameraDistance * 0.5);
		camera.lookAt(0, 0, 0);

		// Environment (phản xạ/khúc xạ cho glass)
		const pmrem = new THREE.PMREMGenerator(renderer);
		const envTex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
		scene.environment = envTex;

		// Controls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.1;
		controls.enableZoom = true;
		controls.enablePan = true;
		controls.enabled = false;

		// Lights
		const dirLight = new THREE.DirectionalLight(0xffffff, 1.25);
		dirLight.color.setHex(0xfff7e6); // warm tint
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.set(2048, 2048);
		dirLight.shadow.bias = -0.0005;
		scene.add(dirLight);
		dirLight.target.position.set(0, 0, 0);
		scene.add(dirLight.target);

		const ambient = new THREE.AmbientLight(0xffffff, 0.15);
		scene.add(ambient);

		// Group
		const group = new THREE.Group();
		scene.add(group);

		// Torus giữ tone sáng
		const torusGeometry = new THREE.TorusGeometry(3.5, 0.45, 100, 100);
		const ringMat = new THREE.MeshStandardMaterial({
			color: PALETTE.primary,
			emissive: PALETTE.primary,
			emissiveIntensity: 0.12,
			metalness: 0.3,
			roughness: 0.35,
		});
		// const torus1 = new THREE.Mesh(torusGeometry, ringMat);
		// torus1.rotation.x = Math.PI / 2;
		// torus1.castShadow = torus1.receiveShadow = true;
		// group.add(torus1);

		// const torus2 = new THREE.Mesh(torusGeometry, ringMat);
		// torus2.rotation.y = Math.PI / 2;
		// torus2.castShadow = torus2.receiveShadow = true;
		// group.add(torus2);

		// ===== Procedural Noise GLASS SHELL (rỗng, trong suốt) + OUTLINE =====
		const clock = new THREE.Clock();

		// Uniforms dùng chung cho outer, inner, outline — đảm bảo trùng noise
		const noiseUniforms = {
			uTime: { value: 0.0 },
			uAmp: { value: 0.4 }, // biên độ gồ ghề bề mặt
			uFreq: { value: 2.0 }, // mật độ chi tiết
			uShell: { value: 0.02 }, // ĐỘ DÀY VỎ (world units) — chỉnh ở đây
			uOutline: { value: 0.01 }, // độ dày viền (inflate outline)
		};

		// Simplex noise + FBM (Ashima, rút gọn)
		const NOISE = `
            vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
            vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
            vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
            float snoise(vec3 v){
                const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
                vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
                vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
                vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy; i=mod289(i);
                vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
                float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
                vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
                vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
                vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw); vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0;
                vec4 sh=-step(h,vec4(0.0)); vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
                vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
                vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
                return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
            }
            float fbm(vec3 p){ float a=0.5,f=1.0,v=0.0; for(int i=0;i<4;i++){ v+=a*snoise(p*f); f*=2.0; a*=0.5; } return v; }
        `;

		// Glass Physical material base (không emissive để thật sự "rỗng")
		const makeGlassMat = () =>
			new THREE.MeshPhysicalMaterial({
				color: 0xffffff, // để trong suốt tự nhiên; tint nhẹ dùng attenuationColor
				roughness: 0.06,
				metalness: 0.0,
				transmission: 1.0, // glass
				transparent: true,
				ior: 1.33, // nước/thuỷ tinh mảnh
				thickness: 0.15, // độ dày quang học (khác với uShell hình học)
				specularIntensity: 0.9,
				specularColor: new THREE.Color(PALETTE.primary),
				attenuationColor: new THREE.Color(PALETTE.highlight),
				attenuationDistance: 6.0, // hấp thụ rất nhẹ -> cảm giác rỗng
				envMapIntensity: 1.0,
				side: THREE.FrontSide,
				depthWrite: true,
			});

		const sphereGeometry = new THREE.SphereGeometry(1.5, 192, 192);

		// Outer shell (FrontSide)
		const outerMat = makeGlassMat();
		outerMat.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = noiseUniforms.uTime;
			shader.uniforms.uAmp = noiseUniforms.uAmp;
			shader.uniforms.uFreq = noiseUniforms.uFreq;
			shader.uniforms.uDelta = { value: 0.0 }; // offset hình học cho outer
			shader.vertexShader = shader.vertexShader
				.replace(
					"#include <common>",
					`
                    #include <common>
                    uniform float uTime, uAmp, uFreq, uDelta;
                    ${NOISE}
                `,
				)
				.replace(
					"#include <begin_vertex>",
					`
                #include <begin_vertex>
                vec3 p = normalize(position) * uFreq + vec3(uTime * 0.2);
                float n = fbm(p);
                transformed += normal * (uAmp * n + uDelta);
                `,
				);
			outerMat.userData.shader = shader;
		};
		const outerShell = new THREE.Mesh(sphereGeometry, outerMat);
		outerShell.castShadow = true;
		outerShell.receiveShadow = true;
		outerShell.renderOrder = 2;
		group.add(outerShell);

		// Inner shell (BackSide) — lùi vào theo uShell để thành vỏ rỗng
		const innerMat = makeGlassMat();
		innerMat.side = THREE.BackSide;
		innerMat.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = noiseUniforms.uTime;
			shader.uniforms.uAmp = noiseUniforms.uAmp;
			shader.uniforms.uFreq = noiseUniforms.uFreq;
			shader.uniforms.uDelta = { value: -noiseUniforms.uShell.value }; // dày hình học
			shader.vertexShader = shader.vertexShader
				.replace(
					"#include <common>",
					`
          #include <common>
          uniform float uTime, uAmp, uFreq, uDelta;
          ${NOISE}
        `,
				)
				.replace(
					"#include <begin_vertex>",
					`
          #include <begin_vertex>
          vec3 p = normalize(position) * uFreq + vec3(uTime * 0.2);
          float n = fbm(p);
          transformed += normal * (uAmp * n + uDelta);
        `,
				);
			innerMat.userData.shader = shader;
		};
		const innerShell = new THREE.Mesh(sphereGeometry, innerMat);
		innerShell.castShadow = false;
		innerShell.receiveShadow = false;
		innerShell.renderOrder = 1;
		group.add(innerShell);

		// Outline (bao ngoài, viền đều, bám noise)
		const outlineUniforms = {
			uTime: noiseUniforms.uTime,
			uAmp: noiseUniforms.uAmp,
			uFreq: noiseUniforms.uFreq,
			uOutline: noiseUniforms.uOutline,
			uColor: { value: new THREE.Color(PALETTE.secondary) },
		};
		const outlineVert = `
            uniform float uTime, uAmp, uFreq, uOutline;
            ${NOISE}
            void main(){
                vec3 pos = position;
                vec3 nrm = normal;
                vec3 p   = normalize(pos) * uFreq + vec3(uTime * 0.2);
                float n  = fbm(p);
                pos += nrm * (uAmp * n + uOutline); // inflate ngoài cùng
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
            `;
		const outlineFrag = `
            uniform vec3 uColor;
            void main(){ gl_FragColor = vec4(uColor, 1.0); }
        `;
		const outlineMat = new THREE.ShaderMaterial({
			uniforms: outlineUniforms,
			vertexShader: outlineVert,
			fragmentShader: outlineFrag,
			side: THREE.BackSide,
			depthTest: true,
			depthWrite: false,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1,
		});
		const outline = new THREE.Mesh(sphereGeometry, outlineMat);
		outline.renderOrder = 0;
		group.add(outline);

		// ===== Animation =====
		const rotationTween = gsap.to(group.rotation, {
			x: "+=" + Math.PI * 2,
			y: "+=" + Math.PI * 2,
			duration: 18,
			repeat: -1,
			ease: "linear",
		});

		// Hover
		const handleEnter = () => (controls.enabled = true);
		const handleLeave = () => (controls.enabled = false);
		container.addEventListener("mouseenter", handleEnter);
		container.addEventListener("mouseleave", handleLeave);

		// Resize
		const onResize = () => {
			const nw = container.clientWidth || 300;
			const nh = container.clientHeight || 300;

			// Recalculate camera để giữ khối 3D kích thước cố định
			const newMinDimension = Math.min(nw, nh);
			const newScaleFactor = targetSize / newMinDimension;
			const newFov = baseFov * Math.max(0.6, Math.min(1.2, newScaleFactor));
			const newCameraDistance = 8 * Math.max(1, newScaleFactor * 0.8);

			camera.fov = newFov;
			camera.position.set(newCameraDistance * 0.4, newCameraDistance * 0.75, newCameraDistance * 0.5);
			camera.aspect = nw / nh;
			camera.updateProjectionMatrix();
			renderer.setSize(nw, nh);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		};
		const ro = new ResizeObserver(onResize);
		ro.observe(container);

		// Loop
		let rafId;
		const animate = () => {
			rafId = requestAnimationFrame(animate);
			dirLight.position.copy(camera.position);

			// update time cho noise (share cho outer, inner, outline)
			noiseUniforms.uTime.value = clock.getElapsedTime();

			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Cleanup
		return () => {
			cancelAnimationFrame(rafId);
			rotationTween.kill();
			container.removeEventListener("mouseenter", handleEnter);
			container.removeEventListener("mouseleave", handleLeave);
			ro.disconnect();
			controls.dispose();
			renderer.dispose();
			pmrem.dispose();
			[outerShell, innerShell, outline].forEach((m) => {
				m.geometry?.dispose();
				if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
				else m.material?.dispose();
			});
			renderer.domElement?.parentNode?.removeChild(renderer.domElement);
		};
	}, []);

	return <div className="brutal-hero__visual-frame-3d" ref={containerRef} />;
}
