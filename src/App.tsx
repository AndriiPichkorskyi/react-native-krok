import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { StackNavigation } from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, ThemeContext, themeContextType } from './context/theme/ThemeContext';
import AppSafeArea from './components/AppContent/AppContent';
import { UIManager, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoaderProvider } from './context/loaderContext';
import Loader from './components/Loader';
import InitStepCounter from './components/InitStepCounter';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function AppContent() {
  const { theme } = useContext(ThemeContext) as themeContextType;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={theme !== 'light' ? 'light-content' : 'dark-content'}
      />
      <AppSafeArea>
        <StackNavigation />
      </AppSafeArea>
      <InitStepCounter />
      <Loader />
    </GestureHandlerRootView>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LoaderProvider>
          <AppContent />
        </LoaderProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
