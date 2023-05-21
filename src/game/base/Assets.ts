import { AssetManager } from "../../library";
import ball_blue from "../../../../assets/images/ball-blue.png";
import brick_red from "../../../../assets/images/brick-red.png";
import brick_metal from "../../../../assets/images/brick-metal.png";
import background from "../../../../assets/images/background.png";
import heart from "../../../../assets/images/heart.png";

export const ASSET_NAMES = [
    "ball-blue",
    "brick-red",
    "brick-metal",
    "background",
    "heart",
];

export function registerAssets(asset_manager: AssetManager) {
    asset_manager.addImage("ball-blue", ball_blue);
    asset_manager.addImage("brick-red", brick_red);
    asset_manager.addImage("brick-metal", brick_metal);
    asset_manager.addImage("background", background);
    asset_manager.addImage("heart", heart);
}