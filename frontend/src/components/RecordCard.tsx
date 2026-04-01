
import React from 'react';
import { Tag, Clock, Pill, FileText, CheckCircle, Save, Loader2 } from 'lucide-react';

interface Record {
  id?: number;
  symptoms: string[];
  duration: string;
  medication: string[];
  notes: string;
}

interface RecordCardProps {
  record: Record;
  onChange: (updatedRecord: Record) => void;
  onSave: () => void;
  isSaving?: boolean;
}

const RecordCard: React.FC<RecordCardProps> = ({ record, onChange, onSave, isSaving }) => {
  const handleInputChange = (field: keyof Record, value: any) => {
    onChange({ ...record, [field]: value });
  };

  const handleArrayChange = (field: 'symptoms' | 'medication', value: string) => {
    const list = value.split(',').map(s => s.trim()).filter(s => s !== '');
    handleInputChange(field as any, list);
  };

  return (
    <div className="glass fade-in" style={{ 
      padding: '32px', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CheckCircle size={20} color="var(--accent-color)" />
          Structured Medical Record
        </h2>
        <button 
          className="btn-primary" 
          onClick={onSave}
          disabled={isSaving}
          style={{ 
            padding: '8px 24px', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Record
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Symptoms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tag size={12} /> Symptoms (comma separated)
          </label>
          <textarea
            value={record.symptoms.join(', ')}
            onChange={(e) => handleArrayChange('symptoms', e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '12px',
              color: 'var(--text-primary)',
              minHeight: '80px',
              fontSize: '0.95rem'
            }}
          />
        </div>

        {/* Duration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} /> Duration
            </label>
            <input
              type="text"
              value={record.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                padding: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Medication */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Pill size={12} /> Medication (comma separated)
        </label>
        <textarea
          value={record.medication.join(', ')}
          onChange={(e) => handleArrayChange('medication', e.target.value)}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '12px',
            color: 'var(--text-primary)',
            minHeight: '80px',
            fontSize: '0.95rem'
          }}
        />
      </div>

      {/* Clinical Notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={12} /> Clinical Notes
        </label>
        <textarea
          value={record.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '16px',
            color: 'var(--text-primary)',
            minHeight: '200px',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}
        />
      </div>
      
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default RecordCard;
