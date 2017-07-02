
var NPGroup = NPClass.extend({

    _clippingEnabled : false,
    _clippingPlaneList : null,

    _npObject : null,

    init:function ()
    {
        this._super();

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

        if(this._clippingEnabled)
            object.setClippingPlanes(this._clippingPlaneList);
    },

    remove : function (object)
    {
        this._npObject.remove(object.getDisplayObject());
    },

    convertToNodeSpace : function (x, y)
    {
        var newX = x - this.getX();
        var newY = y - this.getY();

        var point = new NPPoint(newX, newY);

        return point;
    },

    removeAllChildren :  function ()
    {
        while(this._npObject.children.length > 0)
        {
            this._npObject.remove(this._npObject.children[0]);
        }
    }
});