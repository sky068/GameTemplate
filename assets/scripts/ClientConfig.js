/**
 * Created by skyxu on 2019/12/17.
 */

window.zy = window.zy || {};

/**
 * !!!重要，渠道id，打包前一定要修改
 * 国外安卓 101, 国外iOS 102, 国内安卓 201, 国内iOS 202
 * @type {number}
 */
window.CHANNEL_ID = 201;

window.DEBUG_OPEN = true;

// 展程数据统计配置
window.ZC_TRACK_API = "https://ad-ucapi.zhanchenggame.com/index.php?";
if (CHANNEL_ID == 101 || CHANNEL_ID == 102) {
    window.ZC_TRACK_CFG = {
        product: 'zgxqbtp',
        ios: {
            appid: '1492246824',
            appkey: '24b0ffbb0f4392230fb7ebdfb0e3e30e',
        },
        android: {
            appid: 'com.zhanyou.towerdefensegame',
            appkey: '0cd1e64c9fa98c20d7216dcc165cb33b',
        },
    };
} else if (CHANNEL_ID == 201 || CHANNEL_ID == 202) {
    window.ZC_TRACK_CFG = {
        product: 'zgxqbtp',
        ios: {
            appid: '1492059932',
            appkey: '24b0ffbb0f4392230fb7ebdfb0e3e30e',
        },
        android: {
            appid: 'com.zhanyou.inland.towerdefensegame',
            appkey: '0cd1e64c9fa98c20d7216dcc165cb33b',
        },
    };
}

window.UPLTV_IOS_APPKEY = "e6c55d8be2d0";
window.UPLTV_ANDROID_APPKEY = "889576bfeaf9";

