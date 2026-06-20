# Grupo Castañeda — Design Reference

## Paleta de colores

| Token                | Valor                        | Uso                              |
|----------------------|------------------------------|----------------------------------|
| `--color-navy`       | `#1A2B4A`                    | Primario, fondos oscuros, texto  |
| `--color-gold`       | `#C89A3C`                    | Acento, CTA highlights, íconos   |
| `--color-cream`      | `#F5F2EC`                    | Fondo claro principal            |
| `--color-beige`      | `#E5E0D6`                    | Separadores, fondos secundarios  |
| `--color-terra`      | `#B85C3A`                    | Eyebrow texto, alertas visuales  |
| `--color-text`       | `#3A3A38`                    | Texto cuerpo                     |
| `--color-muted`      | `#5F5E5A`                    | Texto secundario, labels         |

## Tipografía

- **Serif**: Playfair Display (Google Fonts) — headings, números grandes, citas
- **Sans**: Inter (Google Fonts) — body text, labels, UI
- Escala modular definida en `--text-xs` hasta `--text-5xl`

## Principios de diseño

1. **Austeridad premium**: espacio en blanco generoso, menos es más
2. **Jerarquía clara**: heading serif + body sans siempre con contraste legible
3. **Oro como acento escaso**: nunca rellenar fondos con gold — solo detalles, líneas, números
4. **Bordes hairline**: `0.5px solid` — nunca `1px` para bordes decorativos
5. **Motion suave**: GSAP power3.out, duración 0.7–0.9s, stagger 80ms
6. **Nunca scale(0)** en animaciones — siempre opacity + translateY/X

## Convención de animaciones

```
[data-reveal]       → opacity:0 + translateY(24px) → animado por GSAP en scroll
[data-reveal-left]  → opacity:0 + translateX(-32px) → animado por GSAP en scroll
[data-stagger]      → aplica stagger a hijos directos
[data-counter]      → contador animado, con data-prefix y data-suffix
```

## Componentes globales

- `.eyebrow` — Playfair italic, color terra, uppercase
- `.label` — Inter xs, uppercase, letra-spacing 0.12em
- `.gold-line` — 40px × 2px, background gold
- `.btn--primary` — navy background, white text
- `.btn--outline` — transparent, navy border
- `.btn--ghost-dark` — transparent, white border (para fondos navy)

## Hero pattern

Fondo navy + grain texture sutil + círculo decorativo con borde gold opacity 0.12.
Heading con `<em>` en gold para frase clave.

## Secciones oscuras

Siempre `background: var(--color-navy)`. Usar `btn--ghost-dark` para CTAs en fondos dark.

## Responsive breakpoints

- `1024px`: colapsar grids de 2 columnas, sticky positions → static
- `768px`: stack vertical, ocultar elementos decorativos, centrar textos en CTAs
