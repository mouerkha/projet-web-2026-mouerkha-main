import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField({ count = 2500 }) {
  const meshRef = useRef();
  const mouse3D = useRef(new THREE.Vector2(9999, 9999));
  const { viewport } = useThree();

  // Track mouse position
  useMemo(() => {
    const handler = (e) => {
      mouse3D.current.set(
        ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2),
        (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2)
      );
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [viewport]);

  const { basePositions, positions, scales, phases, speeds, colors } = useMemo(() => {
    const basePos = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const phs = new Float32Array(count);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) - 15;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      scl[i] = 0.3 + Math.random() * 1.2;
      phs[i] = Math.random() * Math.PI * 2;
      spd[i] = 0.3 + Math.random() * 2.5;

      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        col[i * 3] = 1;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1;
      } else if (colorChoice < 0.75) {
        col[i * 3] = 0.7;
        col[i * 3 + 1] = 0.85;
        col[i * 3 + 2] = 1;
      } else {
        col[i * 3] = 0.9;
        col[i * 3 + 1] = 0.7;
        col[i * 3 + 2] = 1;
      }
    }

    return {
      basePositions: basePos,
      positions: pos,
      scales: scl,
      phases: phs,
      speeds: spd,
      colors: col,
    };
  }, [count]);

  // Store per-star offsets for repulsion (smoothly animated)
  const offsets = useRef(new Float32Array(count * 3));

  const sizesAttr = useRef();
  const posAttr = useRef();
  const currentSizes = useMemo(() => new Float32Array(count), [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mx = mouse3D.current.x;
    const my = mouse3D.current.y;
    const repulseRadius = 4.5;
    const repulseStrength = 3.5;
    const off = offsets.current;

    for (let i = 0; i < count; i++) {
      // Twinkle
      const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * speeds[i] + phases[i]));
      currentSizes[i] = scales[i] * twinkle;

      // Get base star position (projected to 2D for mouse comparison)
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      // Project star to screen space (approximate)
      const camZ = 12;
      const depth = camZ - bz;
      const projScale = depth > 0.1 ? camZ / depth : 1;
      const screenX = bx * projScale;
      const screenY = by * projScale;

      // Distance from mouse
      const dx = screenX - mx;
      const dy = screenY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion force
      let targetOffX = 0;
      let targetOffY = 0;
      let targetOffZ = 0;

      if (dist < repulseRadius && dist > 0.01) {
        const force = (1 - dist / repulseRadius) * repulseStrength;
        const nx = dx / dist;
        const ny = dy / dist;
        targetOffX = nx * force / projScale;
        targetOffY = ny * force / projScale;
        targetOffZ = force * 0.3; // Push slightly forward too
      }

      // Smooth lerp the offsets (stars drift back slowly)
      off[i * 3] += (targetOffX - off[i * 3]) * 0.08;
      off[i * 3 + 1] += (targetOffY - off[i * 3 + 1]) * 0.08;
      off[i * 3 + 2] += (targetOffZ - off[i * 3 + 2]) * 0.08;

      // Apply offset to position
      positions[i * 3] = bx + off[i * 3];
      positions[i * 3 + 1] = by + off[i * 3 + 1];
      positions[i * 3 + 2] = bz + off[i * 3 + 2];
    }

    if (sizesAttr.current) {
      sizesAttr.current.needsUpdate = true;
    }
    if (posAttr.current) {
      posAttr.current.needsUpdate = true;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.008;
      meshRef.current.rotation.x = Math.sin(t * 0.003) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={posAttr}
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          ref={sizesAttr}
          attach="attributes-size"
          count={count}
          array={currentSizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, d);
            alpha = pow(alpha, 1.5);
            gl_FragColor = vec4(vColor, alpha);
          }
        `}
      />
    </points>
  );
}
