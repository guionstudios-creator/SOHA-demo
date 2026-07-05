<!-- markdownlint-disable MD033 MD041 -->

<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/status-demo-blue?style=flat-square" alt="Status: Demo"/>
  <img src="https://img.shields.io/badge/Svelte-5-orange?style=flat-square&logo=svelte&logoColor=white" alt="Svelte 5"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 3"/>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"/>
  <br/>
  <br/>
</div>

# SOHA Demo

**Sistema de Organización Hospitalaria Administrativo — Versión Demo**

Esta es una **demostración interactiva** del sistema SOHA, una aplicación de escritorio para la gestión de inventario farmacéutico hospitalario con trazabilidad por lote, motor FEFO y reportes regulatorios.

> ⚠️ **Demo informativa** — Todos los datos son ficticios. No representa información real de pacientes o instituciones. Esta versión web corresponde aproximadamente al **10 % de la funcionalidad** del sistema original.

---

## 🌐 Enlaces

| Recurso | URL |
|---------|-----|
| **Demo en vivo** | [soha-demo.vercel.app](https://soha-demo.vercel.app) |
| **Caso de estudio** | [guionstudio.xyz/proyecto/soha](https://guionstudio.xyz/proyecto/soha) |
| **Repositorio principal** | Guión Studio / SOHA |

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Framework** | SvelteKit 5 (Static Site Generation) |
| **Lenguaje** | TypeScript (strict mode) |
| **Estilos** | Tailwind CSS 3 + CSS Variables (7 temas dinámicos) |
| **Iconos** | Lucide (importaciones individuales, tree-shakeadas) |
| **Despliegue** | Vercel (adapter-static) |

---

## 📁 Estructura del Proyecto

```
soha-demo/
├── src/
│   ├── app.html               # Entry HTML con theme-init.js (anti-FOUC)
│   ├── app.css                 # Estilos globales + componentes CSS
│   ├── lib/
│   │   ├── components/
│   │   │   ├── atoms/          # Icon, Badge, StatCard, Skeleton, ThemeToggle
│   │   │   ├── molecules/      # SearchBar, DataTable, AlertCard, EmptyState
│   │   │   └── organisms/      # Sidebar
│   │   ├── domain/
│   │   │   └── entities.ts     # Interfaces del dominio
│   │   ├── mock/
│   │   │   ├── data/           # 8 archivos de datos ficticios
│   │   │   └── mock-container.ts # Contenedor DI con servicios mock
│   │   └── styles/
│   │       ├── animations.css  # 8 keyframes portados de SOHA V0.1
│   │       └── tokens.css      # 7 temas visuales completos
│   └── routes/
│       ├── +layout.svelte      # Layout principal (usa Sidebar component)
│       ├── +layout.ts          # prerender = true
│       ├── +page.svelte        # Dashboard con estadísticas y alertas
│       ├── inventario/         # Stock con control FEFO por lote
│       ├── despachos/          # Registro de salidas con trazabilidad
│       ├── catalogo/           # Maestro de medicamentos con búsqueda
│       ├── auditoria/          # Registro inmutable de operaciones
│       ├── devoluciones/       # Placeholder informativo
│       ├── historial/          # Placeholder informativo
│       ├── reportes/           # Placeholder informativo
│       └── usuarios/           # Placeholder informativo
├── static/                     # Assets estáticos
├── package.json
├── svelte.config.js
├── tailwind.config.js
└── vite.config.ts
```

---

## 🧭 Funcionalidades Incluidas

### Páginas funcionales (5)

| Página | Descripción |
|--------|-------------|
| **Dashboard** | Estadísticas de inventario, estado FEFO, distribución por servicio, alertas |
| **Inventario** | Tabla con search, expand row con detalle de lotes FEFO, semáforo de vencimiento |
| **Despachos** | Historial de salidas con códigos de trazabilidad y filtro por servicio |
| **Catálogo** | Grid de medicamentos con búsqueda, filtro por categoría, badges de estado |
| **Auditoría** | Registro de operaciones con hashes SHA-256 y filtro por tipo |

### Páginas informativas (4)

| Página | Propósito |
|--------|-----------|
| **Devoluciones** | Descripción del módulo con features listadas |
| **Historial** | Descripción del módulo de movimientos |
| **Reportes** | Descripción del módulo de generación de PDFs |
| **Usuarios** | Descripción del módulo de administración de usuarios |

### Sistema de temas

7 temas visuales intercambiables desde la barra lateral:
- 🌙 **Night** (oscuro, por defecto)
- ☀️ **Midday** (blanco limpio)
- 🌅 **Afternoon** (gris cálido)
- 🌄 **Morning** (beige suave)
- 💡 **Soft Light** (verde claro)
- 📖 **Sepia** (papel envejecido)
- 👁️ **High Contrast Dark** (contraste extremo)

Persistencia en `localStorage` sin FOUC gracias a `theme-init.js` inline.

---

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/guionstudios-creator/soha-demo.git
cd soha-demo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

El servidor de desarrollo se inicia en `http://localhost:5173` por defecto.

---

## 📦 Build de Producción

El proyecto usa `@sveltejs/adapter-static` para generar un sitio completamente estático:

```bash
npm run build
```

El output se genera en `build/` y está listo para desplegar en cualquier CDN.

---

## 🎨 Arquitectura de Animaciones

SOHA Demo incluye **8 animaciones CSS** portadas del sistema SOHA original:

| Animación | Propósito |
|-----------|-----------|
| `fadeInUp` | Entrada de páginas |
| `hover-lift` | Elevación sutil en hover |
| `shimmer` | Efecto de brillo en skeletons |
| `staggerIn` | Aparición escalonada de elementos |
| `pulse` | Indicador de carga |
| `glassReveal` | Efecto de revelado glassmorphism |
| `checkDraw` | Animación de checkmark |
| `shake` | Feedback de error |

Todas las animaciones se desactivan automáticamente si el usuario tiene `prefers-reduced-motion: reduce`.

---

## ⚠️ Limitaciones Conocidas

| Aspecto | Estado |
|---------|--------|
| **Autenticación** | No implementada (usuario demo fijo) |
| **Persistencia** | Datos mock en memoria (no hay base de datos) |
| **PDF/Reportes** | No disponible en demo |
| **Devoluciones** | Página informativa (no funcional) |
| **Historial** | Página informativa (no funcional) |
| **Usuarios** | Página informativa (no funcional) |
| **Backend Rust/Tauri** | No presente (entorno web) |
| **Impresión/escáner** | No disponible |
| **Offline** | No soportado (requiere carga inicial) |

Esta demo está diseñada para **mostrar el producto, no sustituirlo**. Para la versión completa con todas las funcionalidades operativas y backend nativo, consulte el repositorio principal de SOHA.

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│            SOHA Demo (SvelteKit)         │
│  ┌─────────┐  ┌──────────────────────┐  │
│  │ Sidebar  │  │    Main Content      │  │
│  │ Lucide   │  │  ┌────────────────┐  │  │
│  │ Icons    │  │  │  5 páginas     │  │  │
│  │ 7 temas  │  │  │  funcionales   │  │  │
│  │ Collapse │  │  ├────────────────┤  │  │
│  └─────────┘  │  │  4 placeholders │  │  │
│               │  └────────────────┘  │  │
│               └──────────────────────┘  │
│  ┌──────────────────────────────────┐   │
│  │      Mock Container (DI)         │   │
│  │  ┌──────┐ ┌──────┐ ┌─────────┐  │   │
│  │  │ datos │ │serv. │ │entidades│  │   │
│  │  │ mock  │ │mock  │ │dominio  │  │   │
│  │  └──────┘ └──────┘ └─────────┘  │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
         │
         │ iframe (sandbox)
         ▼
┌─────────────────────────────────────────┐
│      Guión Studio Portfolio (Astro)      │
│  ┌──────────────────────────────────┐   │
│  │    Caso de Estudio SOHA (MDX)    │   │
│  │  + ScreenshotGallery (16 capt.)  │   │
│  │  + iframe → soha-demo.vercel.app │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 🧪 SOHA (Sistema Original)

SOHA Demo es una representación visual del sistema **SOHA V0.1**, una aplicación de escritorio construida con:

| Componente | Tecnología |
|------------|------------|
| Frontend | SvelteKit 5 + TailwindCSS 3 |
| Backend nativo | Rust (Tauri 2) |
| Base de datos | SQLite (embebida) |
| Seguridad | AES-256-GCM, ChaCha20Poly1305, bcrypt, JWT |
| Licenciamiento | Supabase + hardware fingerprint |
| Reportes | jsPDF + jsPDF-AutoTable |
| Arquitectura | Clean Architecture + Atomic Design (73+ componentes) |

---

## 📄 Licencia

MIT © Guión Studio

---

## 🤝 Contribuciones

Este es un proyecto demo público. Si encuentras errores o tienes sugerencias, abre un issue en el repositorio.

---

<div align="center">
  <sub>Hecho con ❤️ por Guión Studio</sub>
  <br/>
  <sub>Un commit a la vez se construye software.</sub>
</div>
