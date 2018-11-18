"use strict";

class NPLoader
{
   constructor()
   {
       this._resource = [];
       this._soundResources = [];

       this._fontList = [];

       this._onLoadComplete = null;
   }

    load(res, callback)
    {
        this._resource = res;
        this._onLoadComplete = callback;

        this.splitResources();
        this.loadResource();
    }

    splitResources()
    {
        let index = this._resource.length;

        while(index--)
        {
            if(this._resource[index].split('.')[1] === 'mp3')
                this._soundResources.push(this._resource.splice(index, 1)[0]);
        }

        let self = this;
        this._resource.map(function (resPath) {
            if(resPath.split('.')[1] === 'ttf')
                self._fontList.push(resPath);
        })
    }

    loadResource()
    {
        if(this._soundResources.length > 0)
        {
            this._completeIndex = 2;
            NPEngine.audioManager.loadSounds(this._soundResources, this.loadComplete.bind(this));
        }
        else
            this._completeIndex = 1;

        PIXI.loader.add(this._resource).load(this.loadComplete.bind(this));
    }

    loadComplete()
    {
        if(!--this._completeIndex)
            this.onResourceLoad();
    }

    onResourceLoad()
    {
        if(this._fontList.length > 0)
            this.loadFontList();

        this.invokeCallback();
    }

    loadFontList()
    {
        let fontNameList = [];

        let self = this;
        this._fontList.map(function(url){
            let fontName = url.replace(/^.*[\\\/]/, '').split('.')[0];
            self.loadFont(fontName, url);

            fontNameList.push(fontName);
        });

        WebFont.load({
            custom: {
                families: fontNameList
            }
        });
    }

    loadFont(fontName, url)
    {
        let newStyle = document.createElement('style');
        newStyle.appendChild(document.createTextNode("\
        @font-face {\
            font-family: " + fontName + ";\
            src: url('" + url + "') format('truetype');\
        }\
        "));

        document.head.appendChild(newStyle);
    }

    invokeCallback()
    {
        if(this._onLoadComplete !== null)
            this._onLoadComplete();
    }

    destroy()
    {
        this._resource.length = 0;
        this._resource = null;

        this._soundResources.length = 0;
        this._soundResources = null;
    }
}