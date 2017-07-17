
var NPPoint = NPClass.extend({
    _x : 0,
    _y : 0,

   init : function (x, y)
   {
        this._super();

        this._x = x;
        this._y = y;
   },

    getX : function ()
    {
        return this._x;
    },

    getY : function ()
    {
        return this._y;
    }
});