import { GameModel } from "../models/GameModel";
import { View } from "../../library/abstract/mvc/View";
import { Brick } from "../models/Brick";
import { Paddle } from "../models/Paddle";
import { Ball } from "../models/Ball";
import { Vector2D } from "../../library/math";

export class GameView implements View {

    public constructor(
        public context: CanvasRenderingContext2D,
    ) {
        this.resetCanvasState();
    }

    public update(delta_ms: number): void {
        // do nothing
    }

    public render(model: GameModel): void {
        this.resetCanvasState();

        this.context.fillStyle = "#fff";
        model.entities.forEach((entity) => {
            const offset = { x: entity.render_box.w / 2, y: entity.render_box.h / 2 }
            const position = entity.render_box.center.cpy().sub(offset);
            this.context.globalAlpha = 1;
            if (entity instanceof Brick) {
                this.context.globalAlpha = Math.min(1,Math.max(0, Math.sqrt(entity.hp) / Math.sqrt( entity.max_hp)));
            }
            this.context.drawImage(
                entity.image.image,
                position.x, position.y,
                entity.render_box.w, entity.render_box.h
            );

            if (entity instanceof Paddle) {
                if (entity.has_ball) {
                    const ball_position = entity.render_box.center.cpy();
                    const ball = new Ball(ball_position);
                    const ball_offset = { x: 0, y: -entity.render_box.h / 2 - ball.render_box.h / 2 };
                    ball.render_box.center.add(new Vector2D(ball_offset));
                    this.context.drawImage(
                        ball.image.image,
                        ball.render_box.left, ball.render_box.top,
                        ball.render_box.w, ball.render_box.h
                    );
                }
            }
        });
        const heart_image = window.game.assets.getImage("heart");
        for(let i=0; i<model.lives; i++) {
            this.context.globalAlpha = 0.75;
            this.context.drawImage(
                heart_image.image,
                10 + i * 75, 10,
                heart_image.width, heart_image.height
            );
        }
        this.context.globalAlpha = 1;        
        if (model.debug) {
            model.physics.proxies.forEach((proxy) => {
                this.context.strokeStyle = "#f00";
                this.context.strokeRect(
                    proxy.outerBox.x,
                    proxy.outerBox.y,
                    proxy.outerBox.w,
                    proxy.outerBox.h
                );
            });
        }
        if (model.isGameOver()) {
            this.context.fillStyle = "#f00";
            this.context.shadowColor = "#000";
            this.context.fillText("Game Over", 400, 300);
        }
        if (model.isGameWon()) {
            this.context.fillStyle = "#0f0";
            this.context.shadowColor = "#fff";
            this.context.fillText("Game Won", 400, 300);
        }
    }

    /**
     * Reset default canvas state and paint the background
     */
    protected resetCanvasState() {
        const background = window.game.assets.getImage("background");
        if (background.loaded) {
            this.context.drawImage(window.game.assets.getImage("background").image, 0, 0, 800, 600);
        } else {
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, 800, 600);
        }
        this.context.fillStyle = "#fff";
        this.context.font = "46px monospace";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = 'high';
    }
}