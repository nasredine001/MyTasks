import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, PRIORITIES, STATUSES, formatDate } from '../theme';

// Props : task, onPress, onToggleStatus, detailed
export default function TaskCard({ task, onPress, onToggleStatus, detailed = false }) {
  const p = PRIORITIES[task.priority] || PRIORITIES.Moyenne;
  const s = STATUSES[task.status] || STATUSES['À faire'];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.card, { borderLeftColor: p.color }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
        <View style={styles.row}>
          <View style={[styles.badge, { backgroundColor: p.bg }]}>
            <Text style={[styles.badgeText, { color: p.color }]}>{task.priority}</Text>
          </View>
          <TouchableOpacity onPress={onToggleStatus} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} disabled={!onToggleStatus}>
            <View style={[styles.badge, { backgroundColor: s.bg }]}>
              <Text style={[styles.badgeText, { color: s.color }]}>{task.status}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {detailed && !!task.description && (
          <Text style={styles.desc} numberOfLines={2}>{task.description}</Text>
        )}
        {detailed && (
          <Text style={styles.date}>Créée le {formatDate(task.createdAt)}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderLeftWidth: 5,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  desc: { marginTop: 10, color: COLORS.muted, fontSize: 13 },
  date: { marginTop: 8, color: COLORS.muted, fontSize: 12 },
});
