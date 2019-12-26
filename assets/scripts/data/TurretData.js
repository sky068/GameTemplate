/**
 * Created by skyxu on 2019/11/25.
 *
 * 炮塔火力数据
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/turretData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
    },

    getTurretDataById(id, type) {
        type = type > 9 ? type : ("0" + type);
        let key = "player" + id + type;
        let data = this.dataObj[key];
        return data;
    },

    getTurretAttack(id, type, level) {
        let data = this.getTurretDataById(id, type);
        let attack = data["level" + level];
        return attack;
    }
});