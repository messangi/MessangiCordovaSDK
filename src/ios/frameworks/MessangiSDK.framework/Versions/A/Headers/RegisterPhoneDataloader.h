//
//  RegisterPhoneDataloader.h
//  Messangi
//
//  Created by Omar Diaz on 05/11/13.
//  Copyright (c) 2016 Ogangi. All rights reserved.
//

#ifndef DeviceSuscriberDelegate_H
#define DeviceSuscriberDelegate_H

#import <Foundation/Foundation.h>

@protocol RegisterPhoneDelegate <NSObject>

/*!
 *  @brief  if registerDeviceWithAreaCode Works successfully, invoke this method
 *  @param success true
 *  @param message Response from Server
 */
#warning DEPRECATION NOTICE: this method will be removed in future versions, please use RegistrationStatus insteaad
- (void)RegisterPhoneSucceeded:(BOOL)success withMessage:(NSString *)message;

/*!
 *  @brief   When registerDeviceWithAreaCode fail, call this method
 *  @param error Error message send by Server
 */

/*!
 *  @brief  A protocol need Implement this methods for Authentication
 */
#warning DEPRECATION NOTICE: this method will be removed in future versions, please use RegistrationThrowslError insteaad
- (void)RegisterPhoneReturnedError:(NSString *)error;


@required

- (void)RegistrationStatus:(BOOL)successful andRequireValidation:(BOOL)validation withMessage:(NSString *)message;

- (void)RegistrationThrowsError:(NSString *)error;

/*!
 *  @brief  When activatePhoneWithCode work successfully, call this method
 *  @param success true
 *  @param message Response from Server
 */
- (void)ActivatePhoneSucceeded:(BOOL)success withMessage:(NSString *)message;

/*!
 *  @brief  When activatePhoneWithCode fail, call this method
 *  @param error Error message from Server
 */
- (void)ActivatePhoneReturnedError:(NSString *)error;

@end

/*!
 *  @brief  Interface for User Registration, need Implement for Own Registration Dialog
 */
@interface RegisterPhoneDataloader : NSObject <NSXMLParserDelegate>
{
	NSMutableString *currentStringValue;
	NSString *currentProperty;
	id <RegisterPhoneDelegate> delegate;
}

@property BOOL successful;
@property BOOL requireValidation;
@property (strong) NSString *message;
@property int operation;
@property (retain) id delegate;
@property (nonatomic, strong) NSMutableString *currentStringValue;
@property (nonatomic, strong) NSString *currentProperty;



/*!
 *  @brief  Send Phone Number to Messangi Backend
 *  @param areaCode    Country Code with Area Code
 *  @param phoneNumber seven digits Phone Number
 */
#warning DEPRECATION NOTICE: This method are deprecated and will be removed in future versions, please use registerUserWithID:andWaitForActivation: instead 
- (void)registerDeviceWithAreaCode:(NSString *)areaCode andPhoneNumber:(NSString *)phoneNumber;

/*!
 *  @brief  Send a Identification Token to Messangi Backend
 *  @param userID     Identification Token
 *  @param validation Exectute a two steap validation
 */
- (void) registerUserWithID:(NSString *)userID andWaitForActivation:(Boolean) validation;

/*!
 *  @brief  Send Validation Code received by SMS to Messangi Backend
 *  @param code Code Received by SMS
 */
- (void)activatePhoneWithCode:(NSString *)code;

@end

#endif
