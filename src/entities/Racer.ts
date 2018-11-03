import {BaseEntity, IEntityParameters} from "./BaseEntity";
import {itemService, IItem} from "../services/itemsService";

export class Racer extends BaseEntity {
    public sprite: Phaser.Physics.Matter.Image;
    public speed: number = 0.001;
    public active: boolean = false;
    public finishT: number = 0;
    public isPlayer: boolean = false;
    public jumpDelay: number = 1500;

    private _lastJumpAt: number = -1000;
    private _itemSprites: Phaser.GameObjects.Sprite[];
    
    init(): void {
        if (!!this._params.x) {
            this.sprite = this.add(this._scene.matter.add.image(this._params.x,  this._params.y,  "rock1"));
        } else {
            this.sprite = this.add(this._scene.matter.add.image(0, 0,  "rock1"));
        }
        this.sprite.setCircle(26, {});
        this.sprite.setBounce(0.9);
        this.sprite.setMass(5);
        this.sprite.setFrictionAir(0.02);
        //this.sprite.setVisible(false);

        if (!this._params.x) {
            this.sprite.setStatic(true);
            this.sprite.setIgnoreGravity(true);
        }

        let weight = 100;
        this._itemSprites = [];
        for(let i of this._params.items.sort((a, b) => a.priority - b.priority)) {
            if (i.replacesBaseSprite) {
                this.sprite.setTexture(i.spriteKey);
            } else {
                const spr = this._scene.add.sprite(this.sprite.x, this.sprite.y, i.spriteKey);
                if (!!i.origin) {
                    spr.setOrigin(i.origin.x, i.origin.y);
                } else {
                    spr.setOrigin(0.5, 0.5);
                }
                (<any>spr).__item = i;
                this._itemSprites.push(spr);
                this.add(spr);
            }
        }
    }

    draw(cb: any, x: number, y: number) {
        cb(this.sprite, x, y);
    }

    jump() {
        const t = this._scene.time.now;
        if (t - this._lastJumpAt > this.jumpDelay && this.active && this.sprite.y > 120) {
            this._lastJumpAt = t;
            this.sprite.setVelocityY(-9);
        }
    }

    update(): void {
        if (this.active) {
            if (this.finishT == 0) {
                this.sprite.applyForce(new Phaser.Math.Vector2(this.speed, 0));
                if (!this.isPlayer) {
                    if (this.sprite.y > 160) {
                        this.jump();
                    }
                } else {
                    console.log(this.sprite.body)
                }
            } else {
                this.sprite.setVelocity(0, 0);
                this.sprite.setCollidesWith(null);
                this.sprite.setIgnoreGravity(true);
            }
        }
    }

    previewUpdate() {
        this.sprite.angle += 0.5;
        for(let i of this._itemSprites) {
            const itm: IItem = (<any>i).__item;
            i.x = this.sprite.x;
            i.y = this.sprite.y;
            i.setScale(this.sprite.scaleX, this.sprite.scaleY);
            if (!itm.ignoreRotation) {
                i.angle = this.sprite.angle;
            }
            /*
            if (!!itm.offset) {
                i.x += itm.offset.x*this.sprite.scaleX;
                i.y += itm.offset.y*this.sprite.scaleY;
            }
            */
        }
    }
}