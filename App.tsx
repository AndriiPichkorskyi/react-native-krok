/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Header } from './components/Header/Header';
import { ChallengeItemList } from './components/Challenge/ChallengeItemList/ChallengeItemList';
import mockChanllengeList from './mockData/mockChanllengeList';
import { ThemedInput } from './components/ThemedInput';
import { ThemedButton } from './components/ThemedButton';
import { ThemedText } from './components/ThemedText';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: safeAreaInsets.top,
          paddingLeft: safeAreaInsets.left,
          paddingRight: safeAreaInsets.right,
          ...styles.demoContainer
        }}>
        <Header />
        <ChallengeItemList title="First Challenge List" stats={mockChanllengeList} />
        <ThemedInput title='Name' type='text' onChange={console.log} />
        <ThemedInput title='Password' type='password' onChange={console.log} />
        <ThemedButton title='Primary Button' />
        <ThemedButton title='Secondary Button' type='secondary' />
        <ThemedText>Text component</ThemedText>
        <ThemedText type='h1'>Text component type='h1'</ThemedText>
        <ThemedText type='h2'>Text component type='h2'</ThemedText>
        <ThemedText type='h3'>Text component type='h3'</ThemedText>
      </View>
      {/* <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      /> */}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  demoContainer: {
    gap: 16
  }
});

export default App;
