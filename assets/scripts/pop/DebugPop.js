/**
 * Created by skyxu on 2019/12/26.
 */

cc.Class({
    extends: cc.Component,
    properties: {
        normalEffPF: cc.Prefab,
    },

    start () {

    },

    btnCb (sender, name) {
        switch (name) {
            case "d1": {
                zy.ui.alert.show({
                    okText: i18n.t("btn_ok"),
                    cancleText: i18n.t("btn_cancle"),
                    okCb: ()=>{
                        zy.ui.tip.show("ok");
                    },
                    cancleCb: ()=>{
                        zy.ui.tip.show("cancle");
                    },
                    text: "这是单行文本样式",
                });
                break;
            }
            case "d2": {
                zy.ui.alert.show({
                    okText: i18n.t("btn_ok"),
                    okCb: ()=>{
                        zy.ui.tip.show("ok");
                    },
                    cancleCb: ()=>{
                        zy.ui.tip.show("cancle");
                    },
                    text: "这是多行文本显示样式这是多行文本显示样式这是多行文本显示样式这是多行文本显示样式这是多行文本",
                });
                break;
            }
            case "d3": {
                for (let i=0; i<20; i++) {
                    let eff = cc.instantiate(this.normalEffPF);
                    eff.parent = this.node;
                    eff.position = cc.v2(Math.random()*10*50, Math.random()*10*80);
                    eff.getComponent("NormalEffect").play("play2", ()=>{
                        // zy.ui.tip.show("播放完毕");
                    });
                }
                break;
            }
            case "d4": {
                for (let i=0; i<20; i++) {
                    let eff = cc.instantiate(this.normalEffPF);
                    eff.parent = this.node;
                    eff.position = cc.v2(Math.random()*10*50, Math.random()*10*80);
                    eff.getComponent("NormalEffect").play("play3", ()=>{
                        // zy.ui.tip.show("播放完毕");
                    });
                }
                break;
            }
            case "d5": {
                for (let i=0; i<20; i++) {
                    let eff = cc.instantiate(this.normalEffPF);
                    eff.parent = this.node;
                    eff.position = cc.v2(Math.random()*10*50, Math.random()*10*80);
                    eff.getComponent("NormalEffect").play("play5", ()=>{
                        // zy.ui.tip.show("播放完毕");
                    });
                }
                break;
            }
            default:
                break;
        }

        // zy.ui.tip.show(name);
    },

    closeCallback () {
        zy.director.closePop(this.popName);
    }

});