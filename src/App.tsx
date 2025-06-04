import React, { useState, useEffect, useCallback } from "react";
import {
  AppShell,
  Container,
  Flex,
  Text,
  Button,
  Card,
  Group,
  Progress,
  Stack,
  Title,
  Paper,
  rem,
  Drawer,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCrystalBall,
  IconWand,
  IconStar,
  IconMoon,
  IconSun,
  IconCat,
  IconMushroom,
  IconInfoCircle,
  IconTrophy,
  IconBook,
  IconMoodSmile,
} from "@tabler/icons-react";
import "@mantine/core/styles.css";
import { theme } from "./theme";
import { type ParticleProps } from "./components/Particle";
import FloatingText, {
  type FloatingTextProps,
} from "./components/FloatingText";
import UpgradeItem from "./components/UpgradeItem";
import Cauldron from "./components/Cauldron";
import Achievement, { type AchievementType } from "./components/Achievement";
import AutoGenerator from "./components/AutoGenerator";

// Main app component
const App: React.FC = () => {
  // Game state
  const [essence, setEssence] = useState<number>(0);
  const [clickPower, setClickPower] = useState<number>(1);
  const [autoBrewers, setAutoBrewers] = useState<number>(0);
  const [clickUpgradeCost, setClickUpgradeCost] = useState<number>(10);
  const [autoBrewerCost, setAutoBrewerCost] = useState<number>(50);
  const [familiars, setFamiliars] = useState<number>(0);
  const [familiarCost, setFamiliarCost] = useState<number>(200);
  const [mushrooms, setMushrooms] = useState<number>(0);
  const [mushroomCost, setMushroomCost] = useState<number>(1000);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [autoActive, setAutoActive] = useState<boolean>(false);
  const [totalEarned, setTotalEarned] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"upgrades" | "achievements">(
    "upgrades"
  );
  const [showInfo, { toggle: toggleInfo }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextProps[]>([]);

  // Achievements
  const [achievements, setAchievements] = useState<AchievementType[]>([
    {
      id: 1,
      title: "First Steps",
      description: "Collect 100 essence",
      unlocked: false,
      threshold: 100,
    },
    {
      id: 2,
      title: "Apprentice",
      description: "Purchase your first upgrade",
      unlocked: false,
    },
    {
      id: 3,
      title: "Automation",
      description: "Buy an auto-brewer",
      unlocked: false,
    },
    {
      id: 4,
      title: "Familiar Bond",
      description: "Acquire a familiar",
      unlocked: false,
    },
    {
      id: 5,
      title: "Forest Magic",
      description: "Grow magical mushrooms",
      unlocked: false,
    },
    {
      id: 6,
      title: "Adept",
      description: "Collect 1,000 essence",
      unlocked: false,
      threshold: 1000,
    },
    {
      id: 7,
      title: "Master",
      description: "Collect 10,000 essence",
      unlocked: false,
      threshold: 10000,
    },
  ]);

  // Handle click on cauldron
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Get click position relative to the cauldron
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update essence
      const newEssence = clickPower;
      setEssence((prev) => prev + newEssence);
      setTotalEarned((prev) => prev + newEssence);

      // Create particles
      const newParticles: ParticleProps[] = [];
      for (let i = 0; i < 5; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: x + (Math.random() * 20 - 10),
          y: y + (Math.random() * 20 - 10),
          color: `hsla(${270 + Math.random() * 60}, 80%, 70%, 0.8)`,
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      // Create floating text
      const newText = {
        id: Date.now(),
        value: clickPower,
        x: x + (Math.random() * 20 - 10),
        y: y + (Math.random() * 20 - 10),
      };
      setFloatingTexts((prev) => [...prev, newText]);

      // Clear particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticles[0].id));
      }, 1000);

      // Clear floating text after animation
      setTimeout(() => {
        setFloatingTexts((prev) =>
          prev.filter((text) => text.id !== newText.id)
        );
      }, 800);
    },
    [clickPower]
  );

  // Auto-generators effect
  useEffect(() => {
    if (autoBrewers === 0 && familiars === 0 && mushrooms === 0) return;

    const interval = setInterval(() => {
      const autoValue = autoBrewers + familiars * 5 + mushrooms * 25;
      setEssence((prev) => prev + autoValue);
      setTotalEarned((prev) => prev + autoValue);
      setAutoActive(true);

      setTimeout(() => setAutoActive(false), 500);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoBrewers, familiars, mushrooms]);

  // Check achievements
  useEffect(() => {
    const newAchievements = [...achievements];
    let updated = false;

    // Check essence thresholds
    newAchievements.forEach((achievement) => {
      if (
        !achievement.unlocked &&
        achievement.threshold &&
        totalEarned >= achievement.threshold
      ) {
        achievement.unlocked = true;
        updated = true;
      }
    });

    // Check specific achievements
    if (!newAchievements[1].unlocked && clickPower > 1) {
      newAchievements[1].unlocked = true;
      updated = true;
    }

    if (!newAchievements[2].unlocked && autoBrewers > 0) {
      newAchievements[2].unlocked = true;
      updated = true;
    }

    if (!newAchievements[3].unlocked && familiars > 0) {
      newAchievements[3].unlocked = true;
      updated = true;
    }

    if (!newAchievements[4].unlocked && mushrooms > 0) {
      newAchievements[4].unlocked = true;
      updated = true;
    }

    if (updated) {
      setAchievements(newAchievements);
    }
  }, [
    achievements,
    totalEarned,
    clickPower,
    autoBrewers,
    familiars,
    mushrooms,
  ]);

  // Upgrade handlers
  const buyClickUpgrade = useCallback(() => {
    if (essence >= clickUpgradeCost) {
      setEssence((prev) => prev - clickUpgradeCost);
      setClickPower((prev) => prev + 1);
      setClickUpgradeCost((prev) => Math.floor(prev * 1.5));
    }
  }, [essence, clickUpgradeCost]);

  const buyAutoBrewer = useCallback(() => {
    if (essence >= autoBrewerCost) {
      setEssence((prev) => prev - autoBrewerCost);
      setAutoBrewers((prev) => prev + 1);
      setAutoBrewerCost((prev) => Math.floor(prev * 1.8));
    }
  }, [essence, autoBrewerCost]);

  const buyFamiliar = useCallback(() => {
    if (essence >= familiarCost) {
      setEssence((prev) => prev - familiarCost);
      setFamiliars((prev) => prev + 1);
      setFamiliarCost((prev) => Math.floor(prev * 2.2));
    }
  }, [essence, familiarCost]);

  const buyMushroom = useCallback(() => {
    if (essence >= mushroomCost) {
      setEssence((prev) => prev - mushroomCost);
      setMushrooms((prev) => prev + 1);
      setMushroomCost((prev) => Math.floor(prev * 2.5));
    }
  }, [essence, mushroomCost]);

  // Format numbers with suffixes for display
  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
  };

  // Calculate essence per second
  const essencePerSecond = autoBrewers + familiars * 5 + mushrooms * 25;

  // Render the app
  return (
    <AppShell
      styles={{
        main: {
          background:
            colorScheme === "dark"
              ? `linear-gradient(135deg, ${
                  theme?.colors?.violet ? [5] : "#00000"
                }, #1f1433)`
              : `linear-gradient(135deg, ${
                  theme?.colors?.violet ? [1] : "#ffffff"
                }, ${theme?.colors?.teal ? [1] : "#ffffff"})`,
          minHeight: "100vh",
        },
      }}
    >
      <Container size="lg" py="md">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="lg">
          <Title
            order={1}
            style={{
              fontFamily: "sans-serif",
              background: "linear-gradient(45deg, #bc9ee4, #5ecac2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            aria-label="Mystic Brew - Magical Clicker Game"
          >
            Mystic Brew
          </Title>
          <Group>
            <ActionIcon
              variant="subtle"
              onClick={() =>
                setColorScheme(colorScheme === "dark" ? "light" : "dark")
              }
              size="lg"
              aria-label={`Toggle ${
                colorScheme === "dark" ? "light" : "dark"
              } mode`}
            >
              {colorScheme === "dark" ? (
                <IconSun size={20} />
              ) : (
                <IconMoon size={20} />
              )}
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              onClick={toggleInfo}
              size="lg"
              aria-label="Open game information"
            >
              <IconInfoCircle size={20} />
            </ActionIcon>
          </Group>
        </Flex>

        {/* Main content */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap="xl"
          align="stretch"
        >
          {/* Left column: Game area */}
          <Flex
            direction="column"
            w={{ base: "100%", md: "60%" }}
            align="center"
          >
            {/* Resource display */}
            <Card
              mb="md"
              p="md"
              radius="md"
              style={{ width: "100%" }}
              bg={
                colorScheme === "dark"
                  ? theme?.colors?.violet?.[5] || "rgba(0,0,0,0.2)"
                  : theme?.colors?.violet?.[1] || "rgba(255,255,255,0.8)"
              }
              withBorder
              aria-live="polite"
              aria-atomic="true"
            >
              <Flex justify="space-between" align="center">
                <div>
                  <Text
                    size="md"
                    c={
                      colorScheme === "dark"
                        ? theme?.colors?.violet?.[1]
                          ? theme.colors.violet[1]
                          : "dimmed"
                        : theme?.colors?.violet?.[5]
                        ? theme.colors.violet[5]
                        : "dimmed"
                    }
                    fw={700}
                  >
                    Magic Essence
                  </Text>
                  <motion.div
                    key={essence}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text
                      size="xl"
                      fw={900}
                      style={{
                        background: `linear-gradient(45deg, ${
                          colorScheme === "dark"
                            ? theme?.colors?.violet?.[1] ?? "#e4d0ff"
                            : theme?.colors?.violet?.[5] ?? "#9370c8"
                        }, ${
                          theme?.colors?.teal?.[
                            colorScheme === "dark" ? 5 : 3
                          ] ?? "#5ecac2"
                        })`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: rem(28),
                        letterSpacing: rem(0.5),
                        display: "inline-block",
                        lineHeight: 1.2,
                        padding: "0 2px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      {formatNumber(essence)}
                    </Text>
                  </motion.div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Text
                    size="md"
                    c={
                      colorScheme === "dark"
                        ? theme?.colors?.violet?.[1]
                          ? theme.colors.violet[1]
                          : "dimmed"
                        : theme?.colors?.violet?.[5]
                        ? theme.colors.violet[5]
                        : "dimmed"
                    }
                  >
                    Per Second
                  </Text>
                  <Text
                    size="xl"
                    fw={600}
                    style={{
                      background: `linear-gradient(45deg, ${
                        colorScheme === "dark"
                          ? theme?.colors?.violet?.[1] ?? "#e4d0ff"
                          : theme?.colors?.violet?.[5] ?? "#9370c8"
                      }, ${
                        theme?.colors?.teal?.[colorScheme === "dark" ? 5 : 3] ??
                        "#5ecac2"
                      })`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: rem(20),
                      letterSpacing: rem(0.5),
                      display: "inline-block",
                      lineHeight: 1.2,
                      padding: "0 2px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {formatNumber(essencePerSecond)}
                  </Text>
                </div>
              </Flex>
            </Card>

            {/* Cauldron */}
            <Cauldron
              onClick={handleClick}
              power={clickPower}
              particles={particles}
            />
            {floatingTexts.map((text) => (
              <FloatingText key={text.id} {...text} />
            ))}
            {/* Auto generators visualization */}
            {essencePerSecond > 0 && (
              <Card
                mt="md"
                p="md"
                radius="md"
                style={{ width: "100%" }}
                bg={
                  colorScheme === "dark"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.8)"
                }
                withBorder
                aria-label="Automatic generators information"
              >
                <Text size="sm" c="dimmed" mb="xs" ta="center">
                  Automatic Generators
                </Text>
                {autoBrewers > 0 && (
                  <Flex align="center" mb="xs">
                    <IconCrystalBall
                      size={18}
                      style={{
                        marginRight: 5,
                        color: theme?.colors?.teal?.[5] || "#5ecac2",
                      }}
                    />
                    <Text size="sm">
                      Auto-Brewers: {autoBrewers} ({autoBrewers}/sec)
                    </Text>
                  </Flex>
                )}
                {familiars > 0 && (
                  <Flex align="center" mb="xs">
                    <IconCat
                      size={18}
                      style={{
                        marginRight: 5,
                        color: theme?.colors?.violet?.[5] || "#8e44ad",
                      }}
                    />
                    <Text size="sm">
                      Familiars: {familiars} ({familiars * 5}/sec)
                    </Text>
                  </Flex>
                )}
                {mushrooms > 0 && (
                  <Flex align="center" mb="xs">
                    <IconMushroom
                      size={18}
                      style={{
                        marginRight: 5,
                        color: theme?.colors?.amber?.[5] || "#ffd42c",
                      }}
                    />
                    <Text size="sm">
                      Magic Mushrooms: {mushrooms} ({mushrooms * 25}/sec)
                    </Text>
                  </Flex>
                )}
                <AutoGenerator
                  brewers={autoBrewers}
                  familiars={familiars}
                  mushrooms={mushrooms}
                  active={autoActive}
                />
              </Card>
            )}
          </Flex>

          {/* Right column: Upgrades and stats */}
          <Card
            w={{ base: "100%", md: "40%" }}
            mt={{ base: "md", md: 0 }}
            p="md"
            radius="lg"
            bg={
              colorScheme === "dark"
                ? "rgba(0,0,0,0.2)"
                : "rgba(255,255,255,0.8)"
            }
            withBorder
            aria-label="Upgrades and achievements section"
          >
            <Flex mb="md">
              <Button.Group style={{ width: "100%" }}>
                <Button
                  variant={activeTab === "upgrades" ? "filled" : "subtle"}
                  onClick={() => setActiveTab("upgrades")}
                  color="violet"
                  leftSection={<IconWand size={16} />}
                  styles={(theme) => ({
                    root: {
                      flex: 1,
                      transition: "all 0.2s ease",
                      background:
                        activeTab === "upgrades"
                          ? theme.colors.violet[5]
                          : undefined,
                    },
                    label: {
                      color:
                        activeTab === "upgrades"
                          ? theme.white
                          : colorScheme === "dark"
                          ? theme.colors.violet[2]
                          : theme.colors.violet[7],
                    },
                  })}
                  aria-label="Show upgrades"
                  aria-current={activeTab === "upgrades" ? "page" : undefined}
                >
                  Upgrades
                </Button>
                <Button
                  variant={activeTab === "achievements" ? "filled" : "subtle"}
                  onClick={() => setActiveTab("achievements")}
                  style={{
                    flex: 1,
                    background:
                      activeTab === "achievements"
                        ? theme?.colors?.teal?.[5]
                        : undefined,
                  }}
                  color="teal"
                  leftSection={<IconTrophy size={16} />}
                  aria-label="Show achievements"
                  aria-current={
                    activeTab === "achievements" ? "page" : undefined
                  }
                  styles={{
                    root: {
                      transition: "all 0.2s ease",
                    },
                    label: {
                      color:
                        activeTab === "achievements"
                          ? theme?.colors?.gray?.[0]
                          : theme?.colors?.teal?.[7],
                    },
                  }}
                >
                  Achievements
                </Button>
              </Button.Group>
            </Flex>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "upgrades" ? (
                  <Stack>
                    <UpgradeItem
                      name="Magic Wand"
                      description="Increases essence per click"
                      level={clickPower}
                      cost={clickUpgradeCost}
                      canAfford={essence >= clickUpgradeCost}
                      onBuy={buyClickUpgrade}
                      icon={
                        <IconWand
                          size={20}
                          style={{
                            color: theme?.colors?.violet?.[5] || "#8e44ad",
                          }}
                        />
                      }
                    />

                    <UpgradeItem
                      name="Auto-Brewer"
                      description="Generates 1 essence per second"
                      level={autoBrewers}
                      cost={autoBrewerCost}
                      canAfford={essence >= autoBrewerCost}
                      onBuy={buyAutoBrewer}
                      icon={
                        <IconCrystalBall
                          size={20}
                          style={{
                            color: theme?.colors?.teal?.[5] || "#5ecac2",
                          }}
                        />
                      }
                    />

                    <UpgradeItem
                      name="Familiar"
                      description="Generates 5 essence per second"
                      level={familiars}
                      cost={familiarCost}
                      canAfford={essence >= familiarCost}
                      onBuy={buyFamiliar}
                      icon={
                        <IconCat
                          size={20}
                          style={{
                            color: theme?.colors?.violet?.[5] || "#8e44ad",
                          }}
                        />
                      }
                    />

                    <UpgradeItem
                      name="Magic Mushroom"
                      description="Generates 25 essence per second"
                      level={mushrooms}
                      cost={mushroomCost}
                      canAfford={essence >= mushroomCost}
                      onBuy={buyMushroom}
                      icon={
                        <IconMushroom
                          size={20}
                          style={{
                            color: theme?.colors?.amber?.[5] || "#ffd42c",
                          }}
                        />
                      }
                    />
                  </Stack>
                ) : (
                  <Stack>
                    <div>
                      <Text size="sm" ta="right" c="dimmed" mb="xs">
                        {achievements.filter((a) => a.unlocked).length}/
                        {achievements.length} Unlocked
                      </Text>
                      <Progress
                        value={
                          (achievements.filter((a) => a.unlocked).length /
                            achievements.length) *
                          100
                        }
                        color="violet"
                        size="sm"
                        radius="xl"
                        mb="md"
                        aria-label={`Achievement progress: ${
                          achievements.filter((a) => a.unlocked).length
                        } out of ${achievements.length} unlocked`}
                      />

                      {achievements.map((achievement) => (
                        <Achievement
                          key={achievement.id}
                          icon={
                            achievement.id === 1 ? (
                              <IconStar
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            ) : achievement.id === 2 ? (
                              <IconWand
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            ) : achievement.id === 3 ? (
                              <IconCrystalBall
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            ) : achievement.id === 4 ? (
                              <IconCat
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            ) : achievement.id === 5 ? (
                              <IconMushroom
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            ) : achievement.id === 6 ? (
                              <IconBook
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            ) : (
                              <IconMoodSmile
                                size={20}
                                color={achievement.unlocked ? "#000" : "#666"}
                              />
                            )
                          }
                          title={achievement.title}
                          description={achievement.description}
                          unlocked={achievement.unlocked}
                        />
                      ))}
                    </div>
                  </Stack>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </Flex>
      </Container>

      {/* Info drawer */}
      <Drawer
        opened={showInfo}
        onClose={toggleInfo}
        title="About Mystic Brew"
        position="right"
        size="md"
        aria-label="Game information"
      >
        <Text mb="md">
          Welcome to Mystic Brew, a magical clicker game where you harness the
          power of witchcraft to brew magical essence!
        </Text>

        <Title order={4} mb="xs">
          How to Play
        </Title>
        <Text mb="md">
          Click on the cauldron to brew magical essence. Spend your essence on
          upgrades to increase your brewing power and unlock automatic
          generators.
        </Text>

        <Title order={4} mb="xs">
          Upgrades
        </Title>
        <Stack mb="lg">
          <Paper p="sm" withBorder>
            <Flex align="center" gap="sm">
              <IconWand
                size={20}
                style={{ color: theme?.colors?.violet?.[5] || "#8e44ad" }}
              />
              <div>
                <Text fw={600} size="sm">
                  Magic Wand
                </Text>
                <Text size="xs" c="dimmed">
                  Increases your click power, giving you more essence per click.
                </Text>
              </div>
            </Flex>
          </Paper>

          <Paper p="sm" withBorder>
            <Flex align="center" gap="sm">
              <IconCrystalBall
                size={20}
                style={{ color: theme?.colors?.teal?.[5] || "#5ecac2" }}
              />
              <div>
                <Text fw={600} size="sm">
                  Auto-Brewer
                </Text>
                <Text size="xs" c="dimmed">
                  Automatically generates 1 essence per second.
                </Text>
              </div>
            </Flex>
          </Paper>

          <Paper p="sm" withBorder>
            <Flex align="center" gap="sm">
              <IconCat
                size={20}
                style={{ color: theme?.colors?.violet?.[5] || "#8e44ad" }}
              />
              <div>
                <Text fw={600} size="sm">
                  Familiar
                </Text>
                <Text size="xs" c="dimmed">
                  A magical companion that generates 5 essence per second.
                </Text>
              </div>
            </Flex>
          </Paper>

          <Paper p="sm" withBorder>
            <Flex align="center" gap="sm">
              <IconMushroom
                size={20}
                style={{ color: theme?.colors?.amber?.[5] || "#ffd42c" }}
              />
              <div>
                <Text fw={600} size="sm">
                  Magic Mushroom
                </Text>
                <Text size="xs" c="dimmed">
                  A potent ingredient that generates 25 essence per second.
                </Text>
              </div>
            </Flex>
          </Paper>
        </Stack>

        <Text c="dimmed" size="sm" style={{ fontStyle: "italic" }}>
          Keep brewing, unlock achievements, and become the most powerful witch
          in the realm!
        </Text>
      </Drawer>
    </AppShell>
  );
};

export default App;
