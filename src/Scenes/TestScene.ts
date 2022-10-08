import { Container, Text } from "pixi.js";
import { Mclaren } from "../Game/Mclaren";
import { checkColission } from "../Game/IHitbox";
import { Mercedes } from "../Game/Mercedes";
import { Track } from "../Game/Track";
import { IUpdateable } from "../Utils/IUpdateable";
import { SceneBase } from "../utils/SceneBase";
//import { SceneManager } from "../utils/SceneManager";

export class TestScene extends SceneBase implements IUpdateable {
    private world: Container;
    private mclaren = new Mclaren;
    private rival: Mercedes[];
    private infoText: Text;
    private racetrack = new Track;
    private timePassed: number = 0;
    private gameSpeed: number = 100;




    constructor() {
        super()
        this.world = new Container();
        this.addChild(this.world)

        this.racetrack = new Track;




        this.rival = [];
        let riv = new Mercedes();
        riv.position.set(100, 0);
        riv.scale.y = -1;
        this.world.addChild(riv);
        this.rival.push(riv);


        this.mclaren.position.set(200, 150);


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

        if (this.timePassed > (2000 * 200 / this.gameSpeed)) {
            this.gameSpeed += 20;
            this.timePassed = 0;
            const riv = new Mercedes();
            riv.position.set(Math.random() * 249, -20);
            riv.scale.y = -1;
            this.world.addChild(riv);
            this.rival.push(riv);
            console.log(this.rival.length);

        };

        this.mclaren.update(deltaMs);

        this.infoText.text += "\nWorld scale: " +
            this.world.scale.x.toFixed(1) + ", " + this.world.scale.y.toFixed(1);




        for (let riv of this.rival) {
            riv.speed.y = 150;
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
                    }
                }


                }

                if (riv.getHitbox().bottom > 700) {
                    riv.destroy()

                }
            }


            this.infoText.text += "\nHave" + " " + this.rival.length + " " + "Rivals";

            this.rival = this.rival.filter((elem) => !elem.destroyed)

            this.racetrack.position.y += this.gameSpeed * deltaMs / 1000;


        }

    }
