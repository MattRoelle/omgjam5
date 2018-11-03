export class InputManager {
    public up: Phaser.Input.Keyboard.Key;
    public down: Phaser.Input.Keyboard.Key;
    public left: Phaser.Input.Keyboard.Key;
    public right: Phaser.Input.Keyboard.Key;

    public w: Phaser.Input.Keyboard.Key;
    public a: Phaser.Input.Keyboard.Key;
    public s: Phaser.Input.Keyboard.Key;
    public d: Phaser.Input.Keyboard.Key;

    public space: Phaser.Input.Keyboard.Key;
    
    constructor(scene: Phaser.Scene) {
        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.w = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    public get axisY(): number {
        if (this.up.isDown || this.w.isDown) return -1;
        else if (this.down.isDown || this.s.isDown) return 1;
        return 0;
    }

    public get axisX(): number {
        if (this.left.isDown || this.a.isDown) return -1;
        else if (this.right.isDown || this.d.isDown) return 1;
        return 0;
    }
}