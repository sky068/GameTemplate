/**
 * Created by skyxu on 2019/11/25.
 *
 * 数据管理, 配置数据读取, 保存读取本读数据
 */

let TurretData = require("./TurretData");
let TurretSecondData = require("./TurretSecondData");
let TurretPriceData = require("./TurretPriceData");
let UpStarGotData = require("./UpStarGotData");
let UpStarNeedData = require("./UpStarNeedData");
let CoinsUpData = require("./CoinsUpData");
let HpUpData = require("./HpUpData");
let TurretAttrData = require("./TurretAttrData");
let EnemyAttrData = require("./EnemyAttrData");
let LevelsData = require("./LevelsData");
let LevelsEnemyWaveData = require("./LevelsEnemyWaveData");
let BgColorData = require("./BgColorData");

let UserData = require("./UserData");
let DataBase = require("./DataBase");

cc.Class({
    ctor() {
        this.loadCounts = 0;

        // todo: 每添加新的配置表都需要在这里创建对应的对象
        this.turretData = new TurretData();
        this.turretSecondData = new TurretSecondData();
        this.turretPriceData = new TurretPriceData();
        this.upStarGotData = new UpStarGotData();
        this.upStarNeedData = new UpStarNeedData();
        this.coinsUpData = new CoinsUpData();
        this.hpUpData = new HpUpData();
        this.turretAttrData = new TurretAttrData();
        this.enemyAttrData = new EnemyAttrData();
        this.levelsData = new LevelsData();
        this.levelsEnemyWaveData = new LevelsEnemyWaveData();
        this.bgColorData = new BgColorData();

        // 动态数据
        this.userData = new UserData();
    },

    /**
     * 读取本地配置文件
     * @param progressCb(cur,total) 进度回调
     * @param completeCb{Function} 读取结束回调
     */
    loadDataFromLocalFile(progressCb, completeCb) {
        // 读取本地保存的用户数据
        this.loadSavedData();

        // 读取配置文件数据
        let keys = Object.keys(this);
        cc.log("====keys11: %s", JSON.stringify(keys));
        keys = keys.filter((k)=>{
            return this.hasOwnProperty(k) && (this[k] instanceof DataBase);
        });
        cc.log("====keys22: %s", JSON.stringify(keys));

        for (let key of keys) {
            let obj = this[key];
            let fileName = obj.fileDir;
            cc.loader.loadRes(fileName, cc.JsonAsset, (err, data)=>{
                if (err) {
                    cc.error("load local data: " + fileName + ", error: " + err);
                } else {
                    if (obj.initData) {
                        obj.initData.call(obj, data.json);
                    }
                }

                this.loadCounts ++;
                if (progressCb) {
                    progressCb(this.loadCounts, keys.length);
                }
                if (this.loadCounts >= keys.length) {

                    if (completeCb) {
                        completeCb();
                    }
                }
            });
        }
    },

    // 从localStorage读取数据
    loadSavedData() {
        this.userData.loadData();
    },
    // 保存数据到localStorage
    saveDataToLocal() {
        this.userData.saveData();
    }
});
