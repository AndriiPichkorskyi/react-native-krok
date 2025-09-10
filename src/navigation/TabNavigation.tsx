import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ROUTES from '../constants/routes';
import { Home } from '../screens/TabScreens/Home';
import Statistics from '../screens/TabScreens/Statistics';
import Challenge from '../screens/TabScreens/Challenge';
import SettingsScreen from '../screens/TabScreens/SettingsScreen';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // const iconStyle = focused ? 'solid' : 'solid';
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
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.text,
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
