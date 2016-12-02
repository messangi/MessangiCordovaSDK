//
//  HtmlRequest.h
//  MessangiSDK
//
//  Created by Jesus Torres on 5/8/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//
@import UIKit;
#import <Foundation/Foundation.h>

@protocol RequestDelegate <NSObject>
@required
- (void) response:(NSString *)xml;
- (void) requestError:(NSError *)error;
@end

@interface HttpRequest : NSObject <NSURLSessionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate>

@property id <RequestDelegate> delegate;
@property UIBackgroundTaskIdentifier backgroundUpdateTask;


- (void) makeGetRequestToUrl:(NSString *)url withIdentifier:(NSString *)identifier;


@end
