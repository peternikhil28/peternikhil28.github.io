
var NPUtils ={

    createBasicObject : function (assetFolder, objectData)
    {
        var assetFormat = NPEngine.loadedAssets[assetFolder + objectData.name + ".png"]!=null ? ".png" : ".jpg";

        var npObject = new NPBasicObject(objectData.w, objectData.h);
        npObject.loadAsset(assetFolder + objectData.name + assetFormat);
        npObject.setPosition(objectData.x, objectData.y);
        return npObject;
    },

    createButton : function (assetFolder, objectData)
    {
        var npObject = new NPButton(objectData.w, objectData.h);
        npObject.setButtonAsset(assetFolder, objectData.name);
        npObject.setPosition(objectData.x, objectData.y);
        return npObject;
    }
}