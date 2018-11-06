
class GameScreen extends NPGameScreen
{
    constructor(assetPath, layoutName)
    {
        super(assetPath, layoutName);

        this._popperList = [];

        this._projectileList = [];

        this._level = null;
        this._attempts = null;

        this._onGamePlay = false;

        this._borderPoints = [{x:0}, {y:0}, {x:NPEngine.screenWidth}, {y:NPEngine.screenHeight}];

        PopperUtils.GAME_SCREEN = this;
    }

    createCustomObject(objectData)
    {
        switch (objectData.name)
        {
            case "AnchorRect":
                this._anchorRect = new PIXI.Rectangle(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "BottomRect":
                this._bottomRect = new PIXI.Rectangle(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "RightRect":
                this._rightRect = new PIXI.Rectangle(objectData.x, objectData.y, objectData.w, objectData.h);
                break;
        }
    }

    onObjectCreated(object, objectData)
    {
        switch (objectData.name)
        {
            case "txtLevel":
                this._txtLevel = object;
                break;

            case "txtAttempts":
                this._txtAttempts = object;
                break;

            case "txtGameStatus" :
                this._txtGameStatus = object;
                break;

            case "btnSwap":
                this._btnSwap = object;
                this._btnSwap.display.buttonMode = true;
                this._btnSwap.display.interactive = true;
                this._btnSwap.display.on('pointerup', this.startGame.bind(this));
                break;
        }
    }


    onLayoutComplete()
    {
        super.onLayoutComplete();

        this.setPopperDefinition();

        this.setCellSize();

        this.setLayout();

        this.startGame();

        NPEngine.audioManager.playSound(this._assetFolder + "Sounds/poppersBackgroundMusic.mp3", true);

        NPEngine.ticker.add(this.render, this);
    }

    setPopperDefinition()
    {
        let data = NPUtils.getResource(this._assetFolder + "PopperDefinition.json").data;
        this.level = data["DefaultLevel"] - 1;
        PopperUtils.setPopperDefinition(data);
    }

    setCellSize()
    {
        let width = Math.abs(this._rightRect.x - this._anchorRect.x);
        let height = Math.abs(this._anchorRect.y - this._bottomRect.y);

        this._cellSize = new PIXI.Rectangle(0, 0, width, height);
    }

    setLayout()
    {
        for(let row=0; row<PopperUtils.NUM_ROWS; row++)
        {
            for(let col=0; col<PopperUtils.NUM_COLS; col++)
            {
                let popper = new Popper(this._assetFolder + "Popper/", "Popper", this.onPopperClickCallback.bind(this));
                popper.position.x = this._anchorRect.x + (this._cellSize.width * col);
                popper.position.y = this._anchorRect.y + (this._cellSize.height * row);
                this.addChild(popper);

                this._popperList.push(popper);
            }
        }
    }

    startGame()
    {
        if(this._onGamePlay)
            return;

        this._onGamePlay = true;
        this._btnSwap.visible = false;

        this._txtGameStatus.text = "";

        this.level = (this.level + 1) % PopperUtils.LEVELS_DATA.length

        let levelData = PopperUtils.LEVELS_DATA[this.level];
        this.setPoppers(levelData["PopperData"]);

        this.attempts = levelData["Attempts"];
    }

    setPoppers(popperData)
    {
        for(let index=0; index<this._popperList.length; index++)
        {
            this._popperList[index].setPopper(popperData[index]);
        }
    }

    onPopperClickCallback(target, hit)
    {
        if(!target.active)
            this.releaseProjectiles(target);

        this.checkGameComplete(hit)
    }

    releaseProjectiles(target)
    {
        for(let i=0; i<4; i++)
        {
            let projectile = new NPSprite();
            projectile.parent = target;
            projectile.setTexture(this._assetFolder + this._assetName, "Projectile");
            let position = new PIXI.Point(target.position.x + target._popper.position.x, target.position.y + target._popper.position.y);
            projectile.position.set(position.x, position.y);
            this.addChild(projectile);

            let x = this._borderPoints[i]["x"] === undefined ? position.x : this._borderPoints[i]["x"];
            let y = this._borderPoints[i]["y"] === undefined ? position.y : this._borderPoints[i]["y"];
            let ds = Math.sqrt( Math.pow(target.position.x - x, 2) + Math.pow(target.position.y - y, 2) );

            let self = this;
            projectile.actionMoveTo((ds/PopperUtils.PROJECTILE_SPEED) * 1000, x, y, null, function () {
                self.removeChild(projectile);
                self._projectileList.splice(self._projectileList.indexOf(projectile), 1);
                self.checkGameComplete();
            });

            this._projectileList.push(projectile);
        }

        this.projectileMoving = true;
    }

    checkGameComplete(hit)
    {
        if(hit === true)
            this.attempts--;

        let flag = false;
        for(let i=0; i<this._popperList.length; i++)
        {
            if(this._popperList[i].active)
            {
                flag = true;
                break;
            }
        }

        if(this._projectileList.length !==0)
            return;

        this.projectileMoving = false;

        if(!flag)
            this.onComplete();
        else if(flag && this.attempts === 0)
            this.gameOver();
    }

    onComplete()
    {
        this._onGamePlay = false;
        this._btnSwap.visible = true;

        this._txtGameStatus.text = "Level Passed";

        NPEngine.audioManager.playSound(this._assetFolder + "Sounds/applauseShort.mp3");
    }

    gameOver()
    {
        this.projectileMoving = true;

        this._txtGameStatus.text = "Game Over";

        NPEngine.audioManager.playSound(this._assetFolder + "Sounds/awh.mp3");
    }

    render(dt)
    {
        for(let i=0; i<this._popperList.length; i++)
        {
            if(!this._popperList[i].active)
                continue;

            for(let j=0; j<this._projectileList.length; j++)
            {
                if(this._popperList[i] !== this._projectileList[j].parent && NPUtils.checkCollision(this._popperList[i].display, this._projectileList[j].display))
                {
                    this._popperList[i].pop();
                    this._projectileList[j].stopAllActions();
                    this.removeChild(this._projectileList[j]);
                    this._projectileList.splice(j, 1);
                    break;
                }
            }
        }
    }

    set level(level)
    {
        this._txtLevel.text = "Level : " + (level + 1);
        this._level = level;
    }

    get level()
    {
        return this._level;
    }

    set attempts(attempts)
    {
        this._txtAttempts.text = "Taps Left : " + attempts;
        this._attempts = attempts;
    }

    get attempts()
    {
        return this._attempts;
    }
}