import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { StackNavigation } from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from './context/theme/ThemeContext';
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

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LoaderProvider>
          <GestureHandlerRootView>
            <AppSafeArea>
              <StackNavigation />
            </AppSafeArea>
          </GestureHandlerRootView>
          <InitStepCounter />
          <Loader />
        </LoaderProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
