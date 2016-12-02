//
//  SendMessage.h
//  MessangiSDK
//
//  Created by Jesus on 30/9/15.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "Workspace.h"

@interface SendMessage : NSObject <NSURLSessionDelegate>

+(void)SendMessage:(NSString *)text from:(NSString *)from WithWorkspace:(id)workspace;
+(void)SendMessage:(NSString *)text WithWorkspace:(id)workspace;

@end
