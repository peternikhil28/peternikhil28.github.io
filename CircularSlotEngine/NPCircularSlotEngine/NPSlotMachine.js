
var NPSlotMachine = NPGameScene.extend({

    _machineParams : null,
    _machineData : null,

    _generator : null,
    _evaluator : null,
    _reelManager : null,

    _cameraPosition : {zoomIn : null, zoomOut : null},
    _initCameraMoveComplete : false,

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
        NPSlotUtils.NUM_ROWS = 3;
        NPSlotUtils.SYMBOL_WILD = 0;
        NPSlotUtils.CAMERA_ZOOM_IN_POS = 110;
        NPSlotUtils.CAMERA_ZOOM_DURATION = 2;
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
                this._reelManager.setReels(objectData.x, objectData.y);
                this.add(this._reelManager);
                break;

            case "AnchorReel":
                this._reelManager.setAnchorReel(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "OuterReel":
                this._reelManager.setOuterReel(objectData.x, objectData.y, objectData.w, objectData.h);
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
            case "Stop":
                this._stopButton = object;
                object.setVisibility(false);
                break;
            case "ReelFrame" :
                object.getDisplayObject().renderOrder = 999;
                break;
        }
    },

    onLayoutComplete : function()
    {
        this._super();

        this._reelManager.setReelSize();

        this._cameraPosition.zoomOut = new THREE.Vector3(this._camera.position.x, this._camera.position.y, this._camera.position.z);

        var posX = this._camera.position.x - this._reelManager._baseRadius - (Math.floor(NPSlotUtils.NUM_REELS/2)*this._reelManager._offsetRadius)
        this._cameraPosition.zoomIn =  new THREE.Vector3(posX, NPEngine.screenHeight/2, NPSlotUtils.CAMERA_ZOOM_IN_POS);

        this.loadSymbolDefinition();
    },

    loadSymbolDefinition : function ()
    {
        var loader = new THREE.FileLoader();
        loader.load(this._machineParams._assetFolder + 'SymbolDefinition.json', this.onDataLoaded.bind(this));
    },

    onDataLoaded:function(inData)
    {
        var data = JSON.parse(inData);
        this._machineData = data;

        var symbols = data.symbols;

        for(var i=0; i<symbols.length; i++)
        {
            var symbolData = new NPSlotSymbolDetails();
            var id = symbols[i].id;

            symbolData.assetPath = this._machineParams._assetFolder + symbols[i].assetName;
            symbolData.width = symbols[i].w;
            symbolData.height = symbols[i].h;

            this._reelManager._symbolData[id] = symbolData;
        }

        this._reelManager.setReelData(data.reels);

        this._evaluator._slotLines = data.lines;

        this.setInitialState();

        this.startRender();

        this.actionMoveCameraTo(this._cameraPosition.zoomIn, NPSlotUtils.CAMERA_ZOOM_DURATION, 2, this.initCameraMoveComplete.bind(this));
    },

    setInitialState : function ()
    {
        this.generate();
        this._reelManager.setInitialState(this._evaluator._result);
    },

    initCameraMoveComplete : function ()
    {
        this._initCameraMoveComplete = true;
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
        if(!this._initCameraMoveComplete)
            return;

          switch(target.getName())
          {
              case "Spin":
                  this.spinButtonClicked();
                  break;

              case "Stop":
                  this.stopButtonClicked();
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
        this.actionMoveCameraTo(this._cameraPosition.zoomOut, NPSlotUtils.CAMERA_ZOOM_DURATION, 0, this.cameraZoomOutComplete.bind(this));
    },

    cameraZoomOutComplete : function ()
    {
        this._stopButton.setVisibility(true);
        this._spinButton.setVisibility(false);
        this._stopButton.setClickEnabled(true);
    },

    stopButtonClicked : function ()
    {
        this._stopButton.setClickEnabled(false);

        this._reelManager.stopSpin()

        this.actionMoveCameraTo(this._cameraPosition.zoomIn, NPSlotUtils.CAMERA_ZOOM_DURATION, 0, this.cameraZoomInComplete.bind(this));
    },

    cameraZoomInComplete : function ()
    {

    },

    onReelStopped : function (reelId)
    {
        this._reelManager.onReelStopped(reelId);
        this.playReelStopSound(reelId);
    },

    onSpinCompleted : function ()
    {
        this._spinButton.setVisibility(true);
        this._stopButton.setVisibility(false);
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


    render : function ()
    {
        this._reelManager.updateReels();
        this._super();
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