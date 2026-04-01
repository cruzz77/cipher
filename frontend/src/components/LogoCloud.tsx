import { Activity, Beaker, Briefcase, Clipboard, Heart, Microscope } from 'lucide-react';

const LogoCloud = () => {
  const logos = [
    { icon: Activity, name: 'MedCore' },
    { icon: Beaker, name: 'BioLab' },
    { icon: Microscope, name: 'OmniHealth' },
    { icon: Heart, name: 'PulseCare' },
    { icon: Clipboard, name: 'StatNotes' },
    { icon: Briefcase, name: 'HealthFlow' },
  ];

  return (
    <div style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', background: 'linear-gradient(to bottom, transparent, var(--bg-secondary))' }}>
      <div className="container">
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          marginBottom: '48px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Trusted by world-class clinicians and medical institutions
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '48px', 
          alignItems: 'center',
          justifyItems: 'center',
          opacity: 0.6
        }}>
          {logos.map((Logo, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Logo.icon size={24} strokeWidth={1.5} />
              <span style={{ fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>{Logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
