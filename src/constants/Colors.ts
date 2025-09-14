export const Colors: { [key: string]: colorScheme } = {
  light: {
    text: '#000',
    textSecondary: '#fff',
    background: '#f0f0f0',
    primary: '#14CBC5',
    inputBG: '#FFF',
    gradientFrom: '#0A6562',
    gradientTo: '#14CBC5',
    borderColor: '#56565680',
    borderWidth: 1,
  },
  dark: {
    text: '#FFF',
    textSecondary: '#000',
    background: '#171717',
    primary: '#14CBC5',
    inputBG: '#000',
    gradientFrom: '#0A6562',
    gradientTo: '#14CBC5',
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
};

export type colorScheme = {
  text: string;
  textSecondary: string;
  background: string;
  primary: string;
  inputBG: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  borderWidth: number;
};
