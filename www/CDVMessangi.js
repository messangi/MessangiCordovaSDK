//var exec = require('cordova/exec');


/**
 * Create a instance of Messangi SDK 
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

Messangi.prototype.init = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "init",[]);
};

/**
 * Verify if user is registered correctly 
 * @param  {function} success Invoke if user is successfully register
 * @param  {function} error Invoke if user not register yet
 * @return {void}
 */
Messangi.prototype.validUser = function(success,error){
  cordova.exec(success, error,"CDVMessangi","validUser",[])
};

/**
 * Get the User ID registered in Messangi 
 * @param  {function(phoneNumber)} Invoke if user is successfully register whit phoneNumber like parameter
 * @param  {function} Invoke if user not register yet
 * @return {void}
 */
Messangi.prototype.getUserID = function(success,error){
  cordova.exec(success, error,"CDVMessangi","getPhone",[]);
};

/**
 * Set the callback for the Push Received event
 * @param  {function(Message)} Invoke if a push notification arrive
 * @param  {function} Invoke in case of error
 * @return {void}
 */
Messangi.prototype.onPushReceived = function(success,error){
  cordova.exec(success, error,"CDVMessangi","pushCallback",[]);
};

/**
 * Set the callback for Location Update event
 * @param  {function(Location)} Invoke when a location update event are fired
 * @param  {function} Invoke in case of error
 * @return {void}
 */
Messangi.prototype.onLocationUpdate = function(success,error){
  cordova.exec(success, error,"CDVMessangi","locationCallback",[]);
};

Messangi.prototype.getCurrentLocation = function(success, error){
  cordova.exec(success, error, 'CDVMessangi', 'getCurrentLocation', []);
}

/**
 * Show auto registration dialog
 * @param  {function} callback if the action works well
 * @param  {function} callback if some error was occurred, include a error message like parameter
 * @param {String} Optional String parameter, if don't pass the system prompt for the user phone number
 * @constructor
 */
Messangi.prototype.register = function(success,error) {
  cordova.exec(success, error, "CDVMessangi", "register",[]);
}

/**
 * Register the User with Token in Messangi Backend
 * @param  {function} callback if the action works well
 * @param  {function} callback if some error was occurred, include a error message like parameter
 * @param {String} Optional String parameter, if don't pass the system prompt for the user phone number
 * @constructor
 */
Messangi.prototype.registerWithToken = function(success, error, token) {
  cordova.exec(success, error, "CDVMessangi", "register",[token]);
}

/**
 * First Step in custom register process, Send Phone Number to messangi Backend
 * @param  {function} call if phone user is successfully send to Messangi Server
 * @param  {function} call if some error is occurred, include a error message like parameter
 * @param  {String} Phone number to Register
 * @return {void}
 */
Messangi.prototype.registerWithPhone = function(success, error, phone) {
  cordova.exec(success, error, "CDVMessangi", "sendPhoneNumber", [phone]);
};

/**
 * Second step in custom register process, Send Validation code arrived from SMS to Messangi for validate the user registration
 * @param  {function} Invoke if Code validation is successfully send to Messangi.
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @param  {String} The code number arrived in SMS
 * @return {void}
 */
Messangi.prototype.activatePhoneWithCode = function(success,error,code){
  cordova.exec(success, error, "CDVMessangi", "sendValidationCode", [code]);
};

/**
 * List all Workspaces available for join
 * @param  {function} Invoke in successful execution, Include an Array with all distribution list available 
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @return {void}
 */
Messangi.prototype.getAvailableWorkspaces = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getAvailableWorkspaces", []);
};

/**
 * List all Workspaces subscribed by yours
 * @param  {function} Invoke in successful execution, Include an Array with all distribution list available 
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @return {void}
 */
Messangi.prototype.getSubscribedWorkspaces = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getSubscribedWorkspaces", []);
};

/**
 * Get your Default Workspace
 * @param  {function} Invoke in successful execution, Include an Array with all distribution list available 
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @return {void}
 */
Messangi.prototype.getDefaultWorkspace = function(success, error){
  cordova.exec(success, error, "CDVMessangi", "getDefaultWorkspace", []);
};

Messangi.prototype.getWorkspace = function(success, error, clientId){
  cordova.exec(success, error, 'CDVMessangi', 'getWorkspace', [clientId]);
}

/**
 * Join to new workspace and start receiving notifications from him
 * @param  {function} Invoke in successful execution  
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @param  {String} Client ID of workspace to subscribe
 * @return {void}
 */
Messangi.prototype.joinWorkspace = function(success, error, workspaceClientId){
  cordova.exec(success, error, "CDVMessangi", "joinWorkspace", [workspaceClientId]);
};

/**
 * Remove workspace and stop receiving notification from him
 * @param  {function} Invoke in successful execution
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @param  {String} Client ID of workspace to leave
 * @return {void}
 */
Messangi.prototype.leaveWorkspace = function(success, error, workspaceClientId){
  cordova.exec(success, error, "CDVMessangi", "leaveWorkspace", [workspaceClientId]);
};

/**
 * Send a simulate MO for the Workspace 
 * @param  {function} Invoke in successful execution
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @param  {String} Text of the MO simulated
 * @param  {String} (Optional) Client ID of workspace to send a message. By default use the Main Workspace
 * @return {void}
 */
Messangi.prototype.sendMessage = function(success, error, message, workspaceClientId){
  if(workspaceClientId !== null){
    cordova.exec(success, error, "CDVMessangi", "sendMessage", [workspaceClientId, message]);
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
 * Get All Notification received by Messangi in the device from the Workspace client ID specifiers 
 * @param  {function} Invoke in successfully execution, Include an Array with all Notification Saved in the device
 * @param  {function} Invoke if some error is occurred, include a error message like parameter
 * @param  {clientsIds} (Optional) Array with all clients ids of workspace to retrieve.  By default use the Main Workspace
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
 * Get GeoFeces send by messangi and saved in device
 * @param  {function} Invoke in successfully execution, Include an Array with all geoFence saved in device
 * @param  {function} Invoke if some error is occurred, Include a error message like parameter
 * @param  {clientsIds} (Optional) Array with all clients ids of workspace to retrieve.  By default use the Main Workspace
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
 * Get GeoFeces send by messangi and saved in device
 * @param  {function} Invoke in successfully execution, Include an Array with all geoFence saved in device
 * @param  {function} Invoke if some error is occurred, Include a error message like parameter
 * @param  {type} (Optional) String with the type of Beacon to retrieve, "all", "bluetooth" or "wifi" available types
 * @param  {clientsIds} (Optional) Array with all clients ids of workspace to retrieve.  By default use the Main Workspace
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
 * 
 * @return {Messangi} Instance of Messangi
 */
Messangi.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.Messangi = new Messangi();

  return window.plugins.Messangi;
};

cordova.addConstructor(Messangi.install);