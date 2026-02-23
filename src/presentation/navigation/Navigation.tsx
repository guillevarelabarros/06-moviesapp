import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DetailsScreen } from '../screens/details/DetailsScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { FavoritesScreen } from '../screens/favorites/FavoritesScreen';

export type RootStackParams = {
  Tabs: undefined;
  Details: { movieId: number };
};

export type TabParams = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<TabParams>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={ {
      headerShown: false,
      tabBarActiveTintColor: '#e50914',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#eee' },
    } }
  >
    <Tab.Screen
      name="Home"
      component={ HomeScreen }
      options={ { tabBarLabel: 'Inicio', tabBarIcon: ( { color } ) => <Text style={ { fontSize: 20, color } }>🏠</Text> } }
    />
    <Tab.Screen
      name="Search"
      component={ SearchScreen }
      options={ { tabBarLabel: 'Buscar', tabBarIcon: ( { color } ) => <Text style={ { fontSize: 20, color } }>🔍</Text> } }
    />
    <Tab.Screen
      name="Favorites"
      component={ FavoritesScreen }
      options={ { tabBarLabel: 'Favoritos', tabBarIcon: ( { color } ) => <Text style={ { fontSize: 20, color } }>❤️</Text> } }
    />
  </Tab.Navigator>
);

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      <Stack.Screen name="Tabs" component={ TabNavigator } />
      <Stack.Screen name="Details" component={ DetailsScreen } />
    </Stack.Navigator>
  );
};
