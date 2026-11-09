import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TasksProvider } from './src/context/TasksContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </TasksProvider>
    </SafeAreaProvider>
  );
}
