import {BaseController, ControllerArgs} from "./BaseController";
import { StoreController} from "./StoreController";
import MathHelpers from "../helpers/MathHelpers";
import {Racer } from "../entities/Racer";
import { BaseEntity } from "../entities/BaseEntity";
import { Jump1 } from "../entities/Jump1";
import { Platform1 } from "../entities/Platform1";
import { Platform2 } from "../entities/Platform2";
import careerService from "../services/careerService";
import { Spinner } from "../entities/Spinner";
import { itemService } from "../services/itemsService";
import getOpponent from "../services/opponentService";
import { RaceFinishController } from "./RaceFinishController";
import raceFinishService from "../services/raceFinishService";
import { Platform3 } from "../entities/Platform3";
import { Spinner2 } from "../entities/Spinner2";

const USE_RT = true;

export class PlayController extends BaseController {
    public map: Phaser.Tilemaps.Tilemap;
    public layer: Phaser.Tilemaps.StaticTilemapLayer;
    private _dbg: Phaser.GameObjects.Graphics;
    private _ground: Phaser.GameObjects.TileSprite;
    private _finishes = 0;
    private _playerFinish = 0;

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
    private _finished: boolean = false;
    private _speedText: Phaser.GameObjects.Text;
    private _jumpBar: Phaser.GameObjects.Sprite;
    private _fuelBar: Phaser.GameObjects.Sprite;
    
    init(): void {
        this._bg1 = this._scene.add.tileSprite(0, -100, 800, 600, "bg1");
        this._bg1.setOrigin(0, 0);
        this.addD(this._bg1);

        this._bg3 = this._scene.add.tileSprite(0, 0, 800, 600, "bg3");
        this._bg3.setOrigin(0, 0);
        this.addD(this._bg3);

        this._bg2 = this._scene.add.tileSprite(0, 0, 800, 600, "bg2");
        this._bg2.setOrigin(0, 0);
        this.addD(this._bg2);

        this._startingTower = this._scene.add.sprite(-240, -170, "starting");
        this._startingTower.setOrigin(0, 0);
        this.addD(this._startingTower);

        this._startingTowerClose = this._scene.add.sprite(-232, -170, "starting_close");
        this._startingTowerClose.setOrigin(0, 0);
        this._startingTowerClose.setVisible(false);
        this.addD(this._startingTowerClose);

        this._tileSprite = this._scene.add.tileSprite(-1000, 200, 2000, 400, "terrain1");
        this._tileSprite.setOrigin(0, 0);
        this.addD(this._tileSprite);

        const floorRect = this._scene.matter.add.rectangle(0, 300, 100000, 200, { isStatic: true });
        //this.addD(floorRect);

        const adjDifficulty = careerService.nRaces - 1;

        this._racers = [
            this.create<Racer>(Racer, { x: -205, y: 140, items: careerService.ownedItems }),
            this.create<Racer>(Racer, { x: -205, y: 70, items: getOpponent(adjDifficulty + 2) }),
            this.create<Racer>(Racer, { x: -205, y: 0, items: getOpponent(adjDifficulty + 4) }),
        ];

        this._racers[0].isPlayer = true;
        this._racers[1].jumpDelay = 3000;

        this._matter.world.setGravity(0, 0);

        const _this = this;

        this._rt = this._scene.add.renderTexture(0, 0, 2000, 2000);
        this._rt.setOrigin(0, 0);
        this._rt.angle = 10;
        this.addD(this._rt);

        this.generate();

        const uiBg = this._scene.add.sprite(800, 600, "uibg");
        uiBg.setOrigin(1, 1);
        this.addD(uiBg);

        this._jumpBar = this._scene.add.sprite(800, 600, "jumpbar")
        this._jumpBar.setOrigin(1, 1);
        this._jumpBar.setCrop(0, 126, 800, 600);
        this.addD(this._jumpBar);

        this._fuelBar = this._scene.add.sprite(800, 600, "fuelbar")
        this._fuelBar.setOrigin(1, 1);
        this._fuelBar.setCrop(0, 126, 800, 600);
        this.addD(this._fuelBar);

        this._speedText = this._scene.add.text(780, 560, "00", {
            fontFamily: "ARCADECLASSIC",
            fontSize: 72,
            color: "#FFFFFF",
            align: "right",
            antialias: false
        });
        this._speedText.setStroke("#000000", 4);
        this._speedText.setOrigin(1, 1);

        if (USE_RT) {
            this._tileSprite.setVisible(false);
            this._startingTower.setVisible(false);
            this._startingTowerClose.setVisible(false);
            this._finish.setVisible(false);
            for(let r of this._racers) {
                r.sprite.setVisible(false);
                r.boostSprite.setVisible(false);
                for(let is of r.itemSprites) {
                    is.setVisible(false);
                }
            }
            for(let o of this._obstacles) {
                (<any>o).sprite.setVisible(false);
            }
        } else {
            this._scene.cameras.main.startFollow(this._racers[0].sprite);
        }

        const countdown = this.addD(this._scene.add.sprite(400, 300, "321"));
        this._scene.anims.create({
            key: "countdown_anim",
            frames: this._scene.anims.generateFrameNumbers("321", {
                start: 0,
                end: 22,
            }),
            frameRate: 15,
        });
        countdown.alpha = 0;
        setTimeout(() => {
            countdown.alpha = 1;
            countdown.anims.play("countdown_anim");
            setTimeout(() => {
                _this._startingTowerClose.alpha = 0;
                _this._matter.world.setGravity(0.25, 1);
                this._racers[0].sprite.setVelocityX(7);
                this._racers[1].sprite.setVelocityX(5);
                this._racers[2].sprite.setVelocityX(3);
                for(let r of this._racers) {
                    r.active = true;
                }
            }, 1500)
        }, 1500);
    }

    generate(): void {
        const obstacles = [
            Jump1,
            Platform1,
            Platform2,
            Platform3,
            Spinner,
            Spinner2
        ];

        this._obstacles = [];
        let nObstacles = 6 + Math.floor(careerService.nRaces*1.25) + Math.floor(Math.random()*3);

        nObstacles = Math.min(18, nObstacles);
        const offset = 500;

        for(let i = 0; i < nObstacles; i++) {
            const r = Math.random();
            const x = (i*600) + 200 + offset;
            const c = obstacles[Math.floor(Math.random()*obstacles.length)];

            this._obstacles.push(this.create(c, {
                x: x
            }));
        }

        this._finish = this._scene.add.sprite((nObstacles + 1)*600 + 200 + offset, 106, "finish");
    }

    finish(): void {
        if (this._finished) return;
        this._finished = true;

        const _this = this;

        const g = this._scene.add.graphics();
        g.alpha = 0;
        g.fillStyle(0x000000, 1);
        g.fillRect(0, 0, 800, 600);
        this.addD(g);

        this._scene.add.tween({
            targets: g,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });

        setTimeout(() => {
            careerService.nRaces++;
            raceFinishService.placement = this._playerFinish;
            raceFinishService.earnings = (50 + Math.floor(Math.random()*8) +(careerService.nRaces*10))*(4 - this._playerFinish);
            if (careerService.nRaces > 4) raceFinishService.earnings += 30;
            if (careerService.nRaces > 8) raceFinishService.earnings += 30;
            careerService.money += raceFinishService.earnings;
            _this._game.switchController(RaceFinishController);
        }, 1000);
    }
    
    destroy(): void {
        super.destroy();
    }
    
    adjDraw(spr: any, x: number, y: number) {
        this._rt.draw(spr, x + spr.x, y + spr.y);
    }

    update(): void {
        if (this.destroyed) return;

        super.update();

        const ps = this._racers[0];

        this._tileSprite.x = ps.sprite.x - 800;
        this._tileSprite.tilePositionX += (<any>ps.sprite.body).velocity.x;
        this._bg1.tilePositionX += (<any>ps.sprite.body).velocity.x*0.2;
        this._bg2.tilePositionX += (<any>ps.sprite.body).velocity.x*0.8;
        this._bg3.tilePositionX += (<any>ps.sprite.body).velocity.x*0.5;


        this._rt.clear();

        let shakeX = 0;
        let shakeY = 0;

        const player = this._racers[0];

        if (player.boosting && player.hasRocket && player.fuel > 0) {
            shakeX = (Math.random()*8) - 4;
            shakeY = (Math.random()*8) - 4;
        }

        const x = 300 - ps.sprite.x + shakeX;
        const y = 270 - ps.sprite.y + shakeY;

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
            player.jump();
        }

        if (this._input.right.isDown) {
            player.move(1);
        }

        if (this._input.left.isDown) {
            player.move(-1);
        }

        player.boosting = this._input.space.isDown;

        this._speedText.text = Math.floor((<any>player.sprite).body.velocity.x*5).toString();

        for(let r of this._racers) {
            if (r.sprite.x > this._finish.x + 10) {
                if (!r.finishT) {
                    r.finishT = this._scene.time.now;
                    this._finishes++;
                    if (r.isPlayer) {
                        this._playerFinish = this._finishes;
                        this.finish();
                        return;
                    }
                }
            }
        }

        // 126
        // 244
        const t = this._scene.time.now;
        const jt = Math.min(1, (t - player.lastJumpAt)/player.jumpDelay);
        this._jumpBar.setCrop(0, 244 - (jt*(244 - 126)), 800, 600);

        const ft = Math.min(1, player.fuel/100);
        this._fuelBar.setCrop(0, 244 - (ft*(244 - 126)), 800, 600);
    }
}