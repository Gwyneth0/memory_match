import { _decorator, Button, Component, director, Label, Node, Sprite, TERRAIN_HEIGHT_BASE } from 'cc';
import { audioSouce } from './audioSouce';
import { Cards } from './Cards';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    @property(audioSouce)
    private audio: audioSouce;

    @property(Button)
    private back_home: Button;

    @property(Button)
    private restart: Button;


    @property(Button)
    private pasue: Button;

    @property(Button)
    private unpause: Button;

    @property(Button)
    private on_sound: Button;

    @property(Button)
    private off_sound: Button;

    @property(Label)
    private lb_Score: Label;

    @property(Node)
    private blackoutLayer: Node = null;

    private currentScore: number = 0;

    protected onLoad(): void {
        this.back_home.node.on(Node.EventType.TOUCH_END, this.backHome);
        this.restart.node.on(Node.EventType.TOUCH_END, this.restart_Game);

    }

    protected backHome(): void {
        director.loadScene('menu');
    }

    protected restart_Game() {
        director.loadScene('game');
    }

    public btnResumeGame(): void {
        director.resume();
        this.blackoutLayer.active = true;
        this.pasue.node.active = false;
        this.unpause.node.active = true;
    }

    public btnPauseGame(): void {
        this.pasue.node.active = true;
        this.unpause.node.active = false;
        director.pause();
        this.blackoutLayer.active = false;
    }

    protected btnOnSound(): void {
        this.audio.on_Sound();
        this.on_sound.node.active = true;
        this.off_sound.node.active = false;
    }

    protected btnOffSound(): void {
        this.audio.off_Sound();
        this.on_sound.node.active = false;
        this.off_sound.node.active = true;
    }

    protected update_Score(num: number): void {
        this.currentScore = num;
        this.lb_Score.string = this.currentScore.toString();
    }

    public add_Score() {
        console.log(this.currentScore);

        this.update_Score(this.currentScore += 2);
    }

    public reset_Score() {
        this.update_Score(0);
        this.lb_Score.string = this.currentScore.toString();
    }
}

