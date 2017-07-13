
var NPSlotResult = function () {
  this._peakSymbolIndex = [];
  this._spinGenerated = [];
  this._winDetails = [];
};

var NPSlotWinResult = function () {
    this._line = [];
    this._winSymbol = -1;
    this._numRecurrence = 0;
}

var NPSlotEvaluator = NPClass.extend({

    _slotLines : null,
    _payout : null,

    _result : null,
    init : function ()
    {
        this._super();

        this._slotLines = [];
        this._payout = [];

        this._result = new NPSlotResult();
    },

    reset : function ()
    {
        this._result._peakSymbolIndex.length = 0;
        this._result._spinGenerated.length = 0;
        this._result._winDetails.length = 0;
    },

    evaluate : function ()
    {
        for(var num=0; num<this._slotLines.length; num++)
        {
            var line = this._slotLines[num];
            var spinGenerated = this._result._spinGenerated;

            var numRecurrence = 0;

            var winSymbol, col = 0;

            do
            {
                winSymbol = spinGenerated[line[col]];
                col++;
            }while(winSymbol==NPSlotUtils.SYMBOL_WILD && col < NPSlotUtils.NUM_REELS);

            numRecurrence = col;

            if(winSymbol!=NPSlotUtils.SYMBOL_WILD)
            {
                for(var index=col; index<line.length; index++)
                {
                    if(winSymbol == spinGenerated[line[index]] || spinGenerated[line[index]] == NPSlotUtils.SYMBOL_WILD)
                        numRecurrence++;
                    else
                        break;
                }
            }

            if(numRecurrence >= 3)
            {
                var winResult = new NPSlotWinResult();
                winResult._line = line;
                winResult._winSymbol = winSymbol;
                winResult._numRecurrence = numRecurrence;
                this._result._winDetails.push(winResult);
            }
        }
    }
});