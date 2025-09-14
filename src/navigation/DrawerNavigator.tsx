import { createDrawerNavigator } from '@react-navigation/drawer';
import ROUTES from '../constants/routes';
import Support from '../screens/DrawerScreens/Support';
import TabNavigation from './TabNavigation';
import { Colors } from '../constants/Colors';
import Leaderboards from '../screens/DrawerScreens/Leaderboards';
import { Plans } from '../screens/DrawerScreens/Plans';
import { RoutesScreen } from '../screens/DrawerScreens/RoutesScreen';
import { useContext } from 'react';
import { ThemeContext, themeContextType } from '../context/theme/ThemeContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;

  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.TAB_NAVIGATION}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colorScheme.primary,
        drawerInactiveTintColor: colorScheme.text,
        drawerActiveBackgroundColor: colorScheme.gradientFrom + '80',
        drawerPosition: 'right',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: colorScheme.inputBG,

          width: 240,
        },
      }}
    >
      <Drawer.Screen name={ROUTES.TAB_NAVIGATION} component={TabNavigation} />
      <Drawer.Screen name={ROUTES.SUPPORT} component={Support} />
      <Drawer.Screen name={ROUTES.LEADERBOARDS} component={Leaderboards} />
      <Drawer.Screen name={ROUTES.PLANS} component={Plans} />
      <Drawer.Screen name={ROUTES.ROUTE_SCREEN} component={RoutesScreen} />
    </Drawer.Navigator>
  );
}
