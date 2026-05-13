"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Timeline() {
  const { scrollYProgress } = useScroll();
  const { t, lang } = useLanguage();
  const timelineEvents = t("timelineEvents");

  return (
    <section className="section-container" style={{ padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Abstract background elements for timeline */}
      <div style={{
        position: "absolute",
        left: "-20%",
        top: "20%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, var(--purple-glow) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "6rem", position: "relative", zIndex: 1 }}
      >
        <h2 style={{ fontSize: "3rem", color: "var(--gold-accent)", marginBottom: "1rem" }}>{t("ourStory")}</h2>
        <div style={{ width: "80px", height: "1px", background: "var(--gold-accent)", margin: "0 auto", opacity: 0.5 }}></div>
      </motion.div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Central glowing animated connector line */}
        <motion.div 
          className="timeline-line"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(to bottom, transparent, var(--gold-accent), var(--gold-accent), transparent)",
            transform: "translateX(-50%)",
            boxShadow: "0 0 15px var(--purple-glow)",
            opacity: 0.5
          }}
        />

        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className="timeline-event-row"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              style={{
                display: "flex",
                justifyContent: isEven ? "flex-start" : "flex-end",
                width: "100%",
                padding: "3rem 0",
                position: "relative"
              }}
            >
              {/* Glowing Timeline Dot */}
              <motion.div 
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "var(--gold-accent)",
                  boxShadow: "0 0 20px var(--purple-glow), 0 0 40px var(--wine-accent)",
                  zIndex: 2,
                }}
              >
                {/* Inner pulse */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "1px solid var(--gold-accent)",
                  }}
                />
              </motion.div>

              {/* Content Card with Cinematic Hover */}
              <motion.div
                className="glass-card timeline-card"
                whileHover={{ y: -5, boxShadow: "0 15px 40px rgba(0,0,0,0.8), 0 0 0 1px var(--wine-accent)" }}
                transition={{ duration: 0.4 }}
                style={{
                  width: "42%",
                  padding: "2.5rem",
                  textAlign: isEven ? (lang === 'ar' ? "left" : "right") : (lang === 'ar' ? "right" : "left"),
                  position: "relative",
                  margin: isEven 
                    ? (lang === 'ar' ? "0 0 0 4rem" : "0 4rem 0 0") 
                    : (lang === 'ar' ? "0 4rem 0 0" : "0 0 0 4rem"),
                  background: "rgba(10, 4, 20, 0.7)",
                  border: "1px solid var(--ivory-highlight)"
                }}
              >
                <motion.span 
                  className="timeline-date"
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--gold-accent)",
                    fontSize: "0.9rem",
                    letterSpacing: "2px",
                    display: "block",
                    marginBottom: "1rem",
                    textTransform: "uppercase"
                  }}
                >
                  {event.date}
                </motion.span>
                <h3 style={{
                  fontSize: "1.8rem",
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}>{event.title}</h3>
                <p style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  fontSize: "1rem"
                }}>{event.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
