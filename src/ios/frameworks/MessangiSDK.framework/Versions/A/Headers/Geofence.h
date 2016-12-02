//
//  Geofence.h
//  MessangiSDK
//
//  Created by Jesus Torres on 1/3/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import "TBXML.h"

@interface Geofence : NSObject <NSCoding>
@property NSString *regionId;
@property NSString *name;
@property NSString *type;
@property NSString *eventType;
@property NSString *msgTitle;
@property NSString *msgContent;
@property NSString *appName;
@property NSString *timezone;
@property NSString *update;
@property Boolean activated;
@property NSString *clientId;
@property NSString *geoFenceId;
@property NSNumber *latitude;
@property NSNumber *longitude;
@property NSNumber *radius;


@property NSNumber *creationTime;
@property NSNumber *lastEnterTime;
@property NSNumber *lastExitTime;

- (id) init;
- (void) setValue:(NSString *)value forKey:(NSString *)key;

- (id) initWithTBXMLDocument:(TBXMLElement *)XML;

- (id) initWithID:(NSString *)regionID Latiude:(double)latitude Longitude:(double)longitud Radius:(float)radius EventType:(NSString *)eventType andName:(NSString *)name;
- (NSDictionary *) serialize;

- (CLCircularRegion *) toCircularRegion;
@end
