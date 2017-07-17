
var NPScreenManager = NPClass.extend({

    _gameScene : null,

    _currentLayer : null,

    init:function ()
    {
        this._super();
    },

    loadScene : function (gameScene)
    {
        this._gameScene = gameScene;

        NPEngine.gamescene = gameScene;
    },

    loadNewScreen : function (screen)
    {
        this.removeCurrentLayer();

        this._currentLayer = screen;

        this._currentLayer.loadContent();
    },

    removeCurrentLayer : function ()
    {
        if(this._currentLayer != null)
        {
            this._gameScene.remove(this._currentLayer);

            this._currentLayer.unload();

            this._currentLayer = null;
        }
    },

    addCurrentLayer : function ()
    {
        this._gameScene.add(this._currentLayer);
    },

    reveal : function ()
    {
        this._currentLayer.onReveal();
        this.addCurrentLayer();
    }
});