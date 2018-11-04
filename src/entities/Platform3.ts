import {BaseEntity, IEntityParameters} from "./BaseEntity";

export class Platform3 extends BaseEntity {
    public sprite: Phaser.Physics.Matter.Image;
    
    init(): void {
        const shapes = this._scene.cache.json.get("shapes");
        this.sprite = this._scene.matter.add.sprite(this._params.x, 200, "platform3", null, {
            shape: shapes.platform3
        });
        this.sprite.setStatic(true);
        this.add(this.sprite);
    }

    draw(cb: any, x: number, y: number) {
        cb(this.sprite, x, y);
    }

    update(): void {
    }
}