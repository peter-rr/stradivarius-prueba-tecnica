# Challenge de Casos de Prueba

## 1.1 ¿Qué vas a probar?

### Casos exitosos (happy path):

    - **[TC#1]** Login con credenciales existentes e introducidas de forma correcta (se rellenan los campos de email y password, y después se hace click en el botón de inicio de sesión).
    >> Expected result: El usuario puede acceder a la pantalla principal de la aplicación.

    - **[TC#2]** Click en el link de recuperación de password (en caso de existir).
    >> Expected result: Se muestra el modal informativo con las instrucciones a seguir.

### Casos de error:

    - **[TC#3]** Login con credenciales vacías.
    >> Expected result: Se muestra un mensaje de error correspondiente a cada campo (uno para email y otro para password). El usuario no puede acceder a la pantalla principal.

    - **[TC#4]** Login con credenciales incorrectas.
    >> Expected result: Se muestra un mensaje de error adecuado. El usuario no puede acceder a la pantalla principal.

    - **[TC#5]** Introducir combinaciones de email inválido, sin “@” o con caracteres especiales no permitidos.
    >> Expected result: Se muestra mensaje de error correspondiente.

    - **[TC#6]** Intentar varias veces login con un password incorrecto para un mismo email.
    >> Expected result: Tras un número de intentos, se muestra mensaje de “usuario bloqueado temporalmente” en el caso de existir mecanismo de bloqueo. En caso de no existir dicho mecanismo, se mostrará siempre el mensaje de error correspondiente al login con credenciales incorrectas.

### Condiciones de entorno: 

    - Ejecutar las pruebas para diferentes resoluciones, tanto en Web como en Mobile.
    - Web: Probar en diferentes navegadores (Firefox, Chrome, Safari, etc), priorizando aquellos que son más utilizados por los usuarios.
    - Mobile: Probar en las diferentes versiones de iOS y Android soportadas por la aplicación, poniendo foco en aquellas que son utilizadas por mayoría de usuarios.

## 1.2 ¿Qué automatizarías y en qué capa de la pirámide de pruebas lo ubicarías?

Siguiendo los principios de la pirámide pruebas, optaría por asignar un mayor peso a los **pruebas unitarias**, situadas en la base de la pirámide. Por lo que automatizaría todas las pruebas unitarias relacionadas con la validación de credenciales en la parte del backend, incluyendo toda la combinatoria y casos posibles (ya sean positivos, negativos o edge cases) y así tratar de alcanzar el máximo test coverage.

A continuación daría proridad a las **pruebas de integración**, situadas en el centro de la pirámide. Estas pruebas estarían destinadas a validar todos los endpoints de autenticación y comprobar su correcto funcionamiento para los diferentes casos de prueba.

Una vez cubiertas todas las pruebas unitarias y de integración, asignaría la menor prioridad a las **pruebas de interfaz de usuario (UI tests)**, situándolas en la cúspide de la pirámide. Con estas pruebas validaríamos todos los end-to-end tests descritos en el apartado anterior.

Con toda esta estructura de pruebas conseguiríamos optimizar el proceso de pruebas de una manera robusta y eficiente.
