
const Navbar = () => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'var(--accent-gradient)', 
          borderRadius: '8px',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          C
        </div>
        <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>Cipher</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
        <a href="#features" className="nav-link">Features</a>
        <a href="#solutions" className="nav-link">Solutions</a>
        <a href="#docs" className="nav-link">Docs</a>
        <a href="#pricing" className="nav-link">Pricing</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button style={{ background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Sign in</button>
        <button className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
