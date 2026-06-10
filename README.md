# Torneo Gamer Americana 2026

Evento PRO STUDIATON — Sitio web informativo del torneo interuniversitario con 5 videojuegos de competición, desarrollado bajo el sistema de diseño **Cyber-Industrial Solidary**.

## Stack técnico

- **Vite 8** — Bundler y dev server con HMR
- **HTML5 semántico** — Estructura section/header/main/footer con atributos ARIA
- **CSS3 puro** — Custom properties, grid, animations, clip-path, backdrop-filter
- **JavaScript nativo** — IntersectionObserver para scroll reveals, no dependencias

Sin frameworks de UI ni librerías externas. Todo el código es vanilla.

## Diseño

### Sistema de color

| Variable | Hex | Uso |
|---|---|---|
| `--color-primary` | `#EAFF00` | Acciones principales, glows, highlights |
| `--color-secondary` | `#00F2FF` | Detalles técnicos, badges, tags |
| `--color-scanner-teal` | `#004D4D` | Scanner bars, timelines, bordes de reglas |
| `--color-surface` | `#0B1326` | Fondo principal (deep void) |
| `--color-surface-container` | `#171F33` | Tarjetas y contenedores |

Paleta completa en `src/style.css` (`:root`, líneas 8–54).

### Tipografía

| Estilo | Fuente | Uso |
|---|---|---|
| Display | Anybody (Google Fonts) | Títulos, headers, botones, nombres de juegos |
| Body | Geist (Google Fonts) | Descripciones, párrafos |
| Mono | JetBrains Mono (Google Fonts) | Etiquetas, tags, datos, timeline |

Cargadas desde Google Fonts con `preconnect` y `display=swap`.

### Layout

- **Desktop (1025px+)**: 12-column grid implícito, 64px padding lateral
- **Tablet (769–1024px)**: 2-column grids, 32px padding
- **Mobile (480–768px)**: 1-column, navbar colapsable con trigger hamburguesa
- **Breakpoint adicional (375–480px)**: Tipografía reducida, botones full-width

## Animaciones y efectos

- **Scanlines**: Overlay fijo con `repeating-linear-gradient` animado verticalmente, opacidad 2%
- **Data stream**: Columna binaria en borde derecho con scroll infinito, opacidad 4%
- **Glitch real en hero**: 4 capas superpuestas (rojo, cyan, amarillo neón, flash blanco) con animaciones simultáneas de translate ±10px, skew, clip-path slices horizontales. Ciclo base cada 5s con 2 explosiones visibles + bursts aleatorios JS cada 3–8s con 30% de doble burst consecutivo
- **Scanner bar**: Barra decorativa de 4px con sweep horizontal infinito
- **Timeline reveal**: `IntersectionObserver` con `data-delay` escalonado (100ms por item)
- **HUD entry**: Cards aparecen con `hud-scan-in` (scale jitter + clip-path reveal)
- **Hover glow**: Botones expanden `box-shadow` neón + `scale(0.95)`
- **Game images**: Filtro `grayscale(1)` → `grayscale(0)` al hover
- **Parallax grid**: Fondo de rejilla 3D se desplaza con el scroll
- **Badge PRO STUDIATON pulsante**: En navbar y tags de sección con glow animado
- **Prize glow**: Card "Espíritu PRO STUDIATON" con glow pulsante cíclico
- **Reduced motion**: `prefers-reduced-motion: reduce` desactiva toda animación y scanlines

## Estructura

```
torneo-gamer-2026/
├── index.html          # Single page — 9 secciones
├── package.json
├── public/
│   ├── logo_americana.png
│   ├── torneo_gamer_logo.svg
│   ├── hero.jpg
│   ├── clash_royale.png
│   ├── brawhalla.png
│   ├── mortal_kombat.png
│   ├── fifa.png
│   └── valorant.png
├── src/
│   ├── style.css       # ~1500 líneas — sistema de diseño completo
│   └── main.js         # ~100 líneas — Motion HUD system
└── dist/               # Build de producción
```

## Secciones del sitio

1. **Navbar** — Fija, backdrop-blur, solo logo + badge PRO STUDIATON, enlace CTA destacado
2. **Hero** — Background parallax, logos institucionales, título con glitch real (4 capas RGBY), cronología del evento
3. **About** — Propósito PRO STUDIATON, capacidad instalada, seguridad
4. **Games** — 5 tarjetas de juego con imagen, formato y badge PRO STUDIATON en header
5. **Schedule** — Timeline completa 7:30am–5:30pm con 15 bloques
6. **Format** — Sistema competitivo por juego con reglas y desempates
7. **Prizes** — 6 categorías de premiación con card PRO STUDIATON pulsante
8. **Registration** — 4 planes de aporte ($5K, $10K, $25–30K, voluntario)
9. **Footer** — Logos institucionales, copyright

## Desarrollo

```bash
npm run dev      # Servidor local con HMR → http://localhost:5173
npm run build    # Build producción → dist/
npm run preview  # Previsualizar build
```

## Accesibilidad

- Navegación por teclado en todos los enlaces
- Atributos `aria-label` en controles interactivos
- `prefers-reduced-motion` respeta preferencias del sistema
- Contraste de texto ≥ 4.5:1 sobre fondos oscuros (verificado con `#0B1326`)
- `scroll-padding-top` para anclar secciones bajo la navbar fija
