/**
 * Created by Nikhil Peter on 08-11-2017.
 */

class NPServer
{
    constructor()
    {
        this._lastRequest = null;
    }

    getRequest(theUrl, callback)
    {
        if(navigator.onLine)
        {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.responseText);
            };
            xmlHttp.open("GET", theUrl, true); // true for asynchronous
            xmlHttp.send(null);
        }
        else
        {
           this.notifyNoInternet(this.getRequest.bind(this, theUrl, callback));
        }
    }

    postRequest(url, data, callback)
    {
        if(navigator.onLine)
        {
            let json = JSON.stringify(data);

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                if (xhr.readyState == 4 && xhr.status == 200)
                    callback(xhr.responseText);
            };
            xhr.send(json);
        }
        else
        {
            this.notifyNoInternet(this.postRequest.bind(this, url, data, callback));
        }
    }

    notifyNoInternet(lastRequest)
    {
        this._lastRequest = lastRequest;

        this._intervalID = setInterval(this.checkInternet.bind(this), 200);
    }

    checkInternet()
    {
        if(navigator.onLine)
        {
            clearInterval(this._intervalID);

            this._lastRequest();
        }
    }

    formatParams( params )
    {
        return "?" + Object
                .keys(params)
                .map(function(key){
                    return key+"="+encodeURIComponent(params[key])
                })
                .join("&")
    }
}