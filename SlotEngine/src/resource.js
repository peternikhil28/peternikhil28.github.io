
var slotGame5x3Res = {
    Ace : "Ace.png",
    Bg : "Bg.jpg",
    Crab : "Crab.png",
    Jack : "Jack.png",
    King : "King.png",
    Mermaid : "Mermaid.png",
    Merman : "Merman.png",
    Nine : "Nine.png",
    Fish : "Fish.png",
    Queen : "Queen.png",
    ReelBg : "ReelBg.png",
    Spin01 : "Spin01.png",
    Spin02 : "Spin02.png",
    Turtle : "Turtle.png",
    Ten : "Ten.png",
    Wild : "Wild.png",
    Intro_mp3 : "Intro.mp3",
    ReelStop_mp3 : "ReelStop.mp3",
    ReelSpin_mp3 : "ReelSpin.mp3",
    Win_mp3 : "Win.mp3"
};

var slotGame5x3ResList = [];
for(var key in slotGame5x3Res)
{
    slotGame5x3ResList.push("res/slotgame5x3/" + slotGame5x3Res[key]);
}