import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Mclaren } from "../Game/Mclaren";
import { checkColission } from "../Game/IHitbox";
import { Mercedes } from "../Game/Mercedes";
import { Track } from "../Game/Track";
import { IUpdateable } from "../Utils/IUpdateable";
import { SceneBase } from "../utils/SceneBase";
import { Ferrari } from "../Game/Ferrari";
//import { SceneManager } from "../utils/SceneManager";

export class TestScene extends SceneBase implements IUpdateable {
    private world: Container;
    private mclaren = new Mclaren;
    private rival: Mercedes[];
    private ferrari: Ferrari[];
    private infoText: Text;
    private racetrack = new Track;
    private timePassed: number = 0;
    private gameSpeed: number = 150;
    private raceStart: Sprite;
    private darker: Graphics;
    private time: number = 1;




    constructor() {
        super()
        this.world = new Container();
        this.addChild(this.world)

        this.racetrack = new Track;

        this.raceStart = new Sprite(Texture.from("racestart"));
        this.raceStart.width = this.racetrack.width;

        this.darker = new Graphics;
        this.darker.beginFill(0x000000, 0.3);
        this.darker.drawRect(0, 0, 357, this.raceStart.height);
        this.darker.endFill();

        this.raceStart.addChild(this.darker);
        this.world.addChild(this.raceStart);





        this.rival = [];
        let riv = new Mercedes();
        riv.position.set(100, 0);
        riv.scale.y = -1;
        this.world.addChild(riv);
        this.rival.push(riv);

        this.ferrari = [];
        let red = new Ferrari();
        red.position.set(200, 0);
        this.world.addChild(red);
        this.ferrari.push(red);


        this.mclaren.position.set(150, 250);


        this.world.addChild(this.racetrack);

        this.world.addChild(riv);
        this.world.addChild(this.mclaren);



        this.infoText = new Text("", { fontFamily: "Arial", fontSize: 15, fill: 0xFFFFFF });
        this.infoText.toGlobal(this.world);
        this.infoText.position.set(560, 25);
        this.infoText.scale.set(0.8);
        this.addChild(this.infoText);




        this.world.scale.set(this.world.scale.x * 2);


    }



    update(_frame: number, deltaMs: number): void {
        this.infoText.text = "Player position inside the world: " +
            this.mclaren.x.toFixed(1) + ", " + this.mclaren.y.toFixed(1);

        this.timePassed += deltaMs;
        this.time += deltaMs / 1000;

        if (this.timePassed > (2000 * 200 / this.gameSpeed)) {
            this.timePassed = 0;
            this.gameSpeed += 10;

            const riv = new Mercedes();
            riv.position.set(Math.random() * 249, -20);
            riv.scale.y = -1;
            this.world.addChild(riv);
            this.rival.push(riv);
      
            const red = new Ferrari();
            red.position.set(Math.random() * 249, -20);
            this.world.addChild(red);
            this.ferrari.push(red);
        };

        this.mclaren.update(deltaMs);

        this.infoText.text += "\nWorld scale: " +
            this.world.scale.x.toFixed(1) + ", " + this.world.scale.y.toFixed(1);



        //mercedes
        for (let riv of this.rival) {
            riv.speed.y = 180;
            riv.update(deltaMs / 1000);

            const overlap = checkColission(this.mclaren, riv);
            if (overlap != null) {
                if (overlap.width < overlap.height) {
                    if (this.mclaren.x > riv.x) {
                        this.mclaren.x += overlap.width;
                    } else if ((this.mclaren.x < riv.x)) {
                        this.mclaren.x -= overlap.width;
                    }
                } else {
                    if (this.mclaren.y < riv.y) {
                        this.mclaren.y -= overlap.height;
                        this.mclaren.speed.y = 0;
                        this.mclaren.destroy();
                    }
                }
            }

            if (riv.getHitbox().bottom > 700) {
                riv.destroy()
            }

        }

        //ferrari
        for (let red of this.ferrari) {
            red.speed.y = 200;
            red.update(deltaMs / 1000);

            const overlap2 = checkColission(this.mclaren, red);
            if (overlap2 != null) {
                if (overlap2.width < overlap2.height) {
                    if (this.mclaren.x > red.x) {
                        this.mclaren.x += overlap2.width;
                    } else if ((this.mclaren.x < red.x)) {
                        this.mclaren.x -= overlap2.width;
                    }
                } else {
                    if (this.mclaren.y > red.y) {
                        this.mclaren.y -= overlap2.height;
                        this.mclaren.speed.y = 0;
                        this.mclaren.destroy();
                    }
                }


            }
            if (red.getHitbox().bottom > 700) {
                red.destroy()
            }
        }

        if (this.mclaren.x > this.racetrack.width - 10) {
            this.mclaren.destroy();
        }
        if (this.mclaren.x < 10) {
            this.mclaren.destroy();
        }

        if (this.gameSpeed > 500){
            this.gameSpeed = 500;
        }



        this.infoText.text += "\nHave" + " " + this.rival.length + " " + "Rivals";

        this.infoText.text += "\nHave" + " " + this.ferrari.length + " " + "Ferrari";
        this.infoText.text += "\nTime" + " " + this.time.toPrecision(3);
        this.infoText.text += "\nGame Speed" + " " + this.gameSpeed.toPrecision(3);

        this.rival = this.rival.filter((elem) => !elem.destroyed);
        this.ferrari = this.ferrari.filter((elem) => !elem.destroyed);

        this.racetrack.position.y += this.gameSpeed * deltaMs / 800;
        this.raceStart.position.y += this.gameSpeed * deltaMs / 800;

    }

}

