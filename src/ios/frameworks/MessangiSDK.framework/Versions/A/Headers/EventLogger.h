//
//  EventLogger.h
//  MessangiSDK
//
//  Created by Francisco Andrades Grassi on 1/2/15.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <unistd.h>
#import <netdb.h>
#import "HttpRequest.h"
#import "Workspace.h"


@interface EventLogger : NSObject <NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate, RequestDelegate>

@property void (^completion)(UIBackgroundFetchResult);

- (void)logEvent: (NSString *) eventType andExtraInfo:(NSString *) extraInfo withCampaignName: (NSString *) campaignName workspace:(Workspace *)workspace andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (void)logEvent: (NSString *) eventType andExtraInfo:(NSString *) extraInfo withCampaignName: (NSString *) campaignName andWorkspace:(Workspace *)workspace;

- (void)logEvent: (NSString *) eventType withExtraInfo:(NSString *) extraInfo;

+ (void)debugMessage:(NSString *)text;


@end
