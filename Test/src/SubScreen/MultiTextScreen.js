/**
 * Created by Nikhil Peter on 17-11-2018.
 */

class MultiTextScreen extends SubScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);

        this._textStyle = "fill=0xffffff; fontWeight=bold; stroke=#000000; strokeThickness=5; fontFamily=Arial;";
    }

    onObjectCreated(object, objectData)
    {
        switch (objectData.name)
        {
            case "txtMulti":
                this._multiText = object;
                this.setMultiText();
                break;
        }
    }

    setMultiText()
    {
        let length = NPUtils.getRandomInt(3, 15);

        let text = "";
        for(let count=0; count<length; count++)
        {
            if(NPUtils.getRandomInt(0, 1))
                text += "<Text  " + this._textStyle + "fontSize="+ NPUtils.getRandomInt(10, 40) + ";>" + this.getRandomText() + "</Text>";
            else
                text += "<Img src=Gem" + NPUtils.getRandomInt(1, 7) + ">"
        }

        this._multiText.text =  text;

        this._timeOutId = setTimeout(this.setMultiText.bind(this), 2000);
    }

    getRandomText()
    {
        return Math.random().toString(36).substring(NPUtils.getRandomInt(3, 7));
    }

    destroy()
    {
        if(this._timeOutId !== undefined)
            clearTimeout(this._timeOutId);

        super.destroy();
    }
}
