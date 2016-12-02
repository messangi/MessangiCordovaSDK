//
//  Workspace.h
//  MessangiSDK
//
//  Created by Jesus Torres on 9/5/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "SendMessage.h"
#import "CheckGeoFences.h"
#import "LoadBeacons.h"
#import "CheckSubscriptions.h"
#import "PendingMessageDataLoader.h"
#import "SingleMessageLoader.h"

#import "TBXML.h"

@protocol WorkspaceProtocol <NSObject>

- (void) synchronicedWorkspace:(id) workspace;
//- (void) synchronicedMessages:(id) workspace;
- (void) synchronicedGeofences:(id) workspace;
- (void) synchronicedBeacons:(id) workspace;
- (void) synchronicedSubscriptions:(id) workspace;

- (void) pushReceived:(Message *)message fromWorkspace:(id) workspace;
@end

@interface Workspace : NSObject <NSCoding ,LoadBeaconsDelegate , CheckSubscriptionsDelegate, CheckGeoFencesDelegate, SingleMessageLoaderDelegate>

@property id <WorkspaceProtocol> delegate;

#pragma mark XML attributes
@property NSString *name;
@property NSString *clientId;
@property NSString *publicKey;
@property NSString *callbackUrl;
@property Boolean subscribed;

#pragma mark workspaces Atributes
@property NSMutableArray *messages;
@property NSArray *geofences;
@property NSArray *beacons;

@property NSArray *subscriptions;


@property BOOL inProgress;
//@property BOOL syncMessages;
@property BOOL syncGeofence;

@property BOOL syncBeacons;


@property BOOL syncSubscriptions;

@property (nonatomic) double lastPendingMessagesFetch;

+ (NSString *) key;

- (Workspace *) init;
- (BOOL) isEqual:(Workspace *)otherWorkspace;
- (NSUInteger) hash;
- (void) setValue:(NSString *)value forKey:(NSString *)element;
- (Boolean) isSynchronized;

- (Workspace *) initWithTBXMLDocument:(TBXMLElement *)XML;
- (NSDictionary *) serialize;

#pragma Messages
- (NSArray *) getMessages;
- (void) processMessage:(Message *)message;
- (void) sendMessage:(NSString *)text;

#pragma Geofences
- (NSArray *) getGeofences;

#pragma Beacons
- (NSArray *) getBeacons;
- (NSArray *) getBluetoothBeacons;
- (NSArray *) getWifiBeacons;

#pragma Subscriptions
- (NSArray *) getSubscriptions;
- (BOOL) isSubscribed:(NSString *)subID;
- (void) addSubscriptions:(NSString *)subID;
- (void) removeSubscriptions:(NSString *)subID;





- (void) synchronize;

//- (void) fetchMessages;
- (void) fetchMessageWithID:(NSString *)id withCompletionHandler:(void (^)(UIBackgroundFetchResult)) completionHandler;
- (void) fetchBeaconsWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (void) fetchGeofencesWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (void) fetchSubscriptionsWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end
