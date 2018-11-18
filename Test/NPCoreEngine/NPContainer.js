"use strict";

class NPContainer extends NPDisplayObject
{
    constructor()
    {
        super();

        this._npObject = new PIXI.Container();

        this.children = [];
    }

    setSize(w, h)
    {
        this._npObject.width = w;
        this._npObject.height = h;
    }

    addChild(object)
    {
        this.children.push(object);

        this._npObject.addChild(object.display);
    }

    setHitArea(x, y, w, h)
    {
        this._npObject.interactive = true;
        this._npObject.hitArea = new PIXI.Rectangle(x, y, w, h);
        this._npObject.on('pointerup',  this.onHit.bind(this));
    }

    onHit(target)
    {

    }

    removeChild(object)
    {
        this.children.splice(this.children.indexOf(object), 1);

        this._npObject.removeChild(object.display);

        object.destroy();
    }

    removeAllChildren()
    {
        while(this.children.length !== 0)
            this.removeChild(this.children[0]);
    }

    destroy()
    {
        this.removeAllChildren();

        super.destroy();
    }
}