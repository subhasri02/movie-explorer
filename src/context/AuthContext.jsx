// Manages authentication state and provides auth functions


import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider } from "../auth/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = "subhasriviswanadhuni17@gmail.com"; // admin email

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === ADMIN_EMAIL);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed. Try again.");
    }
  };

  const registerWithEmail = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (cred.user) await updateProfile(cred.user, { displayName: name });
  };

  const logout = async () => await signOut(auth);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loginWithGoogle, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


