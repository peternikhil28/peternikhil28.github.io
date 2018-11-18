/* Created by Nikhil Peter on 3/9/2018 */

class NPCoinManager
{
    constructor()
    {
        this._coins = 0;
    }

    set coins(coins)
    {
        let data = {currentValue : coins, previousValue : this._coins};
        NPEventHandler.dispatchEvent(NPEvents.COIN_UPDATE, data);

        this._coins = coins;
    }

    get coins()
    {
        return this._coins;
    }
}