"use client";
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, toggleLanguage, isLanguageSwitcherVisible } = useLanguage();

  if (!isLanguageSwitcherVisible) return null;

  return (
    <button
      onClick={toggleLanguage}
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        zIndex: 100,
        background: 'rgba(10, 10, 10, 0.8)',
        color: 'var(--gold-accent, #D4AF37)',
        border: '1px solid rgba(212, 175, 55, 0.4)',
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        fontFamily: 'var(--font-inter)',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        letterSpacing: '1px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.background = 'rgba(20, 20, 20, 0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = 'rgba(10, 10, 10, 0.8)';
      }}
      aria-label="Toggle Language"
    >
      {lang === 'en' ? 'عربي' : 'EN'}
    </button>
  );
}
