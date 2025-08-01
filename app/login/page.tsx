"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }

    const success = await login(email, password)
    if (success) {
      router.push("/dashboard") // Cambiar de "/" a "/dashboard"
    } else {
      setError("Credenciales incorrectas")
    }
  }

  return (
    <div className="min-h-screen bg-amity-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-amity-gray border border-amity-gray-light rounded-2xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-xl">
              <Scale className="h-8 w-8 text-amity-dark" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold gold-gradient-text">AsLegal</CardTitle>
          <p className="text-amity-text-muted">Inicia sesión en tu cuenta</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amity-text font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-amity-text font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-amity-text-muted hover:text-amity-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amity-dark mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <div className="text-amity-text-muted text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-amity-gold hover:text-amity-gold-light font-medium">
                Regístrate aquí
              </Link>
            </div>

            <div className="border-t border-amity-gray-light/20 pt-4">
              <p className="text-xs text-amity-text-muted mb-2">Credenciales de prueba:</p>
              <div className="text-xs text-amity-text-muted space-y-1">
                <div>Admin: admin@aslegal.com / admin123</div>
                <div>Usuario: juan@example.com / user123</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
