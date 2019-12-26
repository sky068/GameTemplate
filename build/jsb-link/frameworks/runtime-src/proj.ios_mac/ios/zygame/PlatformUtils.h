//
//  PlatformUtils.h
//  PlanetGuardian-mobile
//
//  Created by SkyXU on 2019/12/19.
//

#ifndef PlatformUtils_h
#define PlatformUtils_h


@interface PlatformUtils : NSObject
// 手机震动
+ (void)vibratorLong;
+ (void)vibratorShort;
+ (NSString *) getIdfa;
+ (NSString *) getMacaddress;
+ (NSString *) getDeviceInfo;
+ (NSString *) getAppVersion;
+ (NSString *) getDeviceName;

@end


#endif /* PlatformUtils_h */
