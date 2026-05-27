"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  const { t, lang } = useLanguage();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Parallax mapping for subtle vertical depth inside the frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setMousePos({ x: offsetX, y: offsetY });
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Determine dynamic vertical clip-path segments and parameters
  const numPanels = isMobile ? 2 : 4;
  const panels = Array.from({ length: numPanels }, (_, index) => {
    const isEven = index % 2 === 0;
    const initialY = isEven ? -40 : 40;

    const segmentWidth = 100 / numPanels;
    const startX = index * segmentWidth;
    const endX = startX + segmentWidth;
    const clipPath = `polygon(${startX}% 0%, ${endX}% 0%, ${endX}% 100%, ${startX}% 100%)`;

    return {
      index,
      clipPath,
      initialY,
      isEven
    };
  });

  return (
    <section
      ref={containerRef}
      className="section-container"
      style={{
        padding: "0 2rem 8rem",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg-darker)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {/* 1. Visual Timeline Connector line leading into the memory moment */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "6rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1
        }}
      >
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: "100%", opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: "2px",
            background: "linear-gradient(to bottom, var(--gold-accent) 40%, var(--gold-accent), transparent 95%)",
            boxShadow: "0 0 10px var(--purple-glow)",
          }}
        />

        {/* Glowing connector node/dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: "0",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "var(--gold-accent)",
            boxShadow: "0 0 15px var(--gold-accent), 0 0 30px var(--wine-accent)",
            zIndex: 2
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: "center", marginTop: "2rem", marginBottom: "4rem", position: "relative", zIndex: 1 }}
      >
        <h2 style={{ fontSize: "2.8rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          {lang === 'ar' ? 'لحظة خاصة' : 'A Highlight Moment'}
        </h2>
        <p style={{ fontFamily: "var(--font-inter)", color: "var(--text-secondary)", fontSize: "0.95rem", letterSpacing: "2px", textTransform: "uppercase" }}>
          {t("galleryTitle")}
        </p>
      </motion.div>

      {/* 2. The Cinematic Frame Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={isMobile ? {} : {
          scale: 1.03,
          borderColor: "rgba(197, 160, 89, 0.5)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.95), 0 0 30px rgba(138, 43, 226, 0.3)"
        }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          height: "clamp(355px, 90vh, 540px)", // Cleared user's trailing semicolon
          borderRadius: "16px",
          border: "1px solid rgba(253, 251, 247, 0.08)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.85)",
          overflow: "hidden",
          backgroundColor: "var(--bg-dark)",
          zIndex: 3,
          cursor: "default"
        }}
      >
        {/* Soft Vignette Overlay for framing depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle, rgba(10, 4, 20, 0.15) 0%, rgba(10, 4, 20, 0.85) 100%), linear-gradient(to top, rgba(10, 4, 20, 0.9), transparent 45%)",
            pointerEvents: "none",
            zIndex: 3
          }}
        />

        {/* Subtle Film Grain Noise Texture Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#ffffff",
            opacity: 0.015,
            backgroundImage: `radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%)`,
            backgroundSize: "4px 4px",
            backgroundPosition: "0 0, 2px 2px",
            zIndex: 4,
            pointerEvents: "none"
          }}
        />

        {/* Dynamic Split Reveal Panels Container */}
        <div
          style={{
            width: "100%",
            height: "120%", // Extra height for vertical scroll parallax
            position: "absolute",
            top: "-10%",
            left: 0
          }}
        >
          {panels.map((panel) => {
            // odd panels shift up, even panels shift down on hover (stereoscopic parallax)
            const hoverOffset = panel.isEven ? -6 : 6;

            return (
              <motion.div
                key={panel.index}
                initial={{ opacity: 0, y: panel.initialY, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                animate={isHovered ? {
                  y: hoverOffset + mousePos.y,
                  x: mousePos.x,
                  filter: "brightness(1.06)"
                } : {
                  y: 0,
                  x: 0,
                  filter: "brightness(0.9)"
                }}
                transition={
                  isHovered
                    ? { duration: 0.8, ease: [0.25, 1, 0.5, 1] } // fluid hover response
                    : {
                      delay: panel.index * (isMobile ? 0.25 : 0.2),
                      duration: 1.5,
                      ease: [0.25, 1, 0.5, 1]
                    } // cinematic scroll-in stagger
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: panel.clipPath,
                  WebkitClipPath: panel.clipPath,
                  width: "100%",
                  height: "100%",
                  zIndex: 2
                }}
              >
                {imageError ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, var(--bg-dark) 0%, var(--wine-accent) 100%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2rem",
                      textAlign: "center"
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ fontSize: "2.5rem", color: "var(--gold-accent)", marginBottom: "1rem" }}
                    >
                      ❤️
                    </motion.div>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "1px" }}>
                      {lang === 'ar' ? 'رحلة حب تنبض بالجمال' : 'A Journey of Unending Love'}
                    </p>
                  </div>
                ) : (
                  <motion.img
                    src="/our_story.png"
                    alt={t("galleryTitle")}
                    loading="lazy"
                    onError={() => setImageError(true)}
                    animate={{
                      scale: isHovered ? 1.05 : 1.02,
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      y: yParallax
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Film Poster Title Block (Subtle romantic highlight - synchronized delay) */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            width: "80%",
            zIndex: 5,
            pointerEvents: "none"
          }}
        >
          <motion.h4
            initial={{ opacity: 0, y: 15 }}
            whileInView={{
              opacity: isHovered ? 1.0 : 0.8,
              y: 0,
              textShadow: isHovered
                ? "0 0 25px rgba(253, 251, 247, 0.65), 0 2px 10px rgba(0,0,0,0.9)"
                : "0 0 15px rgba(197, 160, 89, 0.45), 0 2px 10px rgba(0,0,0,0.9)"
            }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
              color: "var(--text-primary)",
              fontWeight: 400,
              letterSpacing: lang === 'ar' ? "1px" : "3px",
              lineHeight: "1.2",
              transition: "opacity 0.4s ease, text-shadow 0.4s ease"
            }}
          >
            {lang === 'ar' ? 'رحلة حب تنبض بالجمال' : 'A Journey of Unending Love'}
          </motion.h4>
        </div>
      </motion.div>
    </section>
  );
}
