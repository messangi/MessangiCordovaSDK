/**
 * This callback is invoked when the list of beacons has been successfully loaded in the SDK
 *
 * @callback listBeaconCallback
 * @param {Beacon[]} list - Array with all Beacons saved in device
 */

/**
 * This callback is invoked when the list of geofences has been successfully loaded in the SDK
 *
 * @callback listGeofencesCallback
 * @param {Geofence[]} list - Array with all GeoFence saved in device
 */

/**
 * This callback is invoked when the list of messages has been successfully loaded in the SDK
 *
 * @callback listMessagesCallback
 * @param {Message[]} list - Array with all Notification saved in device
 */

/**
 * This callback is invoked when an outgoing message has been successfully sent from the app to the ME platform
 *
 * @callback sendMessageCallback
 */

/**
 * This callback is invoked when the user leaves a workspace
 *
 * @callback leaveWorkspaceCallback
 */

/**
 * This callback is invoked when the user joins a workspace
 *
 * @callback joinWorkspaceCallback
 * @param {Workspace} workspace - workspace joined
 */

/**
 * This callback is invoked when the user requests a workspace by ID
 *
 * @callback getWorkspaceCallback
 * @param {Workspace} workspace - Workspace
 */

/**
 * This callback is invoked after obtaining the default workspace
 *
 * @callback getDefaultWorkspaceCallback
 * @param {Workspace} workspace - Default workspace
 */

/**
 * This callback is invoked with the list of all the workspaces to which the user is subscribed
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
 * This callback is invoked after successfully activating the mobile number
 *
 * @callback activatePhoneWithCodeCallback
 */


/**
 * This callback is invoked after successfully registering the mobile number
 *
 * @callback registerWithPhoneCallback
 */

/**
 * This callback is invoked after successfully registering a token
 *
 * @callback registerWithTokenCallback
 */

/**
 * This callback is invoked after registering the device
 *
 * @callback registerCallback
 */

/**
 * This callback is invoked after obtaining the device location
 *
 * @callback getCurrentLocationCallback
 * @param {Location} location - Device location
 */

/**
 * This callback is invoked after when Geofence is triggered
 * @callback onGeofenceTriggeredCallback
 * @param {Geofence} geofence - Geofence Triggered
 */

/**
 * This callback is invoked when the location of the device is updated
 *
 * @callback onLocationUpdateCallback
 * @param {Location} location - Device location
 */

/**
 * This callback is invoked when a new push notification is received
 *
 * @callback onPushReceivedCallback
 * @param {Message} message - Notification
 */

/**
 * This callback is invoked to validate that the user was successfully registered
 *
 * @callback getUserIDCallback
 * @param {boolean} valid - true if the user is valid and was successfully registered, false otherwise
 */


/**
 * This callback is invoked to obtain the user ID
 *
 * @callback getUserIDCallback
 * @param {string} userID - User ID
 */

/**
 * This callback is invoked if the retrieval of the user ID failed or the user registration is invalid
 *
 * @callback getUserIDErrorCallback
 * @param {string} error - Error message
 */

/**
 * This is the generic error callback, invoked when a generic error occurs in the SDK
 *
 * @callback errorCallback
 * @param {string} message - Error message
 */

/**
 * This callback is invoked after the initialization process is complete successfully
 *
 * @callback initCallback
 */
