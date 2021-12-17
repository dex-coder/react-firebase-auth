import { useContext, createContext, useState, useEffect } from "react";


//create context
const AuthContext = createContext({
    currentUser: null,
})

export default function AuthContextProvider({ childrean }){
    const [currentUser, setCurrentUser] = useState(null)

    const value = {
        currentUser,
    }

    return <AuthContext.Provider value={value}>
        {childrean}
    </AuthContext.Provider>
}




