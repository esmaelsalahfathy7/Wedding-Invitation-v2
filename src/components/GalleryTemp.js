"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function GalleryTemp() {
  const { lang } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [isStackHovered, setIsStackHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 4 provided wedding images with custom Arabic and English details for the card back
  const cardsData = [
    {
      src: "/far-look.png",
      date: lang === "ar" ? "١٢ أغسطس ٢٠٢٢" : "August 12, 2022",
      title: lang === "ar" ? "اللقاء الأول" : "First Sight",
      desc: lang === "ar" ? "أدركت حينها أن قلبي قد وجد موطنه الآمن." : "A quiet recognition of a soul I’d known before.",
      rotation: -5,
      xOffset: -30,
      yOffset: 0
    },
    {
      src: "/engagment.png", // Corrected spelling typo!
      date: lang === "ar" ? "٢٥ ديسمبر ٢٠٢٤" : "December 25, 2024",
      title: lang === "ar" ? "يوم خطبتنا" : "Our Engagement",
      desc: lang === "ar" ? "وعد قطعناه وتوجناه بدموع الفرح والود المتبادل." : "A sacred promise made, sealed with tears of deep joy.",
      rotation: 3,
      xOffset: -10,
      yOffset: -15
    },
    {
      src: "/love-sign.png",
      date: lang === "ar" ? "١٤ فبراير ٢٠٢٥" : "February 14, 2025",
      title: lang === "ar" ? "عقد القران" : "Ring Ceremony",
      desc: lang === "ar" ? "تبادلنا الخواتم كرمز لالتزامنا وحبنا الأبدي تحت سقف من الحب." : "Surrounded by loved ones, we exchanged rings of devotion.",
      rotation: -2,
      xOffset: 10,
      yOffset: 10
    },
    {
      src: "/marriage.png",
      date: lang === "ar" ? "٢٩ يونيو ٢٠٢٦" : "Wedding Day",
      title: lang === "ar" ? "يوم الزفاف" : "Wedding Milestone",
      desc: lang === "ar" ? "اليوم الذي يصبح فيه طريقان رحلة واحدة سعيدة مدى العمر." : "The beautiful day two paths merge into one lifelong journey.",
      rotation: 6,
      xOffset: 30,
      yOffset: -5
    }
  ];

  const handleCardClick = (index) => {
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      setFlippedCard(index);
    }
  };

  return (
    <section
      className="section-container"
      style={{
        padding: "6rem 2rem 8rem",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg-darker)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Glow highlight */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "5rem", position: "relative", zIndex: 10 }}
      >
        <h2
          style={{
            fontSize: "2.8rem",
            color: "var(--text-primary)",
            marginBottom: "1rem",
            fontFamily: "var(--font-playfair)"
          }}
        >
          {lang === "ar" ? "ألبوم ذكرياتنا" : "Our Visual Album"}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-cairo)",
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            letterSpacing: lang === "ar" ? "0px" : "2px",
            textTransform: "uppercase"
          }}
        >
          {lang === "ar" ? "اضغط على البطاقة لتقلبها وتكتشف حكايتها" : "Tap or hover a card to flip and reveal the story"}
        </p>
        <div style={{ width: "60px", height: "1px", background: "var(--gold-accent)", margin: "1.5rem auto 0", opacity: 0.5 }}></div>
      </motion.div>

      {/* Responsive layout container */}
      <div
        onMouseEnter={() => !isMobile && setIsStackHovered(true)}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsStackHovered(false);
            setHoveredCard(null);
            setFlippedCard(null);
          }
        }}
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : "850px",
          height: isMobile ? "auto" : "480px",
          position: "relative",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "2.5rem" : "0px",
          perspective: "1200px"
        }}
      >
        {cardsData.map((card, index) => {
          const isFlipped = flippedCard === index;
          const isHovered = hoveredCard === index;

          // Desktop: calculations for the spreading layout when the stack is hovered
          // Spread cards horizontally when stack is hovered
          let xTransform = card.xOffset;
          let yTransform = card.yOffset;
          let rotateTransform = card.rotation;
          let scaleTransform = 1;
          let zIndexValue = 10 - index;

          if (!isMobile && isStackHovered) {
            const spreadIndex = index - 1.5; // Centers around 0
            xTransform = spreadIndex * 200; // Spreads them side by side
            yTransform = isHovered ? -25 : 0;
            rotateTransform = isHovered ? 0 : card.rotation * 0.4;
            scaleTransform = isHovered ? 1.05 : 0.95;
            zIndexValue = isHovered ? 50 : 20;
          }

          if (isFlipped) {
            zIndexValue = 100; // Bring flipped card to absolute front
          }

          return (
            <motion.div
              key={index}
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              onClick={() => handleCardClick(index)}
              animate={
                isMobile
                  ? { scale: isFlipped ? 1.02 : 1 }
                  : {
                      x: xTransform,
                      y: yTransform,
                      rotate: rotateTransform,
                      scale: scaleTransform,
                      zIndex: zIndexValue
                    }
              }
              transition={{
                type: "spring",
                stiffness: 75,
                damping: 14,
                mass: 0.8
              }}
              style={{
                position: isMobile ? "relative" : "absolute",
                width: "260px",
                height: "360px",
                cursor: "pointer",
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Inner container to hold 3D Flip */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  borderRadius: "16px",
                  boxShadow: isFlipped
                    ? "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(197, 160, 89, 0.35)"
                    : isHovered
                    ? "0 20px 45px rgba(0, 0, 0, 0.8), 0 0 15px rgba(138, 43, 226, 0.2)"
                    : "0 10px 30px rgba(0, 0, 0, 0.65)"
                }}
              >
                {/* 3D FRONT OF THE CARD */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "2px solid rgba(253, 251, 247, 0.08)",
                    backgroundColor: "var(--bg-dark)"
                  }}
                >
                  <motion.img
                    src={card.src}
                    alt={card.title}
                    loading="lazy"
                    animate={{
                      scale: isHovered && !isFlipped ? 1.1 : 1.02
                    }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  {/* Subtle Elegant Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(10, 4, 20, 0.75) 0%, transparent 45%)",
                      pointerEvents: "none"
                    }}
                  />
                  {/* Small card label on front */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.2rem",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                      pointerEvents: "none"
                    }}
                  >
                    {card.title}
                  </div>
                </div>

                {/* 3D BACK OF THE CARD */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "16px",
                    border: "2px solid var(--gold-accent)",
                    backgroundColor: "var(--dark-charcoal)",
                    background: "radial-gradient(circle at center, #1b0f2e 0%, var(--bg-darker) 100%)",
                    padding: "2rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    overflow: "hidden"
                  }}
                >
                  {/* Decorative Borders */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      bottom: "10px",
                      left: "10px",
                      right: "10px",
                      border: "1px dashed rgba(197, 160, 89, 0.25)",
                      borderRadius: "12px",
                      pointerEvents: "none"
                    }}
                  />

                  {/* Header Date */}
                  <span
                    style={{
                      fontFamily: "var(--font-cairo)",
                      color: "var(--gold-accent)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      zIndex: 2
                    }}
                  >
                    {card.date}
                  </span>

                  {/* Title & Desc */}
                  <div style={{ zIndex: 2, margin: "1rem 0" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                        marginBottom: "0.75rem",
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-cairo)",
                        fontSize: "0.88rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        padding: "0 0.5rem"
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>

                  {/* Decorative Pulsing Heart */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      color: "var(--gold-accent)",
                      fontSize: "1.5rem",
                      zIndex: 2
                    }}
                  >
                    ❦
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
