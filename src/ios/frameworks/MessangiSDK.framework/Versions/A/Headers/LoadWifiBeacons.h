//
//  LoadWifiBeacons.h
//  MessangiSDK
//
//  Created by Jesus Torres on 11/7/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>
#import "Beacon.h"

@protocol LoadWifiBeaconsDelegate <NSObject>
@required
- (void) loadWifiBeaconsBySSIDSuccess:(NSArray *)beaconsBySSID;
- (void) loadWifiBeaconsByMACSuccess:(NSArray *)beaconsByMAC;
- (void) loadWifiBeaconsByIPSuccess:(NSArray *)beaconsByIP;
- (void) loadWifiBeaconsSuccess:(NSArray *)wifiBeacons;
- (void) loadWifiBeaconsReturnedError:(NSString *)error inType:(NSString *)type;
@end

@interface LoadWifiBeacons : NSObject <NSXMLParserDelegate>

@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <LoadWifiBeaconsDelegate> delegate;
@property void (^completion)(UIBackgroundFetchResult);
@property NSString *type;


@property NSMutableArray *beacons;
@property Beacon *beacon;


-(void)fetchWifiBeaconsBySSIDFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)fetchWifiBeaconsByMACFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)fetchWifiBeaconsByIPFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;


-(void)getWifiBeaconsWithType:(NSString *) type fromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;



@end







