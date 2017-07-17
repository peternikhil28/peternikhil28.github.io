
var NPButton = NPBasicObject.extend({

    _assetFolder : "",
    _name : "",

    _clickEnabled : true,

    init: function (width, height)
    {
        this._super(width, height);
    },

    getName : function (name)
    {
        return this._name;
    },

    setButtonAsset : function (assetFolder, name)
    {
        this._assetFolder = assetFolder;
        this._name = name;

        var assetPath = this._assetFolder + this._name + "01.png";
        this.loadAsset(assetPath);
    },

    setClickEnabled : function (boolean)
    {
        this._clickEnabled = boolean;

        var frame;
        if(this._clickEnabled)
            frame = "01";
        else
            frame = "02";

        var assetPath = this._assetFolder + this._name + frame + ".png";
        this.loadTexture(assetPath);
    },

    clickEnabled : function ()
    {
        return this._clickEnabled;
    }

});