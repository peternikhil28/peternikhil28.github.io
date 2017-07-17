
var LoadingScreen = NPLoader.extend({

    init : function (screen, res)
    {
        this._super(screen, res);

        this._assetFolder = "res/LoadingScreen/";
        this._layoutName = "LoadingScreen";
    },

    onObjectCreated : function (object, objectData)
    {
        switch(objectData.name)
        {
            case "LoadIcon":
                object.actionRotateBy(1, 360, Infinity);
                break;
        }
    }
});