"use client"

import { SidebarGroupAction } from "@/components/ui/sidebar"
import type * as React from "react"
import Link from "next/link"
import { Home, Briefcase, FileText, Users, Settings, Plus, ChevronDown, User2, ChevronUp, Scale } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useAuth } from "@/contexts/auth-context"

// Menu items
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard", // Updated route
    icon: Home,
  },
  {
    title: "Casos",
    url: "/cases",
    icon: Briefcase,
  },
  {
    title: "Escritos",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
  },
  {
    title: "Ajustes",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  return (
    <Sidebar
      {...props}
      collapsible="icon"
      side="left"
      variant="sidebar"
      className="bg-amity-gray-light text-amity-text border-r border-amity-gray-light/30"
    >
      <SidebarHeader className="p-6 border-b border-amity-gray-light/20">
        <Link href="/dashboard" className="flex items-center gap-3 group" prefetch={false}>
          {" "}
          {/* Updated logo link */}
          <div className="p-2 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-lg group-hover:shadow-lg group-hover:shadow-amity-gold/20 transition-all duration-300">
            <Scale className="h-6 w-6 text-amity-dark" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-bold gold-gradient-text">AsLegal</span>
            <span className="text-xs text-amity-text-muted">Legal Services</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-amity-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-amity-text hover:text-amity-gold hover:bg-amity-gray-light/50 rounded-lg transition-all duration-200 group"
                  >
                    <Link href={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className="h-5 w-5 group-hover:text-amity-gold transition-colors" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6 bg-amity-gray-light/30" />

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full flex items-center justify-between text-amity-gold font-semibold text-sm uppercase tracking-wider mb-4 hover:text-amity-gold-light transition-colors">
                Proyectos Recientes
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupAction title="Añadir Proyecto" className="text-amity-gold hover:text-amity-gold-light">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Añadir Proyecto</span>
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-amity-text-muted hover:text-amity-text hover:bg-amity-gray-light/30 rounded-lg transition-all duration-200"
                    >
                      <Link href="#" className="flex items-center gap-3 p-2">
                        <div className="w-2 h-2 bg-amity-gold rounded-full"></div>
                        <span className="text-sm">Proyecto Alpha</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-amity-text-muted hover:text-amity-text hover:bg-amity-gray-light/30 rounded-lg transition-all duration-200"
                    >
                      <Link href="#" className="flex items-center gap-3 p-2">
                        <div className="w-2 h-2 bg-amity-gold rounded-full"></div>
                        <span className="text-sm">Proyecto Beta</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-amity-gray-light/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-amity-text hover:text-amity-gold hover:bg-amity-gray-light/50 rounded-lg transition-all duration-200 p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-full flex items-center justify-center">
                      <User2 className="h-4 w-4 text-amity-dark" />
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-medium">{user?.name || "Usuario"}</span>
                      <span className="text-xs text-amity-text-muted">{user?.email || "usuario@email.com"}</span>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="bg-amity-gray text-amity-text border border-amity-gray-light/30 rounded-lg"
              >
                <DropdownMenuItem className="hover:bg-amity-gray-light/50 hover:text-amity-gold cursor-pointer rounded-md">
                  <span>Mi Cuenta</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-amity-gray-light/50 hover:text-amity-gold cursor-pointer rounded-md">
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-amity-gray-light/50 hover:text-amity-gold cursor-pointer rounded-md">
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail className="bg-amity-gold/20 hover:bg-amity-gold/30 transition-colors" />
    </Sidebar>
  )
}
