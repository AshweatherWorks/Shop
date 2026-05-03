// ============================================================
//  A.W Works — ARCHIVO DE PRODUCTOS
//  Agrega, edita o elimina productos aquí fácilmente.
//  Las fotos van en la carpeta: img/products/
// ============================================================

const PRODUCTOS = [
  // -------------------------------------------------------
  // PLANTILLA para copiar y pegar:
  // {
  //   id: "unico-id",             <- ID único, sin espacios
  //   categoria: "laptop",        <- laptop | workstation | usado | software
  //   nombre: "Nombre del equipo",
  //   specs: "Descripción corta de especificaciones",
  //   precio_dop: 15000,          <- precio en RD$ (número sin símbolo)
  //   estado: "Nuevo",            <- "Nuevo" | "Reacondicionado" | "Licencia"
  //   foto: "img/products/nombre-archivo.jpg",
  //   destacado: false            <- true = aparece en tarjeta del hero
  // },
  // -------------------------------------------------------

  {
    id: "thinkpad-t14-g2-usada",
    categoria: "usada",
    nombre: "Lenovo ThinkPad T14 Gen 2",
    specs: " Ryzen 5 4000 · 8 GB RAM · 256 GB M.2 SSD · 14\" · Cargador incluido",
    precio_dop: 15000,
    estado: "Reacondicionado",
    foto: "https://raw.githubusercontent.com/AshweatherWorks/Shop/refs/heads/main/img/products/s-l16erere00.jpg",
    destacado: true
  },
  // ---- SOFTWARE ----
  {
    id: "windows-11-pro",
    categoria: "software",
    nombre: "Windows 11 Pro",
    specs: "Licencia digital · Activación inmediata · 1 PC",
    precio_dop: 3900,
    estado: "Licencia",
    foto: "img/products/windows-11.jpg",
    destacado: false
  },
  {
    id: "microsoft-365-business",
    categoria: "software",
    nombre: "Microsoft 365 Business",
    specs: "Word, Excel, PowerPoint, Teams · 1 usuario · 1 año",
    precio_dop: 7200,
    estado: "Licencia/año",
    foto: "img/products/microsoft-365.jpg",
    destacado: false
  },
  {
    id: "adobe-creative-cloud",
    categoria: "software",
    nombre: "Adobe Creative Cloud",
    specs: "Todas las apps · Photoshop, Premiere, Illustrator · 1 usuario",
    precio_dop: 3300,
    estado: "Licencia/mes",
    foto: "img/products/adobe-cc.jpg",
    destacado: false
  },
  {
    id: "kaspersky-endpoint",
    categoria: "software",
    nombre: "Kaspersky Endpoint Security",
    specs: "Protección total · 1 dispositivo · 1 año",
    precio_dop: 2400,
    estado: "Licencia/año",
    foto: "img/products/kaspersky.jpg",
    destacado: false
  },
];

// ============================================================
//  CONFIGURACIÓN DEL NEGOCIO
// ============================================================
const CONFIG = {
  whatsapp_numero: "18292979188",
  nombre_negocio: "A.W Works",
  moneda: "RD$",
};
