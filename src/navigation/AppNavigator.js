import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTasks } from '../context/TasksContext';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = {
  Accueil: ['home', 'home-outline'],
  Tâches: ['checkbox', 'checkbox-outline'],
  Ajouter: ['add-circle', 'add-circle-outline'],
  Profil: ['person', 'person-outline'],
};

function Tabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: { height: 58 + insets.bottom, paddingBottom: 6 + insets.bottom, paddingTop: 6 },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tâches" component={TaskListScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Ajouter" component={TaskFormScreen} options={{ title: 'Ajouter une tâche', headerTitleAlign: 'center' }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerTitleAlign: 'center' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { loading } = useTasks();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 12, color: COLORS.muted }}>Chargement de vos tâches...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={TaskDetailScreen} options={{ title: "Détails d'une tâche" }} />
        <Stack.Screen
          name="Form"
          component={TaskFormScreen}
          options={({ route }) => ({ title: route.params?.id ? 'Modifier une tâche' : 'Ajouter une tâche' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
