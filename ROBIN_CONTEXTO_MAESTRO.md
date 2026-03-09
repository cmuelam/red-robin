# 🤖 ROBIN PLATFORM — Contexto Maestro
> Pega este archivo al inicio de cualquier chat nuevo con Claude para retomar sin perder contexto.

---

## ¿Qué es esto?
Plataforma DOOH (Digital Out-of-Home) para gestión de campañas publicitarias en pantallas digitales de CDMX y red nacional (Expansión). Desarrollada en colaboración con Claude AI.

---

## 📁 Repositorios GitHub
- **RED ROBIN:** https://github.com/cmuelam/red-robin
- **VICTORIA:** (mismo repo o subir a uno nuevo — pendiente separar)

---

## 🔴 PROYECTO 1 — RED ROBIN
**Archivo:** `index.html` (3,502 líneas) — single-file app  
**Deploy:** Netlify → `heroic-robinv2.netlify.app`  
**Stack:** HTML + CSS + Vanilla JS, sin frameworks

### Qué hace:
Motor de configuración de campañas DOOH. El operador entra, configura una campaña y exporta un ZIP listo para entregar al cliente o subir a pantallas.

### Funciones implementadas:
- **Login** con pantalla TRON + robot mascota animado (SVG)
- **Wizard de 4 pasos:** Activadores → Fixture → Creative → Export
- **Activadores disponibles:**
  - ⚽ Deportes (marcador en vivo)
  - 🌤️ Clima (temperatura actual)
  - ⏱️ Countdown (cuenta regresiva)
  - ⏱️+🎯 Countdown + Promo
  - ⚽+📊 Deportes + Odds
- **Fixture:** Búsqueda de partidos via API-Football / Broadage
- **Editor creativo:** Upload fondo + logo, preview en tiempo real, color picker
- **Simulador de estados:** Pre-juego / En vivo / Medio Tiempo / Final
- **Pantallas soportadas:**
  - 🚲 Ecobici CDMX — 420×588
  - 🚌 Metrobús — 576×448
  - ✈️ Aeropuerto CDMX T2 — 1080×1920
  - ✈️ Aeropuerto MTY — 1080×1920
  - 🚕 Taxis — 800×600
  - 🚋 Tren Ligero — 1080×1920
- **Templates:** Sistema de plantillas (Broadage, API-Football widget, motor propio)
- **Export:** ZIP con `index.html` + `config.js`, también `.robin` file
- **Gestión de campañas:** Guardado en localStorage, lista de campañas
- **Config:** API keys para Football, Weather, Netlify, Anthropic

### Variables / Config importantes:
```js
CFG.fk   // API Football key
CFG.wk   // Weather API key
CFG.ntk  // Netlify token
CFG.ank  // Anthropic API key
```

### Netlify Functions usadas:
- `/.netlify/functions/proxy/fixtures` — proxy a API-Football
- `/.netlify/functions/claude-proxy` — proxy a Claude API

---

## 🏆 PROYECTO 2 — VICTORIA
**Archivo:** `victoria.html` (1,013 líneas) — single-file app  
**Stack:** HTML + CSS + Vanilla JS + Claude API (Sonnet)

### Qué hace:
Asistente conversacional de campañas. El operador habla con Victoria (IA) y ella va configurando la campaña paso a paso de forma guiada.

### Funciones implementadas:
- **Chat con Claude Sonnet** — conectado via `claude-proxy` en Netlify
- **Vision** — acepta imágenes del cliente (logos, banners) via drag & drop, las envía a Claude
- **Pipeline visual de 5 pasos:** Partido → Timing → Imágenes → Preview URL → ZIP
- **Búsqueda de fixtures** por equipo (Real Madrid, Chivas, América, Champions, Liga MX, etc.)
- **Preview en mupi** — iframe en tiempo real en panel derecho
- **Generación de ZIP** para Expansión (red DOOH nacional)
- **Voz** — dictado en español (Web Speech API Chrome)
- **Quick actions** — botones de acceso rápido
- **Sistema de comandos ACCION:** que Claude ejecuta en el frontend:
  - `ACCION:BUSCAR_PARTIDO`
  - `ACCION:SUBIR_IMAGENES`
  - `ACCION:GENERAR_PREVIEW`
  - `ACCION:GENERAR_ZIP`
  - `ACCION:CONFIRMAR_PARTIDO:ID:NOMBRE:FECHA`
  - `ACCION:SET_PREVIA:HORAS`

### Equipos mapeados (TEAM_IDS):
Real Madrid(541), Barcelona(529), Liverpool(40), Man City(50), Man Utd(33), Chelsea(49), PSG(85), Juventus(496), Atlético(530), Chivas(3022), Tigres(3024), Cruz Azul(2282), América(2287)

### Variables de estado:
```js
state = {
  step: 0,
  fixtureId: null,
  matchName: null,
  matchTime: null,
  previewHours: null,
  images: [],
  previewURL: null
}
```

---

## 📊 PROYECTO 3 — CAMPAÑAS & PROPUESTAS COMERCIALES
**Estado:** 🔴 Por construir  
**Concepto:** Herramienta para crear propuestas comerciales visuales para clientes, con mapas de pantallas, copys de referencia, separación por cliente/marca.

### Lo que debe incluir (pendiente):
- Mapa interactivo de pantallas disponibles (Ecobici, Metrobús, aeropuertos, taxis)
- Generador de propuestas con copys como referencia
- Separación de campañas por cliente y marca
- Exportar propuesta como PDF o presentación
- Integración con datos de RED ROBIN (fixtures, activadores ya configurados)

---

## 🏗️ Arquitectura General

```
robin-platform/
├── red-robin/          → Motor de configuración (index.html)
│   └── netlify/functions/
│       ├── proxy.js    → API-Football proxy
│       └── claude-proxy.js → Claude API proxy
├── victoria/           → Asistente IA (victoria.html)
└── campanas/           → Propuestas comerciales (por construir)
```

---

## 🔑 Credenciales / Config conocida
- **Base URL Netlify:** `https://heroic-robinv2.netlify.app`
- **Claude Model:** `claude-sonnet-4-20250514`
- **Football API key:** guardada en `CFG.fk` (localStorage)
- **Login RED ROBIN:** usuario/password guardados en `CFG.users`

---

## 📌 Estado actual del trabajo (actualizar en cada sesión)

| Proyecto | Estado | Último avance |
|----------|--------|---------------|
| RED ROBIN | ✅ Funcional | Templates Broadage + API-Football widget. Export ZIP. |
| VICTORIA | 🟡 Parcial | Chat funcional, ZIP básico, falta integración real con RED ROBIN |
| Campañas | 🔴 Pendiente | Solo concepto definido |

---

## 📋 Pendientes / Next Steps

### RED ROBIN
- [ ] Separar en repo propio en GitHub
- [ ] Documentar Netlify functions
- [ ] Mejorar el motor generado (buildMotor) con más templates
- [ ] Testing de activadores en producción

### VICTORIA
- [ ] ZIP real con JSZip (actualmente genera solo HTML)
- [ ] Integración directa con fixtures de RED ROBIN
- [ ] Separación por cliente/marca en el historial
- [ ] Panel de campañas guardadas

### Campañas & Propuestas
- [ ] Diseño inicial de la herramienta
- [ ] Mapa de pantallas interactivo
- [ ] Generador de propuesta PDF

---

## 🗣️ Instrucciones para Claude al inicio de chat nuevo

Cuando pegues este documento en un chat nuevo, di:

> "Continúa el desarrollo de la plataforma Robin DOOH. Este es el contexto maestro del proyecto. Estoy trabajando en [RED ROBIN / VICTORIA / CAMPAÑAS]. Lo que necesito ahora es: [describe tu tarea]"

Claude retomará exactamente donde lo dejaste sin necesidad de re-explicar nada.

---
*Última actualización: Marzo 2026*
*Actualiza la tabla de "Estado actual" al final de cada sesión de trabajo*
