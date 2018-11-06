"use strict";

class NPGameScreen extends NPGameObject
{
    onLayoutComplete()
    {
        NPEngine.screenManager.reveal(this);
    }

    onReveal()
    {

    }

    removeScreen()
    {
        NPEngine.screenManager.removeScreen(this);
    }
}