/* Created by Nikhil Peter on 3/15/2018 */

NPEvents = {};

NPEvents.COIN_UPDATE = "COIN_UPDATE";

NPEvents.API_CONNECTOR_CANVAS = "API_CONNECTOR_CANVAS";

NPEvents.API_CONNECTOR_WEB = "API_CONNECTOR_WEB";

let NPEventHandler = {

    addEventListener(event, callback)
    {
        document.addEventListener(event, callback);
    },

    dispatchEvent(event, data)
    {
        let e = new CustomEvent(event, { detail : data });
        document.dispatchEvent(e);
    },
};