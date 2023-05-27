import { Vector2D } from "../../library/math";
import { PhysicsProxy, Collision } from "../../library/physics/Physics";
import { ASSET_IMAGE_NAMES } from "../base/Assets";
import { Entity } from "./Entity";

export class Paddle extends Entity {
    public has_ball: boolean = true;

    constructor(
        position: Vector2D
    ) {
        const image = window.game.assets.getImage(ASSET_IMAGE_NAMES.PADDLE);
        super(position, image);
        this.physics.static = true;
        this.hit_box.size.set({x:100,y:20});
        this.render_box.size.set({x:100,y:20});
    }

    public increaseSize(): void {
        this.hit_box.size.x += 10;
        this.render_box.size.x += 10;
    }
}