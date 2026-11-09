import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TasksContext';
import TaskCard from '../components/TaskCard';
import StatsRow from '../components/StatsRow';
import { COLORS } from '../theme';

const FILTERS = [
  { label: 'Toutes', value: null },
  { label: 'À faire', value: 'À faire' },
  { label: 'Terminées', value: 'Terminée' },
];

export default function TaskListScreen({ navigation }) {
  const { tasks, toggleStatus } = useTasks();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(null);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const okFilter = filter === null || t.status === filter;
      const okQuery = !q || t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q);
      return okFilter && okQuery;
    });
  }, [tasks, query, filter]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes tâches</Text>
        <TouchableOpacity style={styles.plus} onPress={() => navigation.navigate('Ajouter')}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 4 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <StatsRow tasks={tasks} />
            <View style={styles.search}>
              <Ionicons name="search" size={18} color={COLORS.muted} />
              <TextInput
                style={styles.input}
                placeholder="Rechercher une tâche..."
                placeholderTextColor={COLORS.muted}
                value={query}
                onChangeText={setQuery}
              />
            </View>
            <View style={styles.filters}>
              {FILTERS.map((f) => {
                const active = filter === f.value;
                return (
                  <TouchableOpacity
                    key={f.label}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setFilter(f.value)}
                  >
                    <Text style={[styles.chipText, active && { color: '#fff' }]}>{f.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Aucune tâche trouvée.</Text>}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('Details', { id: item.id })}
            onToggleStatus={() => toggleStatus(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  plus: { backgroundColor: COLORS.primary, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9EDF5', borderRadius: 12, paddingHorizontal: 12, marginBottom: 12 },
  input: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, color: COLORS.text },
  filters: { flexDirection: 'row', marginBottom: 14 },
  chip: { flex: 1, backgroundColor: '#E9EDF5', borderRadius: 18, paddingVertical: 8, alignItems: 'center', marginHorizontal: 4 },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { fontWeight: '600', color: COLORS.muted, fontSize: 13 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 30 },
});
