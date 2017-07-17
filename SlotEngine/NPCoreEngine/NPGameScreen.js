
var NPGameScreen = NPClass.extend({

    _npObject : null,

    _assetFolder : "",
    _layoutName: "",

    _children : null,

    _buttonArray : null,

    init:function (assetPath, layoutName)
    {
        this._super();

        this._children = [];

        this._buttonArray = [];

        this._npObject = new THREE.Object3D();

        this._assetFolder = assetPath;
        this._layoutName = layoutName;
    },

    getDisplayObject : function ()
    {
        return this._npObject;
    },

    add : function (object)
    {
        this._npObject.add(object.getDisplayObject());

        this._children.push(object);
    },

    remove : function (object)
    {
        this._npObject.remove(object.getDisplayObject());
        object.unload();

        this._children.splice(this._children.indexOf(object), 1);
    },

    removeAllChildren :  function ()
    {
        while(this._children.length > 0)
        {
            this._npObject.remove(this._children[0].getDisplayObject());
            this._children[0].unload();

            this._children.splice(0, 1);
        }
    },

    // -- Load Layout --
    loadContent : function ()
    {
        this.loadLayout();
    },

    loadLayout : function ()
    {
        NPUtils.loadFile(this._assetFolder + this._layoutName + '_Layout.json', this.onLayoutLoaded.bind(this));
    },

    onLayoutLoaded : function (inData)
    {
        var data = JSON.parse(inData);
        var objectDetails = data.objects;

        for(var index=0; index<objectDetails.length; index++)
        {
            var objectData = objectDetails[index];

            var npObject;

            switch (objectData.type)
            {
                case "bo":
                    npObject = NPUtils.createBasicObject(this._assetFolder, objectData);
                    break;

                case "Button":
                    npObject = NPUtils.createButton(this._assetFolder, objectData);
                    npObject.addTouchListener(this.onButtonClicked.bind(this));
                    this._buttonArray.push(npObject)
                    break;

                case "Label":
                    break;

                default:
                    npObject = this.createCustomObject(objectData);
                    break;
            }

            if(npObject!=null)
            {
                this.add(npObject);
                this.onObjectCreated(npObject, objectData);
            }
        }

        this.onLayoutComplete();
    },

    createCustomObject : function (objectData)
    {

    },

    onObjectCreated : function (object, objectData)
    {

    },

    onLayoutComplete : function ()
    {
        NPEngine.screenManager.reveal();
    },

    onReveal : function ()
    {

    },


    onButtonClicked : function (target)
    {

    },

    unload : function ()
    {
        NPEngine.audioManager.stopAllSounds();

        this.removeAllChildren();

        this._buttonArray.length = 0;
    }

});