"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Solo redirigir si no está cargando y no hay usuario
    if (!isLoading && !user) {
      // Evitar redirección infinita si ya estamos en login o register
      if (pathname !== "/login" && pathname !== "/register" && !pathname.startsWith("/")) {
        router.push("/login")
      }
    }
  }, [user, isLoading, router, pathname])

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-amity-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amity-gold mx-auto mb-4"></div>
          <p className="text-amity-text">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario, no mostrar nada (se redirigirá)
  if (!user) {
    return null
  }

  // Si hay usuario, mostrar el contenido
  return <>{children}</>
}
