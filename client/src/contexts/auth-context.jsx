import {createContext, useContext, useState} from 'react';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setisAuthenticated] = useState();
    
    const login = (userData) => {
        // TODO: validate user data here
        setUser(userData)
        setisAuthenticated(true)
    }
    const logout = () =>{
        setUser(null)
        setisAuthenticated(false)
    }


    const isAdmin = () => user.role ===  'admin';

    return(
        <AuthContext.Provider value={{user, login, logout, isAuthenticated, isAdmin}}>
        {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)