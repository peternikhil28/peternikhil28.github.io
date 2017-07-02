
var NPBasicObject = NPClass.extend({

    _geometry : null,
    _texture : null,
    _material : null,

    _clippingEnabled : false,

    _npObject : null,

    init:function (width, height)
    {
        this._super();

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

    getX : function (x)
    {
        return this._npObject.position.x;
    },

    getY : function (y)
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
        var tweenScale = new TWEEN.Tween(current)
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
            });
        tweenScale.start();
    }
});