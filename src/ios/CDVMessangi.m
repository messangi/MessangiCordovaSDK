/********* CDVMessangi.m Cordova Plugin Implementation *******/
// Created by Jesus Torres -- 2/18/15.
// Basado en el trabajo de https://github.com/phonegap-build/PushPlugin

#import "CDVMessangi.h"
#import <time.h>
#import <xlocale.h>


@implementation CDVMessangi

static NSString *callbackId;
static NSString *initCallbackId;
static NSString *pushCallbackId;
static NSString *locationCallbackId;

- (void)init:(CDVInvokedUrlCommand*)command
{
    NSLog(@"init");
    [[Messangi sharedInstance] initMessangi];
    initCallbackId = command.callbackId;
}

- (void) messangiReady
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:initCallbackId];
}

- (void)register:(CDVInvokedUrlCommand *)command
{
    NSLog(@"Register");
    
    NSInteger count = [command.arguments count];
    NSString *token = nil;
    if(count > 0){
        token = [command.arguments objectAtIndex:0];
    }

    //TODO: Hacer que registerWithUserID y registerDialog devuelvan si todo esta OK, actualmente son tipo VOID
    if(token != nil){
        [[Messangi sharedInstance] registerWithUserID:token];
    }else{
        [[Messangi sharedInstance] registerDialog];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getPhone:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *phone = [defaults objectForKey:@"clientUserID"];

    if(phone != nil){
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:phone];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Not phone register yet"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)validUser:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        CDVPluginResult* pluginResult = nil;
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        BOOL success = [defaults objectForKey:@"clientUserID"] != nil;
        success = success && [[defaults objectForKey:@"validated"] isEqual: @"YES"];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:success];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)pushCallback:(CDVInvokedUrlCommand*)command
{
    pushCallbackId = command.callbackId;
}

- (void)onPushReceived:(Message *)message
{
    if(pushCallbackId != nil){
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:[message serialize]];
        [pluginResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:pushCallbackId];
    }
}

- (void)locationCallback:(CDVInvokedUrlCommand*)command
{
    locationCallbackId = command.callbackId;
}

- (void)onLocationUpdate
{
    //TODO: Aun el SDK de iOS no devuelve las update de location
    if(locationCallbackId != nil){
        CLLocation * location = [[Messangi sharedInstance] messangiLastLocation];
        NSLog(@"onLocationUpdate: %@",[location debugDescription]);

        NSMutableDictionary* dictRep = [NSMutableDictionary dictionary];
        
        [dictRep setObject:[NSNumber numberWithDouble:location.coordinate.latitude] forKey:@"latitude"];
        [dictRep setObject:[NSNumber numberWithDouble:location.coordinate.longitude] forKey:@"longitude"];
        
        //   Using reference date since PHP and MySQL use Jan 1st 2001
        [dictRep setObject:[NSNumber numberWithDouble:[location.timestamp timeIntervalSinceReferenceDate]] forKey:@"timestamp"];
        [dictRep setObject:[NSNumber numberWithDouble:location.altitude] forKey:@"altitude"];
        
        [dictRep setObject:[NSNumber numberWithDouble:location.course] forKey:@"course"];
        [dictRep setObject:[NSNumber numberWithDouble:location.speed] forKey:@"speed"];
        
        [dictRep setObject:[NSNumber numberWithDouble:location.horizontalAccuracy] forKey:@"horizontalAccuracy"];
        [dictRep setObject:[NSNumber numberWithDouble:location.verticalAccuracy] forKey:@"verticalAccuracy"];

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictRep];
        [pluginResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:locationCallbackId];
    }
}

- (void)getCurrentLocation:(CDVInvokedUrlCommand*)command
{
    CLLocation * location = [[Messangi sharedInstance] messangiLastLocation];
    NSLog(@"getCurrentLocation: %@",[location debugDescription]);

    NSMutableDictionary* dictRep = [NSMutableDictionary dictionary];
    
    [dictRep setObject:[NSNumber numberWithDouble:location.coordinate.latitude] forKey:@"latitude"];
    [dictRep setObject:[NSNumber numberWithDouble:location.coordinate.longitude] forKey:@"longitude"];
    
    //   Using reference date since PHP and MySQL use Jan 1st 2001
    [dictRep setObject:[NSNumber numberWithDouble:[location.timestamp timeIntervalSinceReferenceDate]] forKey:@"timestamp"];
    [dictRep setObject:[NSNumber numberWithDouble:location.altitude] forKey:@"altitude"];
    

    [dictRep setObject:[NSNumber numberWithDouble:location.course] forKey:@"course"];
    [dictRep setObject:[NSNumber numberWithDouble:location.speed] forKey:@"speed"];
    
    [dictRep setObject:[NSNumber numberWithDouble:location.horizontalAccuracy] forKey:@"horizontalAccuracy"];
    [dictRep setObject:[NSNumber numberWithDouble:location.verticalAccuracy] forKey:@"verticalAccuracy"];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictRep];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

/************************************************************************************
*********************************  Custom Register Phone  ***************************
*************************************************************************************/

- (void)sendPhoneNumber:(CDVInvokedUrlCommand*)command
{
    NSLog(@"Send Phone Number");

    NSInteger count = [command.arguments count];
    NSString *clientPhoneNumber = nil;
    if(count > 0){
        clientPhoneNumber = [command.arguments objectAtIndex:0];
    }
    
    NSLog(@"Value of phone = %@", clientPhoneNumber);

    RegisterPhoneDataloader *rpdl = [[RegisterPhoneDataloader alloc]init];
    rpdl.delegate = self;
    [rpdl registerUserWithID:clientPhoneNumber andWaitForActivation:YES];

    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:clientPhoneNumber forKey:@"clientUserID"];
    [defaults synchronize];

    callbackId = command.callbackId;
}

/*
 *  Callbacks de sendPhoneNumber al pasarle self como delegate responde a estas funciones
 */
- (void)RegistrationStatus:(BOOL)successful andRequireValidation:(BOOL)validation withMessage:(NSString *)message
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    CDVPluginResult* pluginResult = nil;

    if(successful){
        //Aqui deberia ir el agregar al standarUserDefaults el numero de telefono, 
        //pero no tengo acceso a esa variable, podria agregarse como una variable global, 
        //pero creo que seria complicar de mas la solucion
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:message];
        [defaults setObject:nil forKey:@"clientUserID"];
    }

    [defaults synchronize];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)RegistrationThrowsError:(NSString *)error
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:nil forKey:@"clientUserID"];
    [defaults synchronize];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

//END SendPhone

/************************************************************************************
*********************************  Custom Validate Code  ****************************
*************************************************************************************/

- (void)sendValidationCode:(CDVInvokedUrlCommand*)command
{
    NSLog(@"Send Validation Code");

    NSInteger count = [command.arguments count];
    NSString *code = nil;
    if(count > 0){
        code = [command.arguments objectAtIndex:0];
    }
    
    NSLog(@"Value of code = %@", code);

    RegisterPhoneDataloader *rpdl = [[RegisterPhoneDataloader alloc]init];
    rpdl.delegate =self ;
    [rpdl activatePhoneWithCode:code];

    callbackId = command.callbackId;
}

/*
 *  Callbacks de sendValidationCode
 *  al pasarle self como delegate tiene acceso a estas funciones
 */
- (void)ActivatePhoneSucceeded:(BOOL)success withMessage:(NSString*)message
{
    CDVPluginResult* pluginResult = nil;

    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if(success){
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [defaults setBool:NO forKey:@"isFirstTime"];
        [defaults setObject:@"YES" forKey:@"validated"];
    }else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:message];
        [defaults setBool:YES forKey:@"isFirstTime"];
        [defaults setObject:@"NO" forKey:@"validated"];
    }

    [defaults synchronize];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)ActivatePhoneReturnedError:(NSString *)error
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}
//End Send Code


/************************************************************************************
*********************************  Workspace  ***************************************
*************************************************************************************/

- (void) getAvailableWorkspaces:(CDVInvokedUrlCommand*)command
{
    NSLog(@"getAvailableWorkspaces");
    void (^completion)(UIBackgroundFetchResult) = ^(UIBackgroundFetchResult completionHandler) {
        NSArray *workspaces = [[Messangi sharedInstance] getAvailableWorkspaces];
        NSMutableArray *resp = [[NSMutableArray alloc] initWithCapacity:workspaces.count];
        for (Workspace* workspace in workspaces) {
            [resp addObject:[workspace serialize]];
        }
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:resp];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    };
    [[Messangi sharedInstance]fetchAvailableWorkspacesWithCompletionHandler:completion];
}

- (void) getSubscribedWorkspaces:(CDVInvokedUrlCommand*)command
{
    NSLog(@"getSubscribedWorkspaces");
    NSArray *workspaces = [[Messangi sharedInstance] getSubscribedWorkspaces];
    NSMutableArray *resp = [[NSMutableArray alloc] initWithCapacity:workspaces.count];
    for (Workspace* workspace in workspaces) {
        [resp addObject:[workspace serialize]];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:resp];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)joinWorkspace:(CDVInvokedUrlCommand*)command
{
    NSLog(@"joinWorkspace");
    
    NSInteger count = [command.arguments count];
    NSString *clientID = nil;
    if(count > 0){
        clientID = [command.arguments objectAtIndex:0];
    }
    
    NSLog(@"ClientId = %@", clientID);
    
    Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:clientID];

    void (^completion)(UIBackgroundFetchResult) = ^(UIBackgroundFetchResult completionHandler) {
        CDVPluginResult* pluginResult = nil;
        if(completionHandler != UIBackgroundFetchResultFailed){ //OK
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:YES];
        }else{ //ERROR
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsBool:NO];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    };

    [[Messangi sharedInstance] joinWorkspace:workspace withCompletionHandler:completion];
}

- (void)leaveWorkspace:(CDVInvokedUrlCommand*)command
{
    NSLog(@"leaveWorkspace");

    NSInteger count = [command.arguments count];
    NSString *clientID = nil;
    if(count > 0){
        clientID = [command.arguments objectAtIndex:0];
    }
    NSLog(@"ClientId = %@", clientID);
    
    Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:clientID];

    void (^completion)(UIBackgroundFetchResult) = ^(UIBackgroundFetchResult completionHandler) {
        CDVPluginResult* pluginResult = nil;
        if(completionHandler != UIBackgroundFetchResultFailed){ //OK
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:YES];
        }else{ //ERROR
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsBool:NO];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    };

    [[Messangi sharedInstance] leaveWorkspace:workspace withCompletionHandler:completion];
}

- (void) getDefaultWorkspace:(CDVInvokedUrlCommand*)command
{
    Workspace *workspace = [[Messangi sharedInstance] getDefaultWorkspace];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:[workspace serialize]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getWorkspace:(CDVInvokedUrlCommand*)command
{
    NSLog(@"getWorkspace");
    NSInteger count = [command.arguments count];
    NSString *clientID = nil;
    if(count > 0){
        clientID = [command.arguments objectAtIndex:0];
    }
    NSLog(@"ClientId = %@", clientID);
    Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:clientID];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:[workspace serialize]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

//End Workspace

/************************************************************************************
*********************************  Messages  ****************************************
*************************************************************************************/

- (void)listMessages:(CDVInvokedUrlCommand*)command
{
    NSLog(@"listMessages");

    NSMutableArray * allMessages =  [[NSMutableArray alloc] init];
    for(NSString *clientID in command.arguments){
        NSLog(@"ClientId = %@", clientID);
        Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:clientID];
        NSArray *array = [workspace getMessages];
        [allMessages addObjectsFromArray:array];
    }
    
    //Serialize
    NSMutableArray *serialized = [[NSMutableArray alloc] initWithCapacity:allMessages.count];
    for (Message *message in allMessages) {
        [serialized addObject:[message serialize]];
    }
    
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:serialized];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)sendMessage:(CDVInvokedUrlCommand*)command
{
    NSLog(@"sendMessage");
 
    NSInteger count = [command.arguments count];
    NSString *clientID = nil;
    NSString *message = nil;
    if(count > 0){
        clientID = [command.arguments objectAtIndex:0];
        message = [command.arguments objectAtIndex:1];
    }
    NSLog(@"ClientId = %@", clientID);
    NSLog(@"Message = %@", message);
    
    Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:clientID];
    [workspace sendMessage:message];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// End Messages

/************************************************************************************
*********************************  Geofences  ***************************************
*************************************************************************************/

- (void) listGeofences:(CDVInvokedUrlCommand*)command
{
    NSLog(@"listGeofences");

    NSMutableArray * allGeofences =  [[NSMutableArray alloc] init];
    for(NSString *clientID in command.arguments){
        NSLog(@"ClientId = %@", clientID);
        Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:clientID];
        NSArray *array = [workspace getGeofences];
        [allGeofences addObjectsFromArray:array];
    }
    
    //Serialize
    NSMutableArray *serialized = [[NSMutableArray alloc] initWithCapacity:allGeofences.count];
    for (Geofence *geofence in allGeofences) {
        [serialized addObject:[geofence serialize]];
    }
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:serialized];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


// End Geofence

/************************************************************************************
*********************************  Beacons  *****************************************
*************************************************************************************/

- (void) listBeacons:(CDVInvokedUrlCommand*)command
{
    NSLog(@"listBeacons");
    NSArray *args = command.arguments;
    NSInteger count = [command.arguments count];
    NSString *type = nil;
    if(count > 0){
        type = [command.arguments objectAtIndex:0];
    }
    NSLog(@"Type = %@", type);

    NSMutableArray * allBeacons =  [[NSMutableArray alloc] init];
    for (int i = 1; i < args.count; ++i){
        NSLog(@"ClientId = %@", args[i]);
        Workspace *workspace = [[Messangi sharedInstance] getWorkspaceWithClientID:args[i]];
        NSArray *array;
        if([[type lowercaseString] isEqualToString:@"bluethoot"]){
            array = [workspace getBluetoothBeacons];
        }else if([[type lowercaseString] isEqualToString:@"wifi"]){
            array = [workspace getWifiBeacons];
        }else{
            array = [workspace getBeacons];
        }
        
        [allBeacons addObjectsFromArray:array];
    }
    
    //Serialize
    NSMutableArray *serialized = [[NSMutableArray alloc] initWithCapacity:allBeacons.count];
    for (Beacon *beacon in allBeacons) {
        [serialized addObject:[beacon serialize]];
    }
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:serialized];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// End Beacon

/************************************************************************************
*********************************  Subscriptions  ***********************************
*************************************************************************************/

//subscribe
//unsubscribe
//list

// End Subscriptions


@end