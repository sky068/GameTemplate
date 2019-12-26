/**
 * Created by skyxu on 2019/11/27.
 *
 * 炮塔属性信息
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/turretAttrData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.dataLen = data.length;
        this.dataObj = Utils.arrayToDict(this.dataObj, "id");
    },

    /**
     * 获取知道id的炮塔属性信息（unlockLevel,evolutionTarget, attackRange, autoAttackRange...）
     * @param id
     * @returns {*}
     */
    getTurretAttr(id) {
        let data = this.dataObj[id];
        return data;
    }
});