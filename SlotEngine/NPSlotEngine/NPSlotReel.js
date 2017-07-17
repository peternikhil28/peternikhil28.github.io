
var NPSlotSpinStates = {
    SPINNING : 0,
    REVERSING : 1,
    STOPPED : 2,
};

var NPSlotSymbol = function ()
{
    this.assetPath = "";
    this.width = -1;
    this.height = -1;
};


var NPSlotReel = NPGroup.extend({

    _reelId : -1,
    _reel : null,
    _reelLength : -1,

    _anchorY : 0,
    _symbolHeight : 0,

    _spinState : null,
    _reelSpinDuration : 0,
    _finalY : 0,

    _reelSymbols : null,
    _reelAssets : null,
    _peakSymbolIndex : -1,
    _prevPeakSymbolIndex : -1,

    init : function ()
    {
        this._super();

        this._reel = [];
        this._reelSymbols = [];
        this._reelAssets = [];
        this._spinState = NPSlotSpinStates.STOPPED;
    },

    setReel:function (reelData)
    {
        this._reel = reelData;
        this._reelLength = reelData.length;
    },

    setAnchorY : function (yPos)
    {
        this._anchorY = yPos;
    },

    setSymbolHeight : function (height)
    {
        this._symbolHeight = height;
    },

    setInitialState : function (result)
    {
        this._peakSymbolIndex = result._peakSymbolIndex[this._reelId];

        for(var row=1; row<=NPSlotUtils.NUM_ROWS; row++)
        {
            // No peak symbol for initial state
            var index = (this._peakSymbolIndex + row) % this._reelLength;
            this._reelSymbols.push(this._reel[index])
        }

        this.addSymbolsToReel();
    },

    constructReel : function (result)
    {
        this._prevPeakSymbolIndex = this._peakSymbolIndex;

        this._peakSymbolIndex = result._peakSymbolIndex[this._reelId];


        // -- Add current spin result and peak symbol --
        for(var row=0; row<=NPSlotUtils.NUM_ROWS; row++)
        {
            this.pushSymbolToReel(this._peakSymbolIndex + row);
        }


        // -- Add symbols in between --
        var length = this.calculateReelLength();
        for(var i=NPSlotUtils.NUM_ROWS; i<=length; i++)
        {
            this.pushSymbolToReel(this._peakSymbolIndex + i);
        }


        // -- Add previous spin result and peak symbol --
        for(var row=0; row<=NPSlotUtils.NUM_ROWS; row++)
        {
            this.pushSymbolToReel(this._prevPeakSymbolIndex + row);
        }

        this.addSymbolsToReel();

        this._finalY = this._anchorY - this._reelAssets[1].getY();
    },

    calculateReelLength : function ()
    {
        this._reelSpinDuration = NPSlotUtils.FIRST_REEL_SPIN_DURATION + (this._reelId * NPSlotUtils.OFFSET_REEL_SPIN_DURATION);
        var totalLength = this._reelSpinDuration * NPSlotUtils.SYMBOLS_SPINNING_PER_SEC;

        return totalLength;
    },

    pushSymbolToReel : function (pos)
    {
        var index = (pos) % this._reelLength;
        this._reelSymbols.push(this._reel[index]);
    },

    addSymbolsToReel : function ()
    {
        var initY = - (this._symbolHeight * (NPSlotUtils.NUM_ROWS - 1));

        for (var index=this._reelSymbols.length-1, count=0; index>=0; index--, count++)
        {
            var symbol = this._reelSymbols[index];

            var symbolAsset = NPSlotUtils.createSymbolAsset(symbol);

            var posY = initY + (count * this._symbolHeight);
            symbolAsset.setY(posY);
            this.add(symbolAsset);

            this._reelAssets.unshift(symbolAsset);
        }
    },

    startSpin : function ()
    {
        this._spinState = NPSlotSpinStates.SPINNING;

        this.updateReel(NPSlotSpinStates.SPINNING)
    },

    updateReel : function (spinState)
    {
        switch (spinState)
        {
            case NPSlotSpinStates.SPINNING :
                var reverseSpinDist = NPSlotUtils.REVERSE_SPIN_DISTANCE_FACTOR * this._symbolHeight;
                var reversePos = this._finalY - reverseSpinDist;
                this.actionMoveTo(this.getX(), reversePos, this._reelSpinDuration, 0 , this.updateReel.bind(this, NPSlotSpinStates.REVERSING));
                break;

            case NPSlotSpinStates.REVERSING :
                this.actionMoveTo(this.getX(), this._finalY, NPSlotUtils.REVERSE_SPIN_DURATION, 0 , this.updateReel.bind(this, NPSlotSpinStates.STOPPED));
                break;

            case NPSlotSpinStates.STOPPED :
                NPSlotUtils.MACHINE.onReelStopped(this._reelId);
                if(this._reelId == NPSlotUtils.NUM_REELS -1)
                {
                    NPSlotUtils.MACHINE.onSpinCompleted();
                }
                break;
        }
    },

    animateSymbol : function (row)
    {
        this._reelAssets[row+1].actionScaleInout(1);
    },

    reset : function ()
    {
        this.removeAllChildren();
        this._reelSymbols.length = 0;
        this._reelAssets.length = 0;

        this._finalY = 0;
        this.setY(this._anchorY);
    }
});