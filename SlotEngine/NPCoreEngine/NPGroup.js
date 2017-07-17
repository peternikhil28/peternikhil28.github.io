
var NPGroup = NPClass.extend({

    _clippingEnabled : false,
    _clippingPlaneList : null,

    _npObject : null,

    _children : null,

    _tweenIdArray : null,

    init:function ()
    {
        this._super();

        this._children = [];

        this._tweenIdArray = [];

        this._npObject = new THREE.Group();
    },

    getDisplayObject : function ()
    {
        return this._npObject;
    },

    getX : function ()
    {
        return this._npObject.position.x;
    },

    getY : function ()
    {
        return this._npObject.position.y;
    },

    setX : function (x)
    {
        this._npObject.position.x = x;
    },

    setY : function (y)
    {
        this._npObject.position.y = y;
    },

    moveX : function (x)
    {
        this._npObject.position.x += x;
    },

    moveY : function (y)
    {
        this._npObject.position.y += y;
    },

    setPosition : function (x, y)
    {
        this._npObject.position.set(x, y, 0);
    },

    setClippingPlanes : function(planeList)
    {
        this._clippingPlaneList = planeList;
        this._clippingEnabled = true;
    },

    add : function (object)
    {
        this._npObject.add(object.getDisplayObject());

        this._children.push(object);

        if(this._clippingEnabled)
            object.setClippingPlanes(this._clippingPlaneList);
    },

    remove : function (object)
    {
        this._npObject.remove(object.getDisplayObject());
        object.unload();

        this._children.splice(this._children.indexOf(object), 1);
    },

    removeAllChildren :  function ()
    {
        while(this._children.length > 0)
        {
            this._npObject.remove(this._children[0].getDisplayObject());
            this._children[0].unload();

            this._children.splice(0, 1);
        }
    },

    convertToNodeSpace : function (x, y)
    {
        var newX = x - this.getX();
        var newY = y - this.getY();

        var point = new NPPoint(newX, newY);

        return point;
    },

    // -- ACTIONS --

    actionMoveTo : function (x, y, duration, delay, callBack)
    {
        duration = duration || 0;
        delay = delay || 0;

        var current = {x : this.getX(), y : this.getY()};
        var target = {x : x, y : y};

        var self = this;
        var action = new TWEEN.Tween(current)
            .to(target, duration * 1000)
            .delay(delay * 1000)
            .onUpdate(function()
            {
                self.setPosition(current.x, current.y);
            })
            .onComplete(function()
            {
                if(callBack)
                {
                    callBack();
                }
                self._tweenIdArray.splice(self._tweenIdArray.indexOf(action), 1);
            });
        action.start();

        this._tweenIdArray.push(action);
    },

    stopAllTweens : function ()
    {
        while (this._tweenIdArray.length > 0)
        {
            this._tweenIdArray[0].stop();
            this._tweenIdArray.splice(0, 1);
        }
    },

    unload : function ()
    {
        this.removeAllChildren();

        this.stopAllTweens();
        this._tweenIdArray = null;

        this._npObject = null;
    }
});