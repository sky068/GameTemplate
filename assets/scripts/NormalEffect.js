/**
 * Created by skyxu on 2019/12/3.
 */

cc.Class({
    extends: cc.Component,
    properties: {},

    /**
     * 播放特效
     * @param name{string}
     * @param cb{funciton} 特效播放完毕的回调
     */
    play(name, cb) {
        let ske = this.node.getComponent(sp.Skeleton);
        // ske.setToSetupPose(); // 共享模式下无法使用
        ske.setCompleteListener((trackEntry, t)=>{
            if (cb) {
                cb();
            }
            ske.setCompleteListener(null);
            this.node.angle = 0;
            this.node.scale = 1;
            // zy.nodePoolMng.putNormalEffect(this.node);
            this.node.destroy();
        });

        ske.setAnimation(0, name, true);
    },

    unuse() {

    },

    reuse() {

    }
});