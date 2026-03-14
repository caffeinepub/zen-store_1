import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function BannerSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/zen-products-bg.dim_1200x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Red scan line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: "oklch(0.50 0.22 27)",
          boxShadow: "0 0 30px oklch(0.50 0.22 27)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="font-japanese text-xs tracking-[0.4em] text-primary mb-4 uppercase">
            伝説に触発された
          </p>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-widest text-foreground mb-2">
            INSPIRED BY
          </h2>
          <h2
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-widest mb-2"
            style={{
              color: "oklch(0.55 0.24 27)",
              textShadow: "0 0 30px oklch(0.50 0.22 27 / 0.5)",
            }}
          >
            LEGENDS.
          </h2>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-widest text-foreground mb-8">
            WORN BY WARRIORS.
          </h2>

          <p className="font-body text-muted-foreground text-base md:text-lg mb-10 max-w-md leading-relaxed">
            Every piece in the ZEN collection is forged from the spirit of
            anime's most iconic warriors. Wear your story. Own your power.
          </p>

          <Button
            size="lg"
            data-ocid="banner.primary_button"
            className="font-display tracking-widest text-sm px-10 h-12 bg-primary hover:bg-zen-red-bright text-primary-foreground group"
          >
            SHOP THE COLLECTION
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Decorative Japanese text — right side */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block select-none pointer-events-none"
      >
        <p
          className="font-japanese text-[120px] font-black leading-none text-foreground"
          style={{ writingMode: "vertical-rl" }}
        >
          戦士
        </p>
      </motion.div>
    </section>
  );
}
