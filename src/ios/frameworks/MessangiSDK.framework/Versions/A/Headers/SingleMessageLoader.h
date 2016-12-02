//
//  SingleMessageLoader.h
//  ego
//
//  Created by Jose V. Salazar on 1/4/12.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "HttpRequest.h"
#import "UnstoredIncomingMessage.h"
#import "Message.h"


@protocol SingleMessageLoaderDelegate <NSObject>
@required
- (void) SingleMessageRetrieved:(Message *)message;
- (void) SingleMessageRetrievedError:(NSString *)error;

@optional
- (void) pushReceived:(Message *)message;

#warning messageLoadFinishedReturningMessage:(UnstoredIncomingMessage *)message is deprecated and it will remove in future versions, please use pushReceived:(Message *)message instead
- (void) messageLoadFinishedReturningMessage:(UnstoredIncomingMessage *)message;

@end


@interface SingleMessageLoader : NSObject <NSXMLParserDelegate,RequestDelegate>


@property UnstoredIncomingMessage *currentMessage;
@property NSMutableString *currentStringValue;
@property NSString *currentProperty;

@property id <SingleMessageLoaderDelegate> delegate;

@property void (^completion)(UIBackgroundFetchResult);

@property Message *message;

-(void)startLoadingDataForMessageWithID:(NSString *)messageID fromWorkspace:(id)workspace andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end
