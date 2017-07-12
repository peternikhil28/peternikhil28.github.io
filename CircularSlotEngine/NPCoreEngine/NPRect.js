
var NPRect = NPClass.extend({

    _x : 0,
    _y : 0,
    _width : 0,
    _height : 0,

   init : function (x, y, width, height)
   {
       this._super();

       this._x = x;
       this._y = y;
       this._width = width;
       this._height = height;
   },

    getX : function ()
    {
        return this._x;
    },

    getY : function ()
    {
        return this._y;
    },

    getWidth : function ()
    {
        return this._width;
    },

    getHeight: function ()
    {
        return this._height;
    },
});