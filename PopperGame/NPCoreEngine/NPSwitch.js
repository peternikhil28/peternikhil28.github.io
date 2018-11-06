/* Created by Nikhil Peter on 1/15/2018 */

"use strict";

class NPSwitch extends NPButton
{

    constructor(width, height)
    {
        super(width, height);

        this._switchOn = false;
    }


    onPointerUp()
    {
        if(!this._touchEnabled)
            return;

        this._buttonState = ButtonState.NORMAL;

        if(this.switchOn)
            this.switchOn = false;
        else
            this.switchOn = true;

        this.invokeCallback();
    }

    showTexture()
    {
        let id = "";
        switch (this._buttonState)
        {
            case ButtonState.HOVER :
                id = !this._switchOn ? "00" : "04";
                break;

            case ButtonState.NORMAL :
                id = !this._switchOn ? "01" : "05";
                break;

            case ButtonState.PRESSED :
                id = !this._switchOn ? "02" : "06";
                break;

            case ButtonState.DISABLED :
                id = !this._switchOn ? "03" : "07";
                break;
        }

        this._npObject.texture = NPUtils.getTexture(this._assetPath, this._name + id);
    }

    set switchOn(boolean)
    {
        this._switchOn = boolean;

        this.showTexture();
    }

    get switchOn()
    {
        return this._switchOn;
    }
}