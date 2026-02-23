import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './presentation/navigation/Navigation';
import { FavoritesContext } from './presentation/context/FavoritesContext';
import { useFavorites } from './presentation/hooks/useFavorites';

const App = () => {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={ favorites }>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
};

export default App;
