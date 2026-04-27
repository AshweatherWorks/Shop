// ============================================================
//  A.W Works — Lógica del carrito (RD$ como moneda principal)
// ============================================================

let carrito = [];

function fmt(n) {
  return "RD$ " + Number(n).toLocaleString("es-DO");
}

function agregarAlCarrito(id) {
  const producto = PRODUCTOS.find(p => p.id === id);
  if (!producto) return;
  const existente = carrito.find(i => i.id === id);
  if (existente) existente.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });
  actualizarCarrito();
  mostrarNotificacion(producto.nombre);
}

function quitarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  actualizarCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) quitarDelCarrito(id);
  else actualizarCarrito();
}

function actualizarCarrito() {
  const total = carrito.reduce((s, i) => s + i.precio_dop * i.cantidad, 0);
  const count  = carrito.reduce((s, i) => s + i.cantidad, 0);

  const badge = document.getElementById("cartBadge");
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";

  const lista = document.getElementById("cartItems");
  if (carrito.length === 0) {
    lista.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
  } else {
    lista.innerHTML = carrito.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.foto}" alt="${item.nombre}"
               onerror="this.style.display='none';this.parentElement.innerHTML='💻'">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nombre}</div>
          <div class="cart-item-price">${fmt(item.precio_dop * item.cantidad)}</div>
        </div>
        <div class="cart-item-controls">
          <button onclick="cambiarCantidad('${item.id}',-1)">−</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad('${item.id}',1)">+</button>
          <button class="cart-remove" onclick="quitarDelCarrito('${item.id}')">✕</button>
        </div>
      </div>`).join("");
  }

  document.getElementById("cartTotal").textContent = fmt(total);
  document.getElementById("btnCheckout").disabled = carrito.length === 0;
}

function enviarPorWhatsApp() {
  if (carrito.length === 0) return;
  const total = carrito.reduce((s, i) => s + i.precio_dop * i.cantidad, 0);

  let msg = `¡Hola ${CONFIG.nombre_negocio}! Me interesan los siguientes productos:\n\n`;
  carrito.forEach((item, i) => {
    msg += `${i + 1}. ${item.nombre}\n`;
    msg += `   Cant: ${item.cantidad} × ${fmt(item.precio_dop)}\n`;
    msg += `   Subtotal: ${fmt(item.precio_dop * item.cantidad)}\n\n`;
  });
  msg += `─────────────────\n`;
  msg += `TOTAL: ${fmt(total)}\n\n`;
  msg += `¿Pueden confirmar disponibilidad y forma de pago? ¡Gracias!`;

  window.open(`https://wa.me/${CONFIG.whatsapp_numero}?text=${encodeURIComponent(msg)}`, "_blank");
}

function toggleCarrito() {
  const open = document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open", open);
}

function cerrarCarrito() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function mostrarNotificacion(nombre) {
  const n = document.getElementById("toast");
  n.textContent = `✓ ${nombre.slice(0,28)}${nombre.length>28?"…":""} agregado`;
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 2500);
}

// ── Renderizado dinámico ──────────────────────────────────
const EMOJIS = { laptop:"💻", workstation:"⚡", usado:"🔄", software:"📦" };

function renderizarProductos() {
  // Hardware
  const grid = document.getElementById("inventoryGrid");
  grid.innerHTML = PRODUCTOS.filter(p => p.categoria !== "software")
    .map(p => cardHTML(p)).join("");

  // Software
  const sw = document.getElementById("softwareGrid");
  sw.innerHTML = PRODUCTOS.filter(p => p.categoria === "software")
    .map(p => swCardHTML(p)).join("");

  // Hero destacado
  const dest = PRODUCTOS.find(p => p.destacado);
  if (dest) {
    document.getElementById("heroProductName").textContent = dest.nombre;
    document.getElementById("heroProductPrice").innerHTML =
      `${fmt(dest.precio_dop)}`;
    const specs = dest.specs.split("·").slice(0,4);
    document.getElementById("heroProductSpecs").innerHTML =
      specs.map(s => `<span class="spec-tag">${s.trim()}</span>`).join("");
    document.getElementById("heroProductBtn").onclick = () => agregarAlCarrito(dest.id);
  }
}

function cardHTML(p) {
  const emoji = EMOJIS[p.categoria] || "💻";
  const badgeClass = p.estado === "Nuevo" ? "" : "usado";
  return `
    <div class="product-card" data-cat="${p.categoria}">
      <div class="product-img">
        <img src="${p.foto}" alt="${p.nombre}"
             onerror="this.style.display='none';this.parentElement.querySelector('.fb').style.display='block'">
        <span class="fb" style="display:none;font-size:3rem;">${emoji}</span>
        <span class="product-badge ${badgeClass}">${p.estado}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoria.charAt(0).toUpperCase()+p.categoria.slice(1)}</div>
        <div class="product-name">${p.nombre}</div>
        <div class="product-specs">${p.specs}</div>
        <div class="product-footer">
          <div class="product-price">${fmt(p.precio_dop)}</div>
          <button class="btn-cart" onclick="agregarAlCarrito('${p.id}')">+ Carrito</button>
        </div>
      </div>
    </div>`;
}

function swCardHTML(p) {
  return `
    <div class="sw-card">
      <div class="sw-header">
        <div class="sw-icon-img">
          <img src="${p.foto}" alt="${p.nombre}"
               onerror="this.style.display='none';this.parentElement.textContent='📦'">
        </div>
        <div><div class="sw-name">${p.nombre}</div>
             <div class="sw-type">${p.specs.split("·")[0].trim()}</div></div>
      </div>
      <div class="sw-price-row">
        <span class="sw-price">${fmt(p.precio_dop)}</span>
        <span class="sw-license">${p.estado}</span>
      </div>
      <button class="sw-btn" onclick="agregarAlCarrito('${p.id}')">+ Agregar al carrito</button>
    </div>`;
}

function setupFiltros() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".product-card").forEach(c => {
        c.style.display = (f === "all" || c.dataset.cat === f) ? "flex" : "none";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
  renderizarProductos();
  setupFiltros();
});
