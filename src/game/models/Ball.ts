import { Vector2D } from "../../library/math";
import { PhysicsProxy, Collision } from "../../library/physics/Physics";
import { Entity } from "./Entity";

export class Ball extends Entity {
    public no_collision_for_s: number = 0;
    public speed_up_tick :number= 0;

    constructor(
        position: Vector2D
    ) {
        const image = window.game.assets.getImage("ball-blue");
        super(position, image);
        this.physics.static = false;
        this.hit_box.size.mul(0.33);
        this.render_box.size.mul(0.33);
        this.velocity.set({ x: 0, y: -150 });
    }

    public update(delta_seconds: number): void {
        super.update(delta_seconds);
        this.no_collision_for_s += delta_seconds;
        if (this.no_collision_for_s - this.speed_up_tick > 5) {
            this.speed_up_tick++;
            const speed = this.velocity.length();
            this.velocity.normalize().mul(speed + 50);
        }
    }

    public onCollision(other: PhysicsProxy, collision: Collision): void {
        this.no_collision_for_s = 0;
        this.speed_up_tick = 0;
        // steer the ball if it hits the paddle
        if (other.reference === game.model.paddle)     {
            const paddle = other.reference as Entity;
            const paddle_center = paddle.hit_box.center;
            const ball_center = this.hit_box.center;
            const distance = ball_center.cpy().sub(paddle_center);
            const angle = distance.angle();
            const source_angle = this.velocity.angle();
            const speed = this.velocity.length();
            const new_velocity = Vector2D.fromAngle(angle * 0.5 + source_angle * 0.5, speed);
            this.velocity.set(new_velocity);
        }
    }

    public onWorldCollision(distance: Vector2D): void {
        this.no_collision_for_s = 0;
        this.speed_up_tick = 0;
        if (distance.y > 0 && !game.model.isGameWon()) {
            // hit the bottom
            game.model.removeEntity(this);
        }
    }

    public randomizeVelocity(): void {
        const angle = Math.random() * Math.PI * 2;
        const speed = 150;
        this.velocity.x = Math.cos(angle) * speed;
        this.velocity.y = Math.sin(angle) * speed;
    }

}