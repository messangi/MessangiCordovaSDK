//
//  Subscription.h
//  MessangiSDK
//
//  Created by Robert Volante on 7/14/14.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>

/*!
 *  @brief  Interface for manipulate subscription Object
 */
@interface Subscription : NSObject <NSCoding>

@property NSString *id;
@property NSString *name;
@property Boolean subscribed;

- (Subscription *) init;
- (void) setValue:(NSString *)value forKey:(NSString *)element;
- (NSDictionary *) serialize;

//+(NSString *) documentsSubPath;

/*!
 *  @brief  Verify if a subscription is saved like plist file
 *  @return true if find a subscription saved, false otherwise
 */
//-(BOOL)isSaved;


//+(NSArray *)listSubDirectory;
//+(NSString *)subIDfromFileName:(NSString *)messageFileName;

/*!
 *  @brief  Serialize a Subscription object to Dictionary
 *  @return A Dictionary with SubID and SubName attributes
 */
//-(NSMutableDictionary *)subToDictonaryEntry;

/*!
 *  @brief  Save a class in file system with this format subID**name.plist
 */
//-(void)writeSubToFile;

/*!
 *  @brief  Load a fileName from fileSystem and assign values to class
 *  @param fileName fileName to load
 *  @return ???
 */
//-(id)initFromFile:(NSString *)fileName;

/*!
 *  @brief  Delete a file from fileSystem
 *  @return true if is success, false if fail
 */
//-(BOOL)deleteSub;


@end
