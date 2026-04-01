
import React from 'react';
import { Search, Clock, ChevronRight, MessageSquare } from 'lucide-react';

interface Record {
  id: number;
  symptoms: string[];
  duration: string;
  medication: string[];
  notes: string;
  timestamp: string;
}

interface SidebarProps {
  records: Record[];
  onSelectRecord: (record: Record) => void;
  selectedId?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ records, onSelectRecord, selectedId }) => {
  const [search, setSearch] = React.useState('');

  const filteredRecords = records.filter(r => 
    r.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    r.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ 
      width: '320px', 
      height: '100vh', 
      borderRight: '1px solid var(--glass-border)',
      background: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10
    }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'var(--accent-gradient)', 
            borderRadius: '8px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
            color: 'var(--bg-primary)'
          }}>
            C
          </div>
          <span style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.01em' }}>History</span>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input 
            type="text" 
            placeholder="Search symptoms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '10px 12px 10px 36px',
              color: 'var(--text-primary)',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        {filteredRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            No records found
          </div>
        ) : (
          filteredRecords.map(record => (
            <button
              key={record.id}
              onClick={() => onSelectRecord(record)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '16px',
                borderRadius: '12px',
                background: selectedId === record.id ? 'var(--glass-bg)' : 'transparent',
                border: selectedId === record.id ? '1px solid var(--glass-border)' : '1px solid transparent',
                marginBottom: '8px',
                transition: 'all 0.2s',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <div style={{ 
                marginTop: '4px',
                padding: '6px',
                borderRadius: '6px',
                background: selectedId === record.id ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                color: selectedId === record.id ? 'white' : 'var(--text-secondary)'
              }}>
                <MessageSquare size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 500, 
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{record.symptoms[0] || 'Unstructured Record'}</span>
                  <ChevronRight size={14} style={{ opacity: 0.5 }} />
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={12} />
                  {record.timestamp}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
      
      <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)' }}>
        <button 
          className="btn-secondary" 
          style={{ width: '100%', fontSize: '0.8rem', padding: '10px' }}
          onClick={() => window.location.href = '/'}
        >
          Back to Landing
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
