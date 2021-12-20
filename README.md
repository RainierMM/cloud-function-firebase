# Serverless function (Firebase - Cloud function)

La siguiente función tiene como objetivo obtener, y crear datos sobre la base de datos en tiempo real de firebase.

## Instala Firebase CLI

Puedes instalar Firebase CLI con un método que coincida con tu sistema operativo, nivel de experiencia o caso de uso. Sin importar cómo la instales, tendrás acceso a las mismas funciones y al comando firebase.

#### Windows, macOS y Linux.

```
npm install -g firebase-tools
```

### Accede a Firebase CLI y pruébala

Debes autenticarte después de instalar la CLI. Para confirmar la autenticación, puedes enumerar tus proyectos de Firebase.
Accede a Firebase con tu Cuenta de Google ejecutando el siguiente comando:

```
firebase login
```

Enumera tus proyectos de Firebase para probar que se instaló correctamente la CLI y que accediste a tu cuenta. Ejecuta el siguiente comando:

```
firebase projects:list
```

La lista que se muestra debe ser la misma que los proyectos de Firebase enumerados en Firebase console.

## Inicia tu proyecto de firebase

Acceder al repositorio con la consola, y escribir el siguiente comando:

```
firebase init
```

Seguir los pasos correspondientes, seleccionar como "Feature" la opción "Functions".
Recordar seleccionar JavaScript como lenguaje, y no sobreescribir los archivos.
Finalmente instalar las dependencias con npm.

## Personaliza, y despliega

En el archivo index.js dentro de la carpeta "functions" hay una constante llamada "standardPath", ahí debe ingresar el path o referencia (string) del nodo que quiere ejecutar las peticiones https en su base de datos en tiempo real.

[Endpoints doc](https://documenter.getpostman.com/view/14109379/UVRBkki8)

Finalmente para desplegar la función, solo debe ingresar el siguiente comando:

```
firebase deploy
```
