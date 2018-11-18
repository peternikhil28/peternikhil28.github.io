"use strict";

let NPEngine = {};

NPEngine.screenWidth = null;
NPEngine.screenHeight = null;

NPEngine.loadedAssets = {};

NPEngine.gamescene = null;

NPEngine.camera = null;

NPEngine.renderer = null;

NPEngine.ticker = null;

NPEngine.isMobile = NPUtils.checkMobile();

NPEngine.screenManager = NPEngine.screenManager || new NPScreenManager();

NPEngine.audioManager = NPEngine.audioManager || new NPAudioManager();

NPEngine.server = NPEngine.server || new NPServer();

NPEngine.coinManager = NPEngine.coinManager || new NPCoinManager();