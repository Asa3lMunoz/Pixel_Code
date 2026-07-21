import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const storageConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_STORAGE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_STORAGE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_STORAGE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_STORAGE_APP_ID,
};

const storageApp = initializeApp(storageConfig, "storage-app");
export const storage = getStorage(storageApp);
