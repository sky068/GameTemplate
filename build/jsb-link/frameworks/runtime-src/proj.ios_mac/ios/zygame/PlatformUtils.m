//
//  PlatformUtils.m
//  PlanetGuardian-mobile
//
//  Created by SkyXU on 2019/12/19.
//

#import <Foundation/Foundation.h>
#import "PlatformUtils.h"
#import <AudioToolbox/AudioToolbox.h>
#import <AdSupport/AdSupport.h>
#import "sys/utsname.h"
#include <sys/sysctl.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <net/if.h>
#include <net/if_dl.h>
#include "SimulateIDFA.h"

@implementation PlatformUtils

+ (void)vibratorLong {
    NSLog(@"iOS: 长震动");
    AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
}

+ (void)vibratorShort {
    NSLog(@"iOS: 短震动");
    // iOS 10以上才有效果
    UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle: UIImpactFeedbackStyleLight];
    [generator prepare];
    [generator impactOccurred];
    
//    UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
//    [generator notificationOccurred:UINotificationFeedbackTypeSuccess];
}

+ (NSString *) getIdfa {
    NSLog(@"iOS: 获取idfa");
    NSString * ret = @"";
    ret = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    NSString *version = [[UIDevice currentDevice] systemVersion];
    NSLog(@"systemVersion: %@", version);
    if (version.doubleValue >= 10.0) {
        BOOL limit = [[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled];
        BOOL limit2 = [ret isEqualToString:@"00000000-0000-0000-0000-000000000000"];
        if (!limit || limit2) {
            NSLog(@"iOS: 玩家开启了限制广告追踪，可能获取不到idfa, 开始使用SimulateIDFA");
            ret = [SimulateIDFA createSimulateIDFA];
        }
    }
    NSLog(@"iOS: idfa: %@", ret);
    return ret;
}

+ (NSString*)getMacaddress
{
    NSLog(@"iOS: 获取macaddress");
    
    int                 mib[6];
    size_t                 len;
    char                 *buf;
    unsigned char         *ptr;
    struct if_msghdr     *ifm;
    struct sockaddr_dl     *sdl;
    
    mib[0] = CTL_NET;
    mib[1] = AF_ROUTE;
    mib[2] = 0;
    mib[3] = AF_LINK;
    mib[4] = NET_RT_IFLIST;
    
    if ((mib[5] = if_nametoindex("en0")) == 0) {
        printf("Error: if_nametoindex error\n");
        return NULL;
    }
    
    if (sysctl(mib, 6, NULL, &len, NULL, 0) < 0) {
        printf("Error: sysctl, take 1\n");
        return NULL;
    }
    
    if ((buf = malloc(len)) == NULL) {
        printf("Could not allocate memory. error!\n");
        return NULL;
    }
    
    if (sysctl(mib, 6, buf, &len, NULL, 0) < 0) {
        printf("Error: sysctl, take 2");
        free(buf);
        return NULL;
    }
    
    ifm = (struct if_msghdr *)buf;
    sdl = (struct sockaddr_dl *)(ifm + 1);
    ptr = (unsigned char *)LLADDR(sdl);
    NSString *macString = [NSString stringWithFormat:@"%02X:%02X:%02X:%02X:%02X:%02X",
                           *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5)];
    free(buf);
    
    NSLog(@"iOS: MacAddr: %@", macString);
    return macString;
}

+ (NSString *) getAppVersion {
    NSLog(@"iOS: 获取app version");
    NSString * version = [[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleShortVersionString"];
    
    // 获取build号
//    [[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleVersion"];
    // 获取app显示名字
//    [[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleDisplayName"];
    
    NSLog(@"iOS: app version: %@", version);
    return version;
}

+ (NSString *)getDeviceName {
    NSLog(@"iOS: 获取设备名字");
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
    
    //模拟器
    if ([deviceString isEqualToString:@"i386"])         return @"Simulator";
    if ([deviceString isEqualToString:@"x86_64"])       return @"Simulator";
    
    //iPhone
    if ([deviceString isEqualToString:@"iPhone1,1"])    return @"iPhone";
    if ([deviceString isEqualToString:@"iPhone1,2"])    return @"iPhone_3G";
    if ([deviceString isEqualToString:@"iPhone2,1"])    return @"iPhone_3GS";
    if ([deviceString isEqualToString:@"iPhone3,1"])    return @"iPhone_4";
    if ([deviceString isEqualToString:@"iPhone3,2"])    return @"iPhone_4";
    if ([deviceString isEqualToString:@"iPhone3,3"])    return @"iPhone_4";
    if ([deviceString isEqualToString:@"iPhone4,1"])    return @"iPhone_4S";
    if ([deviceString isEqualToString:@"iPhone5,1"])    return @"iPhone_5";
    if ([deviceString isEqualToString:@"iPhone5,2"])    return @"iPhone_5";
    if ([deviceString isEqualToString:@"iPhone5,3"])    return @"iPhone_5c";
    if ([deviceString isEqualToString:@"iPhone5,4"])    return @"iPhone_5c";
    if ([deviceString isEqualToString:@"iPhone6,1"])    return @"iPhone_5s";
    if ([deviceString isEqualToString:@"iPhone6,2"])    return @"iPhone_5s";
    if ([deviceString isEqualToString:@"iPhone7,1"])    return @"iPhone_6_Plus";
    if ([deviceString isEqualToString:@"iPhone7,2"])    return @"iPhone_6";
    if ([deviceString isEqualToString:@"iPhone8,1"])    return @"iPhone_6s";
    if ([deviceString isEqualToString:@"iPhone8,2"])    return @"iPhone_6s_Plus";
    if ([deviceString isEqualToString:@"iPhone8,4"])    return @"iPhone_SE";
    if ([deviceString isEqualToString:@"iPhone9,1"])    return @"iPhone_7";
    if ([deviceString isEqualToString:@"iPhone9,2"])    return @"iPhone_7_Plus";
    if ([deviceString isEqualToString:@"iPhone9,3"])    return @"iPhone_7";
    if ([deviceString isEqualToString:@"iPhone9,4"])    return @"iPhone_7_Plus";
    if ([deviceString isEqualToString:@"iPhone10,1"])   return @"iPhone_8";
    if ([deviceString isEqualToString:@"iPhone10,2"])   return @"iPhone_8_Plus";
    if ([deviceString isEqualToString:@"iPhone10,3"])   return @"iPhone_X";
    if ([deviceString isEqualToString:@"iPhone10,4"])   return @"iPhone_8";
    if ([deviceString isEqualToString:@"iPhone10,5"])   return @"iPhone_8_Plus";
    if ([deviceString isEqualToString:@"iPhone10,6"])   return @"iPhone_X";
    if ([deviceString isEqualToString:@"iPhone11,2"])   return @"iPhone_XS";
    if ([deviceString isEqualToString:@"iPhone11,4"])   return @"iPhone_XS_Max";
    if ([deviceString isEqualToString:@"iPhone11,6"])   return @"iPhone_XS_Max";
    if ([deviceString isEqualToString:@"iPhone11,8"])   return @"iPhone_XR";
    if ([deviceString isEqualToString:@"iPhone12,1"])   return @"iPhone_11";
    if ([deviceString isEqualToString:@"iPhone12,3"])   return @"iPhone_11Pro";
    if ([deviceString isEqualToString:@"iPhone12,5"])   return @"iPhone_11Pro_Max";
    
    //iPad
    if ([deviceString isEqualToString:@"iPad1,1"])      return @"iPad";
    if ([deviceString isEqualToString:@"iPad2,1"])      return @"iPad_2nd";
    if ([deviceString isEqualToString:@"iPad2,2"])      return @"iPad_2nd";
    if ([deviceString isEqualToString:@"iPad2,3"])      return @"iPad_2nd";
    if ([deviceString isEqualToString:@"iPad2,4"])      return @"iPad_2nd";
    if ([deviceString isEqualToString:@"iPad2,5"])      return @"iPad_mini";
    if ([deviceString isEqualToString:@"iPad2,6"])      return @"iPad_mini";
    if ([deviceString isEqualToString:@"iPad2,7"])      return @"iPad_mini";
    if ([deviceString isEqualToString:@"iPad3,1"])      return @"iPad_3rd";
    if ([deviceString isEqualToString:@"iPad3,2"])      return @"iPad_3rd";
    if ([deviceString isEqualToString:@"iPad3,3"])      return @"iPad_3rd";
    if ([deviceString isEqualToString:@"iPad3,4"])      return @"iPad_4th";
    if ([deviceString isEqualToString:@"iPad3,5"])      return @"iPad_4th";
    if ([deviceString isEqualToString:@"iPad3,6"])      return @"iPad_4th";
    if ([deviceString isEqualToString:@"iPad4,1"])      return @"iPadAir";
    if ([deviceString isEqualToString:@"iPad4,2"])      return @"iPadAir";
    if ([deviceString isEqualToString:@"iPad4,3"])      return @"iPadAir";
    if ([deviceString isEqualToString:@"iPad4,4"])      return @"iPad_mini_2nd";
    if ([deviceString isEqualToString:@"iPad4,5"])      return @"iPad_mini_2nd";
    if ([deviceString isEqualToString:@"iPad4,6"])      return @"iPad_mini_2nd";
    if ([deviceString isEqualToString:@"iPad4,7"])      return @"iPad_mini_3rd";
    if ([deviceString isEqualToString:@"iPad4,8"])      return @"iPad_mini_3rd";
    if ([deviceString isEqualToString:@"iPad4,9"])      return @"iPad_mini_3rd";
    if ([deviceString isEqualToString:@"iPad5,1"])      return @"iPad_mini_4th";
    if ([deviceString isEqualToString:@"iPad5,2"])      return @"iPad_mini_4th";
    if ([deviceString isEqualToString:@"iPad5,3"])      return @"iPadAir_2nd";
    if ([deviceString isEqualToString:@"iPad5,4"])      return @"iPadAir_2nd";
    if ([deviceString isEqualToString:@"iPad6,3"])      return @"iPadPro_9.7";
    if ([deviceString isEqualToString:@"iPad6,4"])      return @"iPadPro_9.7";
    if ([deviceString isEqualToString:@"iPad6,7"])      return @"iPadPro_12.9";
    if ([deviceString isEqualToString:@"iPad6,8"])      return @"iPadPro_12.9";
    if ([deviceString isEqualToString:@"iPad6,11"])     return @"iPad_5th";
    if ([deviceString isEqualToString:@"iPad6,12"])     return @"iPad_5th";
    if ([deviceString isEqualToString:@"iPad7,1"])      return @"iPadPro_12.9_2nd";
    if ([deviceString isEqualToString:@"iPad7,2"])      return @"iPadPro_12.9_2nd";
    if ([deviceString isEqualToString:@"iPad7,3"])      return @"iPadPro_10.5";
    if ([deviceString isEqualToString:@"iPad7,4"])      return @"iPadPro_10.5";
    if ([deviceString isEqualToString:@"iPad7,5"])      return @"iPad_6th";
    if ([deviceString isEqualToString:@"iPad7,6"])      return @"iPad_6th";
    if ([deviceString isEqualToString:@"iPad7,11"])     return @"iPad_7th";
    if ([deviceString isEqualToString:@"iPad7,12"])     return @"iPad_7th";
    if ([deviceString isEqualToString:@"iPad8,1"])      return @"iPadPro_11";
    if ([deviceString isEqualToString:@"iPad8,2"])      return @"iPadPro_11";
    if ([deviceString isEqualToString:@"iPad8,3"])      return @"iPadPro_11";
    if ([deviceString isEqualToString:@"iPad8,4"])      return @"iPadPro_11";
    if ([deviceString isEqualToString:@"iPad8,5"])      return @"iPadPro_12.9_3rd";
    if ([deviceString isEqualToString:@"iPad8,6"])      return @"iPadPro_12.9_3rd";
    if ([deviceString isEqualToString:@"iPad8,7"])      return @"iPadPro_12.9_3rd";
    if ([deviceString isEqualToString:@"iPad8,8"])      return @"iPadPro_12.9_3rd";
    if ([deviceString isEqualToString:@"iPad11,1"])     return @"iPad_mini_5th";
    if ([deviceString isEqualToString:@"iPad11,2"])     return @"iPad_mini_5th";
    if ([deviceString isEqualToString:@"iPad11,3"])     return @"iPadAir_3rd";
    if ([deviceString isEqualToString:@"iPad11,4"])     return @"iPadAir_3rd";
    
    //iPod touch
    if ([deviceString isEqualToString:@"iPod1,1"])      return @"iPod_touch";
    if ([deviceString isEqualToString:@"iPod2,1"])      return @"iPod_touch_2nd";
    if ([deviceString isEqualToString:@"iPod3,1"])      return @"iPod_touch_3rd";
    if ([deviceString isEqualToString:@"iPod4,1"])      return @"iPod_touch_4th";
    if ([deviceString isEqualToString:@"iPod5,1"])      return @"iPod_touch_5th";
    if ([deviceString isEqualToString:@"iPod7,1"])      return @"iPod_touch_6th";
    if ([deviceString isEqualToString:@"iPod9,1"])      return @"iPod_touch_7th";
    
    //Apple Watch
    if ([deviceString isEqualToString:@"Watch1,1"])    return @"Apple_Watch_1st";
    if ([deviceString isEqualToString:@"Watch1,2"])    return @"Apple_Watch_1st";
    if ([deviceString isEqualToString:@"Watch2,6"])    return @"Apple_Watch_Series_1";
    if ([deviceString isEqualToString:@"Watch2,7"])    return @"Apple_Watch_Series_1";
    if ([deviceString isEqualToString:@"Watch2,3"])    return @"Apple_Watch_Series_2";
    if ([deviceString isEqualToString:@"Watch2,4"])    return @"Apple_Watch_Series_2";
    if ([deviceString isEqualToString:@"Watch3,1"])    return @"Apple_Watch_Series_3";
    if ([deviceString isEqualToString:@"Watch3,2"])    return @"Apple_Watch_Series_3";
    if ([deviceString isEqualToString:@"Watch3,3"])    return @"Apple_Watch_Series_3";
    if ([deviceString isEqualToString:@"Watch3,4"])    return @"Apple_Watch_Series_3";
    if ([deviceString isEqualToString:@"Watch4,1"])    return @"Apple_Watch_Series_4";
    if ([deviceString isEqualToString:@"Watch4,2"])    return @"Apple_Watch_Series_4";
    if ([deviceString isEqualToString:@"Watch4,3"])    return @"Apple_Watch_Series_4";
    if ([deviceString isEqualToString:@"Watch4,4"])    return @"Apple_Watch_Series_4";
    if ([deviceString isEqualToString:@"Watch5,1"])    return @"Apple_Watch_Series_5";
    if ([deviceString isEqualToString:@"Watch5,2"])    return @"Apple_Watch_Series_5";
    if ([deviceString isEqualToString:@"Watch5,3"])    return @"Apple_Watch_Series_5";
    if ([deviceString isEqualToString:@"Watch5,4"])    return @"Apple_Watch_Series_5";
    
    //Apple TV
    if ([deviceString isEqualToString:@"AppleTV2,1"])    return @"AppleTV_2nd";
    if ([deviceString isEqualToString:@"AppleTV3,1"])    return @"AppleTV_3rd";
    if ([deviceString isEqualToString:@"AppleTV3,2"])    return @"AppleTV_3rd";
    if ([deviceString isEqualToString:@"AppleTV5,3"])    return @"AppleTV_4th";
    if ([deviceString isEqualToString:@"AppleTV6,2"])    return @"AppleTV_4K";
    
    //AirPods
    if ([deviceString isEqualToString:@"AirPods1,1"])    return @"AirPods_1st";
    if ([deviceString isEqualToString:@"AirPods2,1"])    return @"AirPods_2nd";
    
    //HomePod
    if ([deviceString isEqualToString:@"AudioAccessory1,1"])    return @"HomePod";
    if ([deviceString isEqualToString:@"AudioAccessory1,2"])    return @"HomePod";
    
    NSLog(@"iOS: 设备名字: %@", deviceString);
    return deviceString;
}

+ (NSString *) getDeviceInfo {
    NSString *mac = [PlatformUtils getMacaddress];
    NSString *idfa = [PlatformUtils getIdfa];
    NSString * model = [PlatformUtils getDeviceName];
    
    NSDictionary * dic = [NSDictionary dictionaryWithObjectsAndKeys:mac, @"mac", idfa, @"idfa", model, @"model", nil];
    NSString *ret = [PlatformUtils convertToJsonData:dic];
    
    NSLog(@"iOS: 获取设备信息: %@", ret);
    return ret;
}



// NSDictionary 和JSON字符串互转
+ (NSString *)convertToJsonData:(NSDictionary *)dict

{
    NSError *error;

    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:&error];

    NSString *jsonString;

    if (!jsonData) {
        NSLog(@"iOS: %@",error);
    }else{
        jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
    }

    NSMutableString *mutStr = [NSMutableString stringWithString:jsonString];

    NSRange range = {0,jsonString.length};

    //去掉字符串中的空格
    [mutStr replaceOccurrencesOfString:@" " withString:@"" options:NSLiteralSearch range:range];

    NSRange range2 = {0,mutStr.length};

    //去掉字符串中的换行符
    [mutStr replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:range2];

    return mutStr;
}

+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString
{
    if (jsonString == nil) {
        return nil;
    }

    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingMutableContainers
                                                          error:&err];
    if(err)
    {
        NSLog(@"iOS, json解析失败：%@",err);
        return nil;
    }
    return dic;
}

@end

