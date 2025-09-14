import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { StackNavigation } from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from './context/theme/ThemeContext';
import AppSafeArea from './components/AppContent/AppContent';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppSafeArea>
          <StackNavigation />
        </AppSafeArea>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
