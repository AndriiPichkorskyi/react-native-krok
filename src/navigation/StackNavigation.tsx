import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingUp from '../screens/SingUp';
import ROUTES from '../constants/routes';
import { Colors } from '../constants/Colors';
import errorScreen from '../screens/ErrorScreen';
import DrawerNavigator from './DrawerNavigator';
import UserScreen from '../screens/DrawerScreens/UserScreen';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';

const Stack = createStackNavigator();

export function StackNavigation() {
  const { colorScheme } = useContext(ThemeContext);

  const MyTheme = {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,
      background: colorScheme.background,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={ROUTES.SIGN_UP}
        screenOptions={{
          headerTintColor: Colors.light.primary,
          headerBackTitleStyle: { color: Colors.light.primary },
          headerStyle: {
            backgroundColor: colorScheme.inputBG,
          },
        }}
      >
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
        <Stack.Screen
          name={ROUTES.USER_SCREEN}
          component={UserScreen}
          options={{
            title: '',
            headerShown: true,
            headerBackTitle: 'Повернутися',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
