import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTasks } from '../context/TasksContext';
import { COLORS, PRIORITIES, PRIORITY_LIST, STATUSES } from '../theme';

// Même formulaire pour l'ajout (onglet "Ajouter") et la modification (route Form avec { id })
export default function TaskFormScreen({ navigation, route }) {
  const id = route.params?.id;
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const editing = id ? tasks.find((t) => t.id === id) : null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Moyenne');
  const [status, setStatus] = useState('À faire');
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (editing) {
        setTitle(editing.title);
        setDescription(editing.description || '');
        setPriority(editing.priority);
        setStatus(editing.status);
      } else {
        setTitle('');
        setDescription('');
        setPriority('Moyenne');
        setStatus('À faire');
      }
      setError('');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
  );

  const onSave = () => {
    const t = title.trim();
    if (t.length < 3) {
      setError('Le titre est obligatoire (3 caractères minimum).');
      return;
    }
    if (editing) {
      updateTask(id, { title: t, description: description.trim(), priority, status });
      navigation.goBack();
    } else {
      addTask({ title: t, description: description.trim(), priority });
      navigation.navigate('Tâches');
    }
  };

  const onDelete = () => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette tâche ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          deleteTask(id);
          navigation.navigate('Tabs', { screen: 'Tâches' });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Titre *</Text>
      <TextInput
        style={[styles.input, !!error && { borderColor: COLORS.danger }]}
        placeholder="Ex: Préparer la présentation"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={(v) => {
          setTitle(v);
          if (error) setError('');
        }}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
        placeholder="Détails de la tâche..."
        placeholderTextColor="#9CA3AF"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Priorité</Text>
      <View style={styles.chips}>
        {PRIORITY_LIST.map((p) => {
          const active = priority === p;
          return (
            <TouchableOpacity
              key={p}
              onPress={() => setPriority(p)}
              style={[styles.chip, { backgroundColor: PRIORITIES[p].bg, borderColor: active ? PRIORITIES[p].color : 'transparent' }]}
            >
              <Text style={{ color: PRIORITIES[p].color, fontWeight: active ? '800' : '600' }}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {editing && (
        <>
          <Text style={styles.label}>Statut</Text>
          <View style={styles.chips}>
            {Object.keys(STATUSES).map((s) => {
              const active = status === s;
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  style={[styles.chip, { backgroundColor: active ? STATUSES[s].color : STATUSES[s].bg, borderColor: 'transparent' }]}
                >
                  <Text style={{ color: active ? '#fff' : STATUSES[s].color, fontWeight: '600' }}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.primary, marginTop: 28 }]} onPress={onSave}>
        <Text style={styles.btnText}>Enregistrer</Text>
      </TouchableOpacity>
      {editing && (
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.danger }]} onPress={onDelete}>
          <Text style={styles.btnText}>Supprimer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.card },
  label: { fontWeight: '700', color: COLORS.text, marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, color: COLORS.text, backgroundColor: '#fff' },
  error: { color: COLORS.danger, marginTop: 4, fontSize: 12 },
  chips: { flexDirection: 'row' },
  chip: { flex: 1, borderWidth: 2, borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginRight: 8 },
  btn: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
