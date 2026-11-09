# MyTasks (React Native + Expo)

## 1. Prérequis
- Node.js LTS (https://nodejs.org)
- Android Studio avec un émulateur créé (Device Manager > Create Device)
- Variable d'environnement ANDROID_HOME = dossier du SDK Android
  (Windows: C:\Users\<vous>\AppData\Local\Android\Sdk)

## 2. Créer le projet
    npx create-expo-app@latest MyTasks --template blank
    cd MyTasks
    npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @expo/vector-icons expo-status-bar

## 3. Copier les fichiers
Remplacer App.js par celui de ce zip et copier le dossier src/ à la racine du projet.
(Si le template a créé App.tsx / index.ts, supprimez App.tsx et utilisez App.js.)

## 4. Lancer
1. Démarrer l'émulateur dans Android Studio (Device Manager > Play).
2. Dans le dossier du projet :
       npx expo start
3. Appuyer sur "a" : Expo Go s'installe et l'app s'ouvre sur l'émulateur.
