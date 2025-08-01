"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, Edit, Trash2 } from "lucide-react"

// Datos de usuarios simulados
interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Usuario"
  profile: "Emprendedor" | "Abogado" | "Contador" | "Otro"
  createdAt: string
}

const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin Principal",
    email: "admin@aslegal.com",
    role: "Admin",
    profile: "Abogado",
    createdAt: "2024-01-01T08:00:00Z",
  },
  {
    id: "user2",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Usuario",
    profile: "Emprendedor",
    createdAt: "2024-02-10T10:30:00Z",
  },
  {
    id: "user3",
    name: "María García",
    email: "maria.garcia@example.com",
    role: "Usuario",
    profile: "Contador",
    createdAt: "2024-03-05T14:00:00Z",
  },
  {
    id: "user4",
    name: "Pedro López",
    email: "pedro.lopez@example.com",
    role: "Usuario",
    profile: "Emprendedor",
    createdAt: "2024-04-20T09:00:00Z",
  },
]

const ROLES = ["Admin", "Usuario"] as const
const PROFILES = ["Emprendedor", "Abogado", "Contador", "Otro"] as const

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ROLES[0],
    profile: PROFILES[0],
  })

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // Password should not be pre-filled for security
        role: user.role,
        profile: user.profile,
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: "",
        email: "",
        password: "",
        role: ROLES[0],
        profile: PROFILES[0],
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: "role" | "profile", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      // Update user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                role: formData.role as User["role"],
                profile: formData.profile as User["profile"],
              }
            : user,
        ),
      )
    } else {
      // Create new user
      const newUser: User = {
        id: `user${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        role: formData.role as User["role"],
        profile: formData.profile as User["profile"],
        createdAt: new Date().toISOString(),
      }
      setUsers([...users, newUser])
    }
    handleCloseDialog()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">Administración de Usuarios</h1>

      <Card className="bg-aslegal-card-bg border border-white/10 rounded-2xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Usuarios Registrados</CardTitle>
          <Users className="h-6 w-6 text-aslegal-neon-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-aslegal-neon-blue">{users.length}</div>
          <p className="text-sm text-aslegal-gray-light">Total de usuarios en la plataforma</p>
        </CardContent>
      </Card>

      <Card className="bg-aslegal-card-bg border border-white/10 rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-white">Listado de Usuarios</h2>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" /> Crear Usuario
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10">
                <TableHead className="text-aslegal-gray-light">Nombre</TableHead>
                <TableHead className="text-aslegal-gray-light">Email</TableHead>
                <TableHead className="text-aslegal-gray-light">Rol</TableHead>
                <TableHead className="text-aslegal-gray-light">Perfil</TableHead>
                <TableHead className="text-aslegal-gray-light">Fecha de Creación</TableHead>
                <TableHead className="text-aslegal-gray-light text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-aslegal-gray-light">{user.email}</TableCell>
                  <TableCell className="text-aslegal-gray-light">{user.role}</TableCell>
                  <TableCell className="text-aslegal-gray-light">{user.profile}</TableCell>
                  <TableCell className="text-aslegal-gray-light">
                    {new Date(user.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(user)}
                        className="text-aslegal-neon-blue hover:bg-aslegal-neon-blue/10"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-md md:max-w-lg bg-amity-gray border border-amity-gray-light p-6 rounded-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white">
                Nombre
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white">
                Contraseña {editingUser ? "(dejar en blanco para no cambiar)" : ""}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={!editingUser}
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role" className="text-white">
                Rol
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger className="w-full bg-aslegal-card-bg border border-white/10 text-white focus:ring-aslegal-neon-blue rounded-lg">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent className="bg-aslegal-purple-deep border border-white/10 text-white">
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role} className="hover:bg-aslegal-neon-blue/20">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile" className="text-white">
                Perfil
              </Label>
              <Select value={formData.profile} onValueChange={(value) => handleSelectChange("profile", value)}>
                <SelectTrigger className="w-full bg-aslegal-card-bg border border-white/10 text-white focus:ring-aslegal-neon-blue rounded-lg">
                  <SelectValue placeholder="Selecciona un perfil" />
                </SelectTrigger>
                <SelectContent className="bg-aslegal-purple-deep border border-white/10 text-white">
                  {PROFILES.map((profile) => (
                    <SelectItem key={profile} value={profile} className="hover:bg-aslegal-neon-blue/20">
                      {profile}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCloseDialog}
                className="text-aslegal-gray-light hover:text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
              >
                {editingUser ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
