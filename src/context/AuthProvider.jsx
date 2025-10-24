import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { AuthAPI } from '../service/api'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(AuthAPI.getSession())

  useEffect(() => {
    const s = AuthAPI.getSession()
    if (!s || s.exp <= Date.now()) {
      localStorage.removeItem('ticketapp_session')
      setSession(null)
    }
  }, [])

  const login = async (creds) => {
    const s = await AuthAPI.login(creds)
    setSession(s)
    return s
  }

  const signup = async (data) => {
    const s = await AuthAPI.signup(data)
    setSession(s)
    return s
  }

  const logout = async () => {
    await AuthAPI.logout()
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
