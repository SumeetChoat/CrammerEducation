import React, { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;