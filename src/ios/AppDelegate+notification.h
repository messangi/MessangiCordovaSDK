/************ appDelegate para manejar las push notifications*/
// Created by Jesus Torres -- 2/23/15.
// Basado en el trabajo de https://github.com/phonegap-build/PushPlugin

#import "AppDelegate.h"
#import "CDVMessangi.h"
#import <objc/runtime.h>

@interface AppDelegate (notification)

@property (nonatomic, retain) NSDictionary  *launchNotification;

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

- (void)pushReceived:(Message *) message fromWorkspace:(Workspace *)workspace;
- (void)applicationDidBecomeActive:(UIApplication *)application fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (id) getCommandInstance:(NSString*)className;

@end