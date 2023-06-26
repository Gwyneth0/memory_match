import { _decorator, AudioClip, AudioSource, Component, sys } from 'cc';
import { gameController } from './gameController';

const { ccclass, property } = _decorator;

@ccclass('audioSouce')
export class audioSouce extends Component {

    @property(gameController)
    private gameCtrl: gameController;

    @property(AudioClip)
    private flip_card: AudioClip;

    @property(AudioClip)
    private game_die: AudioClip;

    @property(AudioClip)
    private point: AudioClip;

    @property(AudioClip)
    private Win: AudioClip;

    private audioSource: AudioSource;
    private soundOn: boolean = true;
    private localStorageKey: string = 'soundOn';

    protected start(): void {
        this.audioSource = this.getComponent(AudioSource);
        const soundOnString = sys.localStorage.getItem(this.localStorageKey);
        if (soundOnString) {
            this.soundOn = JSON.parse(soundOnString);
        }
        this.applySoundState();
    }

    public sound_Card() {
        this.audioSource.playOneShot(this.flip_card);
    }

    public sound_Lose() {
        this.audioSource.playOneShot(this.game_die);
    }

    public sound_Point() {
        this.audioSource.playOneShot(this.point);
    }

    public sound_Win() {
        this.audioSource.playOneShot(this.Win);
    }

    public off_Sound() {
        this.soundOn = false;
        this.audioSource.volume = 0;
        this.gameCtrl.On_sound.node.active = false;
        sys.localStorage.setItem(this.localStorageKey, JSON.stringify(this.soundOn));
    }

    public on_Sound() {
        this.soundOn = true;
        this.audioSource.volume = 1;
        this.gameCtrl.off_sound.node.active = true;
        sys.localStorage.setItem(this.localStorageKey, JSON.stringify(this.soundOn));
    }

    private applySoundState() {
        this.audioSource.volume = this.soundOn ? 1 : 0;
    }
}
