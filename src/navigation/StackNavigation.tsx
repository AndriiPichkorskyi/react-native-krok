import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingUp from '../screens/SingUp';
import ROUTES from '../constants/routes';
import { Colors } from '../constants/Colors';
import errorScreen from '../screens/ErrorScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
  },
};

export function StackNavigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={ROUTES.SIGN_UP}>
        <Stack.Screen
          name={ROUTES.SIGN_UP}
          component={SingUp}
          options={{ title: ROUTES.SIGN_UP, headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ERROR_SCREEN}
          component={errorScreen}
          options={{ title: ROUTES.ERROR_SCREEN }}
        />
        <Stack.Screen
          name={ROUTES.DRAWER}
          component={DrawerNavigator}
          options={{ title: ROUTES.DRAWER, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
