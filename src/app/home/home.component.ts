import { Component, OnInit } from '@angular/core';
import { StateManagetService } from '../core/services/state-managet.service';
import { Producto } from '../core/interfaces/producto';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // Inicializa la variable 'search' para almacenar el término de búsqueda.
  public search: string = '';

  // Declara la lista de productos como un array de objetos Producto.
  lista: Producto[];
  
  
  // Variable que indica si el usuario está logueado o no, inicializada como 'false'.
  logueado = false;

  // Variable para controlar la visualización de una advertencia de carga, 
  // inicialmente en 'true' para indicar que está cargando.
  showingLoading= true;
  
  
  
  // Variable que indica si los datos están cargados, inicialmente en 'false'.
  dataLoaded= false;
  

  // Variable que almacena el número total de productos, inicialmente en 0.
  numeroProductos = 0;

  // Constructor que inyecta dos servicios: 'StateManagetService' para manejar el estado de los productos
  // y 'AuthService' para gestionar la autenticación del usuario.
  constructor(
              private managetStateService:StateManagetService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.inicializarComponente();
  }
  
  inicializarComponente(): void {
    this.obtenerListaDeProductos();
    this.verificarAutenticacion();
  }

  obtenerListaDeProductos(): void {
     // Suscripción al observable 'lista$' del servicio 'managetStateService' que devuelve la lista de productos.
     this.managetStateService.lista$.subscribe(lista => {
      this.lista = lista;// Asigna la lista recibida a la variable local 'lista'.
      this.numeroProductos = lista.length// Actualiza el número de productos basado en la longitud de la lista.

      // Si la lista tiene elementos (su longitud es mayor a 0), oculta la advertencia de carga ('cargandoWarning')
      // y marca que los datos ya están cargados ('cargado').
      if(lista.length > 0){
        this.showingLoading = false 
        this.dataLoaded= true  
      } 
    });
    
  }

  verificarAutenticacion(): void {
    // Verifica si el usuario está autenticado utilizando el servicio 'AuthService' y
    // actualiza la variable 'logueado' en consecuencia.
    this.logueado=this.authService.isAuthenticated()
  }
  
  // Método que se ejecuta cuando el usuario realiza una búsqueda de productos.
  // Recibe el valor de búsqueda y lo asigna a la variable 'search'.
  //la cual incidira en el pipe buscador
  onSearchProducto( search: string ) {
    this.search = search;
  }

  // Método para eliminar un producto, recibe el 'id' del producto que se quiere eliminar y
  // llama al método 'deleteElement' del servicio 'managetStateService'
   eliminar(id){
     this.managetStateService.deleteElement(id)
   }
}
