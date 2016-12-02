//
//  Beacon.h
//  MessangiSDK
//
//  Created by Jesus Torres on 11/5/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@interface Beacon : NSObject <NSCoding>

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
@property NSString *uuid;
@property NSString *major;
@property NSString *minor;
@property NSString *manufacturer;
@property NSString *distanceString;

- (void) setValue:(NSString *)value forKey:(NSString *)element;
- (CLBeaconRegion *) toBeaconRegion;
- (NSDictionary *)serialize;
@end
