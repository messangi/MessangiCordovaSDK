//
//  LocationDataLoader.h
//  Messangi
//
//  Created by Omar Diaz on 25/03/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#ifndef LocationDataLoader_H
#define LocationDataLoader_H

#import<unistd.h>
#import<netdb.h>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "HttpRequest.h"

@protocol LocationDelegate <NSObject>
@required
- (void)LocationCallSuccess:(BOOL)success withMessage:(NSString *)msg;
- (void)LocationCallReturnedError:(NSString *)error;
@end

/*!
 *  @brief  Interface for manipulate GeoFence and Beacon
 */
@interface LocationDataLoader : NSObject <NSXMLParserDelegate, RequestDelegate>


@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <LocationDelegate> delegate;
@property void (^completion)(UIBackgroundFetchResult);

@property int operation;
@property NSString *message;
@property BOOL successful;



/*!
 *  @brief Send Phone Location latitude and longitude to Server
 *  @param requestId         The ID from Push notification with type GET_LOC
 *  @param latitude          float with latitude coordinate from GPS
 *  @param longitude         float with longitude coordinate from GPS
 *  @param workspace         MMC Workspace to notify
 *  @param completionHandler ???
 */
- (void)sendLocationWithRequestID:(NSString *)requestId latitude:(float)latitude longitude:(float)longitude workspace:(Workspace *)workspace andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

/*!
 *  @brief  Deprecate, now call fireEventInRegion method
 *  @param regionId          ID from Region fired
 *  @param status            A NSString with status of ENTER or EXIT
 *  @param latitude          float with latitude of Region
 *  @param longitude         float with longitude of region
 *  @param workspace         MMC Workspace to notify
 *  @param completionHandler ???
 */
#warning alertEventInRegion:NSString:NSString:float:float:Workspace is deprecated and it will removed in future versions, please use fireEventInRegion instead
- (void)alertEventInRegion:(NSString *)regionId withStatus:(NSString *)status atLatitude:(float)latitude longitude:(float)longitude workspace:(Workspace *)workspace andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

/*!
 *  @brief  Send to Server when fire a event in Region
 *  @param regionId          ID from Region fired
 *  @param type              A NSString BEACON or GEOFENCE
 *  @param status            A NSString with status of ENTER or EXIT
 *  @param latitude          float with latitude of Region
 *  @param longitude         float with longitude of region
 *  @param workspace         MMC Workspace to notify
 *  @param completionHandler ???
 */
- (void)fireEventInRegion:(NSString *)regionId regionType:(NSString *)type withStatus:(NSString *)status atLatitude:(float)latitude longitude:(float)longitude workspace:(Workspace *)workspace andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end

#endif
