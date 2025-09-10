import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigation } from './navigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <StackNavigation />
      {/* <AppContent /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  demoContainer: {
    gap: 16,
  },
});

export default App;
