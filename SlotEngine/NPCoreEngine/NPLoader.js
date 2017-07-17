
var NPLoader = NPGameScreen.extend({
    _screen: null,
    _resource: null,

    _textureLoader : null,
    _audioLoader : null,

    _resIndex : -1,

   init : function (screen, res)
   {
        this._super();

        this._screen = screen;
        this._resource = res;

        this._textureLoader = new THREE.TextureLoader();
        this._audioLoader = new THREE.AudioLoader();
   },

   loadContent : function ()
   {
       this._super();
       this.load();
   },

   load:function ()
   {
       this._resIndex++;
        if(this._resIndex < this._resource.length)
        {
            this.loadResource(this._resource[this._resIndex]);
        }
        else
        {
            this.loadComplete();
        }
   },

    loadResource : function (resPath)
    {
        if(NPEngine.loadedAssets[resPath]!=null)
        {
            this.load();
            return;
        }

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

            default :
                console.log("Unknown format loaded");
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

    loadComplete : function ()
    {
        this.loadScreen();
    },

    loadScreen : function ()
    {
        NPEngine.screenManager.loadNewScreen(this._screen);
    }
});