"use strict";

NPEngine.screenWidth = 1136;
NPEngine.screenHeight = 640;

NPEngine.initialize = function () {

    let gameScene = new NPGameScene();
    NPEngine.screenManager.loadScene(gameScene);

    let gameScreen = new GameScreen("res/GameScreen/", "GameScreen");
    NPEngine.screenManager.loadNewScreen(new LoadingScreen(gameScreen, gameScreenResList));
};