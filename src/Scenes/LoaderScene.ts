import { Graphics, Loader } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { assets } from "../assets";
//import { TestScene } from "./TestScene"
import { MainMenuScene } from "./MainMenuScene";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";



export class LoaderScene extends SceneBase {
    public update(): void { }

    public bar: Graphics


    constructor() {
        super()


        this.bar = new Graphics();
        this.setBarPercent(0);



        this.bar.x = SceneManager.WIDTH * 0.5;
        this.bar.y = SceneManager.HEIGHT * 0.5;

        this.bar.pivot.x = this.bar.width / 2;
        this.bar.pivot.y = this.bar.height / 2;


        this.addChild(this.bar);

        this.downloadAssets();

       

    }


    
    
    private downloadAssets() {
        Loader.registerPlugin(new WebfontLoaderPlugin);
        Loader.shared.add(assets);
        Loader.shared.onComplete.once(this.whenLoadFinished.bind(this));
        
        Loader.shared.onProgress.add((Loader) => this.setBarPercent(Loader.progress));
       
        Loader.shared.load();
    }

    
    private setBarPercent(percent: number) {

        const factor = percent / 100;

        this.bar.clear();

        this.bar.beginFill(0xFF0000, 1);
        this.bar.drawRect(0, 0, SceneManager.WIDTH * 0.8 * factor, SceneManager.HEIGHT * 0.1);
        this.bar.endFill();


        this.bar.lineStyle(5, 0xFFFFFF, 1);
        this.bar.beginFill(0x000000, 0);
        this.bar.drawRect(0, 0, SceneManager.WIDTH * 0.8, SceneManager.HEIGHT * 0.1)
        this.bar.endFill();


    }

    private whenLoadFinished() {

       
        SceneManager.changeScene(new MainMenuScene);
    }
}