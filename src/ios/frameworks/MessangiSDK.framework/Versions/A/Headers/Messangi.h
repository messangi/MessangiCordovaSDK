//
//  Messangi.h
//  Messangi
//
//  Created by Francisco Andrades Grassi on 6/2/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <NetworkExtension/NetworkExtension.h>
#import <SystemConfiguration/CaptiveNetwork.h>

#ifndef MessangiConstants
#define MessangiConstants

#define CURRENT_VERSION                                     @"3.6.0"
#define PREFIX                                              @"https://api.messangi.com/messangi-staging/rest/message"
#define DISTANCE_UPDATE                                     25
#define VALIDATION_CODE_LENGTH                              5
#define MAX_REGIONS                                         20

#pragma mark Following constants needs analysis fine-tuning

#define GEOFENCELIST_METER_UPDATE_THRESHOLD                 50

#endif

#import "UnstoredIncomingMessage.h"
#import "Message.h"

#import "DeviceSubscriber.h"

#import "SingleMessageLoader.h"
#import "PendingMessageDataLoader.h"

#import "RegisterPhoneDataloader.h"
#import "CheckGeoFences.h"
#import "CheckSubscriptions.h"
#import "LoadBeacons.h"
#import "DeviceUID.h"
#import "DeviceSubscriber.h"

#import "Workspace.h"
#import "WorkspaceDataLoader.h"

#import "LocationDataLoader.h"

#import "EventLogger.h"

@protocol MessangiProtocol <NSObject>
@required
- (void) pushReceived:(Message *) message fromWorkspace:(Workspace *)workspace;

@optional
- (void) MessangiReady;
- (void) pushReceived:(Message *) message;
- (void) messageLoadFinishedReturningMessage:(UnstoredIncomingMessage *)push;


@end

@interface Messangi : NSObject <CLLocationManagerDelegate, DeviceSubscriberDelegate, PendingMessageDataLoaderDelegate, WorkspaceDelegate, WorkspaceProtocol, LocationDelegate, UITextFieldDelegate>

#pragma mark Properties
@property (retain) id delegate;
@property NSMutableDictionary *backgroundTasks;


/*! @brief  Central point for configuring the delivery of location- and heading-related events
 */
@property (nonatomic, strong) CLLocationManager *messangiLM;

/*!
 *  @brief  Last location of device
 */
@property (nonatomic, strong) CLLocation *messangiLastLocation;

/*!
 *  @brief  Set of geoFences after added geoFencesToAdd and removed geoFencesToDelete
 */
@property (nonatomic, strong) NSMutableOrderedSet *geoFencesList;

/*!
 *  @brief  Set of beacons after added beaconsToAdd and removed beaconsToDelete
 */
@property (nonatomic, strong) NSMutableOrderedSet *beaconsList;

/*!
 *  @brief  Name of APP
 */
@property (nonatomic, strong) NSString *appName;

/*!
 *  @brief  Client ID
 */
@property (nonatomic, strong) NSString *clientID;

/*!
 *  @brief  Private Key
 */
@property (nonatomic, strong) NSString *apiClientPrivateKey;

/*!
 *  @brief  Subscription URL
 */
@property (nonatomic, strong) NSString *subscriptionURL;

/*!
 *  @brief  Instance of Subscription
 */
@property (nonatomic, strong) NSString *subscriptionInstanceID;

/*!
 *  @brief Boolean for use Messangi is Activate
 */
@property (nonatomic) BOOL useMessangiSDK;
@property (nonatomic) double lastPendingMessagesFetch;

#pragma mark Class methods

+ (NSString *) encodeString:(NSString *)data usingKey:(NSString *)key;
+ (NSString *) getSDKVersionString;

- (BOOL) locationServicesAreEnabled;

#pragma  mark - Setting;
- (void) setAppName:(NSString *)newName ;
- (void) setClientID:(NSString *)newClientID ;
- (void) setApiClientPrivateKey:(NSString *)newPrivateKey ;
- (void) setSubscriptionURL:(NSString *)newURL ;
- (void) setSubscriptionInstanceID:(NSString *)newID ;
- (void) setLogAllEventsDisabled:(BOOL)disabled ;
- (BOOL) isLogAllEventsDisabled ;
- (void) setGetLocationDisabled:(BOOL)disabled ;
- (BOOL) isGetLocationDisabled ;
- (void) setMaxStoredMessages:(int)maxMessage;
- (void) loadEnvironmentFromFile:(NSString *)file;
- (void) loadMessangiCredentials:(NSString *)file;

+ (Messangi *) sharedInstance;
#warning initMessangi:BOOL is deprecated and it will removed in future versions, please use initMessangi instead
- (void) initMessangi:(BOOL)first;
- (void) initMessangi;
- (void) registerDialog;
- (void) registerWithUserID:(NSString*) userId;

#pragma Mark: Subscriptions
- (void)initSubscriptions;
#warning loadSubscriptionsFromFile is deprecated and it will removed in future versions
- (void)loadSubscriptionsFromFile:(NSString *)file;
#warning This method is only for default Workspace, if you are using multiple workspaces please use subscribeToList:NSString:Workspace instead
- (void)subscribeToList:(NSString *)subscriptionID;
#warning you can use [workspace addSubscriptions:subscriptionID] instead
- (void)subscribeToList:(NSString *)subscriptionID inWorkspace:(Workspace *)workspace;
#warning This method is only for default Workspace, if you are using multiple workspaces please use unsubscribeFromList:NSString:Workspace instead
- (void)unsubscribeFromList:(NSString *)subscriptionID;
#warning you can use [workspace removeSubscriptions:subscriptionID] instead
- (void)unsubscribeFromList:(NSString *)subscriptionID inWorkspace:(Workspace *)workspace;

#pragma mark Multiple push notification
#warning getUnreadMessages is deprecated and it will removed in future versions, please use getUnreadMessagesWithHandler:UIBackgroundFetchResult instead
- (void)getUnreadMessages;

- (void)getUnreadMessagesWithHandler:(void (^)(UIBackgroundFetchResult))completionHandler ;


#pragma Mark: LocationManager for Beacons and Geofences
- (void) forceUpdateLocation;
- (void) refreshMonitoredRegionsToClosest;
- (void) resetMonitoringRegions;
- (NSSet *)monitoredGeoFences;

#pragma mark Unique Device ID
- (void)registerDeviceToken:(NSData *)deviceToken;

#pragma  mark - Notifications;
- (BOOL) didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler ;
- (void) processRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
//TODO: REVISAR ESTE METODO POSIBLEMENTE NO SE ESTE UTILIZANDO
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification ;


#pragma  mark - Loggin and Analytics;
#warning This method is only for default Workspace, if you are using multiple workspaces please use processPushNotificationForMsgID:Workspace:UIBackgroundFetchResult instead
- (void) logEvent:(NSString *)eventType andExtraInfo:(NSString *)extraInfo withCampaignName:(NSString *)campaignName;
- (void) logEvent:(NSString *)eventType andExtraInfo:(NSString *)extraInfo withCampaignName:(NSString *)campaignName andWorkspace:(Workspace *)workspace;

#pragma  mark - Workspaces;
- (void) initWorkspaces;

#warning joinWorkspace is deprecated and it will removed in future versions, please use joinWorkspace:withHandler:UIBackgroundFetchResult instead
- (void) joinWorkspace:(Workspace *)workspace;
- (void) joinWorkspace:(Workspace *)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult)) completionHandler;

#warning leaveWorkspace is deprecated and it will removed in future versions, please use leaveWorkspace:withHandler:UIBackgroundFetchResult instead
- (void) leaveWorkspace:(Workspace *)workspace;
- (void) leaveWorkspace:(Workspace *)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult)) completionHandler;

- (void) fetchAvailableWorkspacesWithCompletionHandler:(void (^)(UIBackgroundFetchResult)) completionHandler;
- (void) fetchSubscribedWorkspacesWithCompletionHandler:(void (^)(UIBackgroundFetchResult)) completionHandler;


- (void) getAvailableWorkspaceswithFilter:(NSString *) filter andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (NSArray *) getAvailableWorkspaces;
- (NSArray *) getSubscribedWorkspaces;

- (Workspace *) getWorkspaceWithClientID:(NSString *)clientID;
- (Workspace *) getDefaultWorkspace;

@end
