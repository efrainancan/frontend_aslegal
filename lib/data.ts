export interface CaseType {
  id: string
  name: string
  subtypes: CaseSubtype[]
}

export interface CaseSubtype {
  id: string
  name: string
}

export interface DocumentType {
  id: string
  name: string
  subtypes: DocumentSubtype[]
}

export interface DocumentSubtype {
  id: string
  name: string
}

export const initialCaseTypes: CaseType[] = [
  {
    id: "laborales",
    name: "Laborales",
    subtypes: [
      {
        id: "denuncias-por-despido-injustificado",
        name: "Denuncias por despido injustificado o no pago de cotizaciones",
      },
      { id: "contrato-de-trabajo-individual", name: "Contrato de trabajo individual" },
      { id: "carta-de-aviso-de-despido", name: "Carta de aviso de despido (Art. 161, 160, etc.)" },
      { id: "finiquitos-formato-base", name: "Finiquitos (formato base)" },
      {
        id: "asistencia-en-presentacion-de-reclamos",
        name: "Asistencia en presentación de reclamos ante la Dirección del Trabajo",
      },
    ],
  },
  {
    id: "cobranza-y-ejecucion",
    name: "Cobranza y ejecución",
    subtypes: [{ id: "factura-impaga", name: "Factura impaga" }],
  },
  {
    id: "propiedad-intelectual-y-marcas",
    name: "Propiedad Intelectual y Marcas",
    subtypes: [{ id: "registro-de-marca", name: "Registro de marca" }],
  },
  {
    id: "constitucion-y-estructura-de-empresa",
    name: "Constitución y estructura de empresa",
    subtypes: [{ id: "sociedad-por-acciones", name: "Sociedad por acciones" }],
  },
  {
    id: "derecho-del-consumidor",
    name: "Derecho del consumidor",
    subtypes: [{ id: "producto-defectuoso", name: "Producto defectuoso" }],
  },
  {
    id: "familia-nivel-basico-automatizable",
    name: "Familia (nivel básico automatizable)",
    subtypes: [{ id: "divorcio", name: "Divorcio" }],
  },
]

export const initialDocumentTypes: DocumentType[] = [
  {
    id: "contratos-y-acuerdos",
    name: "Contratos y acuerdos",
    subtypes: [{ id: "contrato-de-arrendamiento", name: "Contrato de arrendamiento (vivienda, local comercial)" }],
  },
  {
    id: "documentos-judiciales",
    name: "Documentos judiciales",
    subtypes: [{ id: "demanda-o-querella", name: "Demanda o querella" }],
  },
  {
    id: "documentos-personales-y-familiares",
    name: "Documentos personales y familiares",
    subtypes: [{ id: "poder-notarial", name: "Poder notarial (general o específico)" }],
  },
]

export const INVOLVED_ROLES = [
  "Arrendador",
  "Arrendatario",
  "Comprador",
  "Vendedor",
  "Mandante",
  "Mandatario",
  "Demandante",
  "Demandado",
  "Deudor",
  "Acreedor",
  "Socio",
  "Representante Legal",
]
