/* Created by Nikhil Peter on 3/29/2018 */

class NPPopup extends NPGameScreen
{
    constructor(assetPath, layoutName, onCloseCallback)
    {
        super(assetPath, layoutName);

        this._onCloseCallback = onCloseCallback;

        this.setBackground();

        this.setPopupContainer();
    }

    setBackground()
    {
        this._backgroundLayer = new NPGraphics();
        this._backgroundLayer.display.drawRect(0, 0, NPEngine.screenWidth, NPEngine.screenHeight);
        this._backgroundLayer.display.alpha = 0.5;
        super.addChild(this._backgroundLayer);

        this._backgroundLayer.display.interactive = true;
        this._backgroundLayer.display.hitArea = new PIXI.Rectangle(0, 0, NPEngine.screenWidth, NPEngine.screenHeight);
        this._backgroundLayer.display.on('mouseover', this.stopPropagation.bind(this));
        this._backgroundLayer.display.on('mouseout', this.stopPropagation.bind(this));
        this._backgroundLayer.display.on('pointerdown', this.stopPropagation.bind(this));
        this._backgroundLayer.display.on('pointerup', this.stopPropagation.bind(this));
    }

    stopPropagation(e)
    {
        e.stopPropagation();
    }

    setPopupContainer()
    {
        this._container = new NPContainer();
        this._container.position.set(NPEngine.screenWidth/2, NPEngine.screenHeight/2);
        super.addChild(this._container);
    }

    addChild(child)
    {
        this._container.addChild(child);

        child.position.x -= NPEngine.screenWidth/2;
        child.position.y -= NPEngine.screenHeight/2;
    }

    onReveal()
    {
        this._container.display.scale = 0;
        this._container.actionScale(1, 1, TWEEN.Easing.Elastic.Out);
    }

    onCloseClicked()
    {
        let self = this;
        this._container.actionScale(0.2, 0, null,
            function () {
                if(self._onCloseCallback !== undefined)
                {
                    self._onCloseCallback.call();
                }
                NPEngine.screenManager.removeScreen(self);
            });
    }
}