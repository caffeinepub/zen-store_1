import { motion } from "motion/react";

const pillars = [
  {
    kanji: "魂",
    title: "Soul",
    desc: "Every design channels the spirit of anime's greatest warriors. We don't make clothes. We craft identity.",
  },
  {
    kanji: "力",
    title: "Power",
    desc: "Premium materials, uncompromising construction. Built to withstand the battles of daily life.",
  },
  {
    kanji: "美",
    title: "Beauty",
    desc: "The intersection of Japanese aesthetic tradition and modern streetwear culture. Timeless yet fierce.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Background atmospheric elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, oklch(0.15 0.06 27 / 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-japanese text-xs tracking-[0.4em] text-primary mb-4 uppercase">
              私たちについて
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-widest text-foreground mb-6 leading-tight">
              NOT A STORE.
              <br />
              <span
                style={{
                  color: "oklch(0.55 0.24 27)",
                  textShadow: "0 0 20px oklch(0.50 0.22 27 / 0.4)",
                }}
              >
                A UNIVERSE.
              </span>
            </h2>

            <div
              className="w-16 h-1 mb-8"
              style={{
                background: "oklch(0.50 0.22 27)",
                boxShadow: "0 0 10px oklch(0.50 0.22 27)",
              }}
            />

            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              ZEN was born from obsession — with anime, with craft, with the
              idea that what you wear tells the world who you are before you
              speak a single word.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed">
              We pull inspiration from the greatest stories ever animated: the
              lone samurai walking into fog, the warrior who bends fire, the
              hero who refuses to fall. Each piece is a tribute. Each thread is
              intentional.
            </p>
          </motion.div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="flex gap-6 items-start p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 group"
              >
                <div
                  className="flex-shrink-0 font-japanese text-4xl font-black leading-none group-hover:text-primary transition-colors duration-300"
                  style={{ color: "oklch(0.50 0.22 27)" }}
                >
                  {pillar.kanji}
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-widest text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
