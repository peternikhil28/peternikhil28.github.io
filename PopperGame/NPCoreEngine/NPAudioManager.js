"use strict";

class NPAudioManager
{
    constructor()
    {
        this._soundList = {};

        this._soundsCount = 0;
        this._onCompleteCallback = null;
    }

    loadSounds(soundList, callback)
    {
        this._onCompleteCallback = callback;

        this._soundsCount = soundList.length - 1;

        let self = this;
        soundList.map(function (soundPath) {

            let sound = new Howl({
                src: [soundPath]
            });

            sound.once('load', function(){
                self._soundList[soundPath] = sound;

                self._soundsCount--;

                if(self._soundsCount === 0 && self._onCompleteCallback !== null)
                    self._onCompleteCallback.call();
            });
        });
    }

    getSound(assetPath)
    {
        let sound;
        if(this._soundList[assetPath] !== undefined)
        {
            sound = this._soundList[assetPath];
        }
        else
        {
            sound = new Howl({
                src: [assetPath]
            });

            this._soundList[assetPath] = sound;
        }

        return sound;
    }

    playSound(assetPath, loop, volume)
    {
        loop = loop || false;
        volume = volume || 1;

        let sound = this.getSound(assetPath);

        sound.loop(loop);
        sound.volume(volume);

        let soundData = {};
        soundData.Id = sound.play();
        soundData.sound = sound;

        return soundData;
    }

    fade(soundData, duration, from, to)
    {
        soundData.sound.fade(from, to, duration, soundData.Id);
    }

    stopSound(soundData)
    {
        soundData.sound.stop(soundData.Id);
    }

    stopAllSounds()
    {
        for(let key in this._soundList)
        {
            if(this._soundList[key]!=null)
            {
                this._soundList[key].stop();
            }
        }
    }

    mute(boolean)
    {
        Howler.volume(boolean ? 0 : 1);
    }
}