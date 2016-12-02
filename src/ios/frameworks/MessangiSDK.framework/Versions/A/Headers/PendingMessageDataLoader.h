//
//  PendingMessageDataLoader.h
//  Messangi
//
//  Created by Robert Volante on 7/7/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "UnstoredIncomingMessage.h"
#import "Message.h"
#import "HttpRequest.h"

@protocol PendingMessageDataLoaderDelegate <NSObject>

/*!
 *  @brief  Abstract methods needed be implement by the client in PendingMessageDataLoaderDelegate Protocol
 */
@required

- (void)pendingMessagesRetrieved:(NSArray *)messages;
- (void)pendingMessagesRetrievedError:(NSString *)error;

@optional
/*!
 *  @brief  Call when the message is finished loaded for the server
 *  @param message A UnstoredIncomingMessage returned by server
 *  @deprecated use pushReceived instead
 */
- (void) pushReceived:(Message *)message;

#warning messageLoadFinishedReturningMessage:(UnstoredIncomingMessage *)message is deprecated and it will remove in future versions, please use pushReceived:(Message *)message instead
- (void) messageLoadFinishedReturningMessage:(UnstoredIncomingMessage *)message;


@end

/*!
 *  @brief  Interface for retrieve Push Messages from Messangi Backend
 */
@interface PendingMessageDataLoader : NSObject <NSXMLParserDelegate,RequestDelegate>


@property NSMutableString *currentStringValue;
@property NSString *currentProperty;

@property id <PendingMessageDataLoaderDelegate> delegate;
@property void (^completion)(UIBackgroundFetchResult);

@property NSMutableArray *messages;
@property Message *message;


- (void)startLoadingMessageFromWorkspace:(id)workspace withCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (void)startLoadingMessageWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
@end
