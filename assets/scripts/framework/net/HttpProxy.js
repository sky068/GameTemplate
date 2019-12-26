/**
 * Created by skyxu on 2018/7/13.
 */

"use strict";

let GameHttp = require("./GameHttp");
let Md5 = require("./../encrypt/Md5").md5_hex_hmac;
let UtilsCross = require("./../platform/PlatformUtils");

let UCRETRY = 5;  // ucai统计最多重连5次
let LOGINRETRY = 5;  // 登陆重连次数

// let urlroot = "http://192.168.132.71:8080/zc_game?m="; // 内网
// let urlroot = "http://106.75.93.189:8080/zc_game?m="; // 外网

let port = [8010,8011,8012,8015,8016,8017][Math.round(Math.random() * 5)];
let urlroot = "http://mini-game.zhanyougame.com:" + port + "/zc_game?m="; // 外网 8010,8011,8012,8015,8016,8017

let encryptKey = "zygame";

let HttpProxy = cc.Class({
    statics: {
        instance: null,
        getInstance() {
            if (!this.instance) {
                this.instance = new HttpProxy();
            }
            return this.instance;
        }
    },

    // 向展游服务器发送激活信息
    sendDataEventZCUC: function (params, suc, fail) {
        if (!cc.sys.isNative) {
            return;
        }

        // 事件名称
        let eventname = params.eventname;

        let data = {
            appid: "", // 苹果市场id
            product: ZC_TRACK_CFG.product,
            mac: zy.device.mac,    //设备MAC
            idfa: zy.device.idfa,  //设备idfa
            channel: CHANNEL_ID,    //客户端渠道号
            device_name: zy.device.model,  //设备名称
            os_name: zy.device.osName,     //系统名称
            os_version: zy.device.osVersion, //系统版本号
            jailbreak: zy.device.jailbreak,  //是否越狱
            ssid: zy.device.ssid,            //网络环境（WIFI 名称、3G/4G）
            android_id: UtilsCross.getMobilePhoneID(), //zy.device.androidId, //android 设备ID
            advertising_id: zy.device.advertisingId,  //android设备ID
            // level: GameManager.getLevel(),
            // money: GameManager.getPlayerGold(),
            sign: ""
        };

        // 统计激活推广信息
        let appkey = '';
        let httpUrl = '';
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            appkey = ZC_TRACK_CFG.android.appkey;
            data.appid = ZC_TRACK_CFG.android.appid;
            httpUrl = ZC_TRACK_API + 'c=android_track';
        } else {
            appkey = ZC_TRACK_CFG.ios.appkey;
            data.appid = ZC_TRACK_CFG.ios.appid;
            httpUrl = ZC_TRACK_API + 'c=iostrack';
        }

        if (eventname == 'Active') { // 打开应用上报 激活
            httpUrl = httpUrl + '&m=index';
        } else if (eventname == 'Account') { // 注册账号上报  注册
            httpUrl = httpUrl + '&m=reg';
        }

        let md5 = require("./../../Lib/encrypt/Md5").md5_hex;
        let signStr = data.android_id + data.appid + data.channel + data.device_name + data.idfa + data.jailbreak + data.level + data.mac + data.money + data.os_name + data.os_version + data.product + data.ssid + appkey;
        data.sign = md5(signStr);

        cc.log("===> send zcapi: "+ httpUrl);
        cc.log("===> send zcapi: " + "data=" + JSON.stringify(data));
        GameHttp.httpPost(httpUrl, "data=" + JSON.stringify(data), (rep)=>{
            cc.log("===>response:" + rep.getBody());
            if (rep.isOk()){
                cc.log("===>requrest: " + httpUrl + " 成功。");
                if (suc) {
                    suc();
                }
            } else {
                cc.log("===>requrest: " + httpUrl + " 失败。");
                if (fail) {
                    fail();
                }
                if (UCRETRY > 0) {
                    UCRETRY -= 1;
                    // 5秒后重试
                    setTimeout(()=>{
                        this.sendDataEventZCUC({eventname: "Active"});
                    }, 5000);
                }
            }
        });

    },

    /**
     * 登陆游戏
     * @param onSuc
     * @param onFailed
     */
    login(onSuc, onFailed){
        cc.log("===urlroot:" + urlroot);

        let data = {
            energy: 1,  // 次元能量
            // focusingatt: GameManager.getCurrSkillTime(),  // 聚焦协同攻击时间
            // vip: GameManager.getPlayerLevel(),  // vip等级
            otherpassplies: 1,  // 次元关卡通关层数
            // kaleidoscopeatt: GameManager.getCurrSkillTime(),  // 万花筒协同攻击时间
            // salvoatt: GameManager.getCurrSkillTime(),  // 齐射协同攻击时间
            loginday: 1,  // 登陆天数
            diamond: 10,  // 钻石数量
            // gold: GameManager.getPlayerGold(),  // 金币数量
            allautoatt: 10, // 主炮塔自动攻击时间
            normalpassplies: 1,  // 普通通关层数
            cversion: UtilsCross.getAppVersion(),  // 客户端版本号
            healthlevel: zy.dataMng.userData.hpLevel,
            goldrewardlevel: zy.dataMng.userData.freeCoinsLevel,
            // level: GameManager.getLevel(),
            // experience: GameManager.getPlayer_UpgradeprogressNum(), // 升星经验值
            stamina: zy.dataMng.userData.phPower, // 体力值
            channel: CHANNEL_ID,
            macaddress: zy.device.mac,
            idfa: zy.device.idfa,


        };
        let url = urlroot + "user_join_game";
        let failCb = ()=>{
            if (onFailed) {
                onFailed();
            }
            if (LOGINRETRY > 0) {
                LOGINRETRY -= 1;
                setTimeout(()=>{
                    this.login();
                }, 5000);
            }
        };

        this.serverRequest(url, data, onSuc, failCb);
    },

    /**
     * 更新玩家基础信息
     * @param id{Number} 0金币,1钻石,2vip等级,3登录天数,4普通通关层数,5次元能量,6次元关
     * @param value
     * @param onSuc
     * @param onFailed
     */
    updateBase(id, value, onSuc, onFailed) {
        let data = {
            baseinfoid: id,
            value: value,
        };

        let url = urlroot + "base_info_change";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    /**
     * 炮塔更新
     * @param onSuc
     * @param onFailed
     *
     * 炮塔id 0:加特林机枪,1:镭射炮,2:冰枪,3:火舌,4:电磁,5:榴弹炮
     * lock 0:未解锁，1:解锁
     */
    updateTurret(id, level, star, lock, onSuc, onFailed){
        let data = {
            level: level,// 火力等级
            turretid: id, // id
            star: star, // 星
            lock: lock, // 1
        };

        let url = urlroot + "turret_info";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    /**
     * 建筑更新
     * @param onSuc
     * @param onFailed
     *
     * 科技建筑id 0:资源中心,1:科技研究院
     * 是否解锁：0:未解锁，1:解锁
     **/
    updateBuilding(id, lock, onSuc, onFailed) {
        let data = {
            buildingid: id,
            lock: lock,
        };
        let url = urlroot + "building_info";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    /**
     * 宝物信息更新
     * @param onSuc
     * @param onFailed
     */
    updateTreasure(id, lock, onSuc, onFailed) {
        let data = {
            treasureid: id,
            lock: lock,
        };
        let url = urlroot + "treasure_info";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    /**
     * 观看广告
     * @param placeId {string} 广告位
     * @param onSuc
     * @param onFailed
     */
    watchAds(placeId, onSuc, onFailed) {
        let data = {
            adstationid: placeId,
        };
        let url = urlroot + "watch_advertisement";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    /**
     * 点击按钮
     * @param btnId {string} 按钮名字（要唯一）
     * @param onSuc
     * @param onFailed
     */
    clickButton(btnId, onSuc, onFailed) {
        let data = {
            buttonid: btnId,
        };
        let url = urlroot + "click_button";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    getServerTime(onSuc, onFailed) {
        let data = {
        };
        let url = urlroot + "request_unixtime";
        this.serverRequest(url, data, onSuc, onFailed);
    },

    /**
     *
     * @param url
     * @param data
     * @param onSuc
     * @param onFailed
     */
    serverRequest(url, data, onSuc, onFailed){
        cc.log("===>serverRequest: " + typeof data + " | " + JSON.stringify(data));
        data = typeof data == "string" ? data : JSON.stringify(data);
        // 加密校验传输
        let encryptStr = Md5(encryptKey, data);
        let uid = UtilsCross.getMobilePhoneID();
        uid = uid == undefined ? "" : uid;
        cc.log("uid=" + uid);
        let newData = {
            data: JSON.parse(data),
            encrypt: encryptStr,
            roleid: uid,
            token: ""
        };

        newData = JSON.stringify(newData);

        GameHttp.httpPost(url, newData, (rep)=>{
            cc.log("===>response:" + rep.getBody());
            if (rep.isOk()){
                cc.log("===>requrest: " + url + " 成功。");
                if (onSuc){
                    onSuc(JSON.parse(rep.getBody()));
                }
            } else {
                cc.log("===>requrest: " + url + " 失败。");
                if (onFailed){
                    onFailed(rep.getError() || rep.getBody());
                }
            }
        });
    }
});
