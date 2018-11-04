import { BaseController } from "./BaseController";
import careerService from "../services/careerService";
import {itemService, IItem} from "../services/itemsService";
import { Racer } from "../entities/Racer";
import { PlayController } from "./PlayController";

export class StoreController extends BaseController {

    private _storeBg: Phaser.GameObjects.Sprite;
    private _moneyText: Phaser.GameObjects.Text;
    private _items: StoreItem[];
    private _descText: Phaser.GameObjects.Text;
    private _priceText: Phaser.GameObjects.Text;
    private _preview: Racer;
    private _buyBtn: Phaser.GameObjects.Sprite;
    private _selItem: IItem;
    private _exitText: Phaser.GameObjects.Text;

    init(): void {
        this._storeBg = this._scene.add.sprite(0, 0, "store");
        this._storeBg.setOrigin(0, 0);
        this._moneyText = this._scene.add.text(755, 18, careerService.money.toString(), {
            fontFamily: "ARCADECLASSIC",
            fontSize: 48,
            color: "#FFFFFF",
            align: "right",
            antialias: false
        });
        this._moneyText.setOrigin(1, 0);

        this._exitText = this._scene.add.text(40, 520, "exit", {
            fontFamily: "ARCADECLASSIC",
            fontSize: 48,
            color: "#FF0000",
            antialias: false
        });
        this._exitText.setOrigin(0, 0);

        this._exitText.setInteractive();
        const _this = this;
        this._exitText.on("pointerdown", () => {
            _this._game.switchController(PlayController);
        });


        this._descText = this._scene.add.text(280, 380, "", {
            fontFamily: "ARCADECLASSIC",
            fontSize: 32,
            color: "#FFFFFF",
            align: "left",
            antialias: false,
            wordWrap: {
                width: 500
            }
        });
        this._descText.setOrigin(0, 0);

        this._priceText = this._scene.add.text(280, 90, "0", {
            fontFamily: "ARCADECLASSIC",
            fontSize: 40,
            color: "#FFFFFF",
            align: "left",
            antialias: false,
            wordWrap: {
                width: 500
            }
        });
        this._priceText.setOrigin(0, 0);

        this._items = [];
        let idx = 0;
        for(let key in itemService.ITEMS) {
            const item = <IItem>(itemService.ITEMS[key]);
            if (careerService.ownedItems.find(i => i.name == item.name)) continue;
            const storeItem = new StoreItem(this._scene, item, idx, this);
            this._items.push(storeItem);
            idx++;
        }

        this._preview = new Racer(this._scene, this._input, this._shaderManager, {
            items: careerService.ownedItems
        }, this);
        this._preview.sprite.x = 530;
        this._preview.sprite.y = 220;
        this._preview.sprite.setScale(4, 4);

        this._buyBtn = this._scene.add.sprite(620, 320, "buybtn");
        this._buyBtn.setOrigin(0, 0);
        this._buyBtn.setVisible(false);
        this._buyBtn.setInteractive();

        this._buyBtn.on("pointerdown", () => {
            _this.buy();
        });
    }

    buy() {
        if (careerService.money > this._selItem.price) {
            careerService.money -= this._selItem.price;
            careerService.ownedItems.push(this._selItem);
            this._game.switchController(StoreController);
        } else {

        }
    }

    select(item: IItem) {
        this._selItem = item;
        this._buyBtn.setVisible(true);
        this._descText.text = item.description.split("").map(c => c == " " ? "   " : c).join("");
        this._priceText.text = item.price.toString();

        this._preview.destroy();
        this._preview = new Racer(this._scene, this._input, this._shaderManager, {
            items: careerService.ownedItems.concat([item])
        }, this);
        this._preview.sprite.x = 530;
        this._preview.sprite.y = 220;
        this._preview.sprite.setScale(4, 4);
    }

    deselectAll() {
        for(let i of this._items) {
            i.deselect();
        }
    }

    update(): void {
        this._preview.previewUpdate();
    }

    destroy() {
        super.destroy();
        this._preview.destroy();
        this._storeBg.destroy();
        for(let si of this._items) {
            si.destroy();
        }
    }
}

class StoreItem {
    private _sprite: Phaser.GameObjects.Sprite;
    private _text: Phaser.GameObjects.Text;
    private _selected: boolean;
    private _controller: StoreController;

    constructor(scene: Phaser.Scene, public item: IItem, idx: number, controller: StoreController) {
        this._controller = controller;

        const y = 28 + (idx*44);
        this._sprite = scene.add.sprite(34, y, "storeitem");
        this._sprite.setOrigin(0, 0);
        this._text = scene.add.text(40, y + 8, item.name, {
            fontFamily: "ARCADECLASSIC",
            fontSize: 18,
            color: "#FFFFFF",
            align: "left"
        });

        this._sprite.setInteractive();

        const _this = this;
        this._sprite.on("pointerdown", (pointer: any) => {
            _this._controller.deselectAll();
            _this.select();
            _this._controller.select(this.item);
        });
    }
    
    select() {
        this._selected = true;
        this._sprite.setTexture("storeitem_s");
    }

    deselect() {
        this._selected = false;
        this._sprite.setTexture("storeitem");
    }

    destroy() {
        this._sprite.destroy();
        this._text.destroy();
    }
}