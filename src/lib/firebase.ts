import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANVUjZ9gOO-pwf4GFVrs6g4Fd4lRS3ogU",
  authDomain: "gen-lang-client-0688119312.firebaseapp.com",
  projectId: "gen-lang-client-0688119312",
  storageBucket: "gen-lang-client-0688119312.firebasestorage.app",
  messagingSenderId: "829184726807",
  appId: "1:829184726807:web:189741b81c25ab7d440952"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-dojodigital-a56c7f05-d2dd-4416-9efb-b25f48aa32ed");
