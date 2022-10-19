import { AnimatedSprite, Graphics, Rectangle,  Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Mclaren extends PhysicsContainer implements IHitbox {
    private hitbox: Graphics;
    private playerCar: AnimatedSprite;
    private physCar: PhysicsContainer;
    private static readonly MOVE_PLAYER = 200;

    constructor() {
        super();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x3a3a3a, 0.2);
        this.hitbox.drawRect(0, 0, 16, 16);
        this.hitbox.endFill();

        this.playerCar = new AnimatedSprite(
            [
                Texture.from("mclaren")
            ],);

            //physics Car
        this.physCar = new PhysicsContainer();
        this.physCar.speed.x = 300;
        this.physCar.speed.y = 100;
        this.physCar.acceleration.y = 10;
        this.addChild(this.physCar);

        this.addChild(this.playerCar);
        this.playerCar.addChild(this.hitbox);
        this.playerCar.addChild(this.physCar);
        



    };
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.playerCar.update(deltaMS / (1000 / 60));



        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = Mclaren.MOVE_PLAYER;
            

        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Mclaren.MOVE_PLAYER;
         

        } else {
            this.speed.x = 0;
        }

       /* if (Keyboard.state.get("ArrowDown")) {
            this.speed.y = Mclaren.MOVE_PLAYER;
            this.playerCar.angle = 0;
            this.playerCar.scale.y = 1;

        } else if (Keyboard.state.get("ArrowUp")) {
            this.speed.y = -Mclaren.MOVE_PLAYER;
            this.playerCar.angle = 0;
            this.playerCar.scale.y = 1;

        } else {
            this.speed.y = 0;
        }
*/

    }




    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    };

} 