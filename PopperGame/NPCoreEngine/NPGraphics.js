/* Created by Nikhil Peter on 1/29/2018 */

"use strict";

class NPGraphics extends NPContainer
{
    constructor()
    {
        super();

        this._npObject = new PIXI.Graphics();
    }

    blink(interval)
    {
        let self = this;
        this._timerId =  setInterval(function ()
        {
            if(self._npObject.tint === "0xAAAAAA")
                self._npObject.tint = "0xFFFFFF";
            else
                self._npObject.tint = "0xAAAAAA";
        }, interval/2);

        return this._timerId;
    }

    stopBlink()
    {
        clearInterval(this._timerId);
    }

    destroy()
    {
        super.destroy();

        this.stopBlink();
    }
}