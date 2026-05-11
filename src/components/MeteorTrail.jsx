import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TRAIL_LENGTH = 120;
const SPARK_COUNT = 70;
const EMBER_COUNT = 35;

export default function MeteorTrail() {
  const trailRef = useRef();
  const sparksRef = useRef();
  const embersRef = useRef();
  const glowRefs = useRef([]);
  const mouse3D = useRef(new THREE.Vector3(100, 100, 0));
  const smoothPos = useRef(new THREE.Vector3(100, 100, 0));
  const prevSmooth = useRef(new THREE.Vector3(100, 100, 0));
  const trail = useRef([]);
  const { viewport } = useThree();

  useMemo(() => {
    trail.current = Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3(100, 100, 0));
  }, []);

  const trailData = useMemo(() => ({
    pos: new Float32Array(TRAIL_LENGTH * 3),
    col: new Float32Array(TRAIL_LENGTH * 3),
    siz: new Float32Array(TRAIL_LENGTH),
  }), []);

  const sparkData = useMemo(() => ({
    pos: new Float32Array(SPARK_COUNT * 3),
    col: new Float32Array(SPARK_COUNT * 3),
    siz: new Float32Array(SPARK_COUNT),
    particles: Array.from({ length: SPARK_COUNT }, () => ({
      vx: 0, vy: 0, life: 0, maxLife: 1, type: Math.floor(Math.random() * 3),
    })),
  }), []);

  const emberData = useMemo(() => ({
    pos: new Float32Array(EMBER_COUNT * 3),
    col: new Float32Array(EMBER_COUNT * 3),
    siz: new Float32Array(EMBER_COUNT),
    particles: Array.from({ length: EMBER_COUNT }, () => ({
      vx: 0, vy: 0, life: 0, maxLife: 1, brightness: Math.random(),
    })),
  }), []);

  useMemo(() => {
    const handler = (e) => {
      mouse3D.current.set(
        ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2),
        (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2),
        0
      );
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [viewport]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dt = 0.016;

    // Smooth follow with momentum
    const lerpFactor = 0.09;
    smoothPos.current.lerp(mouse3D.current, lerpFactor);

    // Velocity
    const vx = smoothPos.current.x - prevSmooth.current.x;
    const vy = smoothPos.current.y - prevSmooth.current.y;
    const speed = Math.sqrt(vx * vx + vy * vy);
    prevSmooth.current.copy(smoothPos.current);

    // Trail shift
    for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
      trail.current[i].lerp(trail.current[i - 1], 0.65);
    }
    trail.current[0].copy(smoothPos.current);

    // ===== TRAIL =====
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const r = 1 - i / TRAIL_LENGTH;
      const r2 = r * r;
      const r3 = r2 * r;

      // Organic wobble that increases further down the trail
      const wobbleAmt = (1 - r) * 0.04;
      const wx = Math.sin(t * 6 + i * 0.2) * wobbleAmt * i * 0.3;
      const wy = Math.cos(t * 5 + i * 0.25) * wobbleAmt * i * 0.3;
      // Heat rise - trail drifts slightly upward at the tail
      const heatRise = (1 - r) * (1 - r) * 0.008 * i;

      trailData.pos[i * 3] = trail.current[i].x + wx;
      trailData.pos[i * 3 + 1] = trail.current[i].y + wy + heatRise;
      trailData.pos[i * 3 + 2] = trail.current[i].z;

      // Subtle fire gradient (dimmed)
      if (r > 0.9) {
        trailData.col[i * 3] = 0.6;
        trailData.col[i * 3 + 1] = 0.6;
        trailData.col[i * 3 + 2] = 0.65;
      } else if (r > 0.75) {
        const b = (r - 0.75) / 0.15;
        trailData.col[i * 3] = 0.65;
        trailData.col[i * 3 + 1] = 0.55 * b + 0.4 * (1 - b);
        trailData.col[i * 3 + 2] = 0.5 * b + 0.08 * (1 - b);
      } else if (r > 0.5) {
        const b = (r - 0.5) / 0.25;
        trailData.col[i * 3] = 0.6;
        trailData.col[i * 3 + 1] = 0.25 * b + 0.4 * (1 - b);
        trailData.col[i * 3 + 2] = 0.03;
      } else if (r > 0.25) {
        const b = (r - 0.25) / 0.25;
        trailData.col[i * 3] = 0.45 * b + 0.25 * (1 - b);
        trailData.col[i * 3 + 1] = 0.12 * b + 0.04 * (1 - b);
        trailData.col[i * 3 + 2] = 0.01;
      } else {
        const b = r / 0.25;
        trailData.col[i * 3] = 0.18 * b;
        trailData.col[i * 3 + 1] = 0.02 * b;
        trailData.col[i * 3 + 2] = 0.005 * b;
      }

      // Size: thinner trail
      const flicker = 0.92 + 0.08 * Math.sin(t * 18 + i * 0.9);
      trailData.siz[i] = r3 * 2.8 * flicker * (0.4 + speed * 2.5);
    }

    if (trailRef.current) {
      trailRef.current.geometry.attributes.position.needsUpdate = true;
      trailRef.current.geometry.attributes.color.needsUpdate = true;
      trailRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // ===== SPARKS (fast hot fragments) =====
    for (let i = 0; i < SPARK_COUNT; i++) {
      const p = sparkData.particles[i];

      if (p.life <= 0 && speed > 0.005) {
        // Spawn near head with velocity-based direction
        const idx = Math.floor(Math.random() * 6);
        const src = trail.current[idx];

        sparkData.pos[i * 3] = src.x + (Math.random() - 0.5) * 0.1;
        sparkData.pos[i * 3 + 1] = src.y + (Math.random() - 0.5) * 0.1;
        sparkData.pos[i * 3 + 2] = 0;

        // Sparks fly outward opposite to movement + random spread
        const angle = Math.atan2(-vy, -vx) + (Math.random() - 0.5) * 2.5;
        const force = 0.015 + Math.random() * 0.05 + speed * 0.8;
        p.vx = Math.cos(angle) * force;
        p.vy = Math.sin(angle) * force;
        p.maxLife = 20 + Math.random() * 40;
        p.life = p.maxLife;
      } else if (p.life > 0) {
        // Physics: gravity + air drag
        p.vy -= 0.0008; // gravity pulls down
        p.vx *= 0.975;  // air friction
        p.vy *= 0.975;

        sparkData.pos[i * 3] += p.vx;
        sparkData.pos[i * 3 + 1] += p.vy;
        p.life--;
      }

      const lr = Math.max(0, p.life / p.maxLife);
      const lr2 = lr * lr;

      // Spark colors (dimmed)
      if (p.type === 0) {
        sparkData.col[i * 3] = 0.6 * lr;
        sparkData.col[i * 3 + 1] = 0.45 * lr2;
        sparkData.col[i * 3 + 2] = 0.2 * lr2;
      } else if (p.type === 1) {
        sparkData.col[i * 3] = 0.6 * lr;
        sparkData.col[i * 3 + 1] = 0.3 * lr2;
        sparkData.col[i * 3 + 2] = 0.05 * lr2;
      } else {
        sparkData.col[i * 3] = 0.55 * lr;
        sparkData.col[i * 3 + 1] = 0.5 * lr;
        sparkData.col[i * 3 + 2] = 0.4 * lr;
      }

      const sparkFlicker = 0.6 + 0.4 * Math.sin(t * 25 + i * 5);
      sparkData.siz[i] = lr * 1.4 * sparkFlicker;
    }

    if (sparksRef.current) {
      sparksRef.current.geometry.attributes.position.needsUpdate = true;
      sparksRef.current.geometry.attributes.color.needsUpdate = true;
      sparksRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // ===== EMBERS (slow floating glowing particles) =====
    for (let i = 0; i < EMBER_COUNT; i++) {
      const e = emberData.particles[i];

      if (e.life <= 0 && speed > 0.003) {
        const idx = Math.floor(Math.random() * 20) + 5;
        const src = trail.current[Math.min(idx, TRAIL_LENGTH - 1)];

        emberData.pos[i * 3] = src.x + (Math.random() - 0.5) * 0.3;
        emberData.pos[i * 3 + 1] = src.y + (Math.random() - 0.5) * 0.2;
        emberData.pos[i * 3 + 2] = 0;

        // Embers float upward slowly with random drift
        e.vx = (Math.random() - 0.5) * 0.008;
        e.vy = 0.004 + Math.random() * 0.01; // float up like heat
        e.maxLife = 40 + Math.random() * 60;
        e.life = e.maxLife;
        e.brightness = 0.5 + Math.random() * 0.5;
      } else if (e.life > 0) {
        // Gentle float with swaying
        e.vx += Math.sin(t * 3 + i) * 0.0002;
        e.vy -= 0.00005; // very slight gravity

        emberData.pos[i * 3] += e.vx;
        emberData.pos[i * 3 + 1] += e.vy;
        e.life--;
      }

      const lr = Math.max(0, e.life / e.maxLife);

      // Ember glow (dimmed)
      const pulse = 0.7 + 0.3 * Math.sin(t * 4 + i * 2);
      const b = e.brightness * pulse;
      emberData.col[i * 3] = 0.5 * lr * b;
      emberData.col[i * 3 + 1] = 0.12 * lr * b;
      emberData.col[i * 3 + 2] = 0.02 * lr * b;

      emberData.siz[i] = lr * 1.0 * b;
    }

    if (embersRef.current) {
      embersRef.current.geometry.attributes.position.needsUpdate = true;
      embersRef.current.geometry.attributes.color.needsUpdate = true;
      embersRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // ===== GLOW LAYERS =====
    const layers = glowRefs.current;
    const hx = smoothPos.current.x;
    const hy = smoothPos.current.y;

    if (layers[0]) {
      layers[0].position.set(hx, hy, 0);
      layers[0].scale.setScalar(0.5 + speed * 3 + Math.sin(t * 10) * 0.05);
    }
    if (layers[1]) {
      layers[1].position.set(hx, hy, 0);
      layers[1].scale.setScalar(0.25 + speed * 1.8 + Math.sin(t * 14) * 0.03);
    }
    if (layers[2]) {
      layers[2].position.set(hx, hy, 0);
      layers[2].scale.setScalar(0.08 + speed * 0.8);
    }
  });

  const shader = {
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (200.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float a = 1.0 - smoothstep(0.0, 0.5, d);
        a = pow(a, 2.5);
        gl_FragColor = vec4(vColor, a * 0.75);
      }
    `,
  };

  const setGlowRef = (i) => (el) => { glowRefs.current[i] = el; };

  return (
    <>
      {/* Glow layer 1: Outer soft halo */}
      <mesh ref={setGlowRef(0)} position={[100, 100, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshBasicMaterial color="#cc6622" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Glow layer 2: Mid warm */}
      <mesh ref={setGlowRef(1)} position={[100, 100, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#ddaa55" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Glow layer 3: Inner core */}
      <mesh ref={setGlowRef(2)} position={[100, 100, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#ffeedd" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Fire trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={TRAIL_LENGTH} array={trailData.pos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={TRAIL_LENGTH} array={trailData.col} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={TRAIL_LENGTH} array={trailData.siz} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial {...shader} />
      </points>

      {/* Hot sparks */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={SPARK_COUNT} array={sparkData.pos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={SPARK_COUNT} array={sparkData.col} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={SPARK_COUNT} array={sparkData.siz} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial {...shader} />
      </points>

      {/* Floating embers */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={EMBER_COUNT} array={emberData.pos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={EMBER_COUNT} array={emberData.col} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={EMBER_COUNT} array={emberData.siz} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial {...shader} />
      </points>
    </>
  );
}
