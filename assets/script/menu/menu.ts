import { _decorator, AudioSource, Button, Component, director, find, Node } from 'cc';
import { audioSouce } from '../game/audioSouce';
const { ccclass, property } = _decorator;

@ccclass('menu')
export class menu extends Component {

    private audioSource: AudioSource;

    @property(Button)
    private loadScene: Button;
S
    protected onLoad(): void {
        this.loadScene.node.on(Node.EventType.TOUCH_END, this.playGame);

    }

    protected start(): void {
        this.audioSource = this.node.getComponent(AudioSource);

        let sound = localStorage.getItem('soundOn') ? JSON.parse(localStorage.getItem('soundOn')) : true;

        this.audioSource.volume = sound ? 1 : 0;
        this.audioSource.play();
    }

    protected playGame(): void {
        director.loadScene('game');
    }
}

