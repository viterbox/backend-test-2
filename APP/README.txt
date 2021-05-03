README

- Instrucciones para ejecutar el proyecto:

1.- El proyecto está dividido en 2 partes Back y Front

2.- Para poder ejecutarlo, se requiere como minimo tener instalado Node 12
	- link de descarga: https://nodejs.org/es/

3.- Configuracion general
	- Una vez instalado node, ejecutar:

		- npm install

	- Entrar a la ruta del proyecto y ejecutar: 

		Para ejecutar el backend: (http://localhost:3200)

			- npm run dev 

		Para ejecutar el frontend: (http://localhost:3000/login)

			- npm run start


Estructura del proyecto:

- En el proyecto Back, encontraremos los archivos que configuran nuestros endpoints para hacer peticiones al servidor, a su vez encontraremos la conexión a la base de datos Mongodb, donde se estará guardando la información general de la aplicación.

- En el proyecto Front, encontraremos los archivos que configuran la interfaz del usuario, en donde también definimos el comportamiento de los componentes y de como interactuaran con el usuario.
