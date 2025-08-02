"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  plan: "Básico" | "Intermedio" | "Avanzado"
  profile: "Gerente" | "Abogado" | "Asistente"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  plan: "Básico" | "Intermedio" | "Avanzado"
  profile: "Gerente" | "Abogado" | "Asistente"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("aslegal_user")
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("aslegal_user")
        }
      }
      setIsLoading(false)
    }

    // Pequeño delay para evitar flash de contenido
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    //-----------------------------------------
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "email": email, "password": password })
    });
    const data = await response.json();

    if (data) {
      const { password: _, ...userWithoutPassword } = data;
      console.log("userWithoutPassword")
      console.log(userWithoutPassword)
      setUser(userWithoutPassword)
      localStorage.setItem("aslegal_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Verificar si el email ya existe
    //const existingUser = mockUsers.find((u) => u.email === userData.email)
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "firstName": userData.firstName,
        "lastName": userData.lastName,
        "email": userData.email,
        "password": userData.password,
        "plan": userData.plan,
        "profile": userData.profile
      })
    });
    const data = await response.json();
    console.log("Register.....")
    console.log(data)
    console.log("\n")
    if (data) {
      setUser(data)
      localStorage.setItem("aslegal_user", JSON.stringify(data))
      setIsLoading(false)
      return true;
    }
    return false;
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aslegal_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  console.log("context")
  console.log(context)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
