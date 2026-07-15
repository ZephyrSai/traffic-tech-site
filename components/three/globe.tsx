"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import landDots from "@/lib/land-dots.json";
import { useIsDark } from "./use-is-dark";

/* ---------------------------------------------------------------------------
 * Interactive dotted-earth globe — drag to spin, scroll to zoom.
 * GCC markers pulse around HQ Doha; live arcs carry data pulses.
 * ------------------------------------------------------------------------- */

const YELLOW = "#ffe718";
const R = 2;

function latLonToVec3(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

const CITIES: { name: string; lat: number; lon: number; hq?: boolean }[] = [
  { name: "Doha", lat: 25.29, lon: 51.53, hq: true },
  { name: "Riyadh", lat: 24.71, lon: 46.68, hq: true },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Kuwait City", lat: 29.38, lon: 47.99 },
  { name: "Manama", lat: 26.23, lon: 50.59 },
  { name: "Muscat", lat: 23.59, lon: 58.41 },
];

function LandDots({ dark }: { dark: boolean }) {
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(landDots.length * 3);
    const col = new Float32Array(landDots.length * 3);
    const base = new THREE.Color(dark ? "#7e8a97" : "#5f6a76");
    const gulf = new THREE.Color(dark ? YELLOW : "#9a7d00");
    (landDots as [number, number][]).forEach(([lon, lat], i) => {
      latLonToVec3(lat, lon, R).toArray(pos, i * 3);
      const isGulf = lat > 15 && lat < 33 && lon > 43 && lon < 61;
      (isGulf ? gulf : base).toArray(col, i * 3);
    });
    return { positions: pos, colors: col };
  }, [dark]);

  return (
    <points key={dark ? "dark" : "light"}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.024} vertexColors sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

function Marker({ city, accent }: { city: (typeof CITIES)[number]; accent: string }) {
  const ring = useRef<THREE.Mesh>(null);
  const p = useMemo(() => latLonToVec3(city.lat, city.lon, R + 0.005), [city]);
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize());
    return q;
  }, [p]);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.6 + city.lon * 0.1) % 1;
    const s = 1 + t * 2.2;
    ring.current.scale.set(s, s, s);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - t);
  });

  return (
    <group position={p} quaternion={quat}>
      <mesh>
        <sphereGeometry args={[city.hq ? 0.035 : 0.022, 12, 12]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.04, 0.05, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {city.hq && (
        <Html
          center
          distanceFactor={5.5}
          position={[0, city.name === "Doha" ? 0.16 : -0.18, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              fontFamily: "var(--font-grotesk), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "var(--tt-frost)",
              background: "color-mix(in srgb, var(--tt-night) 75%, transparent)",
              border: "1px solid color-mix(in srgb, var(--tt-signal) 50%, transparent)",
              borderRadius: "999px",
              padding: "2px 9px",
              whiteSpace: "nowrap",
            }}
          >
            {city.name.toUpperCase()}
          </div>
        </Html>
      )}
    </group>
  );
}

function Arc({
  from,
  to,
  offset,
  accent,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  offset: number;
  accent: string;
}) {
  const pulse = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const dist = from.distanceTo(to);
    mid.normalize().multiplyScalar(R + dist * 0.35);
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.01, 6, false), [curve]);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = (clock.elapsedTime * 0.35 + offset) % 1;
    pulse.current.position.copy(curve.getPoint(t));
    (pulse.current.material as THREE.MeshBasicMaterial).opacity =
      Math.sin(t * Math.PI) * 0.95;
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial color={accent} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial color={accent} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const rand = (() => {
      let a = 99;
      return () => {
        a = (a * 1664525 + 1013904223) >>> 0;
        return a / 2 ** 32;
      };
    })();
    const p = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      const v = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5)
        .normalize()
        .multiplyScalar(14 + rand() * 8);
      v.toArray(p, i * 3);
    }
    return p;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#5f6a76" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function GlobeScene({ dark }: { dark: boolean }) {
  const doha = useMemo(() => latLonToVec3(CITIES[0].lat, CITIES[0].lon), []);
  const accent = dark ? YELLOW : "#9a7d00";
  return (
    <group>
      {/* occluder sphere so far-side dots hide */}
      <mesh>
        <sphereGeometry args={[R - 0.02, 48, 48]} />
        <meshStandardMaterial
          color={dark ? "#11151a" : "#e3e8ee"}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      {/* atmosphere halo */}
      <mesh>
        <sphereGeometry args={[R + 0.28, 48, 48]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={dark ? 0.045 : 0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <LandDots dark={dark} />
      {CITIES.map((c) => (
        <Marker key={c.name} city={c} accent={accent} />
      ))}
      {CITIES.slice(1).map((c, i) => (
        <Arc
          key={c.name}
          from={doha}
          to={latLonToVec3(c.lat, c.lon)}
          offset={i * 0.22}
          accent={accent}
        />
      ))}
      {dark && <Stars />}
    </group>
  );
}

export function Globe() {
  const dark = useIsDark();
  // start with the Gulf facing the camera
  const camPos = useMemo(() => latLonToVec3(24, 51, 5.4), []);
  return (
    <Canvas
      camera={{ position: camPos.toArray(), fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <GlobeScene dark={dark} />
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.55}
        enablePan={false}
        enableZoom
        minDistance={2.9}
        maxDistance={9}
      />
    </Canvas>
  );
}
