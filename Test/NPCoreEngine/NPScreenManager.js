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
        this.addForeground();

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

    addForeground()
    {
        let foregroundLayer = new NPGraphics();
        foregroundLayer.display.drawRect(0, 0, NPEngine.screenWidth, NPEngine.screenHeight);
        foregroundLayer.display.alpha = 0;
        this._gameScene.addChild(foregroundLayer);

        foregroundLayer.display.interactive = true;
        foregroundLayer.display.hitArea = new PIXI.Rectangle(0, 0, NPEngine.screenWidth, NPEngine.screenHeight);
        foregroundLayer.display.on('mouseover', this.stopPropagation.bind(this));
        foregroundLayer.display.on('mouseout', this.stopPropagation.bind(this));
        foregroundLayer.display.on('pointerdown', this.stopPropagation.bind(this));
        foregroundLayer.display.on('pointerup', this.stopPropagation.bind(this));
    }

    stopPropagation(e)
    {
        e.stopPropagation();
    }
}