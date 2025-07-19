import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    connectAuthEmulator,
} from "firebase/auth";
import {
    getFirestore,
    connectFirestoreEmulator,
    enableNetwork,
    disableNetwork,
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
    const requiredKeys = [
        "apiKey",
        "authDomain",
        "projectId",
        "storageBucket",
        "messagingSenderId",
        "appId",
    ];
    const missingKeys = requiredKeys.filter(
        (key) => !firebaseConfig[key as keyof typeof firebaseConfig]
    );

    if (missingKeys.length > 0) {
        console.error("Missing Firebase configuration keys:", missingKeys);
        throw new Error(
            `Missing Firebase configuration: ${missingKeys.join(", ")}`
        );
    }
};

// Validate configuration before initializing
validateFirebaseConfig();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

// Network status utilities
export const enableFirestoreNetwork = async () => {
    try {
        await enableNetwork(db);
        console.log("Firestore network enabled");
    } catch (error) {
        console.error("Error enabling Firestore network:", error);
    }
};

export const disableFirestoreNetwork = async () => {
    try {
        await disableNetwork(db);
        console.log("Firestore network disabled");
    } catch (error) {
        console.error("Error disabling Firestore network:", error);
    }
};

export default app;
