import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

//create context
const AuthContext = createContext({
  currentUser: null,
  //register function will return promise
  register: () => Promise,
  login: () => Promise,
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

  const value = {
    currentUser,
    register,
    login,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
