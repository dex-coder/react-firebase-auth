import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset
} from "firebase/auth";

//create context
const AuthContext = createContext({
  currentUser: null,
  //register function will return promise
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

//the children spelling must be children
export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  //useEffect for showing the current user whenever the authState changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //creating a function for registration
  function register(email, password) {
    //auth is coming from init firebase
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //login function
  function login(email, password) {
    //auth is coming from init firebase
    return signInWithEmailAndPassword(auth, email, password);
  }

   //logout function
   function logout() {
    //auth is coming from init firebase
    return signOut(auth);
  }

  //google signin function
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    //auth is coming from init firebase
    return signInWithPopup(auth, provider)
  }

   //forgot password function
   function forgotPassword(email) {
    //auth is coming from init firebase
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/login',
    })
  }

   //reset password function
   function resetPassword(oobCode, newPassword) {
    //auth is coming from init firebase
    return confirmPasswordReset(auth, oobCode, newPassword )
  }


  const value = {
    currentUser,
    register,
    login,
    logout,
    signInWithGoogle,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
