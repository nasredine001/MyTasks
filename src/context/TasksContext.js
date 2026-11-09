import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@mytasks_tasks_v1';

const makeSeed = () => {
  const now = Date.now();
  const day = 86400000;
  return [
    { id: 's1', title: 'Préparer la présentation', description: 'Réaliser les diapositives pour la présentation du projet.', priority: 'Élevée', status: 'À faire', createdAt: new Date(now).toISOString() },
    { id: 's2', title: 'Répondre aux emails', description: 'Traiter les emails en attente.', priority: 'Moyenne', status: 'À faire', createdAt: new Date(now - day).toISOString() },
    { id: 's3', title: 'Lire la documentation', description: 'Lire la documentation de React Native.', priority: 'Faible', status: 'Terminée', createdAt: new Date(now - 2 * day).toISOString() },
    { id: 's4', title: 'Développer la fonctionnalité', description: 'Implémenter la fonctionnalité de recherche.', priority: 'Élevée', status: 'À faire', createdAt: new Date(now - 3 * day).toISOString() },
    { id: 's5', title: 'Ranger le bureau', description: '', priority: 'Faible', status: 'Terminée', createdAt: new Date(now - 4 * day).toISOString() },
  ];
};

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Chargement initial depuis AsyncStorage
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : makeSeed();
        if (mounted) setTasks(Array.isArray(data) ? data : makeSeed());
      } catch (e) {
        if (mounted) setTasks(makeSeed());
      } finally {
        setTimeout(() => {
          if (mounted) {
            setLoaded(true);
            setLoading(false);
          }
        }, 600);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Sauvegarde à chaque modification
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(() => {});
  }, [tasks, loaded]);

  const addTask = useCallback(({ title, description, priority }) => {
    const task = {
      id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
      title,
      description,
      priority,
      status: 'À faire',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const updateTask = useCallback((id, changes) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleStatus = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'Terminée' ? 'À faire' : 'Terminée' } : t))
    );
  }, []);

  const resetTasks = useCallback(() => setTasks(makeSeed()), []);

  return (
    <TasksContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask, toggleStatus, resetTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
