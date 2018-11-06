"use strict";

class NPDisplayObject
{
    constructor()
    {
        this._tweenIdArray = [];

        this._npObject = new PIXI.DisplayObject();
    }

    get display()
    {
        return this._npObject;
    }

    get position()
    {
        return this._npObject.position;
    }

    get visible()
    {
        return this._npObject.visible;
    }

    set visible(boolean)
    {
        this._npObject.visible = boolean;
    }

    moveToFront()
    {
        if (this.display.parent)
        {
            let parent = this.display.parent;
            parent.removeChild(this.display);
            parent.addChild(this.display);
        }
    }

    // -- Actions --

    onComplete(action, callback)
    {
        this._tweenIdArray.splice(this._tweenIdArray.indexOf(action), 1);

        if(callback)
        {
            callback();
        }
    }

    actionScaleInout(duration, loop, callback)
    {
        let self = this;
        this.actionScale(duration/2, 0.7, null, function () {
            self.actionScale(duration/2, 1, null, loop ? self.actionScaleInout.bind(self, duration, loop, callback) : callback);
        });
    }

    actionScale(duration, scale, easing, callback)
    {
        easing = easing || TWEEN.Easing.Linear.None;

        let current = {scale : this._npObject.scale.x || this._npObject.scale.y || 0};
        let target = {scale : scale};

        let self = this;
        let action = new TWEEN.Tween(current)
            .to(target, duration)
            .easing(easing)
            .onUpdate(function()
            {
                self._npObject.scale.set(current.scale, current.scale);
            })
            .onComplete(function()
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionMoveTo(duration, x, y, delay, callback)
    {
        duration = duration || 0;
        delay = delay || 0;

        let current = {x : this.position.x, y : this.position.y};
        let target = {x : x, y : y};

        let self = this;
        let action = new TWEEN.Tween(current)
            .to(target, duration)
            .delay(delay * 1000)
            .onUpdate(function()
            {
                self.position.set(current.x, current.y);
            })
            .onComplete(function()
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionMoveBy(duration, dx, dy, delay, callback)
    {
        duration = duration || 0;
        delay = delay || 0;

        let current = {x : this.position.x, y : this.position.y};
        let target =  {x : this.position.x + dx, y : this.position.y + dy};

        let self = this;
        let action = new TWEEN.Tween(current)
            .to(target, duration)
            .delay(delay * 1000)
            .onUpdate(function()
            {
                self.position.set(current.x, current.y);
            })
            .onComplete(function()
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionRotateBy(duration, rotateBy, repeat, callback)
    {
        duration = duration || 0;
        rotateBy = rotateBy || 0;
        repeat = repeat || 0;


        let angle = this._npObject.rotation + (Math.PI/180) * rotateBy;

        let current = {rotate : this._npObject.rotation};
        let target = {rotate : angle};

        let self = this;
        let action = new TWEEN.Tween(current)
            .to(target, duration)
            .repeat(repeat)
            .onUpdate(function()
            {
                self._npObject.rotation = current.rotate;
            })
            .onComplete(function()
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    actionAlpha(duration, opacity, delay, callback)
    {
        duration = duration || 0;
        opacity = opacity || 0;
        delay = delay || 0;

        let current = {alpha : this._npObject.alpha};
        let target = {alpha : opacity};

        let self = this;
        let action = new TWEEN.Tween(current)
            .to(target, duration)
            .delay(delay * 1000)
            .onUpdate(function()
            {
                self._npObject.alpha = current.alpha;
            })
            .onComplete(function()
            {
                self.onComplete(action, callback)
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }

    stopAction(action)
    {
        action.stop();
        this._tweenIdArray.splice(this._tweenIdArray.indexOf(action), 1);
    }

    stopAllActions()
    {
        while (this._tweenIdArray.length > 0)
        {
            this._tweenIdArray[0].stop();
            this._tweenIdArray.splice(0, 1);
        }
    }

    destroy()
    {
        this.stopAllActions();
        this._tweenIdArray = null;

        this._npObject.removeAllListeners();

        this._npObject.destroy();

        NPEngine.ticker.remove(null, this);

        this._npObject = null;
    }
}