import { GameController } from "../controllers/GameController";
import { GameModel } from "../models/GameModel";
import { GameView } from "../views/GameView";
import * as tgt from "../../library/index";
import { registerAssets } from "./Assets";

/**
 * The game class
 */
export class Game {
    public assets: tgt.AssetManager;
    public keyboard: tgt.KeyboardHandler;
    public mouse: tgt.MouseHandler;
    public controller: GameController;
    public view: GameView;
    public model: GameModel;
    public last_time_ms: number = 0;
    public loading: Promise<void> = Promise.resolve();
    public on_game_finished: null | (() => void) = null;

    public constructor(
        public app: HTMLElement
    ) {
        window.game = this;
        const canvas = tgt.getElementByQuerySelector(app, "canvas", HTMLCanvasElement);
        const context = canvas.getContext("2d",  {alpha: false});
        tgt.assertNotNull(context, "No 2d context found");
        this.assets = new tgt.AssetManager();
        registerAssets(this.assets);
        this.loading = this.loading.then(() => this.assets.loadAll(context));
        this.view = new GameView(context);
        this.model = new GameModel(context);
        this.controller = new GameController(this.model);
        this.keyboard = new tgt.KeyboardHandler(app, () => this.controller);
        this.mouse = new tgt.MouseHandler(app, canvas, () => this.controller);
    }

    protected update(delta_ms: number) {
        this.controller.update(delta_ms / 1000);
        this.view.update(delta_ms  / 1000);
        this.view.render(this.model);
    }

    protected onFrame = (timestamp_ms: number) => {
        // limit the delta time to 30 fps
        const delta_ms = Math.min(timestamp_ms - this.last_time_ms, 1000 / 30);
        this.update(delta_ms);
        this.last_time_ms = timestamp_ms;
        if (this.controller.isGameOver()) {
            if (this.on_game_finished) this.on_game_finished();
        } else {
            requestAnimationFrame(this.onFrame);
        }
    }

    /**
     * Initialize the game
     */
    public async init() {
        this.keyboard.init();
        this.mouse.init();
    }

    /**
     * Start the game loop
     * @returns 
     */
    public async run() {
        return this.loading
        .then(() => {
            new Promise<void>((resolve, reject) => {
                this.on_game_finished = resolve;
                this.controller.newGame();
                requestAnimationFrame(this.onFrame);
            })
        });
    }
}