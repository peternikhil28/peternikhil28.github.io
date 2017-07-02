
var NPSlotReelManager = NPGroup.extend({

    _anchorReel : null,
    _outerReel : null,

    _baseRadius : 0,
    _offsetRadius : 0,

    _reels : [],

    _symbolData : [],

    _result : null,

    _currentWinLineIndex : -1,
    _winAnimationTimerId : null,

    init : function ()
    {
      this._super();
    },

    setReels : function (x, y)
    {
        this.setPosition(x, y);

        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel] = new NPSlotReel();
            this._reels[reel]._reelId = reel;
            this.add(this._reels[reel]);
        }
    },

    setAnchorReel : function (x, y, width, height)
    {
        this._anchorReel = new NPRect(x, y, width, height);
    },

    setOuterReel : function (x, y, width, height)
    {
        this._outerReel = new NPRect(x, y, width, height);
    },

    setReelSize : function ()
    {
        var anchorReelRadius = this._anchorReel.getWidth()/2;
        var outerReelRadius = this._outerReel.getWidth()/2;
        var offsetRadius = outerReelRadius - anchorReelRadius;

        this._baseRadius = anchorReelRadius - (offsetRadius/2);
        this._offsetRadius = offsetRadius;
    },

    setReelData : function (reelData)
    {
        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].setReel(reelData[reel], this._baseRadius, this._offsetRadius);
        }
    },

    updateReels : function ()
    {
        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].updateReel();
        }
    },

    setInitialState : function (result)
    {
        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].setInitialState(result);
        }
    },

    startSpin : function (result)
    {
        this.reset();

        this._result = result;

        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].startSpin(result);
        }
    },

    stopSpin : function ()
    {
        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].stopSpin();
        }
    },

    onReelStopped : function (reelId)
    {

    },

    showWinLines : function ()
    {
        this._currentWinLineIndex = 0;
        this._winAnimationTimerId = setInterval(this.showWinAnimation.bind(this), 1000);
    },

    showWinAnimation : function ()
    {
        var winDetails = this._result._winDetails[this._currentWinLineIndex % this._result._winDetails.length];
        var line = winDetails._line;

        for(var index=0; index<line.length; index++)
        {
            var reel = line[index]%NPSlotUtils.NUM_REELS;
            var row = Math.floor(line[index]/NPSlotUtils.NUM_REELS);

            if(index < winDetails._numRecurrence)
            {
                this._reels[reel].animateSymbol(row);
            }
            else
            {
                break;
            }
        }

        this._currentWinLineIndex++;
    },

    reset : function ()
    {
        if(this._winAnimationTimerId!=null)
            clearInterval(this._winAnimationTimerId);
    }
});