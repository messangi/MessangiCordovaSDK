# Messangi Cordova SDK

Messangi cordova SDK se basa en la documentación oficial de Cordova para generar plugins nativos en la plataforma https://cordova.apache.org/docs/en/6.0.0/guide/hybrid/plugins/index.html

Básicamente funciona como un wrapper de MessangiSDK para IOS y Android

----------
## Configuración de la plataforma

### Certificados
#### iOS
En iOS para poder recibir notificaciones push es necesario hacer una gran cantidad de cosas para generar los certificados correspondientes, este proceso es largo y se explica en el siguiente link [Certificados IOS](https://www.messangi.com/documentation/doku.php?id=sdk:ios_certs) esto es **necesario** para poder continuar ya que la idea del Plugin es la recepción de notificaciones push.

#### Android
El proceso para Conseguir las credenciales de Google Cloud Messaging (GCM), se debe seguir la guia que proporcionamos para ello en el siguiente link [GCM - Credentials](https://www.messangi.com/documentation/doku.php?id=sdk:android_keys) esto es **necesario** para poder continuar ya que la idea del Plugin es la recepción de notificaciones push.

### Plataformas

#### IOS
Primero se debe agregar la plataforma al proyecto **PhoneGap/Cordova** 

```
    cordova platform add ios
```
En xCode hacer click sobre **open another project** y luego buscar el proyecto generado anteriormente, luego ir al directorio **platforms > ios** y abrir el que tenga la extensión **.xcworkspace**

Una vez abierto el proyecto en xCode, seleccionar la base del proyecto ( El nombre del proyecto en el panel izquierdo ), en la sección derecha, está seleccionada la pestaña **General**, en esta pestaña se encuentra el **Bundle Identifier**, este es el mismo referenciado desde el archivo **config.xml** es recomendable no modificar esto en xCode sino en el **config.xml** y luego hacer nuevamente el comando **cordova build ios**. En esta pestaña también está la información de signin y deploy.

En la pestaña **Capabilities** deben encenderse por lo menos las siguientes: 

- Push Notifications
- Background Modes
	- Location updates
	- Uses Bluetooth LE accessories
	- Background fetch
	- Remote notifications
- Associated Domains 	

**Nota:** Cualquier error que aparezca en este punto puede ser responsable de algún error cuando se genero el certificado.


En el archivo **AppDelegate+notification.m** se sobrescribe todo lo que en la documentación oficial se solicita sobrescribir o agregar de **AppDelegate**, por lo que no es necesaria su modificación a menos que se desee cambiar algún comportamiento base, el archivo **AppDelegate** Original no debe modificarse (Esto para permitir el funcionamiento junto con otros plugins)


#### ANDROID
Se recomienda utilizar **Android Studio** como nuevo IDE de desarrollo Oficial Android. Cordova es compatible desde la version 4 con Android Studio

Primero se debe agregar la plataforma al proyecto **PhoneGap/Cordova** 

```
    cordova platform add android
```

Ahora desde **Android Studio** de se puede abrir el proyecto creado en **<carpeta del proyecto>/platforms/android/**


----------
## Comenzando con el plugin

Luego de tener el proyecto base funcionando correctamente, ir al directorio base del proyecto e incluir el plugin agregando las variables necesarias de Messangi

```shell
	$>cordova plugin add cordova-plugin-messangi --variable APP_NAME=<Messangi Application Name> --variable PUBLIC_KEY=<Messangi Public Key or Client ID> --variable PRIVATE_KEY=<Messangi Private Key> --variable GCM_API_KEY=<Gcm Api Key> --variable GCM_PROJECT_NUMBER=<GCM Project Number>
```

|Variables|Description|Required|Platform|
|---------|-----------|--------|--------|
|APP_NAME |Esta variable es enviada a usted por el equipo de Messangi|SI|ANDROID - iOS|
|PUBLIC_KEY|Esta variable es enviada a usted por el equipo de Messangi|SI|ANDROID - iOS|
|PRIVATE_KEY|Esta variable es enviada a usted por el equipo de Messangi|SI|ANDROID - iOS|
|GCM_API_KEY|Esta variable debe conseguirla mediante GCM* y solicitar su registro directamente con el equipo de soporte|SI|ANDROID|
|GCM_PROJECT_NUMBER|Esta variable debe conseguirla mediante GCM* y solicitar su registro directamente con el equipo de soporte |SI|ANDROID|
|MMC_URL|Esta variable es enviada a usted por el equipo de Messangi|NO|ANDROID - iOS|
|MMC_INSTANCE_ID|Esta variable es enviada a usted por el equipo de Messangi|NO|ANDROID - iOS|

* Variables conseguidas en la sección **Certificados** subsección **android**


----------
## API
#[TODO]

----------
## Librerías 

### IOS
 - Messangi.Framework (Se instala automáticamente la versión que se descarga de este repositorio, se puede actualizar por una mas nueva si se desea)

### Android
 - messangisdk  (Se instala automáticamente la versión que se descarga de este repositorio, se puede actualizar por una mas nueva si se desea)

### TODO
 - General:
    - Listas de suscripción
    - Revisar y limpiar todos los comentarios

### Versión
3.2.0


