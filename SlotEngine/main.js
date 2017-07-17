
NPEngine.screenWidth = 1280;
NPEngine.screenHeight = 720;

NPEngine.load = function () {

    var gameScene = new NPGameScene();
    NPEngine.screenManager.loadScene(gameScene);

    var mainScreen = new MainScreen("res/mainscreen/", "MainScreen");
    NPEngine.screenManager.loadNewScreen(new LoadingScreen(mainScreen, mainScreenResList));

};
