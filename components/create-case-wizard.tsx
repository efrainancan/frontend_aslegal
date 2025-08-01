"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { initialCaseTypes as caseTypes } from "@/lib/data" // Importar desde lib/data.ts

interface CreateCaseWizardProps {
  onClose: () => void
}

export function CreateCaseWizard({ onClose }: CreateCaseWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCaseTypeId, setSelectedCaseTypeId] = useState<string | null>(null)
  const [selectedSubtypeId, setSelectedSubtypeId] = useState<string | null>(null)
  const [caseName, setCaseName] = useState("")
  const [caseDescription, setCaseDescription] = useState("")

  const selectedCaseType = caseTypes.find((type) => type.id === selectedCaseTypeId)
  const selectedSubtype = selectedCaseType?.subtypes.find((subtype) => subtype.id === selectedSubtypeId)

  const handleNext = () => {
    if (currentStep === 1 && selectedCaseTypeId) {
      setCurrentStep(2)
    } else if (currentStep === 2 && selectedSubtypeId) {
      setCurrentStep(3)
    } else if (currentStep === 3 && caseName.trim() !== "" && caseDescription.trim() !== "") {
      alert(
        `Caso creado:\nTipo: ${selectedCaseType?.name}\nSubtipo: ${selectedSubtype?.name}\nNombre: ${caseName}\nDescripción: ${caseDescription}`,
      )
      onClose() // Cierra el asistente al finalizar
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <div className="flex flex-col h-full max-h-full p-6 bg-amity-gray text-white">
      <h2 className="text-3xl font-bold mb-6 text-white">Crear Nuevo Caso</h2>

      {currentStep === 1 && (
        <div className="flex-1 overflow-y-auto pr-2">
          <h3 className="text-xl font-semibold mb-4 text-amity-text-muted">Paso 1: Selecciona el tipo de caso</h3>
          <RadioGroup value={selectedCaseTypeId || ""} onValueChange={setSelectedCaseTypeId} className="grid gap-4">
            {caseTypes.map((type) => (
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
        <div className="flex-1 overflow-y-auto pr-2">
          <h3 className="text-xl font-semibold mb-4 text-amity-text-muted">
            Paso 2: Selecciona el subtipo para "{selectedCaseType?.name}"
          </h3>
          {selectedCaseType?.subtypes && selectedCaseType.subtypes.length > 0 ? (
            <RadioGroup value={selectedSubtypeId || ""} onValueChange={setSelectedSubtypeId} className="grid gap-4">
              {selectedCaseType.subtypes.map((subtype) => (
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
            <p className="text-amity-text-muted">No hay subtipos disponibles para este tipo de caso.</p>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex-1 overflow-y-auto pr-2">
          <h3 className="text-xl font-semibold mb-4 text-amity-text-muted">Paso 3: Detalles del Caso</h3>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="caseName" className="mb-2 block text-white">
                Nombre del Caso
              </Label>
              <Input
                id="caseName"
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                placeholder="Ej. Demanda por despido injustificado"
                className="bg-amity-gray-light border border-white/10 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="caseDescription" className="mb-2 block text-white">
                Descripción
              </Label>
              <Textarea
                id="caseDescription"
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                placeholder="Describe brevemente el caso y los detalles relevantes."
                className="bg-amity-gray-light border border-white/10 text-white placeholder:text-amity-text-muted focus-visible:ring-amity-gold rounded-lg min-h-[120px]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex-shrink-0 flex justify-between mt-6 pt-4 border-t border-white/10">
        {currentStep > 1 && (
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-aslegal-gray-light hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !selectedCaseTypeId) ||
            (currentStep === 2 && !selectedSubtypeId && selectedCaseType?.subtypes.length > 0) ||
            (currentStep === 3 && (caseName.trim() === "" || caseDescription.trim() === ""))
          }
          className="ml-auto bg-gradient-to-r from-aslegal-neon-blue to-aslegal-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-aslegal-neon-blue/50 transition-all duration-300"
        >
          {currentStep === 3 ? "Finalizar" : "Siguiente"} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
