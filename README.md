# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.


# Funcionalidades Implementadas

## 1. **Autenticación de Usuario**
La aplicación permite verificar si un usuario está autenticado o no. La autenticación se gestiona mediante un servicio de autenticación que determina si el usuario ha iniciado sesión correctamente. En función de esto, se muestran o se ocultan ciertos elementos de la interfaz.

- **Componentes afectados**: `<app-header>`, `<app-product-actions>`, y ciertas columnas en la tabla de productos.
- **Condición de autenticación**: Si el usuario está autenticado, se le permitirá agregar, editar y eliminar productos, así como acceder a otras acciones disponibles.

## 2. **Búsqueda de Productos**
Se ha implementado un componente de barra de búsqueda (`<app-search-bar>`) que permite al usuario buscar productos en la lista. Al escribir en la barra de búsqueda, la lista de productos se filtra automáticamente para mostrar solo los productos cuyo nombre coincida con el texto introducido.

- **Funcionalidad**: El componente de búsqueda emite el término de búsqueda, que es gestionado por el componente padre, actualizando la lista de productos visibles.
- **Pipe personalizado**: Se utiliza un pipe personalizado llamado `buscador` para filtrar los productos en la tabla según el término de búsqueda.

## 3. **Carga de Productos**
La lista de productos es cargada de manera dinámica desde un servicio. Mientras los productos se están cargando, se muestra un componente visual (`<app-loading-image>`) indicando que los datos están siendo procesados.

- **Estado de carga**: Si no hay productos disponibles, se muestra una advertencia de carga; si los productos están listos, se presenta la tabla con los datos correspondientes.

## 4. **Conteo de Productos**
El componente `<app-product-count-button>` muestra un botón que indica el número total de productos cargados en la lista. Este número se actualiza dinámicamente cada vez que se cargan nuevos productos o se eliminan productos existentes.

- **Datos dinámicos**: El componente recibe el número total de productos como un `@Input()` desde su componente padre.

## 5. **Tabla de Productos**
La tabla principal muestra una lista de productos con columnas para el nombre, el precio de costo, el porcentaje de ganancia y el precio final. Si el usuario está autenticado, también verá opciones adicionales para editar o eliminar productos.

- **Columnas dinámicas**: Algunas columnas (como precio de costo y porcentaje de ganancia) solo se muestran si el usuario ha iniciado sesión.
- **Acciones**: Los botones de "Editar" y "Eliminar" permiten al usuario modificar o eliminar un producto de la lista.

## 6. **Eliminar Productos**
El usuario puede eliminar productos de la lista mediante un botón de eliminación. Al hacer clic en este botón, se llama a un servicio que se encarga de eliminar el producto correspondiente del estado de la aplicación.

## Cálculo automático del Precio Final basado en el Costo y el Porcentaje de Ganancia

En la aplicación, los usuarios pueden ingresar el **precio de costo** de un producto y el **porcentaje de ganancia** esperado. Con estos datos, el sistema calcula automáticamente el **precio final** utilizando una fórmula que aplica el porcentaje de ganancia sobre el costo del producto.

Esta funcionalidad es manejada por el servicio `WatchAndSetService`, que se encuentra en `src/app/core/services/watch-and-set.service.ts`. A continuación, se describe su funcionamiento:

#### Descripción del Servicio

El servicio `WatchAndSetService` es responsable de observar los cambios en dos campos del formulario:
1. **`precioCosto`**: El costo base del producto.
2. **`porcentajeGanancia`**: El porcentaje de ganancia que el usuario desea aplicar.

Cada vez que uno de estos campos cambia, el servicio:
- Calcula automáticamente el nuevo valor del campo **`precioFinal`**.
- El cálculo se realiza mediante una fórmula simple que agrega el porcentaje de ganancia al precio de costo:  
  **`precioFinal = precioCosto * (1 + porcentajeGanancia / 100)`**.

Este servicio se utiliza en los componentes de **agregar** y **editar** productos, permitiendo que el precio final se actualice en tiempo real a medida que el usuario modifica los valores de costo y ganancia.

#### Beneficios

- **Actualización en tiempo real**: El campo `precioFinal` se actualiza automáticamente cuando se cambian los valores de `precioCosto` o `porcentajeGanancia`, brindando una experiencia interactiva y sin necesidad de cálculos manuales por parte del usuario.
- **Reutilizable**: Este servicio se puede utilizar en cualquier formulario que necesite calcular un precio basado en un costo y un porcentaje de ganancia, haciéndolo flexible para diferentes escenarios dentro de la aplicación.
