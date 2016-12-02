//
//  CheckSubscriptions.h
//  MessangiSDK
//
//  Created by Robert Volante on 7/14/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#ifndef checkSubscriptions_H
#define checkSubscriptions_H

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>
#import "Subscription.h"
#import "HttpRequest.h"


@protocol CheckSubscriptionsDelegate <NSObject>
@required

- (void) subscriptionsLoadedSuccessfully:(NSArray *)updatedSubscriptions;
- (void) subscriptionsLoadedWithErrors:(NSString *)error;

- (void) subscribedSuccessfully;
- (void) failedToSubscribeWithError:(NSString *)error;

- (void) unsubscribedSuccessfully;
- (void) failedToUnsubscribeWithError:(NSString *)error;

//- (void) checkSubscriptionsSuccess:(NSArray *)updatedSubscriptions;
//- (void) checkSubscriptionsReturnedError:(NSString *)error;
@end

/*!
 *  @brief  Interface for Check or unCheck subscriptions from Distribution List
 */
@interface CheckSubscriptions : NSObject <NSXMLParserDelegate,RequestDelegate>


@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <CheckSubscriptionsDelegate> delegate;
    
@property void (^completion)(UIBackgroundFetchResult);



@property (nonatomic, strong) Subscription *currentSubscription;
@property (nonatomic, strong) NSString *currentSubscriptionIdentifier;
@property (nonatomic, strong) NSString *currentSubscriptionName;
@property (strong) NSMutableArray *subscriptions;


@property BOOL successful;
@property NSString *message;
@property int operation;




/*!
 *  @brief  Load a list of possibles subscriptions from Server
 *  @param completionHandler ???
 */
-(void)getUpdatedSubscriptionsFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

/*!
 *  @brief  Send to Server request to subscribe to list
 *  @param subscriptionID The ID from Distribution list to Subscribe
 */
-(void)subscribeToList:(NSString *)subscriptionID inWorkspace:(id)workspace;

/*!
 *  @brief  Send to Server request to unsubscribe from list
 *  @param subscriptionID The ID from Distribution list to unSubscribe
 */
-(void)unsubscribeFromList:(NSString *)subscriptionID inWorkspace:(id)workspace;
@end

#endif