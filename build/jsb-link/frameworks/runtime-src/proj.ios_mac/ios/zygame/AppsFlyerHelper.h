//
//  AppsFlyerHelper.h
//  PlanetGuardian
//
//  Created by SkyXU on 2019/12/20.
//

#ifndef AppsFlyerHelper_h
#define AppsFlyerHelper_h
 
#import <AppsFlyerLib/AppsFlyerTracker.h>

@interface AppsFlyerHelper: NSObject<AppsFlyerTrackerDelegate>
{
    
}

+ (AppsFlyerHelper*) getInstance;

+ (void) trackEvent:(NSString*) eventName withValue:(NSString*) eventValue;

+ (void) trackEventWatchAds:(NSString*) placeId;

+ (void) trackEventClickButton:(NSString*) btnName;

+ (void) trackEventLevel:(int) level;

- (void) didFinishLaunching;

- (void) applicationDidBecomeActive;


@end

#endif /* AppsFlyerHelper_h */
