"use strict";

class NPGameScene extends NPContainer
{
    constructor()
    {
        super();

        this.loadRenderer();

        this.loadStats();

        this.loadTicker();

        this.startRender();
    }

    loadRenderer()
    {
        this._renderer = PIXI.autoDetectRenderer(NPEngine.screenWidth, NPEngine.screenHeight, { transparent: true});

        NPEngine.renderer = this._renderer;

        document.body.appendChild(this._renderer.view);
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.onWindowResize();
    }

    loadStats()
    {
        this._stats = new Stats();
        document.body.appendChild( this._stats.dom );
    }

    loadTicker()
    {
        NPEngine.ticker = new Ticker();
    }

    onWindowResize()
    {
        let documentElement = document.documentElement;

        if( documentElement.clientWidth > (NPEngine.screenWidth / NPEngine.screenHeight) * documentElement.clientHeight)
        {
            this._renderer.view.style.width =  (NPEngine.screenWidth / NPEngine.screenHeight) * documentElement.clientHeight + "px";
            this._renderer.view.style.height = documentElement.clientHeight + "px";
        }
        else
        {
            this._renderer.view.style.width =  documentElement.clientWidth + "px";
            this._renderer.view.style.height = documentElement.clientWidth * (NPEngine.screenHeight / NPEngine.screenWidth) + "px";
        }
    }

    startRender()
    {
        this.render();
    }

    render(timestamp)
    {
        requestAnimationFrame(this.render.bind(this));

        TWEEN.update();

        let dt = this._prevTime === undefined ? 0 : (timestamp - this._prevTime)/1000;

        NPEngine.ticker.render(dt);

        this._prevTime = timestamp;

        this._renderer.render(this.display);

        this._stats.update();
    }
}

class Ticker
{
    constructor()
    {
        this._ticker = [];
    }

    add(fn, context)
    {
        let obj = {};
        obj.fn = fn;
        obj.context = context;

        this._ticker.push(obj);
    }

    remove(fn, context)
    {
        let index = this._ticker.length;
        while(index--)
        {
            if(this._ticker[index].fn === fn || this._ticker[index].context === context)
            {
                this._ticker.splice(index, 1);
            }
        }
    }

    render(dt)
    {
        for (let index = 0; index < this._ticker.length; index++)
            this._ticker[index].fn.call(this._ticker[index].context, dt);
    }
}