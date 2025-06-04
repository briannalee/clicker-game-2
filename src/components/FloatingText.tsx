import { motion } from "framer-motion";
import { rem } from "@mantine/core";
import React from "react";
import { theme } from "../theme";

export type FloatingTextProps = {
  id: number;
  value: number;
  x: number;
  y: number;
};

const FloatingText: React.FC<FloatingTextProps> = ({ id, value, x, y }) => (
  <motion.div
    key={id}
    initial={{
      opacity: 1,
      scale: 0.8,
      x: x - 100,
      y: y + 80,
    }}
    animate={{
      opacity: 0,
      scale: 1.2,
      y: y - 80,
      x: x + (Math.random() * 40 - 20) - 100,
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{
      position: "absolute",
      color: theme?.colors?.amber?.[5] || "#ffd42c",
      fontWeight: "bold",
      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      pointerEvents: "none",
      fontSize: rem(20),
      zIndex: 100,
      width: "45px",
      textAlign: "center",
    }}
    aria-hidden="true"
  >
    +{value}
  </motion.div>
);

export default FloatingText;
