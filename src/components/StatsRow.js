import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatsRow({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'Terminée').length;
  const todo = total - done;
  const items = [
    { label: 'Total', value: total, color: '#2563EB', bg: '#DBEAFE' },
    { label: 'Terminées', value: done, color: '#16A34A', bg: '#DCFCE7' },
    { label: 'À faire', value: todo, color: '#D97706', bg: '#FEF3C7' },
  ];
  return (
    <View style={styles.row}>
      {items.map((i) => (
        <View key={i.label} style={[styles.box, { backgroundColor: i.bg }]}>
          <Text style={[styles.label, { color: i.color }]}>{i.label}</Text>
          <Text style={[styles.value, { color: i.color }]}>{i.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  box: { flex: 1, marginHorizontal: 4, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  label: { fontSize: 12, fontWeight: '600' },
  value: { fontSize: 22, fontWeight: '800', marginTop: 2 },
});
