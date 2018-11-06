/**
 * Created by Nikhil Peter on 06-11-2018.
 */

class Popper extends NPGameObject{

    constructor(assetPath, layoutName, onHitCallback)
    {
        super(assetPath, layoutName);

        this._onHitCallback = onHitCallback;

        this._popperId = 0;

        this._active = false;

        this.loadContent();
    }

    createCustomObject(objectData)
    {
        switch (objectData.type) {

            case "Popper" :
                this._popper = new NPSprite();
                this._popper.name = objectData.name;
                this._popper.setSize(objectData.w, objectData.h);
                this._popper.position.set(objectData.x, objectData.y);
                this.setHitArea(objectData.x - objectData.w/2, objectData.y - objectData.h/2, objectData.w, objectData.h);
                return this._popper;
            
        }
    }

    onObjectCreated(object, objectData)
    {
        switch (objectData.name) {

            case "popperExplosion" :
                object.visible = false;
                this._explosion = object;
                break;
        }
    }

    setPopper(popperId)
    {
        if(popperId === 0)
            this.active = false;
        else
        {
            this.active = true;
            this._explosion.visible = false;
            this._popperId = popperId;
            this.setPopperTexture(popperId);
        }
    }

    setPopperTexture(popperId)
    {
        this._popper.setTexture(this._assetFolder + this._assetName, PopperUtils.getPopperData(popperId)["AssetName"]);
    }

    set active(boolean)
    {
        this.children.map(object => object.visible = boolean);
        this._active = boolean;
    }

    get active()
    {
        return this._active;
    }

    onHit(target)
    {
        if(PopperUtils.GAME_SCREEN.projectileMoving)
            return;

        if(this.active)
            this.pop(true);
    }

    pop(hit)
    {
        this._popperId--;

        if(this._popperId)
            this.setPopperTexture(this._popperId);
        else
        {
            this.active = false;
            this._explosion.visible = true;
            this._explosion.display.scale.x = 1;
            this._explosion.display.scale.y = 1;
            this._explosion.actionScale(500, 0);

            NPEngine.audioManager.playSound(PopperUtils.GAME_SCREEN._assetFolder + "Sounds/pop3.mp3");
        }

        this._onHitCallback(this, hit !== undefined);
    }
}
