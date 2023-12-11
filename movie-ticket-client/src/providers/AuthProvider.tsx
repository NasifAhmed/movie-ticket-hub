import {
    GoogleAuthProvider,
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import app from "../config/firebase.config";
import { userType } from "./UserProvider";
// import { useAxios } from "../hooks/useAxios";

// Types
type createUser = (email: string, password: string) => Promise<UserCredential>;
type signIn = (email: string, password: string) => Promise<UserCredential>;
type updateUser = (user: User, displayName: string) => Promise<void>;
type authContextValues = {
    user: User | null;
    loading: boolean;
    createUser: createUser;
    signIn: signIn;
    logOut: () => Promise<void>;
    updateUser: updateUser;
    googleSignIn: () => Promise<UserCredential>;
};

// Default values
const defaultAuthState: authContextValues = {
    user: null,
    loading: true,
    createUser: () => Promise.reject(),
    signIn: () => Promise.reject(),
    logOut: () => Promise.reject(),
    updateUser: () => Promise.reject(),
    googleSignIn: () => Promise.reject(),
};

export const AuthContext = createContext(defaultAuthState);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | (User & userType) | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (currentUser: User | null) => {
                setUser(currentUser);
                console.log("user in the auth state changed", currentUser);
                setLoading(false);
            }
        );
        return () => {
            unSubscribe();
        };
    }, []);

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUser = (user: User, displayName: string) => {
        setLoading(true);
        return updateProfile(user, { displayName });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                createUser,
                signIn,
                logOut,
                updateUser,
                googleSignIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
