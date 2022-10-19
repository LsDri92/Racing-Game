import { Graphics, Rectangle, Texture, TilingSprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Track extends PhysicsContainer implements IHitbox{
    private trackHitbox: Graphics;
    private racetrack: TilingSprite;

    constructor() {
        super()
        this.racetrack = new TilingSprite(Texture.from("racetrack"),265,-50000);

        this.trackHitbox = new Graphics;
        this.trackHitbox.beginFill(0x001111, 0.2);
        this.trackHitbox.drawRect(0,0,this.racetrack.width,this.racetrack.height);
        this.trackHitbox.endFill();
        this.racetrack.addChild(this.trackHitbox);
        this.addChild(this.racetrack);

    }

    getHitbox(): Rectangle {
        return this.trackHitbox.getBounds();
    }

    
}