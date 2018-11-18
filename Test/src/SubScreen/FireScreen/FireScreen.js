/**
 * Created by Nikhil Peter on 18-11-2018.
 */

class FireScreen extends SubScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);
    }

    createCustomObject(objectData)
    {
        switch(objectData.type)
        {
            case "Particle" :
                let fire = new FireParticle(this._assetFolder);
                return fire;
        }
    }

}
