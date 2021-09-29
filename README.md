# ALEGRA ALMUERZOS GRATIS

## Link de la aplicación: http://ec2-3-83-226-58.compute-1.amazonaws.com/

## Generalidades 

Está aplicación fue desarrollada con:
1. Laravel para el Backend (API Rest)
2. Docker para el tema de microservicios.
3. MongoDB para la base de datos
4. ReactJS para el frontend (Se usó React Router y React con Hooks)
5. Tailwind CSS para todo el tema de estilos.


Arquitectura a alto nivel:
1. Tenemos en un docker todo el frontend
2. El frontend se comunica con 2 microservicios docker: kitchen-microservice (encargado de toda la parte de ordenes y recetas) y store-microservice (encargado de todo lo relacionado con ingredientes y compra de los mismos)
3. Finalmente tenemos un docker para la base de datos mongo.


## Funcionamiento general de la aplicación

Toda la aplicación contiene un menù en el header para navegar entre las diferentes internas

### Home

Allí tenemos presente un botón "Create new order here", que sería para realizar un pedido en la cocina, esto crea una orden.

Luego tendríamos un listado con todas las ordenes que tenemos en preparación. Allí se especifica si está en preparación, si fueron asignados los ingredientes, y las fechas de creación y actualización. En este espacio solo vemos ordenes en preparación (esto se actualiza solo recargando la página o cuando se crea una nueva orden)

### Recipes

Acá solo tenemos un detalle de cada receta con su lista y cantidad de ingredientes.

### Kitchen

Acá van a llegar las ordenes (conforme se recarga la página) en la parte de Orders in preparation. Dichas ordenes tienen un ciclo de vida, que se representa en 3 botones:

1. Cuando la orden llega, está sin receta. Por lo que aparece un botón rojo "Choose random recipe", para asignar una de las 6 recetas en el sistema.
2. Cuando la orden tiene asignada una receta, pasa a estar sin ingredientes, por lo que vemos un botón amarillo "Request Ingredients", para pedir ingredientes a la bodega.
3. Cuando la bodega asigne los ingredientes, la orden pasa a estar lista para prepararse, por lo que vemos un botón verde "Prepare", cuando se presiona acá la orden entonces queda preparada y con un status de "made", por lo que sale de la lista de espera de ordenes en preparación.


También acá tenemos una sección llamada "Orders made" acá van a aparecer todas las ordenes realizadas a la cocina y que ya fueron preparadas.


## Store

Acá tenemos la lista de ingredientes disponbiles. Se muestran en verde cuando hay al menos 3 unidades, naranja cuando hay 2 o menos y finalmente rojo cuando no hay unidades de un ingrediente.

En la otra sección "Buy ingredients" tenemos una lista de ingredientes para comprar, se seleccciona uno de los ingredientes y se da click en "Buy", el sistema informa cuantas unidades se vendieron del ingrediente o si no había disponibilidad para la venta.

Finalmente tenemos la sección "Puchases of Ingredients",acá se muestra todo el historial de compras con fecha, ingrediente y cantidades compradas.

## Cosas que se podrían mejorar

Realmente pienso se hizo más de lo especificado y en algunos aspectos se quedaron depronto a elección mía. Por el tiempo y demás se entrega una aplicación con lo solicitado y algunos temas adicionales que le quise poner como por ejemplo todo el front en react, usar tailwind css, etc. Sin embargo estas cosas podrían mejorarse:
1. Ponerle autenticación al sitio, por ejemplo el gerente no debería ver nada de la cocina ni de la bodega (yéndonos a la vida real)
2. El sitio como está con React algunas componentes para que se actualizarán hubiera sido preferible usar Redux, pero esto le incrementa mucho más el tiempo para desarrollarlo.
3. Si yo quisiera que de manera automatica que cuando el gerente cree una orden, e aparezca a la cocina dicha órden sin estar recargando la página, se debería implementar un tema de websockets.
