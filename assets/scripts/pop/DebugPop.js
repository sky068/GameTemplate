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
                for (let i=0; i<20; i++) {
                    let eff = cc.instantiate(this.normalEffPF);
                    eff.parent = this.node;
                    eff.position = cc.v2(Math.random()*10*50, Math.random()*10*80);
                    eff.getComponent("NormalEffect").play("play1", ()=>{
                        // zy.ui.tip.show("播放完毕");
                    });
                }
                break;
            }
            case "d2": {
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
            case "d3": {
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
            case "d4": {
                for (let i=0; i<20; i++) {
                    let eff = cc.instantiate(this.normalEffPF);
                    eff.parent = this.node;
                    eff.position = cc.v2(Math.random()*10*50, Math.random()*10*80);
                    eff.getComponent("NormalEffect").play("play4", ()=>{
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