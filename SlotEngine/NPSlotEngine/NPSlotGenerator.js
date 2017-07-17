
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

            result._peakSymbolIndex[reel] = randIndex;

            for(var row=0; row<NPSlotUtils.NUM_ROWS; row++)
            {
                var index = (randIndex + 1) + row;
                result._spinGenerated[reel + row * NPSlotUtils.NUM_COL] = reelData[index % reelData.length];
            }
        }

        console.log(result._peakSymbolIndex.join());
        console.log(result._spinGenerated.join());
    }
});