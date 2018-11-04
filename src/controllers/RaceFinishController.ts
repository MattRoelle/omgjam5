import { BaseController } from "./BaseController";
import careerService from "../services/careerService";
import {itemService, IItem} from "../services/itemsService";
import { Racer } from "../entities/Racer";
import { PlayController } from "./PlayController";
import raceFinishService from "../services/raceFinishService";
import { StoreController } from "./StoreController";

export class RaceFinishController extends BaseController {
    private _bg: Phaser.GameObjects.TileSprite;
    private _fg: Phaser.GameObjects.Sprite;

    init(): void {
        this._bg = this._scene.add.tileSprite(0, 0, 800, 600, "finishbg");
        this._bg.setOrigin(0, 0);
        this.addD(this._bg);

        this._fg = this._scene.add.sprite(0, 0, "finishfg");
        this._fg.setOrigin(0, 0);
        this.addD(this._fg);

        const placementText = this._scene.add.text(335, 125, raceFinishService.placement.toString(), {
            fontFamily: "ARCADECLASSIC",
            fontSize: 108,
            color: raceFinishService.placement == 1 ? "#11EF11" : raceFinishService.placement == 2 ? "#FF0000" : "#ff0000",
            align: "left",
        });
        placementText.setStroke("#000000", 12);
        this.addD(placementText);

        const earningText = this._scene.add.text(445, 235, raceFinishService.earnings.toString(), {
            fontFamily: "ARCADECLASSIC",
            fontSize: 108,
            color: "#9933ff",
            align: "left",
        });
        earningText.setStroke("#000000", 12);
        this.addD(earningText);
    }

    update(): void {
        this._bg.tilePositionY += 0.5;
        this._bg.tilePositionX += 1;

        if (this._input.space.isDown) {
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