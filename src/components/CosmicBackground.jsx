import { Canvas } from '@react-three/fiber';
import StarField from './StarField';
import MeteorTrail from './MeteorTrail';

export default function CosmicBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      { }
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, #0a0014 0%, #120a2e 20%, #1a0a3e 40%, #0d1b4a 65%, #0a1628 85%, #060d1a 100%)',
          zIndex: 0,
        }}
      />

      { }
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(127, 77, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(18, 194, 233, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      { }
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'auto' }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <StarField count={2500} />
        <MeteorTrail />
      </Canvas>
    </div>
  );
}
