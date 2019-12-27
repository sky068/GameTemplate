/**
 * Created by skyxu on 2019/12/9.
 */

const PlatformUtils = require("./../framework/platform/PlatformUtils");

cc.Class({
    extends: cc.Component,
    properties: {
        vibNode: cc.Node,
        soundsNode: cc.Node,
        versionLabel: cc.Label,
    },

    init(params) {
        // if (zy.dataMng.userData.vibOn) {
        //     this.vibNode.getComponent(cc.Animation).play("setBtnOn", 10);
        // } else {
        //     this.vibNode.getComponent(cc.Animation).play("setBtnOff", 10);
        // }
        //
        // if (zy.dataMng.userData.soundOn) {
        //     this.soundsNode.getComponent(cc.Animation).play("setBtnOn", 10);
        // } else {
        //     this.soundsNode.getComponent(cc.Animation).play("setBtnOff", 10);
        // }
        //
        // this.versionLabel.string = "v" + MKSystem.getAppVersion() + "  c" + CHANNEL_ID;
    },

    onVibCall() {
        zy.audioMng.playButtonAudio();
        zy.dataMng.userData.vibOn = !zy.dataMng.userData.vibOn;
        if (zy.dataMng.userData.vibOn) {
            this.vibNode.getComponent(cc.Animation).play("setBtnOn", 0);
            let sys = require("./../../Platform/MKSystem");
            sys.vibratorShort();
        } else {
            this.vibNode.getComponent(cc.Animation).play("setBtnOff", 0);
        }
    },

    onSoundsCall() {
        zy.audioMng.playButtonAudio();
        zy.dataMng.userData.soundOn = !zy.dataMng.userData.soundOn;
        if (zy.dataMng.userData.soundOn) {
            this.soundsNode.getComponent(cc.Animation).play("setBtnOn", 0);
            zy.audioMng.resumeAllEffects();
            zy.audioMng.resumeMusic();
        } else {
            this.soundsNode.getComponent(cc.Animation).play("setBtnOff", 0);
            zy.audioMng.pauseAllEffects();
            zy.audioMng.pauseMusic();
        }
    },

    closeCallback() {
        zy.director.closePop(this.popName);
    }
});