package com.zygame.utils;

import android.content.Context;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Vibrator;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.Log;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.lib.Cocos2dxHelper;
import org.json.JSONException;
import org.json.JSONObject;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;

import static android.content.Context.WIFI_SERVICE;

public class PlatformUtils {
    public static Boolean DEBUG_MODE = GameConfig.DEBUG_OPEN;
    public static AppActivity context = null;
    private static String TAG = "PlatformUtils";

    public static void setContext(AppActivity ct) {
        context = ct;
    }

    public static AppActivity getContext() {
        return context;
    }

    // 进入游戏后移除splash 图片
    public static void rmSplashView(){
        if (context == null) {
            return;
        }
        context.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.i("Splash", "rmSplashView: ");
                if (context.splashImg != null){
                    context.mFrameLayout.removeView(context.splashImg);
                    context.splashImg = null;
                    Log.i("Splash", "rmSplashView finished. ");
                }
            }
        });
    }

    /*
        手机震动功能
     */
    public static void vibrator(int t) {
        Log.d("tt", "ttt");
        Vibrator vib = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
        vib.vibrate(t);
    }

    /**
     * 获取设备语言
     *
     * @return String
     */
    public static String getDeviceLanguage() {
        return Locale.getDefault().getLanguage().toLowerCase(Locale.US);
    }

    /**
     * 获取所在国家
     *
     * @return String
     */
    public static String getDeviceCountry() {
        return Locale.getDefault().getCountry().toUpperCase(Locale.US);
    }

    /**
     * 获取系统版本号
     *
     * @return String
     */
    public static String getOSVersion() {
        return Build.VERSION.RELEASE;
    }

    /**
     * 获取设备型号
     *
     * @return String
     */
    public static String getDeviceModel() {
        return Build.MODEL;
    }

    /**
     * 获取设备品牌
     *
     * @return String
     */
    public static String getDeviceBrand() {
        return Build.MANUFACTURER;
    }

    /**
     * 获取玩家所在国家代码
     * @return String
     */
    public static String getUserCountryCode() {
        String code = null;
        try {
            TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            code = tm.getSimCountryIso().toUpperCase(Locale.US);
            PlatformUtils.logErrorInfo("getUserCountryCode ok from TelephonyManager:" + code);
        } catch (Exception e) {
            // failed
        }
        if (code == null)
            code = PlatformUtils.getDeviceCountry();
        return code;
    }

    public static String getPseudoID() {
        String devID = "35" + //we make this look like a valid IMEI
                Build.BOARD.length() % 10 +
                Build.BRAND.length() % 10 +
                //			    Build.SUPPORTED_ABIS.length%10 +
                1 % 10 +
                Build.DEVICE.length() % 10 +
                Build.DISPLAY.length() % 10 +
                Build.HOST.length() % 10 +
                Build.ID.length() % 10 +
                Build.MANUFACTURER.length() % 10 +
                Build.MODEL.length() % 10 +
                Build.PRODUCT.length() % 10 +
                Build.TAGS.length() % 10 +
                Build.TYPE.length() % 10 +
                Build.USER.length() % 10; //13 digits

        return devID;
    }

    public static String getAndroidID() {
        String androidID = null;
        try {
            androidID = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        } catch (Exception e) {
            androidID = null;
        }

        if (androidID == null) {
            androidID = "";
        }
        return androidID;
    }

    public static String getLocalMacAddress() {
        String macAddress = null;
//        try {
//            WifiManager wifi = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
//            macAddress = wifi.getConnectionInfo().getMacAddress();
//        } catch (Exception e) {
//            macAddress = null;
//        }

        if (macAddress == null) {
            macAddress = "";
        }
        return macAddress;

		/*
		try {
			WifiManager wifi = (WifiManager)context.getSystemService("wifi");
			if(wifi==null) {
				logErrorInfo("failed to get wifiManager.");
			}
			else {
				WifiInfo info = wifi.getConnectionInfo();
				String macAddress = info.getMacAddress();
				macAddress = macAddress.replace(":", "");
				macAddress = macAddress.toLowerCase(Locale.US);
				String prefix = getKHMACPrefix();
				if(prefix!=null) macAddress = prefix + macAddress;
				return macAddress;
			}
		} catch (Exception e) {
			// System.out.println(e);
			logException(e);
		}

		// generate random id
		return ""+getCurrentTime();
        */
    }

    /**
     * 获取设备唯一标示符
     * @return String
     */
    public static String getDeviceID() {
        String longID = PlatformUtils.getPseudoID() + PlatformUtils.getAndroidID() + PlatformUtils.getLocalMacAddress();
        // compute md5
        MessageDigest m = null;
        try {
            m = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        m.update(longID.getBytes(), 0, longID.length());
        // get md5 bytes
        byte p_md5Data[] = m.digest();
        // create a hex string
        String uniqueID = "";
        for (int i = 0; i < p_md5Data.length; i++) {
            int b = (0xFF & p_md5Data[i]);
            // if it is a single digit, make sure it have 0 in front (proper padding)
            if (b <= 0xF)
                uniqueID += "0";
            // add number to string
            uniqueID += Integer.toHexString(b);
        } // hex string to uppercase
        uniqueID = uniqueID.toUpperCase();

        return uniqueID;
    }

    public static String getPackageVersion() {
        if (context == null)
            return null;
        String ver = null;
        try {
            ver = context.getPackageManager().getPackageInfo(context.getPackageName(), 0).versionName;
        } catch (Exception e) {
            PlatformUtils.logException(e);
        }
        if (DEBUG_MODE)
            ver = ver + "_d";
        return ver;
    }

    public static void logException(Exception e) {
        if (DEBUG_MODE) {
            // System.err.println("Got Exception:");
            // e.printStackTrace();
            Log.e(getPackageID(), "Got Exception", e);
        }
    }

    public static void logErrorInfo(String msg) {
        if (DEBUG_MODE){
            Log.d(PlatformUtils.getPackageID(), msg);
        }
    }

    public static String getPackageID() {
        if (context == null)
            return "";
        return context.getPackageName();
    }


    // 获取设备信息
    public static String getDeviceInfo() {

        try {

            final String macStr = NetWorkUtils.getMacID(getContext());
            final String model = Cocos2dxHelper.getDeviceModel();
            final String androidId = Settings.Secure.getString(
                    getContext().getContentResolver(), Settings.Secure.ANDROID_ID);
            final String currentapiVersion = android.os.Build.VERSION.RELEASE;
            final WifiManager wifiManager = (WifiManager) getContext().getApplicationContext()
                    .getSystemService(WIFI_SERVICE);
            String ssid = wifiManager.getConnectionInfo().getSSID();
            if (ssid == null)
                ssid = "";
            else {
                ssid = ssid.replaceAll("\"", "");
                ssid = ssid.replaceAll("=", "_");
            }
            final String ssidFinal = ssid;

            JSONObject json = new JSONObject();
            try {
                json.put("mac", macStr);
                json.put("model", model);
                json.put("androidId", androidId);
                json.put("osVersion", currentapiVersion);
                json.put("ssid", ssid);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            String str = json.toString();
            return str;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "{}";
    }
}
