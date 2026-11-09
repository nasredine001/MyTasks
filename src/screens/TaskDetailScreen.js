import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TasksContext';
import { COLORS, PRIORITIES, STATUSES, formatDate } from '../theme';

export default function TaskDetailScreen({ navigation, route }) {
  const { tasks, deleteTask, toggleStatus } = useTasks();
  const task = tasks.find((t) => t.id === route.params?.id);

  if (!task) return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;

  const p = PRIORITIES[task.priority];
  const s = STATUSES[task.status];

  const confirmDelete = () => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette tâche ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.card, { borderLeftColor: p.color }]}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: p.bg }]}>
            <Text style={[styles.badgeText, { color: p.color }]}>{task.priority}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: s.bg, marginLeft: 8 }]}>
            <Text style={[styles.badgeText, { color: s.color }]}>{task.status}</Text>
          </View>
        </View>
        <Text style={styles.desc}>{task.description || 'Aucune description.'}</Text>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.muted} />
          <Text style={styles.date}>  Date de création : {formatDate(task.createdAt)}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.primary }]} onPress={() => navigation.navigate('Form', { id: task.id })}>
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.success }]} onPress={() => toggleStatus(task.id)}>
        <Text style={styles.btnText}>{task.status === 'Terminée' ? 'Marquer comme à faire' : 'Marquer comme terminée'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.danger }]} onPress={confirmDelete}>
        <Text style={styles.btnText}>Supprimer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  card: { backgroundColor: COLORS.card, borderRadius: 12, borderLeftWidth: 5, padding: 16, elevation: 2, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  badges: { flexDirection: 'row', marginTop: 12 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontWeight: '600', fontSize: 12 },
  desc: { marginTop: 16, color: COLORS.muted, fontSize: 14, lineHeight: 20 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  date: { color: COLORS.muted, fontSize: 13 },
  btn: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
