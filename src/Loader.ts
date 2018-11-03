export class Loader {
    constructor(private _scene: Phaser.Scene) {
    }
    
    load(): void {
        this._scene.load.json("shapes", "/assets/physics.json");
        this._scene.load.image("terrain1", "/assets/terrain1.png");
        this._scene.load.image("uibg", "/assets/uibg.png");
        this._scene.load.image("finish", "/assets/finish.png");
        this._scene.load.image("store", "/assets/store.png");
        this._scene.load.image("bg1", "/assets/bg1.png");
        this._scene.load.image("bg2", "/assets/bg2.png");
        this._scene.load.image("bg3", "/assets/bg3.png");
        this._scene.load.image("rock1", "/assets/rock1.png");
        this._scene.load.image("rock2", "/assets/rock2.png");
        this._scene.load.image("starting", "/assets/starting.png");
        this._scene.load.image("starting_close", "/assets/starting_close.png");
        this._scene.load.image("jump1", "/assets/jump1.png");
        this._scene.load.image("platform1", "/assets/platform1.png");
        this._scene.load.image("storeitem", "/assets/storeitem.png");
        this._scene.load.image("storeitem_s", "/assets/storeitem_s.png");
        this._scene.load.image("tank1", "/assets/tank1.png");
        this._scene.load.image("bumpers1", "/assets/bumpers1.png");
        this._scene.load.image("buybtn", "/assets/buybtn.png");

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