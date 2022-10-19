import { Sprite, Rectangle, Graphics } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer"

export class Mercedes extends PhysicsContainer implements IHitbox{

    private rivals: Sprite;
    private hitbox: Graphics;

    constructor() {
        super();

        this.rivals = Sprite.from("mercedes");

        this.hitbox = new Graphics;
        this.hitbox.beginFill(0x3a3a3a, 0.2);
        this.hitbox.drawRect(0, 0, 16, 16);
        this.hitbox.endFill();

        this.addChild(this.rivals);
        this.rivals.addChild(this.hitbox);
    }




    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}
