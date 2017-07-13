
NPEngine.screenWidth = 1280;
NPEngine.screenHeight = 720;


var params = new NPSlotParams();
params._assetFolder = "res/slotgame5x3/";
params._layoutName = "SlotGame";

var object = new NPLoader(new SlotGame5x3Machine(params), slotGame5x3ResList);


