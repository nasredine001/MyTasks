export const COLORS = {
  primary: '#2563EB',
  bg: '#F5F7FB',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  danger: '#E11D48',
  success: '#16A34A',
  warning: '#F59E0B',
};

export const PRIORITY_LIST = ['Faible', 'Moyenne', 'Élevée'];

export const PRIORITIES = {
  Faible: { color: '#22A55B', bg: '#DCFCE7' },
  Moyenne: { color: '#F59E0B', bg: '#FEF3C7' },
  Élevée: { color: '#E53935', bg: '#FDE7E7' },
};

export const STATUSES = {
  'À faire': { color: '#2563EB', bg: '#DBEAFE' },
  Terminée: { color: '#16A34A', bg: '#DCFCE7' },
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};
