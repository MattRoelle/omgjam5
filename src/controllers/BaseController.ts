import {BaseEntity, IEntityParameters} from "../entities/BaseEntity";
import {InputManager} from "../helpers/InputManager";
import {ShaderManager} from "../shaders/ShaderManager";
import { EffectHelper } from "../helpers/EffectHelper";
import { RockRacingGame } from "../RockRacingGame";

export abstract class BaseController {
    private _entities: BaseEntity[] = [];
    protected _destroyables: any[] = [];
    protected _input: InputManager;
    public effects: EffectHelper;
    public destroyed: boolean = false;
    
    constructor(protected _args: ControllerArgs,
                protected _scene: Phaser.Scene,
                protected _shaderManager: ShaderManager,
                protected _matter: Phaser.Physics.Matter.MatterPhysics,
                protected _game: RockRacingGame) {
        this._input = new InputManager(this._scene);
        this.effects = new EffectHelper(this._scene);
        this.init();
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