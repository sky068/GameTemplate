package com.zygame.utils;

import android.util.Log;

import com.appsflyer.AFInAppEventParameterName;
import com.appsflyer.AFInAppEventType;
import com.appsflyer.AppsFlyerConversionListener;
import com.appsflyer.AppsFlyerLib;
import com.appsflyer.AppsFlyerProperties;

import org.cocos2dx.javascript.AppActivity;

import java.util.HashMap;
import java.util.Map;

public class AFHelper {
    private static String TAG = "AFLOG";
    private static AppActivity mContext = null;
    private static final String AF_DEV_KEY = "JF7Tpv9oBnspbrpwtmCvnh";
    public static void initAF(AppActivity context) {
        mContext = context;
        AppsFlyerConversionListener conversionListener = new AppsFlyerConversionListener() {
            @Override
            public void onInstallConversionDataLoaded(Map<String, String> map) {

            }

            @Override
            public void onInstallConversionFailure(String s) {

            }

            @Override
            public void onAppOpenAttribution(Map<String, String> map) {

            }

            @Override
            public void onAttributionFailure(String s) {

            }
        };
        AppsFlyerLib.getInstance().init(AF_DEV_KEY, conversionListener, mContext);
        String customID = AppsFlyerProperties.getInstance().getString(AppsFlyerProperties.APP_USER_ID);
        if (customID==null || customID.equals("")) {
            Log.d(TAG, "设置custom user id");
            AppsFlyerLib.getInstance().setCustomerUserId(PlatformUtils.getAndroidID());
        }
        AppsFlyerLib.getInstance().startTracking(mContext.getApplication());
    }

    // 追踪玩家等级
    public static void trackEventLevel(int level) {
        Log.d(TAG, level + "");
        Map<String, Object> event = new HashMap<String, Object>();
        event.put(AFInAppEventParameterName.LEVEL, level);
        AppsFlyerLib.getInstance().trackEvent(mContext, AFInAppEventType.LEVEL_ACHIEVED, event);
    }

    // 追踪观看广告
    public static void trackEventWatchAD(String adname) {
        Log.d(TAG, adname);
        Map<String, Object> event = new HashMap<String, Object>();
        event.put("ad_placeID", adname);
        AppsFlyerLib.getInstance().trackEvent(mContext, AFInAppEventType.AD_VIEW, event);
    }

    // 追踪点击按钮
    public static void trackEventClickButton(String btnName) {
        Log.d(TAG, btnName);
        Map<String, Object> event = new HashMap<String, Object>();
        event.put("button_id", btnName);
        AppsFlyerLib.getInstance().trackEvent(mContext, "click_button", event);
    }

    // 追踪自定义事件
    public static void trackEvent(String key, String value) {
        Log.d(TAG, "key=" + key + ", value:" + value);
        Map<String, Object> event = new HashMap<String, Object>();
        event.put(key, value);
        AppsFlyerLib.getInstance().trackEvent(mContext, AFInAppEventType.CUSTOMER_SEGMENT, event);
    }
}
