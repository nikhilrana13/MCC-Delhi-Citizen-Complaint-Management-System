import { initializeApp,getApps } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getMessaging,getToken,onMessage} from "firebase/messaging"

const firebaseConfig = {
 apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app);
/* ---------- Login with google ---------- */
export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt:"select_account"
})
/* ---------- PUSH NOTIFICATIONS ---------- */
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

/* ---------- GET FCM TOKEN ---------- */
export const getFCMToken = async () => {
  if (!messaging) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  return token;
};

/* ---------- FOREGROUND NOTIFICATION ---------- */
export const onForegroundMessage = (callback) => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    callback(payload);
  });
};