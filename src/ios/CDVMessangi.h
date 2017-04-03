/********* CDVMessangi.h Cordova Plugin Implementation *******/
// Created by Jesus Torres -- 2/18/15.
// Basado en el trabajo de https://github.com/phonegap-build/PushPlugin

//#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import <MessangiSDK/Messangi.h>


@interface CDVMessangi : CDVPlugin {
    // Member variables go here.
}

- (void) messangiReady;
- (void) init:(CDVInvokedUrlCommand*)command;
- (void) register:(CDVInvokedUrlCommand *)command;
- (void) getPhone:(CDVInvokedUrlCommand*)command;
- (void) validUser:(CDVInvokedUrlCommand*)command;
- (void) pushCallback:(CDVInvokedUrlCommand*)command;
- (void) onPushReceived:(Message *)message;
- (void) locationCallback:(CDVInvokedUrlCommand*)command;
- (void) geofenceCallback:(CDVInvokedUrlCommand*)command;
- (void) onLocationUpdate;
- (void) getCurrentLocation:(CDVInvokedUrlCommand*)command;
- (void) sendPhoneNumber:(CDVInvokedUrlCommand*)command;
- (void) sendValidationCode:(CDVInvokedUrlCommand*)command;
- (void) getAvailableWorkspaces:(CDVInvokedUrlCommand*)command;
- (void) getSubscribedWorkspaces:(CDVInvokedUrlCommand*)command;
- (void) joinWorkspace:(CDVInvokedUrlCommand*)command;
- (void) leaveWorkspace:(CDVInvokedUrlCommand*)command;
- (void) getDefaultWorkspace:(CDVInvokedUrlCommand*)command;
- (void) getWorkspace:(CDVInvokedUrlCommand*)command;
- (void) listMessages:(CDVInvokedUrlCommand*)command;
- (void) sendMessage:(CDVInvokedUrlCommand*)command;
- (void) listGeofences:(CDVInvokedUrlCommand*)command;
- (void) listBeacons:(CDVInvokedUrlCommand*)command;

- (void) setLocationPriority:(CDVInvokedUrlCommand*)command;
- (void) setLocationInterval:(CDVInvokedUrlCommand*)command;

@end