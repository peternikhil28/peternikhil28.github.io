
var BlankLoader = NPLoader.extend({

    init : function ()
    {
        this._super();

        this._resource = loadRes;
    },

    loadComplete : function ()
    {
        var loader = document.getElementById("loader");
        loader.remove();

        NPEngine.load();
    }
});