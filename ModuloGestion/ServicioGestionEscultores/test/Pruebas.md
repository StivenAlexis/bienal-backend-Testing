# Documentación de Pruebas: Sistema de Gestión de Escultores

## Índice
1. [Propósito de los Archivos de Prueba](#propósito-de-los-archivos-de-prueba)
2. [Descripción de SculptorController.test.js](#descripción-de-sculptorcontrollertestjs)
3. [Descripción de SculptorUseCase.test.js](#descripción-de-sculptorusecasetestjs)
4. [Relación entre los Módulos](#relación-entre-los-módulos)
5. [Instrucciones para Ejecución de Pruebas](#instrucciones-para-ejecución-de-pruebas)


## Propósito de los Archivos de Prueba
El propósito de los archivos de prueba es garantizar que tanto la lógica de negocio como la gestión de respuestas HTTP en el sistema de gestión de escultores funcionen correctamente. Las pruebas se dividen en dos capas:

- **Pruebas de Controlador**: Verifican que el controlador maneje correctamente las solicitudes HTTP.
- **Pruebas de Caso de Uso**: Validan la lógica de negocio sin incluir lógica de presentación o HTTP.

---

## Descripción de `SculptorController.test.js`
Este archivo contiene pruebas unitarias para los métodos de `SculptorController`. Cada prueba asegura que el controlador maneje correctamente las solicitudes y respuestas, llamando a los servicios adecuados y generando los códigos y mensajes HTTP correspondientes.

### Pruebas Individuales:
- **should add a sculptor**  
  Verifica que `addSculptor` llama al servicio `addSculptor` con los datos de la solicitud y responde con un estado `201` y el mensaje de éxito correspondiente.

- **should get a sculptor by name**  
  Comprueba que `getSculptor` obtiene un escultor por su nombre y retorna un estado `200` junto con los datos del escultor.

  ...


## Descripción de `SculptorUseCase.test.js`
Este archivo contiene pruebas para validar la lógica de negocio del caso de uso `SculptorUseCase`, que interactúa directamente con el repositorio de escultores.

### Pruebas Individuales:
- **should add a sculptor**  
  Comprueba que `addSculptor` llama al método `add` en el repositorio con los datos correctos del escultor.

- **should get a sculptor by name**  
  Verifica que `getSculptor` devuelve el escultor correcto al buscar por nombre.

  ...


## Relación entre los Módulos
- `SculptorController.test.js` depende de `SculptorUseCase` para verificar la interacción correcta entre las solicitudes HTTP y la lógica de negocio.
- `SculptorUseCase.test.js` se centra exclusivamente en validar la lógica interna de `SculptorUseCase`, simulando las interacciones con `sculptorRepository`.

---

## Instrucciones para Ejecución de Pruebas
1. Asegúrate de que tienes `jest` instalado en el proyecto. Si no es así, instálalo con:

   ```bash
   npm install --save-dev jest
2.Ejecuta todas las pruebas con el comando:
    ```bash
    npm test
3.Los resultados mostrarán qué pruebas han pasado o fallado, ayudando a identificar errores en el código o en la lógica de negocio.
