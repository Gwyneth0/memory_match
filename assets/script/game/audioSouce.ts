import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioSouce')
export class audioSouce extends Component {
    
    @property(AudioClip)
    private flip_card: AudioClip;

    @property(AudioClip)
    private game_die: AudioClip;

    @property(AudioClip)
    private point: AudioClip;
    
    @property(AudioClip)
    private Win: AudioClip;

    private audioSouce: AudioSource;

    protected start(): void {
        this.audioSouce = this.getComponent(AudioSource);
    }

    public sound_Card(){
        this.audioSouce.playOneShot(this.flip_card);
    }

    public sound_Lose(){
        this.audioSouce.playOneShot(this.game_die);
    }

    public sound_Point(){
        this.audioSouce.playOneShot(this.point);
    }

    public sound_Win(){
        this.audioSouce.playOneShot(this.Win);
    }

    public off_Sound(){
        this.audioSouce.volume  = 0;
    }

    public on_Sound(){
        this.audioSouce.volume = 1;
    }
}

