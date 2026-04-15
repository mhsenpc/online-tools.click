import React, { useState } from 'react';
import { ulid } from 'ulid';

function App() {
  const [idType, setIdType] = useState<'uuid' | 'ulid'>('uuid');
  const [count, setCount] = useState<1 | 10 | 100>(1);
  const [ids, setIds] = useState<string[]>([]);

  // Generate UUID v4
  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Generate IDs based on type and count
  const generateIds = () => {
    const newIds: string[] = [];
    for (let i = 0; i < count; i++) {
      if (idType === 'uuid') {
        newIds.push(generateUUID());
      } else {
        newIds.push(ulid());
      }
    }
    setIds(newIds);
  };

  // Copy all IDs to clipboard
  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(ids.join('\n'));
      alert('All IDs copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  // Copy single ID to clipboard
  const copySingle = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      alert('ID copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  // Generate IDs on mount and when settings change
  React.useEffect(() => {
    generateIds();
  }, [idType, count]);

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        UUID / ULID Generator
      </h1>

      <p style={{
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Generate unique identifiers instantly. 100% client-side, no tracking or logging.
      </p>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {/* ID Type Toggle */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333'
          }}>
            ID Type
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setIdType('uuid')}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: `2px solid ${idType === 'uuid' ? '#007bff' : '#ddd'}`,
                borderRadius: '6px',
                backgroundColor: idType === 'uuid' ? '#007bff' : '#fff',
                color: idType === 'uuid' ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              UUID v4
            </button>
            <button
              onClick={() => setIdType('ulid')}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: `2px solid ${idType === 'ulid' ? '#007bff' : '#ddd'}`,
                borderRadius: '6px',
                backgroundColor: idType === 'ulid' ? '#007bff' : '#fff',
                color: idType === 'ulid' ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              ULID
            </button>
          </div>
        </div>

        {/* Count Selector */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333'
          }}>
            Generate Count
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCount(1)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: `2px solid ${count === 1 ? '#007bff' : '#ddd'}`,
                borderRadius: '6px',
                backgroundColor: count === 1 ? '#007bff' : '#fff',
                color: count === 1 ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              1
            </button>
            <button
              onClick={() => setCount(10)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: `2px solid ${count === 10 ? '#007bff' : '#ddd'}`,
                borderRadius: '6px',
                backgroundColor: count === 10 ? '#007bff' : '#fff',
                color: count === 10 ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              10
            </button>
            <button
              onClick={() => setCount(100)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: `2px solid ${count === 100 ? '#007bff' : '#ddd'}`,
                borderRadius: '6px',
                backgroundColor: count === 100 ? '#007bff' : '#fff',
                color: count === 100 ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              100
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={generateIds}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
        >
          🔄 Regenerate
        </button>
        <button
          onClick={copyAll}
          disabled={ids.length === 0}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: ids.length > 0 ? '#007bff' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: ids.length > 0 ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            if (ids.length > 0) e.currentTarget.style.backgroundColor = '#0056b3';
          }}
          onMouseOut={(e) => {
            if (ids.length > 0) e.currentTarget.style.backgroundColor = '#007bff';
          }}
        >
          📋 Copy All
        </button>
      </div>

      {/* Generated IDs List */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '1.5rem',
        minHeight: '300px',
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        {ids.length === 0 ? (
          <p style={{
            textAlign: 'center',
            color: '#999',
            padding: '2rem'
          }}>
            Click "Regenerate" to create IDs
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {ids.map((id, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  color: '#333',
                  wordBreak: 'break-all'
                }}>
                  {id}
                </span>
                <button
                  onClick={() => copySingle(id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{
          marginBottom: '1rem',
          color: '#004085',
          fontSize: '1.1rem'
        }}>
          ℹ️ About {idType === 'uuid' ? 'UUID v4' : 'ULID'}
        </h3>
        <p style={{
          color: '#004085',
          lineHeight: '1.6',
          margin: 0
        }}>
          {idType === 'uuid'
            ? 'UUID v4 (Version 4) is a randomly generated unique identifier. It\'s 128 bits long and typically displayed as 32 hexadecimal digits separated by hyphens. Perfect for database keys, session IDs, and anywhere you need a unique identifier.'
            : 'ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit unique ID that is sortable by time. Unlike UUID, ULIDs are monotonically increasing and can be sorted chronologically. Great for distributed systems and databases where time-ordering matters.'}
        </p>
      </div>
    </div>
  );
}

export default App;
