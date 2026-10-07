import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";
import { useReducedMotion } from "../hooks/hooks";

/* ------------------------------------------------------------------
 * Map source chain (in order):
 *   1. YOUR file: public/download.svg (equirectangular 2:1 works best).
 *      The SVG is rasterized in-browser (capped at 2048px wide) and
 *      wrapped onto a real Three.js sphere as its texture.
 *   2. Provisioned fallback: a built-in Earth-night texture, used ONLY
 *      when your file is missing or blank - so the globe still renders
 *      a real Earth out of the box. Your file always wins when present.
 * ------------------------------------------------------------------ */
const MAP_SRC = `${import.meta.env.BASE_URL}download.svg`;
const FALLBACK_MAP_SRCS = [
  "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg",
  "https://unpkg.com/three-globe/example/img/earth-night.jpg",
];
const MAX_TEXTURE_WIDTH = 2048;

// [lat, lon] marker shown on the globe
const HOME_MARKER = { lat: 6.5244, lon: 3.3792, label: "Lagos · GMT+1" };

const BASE_SPEED = (Math.PI * 2) / 52000; // one revolution ≈ 52s
const GLOBE_TILT = -0.21; // axial tilt (radians)

type GlobeStatus = "loading" | "ready" | "no-texture" | "failed";

/** lat/lon (degrees) -> unit-sphere xyz matching THREE.SphereGeometry UVs. */
function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function scrollToContact() {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function GlobeOrbit() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<GlobeStatus>("loading");
  const [builtinMap, setBuiltinMap] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const stage = stageRef.current;
    if (!stage) return;

    const setSafeStatus = (s: GlobeStatus) => {
      if (!disposed) setStatus(s);
    };

    void (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        setSafeStatus("failed");
        return;
      }
      if (disposed) return;

      // ---------- renderer / scene / camera ----------
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setSafeStatus("failed");
        return;
      }
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.touchAction = "pan-y"; // vertical scroll always works
      renderer.domElement.style.cursor = "grab";
      renderer.domElement.setAttribute("aria-hidden", "true");
      stage.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

      const fitCamera = () => {
        const w = Math.max(1, stage.clientWidth);
        const h = Math.max(1, stage.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Keep the whole globe (+ atmosphere) in frame on any screen.
        const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
        camera.position.set(0, 0, (2.42 / (2 * Math.tan(halfFov))) * Math.max(1, 1 / camera.aspect));
        camera.updateProjectionMatrix();
      };
      fitCamera();

      // ---------- lights ----------
      scene.add(new THREE.AmbientLight(0x8ea2ff, 0.75));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(3, 2, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x22d3ee, 1.5);
      rim.position.set(-4, -1, -3);
      scene.add(rim);

      // ---------- map texture ----------
      // 1) Your exact file first. 2) Provisioned built-in Earth fallback.
      const loadRaster = (
        src: string,
        crossOrigin: boolean
      ): Promise<HTMLCanvasElement | null> =>
        new Promise((resolve) => {
          const img = new Image();
          if (crossOrigin) img.crossOrigin = "anonymous";
          img.decoding = "async";
          img.onload = () => {
            try {
              if (!img.naturalWidth || !img.naturalHeight) return resolve(null);
              const scale = Math.min(1, MAX_TEXTURE_WIDTH / img.naturalWidth);
              const cnv = document.createElement("canvas");
              cnv.width = Math.max(1, Math.round(img.naturalWidth * scale));
              cnv.height = Math.max(1, Math.round(img.naturalHeight * scale));
              const cctx = cnv.getContext("2d");
              if (!cctx) return resolve(null);
              cctx.drawImage(img, 0, 0, cnv.width, cnv.height);
              resolve(cnv);
            } catch {
              resolve(null); // tainted canvas / decode issue -> treat as missing
            }
          };
          img.onerror = () => resolve(null);
          img.src = src;
        });

      const isBlank = (cnv: HTMLCanvasElement): boolean => {
        try {
          const data = cnv
            .getContext("2d")
            ?.getImageData(0, 0, cnv.width, cnv.height).data;
          if (!data) return true;
          for (let i = 3; i < data.length; i += 128) {
            if (data[i] > 8) return false;
          }
          return true;
        } catch {
          return true;
        }
      };

      let texture: import("three").CanvasTexture | null = null;
      let blank = true;
      try {
        const own = await loadRaster(MAP_SRC, false);
        let source: HTMLCanvasElement | null = own && !isBlank(own) ? own : null;
        if (!source) {
          for (const fallback of FALLBACK_MAP_SRCS) {
            const fb = await loadRaster(fallback, true);
            if (fb && !isBlank(fb)) {
              source = fb;
              if (!disposed) setBuiltinMap(true);
              break;
            }
          }
        }
        if (source) {
          texture = new THREE.CanvasTexture(source);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          blank = false;
        }
      } catch {
        texture = null;
        blank = true;
      }
      if (disposed) {
        texture?.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }

      // ---------- globe ----------
      const globeGroup = new THREE.Group();
      globeGroup.rotation.z = GLOBE_TILT;
      scene.add(globeGroup);

      const globeMat = new THREE.MeshStandardMaterial({
        map: texture,
        color: texture ? 0xffffff : 0x141a36,
        roughness: 0.92,
        metalness: 0.05,
        emissive: texture ? new THREE.Color(0x2a3170) : new THREE.Color(0x000000),
        emissiveMap: texture,
        emissiveIntensity: 0.55,
      });
      const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 72, 72), globeMat);
      globeGroup.add(globe);

      // Faint graticule for extra spherical definition.
      const gratPts: number[] = [];
      for (let lon = -180; lon < 180; lon += 20) {
        let prev: [number, number, number] | null = null;
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = latLonToVec3(lat, lon, 1.002);
          if (prev) gratPts.push(...prev, ...p);
          prev = p;
        }
      }
      for (let lat = -80; lat <= 80; lat += 20) {
        let prev: [number, number, number] | null = null;
        for (let lon = -180; lon <= 180; lon += 4) {
          const p = latLonToVec3(lat, lon, 1.002);
          if (prev) gratPts.push(...prev, ...p);
          prev = p;
        }
      }
      const gratGeo = new THREE.BufferGeometry();
      gratGeo.setAttribute("position", new THREE.Float32BufferAttribute(gratPts, 3));
      const graticule = new THREE.LineSegments(
        gratGeo,
        new THREE.LineBasicMaterial({ color: 0x4c5aa8, transparent: true, opacity: 0.3 })
      );
      globeGroup.add(graticule);

      // ---------- atmosphere (additive fresnel shell) ----------
      const atmoMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
            gl_FragColor = vec4(0.38, 0.52, 1.0, 1.0) * intensity;
          }`,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.18, 64, 64), atmoMat);
      scene.add(atmosphere);

      // ---------- starfield ----------
      const starCount = 400;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const r = 7 + Math.random() * 9;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
        starPos[i * 3 + 1] = r * Math.cos(p);
        starPos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const stars = new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0x93a3d4,
          size: 0.045,
          transparent: true,
          opacity: 0.55,
          sizeAttenuation: true,
          depthWrite: false,
        })
      );
      scene.add(stars);

      // ---------- home marker (Lagos) ----------
      const glowCnv = document.createElement("canvas");
      glowCnv.width = 64;
      glowCnv.height = 64;
      const gctx = glowCnv.getContext("2d");
      if (gctx) {
        const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.25, "rgba(34,211,238,0.9)");
        grad.addColorStop(1, "rgba(34,211,238,0)");
        gctx.fillStyle = grad;
        gctx.fillRect(0, 0, 64, 64);
      }
      const glowTex = new THREE.CanvasTexture(glowCnv);
      const marker = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false })
      );
      const [mx, my, mz] = latLonToVec3(HOME_MARKER.lat, HOME_MARKER.lon, 1.012);
      marker.position.set(mx, my, mz);
      marker.scale.setScalar(0.085);
      globeGroup.add(marker);

      setSafeStatus(blank ? "no-texture" : "ready");

      // ---------- interaction state ----------
      let userAngle = 0;
      let spin = reduced ? 0 : BASE_SPEED;
      let tiltX = 0;
      let targetTiltX = 0;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let velY = 0;
      let parallaxX = 0;
      let targetParallaxX = 0;
      let visible = true;
      let raf = 0;
      let last = performance.now();

      const label = labelRef.current;
      const tmpV = new THREE.Vector3();
      const tmpC = new THREE.Vector3();

      const updateLabel = () => {
        if (!label) return;
        marker.getWorldPosition(tmpV);
        tmpC.copy(camera.position).normalize();
        const facing = tmpV.clone().normalize().dot(tmpC);
        if (facing > 0.28) {
          tmpV.project(camera);
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          const x = (tmpV.x * 0.5 + 0.5) * w;
          const y = (-tmpV.y * 0.5 + 0.5) * h;
          label.style.transform = `translate(-50%, -130%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
          label.style.opacity = Math.min(1, (facing - 0.28) / 0.25).toFixed(2);
        } else {
          label.style.opacity = "0";
        }
      };

      const render = (now: number) => {
        globe.rotation.y = userAngle;
        globeGroup.rotation.x = tiltX;
        stars.rotation.y = -userAngle * 0.08;
        camera.position.x += (parallaxX - camera.position.x) * 0.04;
        camera.lookAt(0, 0, 0);
        const pulse = 0.08 + Math.sin(now / 600) * 0.014;
        marker.scale.setScalar(reduced ? 0.085 : pulse);
        renderer.render(scene, camera);
        updateLabel();
      };

      const loop = (now: number) => {
        if (disposed) return;
        raf = requestAnimationFrame(loop);
        const dt = Math.min(now - last, 64);
        last = now;
        if (!visible) return;
        if (reduced) return; // static frame; drag handlers render on demand
        if (!dragging) {
          userAngle += spin * dt;
          spin += (BASE_SPEED - spin) * 0.025; // ease back to auto-rotation
          tiltX += (targetTiltX - tiltX) * 0.04;
          parallaxX += (targetParallaxX - parallaxX) * 0.04;
        }
        render(now);
      };

      // Drag to spin (horizontal). Vertical page scroll is untouched.
      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        velY = 0;
        renderer.domElement.style.cursor = "grabbing";
        renderer.domElement.setPointerCapture(e.pointerId);
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        userAngle += dx * 0.0045;
        tiltX = THREE.MathUtils.clamp(tiltX + dy * 0.0018, -0.55, 0.55);
        targetTiltX = tiltX;
        velY = velY * 0.85 + dx * 0.0045 * 0.15;
        if (reduced) render(performance.now());
      };
      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        renderer.domElement.style.cursor = "grab";
        spin = reduced ? 0 : THREE.MathUtils.clamp(velY * 60, -BASE_SPEED * 8, BASE_SPEED * 8);
        if (reduced) render(performance.now());
      };
      const onHoverParallax = (e: PointerEvent) => {
        if (dragging || reduced) return;
        const rect = stage.getBoundingClientRect();
        targetParallaxX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.3;
      };

      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onPointerMove);
      renderer.domElement.addEventListener("pointerup", endDrag);
      renderer.domElement.addEventListener("pointercancel", endDrag);
      stage.addEventListener("pointermove", onHoverParallax);

      const ro = new ResizeObserver(() => {
        fitCamera();
        if (reduced) render(performance.now());
      });
      ro.observe(stage);

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
          last = performance.now();
        },
        { threshold: 0.02 }
      );
      io.observe(stage);

      render(performance.now());
      if (!reduced) raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerup", endDrag);
        renderer.domElement.removeEventListener("pointercancel", endDrag);
        stage.removeEventListener("pointermove", onHoverParallax);
        globe.geometry.dispose();
        globeMat.dispose();
        gratGeo.dispose();
        (graticule.material as import("three").Material).dispose();
        atmosphere.geometry.dispose();
        atmoMat.dispose();
        starGeo.dispose();
        (stars.material as import("three").Material).dispose();
        glowTex.dispose();
        (marker.material as import("three").Material).dispose();
        texture?.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reduced]);

  return (
    <section
      id="global"
      aria-label="Global reach - interactive 3D world map"
      className="relative w-full overflow-hidden border-y"
      style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
    >
      {/* backdrop texture + glows */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px 420px at 70% 50%, rgba(99,102,241,.20), transparent 70%), radial-gradient(600px 300px at 15% 20%, rgba(34,211,238,.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <SectionHeading
            eyebrow="Global reach"
            title={
              <>
                Based in Nigeria. <span style={{ color: "#818cf8" }}>Building for the world.</span>
              </>
            }
            description="I work remote-first with clear async communication and real overlap with European and US time zones - so distance never slows a build down."
          />
          <Reveal delay={120}>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["GMT+1", "Lagos, Nigeria"],
                ["Remote-first", "Async friendly"],
                ["EU · US overlap", "Daily standups OK"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="card-lift rounded-2xl border p-4"
                  style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
                >
                  <dt className="text-[14px] font-bold" style={{ color: "var(--text)" }}>
                    {k}
                  </dt>
                  <dd className="mt-1 font-mono text-[11.5px]" style={{ color: "var(--text-faint)" }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToContact}
                className="rounded-xl px-6 py-3.5 text-[14.5px] font-bold text-white transition-transform hover:-translate-y-px"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#7c6cf6)",
                  boxShadow: "0 12px 32px -10px rgba(99,102,241,.5)",
                }}
              >
                Let&apos;s work together
              </button>
              <p className="font-mono text-[11.5px]" style={{ color: "var(--text-faint)" }}>
                {PROFILE.availability}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div>
            <div
              ref={stageRef}
              role="img"
              aria-label="Interactive 3D globe textured with the world map - drag to spin"
              className="relative mx-auto aspect-square w-full max-w-[560px]"
            >
              {/* atmosphere backdrop */}
              <div
                className="absolute inset-[8%] rounded-full"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(99,102,241,.14), transparent 65%)",
                }}
              />
              {/* Lagos marker label (positioned every frame, fades on far side) */}
              <div
                ref={labelRef}
                className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] opacity-0"
                style={{
                  borderColor: "rgba(34,211,238,.45)",
                  background: "color-mix(in srgb, var(--bg-card) 85%, transparent)",
                  color: "#a5f3fc",
                  transition: "opacity 0.25s ease",
                }}
              >
                {HOME_MARKER.label}
              </div>
              {status === "loading" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center" aria-hidden="true">
                  <span className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>
                    Loading globe…
                  </span>
                </div>
              )}
              {status === "no-texture" && (
                <p
                  className="absolute bottom-2 left-1/2 z-10 w-max max-w-full -translate-x-1/2 rounded-xl border px-4 py-3 text-center text-[12px] leading-relaxed"
                  style={{
                    borderColor: "rgba(245,158,11,.45)",
                    background: "color-mix(in srgb, var(--bg-card) 88%, transparent)",
                    color: "#fcd34d",
                  }}
                >
                  No map texture available - check your connection, or place your
                  equirectangular world map at{" "}
                  <code className="font-mono">public/download.svg</code>.
                </p>
              )}
              {status === "failed" && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6">
                  <img
                    src={MAP_SRC}
                    alt="World map"
                    className="max-h-[60%] w-auto max-w-full rounded-full object-cover"
                    style={{ border: "1px solid var(--line)" }}
                  />
                  <p className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>
                    3D unavailable in this browser - showing your map directly.
                  </p>
                </div>
              )}
            </div>
            <p className="mt-4 text-center font-mono text-[11.5px]" style={{ color: "var(--text-faint)" }}>
              {builtinMap
                ? "Showing the built-in Earth map - drop your own map at public/download.svg and it takes over automatically."
                : "Drag the globe to spin it - it resumes rotating on its own."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
