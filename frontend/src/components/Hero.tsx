
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <div className="container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: 'var(--nav-height)',
      position: 'relative'
    }}>
      <div style={{ flex: 1, zIndex: 1, position: 'relative' }}>
        <h1 className="hero-title fade-in delay-1">
          Cipher: The Doctor Savier.
        </h1>
        <p className="hero-subtitle fade-in delay-2">
          We give doctors their time back. Cipher handles the documentation so you can focus on what matters most: your patients.
        </p>
        <div className="fade-in delay-3" style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Documentation</button>
        </div>
      </div>
      
      {/* 3D Model Container */}
      <div className="fade-in" style={{ 
        flex: 1, 
        height: '800px', 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        marginRight: '-100px' // Slight overflow for better visual balance
      }}>
        {/* Actual Spline model */}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Spline 
            scene="https://prod.spline.design/kJx9jGk3KsRX4odZ/scene.splinecode" 
            style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          />
          
          {/* Mask to blend the light Spline background into the dark page theme */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at center, transparent 30%, var(--bg-primary) 75%)',
            zIndex: 10
          }} />
        </div>
        
        {/* Deep indigo glow effect behind model */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140%',
          height: '140%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      </div>
    </div>
  );
};

export default Hero;

