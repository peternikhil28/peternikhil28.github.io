
var NPBasicObject = NPClass.extend({

    _geometry : null,
    _texture : null,
    _material : null,

    _clippingEnabled : false,

    _npObject : null,

    _tweenIdArray : null,

    init:function (width, height)
    {
        this._super();

        this._tweenIdArray = [];

        this.loadGeometry(width, height);
    },

    loadGeometry : function (width, height)
    {
        this._geometry = new THREE.PlaneGeometry(width, height, 0);
    },

    loadAsset : function (assetPath)
    {
        this._material = new THREE.MeshBasicMaterial( {map: NPEngine.loadedAssets[assetPath], transparent: true} );

        this._npObject = new THREE.Mesh( this._geometry, this._material );
    },

    loadTexture : function (assetPath)
    {
        this._npObject.material.map = NPEngine.loadedAssets[assetPath];
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

    setVisibility : function (boolean)
    {
        this._npObject.visible = boolean;
    },

    setClippingPlanes : function(planeList)
    {
        this._material.clippingPlanes = planeList;
        this._clippingEnabled = true;
    },

    addTouchListener : function (callBack)
    {
        NPEngine.gamescene.addTouchListener(this, callBack);
    },

    removeTouchListener : function ()
    {
        NPEngine.gamescene.removeTouchListener(this);
    },

    // -- Actions --

    actionScaleInout : function (duration, callBack)
    {
        var self = this;
        this.actionScale(duration/2, 0.7, function () {
            self.actionScale(duration/2, 1, callBack);
        });
    },

    actionScale : function (duration, inScale, callBack)
    {
        var current = {scale : this._npObject.scale.x};
        var target = {scale : inScale};

        var self = this;
        var action = new TWEEN.Tween(current)
            .to(target, duration * 1000)
            .onUpdate(function()
            {
                self._npObject.scale.set(current.scale, current.scale, 1);
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

    actionRotateBy : function (duration, rotateBy, repeat, callBack)
    {
        duration = duration || 0;
        rotateBy = rotateBy || 0;
        repeat = repeat || 0;


        var angle = this._npObject.rotation.z + (Math.PI/180) * rotateBy;

        var current = {rotate : this._npObject.rotation.z};
        var target = {rotate : angle};

        var self = this;
        var action = new TWEEN.Tween(current)
            .to(target, duration * 1000)
            .repeat(repeat)
            .onUpdate(function()
            {
                self._npObject.rotation.z = current.rotate;
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
        this.removeTouchListener();

        this.stopAllTweens();
        this._tweenIdArray = null;

        this._geometry = null;
        this._material = null;
        this._npObject = null;
    }
});