import {InputManager} from "../helpers/InputManager";
import {ShaderManager} from "../shaders/ShaderManager";
import {BaseController} from "../controllers/BaseController";
import { IItem } from "../services/itemsService";

export abstract class BaseEntity {
    private _destroyables: any[] = [];
    
    constructor(protected _scene: Phaser.Scene,
                protected _input: InputManager,
                protected _shaderManager: ShaderManager,
                protected _params: IEntityParameters,
                protected _controller: BaseController) {
        this.init();
    }
    
    abstract init(): void;
    abstract update(): void;
    
    protected add(d: any): any {
        this._destroyables.push(d);
        return d;
    }

    protected destroySingle(d: any): void {
        this._destroyables = this._destroyables.filter(d2 => d2 != d);
        d.destroy();
    }
    
    destroy(): void {
        for (let d of this._destroyables)  {
            d.destroy();
        }
    }
}

export interface IEntityParameters {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    items?: IItem[];
}