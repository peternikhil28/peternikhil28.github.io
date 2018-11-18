"use strict";

let loadRes = [
        "res/LoadingScreen/LoadingScreen_Layout.json",
        "res/LoadingScreen/LoadingScreen_00.json",
        "res/LoadingScreen/LoadingScreen_Bg.jpg"
];

let gameResList = [];

// -- Menu Screen Asset --
let menuScreenRes = {
    MenuScreen_00 : "MenuScreen_00.json",
    MenuScreen_Bg : "MenuScreen_Bg.jpg",
    MenuScreen_Layout : "MenuScreen_Layout.json"
};
for(let key in menuScreenRes)
{
    gameResList.push("res/MenuScreen/" + menuScreenRes[key]);
}

// -- Multi Screen Asset --
let multiTextScreenRes = {
    MultiTextScreen : "MultiTextScreen_00.json",
    MultiTextScreen_Bg : "MultiTextScreen_Bg.jpg",
    MultiTextScreen_Layout : "MultiTextScreen_Layout.json",
};
for(let key in multiTextScreenRes)
{
    gameResList.push("res/MultiTextScreen/" + multiTextScreenRes[key]);
}

// -- Fire Screen Asset --
let fireScreenRes = {
    FireParticles : "FireParticles_00.json",
    FireScreen_Bg : "FireScreen_Bg.jpg",
    FireScreen_Layout : "FireScreen_Layout.json"
};


for(let key in fireScreenRes)
{
    gameResList.push("res/FireScreen/" + fireScreenRes[key]);
}

// -- Card Game Asset --
let cardGameRes = {
    CardGame_00 : "CardGame_00.json",
    CardGame_Bg : "CardGame_Bg.jpg",
    CardGame_Layout : "CardGame_Layout.json"
};
for(let key in cardGameRes)
{
    gameResList.push("res/CardGame/" + cardGameRes[key]);
}

// -- Hud Asset --
let hud = {
    Hud_00 : "Hud_00.json",
    Hud_Layout : "Hud_Layout.json"
};
for(let key in hud)
{
    gameResList.push("res/Hud/" + hud[key]);
}