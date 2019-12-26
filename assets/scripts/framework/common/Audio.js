/**
 * Created by skyxu on 2019/12/26.
 */

const BGM = {
    MAIN: "sounds/bgm/main",
};

const Effect = {
    CommonClick: "sounds/effect/common_click",
};

cc.Class({
    statics: {
        BGM: BGM,
        Effect: Effect,

        init () {
            this.curBGMUrl = null;
        },

        playBGM (url, force) {
            if (!zy.dataMng.userData.soundOn) {
                return;
            }

            // 如果已经在播放就不播了
            if (this.curBGMUrl && this.curBGMUrl == url && !force) {
                return;
            }

            if (this.curBGMUrl) {
                this.uncache(this.curBGMUrl);
            }

            this.curBGMUrl = url;

            cc.loader.loadRes(url, cc.AudioClip, (err, clip)=>{
                if (!err) {
                    cc.audioEngine.playMusic(clip, true);
                }
            });
        },

        pauseBGM () {
            cc.audioEngine.pauseMusic();
        },

        resumeBGM () {
            cc.audioEngine.resumeMusic();
        },

        stopBGM () {
            cc.audioEngine.stopMusic();
        },

        playEffect (url, loop=false) {
            if (!zy.dataMng.userData.soundOn) {
                return;
            }

            cc.loader.loadRes(url, cc.AudioClip, (err, clip)=>{
                if (!err) {
                    cc.audioEngine.playEffect(clip, loop);
                }
            });
        },

        pauseAllEffects() {
            cc.audioEngine.pauseAllEffects();
        },

        resumeAllEffects () {
            cc.audioEngine.resumeAllEffects();
        },

        setBGMVolume (v=1) {
            cc.audioEngine.setMusicVolume(v);
        },

        setEffectVolume (v=1) {
            cc.audioEngine.setEffectsVolume(v);
        },

        uncache (url) {
            const audioUrl = cc.url.raw(url);
            cc.audioEngine.uncache(audioUrl);
        },

        uncacheAll () {
            cc.audioEngine.uncacheAll();
        },

        pauseAll () {
            cc.audioEngine.pauseAll();
        },

        resumeAll () {
            cc.audioEngine.resumeAll();
        },

        stopAll () {
            cc.audioEngine.stopAll();
        },

        clean () {
            this.stopAll();
            this.uncacheAll();
            this.curBGMUrl = null;
        }
    }
});