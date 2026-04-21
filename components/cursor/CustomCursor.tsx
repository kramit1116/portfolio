"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 35, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const prevMouse = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animFrame: number;

    const updateVelocity = () => {
      velRef.current = {
        x: mouseX.get() - prevMouse.current.x,
        y: mouseY.get() - prevMouse.current.y,
      };
      prevMouse.current = { x: mouseX.get(), y: mouseY.get() };
      setVelocity({ ...velRef.current });
      animFrame = requestAnimationFrame(updateVelocity);
    };
    animFrame = requestAnimationFrame(updateVelocity);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-magnetic]")
      ) {
        setIsHovering(true);
      }
    };

    const onElementLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onElementEnter);
    document.addEventListener("mouseout", onElementLeave);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onElementEnter);
      document.removeEventListener("mouseout", onElementLeave);
    };
  }, [mouseX, mouseY]);

  // Velocity-based stretch
  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const stretchX = isHovering ? 1.8 : Math.max(1, 1 + speed * 0.04);
  const stretchY = isHovering ? 1.8 : Math.max(1, 1 - speed * 0.01);
  const scale = isClicking ? 0.7 : isHovering ? 1.6 : 1;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scaleX: stretchX * scale,
          scaleY: stretchY * scale,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white"
          style={{
            boxShadow: isHovering
              ? "0 0 20px rgba(168,85,247,0.9), 0 0 40px rgba(168,85,247,0.5)"
              : "0 0 8px rgba(255,255,255,0.5)",
          }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        ref={trailRef}
        className="custom-cursor fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div
          className="w-8 h-8 rounded-full border"
          style={{
            borderColor: isHovering
              ? "rgba(168,85,247,0.8)"
              : "rgba(255,255,255,0.25)",
            boxShadow: isHovering
              ? "0 0 20px rgba(168,85,247,0.4)"
              : "none",
          }}
        />
      </motion.div>

      {/* Glow aura */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 0.6 : 0.15,
          scale: isHovering ? 3 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
      >
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </>
  );
}
