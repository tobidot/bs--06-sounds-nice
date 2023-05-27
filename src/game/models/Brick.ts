import { assert } from "../../library/flow";
import { Vector2D } from "../../library/math";
import { Collision, PhysicsProxy } from "../../library/physics/Physics";
import { ASSET_IMAGE_NAMES } from "../base/Assets";
import { Ball } from "./Ball";
import { Entity } from "./Entity";

export class Brick extends Entity {
    public hp: number = 3;
    public max_hp: number = 3;

    constructor(
        position: Vector2D,
    ) {
        const image = window.game.assets.getImage(ASSET_IMAGE_NAMES.BRICK);
        super(position, image);
        this.physics.static = true;
        this.hit_box.size.set({x:80,y: 25});
        this.render_box.size.set({x:80, y:25});
    }


    /**
     * 
     * @param other 
     */
    public onCollision(other: PhysicsProxy, collision: Collision): void {
        assert(other.reference instanceof Entity)
        // on collision 
        if (other.reference instanceof Ball) {
            this.hp--;
            if (this.hp === 0) {
                window.game.model.removeEntity(this);
                const bonis = Math.round(Math.random() * 100);
                if (bonis < 30) {
                    const position = this.hit_box.center.cpy();
                    const entity = new Ball(position);
                    entity.randomizeVelocity();
                    window.game.model.addEntity(entity);
                } else if (bonis < 60) {
                    game.model.paddle?.increaseSize();
                }
            }
        }
    }
}