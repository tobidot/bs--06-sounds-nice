import { KeyboardEvent, KeyboardController, KeyboardHandler, KeyName, assert, MouseController, MouseDownEvent, MouseMoveEvent, MouseUpEvent } from "../../library";
import { Controller } from "../../library/abstract/mvc/Controller";
import { ControllerResponse } from "../../library/abstract/mvc/Response";
import { Vector2D } from "../../library/math";
import { Ball } from "../models/Ball";
import { Brick } from "../models/Brick";
import { GameModel } from "../models/GameModel";
import { Paddle } from "../models/Paddle";

export class GameController implements Controller, KeyboardController, MouseController {

    public constructor(
        public model: GameModel,
    ) {
    }

    /**
     * Start a new game
     */
    public newGame(): ControllerResponse {
        this.model.restart();
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 5; y++) {
                const brick = new Brick(new Vector2D(x * 80 + 40, 150 + y * 25));
                this.model.addEntity(brick);
            }
        }

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 3; y++) {
                const brick = new Brick(new Vector2D(x * 80 + 120, 400 + y * 25));
                this.model.addEntity(brick);
            }
        }
        this.model.addEntity(this.model.paddle = new Paddle(new Vector2D(400, 550)));
        return null;
    }

    /**
     * @returns true if the game is over
     */
    public isGameOver(): boolean {
        return false;
    }

    /**
     * Update the game state
     * @param delta_seconds 
     * @returns 
     */
    public update(delta_seconds: number): ControllerResponse {
        assert(!!this.model.paddle, "No paddle found");
        this.model.update(delta_seconds);
        if (this.model.hasNoBalls() && !this.model.paddle.has_ball) {
            this.model.lives--;
            if (this.model.lives > 0) {
                this.model.paddle.has_ball = true;
            }
        }
        if (this.model.paddle) {
            this.model.paddle.hit_box.center.x = game.mouse.position.x;;
        }
        return null;
    }

    public onKeyUp(event: KeyboardEvent): void {
    }

    public onKeyDown(event: KeyboardEvent): void {
        const kb = window.game.keyboard;
        const is_ctrl_down = kb.getKey(KeyName.Control).is_down;
        if (is_ctrl_down) {
            switch (event.key.name) {
                case KeyName.KeyR:
                    this.newGame();
                    return;
                case KeyName.KeyD:
                    this.model.debug = !this.model.debug;
                    return;
                case KeyName.Enter:
                    window.game.app.requestFullscreen();
                    return;
            }
        }
        if (event.key.name === KeyName.Space && this.model.paddle && this.model.paddle.has_ball) {
            const position = this.model.paddle.hit_box.center.cpy().add(new Vector2D(0, -20));
            const entity = new Ball(position);
            this.model.addEntity(entity);
            this.model.paddle.has_ball = false;
        }
    }

    public onMouseMove?(event: MouseMoveEvent): void;
    public onMouseDown?(event: MouseDownEvent): void;
    public onMouseUp?(event: MouseUpEvent): void;
}