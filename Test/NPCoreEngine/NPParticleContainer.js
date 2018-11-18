/* Created by Nikhil Peter on 4/30/2018 */
"use strict";

class NPParticleContainer extends NPContainer
{
    constructor()
    {
        super();

        this.init();

        NPEngine.ticker.add(this.render, this);
    }

    init()
    {
        this._proton = new Proton();

        this._renderer = new Proton.PixiRenderer(this.display);
        this._proton.addRenderer(this._renderer);

        Proton.USE_CLOCK = true;
    }

    addEmitter(emitter)
    {
        this._proton.addEmitter(emitter);
    }

    stopAllEmitters()
    {
        let emitters = this._proton.emitters;

        emitters.map(function (emitter) {
            emitter.stop();
        });
    }

    render()
    {
        this._proton.update();
    }

    destroy()
    {
        super.destroy();

        this._proton.destroy();
    }
}