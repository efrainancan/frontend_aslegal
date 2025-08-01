import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, FileText, Users, TrendingUp, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-amity-dark border border-white/10 rounded-2xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-white">Casos Activos</CardTitle>
            <Briefcase className="h-6 w-6 text-amity-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-amity-neon-blue">12</div>
            <p className="text-sm text-amity-gray-light">Último caso añadido hace 2 días</p>
          </CardContent>
        </Card>

        <Card className="bg-amity-dark border border-white/10 rounded-2xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-white">Documentos Generados</CardTitle>
            <FileText className="h-6 w-6 text-amity-neon-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-amity-neon-purple">85</div>
            <p className="text-sm text-amity-gray-light">3 nuevos hoy</p>
          </CardContent>
        </Card>

        <Card className="bg-amity-dark border border-white/10 rounded-2xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-white">Usuarios Registrados</CardTitle>
            <Users className="h-6 w-6 text-amity-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-amity-neon-blue">24</div>
            <p className="text-sm text-amity-gray-light">2 nuevos esta semana</p>
          </CardContent>
        </Card>

        <Card className="bg-amity-dark border border-white/10 rounded-2xl shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-white">Indicadores de Rendimiento</CardTitle>
            <TrendingUp className="h-6 w-6 text-amity-neon-green" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">Resolución Promedio</span>
                <Badge className="bg-amity-neon-green text-white">2 días</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">Documentos Pendientes</span>
                <Badge className="bg-amity-neon-orange text-white">10</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">Casos en Revisión</span>
                <Badge className="bg-amity-neon-yellow text-white">5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="bg-amity-dark border border-white/10 rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-4">Actividad Reciente</h2>
          <ul className="space-y-3 text-amity-gray-light">
            <li>
              <span className="font-semibold text-white">Nuevo caso:</span> "Disputa Comercial XYZ" creado por Juan
              Pérez.
            </li>
            <li>
              <span className="font-semibold text-white">Documento generado:</span> "Contrato de Servicios" para Caso
              #123.
            </li>
            <li>
              <span className="font-semibold text-white">Usuario registrado:</span> María García se unió a la
              plataforma.
            </li>
            <li>
              <span className="font-semibold text-white">Caso actualizado:</span> "Reclamación de Propiedad" en fase de
              revisión.
            </li>
          </ul>
        </Card>

        <Card className="bg-amity-dark border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas ayuda?</h2>
          <p className="text-amity-gray-light mb-6">Explora nuestra base de conocimientos o contacta con soporte.</p>
          <Button className="bg-gradient-to-r from-amity-neon-blue to-amity-neon-purple text-white font-bold rounded-lg shadow-lg hover:shadow-amity-neon-blue/50 transition-all duration-300">
            Contactar Soporte
          </Button>
        </Card>
      </div>

      <Button className="fixed bottom-6 right-6 bg-gradient-to-r from-amity-neon-blue to-amity-neon-purple text-white font-bold rounded-full p-4 shadow-lg hover:shadow-amity-neon-blue/50 transition-all duration-300 flex items-center justify-center w-16 h-16">
        <Plus className="h-8 w-8" />
        <span className="sr-only">Crear Caso</span>
      </Button>
    </div>
  )
}
