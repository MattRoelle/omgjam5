export default {
    init(scene: Phaser.Scene) {
        this.bgm = scene.sound.add("bgm");
        this.chaching = scene.sound.add("chaching");
        this.start1 = scene.sound.add("start1");
        this.start2 = scene.sound.add("start2");
        this.blip1 = scene.sound.add("blip1");
        this.blip2 = scene.sound.add("blip2");
    },

    playBgm() {
        this.bgm.play(null, { 
            loop: true
        });
    },

    pauseBgm() {
        this.bgm.pause();
    },

    playsfx(s: string) {
        switch(s) {
            case "chaching": this.chaching.play(); break;
            case "start": this.start1.play(); break;
            case "start2": this.start2.play(); break;
            case "blip1": this.blip1.play(); break;
            case "blip2": this.blip2.play(); break;
        }
    }
}