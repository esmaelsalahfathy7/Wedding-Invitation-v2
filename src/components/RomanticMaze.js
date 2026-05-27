"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const MAZE_GRID = [
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0],
];

const ROWS = MAZE_GRID.length;
const COLS = MAZE_GRID[0].length;

export default function RomanticMaze() {
  const { t } = useLanguage();
  const [position, setPosition] = useState({ r: 0, c: 0 });
  const [trail, setTrail] = useState(["0,0"]);
  const [success, setSuccess] = useState(false);
  const [hearts, setHearts] = useState([]);

  const move = (dr, dc) => {
    if (success) return;
    const newR = position.r + dr;
    const newC = position.c + dc;

    if (newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS) {
      if (MAZE_GRID[newR][newC] === 0) {
        setPosition({ r: newR, c: newC });
        setTrail((prev) => {
          const key = `${newR},${newC}`;
          if (!prev.includes(key)) return [...prev, key];
          return prev;
        });

        if (newR === ROWS - 1 && newC === COLS - 1) {
          setSuccess(true);
          // Generate 15 distinct drifting hearts with custom physics metrics
          const particles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 160,
            y: (Math.random() - 0.7) * 160 - 50,
            scale: Math.random() * 0.7 + 0.6,
            delay: Math.random() * 0.45,
            rotation: (Math.random() - 0.5) * 60
          }));
          setHearts(particles);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp": move(-1, 0); break;
        case "ArrowDown": move(1, 0); break;
        case "ArrowLeft": move(0, -1); break;
        case "ArrowRight": move(0, 1); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position, success]);

  return (
    <section className="section-container" style={{ padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 1 }}
      >
        <h2 style={{ fontSize: "2.5rem", color: "var(--wine-accent)", marginBottom: "1rem", fontFamily: "var(--font-playfair)" }}>
          {t("mazeTitle")}
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontFamily: "var(--font-inter)" }}>
          {t("mazeDescription")}
        </p>
        <div style={{ width: "60px", height: "1px", background: "var(--wine-accent)", margin: "0 auto", opacity: 0.5 }}></div>
      </motion.div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1,
        position: "relative"
      }}>
        {/* Maze Board */}
        <div style={{
          background: "rgba(21, 10, 43, 0.4)",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          borderRadius: "16px",
          border: "1px solid var(--ivory-highlight)",
          boxShadow: success ? "0 0 40px var(--purple-glow)" : "0 10px 30px rgba(0,0,0,0.5)",
          transition: "box-shadow 1s ease"
        }}>
          <div style={{
            display: "grid",
            gridTemplateRows: `repeat(${ROWS}, 40px)`,
            gridTemplateColumns: `repeat(${COLS}, 40px)`,
            gap: "4px"
          }}>
            {MAZE_GRID.map((row, r) =>
              row.map((cell, c) => {
                const isWall = cell === 1;
                const isTrail = trail.includes(`${r},${c}`);
                const isGroom = position.r === r && position.c === c;
                const isBride = r === ROWS - 1 && c === COLS - 1;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "6px",
                      backgroundColor: isWall ? "var(--wine-accent)" : isTrail ? "rgba(138, 43, 226, 0.15)" : "rgba(253, 251, 247, 0.03)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      transition: "background-color 0.3s ease"
                    }}
                  >
                    {isGroom && !success && (
                      <motion.img
                        layoutId="groom"
                        src="/groom_avatar_1778631847811.png"
                        alt="Groom"
                        style={{ width: "80%", height: "80%", borderRadius: "50%", zIndex: 10 }}
                      />
                    )}
                    {isBride && !success && (
                      <img
                        src="/bride_avatar_1778632003040.png"
                        alt="Bride"
                        style={{ width: "80%", height: "80%", borderRadius: "50%" }}
                      />
                    )}
                    {success && isGroom && isBride && (
                      <div style={{ position: "absolute", zIndex: 20, width: "120%", height: "120%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {/* Merged Avatars */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 150, damping: 12 }}
                          style={{ width: "100%", height: "100%", display: "flex", gap: "2px", zIndex: 20, position: "relative" }}
                        >
                          <img src="/groom_avatar_1778631847811.png" alt="Groom" style={{ width: "50%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                          <img src="/bride_avatar_1778632003040.png" alt="Bride" style={{ width: "50%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                        </motion.div>

                        {/* Gold Glow Ring Pulse Effect */}
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            width: "140%",
                            height: "140%",
                            border: "2px solid var(--gold-accent)",
                            borderRadius: "50%",
                            boxShadow: "0 0 20px var(--gold-accent)",
                            zIndex: 10,
                            pointerEvents: "none"
                          }}
                        />

                        {/* Heart Particle Burst */}
                        {hearts.map((heart) => (
                          <motion.span
                            key={heart.id}
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                            animate={{
                              opacity: [0, 1, 1, 0],
                              scale: heart.scale,
                              x: heart.x,
                              y: heart.y,
                              rotate: heart.rotation
                            }}
                            transition={{
                              duration: 1.8,
                              ease: "easeOut",
                              delay: heart.delay
                            }}
                            style={{
                              position: "absolute",
                              fontSize: "1.4rem",
                              zIndex: 30,
                              pointerEvents: "none"
                            }}
                          >
                            ❤️
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ marginTop: "2rem", color: "var(--gold-accent)", fontSize: "1.5rem", fontFamily: "var(--font-playfair)", textShadow: "0 0 10px var(--purple-glow)", textAlign: "center" }}
          >
            {t("mazeSuccessDesc")}
          </motion.div>
        )}

        {/* Controls */}
        {!success && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 50px)", gap: "10px", marginTop: "2rem" }}>
            <div />
            <button onClick={() => move(-1, 0)} style={btnStyle}>↑</button>
            <div />
            <button onClick={() => move(0, -1)} style={btnStyle}>←</button>
            <button onClick={() => move(1, 0)} style={btnStyle}>↓</button>
            <button onClick={() => move(0, 1)} style={btnStyle}>→</button>
          </div>
        )}
      </div>
    </section>
  );
}

const btnStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "transparent",
  border: "1px solid var(--wine-accent)",
  color: "var(--text-primary)",
  fontSize: "1.2rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(253, 251, 247, 0.05)"
};
