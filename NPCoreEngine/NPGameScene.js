
var NPGameScene = NPClass.extend({
    _scene: null,
    _camera: null,
    _renderer: null,

    _raycaster : null,
    _mouse : null,
    _buttonArray : null,

    _assetFolder : "",
    _layoutName: "",

    init:function (assetPath, layoutName)
    {
        this._super();

        this._buttonArray = [];

        this._assetFolder = assetPath;
        this._layoutName = layoutName;

        this.loadScene();
        this.loadCamera();
        this.loadRendered();

        this.loadRaycaster();
        this.loadMouse();

        this.loadAudioListener();
    },

    loadScene : function ()
    {
        this._scene = new THREE.Scene();
    },

    loadCamera : function ()
    {
        this._camera = new THREE.PerspectiveCamera(70, NPEngine.screenWidth/NPEngine.screenHeight, 0.1, 720);
        this._camera.position.set(NPEngine.screenWidth/2, NPEngine.screenHeight/2, 500);
    },

    loadRendered : function () {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(NPEngine.screenWidth, NPEngine.screenHeight, false);

        document.body.appendChild(this._renderer.domElement);
    },

    loadRaycaster : function ()
    {
        this._raycaster = new THREE.Raycaster();
    },

    loadMouse : function ()
    {
        this._mouse = new THREE.Vector2();
    },

    loadAudioListener : function ()
    {
        NPEngine.audioListener = new THREE.AudioListener();
        this._camera.add(NPEngine.audioListener);
    },

    startRender : function()
    {
        var loader = document.getElementById("loader");
        loader.remove();
        
        this.render();
    },

    render : function ()
    {
        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(this.render.bind(this));
        TWEEN.update();
    },

    setLocalClippingEnabled : function (boolean)
    {
        this._renderer.localClippingEnabled = boolean;
    },

    add : function (object)
    {
        this._scene.add(object.getDisplayObject());
    },

    // -- Load Layout --
    loadContent : function ()
    {
        this.loadLayout();
    },

    loadLayout : function ()
    {
        var loader = new THREE.FileLoader();
        loader.load(this._assetFolder + this._layoutName + '_Layout.json', this.onLayoutLoaded.bind(this));
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
        this._renderer.domElement.addEventListener( 'click', this.onMouseClick.bind(this), false );
    },

    //-- Button Click --

    onMouseClick : function( event )
    {
        var rect = this._renderer.domElement.getBoundingClientRect();
        this._mouse.x = ((event.offsetX) / (rect.width)) * 2 - 1;
        this._mouse.y = - ((event.offsetY) / (rect.height)) * 2 + 1;

        this._raycaster.setFromCamera(this._mouse, this._camera);

        for ( var i = 0; i < this._buttonArray.length; i++ )
        {
            var intersect = this._raycaster.intersectObject(this._buttonArray[i].getDisplayObject());

            if(intersect.length!=0 && this._buttonArray[i].clickEnabled())
            {
                this.onButtonClicked(this._buttonArray[i]);
            }
        }
    },

    onButtonClicked : function (target)
    {

    },

    // -- Actions --

    actionMoveCameraTo : function (finalpos, duration, delay, callBack)
    {
        var cameraPositon = this._camera.position;

        var current = {x : cameraPositon.x, y : cameraPositon.y, z : cameraPositon.z};
        var target = {x : finalpos.x, y : finalpos.y, z : finalpos.z};

        var self = this;
        var tweenScale = new TWEEN.Tween(current)
            .to(target, duration * 1000)
            .delay(delay * 1000)
            .onUpdate(function()
            {
                self._camera.position.set(current.x, current.y, current.z);
            })
            .onComplete(function()
            {
                if(callBack)
                {
                    callBack();
                }
            });
        tweenScale.start();
    }
});