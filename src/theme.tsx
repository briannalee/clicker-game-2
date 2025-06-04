import { createTheme, type MantineColorsTuple } from '@mantine/core';

const violetColors: MantineColorsTuple = [
  '#f3e8ff',
  '#e4d0ff',
  '#d0b7f1',
  '#bc9ee4',
  '#a785d6',
  '#9370c8', 
  '#7d5ab9',
  '#6745ab',
  '#52329d',
  '#3d1e8f'
];

const tealColors: MantineColorsTuple = [
  '#e0f5f5',
  '#c0ebe9',
  '#9fe0dc',
  '#7ed5cf',
  '#5ecac2',
  '#3ebfb5',
  '#2eaa9f',
  '#1e9589',
  '#0e8073',
  '#006a5e'
];

const amberColors: MantineColorsTuple = [
  '#fff8e0',
  '#ffefb3',
  '#ffe686',
  '#ffdd59',
  '#ffd42c',
  '#ffc800',
  '#d4a800',
  '#a98700',
  '#7d6600',
  '#524400'
];

// Theme for the witchy aesthetic
export const theme = createTheme({
  primaryColor: 'violet',
  colors: {
    // Main theme colors
    violet: violetColors,
    teal: tealColors,
    amber: amberColors
  },
  fontFamily: "'Montserrat', sans-serif",
  fontFamilyMonospace: "'Courier New', monospace",
  headings: { fontFamily: "serif" },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: () => ({
        root: {
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
          },
        },
      }),
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
      },
      styles: () => ({
        root: {
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      }),
    },
  },
});