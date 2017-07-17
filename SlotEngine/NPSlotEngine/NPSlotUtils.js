
var NPSlotUtils ={
    NUM_REELS : -1,
    NUM_ROWS : -1,
    NUM_COL : -1,
    SYMBOL_WILD : -1,

    FIRST_REEL_SPIN_DURATION : 2 ,
    OFFSET_REEL_SPIN_DURATION : 0.2,
    SYMBOLS_SPINNING_PER_SEC : 20,
    REVERSE_SPIN_DISTANCE_FACTOR : 0.5,
    REVERSE_SPIN_DURATION : 0.2,

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