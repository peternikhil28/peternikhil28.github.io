
var SlotGame5x3Machine = NPSlotMachine.extend({

    initSlotParams : function ()
    {
        NPSlotUtils.NUM_REELS = 5;
        NPSlotUtils.NUM_ROWS = 3;
        NPSlotUtils.SYMBOL_WILD = 0;
        NPSlotUtils.CAMERA_ZOOM_IN_POS = 110;
        NPSlotUtils.CAMERA_ZOOM_DURATION = 2;
        NPSlotUtils.MACHINE = this;
    },

    onDataLoaded : function (inData)
    {
        this._super(inData);

        var self = this;
        setTimeout(function(){
            NPEngine.audioManager.playSound(self._machineParams._assetFolder + slotGameRes.Intro_mp3)
        }, 1100);
    },

    playReelSpinSound : function ()
    {
        NPEngine.audioManager.stopAllSounds();
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGameRes.ReelSpin_mp3, true);
    },

    stopReelSpinSound : function ()
    {
        NPEngine.audioManager.stopSound(this._machineParams._assetFolder + slotGameRes.ReelSpin_mp3);
    },

    playReelStopSound : function ()
    {
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGameRes.ReelStop_mp3);
    },

    playWinSound : function ()
    {
        NPEngine.audioManager.playSound(this._machineParams._assetFolder + slotGameRes.Win_mp3);
    }
})