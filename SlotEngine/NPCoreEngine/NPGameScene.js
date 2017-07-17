
var NPListenerObject = function ()
{
    this._object = null;
    this._callBack = null;

    this.setListener = function(object, callBack)
    {
        this._object = object;
        this._callBack = callBack;
    };

    this.getObject = function()
    {
        return this._object;
    };

    this.invokeCallBack = function()
    {
        if(this._callBack!=null)
        {
            this._callBack(this._object);
        }
    };
};

var NPGameScene = NPClass.extend({

    _scene: null,
    _camera: null,
    _renderer: null,

    _raycaster : null,
    _pointer : null,

    _listenerArray : null,

    init:function ()
    {
        this._super();

        this._listenerArray = [];

        this.loadScene();
        this.loadCamera();
        this.loadRendered();

        this.loadAudioListener();

        this.loadRaycaster();
        this.loadTouchPointer();

        this.setLocalClippingEnabled(true);

        this.startRender();
    },

    loadScene : function ()
    {
        this._scene = new THREE.Scene();
    },

    loadCamera : function ()
    {
        this._camera = new THREE.OrthographicCamera(0, NPEngine.screenWidth, NPEngine.screenHeight, 0, 0, 100);

        NPEngine.camera = this._camera;
    },

    loadRendered : function () {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(NPEngine.screenWidth, NPEngine.screenHeight, false);

        NPEngine.renderer = this._renderer;

        document.body.appendChild(this._renderer.domElement);
    },

    loadAudioListener : function ()
    {
        NPEngine.audioListener = new THREE.AudioListener();
        this._camera.add(NPEngine.audioListener);
    },

    loadRaycaster : function ()
    {
        this._raycaster = new THREE.Raycaster();
    },

    loadTouchPointer : function ()
    {
        this._pointer = new THREE.Vector2();
    },

    startRender : function()
    {
        this._renderer.domElement.addEventListener( 'click', this.onTouch.bind(this), false );

        this._renderer.domElement.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        
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

    add : function (screen)
    {
        this._scene.add(screen.getDisplayObject());
    },

    remove : function (screen)
    {
        this._scene.remove(screen.getDisplayObject());
    },

    //-- Touch Handler --

    addTouchListener : function (object, callBack)
    {
        var listener = new NPListenerObject();
        listener.setListener(object, callBack);

        this._listenerArray.push(listener);
    },

    removeTouchListener : function (object)
    {
        for(var index=0; index<this._listenerArray.length; index++)
        {
            if(this._listenerArray[index].getObject() == object)
            {
                this._listenerArray.splice(index, 1);
                break;
            }
        }
    },

    onTouch : function( event )
    {
        var rect = this._renderer.domElement.getBoundingClientRect();
        this._pointer.x = ((event.offsetX) / (rect.width)) * 2 - 1;
        this._pointer.y = - ((event.offsetY) / (rect.height)) * 2 + 1;

        this._raycaster.setFromCamera(this._pointer, this._camera);

        for ( var i = 0; i < this._listenerArray.length; i++ )
        {
            var intersect = this._raycaster.intersectObject(this._listenerArray[i].getObject().getDisplayObject());

            if(intersect.length!=0 && this._listenerArray[i].getObject().clickEnabled())
            {
                this._listenerArray[i].invokeCallBack();
            }
        }
    },

    onMouseMove : function( event )
    {
        var rect = this._renderer.domElement.getBoundingClientRect();
        this._pointer.x = ((event.offsetX) / (rect.width)) * 2 - 1;
        this._pointer.y = - ((event.offsetY) / (rect.height)) * 2 + 1;

        this._raycaster.setFromCamera(this._pointer, this._camera);

        for ( var i = 0; i < this._listenerArray.length; i++ )
        {
            var intersect = this._raycaster.intersectObject(this._listenerArray[i].getObject().getDisplayObject());

            if(intersect.length!=0 && this._listenerArray[i].getObject().clickEnabled())
            {
                this._renderer.domElement.style.cursor = 'pointer';
                break;
            }
            else
            {
                this._renderer.domElement.style.cursor = 'default';
            }
        }
    }
});