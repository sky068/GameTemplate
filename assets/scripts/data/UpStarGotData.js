/**
 * Created by skyxu on 2019/11/26.
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/upStarGotData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
    },

    getUpStarGotExp(level) {
        let data = this.dataObj[level];
        let exp = data["evolutionExp"];
        return exp;
    }
});