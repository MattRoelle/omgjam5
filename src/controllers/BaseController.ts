import {BaseEntity, IEntityParameters} from "../entities/BaseEntity";
import {InputManager} from "../helpers/InputManager";
import {ShaderManager} from "../shaders/ShaderManager";
import { EffectHelper } from "../helpers/EffectHelper";

export abstract class BaseController {
    private _entities: BaseEntity[] = [];
    protected _input: InputManager;
    public effects: EffectHelper;
    
    constructor(protected _args: ControllerArgs,
                protected _scene: Phaser.Scene,
                protected _shaderManager: ShaderManager,
                protected _matter: Phaser.Physics.Matter.MatterPhysics) {
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

    update(): void {
        for (let e of this._entities)  {
            e.update();
        }
    }
    
    destroy() {
        for (let e of this._entities)  {
            e.destroy();
        }
    }
}


export interface ControllerArgs {
}