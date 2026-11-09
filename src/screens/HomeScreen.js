import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../context/TasksContext';
import StatsRow from '../components/StatsRow';
import { COLORS } from '../theme';

export default function HomeScreen({ navigation }) {
  const { tasks } = useTasks();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.logo}>MyTasks</Text>
        <Text style={styles.subtitle}>Organisez vos tâches, atteignez vos objectifs !</Text>
        <View style={{ marginTop: 28 }}>
          <StatsRow tasks={tasks} />
        </View>
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.primary }]} onPress={() => navigation.navigate('Tâches')}>
          <Text style={styles.btnText}>Mes tâches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.success }]} onPress={() => navigation.navigate('Ajouter')}>
          <Text style={styles.btnText}>Ajouter une tâche</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  logo: { fontSize: 38, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  subtitle: { textAlign: 'center', color: COLORS.muted, marginTop: 8 },
  btn: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
