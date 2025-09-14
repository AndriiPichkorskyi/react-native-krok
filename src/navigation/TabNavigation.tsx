import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ROUTES from '../constants/routes';
import { Home } from '../screens/TabScreens/Home';
import Statistics from '../screens/TabScreens/Statistics';
import Challenge from '../screens/TabScreens/Challenge';
import SettingsScreen from '../screens/TabScreens/SettingsScreen';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors } from '../constants/Colors';
import { useContext } from 'react';
import { ThemeContext, themeContextType } from '../context/theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            [ROUTES.HOME]: 'home',
            [ROUTES.STATISTICS]: 'chart-line',
            [ROUTES.CHALLENGE]: 'award',
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
        headerStyle: {
          backgroundColor: colorScheme.inputBG,
        },
        headerTintColor: colorScheme.text,
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{ title: ROUTES.HOME, headerShown: false }}
      />
      <Tab.Screen name={ROUTES.STATISTICS} component={Statistics} />
      <Tab.Screen name={ROUTES.CHALLENGE} component={Challenge} />
      <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
