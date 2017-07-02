
var NPAudioManager = NPClass.extend({

    _soundList : {},
    _audioLoader : null,
    init : function ()
    {
        this._super();

        this._audioLoader = new THREE.AudioLoader();
    },

    playSound : function (path, loop, volume)
    {
        loop = loop || false;
        volume = volume || 1;

        var sound = new THREE.Audio(NPEngine.audioListener);

        var self =this;
        this._audioLoader.load(path, function( buffer ) {
            sound.setBuffer(buffer);
            sound.setLoop(loop);
            sound.setVolume(volume);
            sound.onEnded = function () {
                self._soundList[path] = null;
                delete self._soundList[path];
            }
            sound.play();
        });

        this._soundList[path] = sound;
    },

    stopSound : function (path)
    {
        if(this._soundList[path]!=null)
            this._soundList[path].stop();
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