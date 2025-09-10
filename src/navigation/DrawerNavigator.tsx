import { createDrawerNavigator } from '@react-navigation/drawer';
import ROUTES from '../constants/routes';
import Support from '../screens/TabScreens/Support';
import TabNavigation from './TabNavigation';
import { Colors } from '../constants/Colors';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.TAB_NAVIGATION}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.light.primary,
        drawerActiveBackgroundColor: Colors.light.gradientFrom + '22',
        drawerPosition: 'right',
        drawerType: 'front',
      }}
    >
      <Drawer.Screen name={ROUTES.TAB_NAVIGATION} component={TabNavigation} />
      <Drawer.Screen name={ROUTES.SUPPORT} component={Support} />
    </Drawer.Navigator>
  );
}
