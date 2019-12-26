/**
 * Created by skyxu on 2019/11/26.
 *
 * 炮塔升级价格
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/turretPriceData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.len = this.dataObj.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
    },

    getTurretUpdatePrice(level) {
        let data = this.dataObj[level];
        let price = data["price"];
        return price;
    },

    getTurretMaxLevel() {
        return this.len || 0;
    }
});