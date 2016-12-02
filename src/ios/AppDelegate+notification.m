/************ appDelegate para manejar las push notifications*/
// Created by Jesus Torres -- 2/23/15.
// Basado en el trabajo de https://github.com/phonegap-build/PushPlugin

#import "AppDelegate+notification.h"

static char launchNotificationKey;

@implementation AppDelegate (notification)

UIBackgroundTaskIdentifier background_task;

- (id) getCommandInstance:(NSString*)className
{
    return [self.viewController getCommandInstance:className];
}

// its dangerous to override a method from within a category.
// Instead we will use method swizzling. we set this up in the load call.
+ (void)load
{
    Method original, swizzled;

    original = class_getInstanceMethod(self, @selector(init));
    swizzled = class_getInstanceMethod(self, @selector(swizzled_init));
    method_exchangeImplementations(original, swizzled);
}

- (AppDelegate *)swizzled_init
{
    NSLog(@"swizzled_init");

    [[Messangi sharedInstance] setAppName: [[[NSBundle mainBundle] infoDictionary] objectForKey:@"appName"]];
    [[Messangi sharedInstance] setClientID: [[[NSBundle mainBundle] infoDictionary] objectForKey:@"clientID"]];
    [[Messangi sharedInstance] setApiClientPrivateKey: [[[NSBundle mainBundle] infoDictionary] objectForKey:@"apiClientPrivateKey"]];
    
    NSString *url = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"subscriptionURL"];
    NSString *instance = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"subscriptionIntanceID"];
    
    if(![url isEqualToString:@"null"] && ![instance isEqualToString:@"null"]){
        [[Messangi sharedInstance] setSubscriptionInstanceID: instance];
        [[Messangi sharedInstance] setSubscriptionURL: url];
    }

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(createNotificationChecker:) name:@"UIApplicationDidFinishLaunchingNotification" object:nil];

    // This actually calls the original init method over in AppDelegate. Equivilent to calling super
    // on an overrided method, this is not recursive, although it appears that way. neat huh?
    return [self swizzled_init];
}

// This code will be called immediately after application:didFinishLaunchingWithOptions:. We need
// to process notifications in cold-start situations
- (void)createNotificationChecker:(NSNotification *)notification
{

    NSLog(@"create Notification Checker");
    if (notification)
    {
        NSDictionary *launchOptions = [notification userInfo];
        if (launchOptions)
            self.launchNotification = [launchOptions objectForKey: @"UIApplicationLaunchOptionsRemoteNotificationKey"];
    }

    if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerUserNotificationSettings:)])
    {
        UIUserNotificationType types = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
        UIUserNotificationSettings *notificationSettings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
        [[UIApplication sharedApplication] registerUserNotificationSettings:notificationSettings];
    }

}

-(void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings // available in iOS8
{
    NSLog(@"didRegisterUserNotificationSettings");
    [application registerForRemoteNotifications];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken");
    NSLog(@"deviceToken = %@", deviceToken);

    [[Messangi sharedInstance] registerDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"didFailToRegisterForRemoteNotificationsWithError");
    NSLog(@"error = %@",error);

    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:nil forKey:@"devicePushID"];
    [defaults synchronize];
}


- (void) clearNotifications
{
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber: 0];
    [[UIApplication sharedApplication] cancelAllLocalNotifications];
}

- (void) applicationDidBecomeActive:(UIApplication *)application fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    [self clearNotifications];
    [[Messangi sharedInstance] getUnreadMessages];
}

- (void) applicationDidEnterBackground:(UIApplication *)application
{
    [self clearNotifications];
    
    if([[UIDevice currentDevice] respondsToSelector:@selector(isMultitaskingSupported)])
    {
        NSLog(@"Multitasking Supported");
        if (background_task == UIBackgroundTaskInvalid) {
            background_task = [application beginBackgroundTaskWithExpirationHandler:^ {
                NSLog(@"Background task expiration\n");
                //Clean up code. Tell the system that we are done.
                [application endBackgroundTask: background_task];
                background_task = UIBackgroundTaskInvalid;
            }];
        }
        else
        {
            NSLog(@"Multitasking Not Supported");
        }
    }

    
}

/*    ========= IMPORTANTE =========
 *
 * if application in background mode then method
 * - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
 * won't be called automatically when push notification appears.
 * This method would be called only in case if user taps on push notification alert or banner.
 */


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    NSLog(@"didReceiveNotification");

    void (^completion)(UIBackgroundFetchResult) = ^(UIBackgroundFetchResult internalHandlerResponse) {

        if(internalHandlerResponse != UIBackgroundTaskInvalid){
            /*
             * Notification was managed by Messangi
             * Add code here to perform any addionat task after Messangi handling the notification
             */
            if([application applicationState] == UIApplicationStateInactive)
            {
                //ClientID que recibe la notificacion
                NSString *clientID = [userInfo objectForKey:@"clientId"] ? [NSString stringWithFormat:@"%@", [userInfo objectForKey:@"clientId"]] : nil;
                //If the application state was inactive, this means the user pressed an action button
                // from a notification.

                //Handle notification
                //Aca deberiamos Notificar a la aplicacion de JS que entraste a la aplicacion por medio de un touch en la notificacion
                
            }
        }else{
            /*
             * Notification received was not processed by Messangi
             * This notification must be managed by host App here
             */
        }
        completionHandler(internalHandlerResponse);
        
    };
    
    [[Messangi sharedInstance] processRemoteNotification:userInfo fetchCompletionHandler:completion];
}

- (void) application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)())completionHandler
{
    NSURLSessionConfiguration *conf = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:identifier];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:conf delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    
    // Check if all download tasks have been finished.
    [session getTasksWithCompletionHandler:^(NSArray *dataTasks, NSArray *uploadTasks, NSArray *downloadTasks) {
    
        NSLog(@"%@", [NSString stringWithFormat:@"download task: %lu",(unsigned long)[downloadTasks count]]);
        if ([downloadTasks count] == 0) {
            completionHandler();
        }
    }];

}

- (void) MessangiReady
{
    NSLog(@"Messangi Ready");
    CDVMessangi *handler = [self getCommandInstance:@"CDVMessangi"];
    [handler messangiReady];
}

- (void) pushReceived:(Message *) message fromWorkspace:(Workspace *)workspace
{
    NSLog(@"pushReceived: ");
    // This method will be called every time the user receives a push notification
    // via Messangi and the field title and body has been retrieved from the server.
    // Use this method to display the content of the notification.

    CDVMessangi *handler = [self getCommandInstance:@"CDVMessangi"];
    [handler onPushReceived:message];
}

// The accessors use an Associative Reference since you can't define a iVar in a category
// http://developer.apple.com/library/ios/#documentation/cocoa/conceptual/objectivec/Chapters/ocAssociativeReferences.html
- (NSMutableArray *)launchNotification
{
    return objc_getAssociatedObject(self, &launchNotificationKey);
}

- (void)setLaunchNotification:(NSDictionary *)aDictionary
{
    objc_setAssociatedObject(self, &launchNotificationKey, aDictionary, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)dealloc
{
    self.launchNotification = nil; // clear the association and release the object
}
@end