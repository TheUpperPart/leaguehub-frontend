interface Theme {
  bg: string;
  'bg-100': string;
  'bg-80': string;
  'bg-75': string;
  'bg-70': string;
  'bg-60': string;
  'bg-40': string;
  text: string;
  green: string;
  white: string;
  gray: string;
}

interface Themes {
  light: Theme;
  dark: Theme;
}

const themes: Themes = {
  light: {
    bg: '#FFFFFF',
    'bg-100': '#ffffff',
    'bg-80': '#f1f1f1',
    'bg-75': '#ffffff',
    'bg-70': '#ffffff',
    'bg-60': '#d9d9d9',
    'bg-40': '#ffffff',
    text: '#000000',
    green: '#31b65b',
    white: '#ffffff',
    gray: '#aaaaaa',
  },

  dark: {
    bg: '#0A0A0A',
    'bg-100': '#1b1c1d',
    'bg-80': '#202123',
    'bg-75': '#252628',
    'bg-70': '#3a3c3e',
    'bg-60': '#303133',
    'bg-40': '#404244',
    text: '#FFFFFF',
    green: '#31b65b',
    white: '#ffffff',
    gray: '#aaaaaa',
  },
};

export default themes;
