/**
 * Created by Nikhil Peter on 17-11-2018.
 */

class MenuScreen extends NPGameScreen
{
    onButtonClicked(target)
    {
        let screen;

        switch (target.name)
        {
            case "btnCardGame" :
                screen = new CardGame("res/CardGame/", "CardGame");
                break;

            case "btnMultiText" :
                screen = new MultiTextScreen("res/MultiTextScreen/", "MultiTextScreen");
                break;

            case "btnFire" :
                screen = new FireScreen("res/FireScreen/", "FireScreen");
                break;
        }

        NPEngine.screenManager.loadNewScreen(screen);
    }
}
