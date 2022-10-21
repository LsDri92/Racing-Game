import { TextStyle, Text, Texture } from "pixi.js";
import { Button } from "../Utils/Buttons";
import { IUpdateable } from "../Utils/IUpdateable";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { TestScene } from "./TestScene";

export class MainMenuScene extends SceneBase implements IUpdateable {
    buttonNewGame: Button;
    controlButton: Button;

    
   

    constructor() {
        super()

        const gameFont = new TextStyle({
            fontSize: 80,
            align:"center",
            fill: 0xFFFFFF,
            fontFamily: "GravityFont"
        });

        const gameName = new Text("Get to the Pole!", gameFont);
        gameName.position.set(140, 180);

        this.buttonNewGame = new Button(
            Texture.from("newgame"), 
            Texture.from("newgame"), 
            Texture.from("newgame"), 
        );
        this.buttonNewGame.on("buttonClick", this.onToGame, this);
        this.buttonNewGame.position.set(gameName.x + 250, gameName.y +200);
        this.buttonNewGame.scale.set(0.5, 0.3);
        

        this.controlButton = new Button(
            Texture.from("control"),
            Texture.from("control"),
            Texture.from("control")
        );
        this.controlButton.on("buttonClick", this.onToControls, this);
        this.controlButton.position.set(this.buttonNewGame.x,  this.buttonNewGame.y + 100);
        this.controlButton.scale.set(0.5, 0.3)



        this.addChild(gameName);
        this.addChild(this.buttonNewGame);
        this.addChild(this.controlButton);


    }

    private onToGame():void{
        console.log("Start Game");
        SceneManager.changeScene(new TestScene);
    }

    private onToControls():void{
        console.log("move with arrowleft and arrowrigth");
    }

    public update(_deltaFrame: number, _deltaTime?: number | undefined): void {

    }
}