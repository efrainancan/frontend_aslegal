"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, PanelLeft, Scale, User, LogOut } from "lucide-react"
import { CreateCaseWizard } from "./create-case-wizard"
import { useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isCaseDialogOrSheetOpen, setIsCaseDialogOrSheetOpen] = useState(false)
  const { open, setOpen } = useSidebar()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/") // Cambiar de "/" a "/dashboard"
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-amity-dark/95 backdrop-blur-md border-b border-amity-gray-light/20">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {/* Botón para alternar el sidebar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="text-amity-text hover:bg-amity-gray hover:text-amity-gold transition-all duration-200"
            aria-label={open ? "Esconder panel lateral" : "Mostrar panel lateral"}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" prefetch={false}>
            <div className="p-2 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-lg group-hover:shadow-lg group-hover:shadow-amity-gold/20 transition-all duration-300">
              <Scale className="h-8 w-8 text-amity-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gold-gradient-text">AsLegal</span>
              <span className="text-xs text-amity-text-muted font-medium">Professional Legal Services</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-amity-text hover:text-amity-gold font-medium transition-colors duration-200 relative group"
            prefetch={false}
          >
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amity-gold transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/cases"
            className="text-amity-text hover:text-amity-gold font-medium transition-colors duration-200 relative group"
            prefetch={false}
          >
            Casos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amity-gold transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/documents"
            className="text-amity-text hover:text-amity-gold font-medium transition-colors duration-200 relative group"
            prefetch={false}
          >
            Documentos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amity-gold transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/users"
            className="text-amity-text hover:text-amity-gold font-medium transition-colors duration-200 relative group"
            prefetch={false}
          >
            Usuarios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amity-gold transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            href="/settings"
            className="text-amity-text hover:text-amity-gold font-medium transition-colors duration-200 relative group"
            prefetch={false}
          >
            Ajustes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amity-gold transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* User Menu and CTA Button */}
        <div className="flex items-center gap-4">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-amity-text hover:bg-amity-gray hover:text-amity-gold transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-amity-dark" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.firstName + " " + user?.lastName}</span>
                  <span className="text-xs text-amity-text-muted">{user?.profile}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-amity-gray text-amity-text border border-amity-gray-light/30 rounded-lg"
            >
              <DropdownMenuItem className="hover:bg-amity-gray-light/50 hover:text-amity-gold cursor-pointer rounded-md">
                <User className="h-4 w-4 mr-2" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-red-500/10 hover:text-red-400 cursor-pointer rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog para escritorio */}
          <Dialog open={isCaseDialogOrSheetOpen} onOpenChange={setIsCaseDialogOrSheetOpen}>
            <DialogTrigger asChild>
              <Button className="hidden lg:inline-flex btn-gold">Crear Caso</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md md:max-w-[500px] h-[90vh] bg-amity-gray border border-amity-gray-light p-0 rounded-2xl overflow-hidden">
              <CreateCaseWizard onClose={() => setIsCaseDialogOrSheetOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Sheet para móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-amity-text hover:bg-amity-gray hover:text-amity-gold"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-amity-gray border-l border-amity-gray-light text-amity-text w-80">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-lg">
                  <Scale className="h-6 w-6 text-amity-dark" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold gold-gradient-text">AsLegal</span>
                  <span className="text-xs text-amity-text-muted">Legal Services</span>
                </div>
              </div>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="text-amity-text hover:text-amity-gold transition-colors"
                  prefetch={false}
                >
                  Dashboard
                </Link>
                <Link
                  href="/cases"
                  className="text-amity-text hover:text-amity-gold transition-colors"
                  prefetch={false}
                >
                  Casos
                </Link>
                <Link
                  href="/documents"
                  className="text-amity-text hover:text-amity-gold transition-colors"
                  prefetch={false}
                >
                  Escritos
                </Link>
                <Link
                  href="/users"
                  className="text-amity-text hover:text-amity-gold transition-colors"
                  prefetch={false}
                >
                  Usuarios
                </Link>
                <Link
                  href="/settings"
                  className="text-amity-text hover:text-amity-gold transition-colors"
                  prefetch={false}
                >
                  Ajustes
                </Link>
                <Button className="btn-gold mt-6">Crear Caso</Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="mt-2 border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
