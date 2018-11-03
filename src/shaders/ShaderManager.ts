import WebGLRenderer = Phaser.Renderer.WebGL.WebGLRenderer;
import WebGLPipeline = Phaser.Renderer.WebGL.WebGLPipeline;

export class ShaderManager {
    constructor(private _game: Phaser.Game,
                private _scene: Phaser.Scene) {
        const r = <WebGLRenderer>this._game.renderer;
        /*
        this.snake = r.addPipeline("Snake", new SnakePipeline(this._game));
        this.snake.setFloat2("uResolution", <number>this._game.config.width, <number>this._game.config.height);
        */
    }
    
    update() {
    }
}