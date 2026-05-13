"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnvelopeExperience({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1500); // Wait for exit animation
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "var(--bg-dark)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Ambient cinematic glow behind envelope */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "60vmin",
              height: "60vmin",
              background: "radial-gradient(circle, var(--purple-glow) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(50px)",
              zIndex: 0,
            }}
          />

          <div style={{ position: "relative", zIndex: 1, perspective: "1000px" }}>
            {/* The Envelope */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                width: "400px",
                height: "260px",
                backgroundColor: "var(--envelope-bg)",
                position: "relative",
                borderRadius: "8px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px var(--purple-glow)",
                cursor: isOpen ? "default" : "pointer",
                transformStyle: "preserve-3d",
              }}
              onClick={!isOpen ? handleOpen : undefined}
            >
              {/* Envelope Flap (Top) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 4 }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "140px",
                  backgroundColor: "var(--envelope-bg)",
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  transformOrigin: "top",
                  borderTop: "1px solid var(--purple-glow)",
                  boxShadow: isOpen ? "none" : "0 5px 10px rgba(0,0,0,0.3)",
                }}
              >
                {/* Gold Seal */}
                <motion.div
                  animate={{ opacity: isOpen ? 0 : 1, zIndex: isOpen ? 3 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    bottom: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--wine-accent)",
                    borderRadius: "50%",
                    boxShadow: "0 2px 10px var(--purple-glow)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "var(--bg-dark)",
                    fontFamily: "var(--font-playfair)",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  A
                </motion.div>
              </motion.div>

              {/* Envelope Body (Bottom overlap) */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "var(--envelope-bg)",
                  clipPath: "polygon(0 100%, 50% 40%, 100% 100%, 100% 0, 0 0)",
                  borderBottom: "1px solid var(--purple-glow)",
                  zIndex: 3,
                  pointerEvents: "none"
                }}
              >
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, width: "100%", height: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                }} />
              </div>

              {/* The Inner Card sliding out */}
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: isOpen ? -180 : 0,
                  opacity: isOpen ? 1 : 0,
                  zIndex: isOpen ? 3 : 1
                }}
                transition={{ duration: 1.2, delay: isOpen ? 0.6 : 0, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "5%",
                  width: "90%",
                  height: "360px",
                  backgroundColor: "#FDFBF7", // Soft Ivory
                  borderRadius: "8px",
                  boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  textAlign: "center",
                  pointerEvents: isOpen ? "auto" : "none",
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "10px", left: "10px", right: "10px", bottom: "10px",
                  border: "1px solid var(--wine-accent)",
                  borderRadius: "4px",
                  pointerEvents: "none"
                }} />

                <h1 style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "2.5rem",
                  color: "#10071f",
                  margin: "1rem 0 0.5rem"
                }}>
                  Ahmed <span style={{ display: "block", color: "var(--gold-accent)", fontStyle: "italic", fontSize: "1.8rem" }}>&</span> Rawan
                </h1>

                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  color: "#150a2b",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginTop: "0.5rem"
                }}>
                  July 29, 2026
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  style={{
                    marginTop: "auto",
                    padding: "0.8rem 2rem",
                    backgroundColor: "#10071f",
                    color: "var(--gold-accent)",
                    border: "none",
                    borderRadius: "30px",
                    fontFamily: "var(--font-inter)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                  }}
                >
                  Enter Our Story
                </motion.button>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
