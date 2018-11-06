"use strict";

let ButtonState = {

    HOVER : "00",
    NORMAL : "01",
    PRESSED : "02",
    DISABLED : "03"
};

class NPButton extends NPSprite
{

    constructor(width, height)
    {
        super(width, height);

        this._touchEnabled = true;
        this._onTouchCallback = null;

        this._npObject.buttonMode = true;
        this._npObject.interactive = true;

        this._buttonState = ButtonState.NORMAL;

        this.addListeners();
    }

    addListeners()
    {
        this._npObject.on('mouseover', this.onMouseOver.bind(this));
        this._npObject.on('mouseout', this.onMouseOut.bind(this));

        this._npObject.on('pointerdown', this.onPointerDown.bind(this));
        this._npObject.on('pointerup', this.onPointerUp.bind(this));
    }

    onMouseOver()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonState.HOVER;
        this.showTexture();
    }

    onMouseOut()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonState.NORMAL;
        this.showTexture();
    }

    onPointerDown()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonState.PRESSED;
        this.showTexture();
    }

    onPointerUp()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonState.NORMAL;
        this.showTexture();

        this.invokeCallback();
    }

    blink(interval)
    {
        this._blinkState = ButtonState.NORMAL;

        let self = this;
        this._timerId =  setInterval(function ()
        {
            if(self._buttonState !== ButtonState.NORMAL)
                return;

            if(self._blinkState === ButtonState.NORMAL)
                self._blinkState = ButtonState.HOVER;
            else
                self._blinkState = ButtonState.NORMAL;

            self.showTexture(self._blinkState);
        }, interval/2);

        return this._timerId;
    }

    stopBlink()
    {
        clearInterval(this._timerId);
    }


    setTexture(assetPath, objectName)
    {
        this._assetPath = assetPath;
        this._name = objectName;

        this.showTexture();
    }

    showTexture(id)
    {
        id = id || this._buttonState;
        super.setTexture(this._assetPath, this._name + id);
    }

    addTouchListener(callback)
    {
        this._onTouchCallback = callback;
    }

    invokeCallback()
    {
        if(this._onTouchCallback !== null)
            this._onTouchCallback(this);
    }

    set touchEnabled(boolean)
    {
        this._touchEnabled = boolean;

        this._npObject.buttonMode = boolean;
        this._npObject.interactive = boolean;

        if(this._touchEnabled)
        {
            this._buttonState = ButtonState.NORMAL;
        }
        else
        {
            this._buttonState = ButtonState.DISABLED;
        }

        this.showTexture();
    }

    get touchEnabled()
    {
        return this._touchEnabled;
    }

    destroy()
    {
        super.destroy();

        this.stopBlink();
    }
}