/**
 * This callback is called when the list of beacons has been successfully loaded in the SDK
 *
 * @callback listBeaconCallback
 * @param {Beacon[]} list - Array with all Beacons saved in device
 */

/**
 * This callback is called when the list of geofences has been successfully loaded in the SDK
 *
 * @callback listGeofencesCallback
 * @param {Geofence[]} list - Array with all GeoFence saved in device
 */

/**
 * This callback is called when the list of messages has been successfully loaded in the SDK
 *
 * @callback listMessagesCallback
 * @param {Message[]} list - Array with all Notification saved in device
 */

/**
 * This callback is called when an outgoing message has been successfully sent from the app to the ME platform
 *
 * @callback sendMessageCallback
 */

/**
 * This callback is called when the user leaves a workspace
 *
 * @callback leaveWorkspaceCallback
 */

/**
 * This callback is called when the user joins a workspace
 *
 * @callback joinWorkspaceCallback
 * @param {Workspace} workspace - workspace joined
 */

/**
 * This callback is called when the user requests a workspace by ID
 *
 * @callback getWorkspaceCallback
 * @param {Workspace} workspace - Workspace
 */

/**
 * This callback is called after obtaining the default workspace
 *
 * @callback getDefaultWorkspaceCallback
 * @param {Workspace} workspace - Default workspace
 */

/**
 * This callback is called with the list of all the workspaces to which the user is subscribed
 *
 * @callback getSubscribedWorkspacesCallback
 * @param {Workspace[]} workspace - List of subscribed workspaces
 */

/**
 * This callback returns the list of all the available workspaces to which the user can subscribe
 *
 * @callback getAvailableWorkspacesCallback
 * @param {Workspace[]} workspace - List of available workspaces
 */

/**
 * This callback is called after successfully activating the mobile number
 *
 * @callback activatePhoneWithCodeCallback
 */


/**
 * This callback is called after successfully registering the mobile number
 *
 * @callback registerWithPhoneCallback
 */

/**
 * This callback is called after successfully registering a token
 *
 * @callback registerWithTokenCallback
 */

/**
 * This callback is called after registering the device
 *
 * @callback registerCallback
 */

/**
 * This callback is called after obtaining the device location
 *
 * @callback getCurrentLocationCallback
 * @param {Location} location - Device location
 */

/**
 * This callback is called when the location of the device is updated
 *
 * @callback onLocationUpdateCallback
 * @param {Location} location - Device location
 */

/**
 * This callback is called when a new push notification is received
 *
 * @callback onPushReceivedCallback
 * @param {Message} message - Notification
 */

/**
 * This callback is called to validate that the user was successfully registered
 *
 * @callback getUserIDCallback
 * @param {boolean} valid - true if the user is valid and was successfully registered, false otherwise
 */


/**
 * This callback is called to obtain the user ID
 *
 * @callback getUserIDCallback
 * @param {string} userID - User ID
 */

/**
 * This callback is called if the retrieval of the user ID failed or the user registration is invalid
 *
 * @callback getUserIDErrorCallback
 * @param {string} error - Error message
 */

/**
 * This is the generic error callback, called when a generic error occurs in the SDK
 *
 * @callback errorCallback
 * @param {string} message - Error message
 */

/**
 * This callback is called after the initialization process is complete successfully
 *
 * @callback initCallback
 */
