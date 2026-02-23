import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Navigation } from './presentation/navigation/Navigation';
import { FavoritesContext } from './presentation/context/FavoritesContext';
import { useFavorites } from './presentation/hooks/useFavorites';
import { HistoryContext } from './presentation/context/HistoryContext';
import { useHistory } from './presentation/hooks/useHistory';
import { WatchlistContext } from './presentation/context/WatchlistContext';
import { useWatchlist } from './presentation/hooks/useWatchlist';
import { ThemeProvider, useTheme } from './presentation/context/ThemeContext';
import { OfflineBanner } from './presentation/components/common/OfflineBanner';

const AppNavigator = () => {
  const { isDark, colors } = useTheme();
  return (
    <NavigationContainer
      theme={ {
        dark: isDark,
        colors: {
          primary: '#e50914',
          background: colors.background,
          card: colors.tabBar,
          text: colors.text,
          border: colors.border,
          notification: '#e50914',
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '800' },
        },
      } }
    >
      <Navigation />
    </NavigationContainer>
  );
};

const App = () => {
  const favorites = useFavorites();
  const historyState = useHistory();
  const watchlistState = useWatchlist();

  return (
    <ThemeProvider>
      <FavoritesContext.Provider value={ favorites }>
        <HistoryContext.Provider value={ historyState }>
          <WatchlistContext.Provider value={ watchlistState }>
            <View style={ { flex: 1 } }>
              <AppNavigator />
              <OfflineBanner />
            </View>
          </WatchlistContext.Provider>
        </HistoryContext.Provider>
      </FavoritesContext.Provider>
    </ThemeProvider>
  );
};

export default App;
