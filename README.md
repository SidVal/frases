# Frases Inmortales

Proyecto web estático para inmortalizar frases usando GitHub Pages, GitHub Issues y GitHub Actions como backend implícito.

---

## 🧠 Idea

Permitir que cualquier persona proponga frases mediante Issues, moderarlas manualmente, y transformarlas automáticamente en datos estáticos que alimentan una web rápida, simple y sin backend.

---

## ⚙️ Arquitectura

```txt
Usuario → Issue
        ↓
Moderación (label: approved)
        ↓
GitHub Action (immortalize)
        ↓
data/phrases.raw.json
        ↓
Procesamiento Node.js
        ↓
data/*.json optimizados
        ↓
GitHub Pages
        ↓
Frontend (fetch JSON)
```

---

## 📂 Estructura del proyecto

```txt
/
├── index.html
├── assets/
│   ├── css/
│   └── js/
├── data/
│   ├── phrases.raw.json     # fuente principal editable
│   ├── phrases.json         # salida optimizada
│   ├── stats.json           # métricas precalculadas
│   └── indices.json         # índices de acceso rápido
├── scripts/
│   └── build-data.js        # generador de datos
└── .github/
    ├── workflows/
    │   ├── immortalize-issue.yml
    │   ├── build.yml
    │   └── pages.yml
    └── ISSUE_TEMPLATE/
```

---

## 📝 Flujo de datos

### 1. Ingreso

* Usuario crea un Issue usando template:

  * Frase
  * Autor

* El Issue recibe label:

  ```txt
  phrase-submission
  ```

---

### 2. Moderación

* El maintainer revisa el contenido
* Si es válido, agrega:

  ```txt
  approved
  ```

---

### 3. Inmortalización

Workflow: `immortalize-issue.yml`

Hace:

* Parsea el Issue
* Extrae frase y autor
* Inserta en:

  ```txt
  data/phrases.raw.json
  ```
* Evita duplicados por Issue
* Agrega label:

  ```txt
  immortalized
  ```
* Cierra el Issue

---

### 4. Generación de datos

Dentro del mismo workflow:

```bash
npm run build:data
```

Script:

```txt
scripts/build-data.js
```

Genera:

* `phrases.json`
* `stats.json`
* `indices.json`

Incluye:

* normalización de texto
* tokenización
* hashes
* conteos
* métricas

---

### 5. Publicación

Workflow: `pages.yml`

* Publica el repo como sitio estático
* GitHub Pages sirve:

  ```txt
  index.html + /data/*.json
  ```

---

## ⚡ Filosofía

* Sin backend tradicional
* Datos como archivos versionados
* Procesamiento en CI
* Frontend ultra liviano
* Performance máxima (Lighthouse 100/100)

---

## 🧩 Tecnologías

* HTML + CSS + JS (vanilla)
* Node.js (solo para generación)
* GitHub Actions
* GitHub Issues (como input)
* GitHub Pages (hosting)

---

## 🔐 Moderación

Labels usados:

```txt
phrase-submission
approved
immortalized
invalid
rejected
```

Regla clave:

```txt
approved = se publica
closed ≠ aprobado
```

---

## 🚀 Scripts disponibles

```bash
npm run build:data
```

---

## 📊 Futuro

* Dashboard de métricas
* Top frases
* Nube de palabras
* Tendencias por fecha
* Detección de duplicados
* Clustering semántico

---

## 🧭 Concepto clave

Este proyecto convierte GitHub en:

```txt
Issues → input
Actions → backend
JSON → base de datos
Pages → frontend
```

---

## ✨ Autor

Waldo
