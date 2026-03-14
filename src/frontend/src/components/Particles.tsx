import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: "spark" | "ember" | "line";
  angle: number;
  length: number;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticle = (): Particle => {
      const type =
        Math.random() < 0.6 ? "spark" : Math.random() < 0.7 ? "ember" : "line";
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 2 + 0.5),
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        type,
        angle: Math.random() * Math.PI * 2,
        length: Math.random() * 20 + 10,
      };
    };

    const drawParticle = (p: Particle) => {
      const progress = p.life / p.maxLife;
      const alpha = p.opacity * (1 - progress);

      if (p.type === "spark") {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 20, 20, ${alpha})`;
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 8;
        ctx.fill();
      } else if (p.type === "ember") {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 0, ${alpha * 0.7})`;
        ctx.shadowColor = "#ff4400";
        ctx.shadowBlur = 6;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
          p.x + Math.cos(p.angle) * p.length,
          p.y + Math.sin(p.angle) * p.length,
        );
        ctx.strokeStyle = `rgba(200, 0, 0, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 4;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.3) {
        particles.push(createParticle());
      }

      particles = particles.filter((p) => p.life < p.maxLife);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.angle += 0.02;
        drawParticle(p);
      }

      animationId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
