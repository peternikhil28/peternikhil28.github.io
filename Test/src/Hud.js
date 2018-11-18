/**
 * Created by Nikhil Peter on 18-11-2018.
 */

class Hud extends NPGameScreen
{
    onObjectCreated(object, objectData)
    {
        switch (objectData.name)
        {
            case "btnBack":
                object.display.buttonMode = true;
                object.display.interactive = true;
                object.display.on('pointerup', this.onBackClicked.bind(this));
                break;
        }
    }

    onBackClicked()
    {
        NPEngine.screenManager.loadNewScreen( new MenuScreen("res/MenuScreen/", "MenuScreen"));
    }
}
