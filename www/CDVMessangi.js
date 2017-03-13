//var exec = require('cordova/exec');

/**
 * Objeto Mensaje generado y devuelto internamente por el SDK
 * @constructor
 * @param  {string} id - Id unico del mensaje
 * @param  {string} blastId - Identificador del Blast en el que se envio el mensaje
 * @param  {string} type - Tipo del mensaje
 * @param  {string} from - Emisor del mensaje
 * @param  {string} to - Receptor del mensaje
 * @param  {string} subject - Titulo del mensaje
 * @param  {string} text - Texto (en HTML) del mensaje enviado
 * @param  {string} status - Codigo del estado actual del mensaje
 * @param  {string} statusDescription - Descripcion del estado actual del mensaje
 * @param  {string} encoding - Encoding utilizado en el texto del mensaje
 * @param  {string} date - Fecha en la que se genero el mensaje
 * @param  {string} timezone - Timezone configurado en el backend en el que se genero el mensaje
 * @param  {string} clientId - identificador del workspace al que se envio el push
 * @param  {string} appName - Nombre de la aplicacion a la que se envio el push 
 * @param  {string} platform - Plataforma a la que se envio el push, puede ser ANDROID o IOS
 */
function Message(id, blastId, type, from, to, subject, text, status, statusDescription, encoding, date, timezone, clientId, appName, platform){

}


/**
 * Objeto Location generado por el sistema operativo del dispositivo
 * @constructor
 * @param  {number} latitude - Get the latitude, in degrees.
 * @param  {number} longitude - Get the longitude, in degrees.
 * @param  {string} provider - Returns the name of the provider that generated this fix.
 * @param  {number} [time] - Return the UTC time of this fix, in milliseconds since January 1, 1970.
 * @param  {string} [timestamp] - The time at which this location was determined.
 * @param  {number} [accuracy] - Get the estimated accuracy of this location, in meters.
 * @param  {number} [horizontalAccuracy] - The radius of uncertainty for the location, measured in meters.
 * @param  {number} [verticalAccuracy] - The accuracy of the altitude value in meters.
 * @param  {number} [altitude] - Get the altitude if available, in meters above the WGS 84 reference ellipsoid. 
 * @param  {number} [bearing] - Bearing is the horizontal direction of travel of this device, and is not related to the device orientation. It is guaranteed to be in the range (0.0, 360.0] if the device has a bearing.
 * @param  {number} [speed] - Get the speed if it is available, in meters/second over ground.
 * @param  {number} [course] - The direction in which the device is traveling.
 */
function Location(latitude, longitude, provider, time, accuracy, horizontalAccuracy, verticalAccuracy, altitude, bearing, speed, course){

}
/**
 * Objeto Workspace generado por el SDK
 * @constructor
 * @param  {string} name - Nombre del workspace
 * @param  {string} clientId - Identificador del workspace
 * @param  {boolean} subscribed - true si el usuario esta suscrito al workspace, false en caso contrario
 */
function Workspace(name, clientId, subscribed){

}  

/**
 * Objeto Geofence generado por el SDK
 * @constructor
 * @param  {string} regionId - Identificador de la Region
 * @param  {string} geoFenceId - Identificador del Geofence
 * @param  {string} name - Nombre asigando en la plataforma al momento de creacion o ultima actualizacion
 * @param  {string} type - Tipo de Geofence
 * @param  {string} eventType - Tipo de evento que genera que se dispare el evento
 * @param  {string} msgTitle - Titulo de la notificacion 
 * @param  {string} msgContent - Contenido de la notificacion
 * @param  {string} appName - Nombre de la aplicacion a la que se envio el push 
 * @param  {string} timezone - Timezone configurado en el backend en el que se genero el mensaje
 * @param  {string} update - Ultima fecha de actualizacion del geofence
 * @param  {boolean} activated - true si el geofence se encuentra activado, false en caso contrario
 * @param  {string} clientId - identificador del workspace que generara el evento
 * @param  {number} latitude - Get the latitude, in degrees.
 * @param  {number} longitude - Get the longitude, in degrees.
 * @param  {number} radius - Radio que ocupa el geofence
 */
function Geofence(regionId, geoFenceId, name, type, eventType, msgTitle, msgContent, appName, timezone, update, activated, clientId, latitude, longitude, radius){

}

/**
 * Objeto Beacon generado por el SDK
 * @constructor
 * @param  {string} regionId - Identificador de la Region
 * @param  {string} name - Nombre asigando en la plataforma al momento de creacion o ultima actualizacion
 * @param  {string} type - Tipo de Beacon
 * @param  {string} eventType - Tipo de evento que genera que se dispare el evento
 * @param  {string} msgTitle - Titulo de la notificacion 
 * @param  {string} msgContent - Contenido de la notificacion
 * @param  {string} appName - Nombre de la aplicacion a la que se envio el push 
 * @param  {string} timezone - Timezone configurado en el backend en el que se genero el mensaje
 * @param  {string} update - Ultima fecha de actualizacion del beacon
 * @param  {boolean} activated - true si el beacon se encuentra activado, false en caso contrario
 * @param  {string} clientId - identificador del workspace que generara el evento
 * @param  {string} uuid - Identificado del Beacon (NO es unico, multiples beacon pueden tener el mismo uuid)
 * @param  {string} manufacturer - Manufacturer de el beacon
 * @param  {number} major - Numero de Major para identificar al beacon junto con uuid y minor
 * @param  {number} minor - Numero de Minor para identificar al beacon junto con uuid y major
 * @param  {string} distanceString - Distancia a la que se generara el evento de entrada o salida del beacon
 */
function Beacon(regionId, name, type, eventType, msgTitle, msgContent, appName, timezone, update, activated, clientId, uuid, manufacturer, major, minor, distanceString){

}

/**
 * @constructor
 */
function Messangi() {
  this.setDefaultWorkspace = function (callback) {
    function successfull(workspace){
      console.log(workspace);
      this.dWorkspace = workspace;
      callback();
    }

    function fail (message) {
      callback(message);
    }
    
    if(this.dWorkspace && this.dWorkspace.clientID){
      callback();
    }else{
      this.getDefaultWorkspace(successfull, fail);
    }
  }
}

/**
 * Inicializa el Plugin de MessangiSDK 
 * @param  {initCallback} success - Si el proceso de inicializacion culmina correctamente
 * @param  {errorCallback} error - Si ocurre algun error en el proceso de inicializacion
 * @return {void}
 */
Messangi.prototype.init = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "init",[]);
};

/**
 * Verify if user is registered
 * @param  {function} success - Si la validacion ocurre correctamente
 * @param  {errorCallback} error - si algun error ocurren en el metodoo
 * @return {void}
 */
Messangi.prototype.validUser = function(success,error){
  cordova.exec(success, error,"CDVMessangi","validUser",[])
};

/**
 * Get the User ID registered in Messangi 
 * @param  {getUserIDCallback} success - Invoke if user is successfully register with phoneNumber like parameter
 * @param  {getUserIDErrorCallback} error - Invoke if user not register yet
 * @return {void}
 */
Messangi.prototype.getUserID = function(success,error){
  cordova.exec(success, error,"CDVMessangi","getPhone",[]);
};

/**
 * Set the callback for the Push Received event
 * @param  {onPushReceivedCallback} success - Invoke if a push notification arrive
 * @param  {errorCallback} error - Invoke in case of error
 * @return {void}
 */
Messangi.prototype.onPushReceived = function(success,error){
  cordova.exec(success, error,"CDVMessangi","pushCallback",[]);
};

/**
 * Set the callback for Location Update event
 * @param  {onLocationUpdateCallback} success - Invoke when a location update event are fired
 * @param  {errorCallback} error - Invoke in case of error
 * @return {void}
 */
Messangi.prototype.onLocationUpdate = function(success,error){
  cordova.exec(success, error,"CDVMessangi","locationCallback",[]);
};

/**
 * Get Current Location
 * @param  {getCurrentLocationCallback} success - Invoke when a location update event are fired
 * @param  {errorCallback} error - Invoke in case of error
 * @return {void}
 */
Messangi.prototype.getCurrentLocation = function(success, error){
  cordova.exec(success, error, 'CDVMessangi', 'getCurrentLocation', []);
}

/**
 * Show auto registration dialog
 * @param  {registerCallback} success - callback if the action works well
 * @param  {errorCallback} error - callback if some error was occurred
 * @param {string} [token] - if don't pass the system prompt for the user phone number
 */
Messangi.prototype.register = function(success, error, token) {
  cordova.exec(success, error, "CDVMessangi", "register", [token]);
}

/**
 * Register the User with Token in Messangi Backend
 * @param  {registerWithTokenCallback} success - callback if the action works well
 * @param  {errorCallback} error - callback if some error was occurred
 * @param {string} [token] - if don't pass the system prompt for the user phone number
 */
Messangi.prototype.registerWithToken = function(success, error, token) {
  cordova.exec(success, error, "CDVMessangi", "register", [token]);
}

/**
 * First Step in custom register process, Send Phone Number to messangi Server
 * @param  {registerWithPhoneCallback} success - call if phone user is successfully send to Messangi Server
 * @param  {errorCallback} error - call if some error is occurred
 * @param  {string} phone - Phone number to Register
 * @return {void}
 */
Messangi.prototype.registerWithPhone = function(success, error, phone) {
  cordova.exec(success, error, "CDVMessangi", "sendPhoneNumber", [phone]);
};

/**
 * Second step in custom register process, Send Validation code arrived from SMS to Messangi for validate the user registration
 * @param  {activatePhoneWithCodeCallback} success - Invoke if Code validation is successfully send to Messangi.
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string} code - The code number arrived in SMS
 * @return {void}
 */
Messangi.prototype.activatePhoneWithCode = function(success, error, code){
  cordova.exec(success, error, "CDVMessangi", "sendValidationCode", [code]);
};

/**
 * List all Workspaces available for join
 * @param  {getAvailableWorkspacesCallback} success - Invoke in successful execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @return {void}
 */
Messangi.prototype.getAvailableWorkspaces = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getAvailableWorkspaces", []);
};

/**
 * List all Workspaces subscribed by the user
 * @param  {getSubscribedWorkspacesCallback} success - Invoke in successful execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @return {void}
 */
Messangi.prototype.getSubscribedWorkspaces = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getSubscribedWorkspaces", []);
};

/**
 * Get your Default Workspace
 * @param  {getDefaultWorkspaceCallback} success - Invoke in successful execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @return {void}
 */
Messangi.prototype.getDefaultWorkspace = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getDefaultWorkspace", []);
};

/**
 * Get Workspace using ClientID
 * @param {getWorkspaceCallback} success - Invoke in successful execution
 * @param {errorCallback} error - Invoke if some error is occurred
 * @param {string} clientId - clientId of workspace to fetch
 * @return {void}
 */
Messangi.prototype.getWorkspace = function(success, error, clientId){
  cordova.exec(success, error, 'CDVMessangi', 'getWorkspace', [clientId]);
}

/**
 * Join to new workspace and start receiving notifications from him
 * @param  {joinWorkspaceCallback} success - Invoke in successful execution  
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string} clientId - clientId ID of workspace to subscribe
 * @return {void}
 */
Messangi.prototype.joinWorkspace = function(success, error, clientId){
  cordova.exec(success, error, "CDVMessangi", "joinWorkspace", [clientId]);
};

/**
 * Remove workspace subscription and stop receiving notification from him
 * @param  {leaveWorkspaceCallback} success - Invoke in successful execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string} clientId - clientId ID of workspace to leave
 * @return {void}
 */
Messangi.prototype.leaveWorkspace = function(success, error, clientId){
  cordova.exec(success, error, "CDVMessangi", "leaveWorkspace", [clientId]);
};

/**
 * Envia un mensaje desde el dispositivo al workspace 
 * @param  {sendMessageCallback} success - Invoke in successful execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string} message - Text to send to Workspace
 * @param  {string} [clientId] - (Optional) Client ID of workspace to send a message. By default use the Main Workspace
 * @return {void}
 */
Messangi.prototype.sendMessage = function(success, error, message, clientId){
  if(clientId !== null){
    cordova.exec(success, error, "CDVMessangi", "sendMessage", [clientId, message]);
  }else{
    this.setDefaultWorkspace(function(err){
      if(this.dWorkspace !== null){
        cordova.exec(success, error, "CDVMessangi", "sendMessage", [this.dWorkspace.clientID, message]);  
      }else{
        error(err || 'Error loading default Workspace');
      }
    });
  }
};

/**
 * Obtiene todos los Mensajes recibidos por MessangiSDK filtrando por los workspaces especificados
 * @param  {listMessagesCallback} success - Invoke in successfully execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string[]} [clientsIds] - Array with all clients ids of workspace to retrieve.  By default use the Main Workspace
 * @return {void}
 */
Messangi.prototype.listMessages = function(success, error, clientsIds){
  if(clientsIds !== null){
    cordova.exec(success, error, "CDVMessangi", "listMessages", clientsIds);
  }else{
    this.setDefaultWorkspace(function(err){
      if(this.dWorkspace !== null){
        cordova.exec(success, error, "CDVMessangi", "listMessages", [this.dWorkspace.clientID]);
      }else{
        error(err || 'Error loading default Workspace');
      }
    });
  }
};

/**
 * Obtiene todos los Geofences recibidos por MessangiSDK filtrando por los workspaces especificados
 * @param  {listGeofencesCallback} success - Invoke in successfully execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string[]} [clientsIds] - Array with all clients ids of workspace to retrieve.  By default use the Main Workspace
 * @return {void}
 */
Messangi.prototype.listGeofences = function(success, error, clientsIds){
  if(clientsIds !== null){
    cordova.exec(success, error, "CDVMessangi", "listGeofences", clientsIds);
  }else{
    this.setDefaultWorkspace(function(err){
      if(this.dWorkspace !== null){
        cordova.exec(success, error, "CDVMessangi", "listGeofences", [this.dWorkspace.clientID]);
      }else{
        error(err || 'Error loading default Workspace');
      }
    });
  }
};

/**
 * Obtiene todos los Beacons recibidos por MessangiSDK filtrando por los workspaces especificados
 * @param  {listBeaconCallback} success - Invoke in successfully execution
 * @param  {errorCallback} error - Invoke if some error is occurred
 * @param  {string} [type] - (Optional) string with the type of Beacon to retrieve, "all", "bluetooth" or "wifi" available types
 * @param  {string[]} [clientsIds] - (Optional) Array with all clients ids of workspace to retrieve.  By default use the Main Workspace
 * @return {void}
 */
Messangi.prototype.listBeacons = function(success, error, type, clientsIds){
  var clone = clientsIds && clientsIds.slice(0) || [];
  clone.unshift(type || 'all');
  
  if(clone.length > 1){
    cordova.exec(success, error, "CDVMessangi", "listBeacons", clone);
  }else{
    this.setDefaultWorkspace(function(err){
      if(this.dWorkspace !== null){
        cordova.exec(success, error, "CDVMessangi", "listBeacons", [type || 'all' , this.dWorkspace.clientID]);
      }else{
        error(err || 'Error loading default Workspace');
      }
    });
  }
};

Messangi.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.Messangi = new Messangi();

  return window.plugins.Messangi;
};

cordova.addConstructor(Messangi.install);