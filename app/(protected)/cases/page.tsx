"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react"

// Datos de casos simulados
const mockCases = [
  {
    id: "1",
    name: "Demanda por Despido Injustificado - Juan Pérez",
    type: "Laborales",
    subtype: "Denuncias por despido injustificado o no pago de cotizaciones",
    status: "Activo",
    createdAt: "2024-07-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Contrato de Trabajo - María García",
    type: "Laborales",
    subtype: "Contrato de trabajo individual",
    status: "Completado",
    createdAt: "2024-07-14T14:30:00Z",
  },
  {
    id: "3",
    name: "Cobranza de Factura Pendiente - Empresa XYZ",
    type: "Cobranza y ejecución",
    subtype: "Factura impaga",
    status: "Pendiente",
    createdAt: "2024-07-13T09:15:00Z",
  },
  {
    id: "4",
    name: "Registro de Marca - InnovaTech",
    type: "Propiedad Intelectual y Marcas",
    subtype: "Registro de marca",
    status: "En Revisión",
    createdAt: "2024-07-12T11:00:00Z",
  },
  {
    id: "5",
    name: "Carta de Aviso de Despido - Pedro López",
    type: "Laborales",
    subtype: "Carta de aviso de despido (Art. 161, 160, etc.)",
    status: "Activo",
    createdAt: "2024-07-11T16:45:00Z",
  },
  {
    id: "6",
    name: "Constitución de Sociedad - Startup ABC",
    type: "Constitución y estructura de empresa",
    subtype: "Sociedad por acciones",
    status: "Pendiente",
    createdAt: "2024-07-10T08:00:00Z",
  },
  {
    id: "7",
    name: "Reclamo por Producto Defectuoso - Ana Torres",
    type: "Derecho del consumidor",
    subtype: "Producto defectuoso",
    status: "Activo",
    createdAt: "2024-07-09T13:20:00Z",
  },
  {
    id: "8",
    name: "Finiquito - Sofía Ruiz",
    type: "Laborales",
    subtype: "Finiquitos (formato base)",
    status: "Completado",
    createdAt: "2024-07-08T10:00:00Z",
  },
  {
    id: "9",
    name: "Asistencia Reclamo DT - Carlos Vargas",
    type: "Laborales",
    subtype: "Asistencia en presentación de reclamos ante la Dirección del Trabajo",
    status: "En Proceso",
    createdAt: "2024-07-07T15:00:00Z",
  },
  {
    id: "10",
    name: "Divorcio de Mutuo Acuerdo - Familia González",
    type: "Familia (nivel básico automatizable)",
    subtype: "Divorcio",
    status: "Pendiente",
    createdAt: "2024-07-06T11:00:00Z",
  },
]

const ITEMS_PER_PAGE = 5

export default function CasesPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const sortedCases = useMemo(() => {
    return [...mockCases].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [])

  const totalPages = Math.ceil(sortedCases.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCases = sortedCases.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">Módulo de Casos</h1>

      <Card className="professional-card border border-white/10 rounded-2xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Total de Casos</CardTitle>
          <Briefcase className="h-6 w-6 text-amity-gray" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-amity-dark">{mockCases.length}</div>
          <p className="text-sm text-amity-gray">Casos registrados en la plataforma</p>
        </CardContent>
      </Card>

      <Card className="professional-card border border-white/10 rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Listado de Casos</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10">
                <TableHead className="text-amity-gray">Nombre del Caso</TableHead>
                <TableHead className="text-amity-gray">Tipo</TableHead>
                <TableHead className="text-amity-gray">Subtipo</TableHead>
                <TableHead className="text-amity-gray">Estado</TableHead>
                <TableHead className="text-amity-gray">Fecha de Creación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium text-white">{caseItem.name}</TableCell>
                  <TableCell className="text-amity-gray">{caseItem.type}</TableCell>
                  <TableCell className="text-amity-gray">{caseItem.subtype}</TableCell>
                  <TableCell className="text-amity-gray">{caseItem.status}</TableCell>
                  <TableCell className="text-amity-gray">
                    {new Date(caseItem.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end items-center gap-4 mt-6">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            variant="ghost"
            className="text-amity-gray hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
          </Button>
          <span className="text-amity-gray">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="ghost"
            className="text-amity-gray hover:text-white hover:bg-white/10"
          >
            Siguiente <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
