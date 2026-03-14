import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Particles from "./Particles";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/zen-hero-bg.dim_1600x900.jpg')",
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      {/* Red vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, oklch(0.15 0.08 27 / 0.6) 100%)",
        }}
      />

      {/* Scanlines */}
      <div className="scanline-overlay" />

      {/* Particles Canvas */}
      <Particles />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Japanese subtitle above */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-japanese text-sm tracking-[0.3em] text-primary mb-4 uppercase"
        >
          禅 ・ ス ト ア ・ コ レ ク シ ョ ン
        </motion.p>

        {/* Main Glitch Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative inline-block mb-6"
        >
          <h1
            data-text="ZEN"
            className="glitch-text font-display text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[140px] leading-none tracking-widest text-foreground select-none"
            style={{
              textShadow:
                "0 0 40px oklch(0.50 0.22 27 / 0.6), 0 0 80px oklch(0.50 0.22 27 / 0.3)",
            }}
          >
            ZEN
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-body text-base sm:text-lg md:text-xl tracking-[0.25em] text-muted-foreground mb-10 uppercase"
        >
          Where Style Meets the Soul of Anime
        </motion.p>

        {/* Red divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-24 h-px bg-primary mx-auto mb-10"
          style={{ boxShadow: "0 0 10px oklch(0.50 0.22 27)" }}
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            data-ocid="hero.primary_button"
            className="font-display tracking-widest text-sm px-8 h-12 bg-primary text-primary-foreground hover:bg-zen-red-bright pulse-glow transition-all duration-300"
          >
            <a href="#products">SHOP NOW</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            data-ocid="hero.secondary_button"
            className="font-display tracking-widest text-sm px-8 h-12 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <a href="#about">EXPLORE</a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-display text-xs tracking-widest text-muted-foreground">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
