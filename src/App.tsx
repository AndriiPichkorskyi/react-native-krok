import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { StackNavigation } from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from './context/theme/ThemeContext';
import AppSafeArea from './components/AppContent/AppContent';
import { UIManager, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
        <GestureHandlerRootView>
          <AppSafeArea>
            <StackNavigation />
          </AppSafeArea>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
