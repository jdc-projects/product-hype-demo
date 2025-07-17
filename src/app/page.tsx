'use client';

import { useState } from 'react';
import { Container, Title, Textarea, Button, Card, Text, Stack, Group, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSparkles, IconSun, IconMoon } from '@tabler/icons-react';

const generateHype = (input: string): string[] => {
  const buzzwords = [
    'revolutionary', 'disruptive', 'game-changing', 'paradigm-shifting', 'cutting-edge',
    'innovative', 'scalable', 'cloud-native', 'AI-powered', 'blockchain-enabled',
    'next-generation', 'enterprise-grade', 'world-class', 'industry-leading',
    'groundbreaking', 'transformative', 'synergistic', 'omnichannel',
    'hyper-personalized', 'frictionless', 'seamless', 'intuitive',
    'data-driven', 'algorithm-optimized', 'machine-learning-enhanced'
  ];

  const phrases = [
    'leverages cutting-edge technology',
    'disrupts traditional workflows',
    'empowers digital transformation',
    'delivers unprecedented value',
    'optimizes operational efficiency',
    'enhances user experience',
    'accelerates time-to-market',
    'maximizes ROI potential',
    'streamlines complex processes',
    'enables scalable growth',
    'provides actionable insights',
    'facilitates seamless integration',
    'drives innovation at scale',
    'transforms business outcomes'
  ];

  const suffixes = [
    'at enterprise scale',
    'with zero downtime',
    'using proprietary algorithms',
    'through advanced analytics',
    'via intelligent automation',
    'with real-time processing',
    'leveraging big data insights',
    'powered by machine learning',
    'optimized for performance',
    'designed for the future'
  ];

  const generateVariation = () => {
    const randomBuzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `Our ${randomBuzzword} ${input} ${randomPhrase} ${randomSuffix}.`;
  };

  return [generateVariation(), generateVariation(), generateVariation()];
};

export default function Home() {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      const hypeVersions = generateHype(input.trim());
      setOutputs(hypeVersions);
      setLoading(false);
    }, 800);
  };

  return (
    <Container size="md" py="xl" style={{ position: 'relative' }}>
      <ActionIcon
        onClick={toggleColorScheme}
        size="lg"
        variant="subtle"
        style={{ position: 'absolute', top: 16, right: 16 }}
      >
        {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
      </ActionIcon>
      
      <Stack gap="lg">
        <div style={{ textAlign: 'center' }}>
          <Title order={1} size="h1" mb="md">
            <Group justify="center" gap="xs">
              <IconSparkles size={32} />
              Product Hype Generator
            </Group>
          </Title>
          <Text size="lg" c="dimmed">
            Transform your product ideas into Silicon Valley gold
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Textarea
              label="Enter your product description"
              placeholder="e.g., A simple note-taking app"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              minRows={3}
              maxRows={6}
            />
            <Button
              onClick={handleGenerate}
              loading={loading}
              disabled={!input.trim()}
              leftSection={<IconSparkles size={16} />}
            >
              Generate Hype
            </Button>
          </Stack>
        </Card>

        {outputs.length > 0 && (
          <Stack gap="md">
            <Title order={3}>Hyped Versions:</Title>
            {outputs.map((output, index) => (
              <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
                <Text size="sm">{output}</Text>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
