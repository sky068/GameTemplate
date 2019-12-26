/**
 *
 *
 * 关卡属性信息
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/levelsData";
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
     * 获取知道id的关卡属性信息（wave, hp, number, gold , multiple...）
     * @param id
     * @returns {*}
     */
    getLevelsDatar(id) {
        let data = this.dataObj[id];
        return data;
    },

    /**
     * 获取总长度（ 总关卡数）
     *
     *
     */
    getLevelsTotalNum() {
        return this.dataLen;
    },

    getLevelCoins(level) {
        if (level >= this.dataLen - 1) {
            level = this.dataLen - 1;
        }
        let id = level + 10000;
        let data = this.dataObj[id];
        return data["gold"];
    }
});