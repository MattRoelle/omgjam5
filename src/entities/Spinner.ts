import {BaseEntity, IEntityParameters} from "./BaseEntity";

export class Spinner extends BaseEntity {
    public sprite: Phaser.Physics.Matter.Image;
    
    init(): void {
        const shapes = this._scene.cache.json.get("shapes");
        this.sprite = this._scene.matter.add.sprite(this._params.x, 130, "spinner", null, { 
            shape: shapes.spinner
        });
        this.sprite.setStatic(true);
        this.add(this.sprite);
    }

    draw(cb: any, x: number, y: number) {
        cb(this.sprite, x, y);
    }

    update(): void {
        this.sprite.setVelocity(0, 0);
        this.sprite.angle += 2;
    }
}