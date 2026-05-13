"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const images = [
  { src: "/wedding_gallery_1_1778343636423.png", altKey: "galleryBrideGroom" },
  { src: "/wedding_gallery_2_1778343654312.png", altKey: "galleryRings" },
  { src: "/wedding_gallery_3_1778343666261.png", altKey: "galleryTable" },
  { src: "/wedding_gallery_4_1778343697176.png", altKey: "galleryDance" }
];

export default function Gallery() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-container" style={{ padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: "center", marginBottom: "6rem", position: "relative", zIndex: 1 }}
      >
        <h2 style={{ fontSize: "3rem", color: "var(--gold-accent)", marginBottom: "1rem" }}>{t("galleryTitle")}</h2>
        <div style={{ width: "80px", height: "1px", background: "var(--gold-accent)", margin: "0 auto", opacity: 0.5 }}></div>
      </motion.div>

      {/* Cinematic Staggered Layout */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1
      }}>
        {images.map((image, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              style={{
                display: "flex",
                justifyContent: isEven ? (lang === 'ar' ? "flex-end" : "flex-start") : (lang === 'ar' ? "flex-start" : "flex-end"),
                width: "100%",
                padding: "0 2rem",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: index === 0 || index === 3 ? "800px" : "600px",
                  aspectRatio: index === 0 || index === 3 ? "16/9" : "3/4",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 0 1px var(--ivory-highlight)",
                  backgroundColor: "var(--bg-darker)"
                }}
              >
                <motion.img
                  src={image.src}
                  alt={t(image.altKey)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(16, 7, 31, 0.9), transparent 50%)",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "3rem"
                }}>
                  <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "2rem",
                      color: "var(--text-primary)",
                      fontWeight: 400,
                      textShadow: "0 2px 10px rgba(0,0,0,0.8)"
                    }}
                  >
                    {t(image.altKey)}
                  </motion.h4>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
