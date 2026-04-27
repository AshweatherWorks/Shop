# A.W Works — Guía para agregar productos

## Estructura de archivos

```
awworks/
├── index.html          ← Página principal (no editar)
├── js/
│   ├── productos.js    ← ✅ AQUÍ agregas/editas productos
│   └── carrito.js      ← Lógica del carrito (no editar)
└── img/
    └── products/       ← ✅ AQUÍ pones las fotos
        ├── thinkpad-x1-carbon.jpg
        ├── dell-latitude-5540.jpg
        └── ... etc
```

---

## Cómo agregar un producto nuevo

1. Copia la foto del producto a la carpeta `img/products/`
   - Tamaño recomendado: **600 × 400 px** o similar (16:9 aprox.)
   - Formatos: `.jpg`, `.png`, `.webp`

2. Abre `js/productos.js` y agrega un nuevo bloque en el array `PRODUCTOS`:

```js
{
  id: "mi-producto-nuevo",        // ID único, sin espacios ni tildes
  categoria: "laptop",            // laptop | workstation | usado | software
  nombre: "Nombre del equipo",
  specs: "i7 · 16 GB · 512 SSD", // Specs cortas separadas por ·
  precio_usd: 999,                // Precio en dólares (solo el número)
  tasa_dop: 60,                   // Tasa de cambio (actualiza según el día)
  estado: "Nuevo",                // "Nuevo" | "Reacondicionado" | "Licencia"
  foto: "img/products/mi-foto.jpg",
  destacado: false                // true = aparece en la tarjeta del hero
},
```

3. Guarda el archivo y recarga el navegador. ¡Listo!

---

## Cómo actualizar tu número de WhatsApp

En `js/productos.js`, al final del archivo, cambia:

```js
const CONFIG = {
  whatsapp_numero: "18090000000",  // ← pon tu número aquí (sin + ni espacios)
  tasa_cambio_default: 60,
  nombre_negocio: "A.W Works",
  moneda_local: "RD$",
};
```

---

## Categorías disponibles

| Categoría     | Descripción                   | Filtro en web     |
|---------------|-------------------------------|-------------------|
| `laptop`      | Laptops nuevas                | "Laptops"         |
| `workstation` | Workstations / equipos pro    | "Workstations"    |
| `usado`       | Reacondicionados              | "Reacondicionados"|
| `software`    | Licencias de software         | Sección Software  |

---

## Cómo publicar en internet (gratis)

1. Crea una cuenta en [Netlify Drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `awworks/` completa al navegador
3. ¡Tu web estará publicada en segundos con una URL gratuita!
