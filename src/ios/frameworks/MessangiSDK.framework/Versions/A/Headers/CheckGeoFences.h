//
//  checkGeoFences.h
//  Messangi
//
//  Created by Omar Diaz on 10/04/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#ifndef checkGeoFences_H
#define checkGeoFences_H

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>
#import "Geofence.h"
#import "HttpRequest.h"

@protocol CheckGeoFencesDelegate <NSObject>
@required
- (void) checkGeoFencesSuccess:(NSArray *)updatedGeoFences;
- (void) checkGeoFencesReturnedError:(NSString *)error;
@end

@interface CheckGeoFences : NSObject <NSXMLParserDelegate,RequestDelegate>

@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <CheckGeoFencesDelegate> delegate;
    
@property void (^completion)(UIBackgroundFetchResult);


@property NSMutableArray *geofences;
@property Geofence *geofence;

@property Boolean ignoreTag;


-(void)getUpdatedGeoFencesFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)getUpdatedGeoFencesUsingTBXMLFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)getUpdatedGeoFencesUsingNSXMLParserFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end

#endif