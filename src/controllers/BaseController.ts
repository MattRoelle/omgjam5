import {BaseEntity, IEntityParameters} from "../entities/BaseEntity";
import {InputManager} from "../helpers/InputManager";
import {ShaderManager} from "../shaders/ShaderManager";
import { EffectHelper } from "../helpers/EffectHelper";
import { RockRacingGame } from "../RockRacingGame";

let ignoreFade = false;
export abstract class BaseController {
    private _entities: BaseEntity[] = [];
    protected _destroyables: any[] = [];
    protected _input: InputManager;
    public effects: EffectHelper;
    public destroyed: boolean = false;
    protected _fadedOut: boolean = false;

    private _splashBg: Phaser.GameObjects.Sprite;
    private _splashFg: Phaser.GameObjects.Sprite;
    private boostSprite: Phaser.GameObjects.Sprite;
    
    constructor(protected _args: ControllerArgs,
                protected _scene: Phaser.Scene,
                protected _shaderManager: ShaderManager,
                protected _matter: Phaser.Physics.Matter.MatterPhysics,
                protected _game: RockRacingGame) {
        this._input = new InputManager(this._scene);
        this.effects = new EffectHelper(this._scene);
        this.init();

        this._splashBg = this._scene.add.sprite(0, 0, "splashbg");
        this._splashBg.setOrigin(0, 0);
        this._splashFg = this._scene.add.sprite(440, 200, "rocket1");
        this._splashFg.setOrigin(0.5, 0.5);
        this._splashFg.setScale(8, 8);

        this.boostSprite = this._scene.add.sprite(256, 300, "boost1");
        this._scene.anims.create({
            key: "boost_anim",
            frames: this._scene.anims.generateFrameNumbers("boost1", {
                start: 0,
                end: 30,
            }),
            frameRate: 60,
            repeat: -1
        });
        this.boostSprite.setOrigin(0.5, 0.5);
        this.boostSprite.anims.play("boost_anim");
        this.boostSprite.setScale(12, 12);

        this.boostSprite.alpha = 0;
        this._splashFg.alpha = 0;

        this.addD(this.boostSprite);
        this.addD(this._splashBg);
        this.addD(this._splashFg);

        if (ignoreFade) {
            this._splashBg.y = -1000;
            this._splashFg.y = -1000;
            this.boostSprite.y = -1000;
            ignoreFade = false;
        } else {
            this._scene.add.tween({
                targets: this._splashBg,
                y: 1000,
                duration: 1000,
                ease: 'Power2'
            });

            this._scene.add.tween({
                targets: this._splashFg,
                y: 1000,
                duration: 500,
                ease: 'Power2'
            });

            this._scene.add.tween({
                targets: this.boostSprite,
                y: 1000,
                duration: 500,
                ease: 'Power2'
            });
        }
    }

    ignoreFade() {
        ignoreFade = true;
    }

    fadeOut(cb: any) {
        if (this._fadedOut) return;
        this._fadedOut = true;
        this._scene.add.tween({
            targets: this._splashBg,
            y: 0,
            duration: 500,
            ease: 'Power2'
        });

        this._scene.add.tween({
            targets: this._splashFg,
            y: 200,
            duration: 1000,
            ease: 'Power2'
        });

        this._scene.add.tween({
            targets: this.boostSprite,
            y: 300,
            duration: 1000,
            ease: 'Power2'
        });

        setTimeout(cb, 500);
    }
    
    abstract init(): void;
    
    protected create<T extends BaseEntity>(typ: any, params?: IEntityParameters): T {
        const e: BaseEntity = <BaseEntity>(new typ(this._scene, this._input, this._shaderManager, params, this));
        return <T>this.add(e);
    }
    
    protected add(e: BaseEntity): BaseEntity {
        this._entities.push(e);
        return e;
    }

    protected addD(e: any): any {
        this._destroyables.push(e);
        return e;
    }

    update(): void {
        for (let e of this._entities)  {
            e.update();
        }
    }
    
    destroy(): void {
        if (this.destroyed) return;
        this.destroyed = true;

        for (let e of this._entities)  {
            e.destroy();
        }
        for (let e of this._destroyables)  {
            e.destroy();
        }
    }
}


export interface ControllerArgs {
}