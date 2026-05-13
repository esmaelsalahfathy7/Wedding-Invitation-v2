"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMessages, getRSVPs } from '../services/firebaseService';
import { useLanguage } from '../context/LanguageContext';

export default function GroomDashboard({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('rsvp'); // 'rsvp' or 'messages'
  const [messages, setMessages] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'attending', 'declined'

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    const msgRes = await getMessages();
    const rsvpRes = await getRSVPs();
    if (msgRes.success) setMessages(msgRes.data);
    if (rsvpRes.success) setRsvps(rsvpRes.data);
  };

  const filteredRSVPs = rsvps.filter(item => {
    const nameStr = item.name ? item.name.toLowerCase() : "";
    const matchesSearch = nameStr.includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'attending' && item.attending === true) ||
                         (filterStatus === 'declined' && item.attending === false);
    return matchesSearch && matchesFilter;
  });

  const filteredMessages = messages.filter(item => {
    const nameStr = item.name ? item.name.toLowerCase() : "";
    const textStr = item.text ? item.text.toLowerCase() : "";
    return nameStr.includes(searchQuery.toLowerCase()) || textStr.includes(searchQuery.toLowerCase());
  });

  const attendingCount = rsvps.filter(r => r.attending === true).length;
  const declinedCount = rsvps.filter(r => r.attending === false).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 4, 20, 0.95)',
            backdropFilter: 'blur(15px)',
            zIndex: 20000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            className="glass-card"
            style={{ 
              width: '100%', 
              maxWidth: '900px', 
              maxHeight: '80vh', 
              overflowY: 'auto', 
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Stats Summary */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.8rem', color: 'var(--gold-accent)', margin: 0 }}>{t('dashboard')}</h2>
              
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <div style={{ 
                  background: 'rgba(74, 222, 128, 0.05)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '15px', 
                  border: '1px solid rgba(74, 222, 128, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('attendingCount')}:</span>
                  <span style={{ fontSize: '1.1rem', color: '#4ade80', fontWeight: 'bold' }}>{attendingCount}</span>
                </div>
                <div style={{ 
                  background: 'rgba(248, 113, 113, 0.05)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '15px', 
                  border: '1px solid rgba(248, 113, 113, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('declinedCount')}:</span>
                  <span style={{ fontSize: '1.1rem', color: '#f87171', fontWeight: 'bold' }}>{declinedCount}</span>
                </div>
              </div>
              
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem', padding: '0.5rem' }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--ivory-highlight)', paddingBottom: '0.5rem' }}>
              <button 
                onClick={() => setActiveTab('rsvp')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'rsvp' ? 'var(--gold-accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-playfair)',
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  transition: 'color 0.3s ease'
                }}
              >
                {t('rsvp') || 'RSVP'}
                {activeTab === 'rsvp' && <motion.div layoutId="tab-underline" style={{ position: 'absolute', bottom: -9, left: 0, right: 0, height: '2px', background: 'var(--gold-accent)' }} />}
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'messages' ? 'var(--gold-accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-playfair)',
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  transition: 'color 0.3s ease'
                }}
              >
                {t('wordsOfLove')}
                {activeTab === 'messages' && <motion.div layoutId="tab-underline" style={{ position: 'absolute', bottom: -9, left: 0, right: 0, height: '2px', background: 'var(--gold-accent)' }} />}
              </button>
            </div>

            {/* Search & Filter */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              marginBottom: '2rem' 
            }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <span style={{ 
                  position: 'absolute', 
                  left: lang === 'ar' ? 'auto' : '1.2rem', 
                  right: lang === 'ar' ? '1.2rem' : 'auto', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-secondary)',
                  opacity: 0.6
                }}>
                  🔍
                </span>
                <input 
                  type="text"
                  placeholder={t('searchGuest')}
                  className="input-dark"
                  style={{ 
                    width: '100%', 
                    margin: 0, 
                    paddingLeft: lang === 'ar' ? '1rem' : '3rem', 
                    paddingRight: lang === 'ar' ? '3rem' : '1rem',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    height: '45px',
                    border: '1px solid var(--ivory-highlight)'
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {activeTab === 'rsvp' && (
                <div style={{ 
                  display: 'flex', 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '4px', 
                  borderRadius: '30px', 
                  border: '1px solid var(--ivory-highlight)',
                  width: 'fit-content',
                  alignSelf: 'center',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {['all', 'attending', 'declined'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '25px',
                        border: 'none',
                        background: filterStatus === status ? 'var(--gold-accent)' : 'transparent',
                        color: filterStatus === status ? '#000' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: filterStatus === status ? '600' : '400',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        minWidth: '90px',
                        justifyContent: 'center'
                      }}
                    >
                      {status === 'all' ? t('all') : (status === 'attending' ? t('attendingCount') : t('declinedCount'))}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content List */}
            <div style={{ flex: 1, overflowX: 'hidden', paddingBottom: '1rem' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'rsvp' ? (
                  <motion.div
                    key="rsvp-list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}
                  >
                    {filteredRSVPs.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          padding: '1.5rem',
                          background: 'rgba(255,255,255,0.03)',
                          borderRadius: '20px',
                          border: '1px solid var(--ivory-highlight)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.8rem',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          width: '100%'
                        }}
                      >
                        <div style={{ 
                          position: 'absolute', 
                          top: 0, 
                          right: lang === 'ar' ? 'auto' : 0, 
                          left: lang === 'ar' ? 0 : 'auto',
                          width: '5px',
                          height: '100%',
                          background: item.attending ? '#4ade80' : '#f87171'
                        }} />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <h4 style={{ 
                              color: 'var(--gold-accent)', 
                              margin: 0, 
                              fontSize: '1.2rem',
                              fontFamily: 'var(--font-playfair)'
                            }}>{item.name}</h4>
                            <span style={{ 
                              color: item.attending ? '#4ade80' : '#f87171',
                              padding: '0.2rem 0.8rem',
                              borderRadius: '20px',
                              background: item.attending ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              border: `1px solid ${item.attending ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)'}`
                            }}>
                              {item.attending ? t('joyfullyAttending') : t('regretfullyDecline')}
                            </span>
                          </div>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            color: 'var(--text-secondary)',
                            opacity: 0.7
                          }}>
                            {item.timestamp?.toDate ? new Date(item.timestamp.toDate()).toLocaleDateString() : ''}
                          </span>
                        </div>

                        {/* Explicit check for message field */}
                        {(item.message !== undefined && item.message !== "") || (item.text !== undefined && item.text !== "") ? (
                          <div style={{ 
                            marginTop: '0.5rem',
                            padding: '1.2rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '15px',
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                            lineHeight: '1.6',
                            fontStyle: 'italic',
                            border: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative'
                          }}>
                            <span style={{ 
                              position: 'absolute', 
                              top: '-8px', 
                              left: lang === 'ar' ? 'auto' : '12px', 
                              right: lang === 'ar' ? '12px' : 'auto',
                              fontSize: '1.8rem',
                              color: 'var(--gold-accent)',
                              opacity: 0.3,
                              fontFamily: 'serif'
                            }}>"</span>
                            {item.message || item.text}
                          </div>
                        ) : (
                           <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', opacity: 0.5 }}>
                             No message left.
                           </div>
                        )}
                      </motion.div>
                    ))}
                    {filteredRSVPs.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }}>Empty</div>
                        <p>{t('noResults')}</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="msg-list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    {filteredMessages.map((msg) => (
                      <div key={msg.id} style={{ 
                        padding: '1.5rem', 
                        background: 'rgba(255,255,255,0.03)', 
                        borderRadius: '20px', 
                        border: '1px solid var(--ivory-highlight)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--gold-accent)', fontWeight: 'bold', fontFamily: 'var(--font-playfair)', fontSize: '1.1rem' }}>{msg.name}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                            {msg.timestamp?.toDate ? new Date(msg.timestamp.toDate()).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0 }}>{msg.text}</p>
                        {msg.drawing && (
                          <div style={{ 
                            marginTop: '0.5rem', 
                            padding: '0.8rem', 
                            background: 'rgba(197, 160, 89, 0.05)', 
                            borderRadius: '10px', 
                            fontSize: '0.85rem', 
                            fontStyle: 'italic',
                            color: 'var(--gold-accent)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            border: '1px solid rgba(197, 160, 89, 0.1)'
                          }}>
                            🎨 {t('drawingReady')}
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredMessages.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                         <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }}>Empty</div>
                        <p>{t('noResults')}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
