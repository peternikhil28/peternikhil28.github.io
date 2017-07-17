
var NPSlotMachine = NPGameScreen.extend({

    _machineParams : null,
    _machineData : null,

    _generator : null,
    _evaluator : null,
    _reelManager : null,

    init : function (params)
    {
        this._super(params._assetFolder, params._layoutName);

        this._machineParams = params;

        this.initSlotParams();

        this.loadGenerator();
        this.loadEvaluator();
        this.loadReelManager();
    },

    initSlotParams : function ()
    {
        NPSlotUtils.NUM_REELS = 5;
        NPSlotUtils.NUM_COL = 5;
        NPSlotUtils.NUM_ROWS = 3;
        NPSlotUtils.SYMBOL_WILD = 0;
        NPSlotUtils.MACHINE = this;
    },

    loadGenerator : function ()
    {
        this._generator = new NPSlotGenerator();
    },

    loadEvaluator : function ()
    {
        this._evaluator = new NPSlotEvaluator();
    },

    loadReelManager : function ()
    {
        this._reelManager = new NPSlotReelManager();
    },

    createCustomObject : function (objectData)
    {
        switch (objectData.name)
        {
            case "MachineHolder":
                this._reelManager.setPosition(objectData.x, objectData.y);
                this._reelManager.setReelClipping(objectData.x, objectData.y, objectData.w, objectData.h);
                this.add(this._reelManager);
                break;

            case "Icon00":
                this._reelManager.setAnchorSymbol(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "Icon01":
                this._reelManager.setRightSymbol(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "Icon10":
                this._reelManager.setBottomSymbol(objectData.x, objectData.y, objectData.w, objectData.h);
                break;
        }
    },

    onObjectCreated : function (object, objectData)
    {
        switch(objectData.name)
        {
            case "Spin":
                this._spinButton = object;
                break;
        }
    },

    onLayoutComplete : function()
    {
        this._reelManager.setSymbolSize();

        this.loadSymbolDefinition();
    },

    loadSymbolDefinition : function ()
    {
        NPUtils.loadFile(this._machineParams._assetFolder + 'symbolDefinition.json', this.onDataLoaded.bind(this));
    },

    onDataLoaded:function(inData)
    {
        var data = JSON.parse(inData);
        this._machineData = data;

        var symbols = data.symbols;

        for(var i=0; i<symbols.length; i++)
        {
            var symbolData = new NPSlotSymbol();
            var id = symbols[i].id;

            symbolData.assetPath = this._machineParams._assetFolder + symbols[i].assetName;
            symbolData.width = symbols[i].w;
            symbolData.height = symbols[i].h;

            this._reelManager._symbolData[id] = symbolData;
        }

        this._reelManager.setReels(data.reels);

        this._evaluator._slotLines = data.lines;

        var payout = data.payout;

        this.setInitialState();

        NPEngine.screenManager.reveal();
    },

    setInitialState : function ()
    {
        this.generate();
        this._reelManager.setInitialState(this._evaluator._result);
    },

    generate : function ()
    {
        this._generator.generate(this._evaluator._result, this._machineData.reels);
    },

    evaluate : function ()
    {
        this._evaluator.evaluate();
    },

    onButtonClicked : function (target)
    {
          switch(target.getName())
          {
              case "Spin":
                  this.spinButtonClicked();
                  break;

              case "BackBtn":
                  var mainScreen = new MainScreen("res/mainscreen/", "MainScreen");
                  NPEngine.screenManager.loadNewScreen(new LoadingScreen(mainScreen, mainScreenResList));
                  break;
          }
    },

    spinButtonClicked : function ()
    {
        this._spinButton.setClickEnabled(false);

        this.reset();

        this.generate();
        this.evaluate();
        this._reelManager.startSpin(this._evaluator._result);

        this.playReelSpinSound();
    },

    onReelStopped : function (reelId)
    {
        this.playReelStopSound(reelId);
    },

    onSpinCompleted : function ()
    {
        this._spinButton.setClickEnabled(true);

        if(this._evaluator._result._winDetails.length > 0)
        {
            this._reelManager.showWinLines();
            this.playWinSound();
        }

        this.stopReelSpinSound();
    },

    reset : function ()
    {
        this._evaluator.reset();
    },

    // -- Sounds --

    playReelSpinSound : function ()
    {

    },

    stopReelSpinSound : function ()
    {

    },

    playReelStopSound : function (reelId)
    {

    },

    playWinSound : function ()
    {

    }
});