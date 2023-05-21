import { AABBPhysicsProxy as AABBPhysicsProxy, ImageAsset, assert } from "../../library";
import { Vector2D } from "../../library/math";
import { Rect } from "../../library/math/Rect";
import { Collision, PhysicsProxiable, PhysicsProxy } from "../../library/physics/Physics";

export class Entity implements PhysicsProxiable {
    public static next_id = 1;
    public id: number = Entity.next_id++;
    // physics properties
    public hit_box: Rect;
    public velocity: Vector2D = new Vector2D(0, 0);
    public physics: AABBPhysicsProxy;
    public physics_id: number | null = null;
    // rendering properties
    public image: ImageAsset;
    public render_box: Rect;
    // 

    constructor(
        position: Vector2D,
        image: ImageAsset,
    ) {
        this.image = image;
        this.hit_box = Rect.fromCenterAndSize(position, { x: image.width, y: image.height })
            .inset(new Vector2D(6, 6));
        this.render_box = this.hit_box.cpy();
        this.physics = new AABBPhysicsProxy(
            this.hit_box,
            this.velocity,
            this,
        );
    }

    /**
     * 
     * @param delta_seconds 
     */
    public update(delta_seconds: number) {
        // do nothing
        this.render_box.center.set(this.physics.outerBox.center);
    }

    public onCollision?(other: PhysicsProxy, collision: Collision): void;
    public onWorlCollision?(distance: Vector2D) : void;
}