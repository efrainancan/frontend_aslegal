"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { validateRut } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Scale, FileText, Briefcase, CheckCircle, Star, ArrowRight, Shield, Clock, Zap, Award } from "lucide-react"
import React, { useState } from "react";
export default function HomePage() {
  const [visibleId, setVisible] = useState(""); // false = oculto al inicio
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [rut, setRut] = useState("");
  const [rutValido, setRutValido] = useState(true)
  const [errorEmail, setErrorEmail] = useState('');
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");

  const [isMonthly, setIsMonthly] = useState(false); // New state variable

  const handleChangeEmail = (e: any) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    if (inputValue === '') {
      setErrorEmail('Campo requerido.');
    } else if (!validateEmail(inputValue)) {
      setErrorEmail('Por favor ingrese email válido.');
    } else {
      setErrorEmail('');
    }
  }
  const handleChangeFirstName = (event: any) => {
    setFirstName(event.target.value)
    if (event.target.value == '') {
      setErrorFirstName("Campo requerido.")
    }
    else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,40}$/.test(event.target.value)) {
      setErrorFirstName("Nombre inválido (solo letras y 2–40 caracteres).");
    }
    else {
      setErrorFirstName("");
    }
  }
  const handleChangeLastName = (event: any) => {
    setLastName(event.target.value)
    if (event.target.value == '') {
      setErrorLastName("Campo requerido.")
    }
    else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,40}$/.test(event.target.value)) {
      setErrorLastName("Nombre inválido (solo letras y espacios).");
    }
    else {
      setErrorLastName("");
    }
  }
  const handleChangePhone = (event: any) => setPhone(event.target.value)


  const createPay = async (plan: any) => {
    const valido = validateRut(rut)
    setRutValido(valido);
    if (valido == true) {

      const response = await fetch("http://localhost:8000/api/pago/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: plan.name,
          application:"AsLegal",
          type: plan.period,
          email: email,
          plan: plan,
          payer: {
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone: {
              area_code: "56",
              number: phone
            },
            address: {
              street_name: "",
              street_number: "",
              zip_code: "",
              city: ""
            },
            identification: {
              type: "DNI",
              number: rut
            }
          },
          items: [{
            id: plan.id,
            title: plan.name,
            description: plan.description,
            picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
            category_id: "services",
            quantity: 1,
            currency_id: "CLP",
            unit_price: parseInt(plan.price.replaceAll(".",""))
          }]
        }),
      });
      const data = await response.json();
      console.log("Respuesta:", data);
      setTimeout(() => {
        window.location.href = data.url;
      }, 1000);
    }

  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const handleChangeRut = (event: any) => {
    if (event.target.value == '') {
      setRutValido(false)
    }
    setRut(event.target.value)
    const valido = validateRut(event.target.value)
    setRutValido(valido);
  }

  const plans = [
    {
      id:"001",
      name: "Plan Básico",
      price: isMonthly ? "25.000": "240.000",
      period: isMonthly ? "mensual":"anual",
      description: "Perfecto para emprendedores y pequeños negocios",
      features: [
        "Hasta 10 casos por mes",
        "Generación de documentos básicos",
        "Plantillas estándar",
        "Soporte por email",
        "Almacenamiento 5GB",
      ],
      popular: false,
      buttonText: "Comenzar",
      enabled:true
    },
    {
      id:"002",
      name: "Plan Profesional",
      price: isMonthly ? "35.000":"360.000",
      period: isMonthly ? "mensual":"anual",
      description: "Ideal para abogados y estudios jurídicos medianos",
      features: [
        "Casos ilimitados",
        "Documentos avanzados con IA",
        "Plantillas personalizables",
        "Soporte prioritario 24/7",
        "Almacenamiento 50GB",
        "Integración con APIs",
        "Reportes avanzados",
      ],
      popular: false,
      buttonText: "Comenzar",
      enabled:false
    },
    {
      id:"003",
      name: "Plan Empresarial",
      price: isMonthly ? "60.000":"600.000",
      period: "mes",
      description: "Para grandes firmas y corporaciones",
      features: [
        "Todo lo del plan Profesional",
        "Usuarios ilimitados",
        "Personalización completa",
        "Gerente de cuenta dedicado",
        "Almacenamiento ilimitado",
        "Integraciones personalizadas",
        "SLA garantizado",
        "Capacitación del equipo",
      ],
      popular: false,
      buttonText: "Contactar Ventas",
      enabled:false
    },
  ]

  const features = [
    {
      icon: FileText,
      title: "Generación Inteligente de Documentos",
      description: "Crea contratos, demandas y documentos legales con IA avanzada en minutos, no horas.",
    },
    {
      icon: Briefcase,
      title: "Gestión Integral de Casos",
      description: "Organiza, rastrea y gestiona todos tus casos legales desde una plataforma centralizada.",
    },
    {
      icon: Shield,
      title: "Seguridad de Nivel Bancario",
      description: "Tus datos están protegidos con encriptación de extremo a extremo y cumplimiento GDPR.",
    },
    {
      icon: Clock,
      title: "Ahorra 80% del Tiempo",
      description: "Automatiza tareas repetitivas y enfócate en lo que realmente importa: tus clientes.",
    },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Abogada Senior",
      company: "Estudio González & Asociados",
      content: "AsLegal ha revolucionado nuestra práctica. Lo que antes nos tomaba días, ahora lo hacemos en horas.",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      role: "Emprendedor",
      company: "TechStart Chile",
      content: "Como emprendedor, necesitaba documentos legales rápidos y confiables. AsLegal es la solución perfecta.",
      rating: 5,
    },
    {
      name: "Ana Torres",
      role: "Directora Legal",
      company: "Corporación Andina",
      content: "La eficiencia que hemos ganado es increíble. Nuestro equipo legal es ahora 3 veces más productivo.",
      rating: 5,
    },
  ]

  const toggleDiv = (name: string) => {
    if(name=="Plan Empresarial" || name=="Plan Profesional"){
      alert("En construcción")
    }
    else{
      setVisible(visibleId === name ? "" : name); // Cambia entre true y false
    }
    
  };

  const isFormValid = true //email !== "" && firstName !== "" && lastName !== "" && phone !== "" && rut !== "" && errorEmail === "" && errorFirstName === "" && errorLastName === "" && rutValido !== false;

  return (
    <div className="min-h-screen bg-amity-dark">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full bg-amity-dark/95 backdrop-blur-md border-b border-amity-gray-light/20">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-lg group-hover:shadow-lg group-hover:shadow-amity-gold/20 transition-all duration-300">
              <Scale className="h-8 w-8 text-amity-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gold-gradient-text">AsLegal</span>
              <span className="text-xs text-amity-text-muted font-medium">Professional Legal Services</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-amity-text hover:text-amity-gold hover:bg-amity-gray-light/50 transition-all duration-200"
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-amity-gold/10 text-amity-gold border-amity-gold/20 hover:bg-amity-gold/20">
            <Zap className="h-4 w-4 mr-2" />
            Potenciado por Inteligencia Artificial
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            La Revolución Legal
            <span className="block gold-gradient-text">Está Aquí</span>
          </h1>
          <p className="text-xl text-amity-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
            AsLegal transforma la práctica jurídica con IA avanzada. Genera documentos legales, gestiona casos y
            automatiza procesos en una plataforma integral diseñada para el futuro del derecho.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-amity-gold/30 transition-all duration-300 text-lg"
              >
                Regístrese aquí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-amity-gold mb-2">10,000+</div>
              <div className="text-amity-text-muted">Documentos Generados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amity-gold mb-2">500+</div>
              <div className="text-amity-text-muted">Abogados Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amity-gold mb-2">80%</div>
              <div className="text-amity-text-muted">Reducción de Tiempo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-amity-gray/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Por Qué Elegir <span className="gold-gradient-text">AsLegal</span>?
            </h2>
            <p className="text-xl text-amity-text-muted max-w-3xl mx-auto">
              Descubre las características que están transformando la manera en que los profesionales legales trabajan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="professional-card border border-amity-gray-light/20 bg-amity-gray/50 hover:bg-amity-gray/70 transition-all duration-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-amity-gold/20 to-amity-gold-light/20 rounded-xl w-fit">
                    <feature.icon className="h-8 w-8 text-amity-gold" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amity-text-muted text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Planes que se Adaptan a <span className="gold-gradient-text">Tu Práctica</span>
            </h2>
            <p className="text-xl text-amity-text-muted max-w-3xl mx-auto">
              Desde emprendedores hasta grandes corporaciones, tenemos el plan perfecto para ti
            </p>
            {/* Monthly/Annual Toggle Buttons */}
            <div className="flex justify-center mb-3 mt-5">
              <Button
                onClick={() => setIsMonthly(true)}
                className={`ml-3 px-6 py-2 rounded-l-lg transition-colors duration-200 ${isMonthly ? "bg-amity-gold text-amity-dark font-bold" : "bg-amity-gray-light text-amity-text"
                  }`}
              >
                Mensual
              </Button>
              <Button
                onClick={() => setIsMonthly(false)}
                className={`ml-3 px-6 py-2 rounded-r-lg transition-colors duration-200 ${!isMonthly ? "bg-amity-gold text-amity-dark font-bold" : "bg-amity-gray-light text-amity-text"
                  }`}
              >
                Anual
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`professional-card relative ${plan.popular
                    ? "border-2 border-amity-gold shadow-2xl shadow-amity-gold/20 scale-105"
                    : "border border-amity-gray-light/20"
                  } bg-amity-gray/50 hover:bg-amity-gray/70 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark font-bold px-4 py-1">
                      <Award className="h-4 w-4 mr-1" />
                      Más Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  {visibleId !== plan.name && (
                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>)}
                  {visibleId !== plan.name && (
                    <div className="mb-4">

                      <span className="text-4xl font-bold text-amity-gold">$ {plan.price}</span>
                      <span className="text-amity-text-muted">/{plan.period} </span>
                    </div>
                  )}
                  {visibleId !== plan.name && (<p className="text-amity-text-muted">{plan.description}</p>)}

                </CardHeader>

                <CardContent className="space-y-6">
                  {visibleId !== plan.name && (
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-amity-gold flex-shrink-0" />
                          <span className="text-amity-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {visibleId !== plan.name && (
                    <Button onClick={() => toggleDiv(plan.name)}
                      className={`w-full py-3 font-bold rounded-lg transition-all duration-300 ${plan.popular
                          ? "bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark shadow-lg hover:shadow-xl"
                          : "bg-amity-gray-light text-amity-text hover:bg-amity-gold hover:text-amity-dark"
                        }`}
                    >
                      {plan.buttonText}
                    </Button>
                  )}
                  {visibleId === plan.name && (
                    <CardContent className="space-y-6">
                      <p className="text-amity-text-muted">Datos de pago</p>

                      <Input id="name" type="email" value={email} onChange={handleChangeEmail} placeholder="Correo electrónico"
                        className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                      />
                      {errorEmail !== '' && <Label className="text-red-500">{errorEmail}</Label>}
                      <Input id="name" type="text" value={firstName} onChange={handleChangeFirstName} placeholder="Nombre"
                        className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                      />
                      {errorFirstName !== '' && <Label className="text-red-500">{errorFirstName}</Label>}
                      <Input id="name" type="text" value={lastName} onChange={handleChangeLastName} placeholder="Apellido"
                        className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                      />
                      {errorLastName !== '' && <Label className="text-red-500">{errorLastName}</Label>}
                      <Input id="name" type="number" value={phone} onChange={handleChangePhone} placeholder="Teléfono"
                        className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                      />
                      <Input id="name" type="text" value={rut} onChange={handleChangeRut} placeholder="RUT"
                        className="bg-amity-gray-light border border-amity-gray-light/50 text-amity-text placeholder:text-amity-text-muted focus-visible:ring-amity-gold"
                      />
                      {!rutValido && (
                        <Label className="text-red-500">
                          Ingrese un rut válido
                        </Label>
                      )}

                      <Button onClick={() => createPay(plan)}
                        disabled={!isFormValid}
                        className={`w-full py-3 font-bold rounded-lg transition-all duration-300 ${isFormValid
                            ? "bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark shadow-lg hover:shadow-xl"
                            : "bg-amity-gray-light text-amity-text hover:bg-amity-gold hover:text-amity-dark"
                          }`}
                      >
                        Pagar
                      </Button>
                    </CardContent>
                  )}


                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-amity-gray/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lo Que Dicen Nuestros <span className="gold-gradient-text">Clientes</span>
            </h2>
            <p className="text-xl text-amity-text-muted max-w-3xl mx-auto">
              Más de 500 profesionales legales confían en AsLegal para transformar su práctica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="professional-card border border-amity-gray-light/20 bg-amity-gray/50">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amity-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-amity-text mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-amity-text-muted text-sm">{testimonial.role}</div>
                    <div className="text-amity-gold text-sm">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Revolucionar tu <span className="gold-gradient-text">Práctica Legal</span>?
          </h2>
          <p className="text-xl text-amity-text-muted mb-8 max-w-3xl mx-auto">
            Únete a cientos de profesionales que ya están transformando su manera de trabajar con AsLegal
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amity-gold to-amity-gold-light text-amity-dark font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-amity-gold/30 transition-all duration-300 text-lg"
              >
                Comenzar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amity-gold text-amity-gold hover:bg-amity-gold hover:text-amity-dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-transparent"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amity-darker py-12 px-6 border-t border-amity-gray-light/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-amity-gold to-amity-gold-light rounded-lg">
                <Scale className="h-6 w-6 text-amity-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gold-gradient-text">AsLegal</span>
                <span className="text-xs text-amity-text-muted">Professional Legal Services</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-amity-text-muted mb-2">© 2024 AsLegal. Todos los derechos reservados.</p>
              <div className="flex gap-6 justify-center md:justify-end text-sm">
                <Link href="#" className="text-amity-text-muted hover:text-amity-gold transition-colors">
                  Términos de Servicio
                </Link>
                <Link href="#" className="text-amity-text-muted hover:text-amity-gold transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="#" className="text-amity-text-muted hover:text-amity-gold transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
