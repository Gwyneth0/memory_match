import { _decorator, AudioSource, Button, Component, director, Node } from 'cc';
import { audioSouce } from '../game/audioSouce';
const { ccclass, property } = _decorator;

@ccclass('menu')
export class menu extends Component {

    @property(Button)
    private loadScene: Button;

    private audio: AudioSource;

    @property(Button)
    private on_music: Button;

    @property(Button)
    private off_music: Button;

    protected onLoad(): void {
        this.loadScene.node.on(Node.EventType.TOUCH_END, this.playGame);
    }

    protected playGame(): void {
        director.loadScene('game');
    }

    protected btnOnMusic(): void {
        this.audio.volume = 1;
        this.on_music.node.active = false;
        this.off_music.node.active = true;
    }

    protected btnOffKMusic(): void {
        this.audio.volume = 0;
        this.on_music.node.active = true;
        this.off_music.node.active = false;
    }    
}

