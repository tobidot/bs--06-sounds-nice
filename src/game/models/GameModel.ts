import { Vector2D } from "../../library/math";
import { Rect } from "../../library/math/Rect";
import { AABBPhysicsProxy, AABBPhysicsEngine } from "../../library/physics/AABBPhysicsEngine";
import { Ball } from "./Ball";
import { Brick } from "./Brick";
import { Entity } from "./Entity";
import { Paddle } from "./Paddle";

export class GameModel {
    public physics: AABBPhysicsEngine;
    public entities: Entity[] = [];
    public debug: boolean = false;
    public paddle: Paddle |null = null;
    public lives :number = 3;
    public did_first_action: boolean = false;

    constructor(
        public context: CanvasRenderingContext2D,
    ) {
        const screen_box = new Rect(0, 0, context.canvas.width, context.canvas.height);
        this.physics = new AABBPhysicsEngine({
            world_box: screen_box,
            simple_collisions: true,
        });
    }

    /**
     * Reset the game
     */
    public restart() {
        this.physics = new AABBPhysicsEngine({
            world_box: this.physics.options.world_box,
            simple_collisions: false,
        });
        this.did_first_action = false;
        this.entities = [];
        this.debug = false;
    }

    /**
     * Update the logic of the game
     * @param delta_seconds 
     */
    public update(delta_seconds: number) {
        this.physics.update(delta_seconds);
        this.entities.forEach((entity) => {
            entity.update(delta_seconds);
        });
    }


    /**
     * 
     * @returns the center of the world
     */
    public worldCenter() : Vector2D{
        return this.physics.options.world_box.center.cpy();
    }

    /**
     * Create a new entity with the given label
     * @param label 
     * @returns 
     */
    public addEntity<T extends Entity>(
        entity: T,
    ): T {
        this.entities.push(entity);
        entity.physics_id = this.physics.add(entity.physics).id;
        return entity;
    }

    public removeEntity(entity:Entity) {
        if (entity.physics_id) {
            this.physics.remove(entity.physics_id);
        }
        this.entities = this.entities.filter(e => e.id !== entity.id);
    }

    
    /**
     * @returns true if the player lost all his balls
     */
    public hasNoBalls(): boolean {
        return this.entities
            .filter(e => e instanceof Ball)
            .length === 0;
    }

    /**
     * @returns true if the game is over
     */
    public isGameOver(): boolean {
        return this.lives <= 0;
    }

    /**
     * @returns true if the game is won
     */
    public isGameWon(): boolean {
        return this.entities
            .filter(e => e instanceof Brick)
            .length === 0;
    }
}