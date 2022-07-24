import { useState, useEffect, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase/auth";
import { useStore } from "../stored/store";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const { user, setUser } = useStore(state => state)
  const [error, setError] = useState("")
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, name,  password) {
     createUserWithEmailAndPassword(auth, email, password)
     .then(() => {
      return updateProfile(auth.currentUser, {
        displayName: name
      })
     }).then(res => console.log(res))
     .catch(err => setError(err.message))
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
   return signInWithPopup(auth, googleAuthProvider)
  }

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    console.log(facebookAuthProvider)
    return signInWithPopup(auth, facebookAuthProvider)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, facebookSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}