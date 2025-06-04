import { motion } from "framer-motion";
import { Badge, rem } from "@mantine/core";
import { IconWand } from "@tabler/icons-react";
import Particle, {type ParticleProps} from "./Particle";

type CauldronProps = {
  onClick: (e: React.MouseEvent) => void;
  power: number;
  particles: ParticleProps[];
};

const Cauldron: React.FC<CauldronProps> = ({ onClick, power, particles }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      // Simulate click on keyboard interaction
      const fakeEvent = {
        currentTarget: e.currentTarget,
        clientX:
          (e.currentTarget as HTMLElement).getBoundingClientRect().left +
          (e.currentTarget as HTMLElement).offsetWidth / 2,
        clientY:
          (e.currentTarget as HTMLElement).getBoundingClientRect().top +
          (e.currentTarget as HTMLElement).offsetHeight / 2,
      } as unknown as React.MouseEvent;
      onClick(fakeEvent);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        width: rem(200),
        height: rem(220),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      tabIndex={0}
      role="button"
      aria-label={`Click to brew magic essence. Current power: ${power} per click`}
    >
      {/* Main container for cauldron image and effects */}
      <div style={{ position: "relative", width: rem(200), height: rem(200) }}>
        {/* Cauldron Image */}
        <img
          src="cauldron.png"
          alt="Magic cauldron"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 0 8px rgba(138, 100, 200, 0.7))",
            zIndex: 1,
          }}
        />

        {/* Animated potion glow (beneath the image) */}
        <motion.div
          style={{
            position: "absolute",
            bottom: rem(-10),
            left: "20%",
            transform: "translateX(-50%)",
            width: rem(120),
            height: rem(60),
            borderRadius: "50%",
            background: "linear-gradient(135deg, #9370c8, #7d5ab9)",
            filter: "blur(8px)",
            opacity: 0.7,
            zIndex: 0,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        {/* Bubbles */}
        <motion.div
          style={{
            position: "absolute",
            bottom: rem(110),
            left: "40%",
            width: rem(15),
            height: rem(15),
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            zIndex: 6,
          }}
          animate={{
            y: [0, -30, -40],
            opacity: [0.7, 0.9, 0],
            scale: [0.8, 1, 1.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          aria-hidden="true"
        />

        <motion.div
          style={{
            position: "absolute",
            bottom: rem(120),
            left: "55%",
            width: rem(10),
            height: rem(10),
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            zIndex: 6,
          }}
          animate={{
            y: [0, -30],
            opacity: [0.7, 0],
            scale: [0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.8,
            delay: 0.5,
          }}
          aria-hidden="true"
        />

        <motion.div
          style={{
            position: "absolute",
            bottom: rem(135),
            left: "65%",
            width: rem(12),
            height: rem(12),
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            zIndex: 6,
          }}
          animate={{
            y: [0, -25],
            opacity: [0.7, 0],
            scale: [0.7, 1.1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 1.2,
            delay: 0.2,
          }}
          aria-hidden="true"
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            x={particle.x}
            y={particle.y}
            color={particle.color}
            id={particle.id}
          />
        ))}
      </div>

      {/* Cauldron power indicator */}
      <div style={{ marginTop: rem(10) }}>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: "violet", to: "purple" }}
          aria-label={`Current power: ${power} essence per click`}
        >
          <IconWand size={14} style={{ marginRight: 5 }} /> Power: {power}
        </Badge>
      </div>
    </motion.div>
  );
};

export default Cauldron;
