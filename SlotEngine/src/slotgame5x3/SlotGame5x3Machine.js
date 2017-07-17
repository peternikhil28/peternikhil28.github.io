
var SlotGame5x3Machine = NPSlotMachine.extend({

    init : function (params)
    {
        this._super(params);
    },
    initSlotParams : function ()
    {
        NPSlotUtils.NUM_REELS = 5;
        NPSlotUtils.NUM_COL = 5;
        NPSlotUtils.NUM_ROWS = 3;
        NPSlotUtils.SYMBOL_WILD = 0;

        NPSlotUtils.FIRST_REEL_SPIN_DURATION = 2.5 ;
        NPSlotUtils.OFFSET_REEL_SPIN_DURATION = 0.2;
        NPSlotUtils.SYMBOLS_SPINNING_PER_SEC = 20;
        NPSlotUtils.REVERSE_SPIN_DISTANCE_FACTOR = 0.8;
        NPSlotUtils.REVERSE_SPIN_DURATION = 0.2;

        NPSlotUtils.MACHINE = this;
    },

    onReveal : function()
    {
        this._super();

        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame5x3Res.Intro_mp3)
    },

    playReelSpinSound : function ()
    {
        NPEngine.audioManager.stopAllSounds();
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame5x3Res.ReelSpin_mp3, true);
    },

    stopReelSpinSound : function ()
    {
        NPEngine.audioManager.stopSound(this._machineParams._assetFolder + slotGame5x3Res.ReelSpin_mp3);
    },

    playReelStopSound : function ()
    {
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame5x3Res.ReelStop_mp3);
    },

    playWinSound : function ()
    {
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame5x3Res.Win_mp3);
    }
})