/* Created by Nikhil Peter on 7/2/2018 */

"use strict";

class NPLoadingScreen extends NPGameScreen
{
    constructor(screen, res)
    {
        super(null, null);

        this._screen = screen;
        this._resources = res;

        this._loader = new NPLoader();
    }

    onLayoutComplete()
    {
        super.onLayoutComplete();

        this.loadResource();
    }

    loadResource()
    {
        this._loader.load(this._resources, this.loadComplete.bind(this));
    }

    loadComplete()
    {
        this.loadScreen();
    }

    loadScreen()
    {
        NPEngine.screenManager.loadNewScreen(this._screen);
    }

    destroy()
    {
        super.destroy();

        this._loader.destroy();
    }
}