"use client";

import { useEffect, useRef } from "react";

interface RippleCanvasProps {
  mousePosition: { x: number; y: number };
}

export default function RippleCanvas({ mousePosition }: RippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<
    {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
    }[]
  >([]);
  const animRef = useRef<number>(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(168,85,247,", "rgba(59,130,246,", "rgba(6,182,212,"];

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        const color = colors[Math.floor(Math.random() * colors.length)];
        ripples.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          opacity: 0.6,
          color,
        });
        if (ripples.current.length > 12) {
          ripples.current.shift();
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current = ripples.current.filter((r) => r.opacity > 0.01);

      for (const ripple of ripples.current) {
        ripple.radius += 2.5;
        ripple.opacity *= 0.94;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${ripple.color}${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, ripple.radius
        );
        gradient.addColorStop(0, `${ripple.color}${ripple.opacity * 0.2})`);
        gradient.addColorStop(1, `${ripple.color}0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9996]"
      style={{ opacity: 0.8 }}
    />
  );
}
