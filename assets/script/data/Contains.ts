import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

enum game_event{
    Restart = 'restart',
    addScore = 'addscore',
    Die = 'die'
}

enum game_state{
    Start = 1,
    Playing  = 2, 
    Pasue = 3,
    Over
}

export class Contains{  
    static gridSize = 3;
    static startPosX = -90;
    static startPosY = 90;
    static spacing = 90;
    static  move:number = 0;
    static index = 0
}

