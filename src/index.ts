import { LoaderScene } from './Scenes/LoaderScene';
import { SceneManager } from './utils/SceneManager';

SceneManager.initialize();
SceneManager.changeScene(new LoaderScene());

