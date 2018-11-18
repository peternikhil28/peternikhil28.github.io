"use strict";

NPEngine.screenWidth = 1280;
NPEngine.screenHeight = 720;

NPEngine.initialize = function () {

    let gameScene = new NPGameScene();
    NPEngine.screenManager.loadScene(gameScene);

    let menuScreen = new MenuScreen("res/MenuScreen/", "MenuScreen");
    NPEngine.screenManager.loadNewScreen(new LoadingScreen(menuScreen, gameResList));
};