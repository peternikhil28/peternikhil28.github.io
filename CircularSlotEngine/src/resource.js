
var slotGameRes = {
    Ace : "Ace.png",
    Bg : "Bg.jpg",
    Cherry : "Cherry.png",
    Jack : "Jack.png",
    King : "King.png",
    Nine : "Nine.png",
    Orange : "Orange.png",
    Queen : "Queen.png",
    ReelBg : "ReelBg.png",
    ReelFrame : "ReelFrame.png",
    Spin01 : "Spin01.png",
    Spin02 : "Spin02.png",
    Stop01 : "Stop01.png",
    Stop02 : "Stop02.png",
    Strawberry : "Strawberry.png",
    Ten : "Ten.png",
    Wild : "Wild.png",
    ReelStop_mp3 : "ReelStop.mp3",
    ReelSpin_mp3 : "ReelSpin.mp3",
    Win_mp3 : "Win.mp3",
    Intro_mp3 : "Intro.mp3"
};

var slotGameResList = [];
for(var key in slotGameRes)
{
    slotGameResList.push("res/slotgame5x3/" + slotGameRes[key]);
}