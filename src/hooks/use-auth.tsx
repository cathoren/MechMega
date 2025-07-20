import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

interface UserProfile {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
    phone?: string;
    company?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    preferences?: {
        notifications: boolean;
        newsletter: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

interface AuthContextType {
    user: UserProfile | null;
    firebaseUser: FirebaseUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
    logout: () => Promise<void>;
    updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
    refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cache user profiles in localStorage for faster loading
    const cacheUserProfile = (profile: UserProfile) => {
        try {
            localStorage.setItem(
                `userProfile_${profile.id}`,
                JSON.stringify({
                    ...profile,
                    createdAt: profile.createdAt.toISOString(),
                    updatedAt: profile.updatedAt.toISOString(),
                })
            );
        } catch (error) {
            console.warn("Failed to cache user profile:", error);
        }
    };

    const getCachedUserProfile = (uid: string): UserProfile | null => {
        try {
            const cached = localStorage.getItem(`userProfile_${uid}`);
            if (cached) {
                const profile = JSON.parse(cached);
                return {
                    ...profile,
                    createdAt: new Date(profile.createdAt),
                    updatedAt: new Date(profile.updatedAt),
                };
            }
        } catch (error) {
            console.warn("Failed to get cached user profile:", error);
        }
        return null;
    };

    const clearCachedUserProfile = (uid: string) => {
        try {
            localStorage.removeItem(`userProfile_${uid}`);
        } catch (error) {
            console.warn("Failed to clear cached user profile:", error);
        }
    };

    // Create user profile in Firestore
    const createUserProfile = async (
        firebaseUser: FirebaseUser,
        additionalData?: any,
        retries = 3
    ): Promise<UserProfile | null> => {
        if (!firebaseUser) return null;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    const { displayName, email, photoURL } = firebaseUser;
                    const userData: UserProfile = {
                        id: firebaseUser.uid,
                        name:
                            additionalData?.name ||
                            displayName ||
                            email?.split("@")[0] ||
                            "User",
                        email: email || "",
                        photoURL: photoURL || undefined,
                        preferences: {
                            notifications: true,
                            newsletter: false,
                        },
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        ...additionalData,
                    };

                    await setDoc(userRef, userData);
                    return userData;
                } else {
                    return userSnap.data() as UserProfile;
                }
            } catch (error: any) {
                console.error(
                    `Error creating user profile (attempt ${attempt}):`,
                    error
                );

                // If it's an offline error and we have retries left, wait and retry
                if (
                    (error.code === "unavailable" ||
                        error.code === "failed-precondition") &&
                    attempt < retries
                ) {
                    console.log(
                        `Retrying profile creation in ${attempt} seconds...`
                    );
                    await new Promise((resolve) =>
                        setTimeout(resolve, 1000 * attempt)
                    );
                    continue;
                }

                // If it's a critical error or we're out of retries, return null
                if (attempt === retries) {
                    console.error(
                        "Max retries reached for creating user profile"
                    );
                    return null;
                }
            }
        }
        return null;
    };

    // Fetch user profile from Firestore with caching
    const fetchUserProfile = async (
        uid: string,
        useCache = true,
        retries = 3
    ): Promise<UserProfile | null> => {
        // Try to get from cache first if enabled
        if (useCache) {
            const cachedProfile = getCachedUserProfile(uid);
            if (cachedProfile) {
                console.log("Using cached user profile");
                // Start background fetch to update cache
                fetchUserProfile(uid, false, 1)
                    .then((freshProfile) => {
                        if (
                            freshProfile &&
                            JSON.stringify(freshProfile) !==
                                JSON.stringify(cachedProfile)
                        ) {
                            setUser(freshProfile);
                            cacheUserProfile(freshProfile);
                        }
                    })
                    .catch(console.warn);
                return cachedProfile;
            }
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data() as UserProfile;
                    // Convert Firestore timestamps to Date objects
                    const profile = {
                        ...userData,
                        createdAt:
                            userData.createdAt instanceof Date
                                ? userData.createdAt
                                : new Date(userData.createdAt),
                        updatedAt:
                            userData.updatedAt instanceof Date
                                ? userData.updatedAt
                                : new Date(userData.updatedAt),
                    };

                    // Cache the fresh profile
                    cacheUserProfile(profile);
                    return profile;
                }
                return null;
            } catch (error: any) {
                console.error(
                    `Error fetching user profile (attempt ${attempt}):`,
                    error
                );

                // If it's an offline error and we have retries left, wait and retry
                if (
                    (error.code === "unavailable" ||
                        error.code === "failed-precondition") &&
                    attempt < retries
                ) {
                    console.log(`Retrying in ${attempt} seconds...`);
                    await new Promise((resolve) =>
                        setTimeout(resolve, 1000 * attempt)
                    );
                    continue;
                }

                // If it's a critical error or we're out of retries, return cached if available
                if (attempt === retries && useCache) {
                    const cachedProfile = getCachedUserProfile(uid);
                    if (cachedProfile) {
                        console.log(
                            "Using cached profile due to fetch failure"
                        );
                        return cachedProfile;
                    }
                }

                if (attempt === retries) {
                    console.error(
                        "Max retries reached for fetching user profile"
                    );
                    return null;
                }
            }
        }
        return null;
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return !!result.user;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        setIsLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (result.user) {
                // Update Firebase Auth profile
                await updateProfile(result.user, {
                    displayName: name,
                });

                // Create user profile in Firestore
                await createUserProfile(result.user, { name });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Signup error:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);

            if (result.user) {
                // Try to create profile, but don't fail if offline
                try {
                    await createUserProfile(result.user);
                } catch (profileError: any) {
                    console.warn(
                        "Could not create/fetch profile due to connectivity issues:",
                        profileError
                    );
                    // Create a temporary profile from Firebase user data
                    const tempProfile: UserProfile = {
                        id: result.user.uid,
                        name:
                            result.user.displayName ||
                            result.user.email?.split("@")[0] ||
                            "User",
                        email: result.user.email || "",
                        photoURL: result.user.photoURL || undefined,
                        preferences: {
                            notifications: true,
                            newsletter: false,
                        },
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    setUser(tempProfile);
                }
                return true;
            }
            return false;
        } catch (error: any) {
            console.error("Google login error:", error);

            // Provide more specific error messages
            if (error.code === "auth/popup-blocked") {
                throw new Error(
                    "Popup was blocked. Please allow popups for this site."
                );
            } else if (error.code === "auth/popup-closed-by-user") {
                throw new Error("Sign-in was cancelled.");
            } else if (error.code === "auth/network-request-failed") {
                throw new Error(
                    "Network error. Please check your internet connection."
                );
            }

            return false;
        } finally {
            setIsLoading(false);
        }
    };
    const logout = async (): Promise<void> => {
        try {
            // Clear cached profile before signing out
            if (firebaseUser) {
                clearCachedUserProfile(firebaseUser.uid);
            }
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const updateUserProfile = async (
        data: Partial<UserProfile>
    ): Promise<boolean> => {
        if (!firebaseUser || !user) return false;

        try {
            const userRef = doc(db, "users", firebaseUser.uid);
            const updateData = {
                ...data,
                updatedAt: new Date(),
            };

            await updateDoc(userRef, updateData);

            // Update local state and cache
            const updatedUser = { ...user, ...updateData };
            setUser(updatedUser);
            cacheUserProfile(updatedUser);

            return true;
        } catch (error) {
            console.error("Error updating user profile:", error);
            return false;
        }
    };

    const refreshUserProfile = async (): Promise<void> => {
        if (!firebaseUser) return;

        const profile = await fetchUserProfile(firebaseUser.uid);
        setUser(profile);
    };

    // Listen to authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setFirebaseUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const profile = await fetchUserProfile(firebaseUser.uid);
                    if (profile) {
                        setUser(profile);
                    } else {
                        // Create a fallback profile from Firebase user data if Firestore is unavailable
                        const fallbackProfile: UserProfile = {
                            id: firebaseUser.uid,
                            name:
                                firebaseUser.displayName ||
                                firebaseUser.email?.split("@")[0] ||
                                "User",
                            email: firebaseUser.email || "",
                            photoURL: firebaseUser.photoURL || undefined,
                            preferences: {
                                notifications: true,
                                newsletter: false,
                            },
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        };
                        setUser(fallbackProfile);
                        console.log(
                            "Using fallback profile due to Firestore unavailability"
                        );
                    }
                } catch (error) {
                    console.error("Error in auth state change:", error);
                    // Still set a basic user profile to allow the app to function
                    const basicProfile: UserProfile = {
                        id: firebaseUser.uid,
                        name:
                            firebaseUser.displayName ||
                            firebaseUser.email?.split("@")[0] ||
                            "User",
                        email: firebaseUser.email || "",
                        photoURL: firebaseUser.photoURL || undefined,
                        preferences: {
                            notifications: true,
                            newsletter: false,
                        },
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };
                    setUser(basicProfile);
                }
            } else {
                setUser(null);
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        firebaseUser,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateUserProfile,
        refreshUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
