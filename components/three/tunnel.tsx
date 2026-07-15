"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
 * Live expressway tunnel — endless drive-through with two-way traffic,
 * light streaks, emissive wall strips and overhead lane signals.
 * Camera drifts with the pointer.
 * ------------------------------------------------------------------------- */

const YELLOW = "#ffe718";
const RED = "#ff3543";
const GREEN = "#2ee56b";
const LENGTH = 140; // repeating tunnel length
const RADIUS = 5.2;
const SPEED = 16; // world scroll speed (m/s)

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 2 ** 32;
  };
}

/** Everything inside scrolls +z and wraps, so the drive never ends. */
function Scroller({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.position.z += SPEED * Math.min(dt, 0.05);
    if (group.current.position.z > LENGTH) group.current.position.z -= LENGTH;
  });
  return (
    <group ref={group}>
      {/* two copies so the wrap is seamless */}
      <group position={[0, 0, -LENGTH]}>{children}</group>
      <group position={[0, 0, -LENGTH * 2]}>{children}</group>
    </group>
  );
}

const STATIC_LEN = 240;
const STATIC_CENTER = -90; // spans z in [-210, +30] — seams always out of sight

/** Continuous surfaces that must never show a wrap seam. */
function StaticShell() {
  return (
    <group>
      {/* circular bore shell, running along z */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, STATIC_CENTER]}>
        <cylinderGeometry args={[RADIUS, RADIUS, STATIC_LEN, 40, 1, true]} />
        <meshStandardMaterial
          color="#232b35"
          roughness={0.8}
          metalness={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      {/* road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, STATIC_CENTER]}>
        <planeGeometry args={[RADIUS * 1.9, STATIC_LEN]} />
        <meshStandardMaterial color="#14181e" roughness={0.95} />
      </mesh>
      {/* median barrier */}
      <mesh position={[0, -0.85, STATIC_CENTER]}>
        <boxGeometry args={[0.22, 0.7, STATIC_LEN]} />
        <meshStandardMaterial color="#2a323c" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.48, STATIC_CENTER]}>
        <boxGeometry args={[0.24, 0.05, STATIC_LEN]} />
        <meshBasicMaterial color={YELLOW} toneMapped={false} transparent opacity={0.35} />
      </mesh>
      {/* edge lines */}
      {[-(RADIUS - 0.75), RADIUS - 0.75].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, -1.19, STATIC_CENTER]}>
          <planeGeometry args={[0.14, STATIC_LEN]} />
          <meshBasicMaterial color={YELLOW} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
      {/* wall guide strips */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (RADIUS - 0.55), 0.4, STATIC_CENTER]}>
          <boxGeometry args={[0.06, 0.06, STATIC_LEN]} />
          <meshBasicMaterial color={YELLOW} toneMapped={false} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** Repeating fixtures that scroll past to convey speed. */
function TunnelFixtures() {
  const rings = useMemo(() => Array.from({ length: 14 }, (_, i) => i * (LENGTH / 14)), []);
  const dashes = useMemo(() => Array.from({ length: 28 }, (_, i) => i * (LENGTH / 28)), []);
  return (
    <group>
      {rings.map((z, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <torusGeometry args={[RADIUS - 0.06, 0.07, 8, 40, Math.PI]} />
          <meshStandardMaterial
            color="#232b34"
            emissive={i % 3 === 0 ? YELLOW : "#39424d"}
            emissiveIntensity={i % 3 === 0 ? 0.5 : 0.15}
            roughness={0.6}
          />
        </mesh>
      ))}
      {/* ceiling light bars (face down at the road) */}
      {rings.map((z, i) => (
        <mesh key={`l${i}`} position={[0, RADIUS - 0.45, z + 5]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 0.35]} />
          <meshBasicMaterial color="#fff9de" toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* lane dashes */}
      {dashes.map((z, i) => (
        <group key={`d${i}`}>
          {[-2.4, 2.4].map((x) => (
            <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, -1.19, z]}>
              <planeGeometry args={[0.12, 1.6]} />
              <meshBasicMaterial color="#c8d2dc" transparent opacity={0.5} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Gantry({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[RADIUS * 1.8, 0.14, 0.14]} />
        <meshStandardMaterial color="#2a323c" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* lane signals: green arrows + one red X */}
      {[-3.4, -1.6, 1.6, 3.4].map((x, i) => (
        <mesh key={x} position={[x, 2.25, 0]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshBasicMaterial
            color={i === 2 ? RED : GREEN}
            toneMapped={false}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

const LANES = [
  { x: -3.4, dir: 1 },
  { x: -1.6, dir: 1 },
  { x: 1.6, dir: -1 },
  { x: 3.4, dir: -1 },
];
const CARS_PER_LANE = 4;
const CAR_COUNT = LANES.length * CARS_PER_LANE;

function Traffic() {
  const bodies = useRef<THREE.InstancedMesh>(null);
  const glows = useRef<THREE.InstancedMesh>(null);
  const colored = useRef(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cars = useMemo(() => {
    const rand = rng(4242);
    return LANES.flatMap((lane) =>
      Array.from({ length: CARS_PER_LANE }, () => ({
        lane,
        offset: rand() * LENGTH,
        speed: (lane.dir > 0 ? 1 : 1.35) * (10 + rand() * 7),
        jitter: (rand() - 0.5) * 0.5,
      })),
    );
  }, []);

  useFrame(({ clock }) => {
    if (!bodies.current || !glows.current) return;
    if (!colored.current) {
      const white = new THREE.Color("#f2f6ff");
      const red = new THREE.Color(RED);
      // approaching traffic (dir > 0) shows headlights; receding shows tails
      cars.forEach((car, i) =>
        glows.current!.setColorAt(i, car.lane.dir > 0 ? white : red),
      );
      if (glows.current.instanceColor) glows.current.instanceColor.needsUpdate = true;
      colored.current = true;
    }
    const t = clock.elapsedTime;
    cars.forEach((car, i) => {
      // world scrolls +z at SPEED; oncoming cars close faster, same-way slower
      const rel = car.lane.dir > 0 ? SPEED - car.speed : SPEED + car.speed;
      // wrap 12 units behind the camera so cars never pop in view
      const z = -LENGTH + 12 + ((car.offset + t * rel) % LENGTH);
      const x = car.lane.x + car.jitter;
      dummy.position.set(x, -0.9, z);
      dummy.scale.set(0.62, 0.42, 1.35);
      dummy.updateMatrix();
      bodies.current!.setMatrixAt(i, dummy.matrix);
      // light streak trails behind motion
      const len = 1.8 + car.speed * 0.12;
      dummy.position.set(x, -0.92, z + (car.lane.dir > 0 ? len / 2 : -len / 2));
      dummy.scale.set(0.32, 0.12, len);
      dummy.updateMatrix();
      glows.current!.setMatrixAt(i, dummy.matrix);
    });
    bodies.current.instanceMatrix.needsUpdate = true;
    glows.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={bodies} args={[undefined, undefined, CAR_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0d1014" roughness={0.4} metalness={0.6} />
      </instancedMesh>
      <instancedMesh ref={glows} args={[undefined, undefined, CAR_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          toneMapped={false}
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

function Rig() {
  // drive in the right-hand carriageway, median off to the left
  const target = useMemo(() => new THREE.Vector3(2.2, -0.35, -40), []);
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 2.5 + pointer.x * 0.8, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15 + pointer.y * 0.5, 0.04);
    camera.lookAt(target);
  });
  return null;
}

export function Tunnel() {
  return (
    <Canvas
      camera={{ position: [2.5, 0.15, 6], fov: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#0a0d11"]} />
      <fog attach="fog" args={["#0a0d11", 16, 95]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 3, -6]} intensity={40} color="#fff4c2" distance={45} />
      <pointLight position={[0, 3, -34]} intensity={35} color="#fff4c2" distance={45} />
      <pointLight position={[0, 3, -62]} intensity={30} color="#fff4c2" distance={45} />
      <StaticShell />
      <Scroller>
        <TunnelFixtures />
        {[18, 60, 102].map((z) => (
          <Gantry key={z} z={z} />
        ))}
      </Scroller>
      {/* traffic manages its own wrap; keep outside the scroller */}
      <group position={[0, 0, 0]}>
        <Traffic />
      </group>
      <Rig />
    </Canvas>
  );
}
