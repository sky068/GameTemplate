/**
 * Created by skyxu on 2019/11/26.
 *
 * 炮塔每秒火力
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/turretSecondData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "level");
    },

    getTurretSecondAttack(level) {
        let data = this.dataObj[level];
        let attack = data["attack"];
        return attack;
    }
});
