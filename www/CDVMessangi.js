//var exec = require('cordova/exec');

/**
 * Message object generated and returned internally by the SDK. This is the message ogbect received as parameter when a new push notification is received.
 * @constructor
 * @param  {string} id - message unique identifier
 * @param  {string} blastId - blast identifier aqssociated with this message, if any
 * @param  {string} type - Message type (PUSH, BEACON_PUSH, GEOFENCE_PUSH, GEOPUSH)
 * @param  {string} from - Message sender
 * @param  {string} to - Message recipient
 * @param  {string} subject - Title for the message
 * @param  {string} text - HTML content of the message body
 * @param  {string} status - Current status code of the message
 * @param  {string} statusDescription - Status description of the current message
 * @param  {string} encoding - Encoding used in the text of the message
 * @param  {string} date - Date of delivery
 * @param  {string} timezone - Timezone set in backend where message was generated
 * @param  {string} clientId - Workspace internal identifier used to send push
 * @param  {string} appName - Application name to which the message was sent 
 * @param  {string} platform - Platform to which push was sent, can be ANDROID or IOS
 */
function Message(id, blastId, type, from, to, subject, text, status, statusDescription, encoding, date, timezone, clientId, appName, platform){

}


/**
 * Location object generated by the device operating system
 * @constructor
 * @param  {number} latitude - Latitude, in degrees
 * @param  {number} longitude - Longitude, in degrees
 * @param  {string} provider - Name of the provider that generated this fix
 * @param  {number} [time] - UTC time of this fix, in milliseconds since January 1, 1970
 * @param  {string} [timestamp] - The time at which this location was determined
 * @param  {number} [accuracy] - Get the estimated accuracy of this location, in meters
 * @param  {number} [horizontalAccuracy] - The accuracy of horizontal coordinates of this location, measured in meters
 * @param  {number} [verticalAccuracy] - The accuracy of altitude of this location, measured in meters
 * @param  {number} [altitude] - The altitude, if available, in meters above the WGS 84 reference ellipsoid. 
 * @param  {number} [bearing] - Horizontal direction of travel of this device, not related to the device orientation. It is guaranteed to be in the range (0.0, 360.0] if the device has a bearing
 * @param  {number} [speed] - Speed, if available, in meters per second over the ground
 * @param  {number} [course] - The direction in which device is traveling
 */
function Location(latitude, longitude, provider, time, accuracy, horizontalAccuracy, verticalAccuracy, altitude, bearing, speed, course){

}
/**
 * Workspace object generated by SDK
 * @constructor
 * @param  {string} name - Workspace name
 * @param  {string} clientId - Workspace identifier
 * @param  {boolean} subscribed - true if user is subscribed, false otherwise
 */
function Workspace(name, clientId, subscribed){

}  

/**
 * Geofence object generated by SDK
 * @constructor
 * @param  {string} regionId - Region identifier
 * @param  {string} geoFenceId - Geofence identifier
 * @param  {string} name - Name assigned in platform at the creation moment or last udpate
 * @param  {string} type - Geofence type
 * @param  {string} eventType - Event type which triggers the event
 * @param  {string} msgTitle - Notification title 
 * @param  {string} msgContent - Notification content
 * @param  {string} appName - Application name associtaed with this Geofence
 * @param  {string} timezone - Timezone set in the backend
 * @param  {string} update - Last time the geofence was updated
 * @param  {boolean} activated - true if geofence is active, false otherwise
 * @param  {string} clientId - Workspace internal identifier
 * @param  {number} latitude - Latitude, in degrees
 * @param  {number} longitude - Longitude, in degrees.
 * @param  {number} radius - Radio length of geofence in meters
 */
function Geofence(regionId, geoFenceId, name, type, eventType, msgTitle, msgContent, appName, timezone, update, activated, clientId, latitude, longitude, radius){

}

/**
 * Beacon object generated by SDK
 * @constructor
 * @param  {string} regionId - Region identifier
 * @param  {string} name - Name of the beacon
 * @param  {string} type - Beacon type
 * @param  {string} eventType - Type of event that fires this beacon trigger
 * @param  {string} msgTitle - Notification title
 * @param  {string} msgContent - Notification content
 * @param  {string} appName - Application name to which this push was sent 
 * @param  {string} timezone - Timezone of the platform that generated this message
 * @param  {string} update - Last update date of this beacon
 * @param  {boolean} activated - true if beacon is active, false otherwise
 * @param  {string} clientId -  Workspace internal identifier
 * @param  {string} uuid - Beacon identifier (non-unique, multiple beacons can share the same uuid)
 * @param  {string} manufacturer - Beacon's manufacturer name
 * @param  {number} major - Major number, identifies beacon together with uuid and minor
 * @param  {number} minor - Minor number, identifies beacon together with uuid and major
 * @param  {string} distanceString - Distance in which the event, enter or exit is generated
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
 * Enum for Priority values.
 * @readonly
 * @enum {number}
 */
Messangi.prototype.Priority = {
  /** Request "block" level accuracy. Block level accuracy is considered to be about 100 meter accuracy. Using a coarse accuracy such as this often consumes less power. */
  PRIORITY_BALANCED_POWER_ACCURACY: 102,
  /** Request the most accurate locations available. This will return the finest location available */
  PRIORITY_HIGH_ACCURACY: 100,
  /** Request "city" level accuracy. City level accuracy is considered to be about 10km accuracy. Using a coarse accuracy such as this often consumes less power. */
  PRIORITY_LOW_POWER: 104,
  /** (Default) Request the best accuracy possible with zero additional power consumption. No locations will be returned unless a different client has requested location updates in which case this request will act as a passive listener to those locations.*/
  PRIORITY_NO_POWER: 105
};


/**
 * Initializes the MessangiSDK plugin 
 * @param  {initCallback} success - If initialization finishes correctly
 * @param  {errorCallback} error - If any error happens in the initialization process
 * @return {void}
 */
Messangi.prototype.init = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "init",[]);
};

/**
 * Verifies if user is registered
 * @param  {function} success - If the function is called correctly
 * @param  {errorCallback} error - if any error is caught calling this method
 * @return {void}
 */
Messangi.prototype.validUser = function(success,error){
  cordova.exec(success, error,"CDVMessangi","validUser",[])
};

/**
 * Get the User ID registered in Messangi 
 * @param  {getUserIDCallback} success - Method to invoke if user is successfully registered with phoneNumber as parameter
 * @param  {getUserIDErrorCallback} error - Method to invoke if user is not yet registered
 * @return {void}
 */
Messangi.prototype.getUserID = function(success,error){
  cordova.exec(success, error,"CDVMessangi","getPhone",[]);
};

/**
 * Set the callback for the Push Received event
 * @param  {onPushReceivedCallback} success - Method to invoke if a push notification arrives
 * @param  {errorCallback} error - Method to invoke in case of error
 * @return {void}
 */
Messangi.prototype.onPushReceived = function(success,error){
  cordova.exec(success, error,"CDVMessangi","pushCallback",[]);
};

/**
 * Set the callback for Location Update event
 * @param  {onLocationUpdateCallback} success - Method to invoke when a location update event is fired
 * @param  {errorCallback} error - Method to invoke in case of error
 * @return {void}
 */
Messangi.prototype.onLocationUpdate = function(success,error){
  cordova.exec(success, error,"CDVMessangi","locationCallback",[]);
};

/**
 * Set the callback for Geofence Triggered event
 * @param  {onGeofenceTriggeredCallback} success - Method to invoke when a geofence is triggered
 * @param  {errorCallback} error - Method to invoke in case of error
 * @return {void}
 */
Messangi.prototype.onGeofenceTriggered = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "geofenceCallback", []);
}

/**
 * Get Current Location
 * @param  {getCurrentLocationCallback} success - Method to invoke when a location update event is fired
 * @param  {errorCallback} error - Method to invoke in case of error
 * @return {void}
 */
Messangi.prototype.getCurrentLocation = function(success, error){
  cordova.exec(success, error, 'CDVMessangi', 'getCurrentLocation', []);
}

/**
 * Show auto registration dialog
 * @param  {registerCallback} success - Method callback if registration is successful
 * @param  {errorCallback} error - Method callback if an error has occurred
 * @param {string} [token] - If phone number is not provided then a prompt is displayed
 */
Messangi.prototype.register = function(success, error, token) {
  cordova.exec(success, error, "CDVMessangi", "register", [token]);
}

/**
 * Register the User with Token in the Messangi Backend
 * @param  {registerWithTokenCallback} success - Method callback if the registration is successful
 * @param  {errorCallback} error - Method callback if an error has occurred
 * @param {string} [token] - If phone number is not provided then a prompt is displayed
 */
Messangi.prototype.registerWithToken = function(success, error, token) {
  cordova.exec(success, error, "CDVMessangi", "register", [token]);
}

/**
 * First Step in a custom registration process, sends phone number to Messangi Server
 * @param  {registerWithPhoneCallback} success - Method to invoke if the phone user is successfully sent to the Messangi Server
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string} phone - Phone number to register
 * @return {void}
 */
Messangi.prototype.registerWithPhone = function(success, error, phone) {
  cordova.exec(success, error, "CDVMessangi", "sendPhoneNumber", [phone]);
};

/**
 * Second step in custom registration process, sends the validation code arrived via SMS to Messangi to validate the user registration
 * @param  {activatePhoneWithCodeCallback} success - Invoked if code validation is successfully sent to Messangi.
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string} code - The code number arrived via SMS
 * @return {void}
 */
Messangi.prototype.activatePhoneWithCode = function(success, error, code){
  cordova.exec(success, error, "CDVMessangi", "sendValidationCode", [code]);
};

/**
 * Lists all Workspaces available to join
 * @param  {getAvailableWorkspacesCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @return {void}
 */
Messangi.prototype.getAvailableWorkspaces = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getAvailableWorkspaces", []);
};

/**
 * Lists all Workspaces to which the user is subscribed
 * @param  {getSubscribedWorkspacesCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @return {void}
 */
Messangi.prototype.getSubscribedWorkspaces = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getSubscribedWorkspaces", []);
};

/**
 * Gets the Default Workspace
 * @param  {getDefaultWorkspaceCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @return {void}
 */
Messangi.prototype.getDefaultWorkspace = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getDefaultWorkspace", []);
};

/**
 * Gets a Workspace using ClientID
 * @param {getWorkspaceCallback} success - Method to invoke after successful execution
 * @param {errorCallback} error - Method to invoke if an error has occurred
 * @param {string} clientId - The clientId of workspace to fetch
 * @return {void}
 */
Messangi.prototype.getWorkspace = function(success, error, clientId){
  cordova.exec(success, error, 'CDVMessangi', 'getWorkspace', [clientId]);
}

/**
 * Joins a new workspace and starts receiving notifications from it
 * @param  {joinWorkspaceCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string} clientId - clientId ID of workspace to subscribe
 * @return {void}
 */
Messangi.prototype.joinWorkspace = function(success, error, clientId){
  cordova.exec(success, error, "CDVMessangi", "joinWorkspace", [clientId]);
};

/**
 * Removes workspace subscription and stops receiving notifications from it
 * @param  {leaveWorkspaceCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string} clientId - clientId ID of the workspace to leave
 * @return {void}
 */
Messangi.prototype.leaveWorkspace = function(success, error, clientId){
  cordova.exec(success, error, "CDVMessangi", "leaveWorkspace", [clientId]);
};

/**
 * Sends a message from device to a workspace 
 * @param  {sendMessageCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string} message - Text to send to the Workspace
 * @param  {string} [clientId] - (Optional) Client ID of the workspace to which the message is being sent. By default uses the Main Workspace
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
 * Gets all the messages received by the MessangiSDK, filtering them by specific workspaces
 * @param  {listMessagesCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string[]} [clientsIds] - Array with all workspaces client IDs.  By default uses the Main Workspace
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
 * Gets all the Geofences received by the MessangiSDK, filtering them by specific workspaces
 * @param  {listGeofencesCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string[]} [clientsIds] - Array with all workspaces client IDs.  By default uses the Main Workspace
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
 * Gets all the Beacons received by MessangiSDK, filtering them by specific workspaces
 * @param  {listBeaconCallback} success - Method to invoke after successful execution
 * @param  {errorCallback} error - Method to invoke if an error has occurred
 * @param  {string} [type] - (Optional) string with the type of Beacon to retrieve; available types: "all", "bluetooth" or "wifi" 
 * @param  {string[]} [clientsIds] - (Optional) Array with all workspaces client IDs.  By default uses the Main Workspace
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

/**
 * (Only for Android) - Set the priority of the location request, is a strong hint to the LocationClient for which location sources to use.
 * @param  {Priority} priority - An accuracy or power constant 
 * @return {void}
 */
Messangi.prototype.setLocationPriority = function(priority){
  cordova.exec(null, null, "CDVMessangi", "setLocationPriority",[priority]);
}

/**
 * (Only for Android) - Set the desired interval for active location updates, in milliseconds. This interval is inexact. You may not receive updates at all (if no location sources are available), or you may receive them slower than requested. You may also receive them faster than requested (if other applications are requesting location at a faster interval).
 * @param  {number} interval - Desired interval in millisecond, inexact
 * @return {void}
 */
Messangi.prototype.setLocationInterval = function(interval){
  cordova.exec(null, null, "CDVMessangi", "setLocationInterval",[interval]);
}

/**
 * (Ony for Android) - Creating an instance power saver class can improve battery life by 60% by slowing down scans when your app is in the background.
 * @param {booleam} enable - true if are enable, false otherwise
 * @return {void}
 */
Messangi.prototype.setBluetoothPowerSaver = function(enable){
  cordova.exec(null, null, "CDVMessangi", "usePowerSaver",[enable]);
}

/**
 * (Ony for Android) - Allows devices with API 21+ will use the Android L APIs to scan for beacons, below 21 API use old Android Way.
 * @param {booleam} enable - true if are enable, false otherwise
 * @return {void}
 */
Messangi.prototype.useNewBeaconScanner = function(enable){
  cordova.exec(null, null, "CDVMessangi", "useAndroidLScanner", [enable]);
}

/**
 * (Ony for Android) - Allow the library to use a tracking cache
 * @param {boolean} enable - true if are enable, false otherwise
 * @return {void}
 */
Messangi.prototype.useBeaconTrackingCache = function(enable){
  cordova.exec(null, null, "CDVMessangi", "useTrackingCache", [enable]);
}

/**
 * (Ony for Android) - Elapsed time to check if Exit/Enter event will be triggered 
 * @param {number} millis - Set region exit period in milliseconds
 */
Messangi.prototype.setBeaconExitPeriod = function(millis){
  cordova.exec(null, null, "CDVMessangi", "setBeaconExitPeriod",[millis]);
}

/**
 * (Ony for Android) - Turns off saving the state of monitored regions to persistent storage so it is retained over app restarts. Defaults to enabled
 * @param {boolean} enable - true if are enable, false otherwise
 */
Messangi.prototype.keepRegionPersintence = function(enable){
  cordova.exec(null, null, "CDVMessangi", "useRegionPersistence",[enable]);
}

/**
 * (Ony for Android) - Enable or not automatically change between Background and Foreground modes. This method require app restart.
 * @param enable true if are enable, false otherwise
 */
Messangi.prototype.autoSetBeaconScanMode = function(enable){
  cordova.exec(null, null, "CDVMessangi", "autoSetScanMode",[enable]);
}

/**
 * (Ony for Android) - This method notifies the beacon service that the application is either moving to background mode.
 */
Messangi.prototype.scanBeaconsBackgroundMode = function(){
  cordova.exec(null, null, "CDVMessangi", "useBackgroundScanMode",[enable]);
}

/**
 * (Ony for Android) - This method notifies the beacon service that the application is either moving to foreground mode.
 */
Messangi.prototype.scanBeaconsForegroundMode = function(){
  cordova.exec(null, null, "CDVMessangi", "useForegroundScanMode",[enable]);
}

/**
 * (Ony for Android) - Set the duration in milliseconds of each Foreground Cycle
 * @param scanPeriod Sets the duration in milliseconds of each Bluetooth LE scan cycle to look for beacons.
 * @param sleepPeriod Sets the duration in milliseconds between each Bluetooth LE scan cycle to look for beacons.
 */
Messangi.prototype.setForegroundScanCycles = function(scanPeriod, sleepPeriod){
  cordova.exec(null, null, "CDVMessangi", "setForegroundScanCycles",[scanPeriod, sleepPeriod]);
}

/**
 * (Ony for Android) - Set the duration in milliseconds of each Background Cycle
 * @param scanPeriod Sets the duration in milliseconds of each Bluetooth LE scan cycle to look for beacons.
 * @param sleepPeriod Sets the duration in milliseconds between each Bluetooth LE scan cycle to look for beacons.
 */
Messangi.prototype.setBackgroundScanCycles = function(scanPeriod, sleepPeriod){
  cordova.exec(null, null, "CDVMessangi", "setBackgroundScanCycles",[scanPeriod, sleepPeriod]);
}

Messangi.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.Messangi = new Messangi();

  return window.plugins.Messangi;
};

cordova.addConstructor(Messangi.install);
