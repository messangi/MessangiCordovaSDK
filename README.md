# Messangi Cordova SDK

Messangi Cordova SDK works as a wrapper to MessangiSDK for iOS and Android and is based upon the official Cordova documentation to generate native plugins in the platform https://cordova.apache.org/docs/en/6.0.0/guide/hybrid/plugins/index.html

----------
## Platform settings

### Certificates
#### iOS
In iOS to be able to get push notifications you have to follow a long and strict steps list, explained in the following link: [iOS Certificates](https://www.messangi.com/documentation/doku.php?id=sdk:ios_certs)

The certificates are **mandatory** to enable the Push Notifications feature in iOS, so you have to be careful to generate them properly.

#### Android
In order to get the credentials in Google Cloud Messaging (GCM), you must follow our guide in this link: [GCM - Credentials](https://www.messangi.com/documentation/doku.php?id=sdk:android_keys) 

The credentials in GCM are **mandatory** to enable the Push Notifications feature in Android, so you have to be careful to generate them properly.

### Plataforms

#### iOS

First you have to add the platform to the **PhoneGap/Cordova** project 

```
    cordova platform add ios
```

In Xcode click on **Open another project** and then look for the previously generated project, then go to **Platforms > iOS** directory and open the one with **.xcworkspace** extension. 

Once opened the project in Xcode, select the project root (project name in the left panel), in the right section, it's chosen the tab **General**, in that tab is located the **Bundle Identifier**, this is the same referenced from the **config.xml** file, it's suggestable not to modify that in Xcode but in the file itself and then run again the command **ionic build ios**. In that tab is also the information for signing and deployment.

In the **Capabilities** tab must be checked at least the following:

- Push Notifications
- Background Modes
	- Location updates
	- Uses Bluetooth LE accessories
	- Background fetch
	- Remote notifications
- Associated Domains

**Note:** Any error shown in this point could be caused by any error in certificate generation. 

In the *AppDelegate+notification.m** file is automatically overwritten everything that official documentation asks to overwrite or add from **AppDelegate**, then there is no need to modify it unless you wish to change any base behavior; the original **AppDelegate** file should not be modified (it's so to allow the operation together other plugins).

#### ANDROID

It's suggested to use **Android Studio** as the new offcial Android development IDE. Cordova is compatible from version 4 with Android Studio.

First you have to add the platform to the **PhoneGap/Cordova** project.

```
    cordova platform add android
```

Now from **Android Studio** you can open the project created in **<project_folder>/platforms/android/**

----------
## Starting with the plugin

After having base project set and working properly, go to the base project directory and include the plugin adding the neccesary variables for Messangi.

```shell
	$>cordova plugin add cordova-plugin-messangi --variable APP_NAME=<Messangi Application Name> --variable PUBLIC_KEY=<Messangi Public Key or Client ID> --variable PRIVATE_KEY=<Messangi Private Key> --variable GCM_API_KEY=<Gcm Api Key> --variable GCM_PROJECT_NUMBER=<GCM Project Number>
```

|Variables|Description|Required|Platform|
|---------|-----------|--------|--------|
|APP_NAME |This variable is sent to you from the Messangi Team|YES|ANDROID - iOS|
|PUBLIC_KEY|This variable is sent to you from the Messangi Team|YES|ANDROID - iOS|
|PRIVATE_KEY|This variable is sent to you from the Messangi Team|YES|ANDROID - iOS|
|GCM_API_KEY|This variable is found with GCM* and you have to request your registration through emailing to support team|YES|ANDROID|
|GCM_PROJECT_NUMBER|This variable is found with GCM* and you have to request your registration through emailing to support team|YES|ANDROID|
|MMC_URL|This variable is sent to you from the Messangi Team|NO|ANDROID - iOS|
|MMC_INSTANCE_ID|This variable is sent to you from the Messangi Team|NO|ANDROID - iOS|

* Variables found in **Certificates** section, **Android** subsection.

----------
## Libraries

### iOS
 - Messangi.Framework (it's automatically installed with the version downloaded from this repository, it can be updated with a newer later if you wish).

### Android
 - messangisdk  (it's automatically installed with the version downloaded from this repository, it can be updated with a newer later if you wish)

## TODO
 - General:
    - Subscription lists
    - Check and clean comments

## Version
3.6.0

## Changelog
#### 3.6.0
	Execute Settings methods on threads for better performance
	Update MessangiSDK Android Library
	  - Update Google Play Services Dependencies
	  - Beacons and Geofences Working when app is not running
	  - New Logs format
      - Multiple bugs fixed
#### 3.5.0
	Added options to configure Beacon Scanner and Location capabilities on Android Devices
	The options will work in runtime, not need restart the app
#### 3.1.1
	Update Native version of MessangiSDK for Android and iOS, this update fix a bug with creation of new beacons based campaing 
#### 3.1.0
	Added configuration functions for Location capabilities
#### 3.0.0
	Source code release
