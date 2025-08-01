"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Download, FileText, X, Bold, Italic, List, AlignLeft, FileDown } from "lucide-react"

interface DocumentEditorProps {
  documentType: string
  documentSubtype: string
  involvedParties: Array<{
    id: number
    name: string
    role: string
    identification: string
  }>
  onClose: () => void
  onSave?: (documentData: any) => void
}

export function DocumentEditor({
  documentType,
  documentSubtype,
  involvedParties,
  onClose,
  onSave,
}: DocumentEditorProps) {
  const [documentTitle, setDocumentTitle] = useState(`${documentSubtype} - ${new Date().toLocaleDateString()}`)
  const [documentContent, setDocumentContent] = useState(generateInitialContent())
  const [isSaving, setIsSaving] = useState(false)
  const [isExportingHTML, setIsExportingHTML] = useState(false)
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Generar contenido inicial basado en el tipo de documento
  function generateInitialContent() {
    const today = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const partiesText = involvedParties
      .map((party) => `${party.role}: ${party.name}, identificado con ${party.identification}`)
      .join("\n")

    return `${documentSubtype.toUpperCase()}

Fecha: ${today}

PARTES INVOLUCRADAS
${partiesText}

ANTECEDENTES

En la ciudad de [CIUDAD], a ${today}, comparecen las partes mencionadas con el objeto de [DESCRIBIR PROPÓSITO DEL DOCUMENTO].

CLÁUSULAS

PRIMERA: [Describir primera cláusula del documento]

SEGUNDA: [Describir segunda cláusula del documento]

TERCERA: [Describir tercera cláusula del documento]

DISPOSICIONES FINALES

Para todos los efectos legales derivados del presente documento, las partes se someten a la jurisdicción de los tribunales competentes de [JURISDICCIÓN].

FIRMAS

${involvedParties
  .map(
    (party) => `
_________________________
${party.name}
${party.role}
${party.identification}
`,
  )
  .join("\n")}

Fecha: ${today}`
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const documentData = {
        title: documentTitle,
        content: documentContent,
        type: documentType,
        subtype: documentSubtype,
        involvedParties,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Simular guardado (aquí integrarías con tu API)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (onSave) {
        onSave(documentData)
      }

      alert("Documento guardado exitosamente")
    } catch (error) {
      alert("Error al guardar el documento")
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportToHTML = async () => {
    setIsExportingHTML(true)
    try {
      // Crear contenido HTML para el PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${documentTitle}</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              line-height: 1.8;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              background: white;
            }
            h1 {
              color: #D4AF37;
              text-align: center;
              font-size: 24px;
              margin-bottom: 30px;
              border-bottom: 2px solid #D4AF37;
              padding-bottom: 10px;
            }
            h2 {
              color: #D4AF37;
              font-size: 18px;
              margin-top: 30px;
              margin-bottom: 15px;
              border-bottom: 1px solid #D4AF37;
              padding-bottom: 5px;
            }
            p {
              margin-bottom: 15px;
              text-align: justify;
            }
            .signatures {
              margin-top: 50px;
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
            }
            .signature-block {
              text-align: center;
              margin: 20px;
              min-width: 200px;
            }
            .signature-line {
              border-top: 1px solid #333;
              margin-bottom: 5px;
              padding-top: 5px;
            }
            pre {
              white-space: pre-wrap;
              font-family: 'Times New Roman', serif;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <pre>${documentContent}</pre>
        </body>
        </html>
      `

      // Crear un blob con el contenido HTML
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Crear un enlace temporal para descargar
      const link = document.createElement("a")
      link.href = url
      link.download = `${documentTitle}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      alert("Documento exportado como HTML exitosamente.")
    } catch (error) {
      alert("Error al exportar el documento")
      console.error(error)
    } finally {
      setIsExportingHTML(false)
    }
  }

  const handleExportToPDF = async () => {
    setIsExportingPDF(true)
    try {
      // Crear contenido HTML optimizado para PDF
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${documentTitle}</title>
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              font-family: 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              margin: 0;
              padding: 0;
              background: white;
            }
            .document-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #D4AF37;
              padding-bottom: 15px;
            }
            .document-title {
              font-size: 18pt;
              font-weight: bold;
              color: #D4AF37;
              margin-bottom: 10px;
            }
            .document-date {
              font-size: 10pt;
              color: #666;
            }
            .section-title {
              font-size: 14pt;
              font-weight: bold;
              color: #D4AF37;
              margin-top: 25px;
              margin-bottom: 10px;
              border-bottom: 1px solid #D4AF37;
              padding-bottom: 3px;
            }
            .content {
              white-space: pre-wrap;
              text-align: justify;
              margin-bottom: 15px;
            }
            .signatures {
              margin-top: 50px;
              page-break-inside: avoid;
            }
            .signature-block {
              display: inline-block;
              text-align: center;
              margin: 20px 30px;
              min-width: 200px;
              vertical-align: top;
            }
            .signature-line {
              border-top: 1px solid #000;
              margin-bottom: 5px;
              padding-top: 5px;
              font-size: 10pt;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="document-header">
            <div class="document-title">${documentTitle}</div>
            <div class="document-date">${new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</div>
          </div>
          <div class="content">${documentContent}</div>
        </body>
        </html>
      `

      // Crear un blob con el contenido HTML
      const blob = new Blob([pdfContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Abrir en una nueva ventana para imprimir
      const printWindow = window.open(url, "_blank")

      if (printWindow) {
        printWindow.onload = () => {
          // Esperar un momento para que se cargue completamente
          setTimeout(() => {
            printWindow.print()
            // Opcional: cerrar la ventana después de imprimir
            printWindow.onafterprint = () => {
              printWindow.close()
              URL.revokeObjectURL(url)
            }
          }, 500)
        }

        alert("Se abrirá una ventana de impresión. Selecciona 'Guardar como PDF' como destino.")
      } else {
        // Fallback si no se puede abrir la ventana
        const link = document.createElement("a")
        link.href = url
        link.download = `${documentTitle}_para_PDF.html`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        alert("Archivo descargado. Ábrelo en tu navegador e imprime como PDF.")
      }
    } catch (error) {
      alert("Error al generar el PDF")
      console.error(error)
    } finally {
      setIsExportingPDF(false)
    }
  }

  // Funciones de formato de texto
  const insertTextAtCursor = (text: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentContent = documentContent

    const newContent = currentContent.substring(0, start) + text + currentContent.substring(end)
    setDocumentContent(newContent)

    // Restaurar la posición del cursor
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const wrapSelectedText = (prefix: string, suffix: string = prefix) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = documentContent.substring(start, end)

    if (selectedText) {
      const wrappedText = prefix + selectedText + suffix
      const newContent = documentContent.substring(0, start) + wrappedText + documentContent.substring(end)
      setDocumentContent(newContent)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + prefix.length, end + prefix.length)
      }, 0)
    }
  }

  const formatBold = () => wrapSelectedText("**", "**")
  const formatItalic = () => wrapSelectedText("*", "*")
  const insertBulletPoint = () => insertTextAtCursor("\n• ")
  const insertNumberedPoint = () => insertTextAtCursor("\n1. ")

  return (
    <div className="fixed inset-0 z-50 bg-amity-dark/95 backdrop-blur-sm flex items-center justify-center p-2">
      <Card className="w-full max-w-none h-[90vh] bg-amity-gray border border-amity-gray-light rounded-2xl shadow-2xl flex flex-col mx-4">
        <CardHeader className="border-b border-amity-gray-light/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amity-gold/10 rounded-lg">
                <FileText className="h-6 w-6 text-amity-gold" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-amity-text">Editor de Documentos</CardTitle>
                <p className="text-amity-text-muted text-sm">
                  {documentType} - {documentSubtype}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-amity-text-muted hover:text-amity-text hover:bg-amity-gray-light/50"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
          {/* Título del documento */}
          <div className="flex-shrink-0">
            <Label htmlFor="documentTitle" className="text-amity-text font-medium">
              Título del Documento
            </Label>
            <Input
              id="documentTitle"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="mt-2 bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
            />
          </div>

          {/* Barra de herramientas de formato */}
          <div className="flex-shrink-0 flex gap-2 p-2 bg-amity-gray-light rounded-lg border border-amity-gray-light/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={formatBold}
              className="text-amity-text hover:bg-amity-gold/20 hover:text-amity-gold"
              title="Negrita (selecciona texto y haz clic)"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={formatItalic}
              className="text-amity-text hover:bg-amity-gold/20 hover:text-amity-gold"
              title="Cursiva (selecciona texto y haz clic)"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertBulletPoint}
              className="text-amity-text hover:bg-amity-gold/20 hover:text-amity-gold"
              title="Lista con viñetas"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertNumberedPoint}
              className="text-amity-text hover:bg-amity-gold/20 hover:text-amity-gold"
              title="Lista numerada"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Editor de contenido */}
          <div className="flex-1 flex flex-col min-h-0">
            <Label className="text-amity-text font-medium mb-2">Contenido del Documento</Label>
            <Textarea
              ref={textareaRef}
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              className="flex-1 min-h-[400px] bg-white text-gray-900 border border-amity-gray-light/50 focus-visible:ring-amity-gold rounded-lg font-mono text-sm leading-relaxed resize-none"
              placeholder="Escribe el contenido de tu documento aquí..."
            />
            <p className="text-xs text-amity-text-muted mt-2">
              Tip: Selecciona texto y usa los botones de formato. Usa ** para negrita y * para cursiva.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex-shrink-0 flex justify-end gap-4 pt-4 border-t border-amity-gray-light/20">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-amity-gray-light/50 text-amity-text hover:bg-amity-gray-light/50 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amity-gold hover:bg-amity-gold-dark text-amity-dark font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amity-dark mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
            <Button
              onClick={handleExportToHTML}
              disabled={isExportingHTML}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isExportingHTML ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar HTML
                </>
              )}
            </Button>
            <Button
              onClick={handleExportToPDF}
              disabled={isExportingPDF}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-700 hover:to-red-800"
            >
              {isExportingPDF ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generando PDF...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4 mr-2" />
                  Exportar PDF
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
