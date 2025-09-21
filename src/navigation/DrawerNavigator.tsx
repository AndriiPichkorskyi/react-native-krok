import { createDrawerNavigator } from '@react-navigation/drawer';
import ROUTES from '../constants/routes';
import Support from '../screens/DrawerScreens/Support';
import TabNavigation from './TabNavigation';
// import Leaderboards from '../screens/DrawerScreens/Leaderboards';
import { Plans } from '../screens/DrawerScreens/Plans';
import { RoutesScreen } from '../screens/DrawerScreens/RoutesScreen';
import { useContext, useMemo } from 'react';
import { ThemeContext, themeContextType } from '../context/theme/ThemeContext';
import Header from '../components/Header';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  // const themedStyles = useMemo(() => styles(colorScheme), [colorScheme])

  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.TAB_NAVIGATION}
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <Header navigation={navigation} />
        ),
        drawerActiveTintColor: colorScheme.primary,
        drawerInactiveTintColor: colorScheme.text,
        drawerActiveBackgroundColor: colorScheme.gradientTo + '80',
        drawerPosition: 'right',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: colorScheme.inputBG,

          width: 240,
        },
      }}
    >
      <Drawer.Screen name={ROUTES.TAB_NAVIGATION} component={TabNavigation} />
      {/* <Drawer.Screen name={ROUTES.SUPPORT} component={Support} /> */}
      {/* <Drawer.Screen name={ROUTES.LEADERBOARDS} component={Leaderboards} /> */}
      <Drawer.Screen name={ROUTES.PLANS} component={Plans} />
      <Drawer.Screen name={ROUTES.ROUTE_SCREEN} component={RoutesScreen} />
    </Drawer.Navigator>
  );
}
