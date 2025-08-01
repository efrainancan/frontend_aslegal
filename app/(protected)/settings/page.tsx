"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, Plus, Edit, Trash2 } from "lucide-react"
import {
  initialCaseTypes,
  initialDocumentTypes,
  type CaseType,
  type CaseSubtype,
  type DocumentType,
  type DocumentSubtype,
} from "@/lib/data"

export default function SettingsPage() {
  const [caseTypes, setCaseTypes] = useState<CaseType[]>(initialCaseTypes)
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>(initialDocumentTypes)

  // State for Case Type Dialog
  const [isCaseTypeDialogOpen, setIsCaseTypeDialogOpen] = useState(false)
  const [editingCaseType, setEditingCaseType] = useState<CaseType | null>(null)
  const [caseTypeName, setCaseTypeName] = useState("")

  // State for Case Subtype Dialog
  const [isCaseSubtypeDialogOpen, setIsCaseSubtypeDialogOpen] = useState(false)
  const [editingCaseSubtype, setEditingCaseSubtype] = useState<{ typeId: string; subtype: CaseSubtype } | null>(null)
  const [caseSubtypeName, setCaseSubtypeName] = useState("")
  const [currentCaseTypeForSubtypes, setCurrentCaseTypeForSubtypes] = useState<CaseType | null>(null)

  // State for Document Type Dialog
  const [isDocumentTypeDialogOpen, setIsDocumentTypeDialogOpen] = useState(false)
  const [editingDocumentType, setEditingDocumentType] = useState<DocumentType | null>(null)
  const [documentTypeName, setDocumentTypeName] = useState("")

  // State for Document Subtype Dialog
  const [isDocumentSubtypeDialogOpen, setIsDocumentSubtypeDialogOpen] = useState(false)
  const [editingDocumentSubtype, setEditingDocumentSubtype] = useState<{
    typeId: string
    subtype: DocumentSubtype
  } | null>(null)
  const [documentSubtypeName, setDocumentSubtypeName] = useState("")
  const [currentDocumentTypeForSubtypes, setCurrentDocumentTypeForSubtypes] = useState<DocumentType | null>(null)

  // --- Case Type Management ---
  const handleOpenCaseTypeDialog = (type?: CaseType) => {
    if (type) {
      setEditingCaseType(type)
      setCaseTypeName(type.name)
    } else {
      setEditingCaseType(null)
      setCaseTypeName("")
    }
    setIsCaseTypeDialogOpen(true)
  }

  const handleSaveCaseType = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCaseType) {
      setCaseTypes(caseTypes.map((t) => (t.id === editingCaseType.id ? { ...t, name: caseTypeName } : t)))
    } else {
      const newId = caseTypeName.toLowerCase().replace(/\s+/g, "-")
      setCaseTypes([...caseTypes, { id: newId, name: caseTypeName, subtypes: [] }])
    }
    setIsCaseTypeDialogOpen(false)
  }

  const handleDeleteCaseType = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este tipo de caso y todos sus subtipos?")) {
      setCaseTypes(caseTypes.filter((t) => t.id !== id))
    }
  }

  // --- Case Subtype Management ---
  const handleOpenCaseSubtypeDialog = (type: CaseType, subtype?: CaseSubtype) => {
    setCurrentCaseTypeForSubtypes(type)
    if (subtype) {
      setEditingCaseSubtype({ typeId: type.id, subtype: subtype })
      setCaseSubtypeName(subtype.name)
    } else {
      setEditingCaseSubtype(null)
      setCaseSubtypeName("")
    }
    setIsCaseSubtypeDialogOpen(true)
  }

  const handleSaveCaseSubtype = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentCaseTypeForSubtypes) return

    setCaseTypes(
      caseTypes.map((type) => {
        if (type.id === currentCaseTypeForSubtypes.id) {
          if (editingCaseSubtype) {
            return {
              ...type,
              subtypes: type.subtypes.map((s) =>
                s.id === editingCaseSubtype.subtype.id ? { ...s, name: caseSubtypeName } : s,
              ),
            }
          } else {
            const newId = caseSubtypeName.toLowerCase().replace(/\s+/g, "-")
            return {
              ...type,
              subtypes: [...type.subtypes, { id: newId, name: caseSubtypeName }],
            }
          }
        }
        return type
      }),
    )
    setIsCaseSubtypeDialogOpen(false)
  }

  const handleDeleteCaseSubtype = (typeId: string, subtypeId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este subtipo de caso?")) {
      setCaseTypes(
        caseTypes.map((type) => {
          if (type.id === typeId) {
            return {
              ...type,
              subtypes: type.subtypes.filter((s) => s.id !== subtypeId),
            }
          }
          return type
        }),
      )
    }
  }

  // --- Document Type Management ---
  const handleOpenDocumentTypeDialog = (type?: DocumentType) => {
    if (type) {
      setEditingDocumentType(type)
      setDocumentTypeName(type.name)
    } else {
      setEditingDocumentType(null)
      setDocumentTypeName("")
    }
    setIsDocumentTypeDialogOpen(true)
  }

  const handleSaveDocumentType = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingDocumentType) {
      setDocumentTypes(
        documentTypes.map((t) => (t.id === editingDocumentType.id ? { ...t, name: documentTypeName } : t)),
      )
    } else {
      const newId = documentTypeName.toLowerCase().replace(/\s+/g, "-")
      setDocumentTypes([...documentTypes, { id: newId, name: documentTypeName, subtypes: [] }])
    }
    setIsDocumentTypeDialogOpen(false)
  }

  const handleDeleteDocumentType = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este tipo de documento y todos sus subtipos?")) {
      setDocumentTypes(documentTypes.filter((t) => t.id !== id))
    }
  }

  // --- Document Subtype Management ---
  const handleOpenDocumentSubtypeDialog = (type: DocumentType, subtype?: DocumentSubtype) => {
    setCurrentDocumentTypeForSubtypes(type)
    if (subtype) {
      setEditingDocumentSubtype({ typeId: type.id, subtype: subtype })
      setDocumentSubtypeName(subtype.name)
    } else {
      setEditingDocumentSubtype(null)
      setDocumentSubtypeName("")
    }
    setIsDocumentSubtypeDialogOpen(true)
  }

  const handleSaveDocumentSubtype = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentDocumentTypeForSubtypes) return

    setDocumentTypes(
      documentTypes.map((type) => {
        if (type.id === currentDocumentTypeForSubtypes.id) {
          if (editingDocumentSubtype) {
            return {
              ...type,
              subtypes: type.subtypes.map((s) =>
                s.id === editingDocumentSubtype.subtype.id ? { ...s, name: documentSubtypeName } : s,
              ),
            }
          } else {
            const newId = documentSubtypeName.toLowerCase().replace(/\s+/g, "-")
            return {
              ...type,
              subtypes: [...type.subtypes, { id: newId, name: documentSubtypeName }],
            }
          }
        }
        return type
      }),
    )
    setIsDocumentSubtypeDialogOpen(false)
  }

  const handleDeleteDocumentSubtype = (typeId: string, subtypeId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este subtipo de documento?")) {
      setDocumentTypes(
        documentTypes.map((type) => {
          if (type.id === typeId) {
            return {
              ...type,
              subtypes: type.subtypes.filter((s) => s.id !== subtypeId),
            }
          }
          return type
        }),
      )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">Ajustes</h1>

      <Card className="bg-aslegal-card-bg border border-white/10 rounded-2xl shadow-lg p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
          <CardTitle className="text-2xl font-bold text-white">Configuración de Tipos</CardTitle>
          <Settings className="h-6 w-6 text-aslegal-neon-blue" />
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="cases" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white">
              <TabsTrigger
                value="cases"
                className="data-[state=active]:bg-aslegal-neon-blue data-[state=active]:text-white"
              >
                Casos
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-aslegal-neon-purple data-[state=active]:text-white"
              >
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Tipos de Casos</h3>
                <Button
                  onClick={() => handleOpenCaseTypeDialog()}
                  className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" /> Añadir Tipo
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10">
                      <TableHead className="text-aslegal-gray-light">Nombre</TableHead>
                      <TableHead className="text-aslegal-gray-light">Subtipos</TableHead>
                      <TableHead className="text-aslegal-gray-light text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caseTypes.map((type) => (
                      <TableRow key={type.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-medium text-white">{type.name}</TableCell>
                        <TableCell className="text-aslegal-gray-light">
                          {type.subtypes.length > 0 ? type.subtypes.map((s) => s.name).join(", ") : "Ninguno"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenCaseSubtypeDialog(type)}
                              className="text-aslegal-neon-blue hover:bg-aslegal-neon-blue/10"
                              title="Añadir Subtipo"
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Añadir Subtipo</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenCaseTypeDialog(type)}
                              className="text-aslegal-neon-blue hover:bg-aslegal-neon-blue/10"
                              title="Editar Tipo"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar Tipo</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCaseType(type.id)}
                              className="text-destructive hover:bg-destructive/10"
                              title="Eliminar Tipo"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar Tipo</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Tipos de Documentos</h3>
                <Button
                  onClick={() => handleOpenDocumentTypeDialog()}
                  className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" /> Añadir Tipo
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-white/10">
                      <TableHead className="text-aslegal-gray-light">Nombre</TableHead>
                      <TableHead className="text-aslegal-gray-light">Subtipos</TableHead>
                      <TableHead className="text-aslegal-gray-light text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentTypes.map((type) => (
                      <TableRow key={type.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-medium text-white">{type.name}</TableCell>
                        <TableCell className="text-aslegal-gray-light">
                          {type.subtypes.length > 0 ? type.subtypes.map((s) => s.name).join(", ") : "Ninguno"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDocumentSubtypeDialog(type)}
                              className="text-aslegal-neon-blue hover:bg-aslegal-neon-blue/10"
                              title="Añadir Subtipo"
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Añadir Subtipo</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDocumentTypeDialog(type)}
                              className="text-aslegal-neon-blue hover:bg-aslegal-neon-blue/10"
                              title="Editar Tipo"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar Tipo</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteDocumentType(type.id)}
                              className="text-destructive hover:bg-destructive/10"
                              title="Eliminar Tipo"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar Tipo</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog for Case Type */}
      <Dialog open={isCaseTypeDialogOpen} onOpenChange={setIsCaseTypeDialogOpen}>
        <DialogContent className="w-full max-w-md bg-amity-gray border border-amity-gray-light p-6 rounded-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {editingCaseType ? "Editar Tipo de Caso" : "Añadir Nuevo Tipo de Caso"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCaseType} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="caseTypeName" className="text-white">
                Nombre del Tipo de Caso
              </Label>
              <Input
                id="caseTypeName"
                value={caseTypeName}
                onChange={(e) => setCaseTypeName(e.target.value)}
                required
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCaseTypeDialogOpen(false)}
                className="text-aslegal-gray-light hover:text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
              >
                {editingCaseType ? "Guardar Cambios" : "Añadir Tipo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Case Subtype */}
      <Dialog open={isCaseSubtypeDialogOpen} onOpenChange={setIsCaseSubtypeDialogOpen}>
        <DialogContent className="w-full max-w-md bg-amity-gray border border-amity-gray-light p-6 rounded-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {editingCaseSubtype ? "Editar Subtipo de Caso" : `Añadir Subtipo a "${currentCaseTypeForSubtypes?.name}"`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCaseSubtype} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="caseSubtypeName" className="text-white">
                Nombre del Subtipo de Caso
              </Label>
              <Input
                id="caseSubtypeName"
                value={caseSubtypeName}
                onChange={(e) => setCaseSubtypeName(e.target.value)}
                required
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCaseSubtypeDialogOpen(false)}
                className="text-aslegal-gray-light hover:text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
              >
                {editingCaseSubtype ? "Guardar Cambios" : "Añadir Subtipo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Document Type */}
      <Dialog open={isDocumentTypeDialogOpen} onOpenChange={setIsDocumentTypeDialogOpen}>
        <DialogContent className="w-full max-w-md bg-amity-gray border border-amity-gray-light p-6 rounded-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {editingDocumentType ? "Editar Tipo de Documento" : "Añadir Nuevo Tipo de Documento"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveDocumentType} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="documentTypeName" className="text-white">
                Nombre del Tipo de Documento
              </Label>
              <Input
                id="documentTypeName"
                value={documentTypeName}
                onChange={(e) => setDocumentTypeName(e.target.value)}
                required
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDocumentTypeDialogOpen(false)}
                className="text-aslegal-gray-light hover:text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
              >
                {editingDocumentType ? "Guardar Cambios" : "Añadir Tipo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Document Subtype */}
      <Dialog open={isDocumentSubtypeDialogOpen} onOpenChange={setIsDocumentSubtypeDialogOpen}>
        <DialogContent className="w-full max-w-md bg-amity-gray border border-amity-gray-light p-6 rounded-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {editingDocumentSubtype
                ? "Editar Subtipo de Documento"
                : `Añadir Subtipo a "${currentDocumentTypeForSubtypes?.name}"`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveDocumentSubtype} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="documentSubtypeName" className="text-white">
                Nombre del Subtipo de Documento
              </Label>
              <Input
                id="documentSubtypeName"
                value={documentSubtypeName}
                onChange={(e) => setDocumentSubtypeName(e.target.value)}
                required
                className="bg-amity-gray-light border border-amity-gray-light/50 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDocumentSubtypeDialogOpen(false)}
                className="text-aslegal-gray-light hover:text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
              >
                {editingDocumentSubtype ? "Guardar Cambios" : "Añadir Subtipo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
