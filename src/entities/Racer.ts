import {BaseEntity, IEntityParameters} from "./BaseEntity";

export class Racer extends BaseEntity {
    public sprite: Phaser.Physics.Matter.Image;
    public speed: number = 0.001;
    public active: boolean = false;
    public finishT: number = 0;
    public isPlayer: boolean = false;
    public jumpDelay: number = 750;

    private _lastJumpAt: number = -1000;
    
    init(): void {
        this.sprite = this.add(this._scene.matter.add.image(this._params.x,  this._params.y,  "rock1"));
        this.sprite.setCircle(26, {});
        this.sprite.setBounce(0.9);
        this.sprite.setMass(5);
        this.sprite.setFrictionAir(0.02);
        //this.sprite.setVisible(false);
    }

    draw(cb: any, x: number, y: number) {
        cb(this.sprite, x, y);
    }

    jump() {
        const t = this._scene.time.now;
        if (t - this._lastJumpAt > this.jumpDelay && this.active && this.sprite.y > 170) {
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
                }
            } else {
                this.sprite.setVelocity(0, 0);
                this.sprite.setCollidesWith(null);
                this.sprite.setIgnoreGravity(true);
            }
        }
    }
}