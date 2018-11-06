/**
 * Created by Nikhil Peter on 06-11-2018.
 */

let PopperUtils = {

    NUM_ROWS : 5,
    NUM_COLS : 6,

    PROJECTILE_SPEED : 500,

    POPPER_DATA : [],
    LEVELS_DATA : null,

    GAME_SCREEN : null,

    setPopperDefinition(data)
    {
        data["Poppers"].map((data) => {
            let object = {};
            object["Name"] = data["Name"];
            object["AssetName"] = data["AssetName"];
            object["Strength"] = data["Strength"];
            PopperUtils.POPPER_DATA[data["Id"]] = object;
        });

        PopperUtils.LEVELS_DATA = data["Levels"];
    },

    getPopperData(popperId)
    {
        return PopperUtils.POPPER_DATA[popperId];
    }
};
