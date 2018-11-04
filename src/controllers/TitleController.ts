import { BaseController } from "./BaseController";
import careerService from "../services/careerService";
import {itemService, IItem} from "../services/itemsService";
import { Racer } from "../entities/Racer";
import { PlayController } from "./PlayController";
import raceFinishService from "../services/raceFinishService";
import { StoreController } from "./StoreController";

export class TitleController extends BaseController {
    private _bg: Phaser.GameObjects.Sprite;

    init(): void {
        this._bg = this._scene.add.sprite(0, 0,"title");
        this._bg.setOrigin(0, 0);
        this.addD(this._bg);
    }

    update(): void {
        if (this._input.space.isDown && !this._fadedOut) {
            const _this = this;
            this.fadeOut(() => {
                _this._game.switchController(StoreController);
            });
        }
    }

    destroy() {
        super.destroy();
    }
}