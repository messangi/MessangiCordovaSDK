//
//  Message.h
//  MessangiSDK
//
//  Created by Jesus Torres on 3/3/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UnstoredIncomingMessage.h"

#ifndef Message_h
#define Message_h


#endif /* Message_h */


@interface Message : NSObject <NSCoding>

@property NSString *blastID;
@property NSString *id;
@property NSString *type;
@property NSString *from;
@property NSString *to;
@property NSString *subject;
@property NSString *text;
@property NSString *status;
@property NSString *statusDescription;
@property NSString *date;
@property NSString *timezone;
@property NSString *clientId;
@property NSString *appName;
@property NSString *platform;
@property NSString *metaData;

- (id) init;
- (NSDate *) getDate;
- (NSDictionary *) toDictionary;
- (NSDictionary *) serialize;

//- (BOOL) save;
//- (BOOL) delete;

//+ (NSArray *) getAllMessages;
//+ (NSArray *) getAllSortedMessages;

//@deprecated: DEPRECATED FUTURE REMOVE
- (UnstoredIncomingMessage *) toUnstoredIncomingMessage;

@end

