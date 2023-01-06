import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

export function AuthContextProvider(props) {

  const [user, setUser] = useState(true)
  const [page, setPage] = useState("Timer")

  const login = (token) => {
    localStorage.setItem('token', token)
    setUser(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(false)
  }

  const changePage = (name) => {
    setPage(name)
  }

  useEffect(() => {
    if(!localStorage.getItem('token')){
      setUser(false)
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      page,
      changePage
    }}>
        {props.children}
    </AuthContext.Provider>
  )
}
