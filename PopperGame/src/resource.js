"use strict";

let loadRes = [
        "res/LoadingScreen/LoadingScreen_Layout.json",
        "res/LoadingScreen/LoadingScreen_00.json",
        "res/LoadingScreen/LoadingScreen_Bg.jpg"
];


let gameScreenRes = {
    GameScreen : "GameScreen_00.json",
    GameScreen_GameBg : "GameScreen_GameBg.jpg",
    GameScreen_Layout : "GameScreen_Layout.json",

    Popper_jone : "Popper/Popper_00.json",
    Popper_Layout : "Popper/Popper_Layout.json",

    PopperDefinition : "PopperDefinition.json",

    applauseShort : "Sounds/applauseShort.mp3",
    awh : "Sounds/awh.mp3",
    pop3 : "Sounds/pop3.mp3",
    poppersBackgroundMusic : "Sounds/poppersBackgroundMusic.mp3"
};

let gameScreenResList = [];
for(let key in gameScreenRes)
{
    gameScreenResList.push("res/GameScreen/" + gameScreenRes[key]);
}