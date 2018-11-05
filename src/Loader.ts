export class Loader {
    constructor(private _scene: Phaser.Scene) {
    }
    
    load(): void {
        this._scene.load.json("shapes", "/assets/physics.json");
        this._scene.load.image("terrain1", "/assets/terrain1.png");
        this._scene.load.image("uibg", "/assets/uibg.png");
        this._scene.load.image("finish", "/assets/finish.png");
        this._scene.load.image("finishtxt", "/assets/finishtxt.png");
        this._scene.load.image("store", "/assets/store.png");
        this._scene.load.image("bg1", "/assets/bg1.png");
        this._scene.load.image("bg2", "/assets/bg2.png");
        this._scene.load.image("bg3", "/assets/bg3.png");
        this._scene.load.image("rock1", "/assets/rock1.png");
        this._scene.load.image("rock2", "/assets/rock2.png");
        this._scene.load.image("rock3", "/assets/rock3.png");
        this._scene.load.image("rock4", "/assets/rock4.png");
        this._scene.load.image("rock5", "/assets/rock5.png");
        this._scene.load.image("starting", "/assets/starting.png");
        this._scene.load.image("starting_close", "/assets/starting_close.png");
        this._scene.load.image("jump1", "/assets/jump1.png");
        this._scene.load.image("platform1", "/assets/platform1.png");
        this._scene.load.image("platform2", "/assets/platform2.png");
        this._scene.load.image("platform3", "/assets/platform3.png");
        this._scene.load.image("storeitem", "/assets/storeitem.png");
        this._scene.load.image("storeitem_s", "/assets/storeitem_s.png");
        this._scene.load.image("jumpmod1", "/assets/jumpmod1.png");
        this._scene.load.image("jumpmod2", "/assets/jumpmod2.png");
        this._scene.load.image("tank1", "/assets/tank1.png");
        this._scene.load.image("tank2", "/assets/tank2.png");
        this._scene.load.image("tank3", "/assets/tank3.png");
        this._scene.load.image("tank4", "/assets/tank4.png");
        this._scene.load.image("bumpers1", "/assets/bumpers1.png");
        this._scene.load.image("buybtn", "/assets/buybtn.png");
        this._scene.load.image("jumpbar", "/assets/jumpbar.png");
        this._scene.load.image("fuelbar", "/assets/fuelbar.png");
        this._scene.load.image("rocket1", "/assets/rocket1.png");
        this._scene.load.image("rocket2", "/assets/rocket2.png");
        this._scene.load.image("rocket3", "/assets/rocket3.png");
        this._scene.load.image("spinner", "/assets/spinner.png");
        this._scene.load.image("finishbg", "/assets/finishbg.png");
        this._scene.load.image("finishfg", "/assets/finishfg.png");
        this._scene.load.image("splashbg", "/assets/splashbg.png");
        this._scene.load.image("splashfg", "/assets/splashfg.png");
        this._scene.load.image("title", "/assets/title.png");
        this._scene.load.spritesheet("boost1", "/assets/boost.png", {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 30
        });
        this._scene.load.spritesheet("321", "/assets/321.png", {
            frameWidth: 181,
            frameHeight: 181,
            endFrame: 22
        });


        this._scene.load.audio("bgm", [
            "/assets/sounds/bgm.mp3",
        ]);

        this._scene.load.audio("chaching", [
            "/assets/sounds/chaching.mp3",
        ]);

        this._scene.load.audio("start1", [
            "/assets/sounds/start1.mp3",
        ]);

        this._scene.load.audio("start2", [
            "/assets/sounds/start2.mp3",
        ]);

        this._scene.load.audio("blip1", [
            "/assets/sounds/blip1.wav",
        ]);

        this._scene.load.audio("blip2", [
            "/assets/sounds/blip2.wav",
        ]);

        this._scene.load.audio("uiselect", [
            "/assets/sounds/uiselect.wav",
        ]);

        this._scene.load.audio("cheering", [
            "/assets/sounds/cheering.mp3",
        ]);

        /*
        this._scene.load.image("tiles", "/assets/tilemap.png");
        this._scene.load.spritesheet("water", "/assets/water.png", {
            frameWidth: 40,
            frameHeight: 40,
            endFrame: 6
        });
        */
    }
}