
var NPEngine = {};

NPEngine.screenWidth = null;
NPEngine.screenHeight = null;

NPEngine.loadedAssets = {};

NPEngine.gamescene = null;

NPEngine.camera = null;

NPEngine.renderer = null;

NPEngine.screenManager = NPEngine.screenManager || new NPScreenManager();

NPEngine.audioListener = null;
NPEngine.audioManager = NPEngine.audioManager || new NPAudioManager();