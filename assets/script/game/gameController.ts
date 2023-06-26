import { _decorator, BlockInputEvents, Button, cclegacy, Color, Component, director, instantiate, Label, Node, Sprite, TERRAIN_HEIGHT_BASE, v3, Vec3, view } from 'cc';
import { audioSouce } from './audioSouce';
import { Cards } from './Cards';
import { Results } from './Results';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

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
    public get On_sound(): Button {
        return this.on_sound;
    }
    public set On_sound(value: Button) {
        this.on_sound = value;
    }

    @property(Button)
    private Off_sound: Button;
    public get off_sound(): Button {
        return this.Off_sound;
    }
    public set off_sound(value: Button) {
        this.Off_sound = value;
    }

    @property(Label)
    private lb_Score: Label;

    private currentScore: number = 0;

    @property(Sprite)
    private OverlaySprite: Sprite = null;
    public get overlaySprite(): Sprite {
        return this.OverlaySprite;
    }
    public set overlaySprite(value: Sprite) {
        this.OverlaySprite = value;
    }

    @property(Node)
    private home: Node;

    private isOverlayVisible: boolean = false;

    @property(Node)
    private pau: Node;

    protected start(): void {
        let sound = localStorage.getItem('soundOn') ? JSON.parse(localStorage.getItem('soundOn')) : true;

        this.on_sound.node.active = sound;
        this.off_sound.node.active = !sound;
    }

    protected backHome(): void {
        director.loadScene('menu');
    }

    protected restart_Game() {
        director.loadScene('game');
    }

    private disableOverlay(): void {
        const overlayNode = this.node.getChildByName('OverlayLayer');
        if (overlayNode) {
            overlayNode.destroy();
            this.isOverlayVisible = false;
        }
    }

    public createOverlayLayer(): void {
        const overlayNode = new Node('OverlayLayer');
        const overlaySprite = overlayNode.addComponent(Sprite);
        overlaySprite.spriteFrame = this.overlaySprite.spriteFrame;
        const screenSize = view.getVisibleSize();
        overlayNode.scale = new Vec3(screenSize.width, screenSize.height, 1);
        overlayNode.setPosition(screenSize.width / 2, screenSize.height / 2);

        overlayNode.position = v3(0, 0, 0);
        overlayNode.setSiblingIndex(9999);
        const color = new Color();
        color.a = 60;
        overlaySprite.color = color;
        overlayNode.addComponent(BlockInputEvents);
        this.node.addChild(overlayNode);
    }

    public gameOver() {
        this.off_sound.interactable = false;
        this.on_sound.interactable = false;
        this.back_home.interactable = false;
        this.pasue.interactable = false;
        this.unpause.interactable = false;
        this.back_home.node.active = false;
        this.home.active = false;
        this.createOverlayLayer();

    }

    public btnResumeGame(): void {
        director.resume();
        this.unpause.node.active = true;
        this.pau.active = false;
        this.disableOverlay();
    }

    public btnPauseGame(): void {
        this.pasue.node.active = true;
        this.pau.active = true;
        this.createOverlayLayer();
        director.pause();
    }

    public btnOnSound(): void {
        this.audio.on_Sound();
        this.on_sound.node.active = true;
        this.off_sound.node.active = false;
    }

    public btnOffSound(): void {
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

