"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, PlusCircle, XCircle } from "lucide-react"
import { initialDocumentTypes as documentTypes, INVOLVED_ROLES } from "@/lib/data"
import { DocumentEditor } from "./document-editor"

interface InvolvedParty {
  id: number
  name: string
  role: (typeof INVOLVED_ROLES)[number] | ""
  identification: string
}

interface CreateDocumentWizardProps {
  onClose: () => void
}

export function CreateDocumentWizard({ onClose }: CreateDocumentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDocumentTypeId, setSelectedDocumentTypeId] = useState<string | null>(null)
  const [selectedSubtypeId, setSelectedSubtypeId] = useState<string | null>(null)
  const [involvedParties, setInvolvedParties] = useState<InvolvedParty[]>([
    { id: 1, name: "", role: "", identification: "" },
  ])
  const [nextPartyId, setNextPartyId] = useState(2)
  const [showEditor, setShowEditor] = useState(false)

  const selectedDocumentType = documentTypes.find((type) => type.id === selectedDocumentTypeId)
  const selectedSubtype = selectedDocumentType?.subtypes.find((subtype) => subtype.id === selectedSubtypeId)

  const handleAddParty = () => {
    setInvolvedParties([...involvedParties, { id: nextPartyId, name: "", role: "", identification: "" }])
    setNextPartyId(nextPartyId + 1)
  }

  const handleRemoveParty = (id: number) => {
    setInvolvedParties(involvedParties.filter((party) => party.id !== id))
  }

  const handlePartyChange = (id: number, field: keyof InvolvedParty, value: string) => {
    setInvolvedParties(involvedParties.map((party) => (party.id === id ? { ...party, [field]: value } : party)))
  }

  const isStep3Valid = involvedParties.every(
    (party) => party.name.trim() !== "" && party.role.trim() !== "" && party.identification.trim() !== "",
  )

  const handleNext = () => {
    if (currentStep === 1 && selectedDocumentTypeId) {
      setCurrentStep(2)
    } else if (currentStep === 2 && selectedSubtypeId) {
      setCurrentStep(3)
    } else if (currentStep === 3 && isStep3Valid) {
      // En lugar de mostrar un alert, abrir el editor
      setShowEditor(true)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleEditorClose = () => {
    setShowEditor(false)
    onClose() // Cerrar todo el wizard
  }

  const handleDocumentSave = (documentData: any) => {
    console.log("Documento guardado:", documentData)
    // Aquí puedes integrar con tu API para guardar el documento
  }

  // Si se debe mostrar el editor, renderizarlo
  if (showEditor && selectedDocumentType && selectedSubtype) {
    return (
      <DocumentEditor
        documentType={selectedDocumentType.name}
        documentSubtype={selectedSubtype.name}
        involvedParties={involvedParties}
        onClose={handleEditorClose}
        onSave={handleDocumentSave}
      />
    )
  }

  return (
    <div className="flex flex-col h-full p-6 bg-amity-gray text-white">
      <h2 className="text-3xl font-bold mb-6 text-white">Generar Nuevo Documento</h2>

      {currentStep === 1 && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-amity-text-muted">Paso 1: Selecciona el tipo de documento</h3>
          <RadioGroup
            value={selectedDocumentTypeId || ""}
            onValueChange={setSelectedDocumentTypeId}
            className="grid gap-4"
          >
            {documentTypes.map((type) => (
              <Label
                key={type.id}
                htmlFor={type.id}
                className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-amity-gray-light p-4 cursor-pointer hover:border-amity-gold transition-all duration-200 has-[[data-state=checked]]:border-amity-gold has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-amity-gold"
              >
                <RadioGroupItem id={type.id} value={type.id} className="sr-only" />
                <div className="w-full text-lg font-medium text-white">{type.name}</div>
              </Label>
            ))}
          </RadioGroup>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-amity-text-muted">
            Paso 2: Selecciona el subtipo para "{selectedDocumentType?.name}"
          </h3>
          {selectedDocumentType?.subtypes && selectedDocumentType.subtypes.length > 0 ? (
            <RadioGroup value={selectedSubtypeId || ""} onValueChange={setSelectedSubtypeId} className="grid gap-4">
              {selectedDocumentType.subtypes.map((subtype) => (
                <Label
                  key={subtype.id}
                  htmlFor={subtype.id}
                  className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-amity-gray-light p-4 cursor-pointer hover:border-amity-gold transition-all duration-200 has-[[data-state=checked]]:border-amity-gold has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-amity-gold"
                >
                  <RadioGroupItem id={subtype.id} value={subtype.id} className="sr-only" />
                  <div className="w-full text-lg font-medium text-white">{subtype.name}</div>
                </Label>
              ))}
            </RadioGroup>
          ) : (
            <p className="text-amity-text-muted">No hay subtipos disponibles para este tipo de documento.</p>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-amity-text-muted">Paso 3: Datos de los Involucrados</h3>
          <div className="grid gap-6">
            {involvedParties.map((party, index) => (
              <div key={party.id} className="rounded-2xl border border-white/10 bg-amity-gray-light p-4 relative">
                {involvedParties.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveParty(party.id)}
                    className="absolute top-2 right-2 text-amity-text-muted hover:text-destructive"
                  >
                    <XCircle className="h-5 w-5" />
                    <span className="sr-only">Eliminar involucrado</span>
                  </Button>
                )}
                <h4 className="text-lg font-semibold mb-3 text-white">Involucrado {index + 1}</h4>
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor={`party-name-${party.id}`} className="mb-1 block text-white text-sm">
                      Nombre Completo
                    </Label>
                    <Input
                      id={`party-name-${party.id}`}
                      value={party.name}
                      onChange={(e) => handlePartyChange(party.id, "name", e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="bg-transparent border border-white/20 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`party-role-${party.id}`} className="mb-1 block text-white text-sm">
                      Rol
                    </Label>
                    <Select value={party.role} onValueChange={(value) => handlePartyChange(party.id, "role", value)}>
                      <SelectTrigger className="w-full bg-transparent border border-white/20 text-white focus:ring-amity-gold rounded-lg">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent className="bg-amity-gray border border-white/10 text-white">
                        {INVOLVED_ROLES.map((role) => (
                          <SelectItem key={role} value={role} className="hover:bg-amity-gold/20">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`party-id-${party.id}`} className="mb-1 block text-white text-sm">
                      Identificación (DNI/RUT/Pasaporte)
                    </Label>
                    <Input
                      id={`party-id-${party.id}`}
                      value={party.identification}
                      onChange={(e) => handlePartyChange(party.id, "identification", e.target.value)}
                      placeholder="Ej. 12.345.678-9"
                      className="bg-transparent border border-white/20 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              onClick={handleAddParty}
              variant="outline"
              className="w-full border-dashed border-white/30 text-amity-text-muted hover:bg-white/10 hover:text-white transition-colors rounded-2xl bg-transparent"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir otro involucrado
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
        {currentStep > 1 && (
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-amity-text-muted hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !selectedDocumentTypeId) ||
            (currentStep === 2 && !selectedSubtypeId && selectedDocumentType?.subtypes.length > 0) ||
            (currentStep === 3 && !isStep3Valid)
          }
          className="ml-auto bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark font-bold rounded-lg shadow-lg hover:shadow-amity-gold/50 transition-all duration-300"
        >
          {currentStep === 3 ? "Generar Documento" : "Siguiente"} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
