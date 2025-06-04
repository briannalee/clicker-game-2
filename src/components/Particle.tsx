import { motion } from "framer-motion";
import { rem } from "@mantine/core";
import React from "react";

export type ParticleProps = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const Particle: React.FC<ParticleProps> = ({ x, y, color }) => {
  return (
    <motion.div
      initial={{ opacity: 1, x, y }}
      animate={{
        opacity: 0,
        y: y - 60,
        x: x + (Math.random() * 40 - 20),
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: rem(6),
        height: rem(6),
        borderRadius: "50%",
        background: color,
        pointerEvents: "none",
        zIndex: 10,
      }}
      aria-hidden="true"
    />
  );
};

export default Particle;
