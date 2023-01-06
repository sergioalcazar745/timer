import { createContext, useState } from "react"

export const AuthContext = createContext();

export function AuthContextProvider(props) {

  const [user, setUser] = useState(false)

  const login = (token) => {
    localStorage.setItem('tokenTimer', token)
    setUser(true)
  }

  const logout = () => {
    localStorage.removeItem('tokenTimer')
    setUser(false)
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout
    }}>
        {props.children}
    </AuthContext.Provider>
  )
}
