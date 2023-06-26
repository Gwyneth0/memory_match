import { _decorator, BlockInputEvents, Button, Color, Component, director, Label, Node, Sprite, v3, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property(Node)
    private show_ui: Node;

    @property(Button)
    private back_home: Button;

    @property(Node)
    private game_win: Node;
    
    @property(Node)
    private bg_game_over: Node;

    public showResults(): void {
        this.show_ui.active = true;
    }

    public hideResults(): void {
        this.show_ui.active = false;
    }

    protected onLoad(): void {
        this.back_home.node.on(Node.EventType.TOUCH_END, this.backHome);
    }

    protected backHome(): void {
        director.loadScene('menu');
    }

  
    public show_win_Game(): void{
        this.game_win.active = true;
        this.bg_game_over.active = true;
    }

    public hide_win_Game():void{
        this.game_win.active = false;
        this.bg_game_over.active =false;
    }   
}

