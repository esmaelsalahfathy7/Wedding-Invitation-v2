"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Timeline() {
  const { t, lang } = useLanguage();
  const timelineEvents = t("timelineEvents");
  const [isMobile, setIsMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992); // Use 992px breakpoint for robust double column to single column stacking
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Map the 5 story steps to our 4 core public images
  const eventImages = [
    "/far-look.png",   // First Meeting
    "/far-look.png",   // First Date (continued look)
    "/engagment.png",  // Engagement Day
    "/love-sign.png",  // Ring Ceremony
    "/marriage.png"    // Wedding Day
  ];

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section 
      className="section-container" 
      style={{ 
        padding: "8rem 2rem 10rem", 
        position: "relative", 
        overflow: "hidden",
        backgroundColor: "var(--bg-darker)"
      }}
    >
      {/* Background ambient decorative glows */}
      <div style={{
        position: "absolute",
        left: "-15%",
        top: "20%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(138, 43, 226, 0.12) 0%, transparent 70%)",
        filter: "blur(80px)",
        borderRadius: "50%",
        zIndex: 0,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        right: "-15%",
        bottom: "15%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)",
        filter: "blur(80px)",
        borderRadius: "50%",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "6rem", position: "relative", zIndex: 10 }}
      >
        <h2 style={{ fontSize: "3rem", color: "var(--gold-accent)", marginBottom: "1rem", fontFamily: "var(--font-playfair)" }}>
          {t("ourStory")}
        </h2>
        <div style={{ width: "80px", height: "1px", background: "var(--gold-accent)", margin: "0 auto", opacity: 0.5 }}></div>
      </motion.div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Central glowing vertical timeline connector line */}
        {!isMobile && (
          <motion.div 
            style={{
              position: "absolute",
              left: "50%",
              top: "2rem",
              bottom: "2rem",
              width: "2px",
              background: "linear-gradient(to bottom, rgba(197, 160, 89, 0.1), var(--gold-accent), var(--gold-accent), rgba(197, 160, 89, 0.1))",
              transform: "translateX(-50%)",
              boxShadow: "0 0 15px var(--purple-glow)",
              opacity: 0.6
            }}
          />
        )}

        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          const imageSrc = eventImages[index];
          const hasError = imageErrors[index];

          // Swap text/image layout side according to LTR/RTL and Even/Odd state
          const textFirst = lang === "ar" ? !isEven : isEven;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: isMobile ? "2rem 0" : "4rem 0",
                position: "relative",
                gap: isMobile ? "1.5rem" : "0px"
              }}
            >
              {/* Timeline Center Node - Desktop Only */}
              {!isMobile && (
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "var(--gold-accent)",
                    boxShadow: "0 0 15px var(--gold-accent), 0 0 30px var(--wine-accent)",
                    zIndex: 10,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "1px solid var(--gold-accent)",
                    }}
                  />
                </motion.div>
              )}

              {/* Column A: Left side (Text or Image depending on alternating layout) */}
              <div 
                style={{ 
                  width: isMobile ? "100%" : "45%", 
                  order: isMobile ? 1 : (textFirst ? 1 : 2),
                  display: "flex",
                  justifyContent: isMobile ? "center" : (textFirst ? "flex-end" : "flex-start")
                }}
              >
                {textFirst ? (
                  // Text Card Component
                  <motion.div
                    initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="glass-card"
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      padding: "2.5rem",
                      background: "rgba(21, 10, 43, 0.65)",
                      border: "1px solid var(--ivory-highlight)",
                      textAlign: lang === "ar" ? "right" : "left",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.7)"
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: "var(--font-cairo)",
                        color: "var(--gold-accent)",
                        fontSize: "0.85rem",
                        letterSpacing: "1px",
                        display: "block",
                        marginBottom: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase"
                      }}
                    >
                      {event.date}
                    </span>
                    <h3 style={{
                      fontSize: "1.8rem",
                      color: "var(--text-primary)",
                      marginBottom: "1rem",
                      fontFamily: "var(--font-playfair)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontSize: "0.95rem"
                    }}>
                      {event.description}
                    </p>
                  </motion.div>
                ) : (
                  // Image Frame Component
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      aspectRatio: "16/10",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid rgba(253, 251, 247, 0.08)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
                      position: "relative",
                      backgroundColor: "var(--bg-dark)"
                    }}
                  >
                    {hasError ? (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, var(--bg-dark) 0%, var(--wine-accent) 100%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "var(--gold-accent)",
                        fontSize: "2rem"
                      }}>
                        ❦
                      </div>
                    ) : (
                      <motion.img
                        src={imageSrc}
                        alt={event.title}
                        loading="lazy"
                        onError={() => handleImageError(index)}
                        whileInView={{ scale: [1.02, 1.08, 1.02] }}
                        viewport={{ once: true }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    )}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(10, 4, 20, 0.5) 0%, transparent 40%)",
                      pointerEvents: "none"
                    }} />
                  </motion.div>
                )}
              </div>

              {/* Column B: Right side (Text or Image depending on alternating layout) */}
              <div 
                style={{ 
                  width: isMobile ? "100%" : "45%", 
                  order: isMobile ? 2 : (textFirst ? 2 : 1),
                  display: "flex",
                  justifyContent: isMobile ? "center" : (textFirst ? "flex-start" : "flex-end")
                }}
              >
                {!textFirst ? (
                  // Text Card Component
                  <motion.div
                    initial={{ opacity: 0, x: lang === "ar" ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="glass-card"
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      padding: "2.5rem",
                      background: "rgba(21, 10, 43, 0.65)",
                      border: "1px solid var(--ivory-highlight)",
                      textAlign: lang === "ar" ? "right" : "left",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.7)"
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: "var(--font-cairo)",
                        color: "var(--gold-accent)",
                        fontSize: "0.85rem",
                        letterSpacing: "1px",
                        display: "block",
                        marginBottom: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase"
                      }}
                    >
                      {event.date}
                    </span>
                    <h3 style={{
                      fontSize: "1.8rem",
                      color: "var(--text-primary)",
                      marginBottom: "1rem",
                      fontFamily: "var(--font-playfair)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontSize: "0.95rem"
                    }}>
                      {event.description}
                    </p>
                  </motion.div>
                ) : (
                  // Image Frame Component
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      aspectRatio: "16/10",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid rgba(253, 251, 247, 0.08)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
                      position: "relative",
                      backgroundColor: "var(--bg-dark)"
                    }}
                  >
                    {hasError ? (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, var(--bg-dark) 0%, var(--wine-accent) 100%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "var(--gold-accent)",
                        fontSize: "2rem"
                      }}>
                        ❦
                      </div>
                    ) : (
                      <motion.img
                        src={imageSrc}
                        alt={event.title}
                        loading="lazy"
                        onError={() => handleImageError(index)}
                        whileInView={{ scale: [1.02, 1.08, 1.02] }}
                        viewport={{ once: true }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    )}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(10, 4, 20, 0.5) 0%, transparent 40%)",
                      pointerEvents: "none"
                    }} />
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
