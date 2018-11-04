import {BaseEntity, IEntityParameters} from "./BaseEntity";
import {itemService, IItem} from "../services/itemsService";

export class Racer extends BaseEntity {
    public sprite: Phaser.Physics.Matter.Image;
    public speed: number;
    public active: boolean = false;
    public finishT: number = 0;
    public isPlayer: boolean = false;
    public jumpDelay: number = 1500;
    public fuel: number;
    public boostSprite: Phaser.GameObjects.Sprite;
    public boosting: boolean;
    public rocket: number;
    public hasRocket: boolean;

    public lastJumpAt: number = -1000;
    public itemSprites: Phaser.GameObjects.Sprite[];
    
    init(): void {
        this.boostSprite = this.add(this._scene.add.sprite(0, 0, "boost1"));
        this._scene.anims.create({
            key: "boost_anim",
            frames: this._scene.anims.generateFrameNumbers("boost1", {
                start: 0,
                end: 30,
            }),
            frameRate: 60,
            repeat: -1
        });
        this.boostSprite.anims.play("boost_anim");
        this.boostSprite.setScale(2, 2);

        this.rocket = 1;
        this.speed = 0.2;

        if (!!this._params.x) {
            this.sprite = this.add(this._scene.matter.add.image(this._params.x,  this._params.y,  "rock1"));
        } else {
            this.sprite = this.add(this._scene.matter.add.image(0, 0,  "rock1"));
            this.boostSprite.setVisible(false);
        }
        this.sprite.setCircle(26, {});
        this.sprite.setBounce(0.9);
        this.sprite.setMass(5);
        //this.sprite.setVisible(false);

        if (!this._params.x) {
            this.sprite.setStatic(true);
            this.sprite.setIgnoreGravity(true);
        }

        let weight = 10000;
        let bounce = 0.9;
        let af = 0.02;
        this.fuel = 0;

        this.itemSprites = [];
        for(let i of this._params.items.sort((a, b) => b.priority - a.priority)) {
            if (i.replacesBaseSprite) {
                this.sprite.setTexture(i.spriteKey);
            } else if (!!i.spriteKey) {
                let createSprite = true;

                if (!!i.category) {
                    const otherSprite = this.itemSprites.find(s => (<any>s).__item.category == i.category);
                    if (!!otherSprite) {
                        createSprite = false;
                        otherSprite.setTexture(i.spriteKey);
                    }
                }

                if (createSprite) {
                    const spr = this._scene.add.sprite(this.sprite.x, this.sprite.y, i.spriteKey);
                    if (!!i.origin) {
                        spr.setOrigin(i.origin.x, i.origin.y);
                    } else {
                        spr.setOrigin(0.5, 0.5);
                    }
                    (<any>spr).__item = i;
                    this.itemSprites.push(spr);
                    this.add(spr);
                }

                if (i.effect.airFriction) af += i.effect.airFriction; 
                if (i.effect.speed) this.speed += i.effect.speed; 
                if (i.effect.weight) weight += i.effect.weight; 
                if (i.effect.bounce) bounce += i.effect.bounce; 
                if (i.effect.fuel) this.fuel += i.effect.fuel; 
                if (i.effect.rocket) {
                    this.hasRocket = true;
                    this.rocket += i.effect.rocket; 
                }
            }
        }

        this.sprite.setFrictionAir(af);
        this.sprite.setMass(weight);

        this.sprite.setBounce(bounce);
    }

    draw(cb: any, x: number, y: number) {
        cb(this.sprite, x, y);
        for(let i of this.itemSprites) {
            cb(i, x, y);
        }
        cb(this.boostSprite, x, y);
    }

    jump() {
        const t = this._scene.time.now;
        if (t - this.lastJumpAt > this.jumpDelay && this.active) {
            this.lastJumpAt = t;
            this.sprite.setVelocityY(-9);
        }
    }

    update(): void {
        if (this.active) {
            if (!this.isPlayer) {
                this.move(1);
                if (this.sprite.y > 160) {
                    this.jump();
                    this.boosting = false;
                } else {
                    this.boosting = true;
                }
            } else {
            }
        }

        if (this.boosting && this.hasRocket) {
            this.fuel -= 0.5;
        }
        this.boostSprite.alpha = (this.boosting && this.hasRocket && this.fuel > 0) ? 1 : 0;

        for(let i of this.itemSprites) {
            const itm: IItem = (<any>i).__item;
            i.x = this.sprite.x;
            i.y = this.sprite.y;
            i.setScale(this.sprite.scaleX, this.sprite.scaleY);
            if (!itm.ignoreRotation) {
                i.angle = this.sprite.angle;
            }
        }

        this.boostSprite.x = this.sprite.x - 21;
        this.boostSprite.y = this.sprite.y + 12;
    }

    previewUpdate() {
        this.sprite.angle += 0.5;
        for(let i of this.itemSprites) {
            const itm: IItem = (<any>i).__item;
            i.x = this.sprite.x;
            i.y = this.sprite.y;
            i.setScale(this.sprite.scaleX, this.sprite.scaleY);
            if (!itm.ignoreRotation) {
                i.angle = this.sprite.angle;
            }
        }
    }

    move(dx: number) {
        if (!this.active) return;

        let scale = 1;
        if (this.boosting && this.hasRocket && this.fuel > 0) {
            scale = this.rocket;
        }

        this.sprite.setVelocityX((<any>this.sprite.body).velocity.x + (this.speed*dx)*scale);
    }
}