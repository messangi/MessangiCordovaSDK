//
//  WorkspaceDataLoader.h
//  MessangiSDK
//
//  Created by Jesus Torres on 9/5/16.
//  Copyright © 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "HttpRequest.h"

@protocol WorkspaceDelegate <NSObject>
@required
- (void) availableWorkspacesLoadedSuccessfully:(NSArray *)workspaces;
- (void) availableWorkspacesLoadedWithErrors:(NSString *)error;

- (void) subscribedWorkspacesLoadedSuccessfully:(NSArray *)workspaces;
- (void) subscribedWorkspacesLoadedWithErrors:(NSString *)error;

- (void) workspaceSubscribedSuccessfully:(Workspace *)workspace;
- (void) failedToSubscribeWorkspace:(Workspace *)workspace WithError:(NSString *)error;

- (void) workspaceUnsubscribedSuccessfully:(Workspace *)workspace;
- (void) failedToUnsubscribeWorkspace:(Workspace *)workspace WithError:(NSString *)error;
@end

@interface WorkspaceDataLoader : NSObject <NSXMLParserDelegate,RequestDelegate>

@property NSMutableString *currentStringValue;
@property NSString *currentProperty;
@property id <WorkspaceDelegate> delegate;
@property void (^completion)(UIBackgroundFetchResult);


@property (strong) NSMutableArray *workspaces;
@property (strong) Workspace *workspace;

@property int operation;
@property NSString *message;
@property BOOL successful;

-(void)getAvailableWorkspacesWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)getAvailableWorkspacesWithFilter:(NSString *)filter andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)getSubscribedWorkspacesWithCompletionHander:(void (^)(UIBackgroundFetchResult))completionHandler;


-(void)getAvailableWorkspacesUsingTBXMLWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)getAvailableWorkspacesUsingNSXMLParserWithFilter:(NSString *)filter andCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

-(void)subscribeToWorkspace:(Workspace *)workspace WithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
-(void)unsubscribeFromWorkspace:(Workspace *)workspace WithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

@end
