import {createContext, useContext, useState} from 'react';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = (userData) => {
        // TODO: validate user data here
        setUser(userData)
    }
    const logout = () =>{
        setUser(null)
    }

    const isAuthenticated = () => !!user;

    const isAdmin = () => user.role ===  'admin';

    return(
        <AuthContext.Provider value={{user, login, logout, isAuthenticated, isAdmin}}>
        {children}
        </AuthContext.Provider>
    )
}