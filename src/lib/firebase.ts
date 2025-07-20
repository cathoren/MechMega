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
    enableIndexedDbPersistence,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
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

// Initialize Firebase services with optimization
export const auth = getAuth(app);

// Initialize Firestore with persistent cache for better performance
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
    }),
});

export const storage = getStorage(app);

// Initialize Google Auth Provider with optimized settings
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});
googleProvider.addScope("profile");
googleProvider.addScope("email");

// Enable offline persistence for better performance
const enableOfflineSupport = async () => {
    try {
        // This will be handled by the new persistent cache
        console.log("Offline support enabled with persistent cache");
    } catch (error: any) {
        if (error.code === "failed-precondition") {
            console.warn("Offline persistence failed - multiple tabs open");
        } else if (error.code === "unimplemented") {
            console.warn("Offline persistence not available in this browser");
        } else {
            console.error("Error enabling offline persistence:", error);
        }
    }
};

// Initialize offline support
enableOfflineSupport();

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
