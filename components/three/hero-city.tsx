"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Edges } from "@react-three/drei";
import * as THREE from "three";
import { useIsDark } from "./use-is-dark";

/* ---------------------------------------------------------------------------
 * Interactive digital-twin city — drag to orbit, scroll to zoom.
 * A charcoal city block with live traffic, mirrored above by a floating
 * signal-yellow wireframe twin fed by data beams.
 * ------------------------------------------------------------------------- */

const YELLOW = "#ffe718";
const RED = "#ff3543";
const ROAD_HALF = 1.1; // half-width of each road corridor

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 2 ** 32;
  };
}

type BuildingSpec = {
  pos: [number, number]; // x, z centre
  size: [number, number, number]; // w, h, d
  landmark: boolean;
};

const CITY_EXTENT = 8.5;

const buildings: BuildingSpec[] = (() => {
  const rand = rng(20260715);
  const list: BuildingSpec[] = [];
  for (let qx = -1; qx <= 1; qx += 2) {
    for (let qz = -1; qz <= 1; qz += 2) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const w = 0.9 + rand() * 0.9;
          const d = 0.9 + rand() * 0.9;
          const landmark = rand() > 0.82;
          const h = landmark ? 3.4 + rand() * 2.4 : 0.7 + rand() * 1.9;
          const x = qx * (ROAD_HALF + 0.9 + i * 2.35 + rand() * 0.5);
          const z = qz * (ROAD_HALF + 0.9 + j * 2.35 + rand() * 0.5);
          if (Math.abs(x) > CITY_EXTENT || Math.abs(z) > CITY_EXTENT) continue;
          list.push({ pos: [x, z], size: [w, h, d], landmark });
        }
      }
    }
  }
  return list;
})();

function Building({
  spec,
  index,
  twin,
  accent = YELLOW,
}: {
  spec: BuildingSpec;
  index: number;
  twin?: boolean;
  accent?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [w, h, d] = spec.size;
  const delay = 0.15 + (Math.abs(spec.pos[0]) + Math.abs(spec.pos[1])) * 0.06 + index * 0.012;

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    // rise-in on mount
    const t = Math.min(1, Math.max(0, (clock.elapsedTime - delay) / 0.9));
    const eased = 1 - Math.pow(1 - t, 3);
    mesh.current.scale.y = Math.max(0.01, eased);
    if (!twin) {
      const mat = mesh.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        hovered ? 0.6 : spec.landmark ? 0.14 : 0.1,
        0.12,
      );
    }
  });

  if (twin) {
    return (
      <mesh ref={mesh} position={[spec.pos[0], h / 2, spec.pos[1]]}>
        <boxGeometry args={[w, h, d]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.14} />
      </mesh>
    );
  }

  return (
    <mesh
      ref={mesh}
      position={[spec.pos[0], h / 2, spec.pos[1]]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      castShadow
    >
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color={spec.landmark ? "#39434f" : "#2c343e"}
        emissive={spec.landmark ? YELLOW : "#5a6673"}
        emissiveIntensity={spec.landmark ? 0.14 : 0.12}
        roughness={0.55}
        metalness={0.35}
      />
      <Edges color={spec.landmark ? "#b7a712" : "#4a5560"} threshold={15} />
    </mesh>
  );
}

function TwinLayer({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = 5.9 + Math.sin(clock.elapsedTime * 0.7) * 0.25;
  });
  return (
    <group ref={group} position={[0, 5.9, 0]} scale={[1, 0.35, 1]}>
      {buildings.map((b, i) => (
        <Building key={i} spec={b} index={i} twin accent={accent} />
      ))}
      <gridHelper args={[19, 19, accent, accent]}>
        <lineBasicMaterial color={accent} transparent opacity={0.12} />
      </gridHelper>
    </group>
  );
}

function DataBeams({ accent }: { accent: string }) {
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);
  const landmarks = useMemo(() => buildings.filter((b) => b.landmark).slice(0, 4), []);
  useFrame(({ clock }) => {
    mats.current.forEach((m, i) => {
      if (m) m.opacity = 0.12 + (Math.sin(clock.elapsedTime * 2 + i * 1.7) + 1) * 0.14;
    });
  });
  return (
    <>
      {landmarks.map((b, i) => (
        <mesh key={i} position={[b.pos[0], (b.size[1] + 6.1) / 2, b.pos[1]]}>
          <cylinderGeometry args={[0.045, 0.045, 6.1 - b.size[1], 6]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) mats.current[i] = m;
            }}
            color={accent}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

const CAR_COUNT = 28;

function Traffic() {
  const inst = useRef<THREE.InstancedMesh>(null);
  const cars = useMemo(() => {
    const rand = rng(77);
    return Array.from({ length: CAR_COUNT }, (_, i) => {
      const axis = i % 2 === 0 ? "x" : "z";
      const dir = i % 4 < 2 ? 1 : -1;
      return {
        axis,
        dir,
        lane: dir * (0.35 + rand() * 0.45),
        offset: rand() * 24,
        speed: 2.6 + rand() * 2.2,
      };
    });
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colored = useRef(false);

  useFrame(({ clock }) => {
    if (!inst.current) return;
    if (!colored.current) {
      const yellow = new THREE.Color(YELLOW);
      const red = new THREE.Color(RED);
      cars.forEach((car, i) => inst.current!.setColorAt(i, car.dir > 0 ? yellow : red));
      if (inst.current.instanceColor) inst.current.instanceColor.needsUpdate = true;
      colored.current = true;
    }
    const t = clock.elapsedTime;
    cars.forEach((car, i) => {
      const p = ((car.offset + t * car.speed) % 24) - 12;
      const along = car.dir * p;
      const x = car.axis === "x" ? along : car.lane;
      const z = car.axis === "x" ? car.lane : along;
      dummy.position.set(x, 0.09, z);
      dummy.scale.set(car.axis === "x" ? 0.34 : 0.15, 0.1, car.axis === "x" ? 0.15 : 0.34);
      dummy.updateMatrix();
      inst.current!.setMatrixAt(i, dummy.matrix);
    });
    inst.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={inst} args={[undefined, undefined, CAR_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Roads() {
  return (
    <group position={[0, 0.012, 0]}>
      {[0, Math.PI / 2].map((rot, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, rot]}>
          <planeGeometry args={[24, ROAD_HALF * 2]} />
          <meshStandardMaterial color="#14181d" roughness={0.9} />
        </mesh>
      ))}
      {/* centre lines */}
      {[0, Math.PI / 2].map((rot, i) => (
        <mesh key={`l${i}`} rotation={[-Math.PI / 2, 0, rot]} position={[0, 0.005, 0]}>
          <planeGeometry args={[24, 0.035]} />
          <meshBasicMaterial color={YELLOW} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function RadarPing({ accent }: { accent: string }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime % 4) / 4;
    const s = 1 + t * 11;
    ring.current.scale.set(s, s, s);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.35 * (1 - t);
  });
  return (
    <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <ringGeometry args={[0.96, 1, 64]} />
      <meshBasicMaterial color={accent} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function HeroCity() {
  const dark = useIsDark();
  // page-background-adjacent colours follow the site theme
  const bg = dark ? "#0c0f13" : "#f4f5f8";
  const accent = dark ? YELLOW : "#9a7d00";
  const ground = dark ? "#0e1116" : "#e6eaf0";
  const cell = dark ? "#242c35" : "#ccd4de";
  const section = dark ? "#39424d" : "#b3bfcc";

  return (
    <Canvas
      camera={{ position: [14.5, 6.5, 14.5], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <fog attach="fog" args={[bg, 24, 50]} />
      <hemisphereLight args={dark ? ["#8fa3bd", "#0c0f13", 0.9] : ["#ffffff", "#c4ccd6", 1.1]} />
      <ambientLight intensity={dark ? 0.35 : 0.55} />
      <directionalLight position={[8, 14, 6]} intensity={1.4} color="#fff8d6" />
      <directionalLight position={[-10, 6, -4]} intensity={0.5} color="#aeb6be" />
      <pointLight position={[0, 9, 0]} intensity={dark ? 16 : 8} color={YELLOW} distance={24} />

      <group position={[0, -1.2, 0]}>
        <Grid
          args={[40, 40]}
          position={[0, 0.001, 0]}
          cellSize={1}
          cellColor={cell}
          sectionSize={5}
          sectionColor={section}
          fadeDistance={30}
          fadeStrength={2}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color={ground} roughness={1} />
        </mesh>
        <Roads />
        <Traffic />
        <RadarPing accent={accent} />
        {buildings.map((b, i) => (
          <Building key={i} spec={b} index={i} />
        ))}
        <TwinLayer accent={accent} />
        <DataBeams accent={accent} />
      </group>

      <OrbitControls
        makeDefault
        target={[0, 1.6, 0]}
        autoRotate
        autoRotateSpeed={0.7}
        enablePan={false}
        enableZoom
        minDistance={9}
        maxDistance={30}
        minPolarAngle={0.5}
        maxPolarAngle={1.42}
      />
    </Canvas>
  );
}
