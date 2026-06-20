# Grupo Castañeda — Product Brief

## Qué es
Sitio web institucional multi-página para Grupo Castañeda, estudio de outsourcing contable integral en Lima, Perú. No tiene CMS ni edición por parte del cliente — es un sitio estático optimizado para SEO y conversión.

## Objetivo principal
Convertir visitas orgánicas y referencias en consultas de contacto. El CTA principal es siempre el formulario de contacto (`#contacto` en el Home).

## Páginas
- `/` — Home: propuesta de valor, servicios, beneficios clave, testimonio destacado, CTA, formulario de contacto
- `/beneficios` — Página de beneficios detallada: comparativa, 8 beneficios con detalle, perfiles de cliente ideal
- `/testimonios` — Social proof: testimonios reales, sectores atendidos, mini stats

## Stack
- **Astro** (static site generator, sin JS innecesario)
- **GSAP + ScrollTrigger** (animaciones de entrada, contadores)
- **Lenis** (smooth scroll)
- **Formspree** (formulario de contacto sin backend)
- **Vercel** (hosting, dominio: grupocastaneda.pe)

## Audiencia
Empresarios y gerentes de MYPES y empresas medianas en Lima que buscan cambiar o contratar un servicio de contabilidad/outsourcing. No técnicos. Leen rápido, deciden despacio.

## Tono de marca
Serio, confiable, cercano. No frío corporativo. No jerga contable excesiva. Lenguaje de empresario a empresario.

## Formulario de contacto
Formspree. ID pendiente de configurar: reemplazar `YOUR_FORM_ID` en `src/pages/index.astro`.

## Idioma
Español peruano. Todo el copy, labels, mensajes de error, aria-labels — en español peruano.
