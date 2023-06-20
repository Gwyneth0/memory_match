import { _decorator, Button, Component, director, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property(Node)
    private show_ui: Node;

    @property(Button)
    private back_home: Button;

    @property(Node)
    private game_win: Node;
    
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
    }

    public hide_win_Game():void{
        this.game_win.active = false;
    }
}

