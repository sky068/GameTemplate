package com.zygame.utils;

import android.os.Bundle;
import android.util.Log;

import com.facebook.FacebookSdk;
import com.facebook.LoggingBehavior;
import com.facebook.appevents.AppEventsConstants;
import com.facebook.appevents.AppEventsLogger;

import org.cocos2dx.javascript.AppActivity;

public class FBHelper {
    private static String TAG = "FBEVENT";
    private static AppActivity mContext = null;
    private static AppEventsLogger logger = null;

    public static void initFb(AppActivity context) {
        mContext = context;
        logger = AppEventsLogger.newLogger(mContext);

        FacebookSdk.setIsDebugEnabled(GameConfig.DEBUG_OPEN);
        if (GameConfig.DEBUG_OPEN) {
            FacebookSdk.addLoggingBehavior(LoggingBehavior.APP_EVENTS);
        }
    }

    /*********FB上报事件开始*********/
    // 上报玩家等级
    public static void logEventLevel(int level) {
        Log.d(TAG,AppEventsConstants.EVENT_NAME_ACHIEVED_LEVEL + ", "  + level);
        logger.logEvent(AppEventsConstants.EVENT_NAME_ACHIEVED_LEVEL, level);
    }

    // 上报观看广告
    public static void logEventWatchAD(String adname) {
        Bundle b = new Bundle();
        b.putString("ad_placeID", adname);
        logger.logEvent(AppEventsConstants.EVENT_NAME_AD_IMPRESSION, b);
    }

    // 上报按钮点击
    public static void logEventClickButton(String btnName) {
        Bundle b = new Bundle();
        b.putString("button_id", btnName);
        logger.logEvent("click_button", b);
    }

    // 上报其他事件 无参数
    public static void logEventName(String eventName) {
        Log.d(TAG,eventName);
        logger.logEvent(eventName);
    }

    // 上报其他事件
    public static void logEvent(String eventName, String key, String value) {
        Log.d(TAG,eventName + ", " + key + ", " + value);
        Bundle params = new Bundle();
        params.putString(key, value);
        logger.logEvent(eventName, params);
    }

    /*********FB上报事件结束*********/
}
