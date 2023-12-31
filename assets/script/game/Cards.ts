import { _decorator, Component, Node, instantiate, Prefab, Sprite, SpriteFrame, Button, EventHandler, Label, director, ButtonComponent } from 'cc';
import { Results } from './Results';
import { audioSouce } from './audioSouce';
import { gameController } from './gameController';
const { ccclass, property } = _decorator;

@ccclass('Cards')
export class Cards extends Component {

    @property(gameController)
    private gameCtrl: gameController;

    @property(audioSouce)
    private audio: audioSouce;

    @property(SpriteFrame)
    private bg: SpriteFrame;

    @property([SpriteFrame])
    private cardImages: SpriteFrame[] = [];

    @property(Prefab)
    private ButtonPrefab: Prefab = null;
    public get buttonPrefab(): Prefab {
        return this.ButtonPrefab;
    }
    public set buttonPrefab(value: Prefab) {
        this.ButtonPrefab = value;
    }

    @property(Label)
    private timerLabel: Label;

    @property(Results)
    private results: Results;

    private countdown: number = 30;

    private FlippedCard: Button = null;
    public get flippedCard(): Button {
        return this.FlippedCard;
    }
    public set flippedCard(value: Button) {
        this.FlippedCard = value;
    }
    private MatchedCards: Button[] = [];
    public get matchedCards(): Button[] {
        return this.MatchedCards;
    }
    public set matchedCards(value: Button[]) {
        this.MatchedCards = value;
    }

    private countClick: number = 0;
    private saveCard: number[] = [];

    private currentLevel: number = 1;
    private cardsPerLevel: number = 10;
    private totalMatches: number = 0;
    private maxLevel: number = 8;

    protected onLoad(): void {
        this.createGrid();
        this.startGame();
        this.startCountdown();
    }

    protected startCountdown(): void {
        this.schedule(this.updateTimerLabel, 1);
    }

    protected updateTimerLabel(): void {
        this.timerLabel.string = this.countdown.toString();
        this.countdown--;
        if (this.countdown < 0) {
            this.unschedule(this.updateTimerLabel);
            this.results.showResults();
            this.gameCtrl.gameOver();
            this.audio.sound_Lose();
        }
    }

    protected startGame(): void {
        const buttons = this.node.children.map((child) => child.getComponent(Button));
        for (const button of buttons) {
            this.flipCard(button);
        }
        setTimeout(() => {
            for (const button of buttons) {
                this.flipCard(button);
            }
        }, 800);
    }

    protected flipCard(button: Button): void {
        const spriteComponent = button.getComponent(Sprite);
        const isFlipped = spriteComponent.spriteFrame !== this.bg;
        spriteComponent.spriteFrame = isFlipped ? this.bg : this.cardImages[parseInt(button.clickEvents[0].customEventData)];
    }

    protected createGrid(): void {
        const level = this.currentLevel - 1;
        const cardImages = this.cardImages.slice(0, this.cardsPerLevel / 2);
        const indices = [];
        for (let i = 0; i < cardImages.length; i++) {
            indices.push(i);
        }
        const doubledIndices = [];
        for (let i = 0; i < this.cardsPerLevel; i++) {
            doubledIndices.push(indices[i % (this.cardsPerLevel / 2)]);
        }
        this.shuffleArray(doubledIndices);
        const itemsPerRow = 5;
        let rowNum = 0;
        let colNum = 0;
        const cellWidth = 80;
        const cellHeight = 80;
        const totalWidth = cellWidth * itemsPerRow;
        const totalHeight = cellHeight * Math.ceil(this.cardsPerLevel / itemsPerRow);
        const offsetX = -totalWidth / 2 + cellWidth / 2;
        const offsetY = totalHeight / 2 - cellHeight / 2;

        for (let i = 0; i < this.cardsPerLevel; i++) {
            const buttonNode = instantiate(this.buttonPrefab);
            const posX = colNum * cellWidth + offsetX;
            const posY = rowNum * -cellHeight + offsetY;
            buttonNode.setPosition(posX, posY);
            this.node.addChild(buttonNode);
            const buttonComponent = buttonNode.getComponent(Button);
            const spriteComponent = buttonNode.getComponent(Sprite);
            const cardIndex = doubledIndices[i];
            buttonComponent.interactable = true;
            buttonComponent.clickEvents = [];
            const eventHandler = new EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = 'Cards';
            eventHandler.handler = 'onClickButton';
            eventHandler.customEventData = cardIndex.toString();
            buttonComponent.clickEvents.push(eventHandler);
            colNum++;
            if (colNum >= itemsPerRow) {
                colNum = 0;
                rowNum++;
            }
        }
    }

    protected onClickButton(event: any, customEventData: string): void {
        const buttonNode = event.target as Node;
        const buttonComponent = buttonNode.getComponent(Button);
        const spriteComponent = buttonNode.getComponent(Sprite);
        const cardIndex = parseInt(customEventData);
        spriteComponent.spriteFrame = this.cardImages[cardIndex];
        this.countClick++;
        this.saveCard.push(cardIndex);
        this.audio.sound_Card();
        if (buttonComponent.interactable) {
            buttonComponent.interactable = false;
        }
        if (this.countClick === 2) {
            this.countClick = 0;
            this.audio.sound_Card();
            if (this.saveCard[0] === this.saveCard[1]) {
                setTimeout(() => {
                    this.gameCtrl.add_Score();
                    buttonComponent.interactable = false;
                    this.flippedCard.interactable = false;
                    this.matchedCards.push(buttonComponent);
                    this.matchedCards.push(this.flippedCard);
                    this.flippedCard.node.active = false;
                    buttonNode.active = false;
                    this.flippedCard = null;
                    this.totalMatches++;
                    this.audio.sound_Point();
                    if (this.totalMatches === this.cardsPerLevel / 2) {
                        if (this.currentLevel === this.maxLevel) {
                            this.results.show_win_Game();
                            this.audio.sound_Win();
                            director.pause();
                        } else {
                            this.currentLevel++;
                            this.cardsPerLevel += 2;
                            this.countdown = 30;
                            this.totalMatches = 0;
                            this.node.removeAllChildren();
                            this.createGrid();
                            this.startGame();
                            this.startCountdown();
                        }
                    }
                }, 150);
                this.saveCard = [];
            } else {
                this.saveCard = [];
                setTimeout(() => {
                    spriteComponent.spriteFrame = this.bg;
                    this.flippedCard.getComponent(Sprite).spriteFrame = this.bg;
                    buttonComponent.interactable = true;
                    this.flippedCard.interactable = true;
                    this.flippedCard = null;
                }, 150);
            }
        } else {
            this.flippedCard = buttonComponent;
        }
    }

    protected shuffleArray(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}
