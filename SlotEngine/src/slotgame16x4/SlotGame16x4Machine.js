
var SlotGame16x4Machine = NPSlotMachine.extend({

    init : function (params)
    {
        this._super(params);
    },
    initSlotParams : function ()
    {
        NPSlotUtils.NUM_REELS = 16;
        NPSlotUtils.NUM_COL = 4;
        NPSlotUtils.NUM_ROWS = 1;
        NPSlotUtils.SYMBOL_WILD = 0;

        NPSlotUtils.FIRST_REEL_SPIN_DURATION = 2 ;
        NPSlotUtils.OFFSET_REEL_SPIN_DURATION = 0.2;
        NPSlotUtils.SYMBOLS_SPINNING_PER_SEC = 10;
        NPSlotUtils.REVERSE_SPIN_DISTANCE_FACTOR = 0.5;
        NPSlotUtils.REVERSE_SPIN_DURATION = 0.2;

        NPSlotUtils.MACHINE = this;
    },

    onReveal : function()
    {
        this._super();

        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame16x4Res.Intro_mp3)
    },

    playReelSpinSound : function ()
    {
        NPEngine.audioManager.stopAllSounds();
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame16x4Res.ReelSpin_mp3, true);
    },

    stopReelSpinSound : function ()
    {
        NPEngine.audioManager.stopSound(this._machineParams._assetFolder + slotGame16x4Res.ReelSpin_mp3);
    },

    playReelStopSound : function ()
    {
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame16x4Res.ReelStop_mp3);
    },

    playWinSound : function ()
    {
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGame16x4Res.Win_mp3);
    }
})