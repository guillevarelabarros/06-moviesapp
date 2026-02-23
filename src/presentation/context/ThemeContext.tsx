import { createContext, ReactNode, useContext } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#000000',
  subtext: '#555555',
  mutedText: '#888888',
  border: '#eeeeee',
  tabBar: '#ffffff',
  input: '#f2f2f2',
  inputText: '#000000',
  inputPlaceholder: '#999999',
  skeletonBg: '#dddddd',
  genreBg: '#e8e8e8',
  genreText: '#333333',
  castName: '#222222',
  castCharacter: '#888888',
  sectionTitle: '#000000',
};

export const darkColors: typeof lightColors = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#f0f0f0',
  subtext: '#aaaaaa',
  mutedText: '#777777',
  border: '#2a2a2a',
  tabBar: '#1a1a1a',
  input: '#2a2a2a',
  inputText: '#f0f0f0',
  inputPlaceholder: '#666666',
  skeletonBg: '#2a2a2a',
  genreBg: '#2e2e2e',
  genreText: '#cccccc',
  castName: '#e0e0e0',
  castCharacter: '#888888',
  sectionTitle: '#f0f0f0',
};

interface ThemeContextType {
  isDark: boolean;
  colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextType>( {
  isDark: false,
  colors: lightColors,
} );

export const useTheme = () => useContext( ThemeContext );

export const ThemeProvider = ( { children }: { children: ReactNode } ) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <ThemeContext.Provider value={ { isDark, colors: isDark ? darkColors : lightColors } }>
      { children }
    </ThemeContext.Provider>
  );
};
