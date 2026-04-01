
const Footer = () => {
  return (
    <footer style={{ padding: '80px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--accent-gradient)', borderRadius: '6px' }} />
            <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>Cipher</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '300px' }}>
            Revolutionizing clinical documentation with advanced AI. Built for doctors, by engineers who care.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li><a href="#">Features</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Roadmap</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', color: 'rgb(82, 82, 82)', fontSize: '0.75rem' }}>
        <p>© 2026 Cipher AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
