import React from "react";
import { Paper, Flex, Text, Badge, Button } from "@mantine/core";
import { IconWand } from "@tabler/icons-react";
import { theme } from "../theme";

type UpgradeItemProps = {
  name: string;
  description: string;
  level: number;
  cost: number;
  canAfford: boolean;
  onBuy: () => void;
  icon: React.ReactNode;
};

const UpgradeItem: React.FC<UpgradeItemProps> = ({
  name,
  description,
  level,
  cost,
  canAfford,
  onBuy,
  icon,
}) => {
  return (
    <Paper
      p="md"
      mb="md"
      radius="md"
      withBorder
      style={{
        borderColor: canAfford
          ? theme?.colors?.violet?.[5] || "#8e44ad"
          : undefined,
        opacity: canAfford ? 1 : 0.7,
      }}
      aria-labelledby={`${name}-label`}
      aria-describedby={`${name}-desc`}
    >
      <Flex justify="space-between" align="center" mb="xs">
        <Flex align="center" gap="sm">
          {icon}
          <div>
            <Text id={`${name}-label`} fw={700} size="sm">
              {name}
            </Text>
            <Text id={`${name}-desc`} size="xs" c="dimmed">
              {description}
            </Text>
          </div>
        </Flex>
        <Badge
          variant="light"
          color={canAfford ? theme?.colors?.violet?.[5] || "violet" : "gray"}
        >
          Level {level}
        </Badge>
      </Flex>
      <Flex justify="space-between" align="center">
        <Text size="sm" c="dimmed">
          Cost: {cost} essence
        </Text>
        <Button
          size="xs"
          onClick={onBuy}
          disabled={!canAfford}
          variant={canAfford ? "filled" : "subtle"}
          color="violet"
          leftSection={<IconWand size={14} />}
          aria-label={`Buy ${name} upgrade for ${cost} essence`}
          tabIndex={canAfford ? 0 : -1}
        >
          Upgrade
        </Button>
      </Flex>
    </Paper>
  );
};

export default UpgradeItem;
