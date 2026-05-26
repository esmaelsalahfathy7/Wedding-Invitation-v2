"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function WelcomeSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-container" style={{ position: "relative", padding: "8rem 2rem 4rem" }}>
      {/* Background ambient glow specific to welcome section */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, var(--purple-glow) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Elegant floating floral corners */}
          <motion.div
            style={{ position: "absolute", top: "-3rem", left: "-3rem", pointerEvents: "none", zIndex: 10 }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              filter: ["drop-shadow(0 0 5px rgba(92, 37, 51, 0.3))", "drop-shadow(0 0 15px rgba(92, 37, 51, 0.8))", "drop-shadow(0 0 5px rgba(92, 37, 51, 0.3))"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 Q40,10 60,60 T100,100" stroke="var(--gold-accent)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M20,5 Q30,-5 40,5 Q30,15 20,5" fill="var(--gold-accent)" opacity="0.6" />
              <path d="M40,25 Q55,15 65,35 Q50,45 40,25" fill="var(--gold-accent)" opacity="0.5" />
              <path d="M10,30 Q15,45 30,40 Q25,25 10,30" fill="var(--ivory-highlight)" opacity="0.4" />
              <path d="M60,60 Q80,55 90,75 Q70,80 60,60" fill="var(--ivory-highlight)" opacity="0.5" />
              <path d="M45,75 Q50,90 65,85 Q60,70 45,75" fill="var(--gold-accent)" opacity="0.6" />
              <circle cx="35" cy="15" r="2.5" fill="var(--gold-accent)" opacity="0.8" />
              <circle cx="65" cy="50" r="2" fill="var(--ivory-highlight)" opacity="0.7" />
              <circle cx="20" cy="50" r="3" fill="var(--wine-accent)" opacity="0.9" />
            </svg>
          </motion.div>

          <motion.div
            style={{ position: "absolute", bottom: "-3rem", right: "-3rem", pointerEvents: "none", zIndex: 10, transform: "rotate(180deg)" }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
              filter: ["drop-shadow(0 0 5px rgba(92, 37, 51, 0.3))", "drop-shadow(0 0 15px rgba(92, 37, 51, 0.8))", "drop-shadow(0 0 5px rgba(92, 37, 51, 0.3))"]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
              <path d="M0,0 Q40,10 60,60 T100,100" stroke="var(--gold-accent)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M20,5 Q30,-5 40,5 Q30,15 20,5" fill="var(--gold-accent)" opacity="0.6" />
              <path d="M40,25 Q55,15 65,35 Q50,45 40,25" fill="var(--gold-accent)" opacity="0.5" />
              <path d="M10,30 Q15,45 30,40 Q25,25 10,30" fill="var(--ivory-highlight)" opacity="0.4" />
              <path d="M60,60 Q80,55 90,75 Q70,80 60,60" fill="var(--ivory-highlight)" opacity="0.5" />
              <path d="M45,75 Q50,90 65,85 Q60,70 45,75" fill="var(--gold-accent)" opacity="0.6" />
              <circle cx="35" cy="15" r="2.5" fill="var(--gold-accent)" opacity="0.8" />
              <circle cx="65" cy="50" r="2" fill="var(--ivory-highlight)" opacity="0.7" />
              <circle cx="20" cy="50" r="3" fill="var(--wine-accent)" opacity="0.9" />
            </svg>
          </motion.div>


          <motion.h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "4rem",
            color: "var(--gold-accent)",
            lineHeight: 1.2,
            marginBottom: "1rem",
            textShadow: "0 0 20px rgba(253, 251, 247, 0.1)"
          }}>
            {lang === 'ar' ? (
              <>
                <span style={{ fontSize: "5rem", fontStyle: "italic" }}>أحمد</span> <br />
                <span style={{ fontSize: "3rem", fontStyle: "italic" }}>&</span> <br />
                <span style={{ fontSize: "5rem", fontStyle: "italic" }}>روان</span>
              </>
            ) : (
              <>
                Ahmed <br /> <span style={{ color: "var(--gold-accent)", fontStyle: "italic" }}>&</span> <br /> Rawan
              </>
            )}
          </motion.h1>

          <div style={{
            width: "2px",
            height: "60px",
            background: "linear-gradient(to bottom, var(--gold-accent), transparent)",
            margin: "2rem auto",
            opacity: 0.7
          }} />

          <motion.p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "2rem"
          }}>
            {t("date")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              padding: "2rem",
              background: "rgba(21, 10, 43, 0.4)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              border: "1px solid var(--wine-accent)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          >
            <p style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              fontStyle: "italic"
            }}>
              {t("welcomeTitle")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
