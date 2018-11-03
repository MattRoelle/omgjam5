import {BaseController, ControllerArgs} from "./BaseController";
import MathHelpers from "../helpers/MathHelpers";
import {Racer } from "../entities/Racer";
import { BaseEntity } from "../entities/BaseEntity";
import { Jump1 } from "../entities/Jump1";
import { Platform1 } from "../entities/Platform1";

const USE_RT = true;

export class PlayController extends BaseController {
    public map: Phaser.Tilemaps.Tilemap;
    public layer: Phaser.Tilemaps.StaticTilemapLayer;
    private _dbg: Phaser.GameObjects.Graphics;
    private _ground: Phaser.GameObjects.TileSprite;

    private _rt: Phaser.GameObjects.RenderTexture;
    private _racers: Racer[];

    private _obstacles: BaseEntity[];

    private _tileSprite: Phaser.GameObjects.TileSprite;
    private _startingTower: Phaser.GameObjects.Sprite;
    private _startingTowerClose: Phaser.GameObjects.Sprite;
    private _bg1: Phaser.GameObjects.TileSprite;
    private _bg2: Phaser.GameObjects.TileSprite;
    private _bg3: Phaser.GameObjects.TileSprite;
    private _finish: Phaser.GameObjects.Sprite;
    
    init(): void {
        this._bg1 = this._scene.add.tileSprite(0, -100, 800, 600, "bg1");
        this._bg1.setOrigin(0, 0);

        this._bg3 = this._scene.add.tileSprite(0, 0, 800, 600, "bg3");
        this._bg3.setOrigin(0, 0);

        this._bg2 = this._scene.add.tileSprite(0, 0, 800, 600, "bg2");
        this._bg2.setOrigin(0, 0);

        this._startingTower = this._scene.add.sprite(-240, -170, "starting");
        this._startingTower.setOrigin(0, 0);

        this._startingTowerClose = this._scene.add.sprite(-232, -170, "starting_close");
        this._startingTowerClose.setOrigin(0, 0);
        this._startingTowerClose.setVisible(false);

        this._tileSprite = this._scene.add.tileSprite(-1000, 200, 2000, 400, "terrain1");
        this._tileSprite.setOrigin(0, 0);

        const floorRect = this._scene.matter.add.rectangle(0, 300, 100000, 200, { isStatic: true });

        this._racers = [
            this.create<Racer>(Racer, { x: -205, y: 140 }),
            this.create<Racer>(Racer, { x: -205, y: 70 }),
        ];

        this._racers[0].isPlayer = true;
        this._racers[1].speed = 0.002;
        this._racers[1].jumpDelay = 1000;

        this._matter.world.setGravity(0, 0);

        const _this = this;
        setTimeout(() => {
            _this._startingTowerClose.alpha = 0;
            _this._matter.world.setGravity(0.5, 1);
            this._racers[0].sprite.setVelocityX(5);
            this._racers[1].sprite.setVelocityX(3);
            for(let r of this._racers) {
                r.active = true;
            }
        }, 2000);

        this._rt = this._scene.add.renderTexture(0, 0, 2000, 2000);
        this._rt.setOrigin(0, 0);
        this._rt.angle = 10;

        this.generate();


        if (USE_RT) {
            this._tileSprite.setVisible(false);
            this._startingTower.setVisible(false);
            this._startingTowerClose.setVisible(false);
            this._finish.setVisible(false);
            for(let r of this._racers) {
                r.sprite.setVisible(false);
            }
            for(let o of this._obstacles) {
                (<any>o).sprite.setVisible(false);
            }
            const uiBg = this._scene.add.sprite(800, 0, "uibg");
            uiBg.setOrigin(1, 0);
        } else {
            this._scene.cameras.main.startFollow(this._racers[0].sprite);
        }
    }

    generate(): void {
        this._obstacles = [];
        const nObstacles = 3;
        const offset = 500;

        for(let i = 0; i < nObstacles; i++) {
            const r = Math.random();
            const x = (i*600) + 200 + offset;

            if (r < 0.5) {
                this._obstacles.push(this.create(Jump1, {
                    x: x
                }));
            } else {
                this._obstacles.push(this.create(Platform1, {
                    x: x
                }));
            }
        }

        this._finish = this._scene.add.sprite((nObstacles + 1)*600 + 200 + offset, 106, "finish");
    }

    finish(): void {
        this._scene.add.tween({
            targets: this._rt,
            angle: 0,
            duration: 1000,
            ease: 'Power2',
        });
    }
    
    destroy(): void {
        super.destroy();
    }
    
    adjDraw(spr: any, x: number, y: number) {
        this._rt.draw(spr, x + spr.x, y + spr.y);
    }

    update(): void {
        super.update();

        const ps = this._racers[0];

        this._tileSprite.x = ps.sprite.x - 800;
        this._tileSprite.tilePositionX += (<any>ps.sprite.body).velocity.x;
        this._bg1.tilePositionX += (<any>ps.sprite.body).velocity.x*0.2;
        this._bg2.tilePositionX += (<any>ps.sprite.body).velocity.x*0.8;
        this._bg3.tilePositionX += (<any>ps.sprite.body).velocity.x*0.5;


        this._rt.clear();

        const x = 400 - ps.sprite.x;
        const y = 250 - ps.sprite.y;

        const boundAdj = this.adjDraw.bind(this);
        if (USE_RT) {
            this.adjDraw(this._tileSprite, x, y);
            this.adjDraw(this._startingTower, x, y);
            this.adjDraw(this._startingTowerClose, x, y);
            this.adjDraw(this._finish, x, y);
            for(let r of this._racers) {
                r.draw(boundAdj, x, y);
            }
            for(let o of this._obstacles) {
                (<any>o).draw(boundAdj, x, y);
            }
        }

        if (this._input.up.isDown) {
            this._racers[0].jump();
        }

        for(let r of this._racers) {
            if (r.sprite.x > this._finish.x + 10) {
                r.finishT = this._scene.time.now;
                if (r.isPlayer) {
                    this.finish();
                }
            }
        }
    }
}