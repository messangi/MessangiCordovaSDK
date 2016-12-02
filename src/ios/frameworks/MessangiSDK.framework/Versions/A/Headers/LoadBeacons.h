//
//  LoadBeacons.h
//  MessangiSDK
//
//  Created by Oscar Anzola on 8/26/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>
#import "Beacon.h"

@protocol LoadBeaconsDelegate <NSObject>
@required
- (void) loadBeaconsSuccess:(NSArray *)updatedGeoFences;
- (void) loadBeaconsReturnedError:(NSString *)error;
@end

@interface LoadBeacons : NSObject <NSXMLParserDelegate,RequestDelegate>

@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <LoadBeaconsDelegate> delegate;
@property void (^completion)(UIBackgroundFetchResult);

@property NSMutableArray *beacons;
@property Beacon *beacon;

@property Boolean ignoreTag;

-(void)getUpdatedBeaconsFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end
