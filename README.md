<p align="center">
  <a href="https://vitejs.dev/" target="blank"><img src="https://vitejs.dev/logo.svg" width="200" alt="Vite Logo" /></a>
</p>

# REACT GPT
 
 este sera el frontend para concretar de una manera agradable las practicas que tienen que ver con el uso de el paquete de npm de chat gtp y asi poder tener solo una base desde la cual realisar todas las pruebas necesarias.
 
 el backend de este proyecto lo puedes conseguir en la siguiente [direccion](https://github.com/hikdul/nestGpt)
 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# build mode
$ npm run build
```
 
## Elementos resaltables por ramas

### base

basicamente aca se encuentra todas las bases de este proyecto

* vite (uso como base para esta construccion)
* React Router Dom
* Diseño de Layout
* Rutas Hijas
* Redirecciones
* Tailwind
* React Markdown Component
* Diseño de chat
* Estructura del proyecto.


### ortografia

en este proponemos un usuario para correguir la ortografia

* FetchAPI
* Post request
* Crear un caso de uso
* Interfaces para el tipado de la respuesta
* Mostrar la respuesta como un mensaje de chat.

### proscons 

aca tenemos a un elemento que basado en 2 opciones me entrega un listado de pros y contras sobre lo que se le aplique, puntualmente se vera:

* Streams
* Funciones generadoras
* Decoders
* For await
* AbortSignals

### traducciones

este es una practica general de las anteriores donde aplico las ideas aprendidas para hacer un traductor basado en un selector de idiomas y asi obtener las traducciones esperadas.
 
### textToAudio

en esta seccion generamos un texto en base a un audio que se envia al backend

### audioTexto

en esta rama construimos el front para agregar un archivo y enviarlo al sistema de backend y que este haga su magia.
  nota: en esta parte es donde mi cuota de consumo aumento un monton. las anteriores practicas nome dieron tanto cosumo como esta. un ejemplo seria que el consume de las anteriores es de 4 a 5 peticiones a la api por .01$ y este es de .07$ por solicitud

### imagenes

esta seccion se encarga de trabaja con imagenes. Los objetivos de esta seccion son:

* Generar imágenes
* Editar imágenes
* Crear variaciones

Para la edición de imágenes, necesitaremos convertir la imagen a un **canvas**, para poder cortarla y jugar con ella; De este modo podremos crear una máscara que nos permita decirle a OpenAI ¿Qué quiero editar? y ¿Qué quiero hacer? en un determinado espacio.
