/**
 *
 *
 * 关卡波数属性信息
 */

let Utils = require("./../framework/common/UtilsOther");
let DataBase = require("./DataBase");

cc.Class({
    extends: DataBase,

    ctor() {
        this.fileDir = "config/levelsEnemyWaveData";
    },

    initData(data) {
        if (!data) {
            return;
        }
        this.dataObj = data;
        this.dataLen = data.length;
        this.getDataObjToArr();
    },

    getDataObjToArr:function () {
        let array = [];
        for (let i = 0; i < this.dataLen; i++) {
            let dataObj = this.dictToArray(this.dataObj[i]);
            array.push(dataObj);
        }
        return array;
    },

    dictToArray:function(dict){
        let array = [];
        for (let key in dict) {
            if (dict.hasOwnProperty(key) && dict[key]) {
                array.push(Number(dict[key]));
            }
        }
        return array;
    },

    /**
     * 获取知道id的关卡波数属性信息（wave, number, hp, rotation , random...）
     * @param id
     * @returns {*}
     */
    getLevelsEnemyWaveDatar(id) {
        let array = [];
        let data = this.getDataObjToArr();
        for (let i = 0; i < data.length; i++) {
            if(id == data[i][0]){
                array.push(data[i]);
            }
        }
        return array;
    },
});