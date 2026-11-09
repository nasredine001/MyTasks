import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTasks } from '../context/TasksContext';
import StatsRow from '../components/StatsRow';
import { COLORS } from '../theme';

export default function ProfileScreen() {
  const { tasks, resetTasks } = useTasks();
  const confirmReset = () =>
    Alert.alert('Réinitialiser', "Restaurer les tâches d'exemple ?", [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Réinitialiser', style: 'destructive', onPress: resetTasks },
    ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      <Text style={styles.sub}>Vos statistiques</Text>
      <StatsRow tasks={tasks} />
      <TouchableOpacity style={styles.btn} onPress={confirmReset}>
        <Text style={styles.btnText}>Réinitialiser les données</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  sub: { color: COLORS.muted, marginBottom: 16, marginTop: 4 },
  btn: { backgroundColor: COLORS.danger, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: '700' },
});
