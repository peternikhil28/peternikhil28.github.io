
var NPAudioManager = NPClass.extend({

    _soundList : {},

    playSound : function (assetPath, loop, volume)
    {
        loop = loop || false;
        volume = volume || 1;

        var self =this;

        var sound = new THREE.Audio(NPEngine.audioListener);
        sound.setBuffer(NPEngine.loadedAssets[assetPath]);
        sound.setLoop(loop);
        sound.setVolume(volume);
        sound.onEnded = function () {
           self._soundList[assetPath] = null;
           delete self._soundList[assetPath];
        }
        sound.play();


        this._soundList[assetPath] = sound;
    },

    stopSound : function (assetPath)
    {
        if(this._soundList[assetPath]!=null)
            this._soundList[assetPath].stop();
    },

    stopAllSounds : function ()
    {
        for(var key in this._soundList)
        {
            if(this._soundList[key]!=null)
            {
                this._soundList[key].stop();
            }
        }
    }

});