
var NPSlotUtils ={
    NUM_REELS : -1,
    NUM_ROWS : -1,
    SYMBOL_WILD : -1,

    MAX_REEL_VELOCITY : 5,
    MIN_REEL_VELOCITY : 1,
    FIRST_REEL_STOP_DURATION : 1.5,
    OFFSET_REEL_STOP_DURATION : 2,
    REVERSE_SPIN_DISTANCE_FACTOR : 20,

    CAMERA_ZOOM_IN_POS : 0,
    CAMERA_ZOOM_DURATION : 0,

    MACHINE : null,

    createSymbolAsset: function(symbol)
    {
        var assetPath = NPSlotUtils.MACHINE._reelManager._symbolData[symbol].assetPath;
        var width = NPSlotUtils.MACHINE._reelManager._symbolData[symbol].width;
        var height = NPSlotUtils.MACHINE._reelManager._symbolData[symbol].height;

        var npObject = new NPBasicObject(width, height);
        npObject.loadAsset(assetPath);
        return npObject;
    }
};

var NPSlotParams = function () {
    this._assetFolder = "";
    this._layoutName = "";
};