/**
 * Este callback resulta de obtener correctamente los beacons del dispositivo
 *
 * @callback listBeaconCallback
 * @param {Beacon[]} list - Array with all Beacons saved in device
 */

/**
 * Este callback resulta de obtener correctamente los geofences del dispositivo
 *
 * @callback listGeofencesCallback
 * @param {Geofence[]} list - Array with all GeoFence saved in device
 */

/**
 * Este callback resulta de obtener correctamente los geofences del dispositivo
 *
 * @callback listMessagesCallback
 * @param {Message[]} list - Array with all Notification saved in device
 */

/**
 * Este callback resulta de enviar correctamente un mensaje desde el dispositivo al workspace
 *
 * @callback sendMessageCallback
 */

/**
 * Este callback resulta de eliminar la subscripcion a un workspace
 *
 * @callback leaveWorkspaceCallback
 */

/**
 * Este callback resulta de agregar la subscripcion a un workspace
 *
 * @callback joinWorkspaceCallback
 * @param {Workspace} workspace - workspace joined
 */

/**
 * Este callback resulta de obtener el workspace por el clientId
 *
 * @callback getWorkspaceCallback
 * @param {Workspace} workspace - Workspace obtenido
 */

/**
 * Este callback resulta de obtener el workspace por defecto
 *
 * @callback getDefaultWorkspaceCallback
 * @param {Workspace} workspace - Default workspace
 */

/**
 * Este callback resulta de listar todos los workspace suscritos por el usuario
 *
 * @callback getSubscribedWorkspacesCallback
 * @param {Workspace[]} workspace - Lista de workspaces suscritos
 */

/**
 * Este callback resulta de listar todos los workspace disponibles para unirse
 *
 * @callback getAvailableWorkspacesCallback
 * @param {Workspace[]} workspace - Lista de workspace disponibles
 */

/**
 * Este callback resulta de validar correctamente el numero de telefono
 *
 * @callback activatePhoneWithCodeCallback
 */


/**
 * Este callback resulta de registrar correctamente el numero de telefono
 *
 * @callback registerWithPhoneCallback
 */

/**
 * Este callback resulta de registrar correctamente un token cualquiera
 *
 * @callback registerWithTokenCallback
 */

/**
 * Este callback resulta de registrar correctamente un token cualquiera
 *
 * @callback registerCallback
 */

/**
 * Este callback resulta de obtener correctamente la ubicacion actual del dispositivo
 *
 * @callback getCurrentLocationCallback
 * @param {Location} location - Objeto que representa la ubicacion actual del dispositivo
 */

/**
 * Este callback resulta de la actualizacion automatica de la ubicacion actual del dispositivo
 *
 * @callback onLocationUpdateCallback
 * @param {Location} location - Objeto que representa la ubicacion actual del dispositivo
 */

/**
 * Este callback es llamado cuando se recibe un nuevo Mensaje mediante una notificacion PUSH
 *
 * @callback onPushReceivedCallback
 * @param {Message} message - Nuevo mensaje recibido en el dispositivo
 */

/**
 * Este callback es llamado si todo funciona correctamente
 *
 * @callback getUserIDCallback
 * @param {boolean} valid - true si el usuario es valido y esta correctamente registrado, false en caso contrario 
 */


/**
 * Este callback es llamado si el usuario se encuentra registrado en el sistema
 *
 * @callback getUserIDCallback
 * @param {string} userID - String con el usuario que se registro
 */

/**
 * Este callback es llamado si el usuario no se encuentra registrado en el sistema
 *
 * @callback getUserIDErrorCallback
 * @param {string} error - Mensaje de error
 */

/**
 * Este callback es el resultado de algun error en el procesamiento de la funcion
 *
 * @callback errorCallback
 * @param {string} message - Error arrojado por la funcion
 */

/**
 * Este callback es llamado si el proceso de inicializacion culmina exitosamente
 *
 * @callback initCallback
 */