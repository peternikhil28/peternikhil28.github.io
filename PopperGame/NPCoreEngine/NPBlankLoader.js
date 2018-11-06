"use strict";

class NPBlankLoader
{
    constructor()
    {
        this._loader = new NPLoader();
    }

    loadResource(resource)
    {
        this._loader.load(loadRes, this.loadComplete.bind(this));
    }

    loadComplete()
    {
        this.loadEngine();
    }

    loadEngine()
    {
        this._loader.destroy();
        NPEngine.initialize();
    }
}