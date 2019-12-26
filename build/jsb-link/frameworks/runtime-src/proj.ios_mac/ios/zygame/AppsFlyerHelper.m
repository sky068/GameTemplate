//
//  AppsFlyerHelper.m
//  PlanetGuardian-mobile
//
//  Created by SkyXU on 2019/12/20.
//

#import <Foundation/Foundation.h>
#import "AppsFlyerHelper.h"

NSString *afKey = @"JF7Tpv9oBnspbrpwtmCvnh";
NSString *appId = @"1492246824";
BOOL DEBUG_OPEN = false;

static AppsFlyerHelper *_instance = nil;

@implementation AppsFlyerHelper

+ (AppsFlyerHelper*) getInstance {
    if (_instance == nil) {
        NSLog(@"iOS: 创建AppsflyerHelper 实例");
        _instance = [[AppsFlyerHelper alloc]init];
    }
    
    return _instance;
}

- (void) didFinishLaunching {
    [AppsFlyerTracker sharedTracker].appsFlyerDevKey= afKey;
    [AppsFlyerTracker sharedTracker].appleAppID= appId;
    [AppsFlyerTracker sharedTracker].delegate= self;
    [AppsFlyerTracker sharedTracker].isDebug= DEBUG_OPEN;
    NSLog(@"iOS: initAppsFlayer");
}

- (void) applicationDidBecomeActive {
    [[AppsFlyerTracker sharedTracker]trackAppLaunch];
    NSLog(@"iOS: trackAppLaunch");
}

+ (void) trackEvent:(NSString*) eventName withValue:(NSString*) eventValue {
    NSLog(@"iOS: trackEvent: %@", eventName);
    NSDictionary *dic = [NSDictionary dictionaryWithObject:eventValue forKey:eventName];
    [[AppsFlyerTracker sharedTracker] trackEvent:eventName withValues:dic];
}

+ (void) trackEventWatchAds:(NSString*) placeId {
    NSLog(@"iOS: trackEventWatchAds: %@", placeId);
    NSDictionary *dic = [NSDictionary dictionaryWithObject:@"placeId" forKey:placeId];
    [[AppsFlyerTracker sharedTracker] trackEvent:@"watchAds" withValues:dic];
}

+ (void) trackEventClickButton:(NSString*) btnName {
    NSLog(@"iOS: trackEventClickButton: %@", btnName);
    NSDictionary *dic = [NSDictionary dictionaryWithObject:@"buttonName" forKey:btnName];
    [[AppsFlyerTracker sharedTracker] trackEvent:@"clickButton" withValues:dic];
}

+ (void) trackEventLevel:(int) level {
    NSLog(@"iOS: trackEventLevel: %d", level);
    NSDictionary *dic = [NSDictionary dictionaryWithObject:level forKey:@"level"];
    [[AppsFlyerTracker sharedTracker] trackEvent:@"level" withValues:dic];
}


#pragma mark -
#pragma mark AppsFlyerTrackerDelegate

/**
 `conversionInfo` contains information about install.
 Organic/non-organic, etc.
 @param conversionInfo May contain <code>null</code> values for some keys. Please handle this case.
 */
- (void)onConversionDataSuccess:(NSDictionary *)conversionInfo {
    NSLog(@"iOS Appsflyer onConversionDataSuccess");
}

/**
 Any errors that occurred during the conversion request.
 */
- (void)onConversionDataFail:(NSError *)error {
    NSLog(@"iOS Appsflyer onConversionDataFail: error:%d, %@", error.code, error.description);
}

/**
 `attributionData` contains information about OneLink, deeplink.
 */
- (void)onAppOpenAttribution:(NSDictionary *)attributionData {
    NSLog(@"iOS Appsflyer: onAppOpenAttribution");
}

/**
 Any errors that occurred during the attribution request.
 */
- (void)onAppOpenAttributionFailure:(NSError *)error {
    NSLog(@"iOS Appsflyer onAppOpenAttributionFailure: error:%d, %@", error.code, error.description);
}

/**
 @abstract Sets the HTTP header fields of the ESP resolving to the given
 dictionary.
 @discussion This method replaces all header fields that may have
 existed before this method ESP resolving call.
 To keep default SDK dehavior - return nil;
 */
- (NSDictionary <NSString *, NSString *> *)allHTTPHeaderFieldsForResolveDeepLinkURL:(NSURL *)URL {
    NSLog(@"iOS Appsflyer allHTTPHeaderFieldsForResolveDeepLinkURL");
}

@end
