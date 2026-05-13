"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const Particles = () => (
  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "10vh", opacity: 0, x: 0 }}
        animate={{
          y: "-110vh",
          x: [0, Math.random() * 60 - 30, 0],
          opacity: [0, 0.4, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12 + Math.random() * 8,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
        style={{
          position: "absolute",
          bottom: "-10%",
          left: `${Math.random() * 100}%`,
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          background: "var(--wine-accent)",
          borderRadius: "50% 0 50% 50%",
          filter: "blur(1px)",
          boxShadow: "0 0 8px var(--purple-glow)"
        }}
      />
    ))}
  </div>
);

const LetterCard = ({ senderInitial, senderName, recipientName, forRecipientStr, delay, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        height: "260px",
        margin: "0 auto",
        cursor: "pointer",
        perspective: "1000px"
      }}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 15px 40px rgba(0,0,0,0.8), 0 0 0 1px var(--ivory-highlight)" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
          backgroundColor: "var(--envelope-bg)",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px var(--purple-glow)"
        }}
      >
        {/* Envelope Top Flap (Closed) */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
          backgroundColor: "var(--envelope-bg)",
          clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          borderTop: "1px solid var(--purple-glow)",
          zIndex: 3
        }}>
          {/* Wax Seal */}
          <div style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "40px",
            backgroundColor: "var(--wine-accent)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 15px var(--purple-glow), inset 0 2px 4px rgba(255,255,255,0.3)",
            border: "2px solid rgba(255,255,255,0.1)"
          }}>
            <span style={{ fontSize: "1.2rem", color: "var(--ivory-highlight)", fontFamily: "var(--font-playfair)" }}>{senderInitial}</span>
          </div>
        </div>

        {/* Envelope Bottom Front */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "var(--envelope-bg)",
          clipPath: "polygon(0 100%, 50% 40%, 100% 100%, 100% 0, 0 0)",
          borderBottom: "1px solid var(--purple-glow)",
          zIndex: 2,
          pointerEvents: "none"
        }} />

        {/* Label on the front of the envelope */}
        <div style={{ position: "absolute", bottom: "15%", zIndex: 4 }}>
          <span style={{ fontFamily: "var(--font-playfair)", color: "var(--ivory-highlight)", fontSize: "1.2rem", letterSpacing: "2px", textTransform: "uppercase" }}>
            {forRecipientStr}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function LettersSection() {
  const { t, lang } = useLanguage();
  const [selectedLetter, setSelectedLetter] = useState(null);

  const ahmedName = lang === "ar" ? "أحمد" : "Ahmed";
  const rawanName = lang === "ar" ? "روان" : "Rawan";
  const ahmedInitial = lang === "ar" ? "أ" : "A";
  const rawanInitial = lang === "ar" ? "ر" : "R";

  const letters = [
    {
      id: "ahmed",
      senderName: ahmedName,
      senderInitial: ahmedInitial,
      recipientName: rawanName,
      message: t("ahmedMessage"),
      toRecipientStr: t("toRecipient").replace("{name}", rawanName),
      forRecipientStr: t("forRecipient").replace("{name}", rawanName)
    },
    {
      id: "rawan",
      senderName: rawanName,
      senderInitial: rawanInitial,
      recipientName: ahmedName,
      message: t("rowanMessage"), // keeping translation key "rowanMessage" but display name is Rawan
      toRecipientStr: t("toRecipient").replace("{name}", ahmedName),
      forRecipientStr: t("forRecipient").replace("{name}", ahmedName)
    }
  ];

  return (
    <section className="section-container" style={{ position: "relative", padding: "8rem 2rem 14rem", overflow: "hidden" }}>
      <Particles />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: "center", marginBottom: "8rem", position: "relative", zIndex: 1 }}
      >
        <h2 style={{ fontSize: "3.5rem", color: "var(--ivory-highlight)", marginBottom: "1.5rem", fontFamily: "var(--font-playfair)" }}>
          {t("wordsFromTheHeart")}
        </h2>
        <div style={{ width: "80px", height: "1px", background: "var(--wine-accent)", margin: "0 auto", opacity: 0.5 }}></div>
      </motion.div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4rem",
        position: "relative",
        zIndex: 1,
        width: "900px",
        maxWidth: "100%",
        margin: "0 auto"
      }}>
        {letters.map((letter, idx) => (
          <LetterCard 
            key={letter.id} 
            {...letter} 
            delay={0.2 + idx * 0.2} 
            onClick={() => setSelectedLetter(letter)} 
          />
        ))}
      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(10, 4, 20, 0.8)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem"
            }}
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                backgroundColor: "#FDFBF7",
                borderRadius: "8px",
                padding: "4rem 3rem",
                boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.2)",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(0,0,0,0.1)",
                cursor: "default"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLetter(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "var(--wine-accent)",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                ✕
              </button>

              <h3 style={{ fontFamily: "var(--font-playfair)", color: "#10071f", margin: "0 0 2rem 0", fontSize: "1.8rem" }}>
                {selectedLetter.toRecipientStr}
              </h3>
              <p style={{
                fontFamily: "var(--font-handwriting)",
                color: "#2C2C2C",
                fontSize: "2.2rem",
                lineHeight: "1.8",
                flex: 1,
                marginBottom: "3rem",
                direction: lang === "ar" ? "rtl" : "ltr"
              }}>
                {selectedLetter.message}
              </p>
              <span style={{ 
                fontFamily: "var(--font-playfair)", 
                color: "var(--wine-accent)", 
                fontSize: "1.5rem", 
                alignSelf: lang === "ar" ? "flex-start" : "flex-end", 
                fontStyle: "italic" 
              }}>
                — {selectedLetter.senderName}
              </span>

              {/* Tap outside to close hint */}
              <div style={{
                position: "absolute",
                bottom: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "var(--ivory-highlight)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                opacity: 0.7,
                letterSpacing: "1px",
                whiteSpace: "nowrap"
              }}>
                {lang === 'ar' ? 'اضغط خارج الرسالة للإغلاق' : 'Tap outside to close'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
