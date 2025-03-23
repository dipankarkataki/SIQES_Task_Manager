import React from 'react';
import Routes from './src/navigation/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Routes />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App