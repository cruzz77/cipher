
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LogoCloud from '../components/LogoCloud';
import ValueSection from '../components/ValueSection';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = ({ section }: { section?: string }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [section]);

    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <div id="solutions">
                    <LogoCloud />
                </div>
                <ValueSection />
                
                {/* Call to Action Section */}
                <section id="pricing" style={{ 
                    margin: '0 24px 100px 24px',
                    background: 'linear-gradient(rgba(99, 102, 241, 0.05) 0%, transparent 100%)',
                    borderRadius: '24px',
                    border: '1px solid var(--glass-border)',
                    textAlign: 'center',
                    padding: '120px 24px'
                }}>
                    <div className="container">
                        <h2 style={{ fontSize: '4rem', marginBottom: '32px' }}>Ready to get your time back?</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
                            Join thousands of clinicians who are reclaiming their workday with Cipher.
                        </p>
                        <button 
                            className="btn-primary" 
                            style={{ padding: '16px 48px', fontSize: '1.1rem' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Get Started Today
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
