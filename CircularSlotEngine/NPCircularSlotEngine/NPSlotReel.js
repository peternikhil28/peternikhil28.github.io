
var NPSlotSpinStates = {
    STEADY : 0,
    SPINNING : 1,
    REVERSING : 2,
    STOPPING : 3,
    STOPPED : 4
};

var NPSlotSymbolDetails = function ()
{
    this.assetPath = "";
    this.width = -1;
    this.height = -1;
};

var NPSlotSymbol = function ()
{
    this.symbol = null;
    this.angle = 0;
};


var NPSlotReel = NPGroup.extend({

    _reelId : -1,
    _reel : null,
    _reelLength : -1,
    _radius : 0,


    _spinState : null,
    _reelVelocity : 0,

    _reelAssets : null,
    _topSymbolIndex : -1,
    _centerSymbolIndex : -1,

    init : function ()
    {
        this._super();

        this._reel = [];
        this._reelAssets = [];
        this._spinState = NPSlotSpinStates.STEADY;
    },

    setReel:function (reelData, baseRadius, offsetRadius)
    {
        this._reel = reelData;
        this._reelLength = reelData.length;
        this._radius = baseRadius + offsetRadius * ((NPSlotUtils.NUM_REELS - 1) - this._reelId);
        this.addSymbolsToReel();
    },

    addSymbolsToReel : function ()
    {
        for (var index=0; index<this._reelLength; index++)
        {
            var symbol = this._reel[index];

            var symbolAsset = NPSlotUtils.createSymbolAsset(symbol);

            this.add(symbolAsset);

            var object = new NPSlotSymbol();
            object.symbol = symbolAsset;

            this._reelAssets[index] = object;
        }
    },


    setInitialState : function (result)
    {
        this._centerSymbolIndex = (result._topSymbolIndex[this._reelId] + Math.floor(NPSlotUtils.NUM_ROWS/2)) % this._reelLength;
        this.positionReelAtIndex();
    },

    positionReelAtIndex : function ()
    {
        for (var i=0; i<this._reelLength; i++)
        {
            var index = (this._centerSymbolIndex + i) % this._reelLength;

            var angle = i * (360/this._reel.length);

            var posX =-this._radius * Math.cos(angle * Math.PI/180);
            var posY =-this._radius * Math.sin(angle * Math.PI/180);

            this._reelAssets[index].symbol.setPosition(posX, posY);
            this._reelAssets[index].angle = angle;
        }
    },

    startSpin : function (result)
    {
        this._topSymbolIndex = result._topSymbolIndex[this._reelId];
        this._centerSymbolIndex = (result._topSymbolIndex[this._reelId] + Math.floor(NPSlotUtils.NUM_ROWS/2)) % this._reelLength;

        this._reelVelocity = 0;
        this.tweenVelocity(NPSlotUtils.MAX_REEL_VELOCITY, 2);

        this._spinState = NPSlotSpinStates.SPINNING;
    },

    tweenVelocity : function (velocity, duration, callBack)
    {
        var current = {velocity : this._reelVelocity};
        var target = {velocity : velocity};

        var self = this;
        var tweenScale = new TWEEN.Tween(current)
            .to(target, duration * 1000)
            .onUpdate(function()
            {
                self._reelVelocity = current.velocity;
            })
            .onComplete(function()
            {
                if(callBack)
                {
                    callBack();
                }
            });
        tweenScale.start();
    },

    spin : function ()
    {
        for (var index=0; index<this._reelLength; index++)
        {
            this._reelAssets[index].angle +=this._reelVelocity;

            var angle = this._reelAssets[index].angle;

            var posX =-this._radius * Math.cos(angle * Math.PI/180);
            var posY =-this._radius * Math.sin(angle * Math.PI/180);

            this._reelAssets[index].symbol.setPosition(posX, posY);
        }
    },

    stopSpin : function ()
    {
        this.positionReelAtIndex();
        var self = this;
        this.tweenVelocity(NPSlotUtils.MIN_REEL_VELOCITY, NPSlotUtils.FIRST_REEL_STOP_DURATION + (this._reelId * NPSlotUtils.OFFSET_REEL_STOP_DURATION), function () {
            self._spinState = NPSlotSpinStates.STOPPING;
        });
    },

    stopping : function ()
    {
        this.spin();

        for (var index=0; index<this._reelLength; index++)
        {
            var symbol = this._reelAssets[index].symbol;

           if(index == this._centerSymbolIndex && symbol.getX()<=0 && symbol.getY()<=-NPSlotUtils.REVERSE_SPIN_DISTANCE_FACTOR)
            {
                this._reelVelocity *=-NPSlotUtils.MIN_REEL_VELOCITY/2;
                this._spinState = NPSlotSpinStates.REVERSING;
                break;
            }
        }
    },

    reversing : function ()
    {
        this.spin();

        for (var index=0; index<this._reelLength; index++)
        {
            var symbol = this._reelAssets[index].symbol;

            if(index == this._centerSymbolIndex && symbol.getX()<=0 && symbol.getY()>=0 )
            {
                this._spinState = NPSlotSpinStates.STOPPED;
                this.positionReelAtIndex();
                break;
            }
        }
    },

    updateReel : function ()
    {
        switch (this._spinState)
        {
            case NPSlotSpinStates.SPINNING :
                this.spin();
                break;

            case NPSlotSpinStates.STOPPING :
                this.stopping();
                break;
            case NPSlotSpinStates.REVERSING :
                this.reversing();
                break;

            case NPSlotSpinStates.STOPPED :
                NPSlotUtils.MACHINE.onReelStopped(this._reelId);
                if(this._reelId == NPSlotUtils.NUM_REELS -1)
                {
                    NPSlotUtils.MACHINE.onSpinCompleted();
                }
                this._spinState = NPSlotSpinStates.STEADY;
                break;

            case NPSlotSpinStates.STEADY :
                break;
        }
    },

    animateSymbol : function (row)
    {
        this._reelAssets[(this._topSymbolIndex + row)%this._reelLength].symbol.actionScaleInout(1);
    }
});