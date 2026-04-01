import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 2rem',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'var(--accent-gradient)', 
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          color: 'var(--bg-primary)'
        }}>
          C
        </div>
        <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>Cipher</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/solutions" className="nav-link">Solutions</Link>
        <Link to="/docs" className="nav-link">Docs</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button style={{ background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Sign in</button>
        <button 
          className="btn-primary" 
          style={{ padding: '0.5rem 1.25rem' }}
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
