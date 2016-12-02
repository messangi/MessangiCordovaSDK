//
//  DeviceSuscriber.h
//  ego
//
//  Created by Jose V. Salazar on 12/15/11.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>


@protocol DeviceSubscriberDelegate <NSObject>

@required
- (void) deviceSubscriberSucceeded:(BOOL)success withMessage:(NSString*)message;
- (void) deviceSubscriberError:(NSString *)error;

@end
 

/*!
 *  @brief  Interface for Subscribe a device to retrieve push notifications
 */
@interface DeviceSubscriber : NSObject <NSXMLParserDelegate>

@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <DeviceSubscriberDelegate> delegate;
//@property void (^completion)(UIBackgroundFetchResult);

@property BOOL successful;
@property (strong) NSString *message;

/*!
 *  @brief  Send the deviceUniqueID for Subscribe to Messangi Backend
 */
- (void)registerDeviceWithUniqueID;

@end
