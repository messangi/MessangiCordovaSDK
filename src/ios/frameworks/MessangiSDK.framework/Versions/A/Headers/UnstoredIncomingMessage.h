//
//  UnstoredIncomingMessage.h
//  ego
//
//  Created by Jose V. Salazar on 12/23/11.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#import <Foundation/Foundation.h>

/*!
 *  @brief  Notification Retrieve from Apple Push Service
 *  @deprecated use Message instead
 */
#warning UnstoredIncomingMessage is deprecated and it will remove in future versions, please use Message instead
@interface UnstoredIncomingMessage : NSObject

/*!
 *  @brief  ID from Notification
 */
@property (nonatomic, copy) NSString *messageID;

/*!
 *  @brief  A NSString with ID of Client
 */
@property (nonatomic, copy) NSString *clientID;

/*!
 *  @brief  A NSString with Name of Client
 */
@property (nonatomic, copy) NSString *clientName;

/*!
 *  @brief  A NSString with ID of Service
 */
@property (nonatomic, copy) NSString *serviceID;

/*!
 *  @brief  A NSString with Name of Service
 */
@property (nonatomic, copy) NSString *serviceName;

/*!
 *  @brief  A NSString with Image to show in push
 */
@property (nonatomic, copy) NSString *iconImage;

/*!
 *  @brief  A NSString with Subject of Push Notification
 */
@property (nonatomic, copy) NSString *subject;

/*!
 *  @brief  A NSinteger with Type of Notification
 */
@property NSString* type;

/*!
 *  @brief  A NSString with body text of Notification
 */
@property (nonatomic, copy) NSString *text;

/*!
 *  @brief  (???)A NSString with URL of Push Notification
 */
@property (nonatomic, copy) NSString *messageURL;

/*!
 *  @brief  true if Notification is Send; false otherwise
 */
@property BOOL isDelivered;

/*!
 *  @brief  true if User read the Notification; false otherwise
 */
@property BOOL isRead;

/*!
 *  @brief  A NSDate with Received Date of Notification
 */
@property (nonatomic, strong) NSDate *receivedDate;

/*!
 *  @brief  A NSString with Category of Notification
 */
@property (nonatomic, copy) NSString *category;

// TODO: Not implemented yet
- (BOOL)saveMessageInDatabase;

// TODO: Not implemented yet
- (BOOL)saveMessageInWaitingTable:(UnstoredIncomingMessage *)im;

// TODO: Not implemented yet
+ (NSArray *)retreiveMessagesFromTable:(NSString *)tableName;

// TODO: Not implemented yet
+ (NSArray *)retreiveMessagesFromTable:(NSString *)tableName olderThan:(NSTimeInterval)oldDate;

// TODO: Not implemented yet
+ (BOOL)deleteMessageWithID:(NSString *)messageID;

// TODO: Not implemented yet
+ (BOOL)deleteWaitingMessageWithID:(NSString *)messageID;

/*!
 *  @brief  NSString with local folder of the Inbox. There will be another for GeoFences
 *  @return A NSString with the path of Inbox
 */
+ (NSString *)documentsInboxPath;

/*!
 *  @brief  All message fields that need to be displayed in the table view list must be part of the name.
 *  @param messageFileName A NSString with this format ID**Subject**Month**Day**Year**Hour**Minute**Second**Status.plist
 *  @return A NSString with ID of entry
 */
+ (NSString *)messageIDfromFileName:(NSString *)messageFileName;

/*!
 *  @brief  All message fields that need to be displayed in the table view list must be part of the name.
 *  @param messageFileName A NSString with this format ID**Subject**Month**Day**Year**Hour**Minute**Second**Status.plist
 *  @return A NSString with Subject of entry
 */
+ (NSString *)messageSubjectFromFileName:(NSString *)messageFileName;

/*!
 *  @brief  All message fields that need to be displayed in the table view list must be part of the name. Make NSDate object with **Month**Day**Year**Hour**Minute**Second**
 *  @param messageFileName A NSString with this format ID**Subject**Month**Day**Year**Hour**Minute**Second**Status.plist
 *  @return A NSDate with Date of entry
 */
+ (NSDate *)messageReceivedDateFromFileName:(NSString *)messageFileName;

/*!
 *  @brief  All message fields that need to be displayed in the table view list must be part of the name. Status can has U or R, Unread or Read
 *  @param messageFileName A NSString with this format ID**Subject**Month**Day**Year**Hour**Minute**Second**Status.plist
 *  @return true with the file end in R.plist; false otherwise
 */
+ (BOOL)messageReadStatusFromFileName:(NSString *)messageFileName;

/*!
 *  @brief   All message fields that need to be displayed in the table view list must be part of the name. This method modify the end of messageFileName for R.plist
 *  @param messageFileName A NSString with this format ID**Subject**Month**Day**Year**Hour**Minute**Second**Status.plist
 *  @return True is successful; false otherwise
 */
+ (BOOL)messageFileNameMarkRead:(NSString *)messageFileName;

/*!
 *  @brief  Convert the class to Dictionary with same attributes
 *  @return An Dictionary with this attributes: MessageID, Subject, Text, ReceivedDate.
 */
- (NSMutableDictionary *)messageToDictonaryEntry;

/*!
 *  @brief For Persistence, save the class info in file with this format ID**Subject**Month**Day**Year**Hour**Minute**Second**Status.plist
 */
- (void)writeMessageToFile;

/*!
 *  @brief  Load All info of Notification saved in file.
 *  @param fileName A NString with filename
 *  @return ???
 */
- (id)initFromFile:(NSString *)fileName;


// ???: Only assign messageID, subject and withReceivedDate.
- (id)initWithMessageID:(NSString *)messageID withSubject:(NSString *)subject withReceivedDate:(NSDate *)receivedDate;

/*!
 *  @brief  Remove a File from Persistence Directory.
 *  @param fileName Filename to remove
 *  @return true if is Removed well; false otherwise
 */
+ (BOOL)deleteMessageFileName:(NSString *)fileName;

@end
