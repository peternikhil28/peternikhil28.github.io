/* Created by Nikhil Peter on 5/25/2018 */

class NPEventManager
{
    constructor()
    {
        this._eventList = [];
    }

    pushEvent(func, delay)
    {
        delay = delay || 0;
    
        let event = {method : func, delay : delay};
        this._eventList.push(event);
    }
    
    invokeNextEvent()
    {
        if(this._eventList.length > 0)
        {
            let event = this._eventList.shift();
    
            if(event.delay > 0)
                NPUtils.setTimeout(event.method, event.delay);
            else
                event.method.call();
        }
    }
    
    clearAllEvents()
    {
        this._eventList.length = 0;
    }
}