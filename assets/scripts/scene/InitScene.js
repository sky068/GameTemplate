/**
 * Created by skyxu on 2019/11/26.
 *
 * 初始化场景，处理游戏初始化等事务
 */
cc.Class({
    extends: cc.Component,
    properties: {
        logoAni: sp.Skeleton,
    },

    onLoad() {
        /**
         * 更新包之后，删除热更新目录和记录
         */
        // 语言
        // zc.language = 'cn';
        // if (cc.sys.isNative) {
        //     let baseLocalVersion = cc.sys.localStorage.getItem('BASE_LOCAL_VERSION');
        //     // 写本地版本记录
        //     cc.sys.localStorage.setItem('BASE_LOCAL_VERSION', BASE_LOCAL_VERSION);
        //     if (baseLocalVersion != '' && baseLocalVersion != BASE_LOCAL_VERSION) {
        //         // 写热更新版本记录
        //         cc.sys.localStorage.setItem('localVersion' + VERSION_NAME, '');
        //         cc.sys.localStorage.setItem('tableVersion' + VERSION_NAME + zc.language, '');
        //         cc.sys.localStorage.setItem('tableList' + VERSION_NAME + zc.language, '');
        //         // 删除沙盒目录
        //         jsb.fileUtils.removeDirectory(HOT_UPDATE_PATH);
        //         // 重启
        //         cc.game.restart();
        //     } else {
        //         this.init();
        //     }
        // } else {
        //     this.init();
        // }

        cc.debug.setDisplayStats(DEBUG_OPEN); //隐藏左下方测试信息

        this.init();
    },

    start() {
        const PlatformUtils = require("./../framework/platform/PlatformUtils");
        PlatformUtils.rmSplash();
        this.loadComplete = false;
        this.logoAni.setCompleteListener(()=>{
            this.logoAni.setCompleteListener(null);
            this.schedule(this.checkStartGame, 0.1);
        });
        this.logoAni.setAnimation(0, "play1", false);
    },

    checkStartGame(dt) {
        cc.log("===> check start game");
        if (this.loadComplete) {
            this.unschedule(this.checkStartGame);
            zy.director.loadScene("GameScene");
        }
    },

    init() {
        window.i18n = require('./../framework/i18n/i18n');

        // 全局事件管理器
        zy.event = new cc.EventTarget();

        zy.utils = require("./../framework/common/UtilsOther");

        // http代理
        const HttpProxy = require("./../framework/net/HttpProxy");
        zy.httpProxy= new HttpProxy();

        // 固定配置信息
        zy.constData = require("./../data/ConstData");
        zy.constData.init();

        // shader工具
        zy.shaderUtils = require('./../framework/common/ShaderUtils');
        zy.shaderUtils.init();

        // 通用UI工具
        zy.ui = require('./../framework/common/UI');
        zy.ui.init();

        // 红点系统
        zy.cornerMng = require("./../framework/common/CornerMng");
        zy.cornerMng.init([]);

        // 设备信息
        zy.device = require('./../framework/common/Device');
        zy.device.init();

        // 音频管理
        zy.audio = require("./../framework/common/Audio");
        zy.audio.init();

        //--------以下放到最后处理-------
        zy.director = require("./../framework/common/Director");
        zy.director.init();
        zy.director.preloadScene("GameScene");

        // 配置表读取
        const DataMng = require("./../data/DataMng");
        zy.dataMng = new DataMng();
        zy.dataMng.loadDataFromLocalFile((c, t)=>{
            cc.log("load local cfg: %d/%d", c, t);
        }, ()=>{
            // zy.guide = require('./Lib/common/Guide');
            // zy.guide.init({
            //     step: zy.dataMng.userData.guide,
            // });
            this.loadComplete = true;
        });

    },
});




