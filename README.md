# Aplicación de Gestión de Productos

Esta es una aplicación desarrollada en **Angular** para la gestión de productos, con un backend simulado que utiliza un archivo JSON estático para la autenticación y la gestión de datos. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una lista de productos, con el almacenamiento persistente en `localStorage` para que los datos se conserven entre sesiones.

## Características Principales

- **Gestión de Productos**: Se pueden agregar, editar, eliminar y ver productos.
- **Sesión de Empleado**: Modo en el cual los empleados solo pueden visualizar los productos y usar el buscador, pero no pueden agregar, eliminar ni editar productos ni ver la lista de productos faltantes.
- **Cálculo Automático de Precios**: Utiliza el servicio `WatchAndSetService` para observar y calcular automáticamente el precio final en función del costo y el porcentaje de ganancia.
- **Persistencia en LocalStorage**: Los productos se almacenan en `localStorage` para que persistan entre sesiones del navegador.
- **Uso de Observables**: El estado de la lista de productos se gestiona a través de `BehaviorSubject` para reflejar cambios en tiempo real en la interfaz.
- **Autenticación Simulada**: Utiliza un archivo JSON estático para simular el inicio de sesión y generar un token.
- **Manejo de Sesiones**: El usuario y la contraseña pueden guardarse en `localStorage` si el usuario selecciona la opción "Remember me".
- **Interfaz Reactiva con Formularios**: La aplicación emplea formularios reactivos para la creación y edición de productos.
- **Pipe Personalizado para el Buscador**: Permite filtrar los productos en función del texto ingresado por el usuario en tiempo real.

## Tecnologías Utilizadas

- **Frontend**: Angular 15
  - `Reactive Forms`: Para la gestión de formularios.
  - `Observables` y `BehaviorSubject`: Para la gestión reactiva del estado.
  - `LocalStorage`: Para la persistencia de datos entre sesiones.
  - `HttpClientModule`: Para simulaciones de peticiones HTTP y conexión con un backend estático.
  - **Pipe Personalizado**: Para filtrar productos en el buscador.
- **Backend Simulado**: JSON estático que simula la base de datos de productos y autenticación.
- **AlertifyJS**: Para mostrar notificaciones de éxito o error al realizar operaciones CRUD.
- **Express (Backend para la autenticación y sesiones)**: Utilizado en proyectos complementarios o para autenticación si la aplicación se extiende a un backend real.


## Funcionalidades

### 1. **Gestión de Productos**

La aplicación carga la lista de productos desde `localStorage` (si existe) al iniciar. Si no hay datos en `localStorage`, se obtiene la lista de un archivo estático `products.json`. Las operaciones CRUD se realizan en tiempo real, y los cambios en la lista se reflejan automáticamente en la interfaz gracias al uso de `BehaviorSubject` y `Observables`.

- **Cargar Productos**: Cuando se inicia la aplicación, la lista de productos se carga desde `localStorage`. Si no hay datos, se obtiene de `products.json`.
- **Agregar Producto**: Se agrega un nuevo producto a la lista y se guarda tanto en `localStorage` como en el estado de la aplicación.
- **Editar Producto**: Al editar un producto, los cambios se actualizan en tiempo real en el estado de la aplicación y en `localStorage`.
- **Eliminar Producto**: Al eliminar un producto, se elimina de la lista en memoria y se actualiza en `localStorage`.

### 2. **Sesión de Empleado**

La aplicación permite que los empleados accedan a una vista limitada. Al hacer clic en el botón "Entrar como empleado", se accede a un modo en el cual los empleados **solo pueden visualizar los productos y usar el buscador**, pero **no** pueden realizar las siguientes acciones:

- Agregar productos.
- Eliminar productos.
- Editar productos.
- Ver la lista de productos faltantes.

Este modo está diseñado para restringir las funcionalidades a los empleados y permitir que solo visualicen los productos disponibles.

### 3. **Cálculo Automático del Precio Final**

El servicio `WatchAndSetService` se encarga de observar los cambios en los campos `precioCosto` y `porcentajeGanancia` de un formulario reactivo. Cada vez que uno de estos campos cambia, el servicio recalcula automáticamente el `precioFinal`.

### 4. **Autenticación Simulada con JSON**

El servicio `AuthService` se encarga de gestionar la autenticación simulada utilizando un archivo JSON estático. La autenticación se realiza comparando el nombre de usuario y contraseña con los datos en el archivo JSON, y si coinciden, se guarda un token en `localStorage`.

### 5. **Interacción con LocalStorage**

La aplicación guarda la lista de productos en `localStorage`, por lo que la próxima vez que el usuario vuelva a abrir la aplicación, esta recuperará los productos guardados y continuará desde donde se dejó. Los cambios realizados en los productos se reflejan en tiempo real, pero `localStorage` solo se actualiza después de que se agregue, edite o elimine un producto.

### 6. **Estado Reactivo con BehaviorSubject**

Se utiliza un `BehaviorSubject` para mantener el estado de la lista de productos. Esto permite que cualquier componente que se suscriba a este estado pueda recibir actualizaciones en tiempo real cuando los productos cambian. Todos los métodos que realizan operaciones sobre la lista emiten los cambios a través de este observable.

### 7. **Pipe Personalizado para el Buscador**

La aplicación cuenta con un pipe personalizado para filtrar productos en el buscador. A medida que el usuario ingresa texto en el campo de búsqueda, este pipe filtra los productos en tiempo real según el nombre del producto o cualquier otra propiedad relevante.

- **Filtrado en Tiempo Real**: Permite filtrar productos de manera dinámica mientras el usuario escribe en el campo de búsqueda.
- **Pipe Reutilizable**: Este pipe se puede utilizar en varias partes de la aplicación donde se requiera filtrar productos o cualquier otro tipo de lista.



