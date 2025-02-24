# Challenge de Casos de Prueba

## 1.1 ¿Qué vas a probar?

### Casos exitosos (happy path):

    * Action: Login con credenciales existentes e introducidas de forma correcta (se rellenan los campos de email y password, y depués se hace click en el botón de inicio de sesión).>> Expected result: El usuario puede acceder a la pantalla principal de la aplicación.
    * Action: Click en el link de recuperación de password (en caso de existir)>> Expected result: Se muestra el modal informativo con las instrucciones a seguir.

### Casos de error:

    * Action: Login con credenciales vacías.
    >> Expected result: Se muestra un mensaje de error correspondiente a cada campo (uno para email y otro para password). El usuario no puede acceder a la pantalla principal.

    * Action: Login con credenciales incorrectas.
    >> Expected result: Se muestra un mensaje de error adecuado. El usuario no puede acceder a la pantalla principal.

    * Action: Introducir combinaciones de email inválido, sin “@” o con caracteres especiales no permitidos.
    >> Expected result: Se muestra mensaje de error correspondiente.

    * Action: Intentar varias veces login con un password incorrecto para un mismo email.
    >> Expected result: Tras un número de intentos, se muestra mensaje de “usuario bloqueado temporalmente” en el caso de existir mecanismo de bloqueo. En caso de no existir dicho mecanismo, se mostrará siempre el mensaje de error correspondiente al login con credenciales incorrectas.

### Condiciones de entorno:

    * Ejecutar las pruebas para diferentes resoluciones, tanto en Web como en Mobile.
    * Web: Probar en diferentes navegadores (Firefox, Chrome, Safari, etc), priorizando aquellos que son más utilizados por los usuarios.
    * Mobile: Probar en las diferentes versiones de iOS y Android soportadas por la aplicación, poniendo foco en aquellas que son utilizadas por mayoría de usuarios.
