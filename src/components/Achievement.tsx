import React from "react";
import { Paper, Flex, Text, rem } from "@mantine/core";
import { theme } from "../theme";

type AchievementProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  unlocked: boolean;
};

export type AchievementType = {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  threshold?: number;
};

const Achievement: React.FC<AchievementProps> = ({
  icon,
  title,
  description,
  unlocked,
}) => {
  return (
    <Paper
      p="sm"
      radius="md"
      withBorder
      mb="xs"
      style={{
        opacity: unlocked ? 1 : 0.6,
        borderColor: unlocked
          ? theme?.colors?.amber?.[5] || "#ffd42c"
          : undefined,
      }}
      aria-labelledby={`${title}-achievement-label`}
      aria-describedby={`${title}-achievement-desc`}
      aria-hidden={!unlocked}
    >
      <Flex align="center" gap="sm">
        <div
          style={{
            width: rem(40),
            height: rem(40),
            borderRadius: "50%",
            background: unlocked
              ? "linear-gradient(45deg, #ffd42c, #ffc800)"
              : "#2c2c2c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: unlocked ? "0 0 10px rgba(255, 216, 89, 0.5)" : "none",
          }}
        >
          {icon}
        </div>
        <div>
          <Text id={`${title}-achievement-label`} fw={700} size="sm">
            {title}
          </Text>
          <Text id={`${title}-achievement-desc`} size="xs" c="dimmed">
            {description}
          </Text>
        </div>
      </Flex>
    </Paper>
  );
};

export default Achievement;
