import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ROUTES from '../constants/routes';
import { Home } from '../screens/TabScreens/Home';
import Statistics from '../screens/TabScreens/Statistics';
import Challenge from '../screens/TabScreens/Challenge';
import SettingsScreen from '../screens/TabScreens/SettingsScreen';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useContext, useMemo } from 'react';
import { ThemeContext, themeContextType } from '../context/theme/ThemeContext';
import Leaderboards from '../screens/TabScreens/Leaderboards';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  // const themedStyles = useMemo(() => styles(colorScheme), [colorScheme])

  return (
    <Tab.Navigator
      key={colorScheme.background}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            [ROUTES.HOME]: 'home',
            // [ROUTES.STATISTICS]: 'chart-line',
            [ROUTES.CHALLENGE]: 'award',
            [ROUTES.LEADERBOARDS]: 'award',
            [ROUTES.SETTINGS]: 'cog',
          };

          return (
            <FontAwesome5
              name={icons[route.name]}
              size={size}
              color={color}
              iconStyle={'solid'}
            />
          );
        },
        tabBarActiveTintColor: colorScheme.primary,
        tabBarInactiveTintColor: colorScheme.text,
        tabBarActiveBackgroundColor: colorScheme.inputBG,
        tabBarInactiveBackgroundColor: colorScheme.inputBG,
        headerShown: false,
        headerStyle: {
          backgroundColor: colorScheme.inputBG,
        },
        headerTintColor: colorScheme.text,
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{ title: 'Головна' }}
      />
      {/* <Tab.Screen name={ROUTES.STATISTICS} component={Statistics} options={{ title: 'Статистика' }} /> */}
      <Tab.Screen
        name={ROUTES.LEADERBOARDS}
        component={Leaderboards}
        options={{ title: 'Лідерборд' }}
      />
      {/* <Tab.Screen name={ROUTES.CHALLENGE} component={Challenge} options={{ title: 'Виклики' }} /> */}
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ title: 'Налаштування' }}
      />
    </Tab.Navigator>
  );
}
