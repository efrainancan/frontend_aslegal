"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Usuario"
  profile: "Emprendedor" | "Abogado" | "Contador" | "Otro"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: "Admin" | "Usuario"
  profile: "Emprendedor" | "Abogado" | "Contador" | "Otro"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuarios simulados para el demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Admin Principal",
    email: "admin@aslegal.com",
    password: "admin123",
    role: "Admin",
    profile: "Abogado",
  },
  {
    id: "2",
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "user123",
    role: "Usuario",
    profile: "Emprendedor",
  },
]

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

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
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
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profile: userData.profile,
    }

    // Agregar a la lista de usuarios simulados
    mockUsers.push({ ...newUser, password: userData.password })

    setUser(newUser)
    localStorage.setItem("aslegal_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aslegal_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
