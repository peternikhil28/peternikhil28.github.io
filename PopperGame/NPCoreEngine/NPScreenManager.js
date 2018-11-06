"use strict";

class NPScreenManager
{
    constructor()
    {
        this._gameScene = null;
    }

    loadScene(gameScene)
    {
        this._gameScene = gameScene;

        NPEngine.gamescene = gameScene;
    }

    loadNewScreen(screen)
    {
        screen.screenType = "NewScreen";

        screen.loadContent();
    }

    addScreen(screen)
    {
        screen.loadContent();
    }

    reveal(screen)
    {
        if(this._gameScene.children.length === 0)
        {
            this._gameScene.display.alpha = 0;
            this.revealNewScreen(screen);
        }
        else if(screen.screenType === "NewScreen")
        {
            this._gameScene.actionAlpha(500, 0, 0, this.revealNewScreen.bind(this, screen));
        }
        else
        {
            screen.onReveal();

            this._gameScene.addChild(screen);
        }
    }

    revealNewScreen(screen)
    {
        this._gameScene.removeAllChildren();

        this._gameScene.addChild(screen);

        screen.onReveal();

        this._gameScene.actionAlpha(500, 1);
    }


    removeScreen(screen)
    {
        this._gameScene.removeChild(screen);
    }
}