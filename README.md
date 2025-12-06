# Simple Fullstack Shop

Una aplicación de comercio electrónico básica y ligera implementada con tecnologías web estándar y Node.js.

## 📋 Características

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla). Sin frameworks ni bundlers.
- **Backend**: Node.js con Express.
- **Base de Datos**: Archivo JSON simple (sin necesidad de configurar motores de base de datos).
- **Funcionalidades**:
    - Listado de productos dinámico.
    - Página de detalle de producto.
    - Carrito de compras persistente (localStorage).
    - Simulación de Checkout.

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión 14 o superior).

### Pasos

1. **Navegar a la carpeta del backend**:
   ```bash
   cd backend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor**:
   ```bash
   npm start
   ```
   El servidor se iniciará en `http://localhost:3000`.

4. **Ver la aplicación**:
   Abre tu navegador web y visita `http://localhost:3000`.

## 📂 Estructura del Proyecto

```
simple-shop/
├── backend/                 # Lógica del servidor
│   ├── db/
│   │   └── products.json    # Base de datos de productos
│   ├── routes/              # Rutas de la API (Endpoints)
│   ├── server.js            # Punto de entrada del servidor Express
│   └── package.json         # Dependencias del backend
│
└── frontend/                # Cliente web (Archivos estáticos)
    ├── css/                 # Estilos
    ├── js/                  # Lógica frontend (API, Carrito, DOM)
    ├── index.html           # Página principal
    ├── product.html         # Detalle de producto
    ├── cart.html            # Carrito de compras
    └── checkout.html        # Pantalla de pago simulada
```

## 🛠️ Tecnologías

- **Express**: Para el servidor web y la API REST.
- **CORS**: Para manejar políticas de origen cruzado (si fuera necesario, aunque aquí se sirven estáticos).
- **CSS Variables**: Para un diseño consistente y fácil de mantener.
- **Fetch API**: Para la comunicación cliente-servidor.

## 📝 Notas
- El carrito de compras se guarda en el `localStorage` del navegador, por lo que no se pierde al recargar la página.
- El proceso de checkout es una simulación; no se procesan pagos reales.
