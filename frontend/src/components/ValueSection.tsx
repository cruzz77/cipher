import { Clock, Shield, Sparkles, Zap } from 'lucide-react';

const ValueSection = () => {
  const features = [
    { 
      icon: Clock, 
      title: 'Time Recovered', 
      description: 'Doctors save an average of 4 hours daily on administrative tasks. Spend more time with patients, less with charts.' 
    },
    { 
      icon: Sparkles, 
      title: 'AI Precision', 
      description: 'Clinical-grade language models ensure accurate, structured notes tailored to your specialty.' 
    },
    { 
      icon: Shield, 
      title: 'HIPAA Compliant', 
      description: 'Enterprise-grade security with end-to-end encryption. Your patient data is always protected.' 
    },
    { 
      icon: Zap, 
      title: 'Instant Integration', 
      description: 'Connects seamlessly with all major EHR systems. No complex setup or long training periods.' 
    }
  ];

  return (
    <section id="features" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', paddingBottom: '160px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ 
            color: 'var(--accent-color)', 
            textTransform: 'uppercase', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.1em' 
          }}>Why Cipher?</span>
          <h2 style={{ fontSize: '3rem', marginTop: '16px' }}>Documentation at the speed of thought.</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {features.map((item, idx) => (
            <div key={idx} className="glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(99, 102, 241, 0.1)', 
                borderRadius: '8px',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--accent-color)'
              }}>
                <item.icon size={20} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 500 }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
