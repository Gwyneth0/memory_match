import { _decorator, Button, Component, director, Label, Node, Sprite, TERRAIN_HEIGHT_BASE } from 'cc';
import { audioSouce } from './audioSouce';
import { Cards } from './Cards';
import { Results } from './Results';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    @property(Cards)
    private Card: Cards;

    @property(Results)
    private Results: Results;

    @property(audioSouce)
    private audio: audioSouce;

    @property(Button)
    private back_home: Button;

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

    private currentScore: number = 0;

    protected backHome(): void {
        director.loadScene('menu');
    }

    protected restart_Game() {
        director.loadScene('game');
    }

    public gameOver() {
        this.off_sound.interactable = false;
        this.on_sound.interactable = false;
        this.back_home.interactable = false;
        this.pasue.interactable = false;
        this.unpause.interactable = false;
    }

    public btnResumeGame(): void {
        director.resume();
        this.pasue.node.active = false;
        this.unpause.node.active = true;
    }

    public btnPauseGame(): void {
        this.pasue.node.active = true;
        this.unpause.node.active = false;
        director.pause();
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

