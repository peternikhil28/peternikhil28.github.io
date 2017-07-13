
var NPLoader = NPClass.extend({
    _scene: null,
    _resource: null,

    _textureLoader: null,
    _audioLoader: null,

    _resIndex : 0,

   init : function (scene, res)
   {
        this._super();

        this._scene = scene;
        this._resource = res;

        this._textureLoader = new THREE.TextureLoader();
        this._audioLoader = new THREE.AudioLoader();

        this.load();
   },

   load:function ()
   {
        if(this._resIndex < this._resource.length)
        {
            this.loadResource(this._resource[this._resIndex]);
            this._resIndex++;
        }
        else
        {
            this.loadScene();
        }
   },

    loadResource : function (resPath)
    {
        var format = resPath.split('.').pop();
        var loader;

        switch (format)
        {
            case "png":
            case "jpg":
                loader = this._textureLoader;
                break;

            case "mp3":
                loader = this._audioLoader;
                break;
        }

        var self = this;
        loader.load(resPath,

            // Function when resource is loaded
            function ( data )
            {
                NPEngine.loadedAssets[resPath] = data;
                self.load();
            },

            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // Function called when download errors
            function ( xhr ) {
                console.error( 'An error loading ' + resPath );
            }
        );
    },

    loadScene : function ()
    {
        this._scene.loadContent();
    }
});