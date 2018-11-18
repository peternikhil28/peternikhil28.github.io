/* Created by Nikhil Peter on 11/18/2018 */

/*The content will inside the container having a specific Width and Height.
* If the content goes more than the container width then next content will go to next line.*/

let MultiTextRegX =  {

};

class NPMultiText extends NPContainer
{
    constructor(assetPath)
    {
        super();

        this._items = [];
        this._containerList = [];

        this._assetPath = assetPath;
    }

    set text (text)
    {
        this._text = text;

        this.removeAllChildren();

        this._items.length = 0;
        this._containerList.length = 0;

        text.match(/(<Text[\w\s=;#]*>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*<\/Text>)|(<Img[\w\s=;#]*>)/igm).map(this.parseData.bind(this));

        this.setHorizontal();
        this.setVertical();
    }

    parseData(data)
    {
        let tagName = data.trim().match(/<\w+ /)[0].slice(1, -1);

        let npObject;
        switch (tagName) {
            case "Text" :
                npObject = this.createText(data);
                break;

            case "Img" :
                npObject = this.createSprite(data);
                break;
        }

        this._items.push(npObject);
    }

    createText(data)
    {
        let style = {};
        data.match(/<[\w\s=;#]*>/ig)[0].replace(/\s/g,'').slice(5, -2).split(";").map((inData)=>
        {
            style[inData.split("=")[0]]= /[^0-9]/i.test(inData.split("=")[1]) ? inData.split("=")[1] : parseFloat(inData.split("=")[1]);
        });

        let text = data.match(/>[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]*</ig)[0].slice(1, -1);

        return new NPLabel(text, style);
    }

    createSprite(data)
    {
        let assetName = data.match(/=\w+>/ig)[0].slice(1, -1);

        let sprite = new NPSprite();
        sprite.setTexture(this._assetPath, assetName);

        return sprite;
    }

    setHorizontal()
    {
        let totalWidth = 0;
        for(let index=0; index<this._items.length; index++)
        {
            if(index === 0 || totalWidth >= this.display._width)
            {
                totalWidth = 0;
                this._containerList.push(new NPContainer());
            }
            this._items[index].position.x = this._items[index].display.width/2 + totalWidth;
            totalWidth += this._items[index].display.width;
            this._containerList[this._containerList.length - 1].addChild(this._items[index]);
        }
    }

    setVertical()
    {
        let totalHeight = 0;
        for(let index=0; index<this._containerList.length; index++)
        {
            this._containerList[index].position.x = -this._containerList[index].display.getBounds().width/2;
            this._containerList[index].position.y = -this.display._height/2 + this._containerList[index].display.height/2 + totalHeight;
            totalHeight += this._containerList[index].display.height;
            this.addChild(this._containerList[index]);
        }
    }

    destroy()
    {
        super.destroy();

        this._items.length = 0;
        this._containerList.length = 0;
    }
}