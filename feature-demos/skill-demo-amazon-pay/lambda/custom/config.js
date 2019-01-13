/*
    * Copyright 2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
    * Licensed under the Amazon Software License (the "License").
    * You may not use this file except in compliance with the License.
    * A copy of the License is located at
    * http://aws.amazon.com/asl/
    * or in the "license" file accompanying this file. This file is distributed
    * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    * express or implied. See the License for the specific language governing
    * permissions and limitations under the License.
    */

 'use strict';

const utilities = require( 'utilities' );

/**
    To run the skill, the minimum values you need configure are: appID, sellerId, and sandboxCustomerEmailId

    A detailed list of attribute descriptions can be found here:
    https://developer.integ.amazon.com/docs/amazon-pay/amazon-pay-apis-for-alexa.html    
**/


// GLOBAL
    const appID                         = 'amzn1.ask.skill.7d5e6a10-ee9f-427e-a2c3-e62ae6dfb381';           // Required; Alexa Skill ID
    const sellerId                      = 'A3FOOHMSW4EVRB';                                                  // Required; Amazon Pay seller ID; Used for both Setup and Process Payment

// DIRECTIVE CONFIG
    const connectionCharge              = 'Charge';                                                         // Required;
    const connectionSetup               = 'Setup';                                                          // Required;
    const directiveCharge               = 'ChargeAmazonPay';                                                // Required;
    const directiveSetup                = 'SetupAmazonPay';                                                 // Required;
    const directiveType                 = 'Connections.SendRequest';                                        // Required;
    const version                       = '1.0';                                                            // Required;

// SETUP    
    const checkoutLanguage              = 'en_US';                                                          // Optional; US must be en_US
    const countryOfEstablishment        = 'US';                                                             // Required;
    const ledgerCurrency                = 'USD';                                                            // Required; This doesn't exist in web SDK; GBP and EUR
    const needAmazonShippingAddress     = true;                                                             // Optional; Must be boolean;
    const sandboxCustomerEmailId        = 'jack.smitt54254@gmail.com';                                      // Optional; Required if sandboxMode equals true; Must setup Amazon Pay test account first;
    const sandboxMode                   = true;                                                             // Optional; Must be false for certification; Must be boolean;

// PROCESS PAYMENT
	const paymentAction 				= 'AuthorizeAndCapture'; 											// Required; Authorize or AuthorizeAndCapture
	const providerAttributes 			= ''; 																// Optional; Required if Solution Provider.
	const sellerOrderAttributes 		= ''; 																// Optional;

// AUTHORIZE ATTRIBUTES
	const authorizationReferenceId    	= utilities.generateRandomString( 32 );                 			// Required; Must be unique, max 32 chars
	const sellerAuthorizationNote     	= utilities.getSimulationString( '' );					 			// Optional; Max 255 chars
	const softDescriptor              	= '16charSoftDesc';	                                    			// Optional; Max 16 chars
	const transactionTimeout 			= 0;																// Optional; The default value for Alexa transactions is 0.
				
// AUTHORIZE AMOUNT
	const amount                    	= '9.99';							        						// Required; Max $150,000
    const currencyCode               	= 'USD';															// Required;

// SELLER ORDER ATTRIBUTES
    const customInformation           	= 'customInformation max 1024 chars';                      		 	// Optional; Max 1024 chars
    const sellerNote                  	= 'sellerNote max 1024 chars';										// Optional; Max 1024 chars
    const sellerOrderId               	= 'Alexa unique sellerOrderId';                            		 	// Optional; Merchant specific order ID
    const sellerStoreName             	= '2019 Election Campaign';                    			       			// Optional; Documentation calls this out as storeName not sellerStoreName

// ADDITIONAL ATTRIBUTES
	const platformId 					= ''; 																// Optional; Used for Solution Providers
	const sellerBillingAgreementId 		= ''; 																// Optional; The merchant-specified identifier of this billing agreement
	const storeName 					= sellerStoreName; 													// Optional; Why is there 2 store names?


/** 
    The following strings DO NOT interact with Amazon Pay
    They are only here to augment the skill
**/


// INTENT RESPONSE STRINGS
	const launchRequestWelcomeResponse	= 'Welcome to ' + sellerStoreName + '. Let’s Meet ' +
        'Elizabeth Warren who grew up on the ragged edge of the middle class in Oak lahoma ' +
        'and became a teacher a law professor and a us senator because America invested in kids like her. ' +
//        'Would you like to hear more about Senator Warren?';
	    '.';
    const NOTIFY_MISSING_PERMISSIONS = 'Please enable Customer Profile permissions in the Amazon Alexa app.';
    const NAME_MISSING = 'You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.';
    const EMAIL_MISSING = 'You can set your email at Amazon.com, under log-in and security.';
    const NUMBER_MISSING = 'You can set your phone number at Amazon.com, under log-in and security.';
    const NAME_AVAILABLE = 'Here is your full name: ';
    const EMAIL_AVAILABLE = 'Here is your email address: ';
    const NUMBER_AVAILABLE = 'Here is your phone number: ';
    const PPERMISSIONS = ['alexa::profile:name:read', 'alexa::profile:email:read', 'alexa::profile:mobile_number:read'];
    const EERROR = 'Uh Oh. Looks like something went wrong.';

// Optional; Used for demo only
	const launchRequestQuestionResponse	= 'Would you like to pledge your contribution of $'+ amount +'?';	    // Optional; Used for demo only
	const noIntentResponse 				= 'Thank you. If you change your mind, just say Alexa Open Election Campaign. Goodbye.';						// Optional; Used for demo only
	const noIntentMessage 				= 'Please visit us again. Just say Alexa Open Election Campaign. Please rate the skill on Amazon Skill Store.';											// Optional; Used for demo only
	const orderConfirmationResponse 	= 'Thank you for your support on ' + sellerStoreName + '. Goodbye.'; 	// Optional; Used for demo only
	const orderConfirmationTitle 		= 'Sandbox Donation for Testing'; 										// Optional; Used for demo only
	const storeURL						= 'https://uttrdev.co/'; 		      									// Optional; Used for demo only

// ERROR RESPONSE STRINGS
	const enablePermission 				= 'Please enable permission for Amazon Pay in your Alexa app.'; 	// Optional; Used for demo only
	const scope 						= 'payments:autopay_consent'; 										// Optional; Used for demo only
	const errorMessage 					= 'Merchant error occurred. '; 										// Optional; Used for demo only
	const errorUnknown 					= 'Unknown error occurred. ';
	const errorStatusCode 				= 'Status code: '; 													// Optional; Used for demo only
	const errorStatusMessage 			= ' Status message: '; 												// Optional; Used for demo only
	const errorPayloadMessage 			= ' Payload message: '; 											// Optional; Used for demo only
	const errorBillingAgreement			= 'Billing agreement state is ';
	const errorBillingAgreementMessage 	= '. Reach out to the user to resolve this issue.'; 				// Optional; Used for demo only
	const authorizationDeclineMessage 	= 'Your order was not placed and you have not been charged.'; 		// Optional; Used for demo only
    const debug                         = 'debug';                                                          // Optional; Used for demo only

module.exports = {
	// GLOBAL
    'appID':                    		appID,
    'sellerId': 						sellerId,

    // DIRECTIVE CONFIG
    'version': 							version,
    'directiveType': 					directiveType,
    'connectionSetup': 					connectionSetup,
    'connectionCharge': 				connectionCharge,
    'directiveSetup':                   directiveSetup,    
    'directiveCharge':                  directiveCharge,

    // SETUP
    'countryOfEstablishment': 			countryOfEstablishment,
    'ledgerCurrency': 					ledgerCurrency,
    'checkoutLanguage': 				checkoutLanguage,
    'needAmazonShippingAddress': 		needAmazonShippingAddress,
    'sandboxCustomerEmailId': 			sandboxCustomerEmailId,
    'sandboxMode': 						sandboxMode,

    // PROCESS PAYMENT
    'paymentAction': 					paymentAction,
    'sellerOrderAttributes': 			sellerOrderAttributes,
    'providerAttributes': 				providerAttributes,

    // AUTHORIZE ATTRIBUTES
    'authorizationReferenceId': 		authorizationReferenceId,
    'sellerAuthorizationNote': 			sellerAuthorizationNote,
    'softDescriptor': 					softDescriptor,
    'transactionTimeout': 				transactionTimeout,
    'amount': 							amount,
    'currencyCode': 					currencyCode,
    'sellerOrderId': 					sellerOrderId,
    'sellerStoreName': 					sellerStoreName,
    'customInformation': 				customInformation,
    'sellerNote': 						sellerNote,
    'platformId': 						platformId,
    'sellerBillingAgreementId': 		sellerBillingAgreementId,

    // INTENT RESPONSE STRINGS
    'launchRequestWelcomeResponse':    	launchRequestWelcomeResponse,
    'launchRequestQuestionResponse':   	launchRequestQuestionResponse,
    'noIntentResponse': 				noIntentResponse,
    'noIntentMessage': 					noIntentMessage,
    'orderConfirmationResponse': 		orderConfirmationResponse,
    'orderConfirmationTitle': 			orderConfirmationTitle,
    'storeURL': 						storeURL,

    
	// ERROR RESPONSE STRINGS
    'enablePermission': 				enablePermission,
    'scope': 							scope,
    'errorMessage': 					errorMessage,
    'errorUnknown': 					errorUnknown,
    'errorStatusCode': 					errorStatusCode,
    'errorStatusMessage': 				errorStatusMessage,
    'errorPayloadMessage': 				errorPayloadMessage,
    'errorBillingAgreement': 			errorBillingAgreement,
    'errorBillingAgreementMessage': 	errorBillingAgreementMessage,
    'authorizationDeclineMessage': 		authorizationDeclineMessage,
    'debug':                            debug,
    'EERROR':                           EERROR,
    'NOTIFY_MISSING_PERMISSIONS':       NOTIFY_MISSING_PERMISSIONS,
    'PPERMISSIONS':                     PPERMISSIONS

};
