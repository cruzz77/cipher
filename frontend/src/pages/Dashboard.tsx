
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import VoiceInput from '../components/VoiceInput';
import RecordCard from '../components/RecordCard';
import { Sparkles, Brain, AlertCircle, History, MessageSquarePlus, Loader2 } from 'lucide-react';

interface Record {
  id: number;
  symptoms: string[];
  duration: string;
  medication: string[];
  notes: string;
  timestamp: string;
}

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [currentRecord, setCurrentRecord] = useState<Partial<Record>>({
    symptoms: [],
    duration: '',
    medication: [],
    notes: ''
  });
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  // Load records from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cipher_records');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError("Please enter or speak some symptoms first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:1312/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || errData.error || 'Failed to analyze conversation.');
      }

      const data = await response.json();
      setCurrentRecord(data);
      setSelectedId(undefined); // New unsaved record
    } catch (err: any) {
      setError(err.message || "Something went wrong while analyzing.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    const newRecord: Record = {
      ...currentRecord as any,
      id: selectedId || Date.now(),
      timestamp: new Date().toLocaleString()
    };

    let updatedRecords;
    if (selectedId) {
      updatedRecords = records.map(r => r.id === selectedId ? newRecord : r);
    } else {
      updatedRecords = [newRecord, ...records];
      setSelectedId(newRecord.id);
    }

    setRecords(updatedRecords);
    localStorage.setItem('cipher_records', JSON.stringify(updatedRecords));
    
    setTimeout(() => setIsSaving(false), 500); // Visual feedback
  };

  const handleSelectRecord = (record: Record) => {
    setCurrentRecord(record);
    setSelectedId(record.id);
    setInputText(''); // Clear input when viewing history
    setError(null);
  };

  const startNewSession = () => {
    setCurrentRecord({ symptoms: [], duration: '', medication: [], notes: '' });
    setSelectedId(undefined);
    setInputText('');
    setError(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <Sidebar 
        records={records} 
        onSelectRecord={handleSelectRecord} 
        selectedId={selectedId} 
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Header */}
        <header style={{ 
          padding: '24px 40px', 
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 className="serif-font" style={{ fontSize: '2rem', marginBottom: '4px' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Welcome back, Dr. Aditya</p>
          </div>
          <button 
            className="btn-secondary" 
            onClick={startNewSession}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
          >
            <MessageSquarePlus size={16} />
            New Session
          </button>
        </header>

        <div style={{ flex: 1, display: 'flex', padding: '32px', gap: '32px', overflow: 'hidden' }}>
          {/* Left Side: Input */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Brain size={18} color="var(--accent-color)" />
                Capture Conversation
              </h3>
              <VoiceInput 
                onTextGenerated={(text) => setInputText(text)} 
                isProcessing={isAnalyzing} 
              />
            </div>

            <div style={{ position: 'relative', flex: 1 }}>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter or speak patient symptoms, medical history, or conversation details..."
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '24px',
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  resize: 'none',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '24px', 
                right: '24px',
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  className="btn-primary"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !inputText.trim()}
                  style={{
                    padding: '12px 32px',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 30px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Generating Record...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Generate Record</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ 
                padding: '16px', 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.2)', 
                borderRadius: '12px',
                color: '#ef4444',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>

          {/* Right Side: Output */}
          <div style={{ flex: 1.2, height: '100%' }}>
            {currentRecord.notes || currentRecord.symptoms?.length ? (
              <RecordCard 
                record={currentRecord as any} 
                onChange={(updated) => setCurrentRecord(updated)}
                onSave={handleSave}
                isSaving={isSaving}
              />
            ) : (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'var(--glass-bg)',
                borderRadius: '24px',
                border: '1px dashed var(--glass-border)',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                padding: '40px'
              }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  background: 'var(--bg-tertiary)', 
                  borderRadius: '20px',
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '24px'
                }}>
                  <History size={32} opacity={0.5} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>No Record Selected</h3>
                <p style={{ maxWidth: '300px', margin: '0 auto', fontSize: '0.9rem' }}>
                  Select a record from the history or generate a new one to see structured details.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--glass-border); borderRadius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }
      `}</style>
    </div>
  );
};

export default Dashboard;
