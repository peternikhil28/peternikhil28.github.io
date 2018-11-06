"use strict";

let NPUtils ={

    gameData : {},

    createSprite(assetPath, objectData)
    {
        let npObject = new NPSprite();
        npObject.name = objectData.name;
        npObject.setSize(objectData.w, objectData.h);
        npObject.setTexture(assetPath, objectData.name);
        npObject.position.set(objectData.x, objectData.y);
        return npObject;
    },

    createAnimation(assetPath, objectData)
    {
        let npObject = new NPSprite();
        npObject.name = objectData.name;
        npObject.setSize(objectData.w, objectData.h);
        npObject.loadAnimation(assetPath, objectData.name);
        npObject.position.set(objectData.x, objectData.y);
        return npObject;
    },

    createButton(assetPath, objectData)
    {
        let npObject = new NPButton();
        npObject.name = objectData.name;
        npObject.setSize(objectData.w, objectData.h);
        npObject.setTexture(assetPath, objectData.name);
        npObject.position.set(objectData.x, objectData.y);
        return npObject;
    },

    createSwitch(assetPath, objectData)
    {
        let npObject = new NPSwitch();
        npObject.name = objectData.name;
        npObject.setSize(objectData.w, objectData.h);
        npObject.setTexture(assetPath, objectData.name);
        npObject.position.set(objectData.x, objectData.y);
        return npObject;
    },

    createLabel(objectData)
    {
        let npObject = new NPLabel("", objectData.style);
        npObject.name = objectData.name;
        //npObject.setSize(objectData.w, objectData.h);
        npObject.position.set(objectData.x, objectData.y);
        return npObject;
    },

    getTexture(assetPath, objectName)
    {
        let offsetID = "_0";
        let assetNum = 0;

        let texture;

        let textureFound = false;

        while(NPUtils.getResource(assetPath + offsetID + assetNum + ".json") !== undefined)
        {
            if(NPUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".png"] !== undefined)
            {
                textureFound = true;
                break;
            }

            assetNum++;

            if(assetNum >= 10)
                offsetID = "_";
        }

        if(textureFound)
            texture = NPUtils.getResource(assetPath + offsetID + assetNum + ".json").textures[objectName + ".png"];
        else
        {
            if(NPUtils.getResource(assetPath + "_" + objectName + ".jpg") !== undefined)
                texture = NPUtils.getResource(assetPath + "_" + objectName + ".jpg").texture;
            else
                    console.log("Texture Not Found : " + objectName);
        }

        return texture;
    },

    cloneObject(object)
    {
        let cloneData = JSON.parse(JSON.stringify(object));
        return cloneData;
    },

    getResource(resPath)
    {
        return PIXI.loader.resources[resPath];
    },

    load(resPath, callBack)
    {
        PIXI.loader.add(resPath, function(loader)
        {
            callBack(loader.data);
        });
    },

    getRandomInt(min, max) // min and max both included
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    getRandomFloat(min, max) // min and max both included
    {
        return Math.random() * (max - min) + min;
    },

    getUrlVars()
    {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
            });
        return vars;
    },

    cloneJSON(obj)
    {
        return JSON.parse(JSON.stringify(obj))
    },

    postImage()
    {
        let canvasData = NPEngine.renderer.view.toDataURL("image/png");
        let ajax = new XMLHttpRequest();
        ajax.open("POST",'/pr/custom/testSave.php',false);
        ajax.setRequestHeader('Content-Type', 'application/upload');
        ajax.send(canvasData );
    },

    saveCanvasScreenShot(view)
    {
        this.changeResolution(view, 480, 270);
    },

    changeResolution(view, width, height)
    {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(view, 0, 0, width, height);

        let link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 0.7);
        link.download = 'b.png';
        link.click();
    },

    changeColorStrength(col, amt)
    {

        let usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        let num = parseInt(col,16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return "0x" + (g | (b << 8) | (r << 16)).toString(16);

    },

    checkMobile()
    {
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        )
            return true;
        else
            return false;
    },

    checkCollision(a, b)
    {
        let ab = a.getBounds();
        let bb = b.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    },

    toggleFullScreen()
    {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
};