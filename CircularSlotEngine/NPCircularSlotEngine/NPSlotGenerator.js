
var NPSlotGenerator = NPClass.extend({

    init:function ()
    {
        this._super();
    },

    generate : function (result, reels)
    {
        for(var reel=0; reel<NPSlotUtils.NUM_REELS; reel++)
        {
            var reelData = reels[reel];
            var randIndex = Math.floor(Math.random() * (reelData.length - 1));
            // var cheat = [5,1,19,13,6];
            // var randIndex = cheat[reel];

            result._topSymbolIndex[reel] = randIndex;

            for(var row=0; row<NPSlotUtils.NUM_ROWS; row++)
            {
                var index = randIndex + row;
                result._spinGenerated[reel + row * NPSlotUtils.NUM_REELS] = reelData[index % reelData.length];
            }
        }

        console.log(result._topSymbolIndex.join());
        console.log(result._spinGenerated.join());
    }
});