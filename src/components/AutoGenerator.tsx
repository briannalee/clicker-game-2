import React from "react";
import { Flex, Divider, rem } from "@mantine/core";
import {
  IconCrystalBall,
  IconCat,
  IconMushroom,
  type IconProps,
  type Icon,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { theme } from "../theme";

type GeneratorType = "brewer" | "familiar" | "mushroom";
type AutoGeneratorProps = {
  brewers: number;
  familiars: number;
  mushrooms: number;
  active: boolean;
};

const AutoGenerator: React.FC<AutoGeneratorProps> = ({
  brewers,
  familiars,
  mushrooms,
  active,
}) => {
  type IconConfig = {
    IconComponent: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<Icon>
    >;
    activeColor: string;
    inactiveColor: string;
  };

  const generatorConfig: Record<GeneratorType, IconConfig> = {
    brewer: {
      IconComponent: IconCrystalBall,
      activeColor: theme?.colors?.teal?.[5] || "#5ecac2",
      inactiveColor: theme?.colors?.teal?.[3] || "#3da18d",
    },
    familiar: {
      IconComponent: IconCat,
      activeColor: theme?.colors?.violet?.[5] || "#8e44ad",
      inactiveColor: theme?.colors?.violet?.[3] || "#9b59b6",
    },
    mushroom: {
      IconComponent: IconMushroom,
      activeColor: theme?.colors?.amber?.[5] || "#ffd42c",
      inactiveColor: theme?.colors?.amber?.[3] || "#ffc800",
    },
  };

  const renderGenerators = (type: GeneratorType, count: number) => {
    const { IconComponent, activeColor, inactiveColor } = generatorConfig[type];

    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={`${type}-${i}`}
        animate={{
          scale: active ? [1, 1.2, 1] : 1,
          opacity: active ? [0.7, 1, 0.7] : 0.7,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: (i * 0.2) % 2,
        }}
        style={{ marginRight: i === count - 1 ? rem(12) : 0 }}
        aria-hidden="true"
      >
        <IconComponent
          size={20}
          color={active ? activeColor : inactiveColor}
          style={{
            filter: active ? `drop-shadow(0 0 3px ${activeColor}80)` : "none",
            transition: "all 0.3s ease",
          }}
        />
      </motion.div>
    ));
  };

  return (
    <Flex wrap="wrap" gap={0} justify="center" my="md" align="center">
      {/* Brewers */}
      {brewers > 0 && renderGenerators("brewer", brewers)}

      {brewers > 0 && familiars > 0 && (
        <Divider
          orientation="vertical"
          mx="sm"
          size="sm"
          color={theme?.colors?.dark?.[3]}
        />
      )}

      {/* Familiars */}
      {familiars > 0 && renderGenerators("familiar", familiars)}

      {familiars > 0 && mushrooms > 0 && (
        <Divider
          orientation="vertical"
          mx="sm"
          size="sm"
          color={theme?.colors?.dark?.[3]}
        />
      )}

      {/* Mushrooms */}
      {mushrooms > 0 && renderGenerators("mushroom", mushrooms)}
    </Flex>
  );
};

export default AutoGenerator;
