/**
 * Created by skyxu on 2019/11/27.
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/hpUpData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
    },

    getHP(level) {
        let data = this.dataObj[level];
        let gold = data["hp"];
        return gold;
    },

    getPrice(level) {
        let data = this.dataObj[level];
        let price = data["price"];
        return price;
    },

    getMaxLevel() {
        return this.dataLen;
    }
});