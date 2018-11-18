/* Created by Nikhil Peter on 3/9/2018 */

class NPLabel extends NPSprite
{
    constructor(text, style)
    {
        super();

        this._npObject = new PIXI.Text(text, style);

        this.setAnchor(0.5, 0.5);
    }

    set text(text)
    {
        this._npObject.text = text;
    }

    get text()
    {
        return this._npObject.text;
    }

    set style(style)
    {
        this._npObject.style = style;
    }

    get style()
    {
        return this._npObject.style;
    }

    updateText(duration, from, to, onUpdate, onComplete)
    {
        let current = {value : from};
        let target = {value : to};

        let onUpdateCalled = {};

        let self = this;
        let action = new TWEEN.Tween(current)
            .to(target, duration)
            .onUpdate(function()
            {
                self.text = Math.floor(current.value).toLocaleString();

                if(onUpdate && onUpdateCalled[Math.floor(current.value).toString()] != true)
                {
                    onUpdate(Math.floor(current.value));

                    onUpdateCalled[Math.floor(current.value).toString()] = true;
                }
            })
            .onComplete(function()
            {
                if(onComplete)
                {
                    onComplete();
                }
                self._tweenIdArray.splice(self._tweenIdArray.indexOf(action), 1);
            });
        action.start();

        this._tweenIdArray.push(action);

        return action;
    }
}