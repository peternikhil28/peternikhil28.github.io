
var NPSlotReelManager = NPGroup.extend({

    _anchorSymbol : null,
    _rightSymbol : null,
    _bottomSymbol : null,

    _symbolSize : null,

    _reels : [],

    _symbolData : [],

    _result : null,

    _currentWinLineIndex : -1,
    _winAnimationTimerId : null,

    init : function ()
    {
      this._super();
    },

    setReelClipping : function (x, y, width, height)
    {
        var planes = []
        planes.push(new THREE.Plane(new THREE.Vector3(0, -1, 0), y + (height/2)));
        planes.push(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(y - (height/2))));

        this.setClippingPlanes(planes);
    },

    setAnchorSymbol : function (x, y, width, height)
    {
        var point = this.convertToNodeSpace(x, y);

        this._anchorSymbol = new NPRect(point.getX(), point.getY(), width, height);
    },

    setRightSymbol : function (x, y, width, height)
    {
        var point = this.convertToNodeSpace(x, y);

        this._rightSymbol = new NPRect(point.getX(), point.getY(), width, height);
    },

    setBottomSymbol : function (x, y, width, height)
    {
        var point = this.convertToNodeSpace(x, y);

        this._bottomSymbol = new NPRect(point.getX(), point.getY(), width, height);
    },

    setSymbolSize : function ()
    {
        var width = this._rightSymbol.getX() - this._anchorSymbol.getX();
        var height = this._anchorSymbol.getY() - this._bottomSymbol.getY();

        this._symbolSize = new NPRect(0, 0, width, height);
    },

    setReels : function (reelData)
    {
        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel] = new NPSlotReel();
            this._reels[reel].setReel(reelData[reel]);
            this._reels[reel].setSymbolHeight(this._anchorSymbol.getHeight());
            this._reels[reel]._reelId = reel;
            this.add(this._reels[reel]);

            this.setReelPositions(reel);
        }
    },

    setReelPositions : function (reel)
    {
        var col = reel % NPSlotUtils.NUM_COL;
        var row = Math.floor(reel / NPSlotUtils.NUM_COL);

        var xPos = this._anchorSymbol.getX() + (this._symbolSize.getWidth() * col);
        var yPos = this._anchorSymbol.getY() - (this._symbolSize.getHeight() * row);
        this._reels[reel].setAnchorY(yPos);
        this._reels[reel].setPosition(xPos, yPos);

        if(NPSlotUtils.NUM_REELS != NPSlotUtils.NUM_COL)
        {
            var yOffset = this.getY() + yPos;
            var planes = []
            planes.push(new THREE.Plane(new THREE.Vector3(0, -1, 0), yOffset + (this._anchorSymbol.getHeight()/2)));
            planes.push(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(yOffset - (this._anchorSymbol.getHeight()/2))));

            this._reels[reel].setClippingPlanes(planes);
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
            this._reels[reel].reset();
            this._reels[reel].constructReel(result);

            this._reels[reel].startSpin();
        }
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
    },

    unload : function ()
    {
        this.reset();
        this._super();
    }
});