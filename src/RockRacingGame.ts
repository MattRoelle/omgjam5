import {BaseController, ControllerArgs} from "./controllers/BaseController";
import {PlayController} from "./controllers/PlayController";
import {Loader} from "./Loader";
import {ShaderManager} from "./shaders/ShaderManager";
import MathHelpers from "./helpers/MathHelpers";

export class RockRacingGame {
    private _game: Phaser.Game;
    private _scene: Phaser.Scene;
    private _matter: Phaser.Physics.Matter.MatterPhysics;
    private _controller: BaseController;
    private _shaderManager: ShaderManager;

    constructor() {
        
        const _this = this;
        this._game = new Phaser.Game({
            width: 800,
            height: 600,
            type: Phaser.AUTO,
            render: {
                pixelArt: true
            },
            scene: {
                preload() {
                    _this._scene = this;
                    (<any>window).scene = this;
                    _this.preload();
                },
                create() {
                    _this._matter = this.matter;
                    _this.create();
                },
                update() {
                    _this.update();
                }
            },
            physics: {
                default: "matter",
                matter: {
                    //debug: true
                }
            },
        });

        (<any>window).game = this._game;
        
        document.addEventListener("keydown", ev => {
            if (ev.which === 70)  {
                (<any>_this._game.canvas)[_this._game.device.fullscreen.request]();
            }
        });
        
        window.addEventListener("resize", () => {
            if (!!document.webkitFullscreenElement)  {
                const w = window.innerWidth;
                const h = window.innerHeight;

                const aw = w/<number>_this._game.config.width;
                const ah = h/<number>_this._game.config.height;

                const a = Math.min(aw,  ah);

                _this._game.canvas.style["transform"] = `scale(${a}, ${a})`;
            } else {
                _this._game.canvas.style["transform"] = `scale(1, 1)`;
            }
        });
    }

    preload() {
        const loader = new Loader(this._scene);
        loader.load();
    }

    create() {
        this._shaderManager = new ShaderManager(this._game, this._scene);
        this._controller = new PlayController(null, this._scene, this._shaderManager, this._matter);
    }

    update() {
        if (!!this._controller) {
            this._controller.update();
        }
        this._shaderManager.update();
    }
}