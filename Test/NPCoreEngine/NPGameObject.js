/* Created by Nikhil Peter on 3/12/2018 */

"use strict";

class NPGameObject extends NPContainer
{
    constructor(assetFolder, layoutName)
    {
        super();

        this._buttonArray = [];

        this._assetFolder = assetFolder;
        this._layoutName = layoutName;
    }

    // -- Load Layout --
    loadContent()
    {
        this.loadLayout();
    }

    loadLayout()
    {
        this.layoutScreen(NPUtils.getResource(this._assetFolder + this._layoutName + '_Layout.json').data);
    }

    layoutScreen(inData)
    {
        this._assetName = inData.assetName;

        let objectDetails = inData.objects;

        for(let index=0; index<objectDetails.length; index++)
        {
            let objectData = objectDetails[index];

            let npObject;

            switch (objectData.type)
            {
                case "Sprite":
                    npObject = NPUtils.createSprite(this._assetFolder + this._assetName, objectData);
                    break;

                case "Animation":
                    npObject = NPUtils.createAnimation(this._assetFolder + this._assetName, objectData);
                    break;

                case "Button":
                    npObject = NPUtils.createButton(this._assetFolder + this._assetName, objectData);
                    npObject.addTouchListener(this.onButtonClicked.bind(this));
                    this._buttonArray.push(npObject);
                    break;

                case "Switch":
                    npObject = NPUtils.createSwitch(this._assetFolder + this._assetName, objectData);
                    npObject.addTouchListener(this.onButtonClicked.bind(this));
                    this._buttonArray.push(npObject);
                    break;

                case "Label":
                    npObject = NPUtils.createLabel(objectData);

                case "MultiText":
                    npObject = NPUtils.createMultiText(this._assetFolder + this._assetName, objectData);
                    break;

                default:
                    npObject = this.createCustomObject(objectData);
                    break;
            }

            if(npObject!=null)
            {
                this.addChild(npObject);
                this.onObjectCreated(npObject, objectData);
            }
        }

        this.onLayoutComplete();
    }

    createCustomObject(objectData)
    {

    }

    onObjectCreated(object, objectData)
    {

    }

    onLayoutComplete()
    {

    }


    onButtonClicked(target)
    {

    }

    destroy()
    {
        this._buttonArray.length = 0;

        super.destroy();
    }

}