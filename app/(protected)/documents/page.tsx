"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Plus } from "lucide-react"
import { CreateDocumentWizard } from "@/components/create-document-wizard"

export default function DocumentsPage() {
  const [isDocumentDialogOrSheetOpen, setIsDocumentDialogOrSheetOpen] = useState(false)

  // Datos de documentos simulados
  const mockDocuments = [
    {
      id: "doc1",
      name: "Contrato de Arrendamiento - Depto. 101",
      type: "Contratos y acuerdos",
      subtype: "Contrato de arrendamiento (vivienda, local comercial)",
      createdAt: "2024-07-16T10:00:00Z",
      status: "Generado",
    },
    {
      id: "doc2",
      name: "Demanda por Incumplimiento de Contrato",
      type: "Documentos judiciales",
      subtype: "Demanda o querella",
      createdAt: "2024-07-15T14:30:00Z",
      status: "Pendiente de Revisión",
    },
    {
      id: "doc3",
      name: "Poder Notarial General - Juan Pérez",
      type: "Documentos personales y familiares",
      subtype: "Poder notarial (general o específico)",
      createdAt: "2024-07-14T09:15:00Z",
      status: "Finalizado",
    },
  ]


  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">Módulo de Escritos</h1>

      <Card className="bg-aslegal-card-bg border border-white/10 rounded-2xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">Documentos Generados</CardTitle>
          <FileText className="h-6 w-6 text-aslegal-neon-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-aslegal-neon-purple">{mockDocuments.length}</div>
          <p className="text-sm text-aslegal-gray-light">Documentos creados hasta la fecha</p>
        </CardContent>
      </Card>

      <Card className="bg-aslegal-card-bg border border-white/10 rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white mb-4">Mis Documentos</h2>
        {mockDocuments.length > 0 ? (
          <div className="grid gap-4">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-aslegal-card-bg p-4 hover:bg-white/5 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">{doc.name}</h3>
                  <p className="text-sm text-aslegal-gray-light">
                    Tipo: {doc.type} | Subtipo: {doc.subtype}
                  </p>
                  <p className="text-xs text-aslegal-gray-light">
                    Creado:{" "}
                    {new Date(doc.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Generado"
                        ? "bg-green-500/20 text-green-400"
                        : doc.status === "Pendiente de Revisión"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <Button variant="ghost" size="sm" className="text-aslegal-neon-blue hover:bg-aslegal-neon-blue/10">
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-aslegal-gray-light">Aún no has generado ningún documento.</p>
        )}

        {/* Botón para escritorio (abre Dialog) */}
        <Dialog open={isDocumentDialogOrSheetOpen} onOpenChange={setIsDocumentDialogOrSheetOpen}>
          <DialogTrigger asChild>
            <Button className="hidden lg:inline-flex btn-gold mt-3">
              <Plus className="mr-2 h-4 w-4" /> Generar Nuevo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md md:max-w-[500px] h-[90vh] bg-amity-gray border border-amity-gray-light p-0 rounded-2xl overflow-hidden">
            <CreateDocumentWizard onClose={() => setIsDocumentDialogOrSheetOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Botón para móvil (abre Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mt-6 md:hidden w-full bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" /> Generar Nuevo Documento
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full md:w-[500px] bg-amity-gray border-l border-amity-gray-light p-0">
            <CreateDocumentWizard onClose={() => setIsDocumentDialogOrSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </Card>
    </div>
  )
}
