"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const ROLES = ["Admin", "Usuario"] as const
const PROFILES = ["Emprendedor", "Abogado", "Contador", "Otro"] as const

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Usuario" as (typeof ROLES)[number],
    profile: "Emprendedor" as (typeof PROFILES)[number],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor, completa todos los campos")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      profile: formData.profile,
    })

    if (success) {
      router.push("/dashboard") // Cambiar de "/" a "/dashboard"
    } else {
      setError("El correo electrónico ya está registrado")
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
          <p className="text-amity-text-muted">Crea tu cuenta</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-amity-text font-medium">
                Nombre Completo
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Tu nombre completo"
                className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-amity-text font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="tu@email.com"
                className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-amity-text font-medium">
                  Rol
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                  <SelectTrigger className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text focus:ring-amity-gold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-amity-gray border border-amity-gray-light/50 text-amity-text">
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role} className="hover:bg-amity-gold/20">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile" className="text-amity-text font-medium">
                  Perfil
                </Label>
                <Select value={formData.profile} onValueChange={(value) => handleChange("profile", value)}>
                  <SelectTrigger className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text focus:ring-amity-gold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-amity-gray border border-amity-gray-light/50 text-amity-text">
                    {PROFILES.map((profile) => (
                      <SelectItem key={profile} value={profile} className="hover:bg-amity-gold/20">
                        {profile}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-amity-text font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Mínimo 6 caracteres"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-amity-text font-medium">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-amity-text-muted hover:text-amity-text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          <div className="text-center">
            <div className="text-amity-text-muted text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-amity-gold hover:text-amity-gold-light font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
