"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [isLanguageSwitcherVisible, setIsLanguageSwitcherVisible] = useState(true);

  useEffect(() => {
    // Attempt to load saved language
    const savedLang = localStorage.getItem('appLang');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    // Update HTML attributes for language and direction
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('appLang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, isLanguageSwitcherVisible, setIsLanguageSwitcherVisible }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
