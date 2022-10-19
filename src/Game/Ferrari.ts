import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Ferrari extends PhysicsContainer implements IHitbox{
    private hitbox: Graphics;
    private ferrari: Sprite;

    constructor() {
        super();

        this.ferrari = Sprite.from("ferrari");

        this.hitbox = new Graphics;
        this.hitbox.beginFill(0x3a3a3a, 0.2);
        this.hitbox.drawRect(0, 0, 16, 16);
        this.hitbox.endFill();

        this.addChild(this.ferrari);
        this.ferrari.addChild(this.hitbox);
    }
    
    
    
    
    
    
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    
}