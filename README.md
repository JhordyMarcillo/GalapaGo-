# ProyectoInterculturalidad

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

Building for Production
To compile the project for production, run:

Bash
ng build
This will compile your project and store the build artifacts in the dist/proyecto-interculturalidad/browser directory (la ruta puede variar según la versión de Angular). La compilación de producción optimiza tu aplicación para el despliegue.

Running in Production Mode (PWA Preview)
Debido a que esta es una PWA (Progressive Web App), los Service Workers no funcionan con ng serve. Para probar el comportamiento de producción, incluyendo el Service Worker y el modo offline, sigue estos pasos:

Construye la aplicación:

Bash
ng build
Instala un servidor local (si no lo tienes):

Bash
npm install -g http-server
Sirve la carpeta de producción:

Bash
# Navega a la carpeta generada (ajusta la ruta según tu estructura)
cd dist/proyecto-interculturalidad/browser

# Levanta el servidor en el puerto 8080
http-server -p 8080 -c-1
Abre http://localhost:8080 en tu navegador. Puedes verificar el funcionamiento de la PWA en la pestaña Application de las herramientas de desarrollador.

Running unit tests
Para ejecutar pruebas unitarias con Vitest incluyendo el reporte de cobertura, usa:

Bash
ng test --coverage
Running end-to-end tests
For end-to-end (e2e) testing, run:

Bash
ng e2e
Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the Angular CLI Overview and Command Reference page.


### Notas sobre los cambios:
* **Building:** Aclaré que los archivos terminan en la carpeta `dist/`, lo cual es vital para el paso siguiente.
* **Running in Production Mode:** Agregué este nuevo bloque explicando por qué es necesario usar `http-server` (básicamente para activar el Service Worker y probar la PWA offline).
* **Unit Tests:** Actualicé el comando `ng test` a `ng test --coverage` para que sea consistente con lo que definimos anteriormente para medir el 50% de cobertura.