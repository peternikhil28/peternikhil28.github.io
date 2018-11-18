/**
 * Created by Nikhil Peter on 18-11-2018.
 */

class SubScreen extends NPGameScreen
{
    constructor(assetFolder, layoutName)
    {
        super(assetFolder, layoutName);
    }

    onReveal()
    {
        NPEngine.screenManager.addScreen(new Hud("res/Hud/", "Hud"));
    }
}