
var MainScreen = NPGameScreen.extend({

    init:function (assetPath, layoutName)
    {
        this._super(assetPath, layoutName);
    },

    onReveal : function()
    {
        this._super();

        NPEngine.audioManager.playSound(this._assetFolder + mainScreenRes.BgMusic, true);
    },

    onButtonClicked : function (target)
    {
        switch(target.getName())
        {
            case "BtnAqua":
                var params = new NPSlotParams();
                params._assetFolder = "res/slotgame16x4/";
                params._layoutName = "SlotGame";

                var machine = new SlotGame16x4Machine(params);
                NPEngine.screenManager.loadNewScreen(new LoadingScreen(machine, slotGame16x4ResList));
                break;

            case "BtnForest":
                var params = new NPSlotParams();
                params._assetFolder = "res/slotgame5x3/";
                params._layoutName = "SlotGame";

                var machine = new SlotGame5x3Machine(params);
                NPEngine.screenManager.loadNewScreen(new LoadingScreen(machine, slotGame5x3ResList));
                break;

            case "BtnBeach":
                var params = new NPSlotParams();
                params._assetFolder = "res/slotgame3x3/";
                params._layoutName = "SlotGame";

                var machine = new SlotGame3x3Machine(params);
                NPEngine.screenManager.loadNewScreen(new LoadingScreen(machine, slotGame3x3ResList));
                break;
        }
    },
});