package com.zygame.utils;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;

/**
 * NetWork Utils
 * <ul>
 * <strong>Attentions</strong>
 * <li>You should add <strong>android.permission.ACCESS_NETWORK_STATE</strong> in manifest, to get network status.</li>
 * </ul>
 *
 * @author <a href="http://www.trinea.cn" target="_blank">Trinea</a> 2014-11-03
 */
public class NetWorkUtils {

    /**
     * 4G LTE
     * 3G 联通的3G为HSDPA或HSDPAP 电信的3G为EVDO 移动3G为UMTS
     * 2G 移动和联通的2G为GPRS或EGDE 电信的2G为CDMA
     */
    public static final String NETWORK_TYPE_WIFI = "wifi";
    public static final String NETWORK_TYPE_3G = "3g";
    public static final String NETWORK_TYPE_4G = "4g";
    public static final String NETWORK_TYPE_2G = "2g";
    public static final String NETWORK_TYPE_WAP = "wap";
    public static final String NETWORK_TYPE_UNKNOWN = "unknown";
    public static final String NETWORK_TYPE_DISCONNECT = "disconnect";

    /**
     * Get network type
     *
     * @param context
     * @return
     */
    private static int getNetworkType(Context context) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager == null ? null : connectivityManager.getActiveNetworkInfo();
        return networkInfo == null ? -1 : networkInfo.getType();
    }

    /**
     * Get network type name
     *
     * @param context
     * @return
     */
    public static String getNetworkTypeName(Context context) {
        ConnectivityManager manager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo;
        String type = NETWORK_TYPE_DISCONNECT;
        if (manager == null || (networkInfo = manager.getActiveNetworkInfo()) == null) {
            return type;
        }
        ;

        if (networkInfo.isConnected()) {
            String typeName = networkInfo.getTypeName();
            if ("WIFI".equalsIgnoreCase(typeName)) {
                type = NETWORK_TYPE_WIFI;
            } else if ("MOBILE".equalsIgnoreCase(typeName)) {
                String proxyHost = android.net.Proxy.getDefaultHost();
                type = TextUtils.isEmpty(proxyHost) ? (is4GNetwork(context) ? NETWORK_TYPE_4G : isFastMobileNetwork(context) ? NETWORK_TYPE_3G : NETWORK_TYPE_2G)
                        : NETWORK_TYPE_WAP;
            } else {
                type = NETWORK_TYPE_UNKNOWN;
            }
        }
        return type;
    }

    /**
     * Whether is fast mobile network
     *
     * @param context
     * @return
     */
    private static boolean isFastMobileNetwork(Context context) {
        TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        if (telephonyManager == null) {
            return false;
        }

        switch (telephonyManager.getNetworkType()) {
            case TelephonyManager.NETWORK_TYPE_1xRTT:
                return false;
            case TelephonyManager.NETWORK_TYPE_CDMA:
                return false;
            case TelephonyManager.NETWORK_TYPE_EDGE:
                return false;
            case TelephonyManager.NETWORK_TYPE_EVDO_0:
                return true;
            case TelephonyManager.NETWORK_TYPE_EVDO_A:
                return true;
            case TelephonyManager.NETWORK_TYPE_GPRS:
                return false;
            case TelephonyManager.NETWORK_TYPE_HSDPA:
                return true;
            case TelephonyManager.NETWORK_TYPE_HSPA:
                return true;
            case TelephonyManager.NETWORK_TYPE_HSUPA:
                return true;
            case TelephonyManager.NETWORK_TYPE_UMTS:
                return true;
            case TelephonyManager.NETWORK_TYPE_EHRPD:
                return true;
            case TelephonyManager.NETWORK_TYPE_EVDO_B:
                return true;
            case TelephonyManager.NETWORK_TYPE_HSPAP:
                return true;
            case TelephonyManager.NETWORK_TYPE_IDEN:
                return false;
            case TelephonyManager.NETWORK_TYPE_LTE:
                return true;
            case TelephonyManager.NETWORK_TYPE_UNKNOWN:
                return false;
            default:
                return false;
        }
    }

    /**
     * 是否是4g
     * <p>
     * 4G LTE
     * 3G 联通的3G为HSDPA或HSDPAP 电信的3G为EVDO 移动3G为UMTS
     * 2G 移动和联通的2G为GPRS或EGDE 电信的2G为CDMA
     *
     * @param context
     * @return
     */
    private static boolean is4GNetwork(Context context) {
        TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        if (telephonyManager == null) {
            return false;
        }

        switch (telephonyManager.getNetworkType()) {
            case TelephonyManager.NETWORK_TYPE_LTE:
                return true;
            default:
                return false;
        }
    }

    public static String getMacID(Context context) {
        String Mac = "";

        WifiManager wifi = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifi.getConnectionInfo();
        Mac = info.getMacAddress();

        if (Mac == null || Mac.length() == 0) {
            Log.e("java", "获取android mac地址失败");
            try {

                String path = "sys/class/net/wlan0/address";
                if ((new File(path)).exists()) {
                    FileInputStream fis = new FileInputStream(path);
                    byte[] buffer = new byte[8192];
                    int byteCount = fis.read(buffer);
                    if (byteCount > 0) {
                        Mac = new String(buffer, 0, byteCount, "utf-8");
                    }
                }
                Log.v("mac***wifi**mac11**", "" + Mac);
                if (Mac == null || Mac.length() == 0) {
                    path = "sys/class/net/eth0/address";
                    FileInputStream fis_name = new FileInputStream(path);
                    byte[] buffer_name = new byte[8192];
                    int byteCount_name = fis_name.read(buffer_name);
                    if (byteCount_name > 0) {
                        Mac = new String(buffer_name, 0, byteCount_name,
                                "utf-8");
                    }
                }
                Log.v("mac***eth0**mac11**", "" + Mac);

                if (Mac.length() == 0 || Mac == null) {
                    return "";
                }
            } catch (Exception io) {
                Log.v("mac**exception*", "" + io.toString());
                Log.i("solo", "1111111111111");
                return "00:00:00:00:00:00";
            }
        }
        return Mac;

    }

}

