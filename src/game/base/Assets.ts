import { AssetManager } from "../../library";
import ball_blue from "../../../../assets/images/ball-blue.png";
import brick_red from "../../../../assets/images/brick-red.png";
import brick_metal from "../../../../assets/images/brick-metal.png";
import background from "../../../../assets/images/background.png";
import heart from "../../../../assets/images/heart.png";
import hit_brick from "../../../../assets/sounds/hit-gong.wav";
import hit_wall from "../../../../assets/sounds/hit-bip.wav";
import hit_paddle from "../../../../assets/sounds/hit-bop.wav";
import hit_ball from "../../../../assets/sounds/hit-bip.wav";
import background_music from "../../../../assets/music/spacy-bricks.wav";

export enum ASSET_IMAGE_NAMES {
    BALL = "ball",
    BRICK = "brick",
    PADDLE = "paddle",
    BACKGROUND = "background",
    HEART = "heart",
};

export enum ASSET_SFX_NAMES {
    HIT_BRICK = "hit-brick",
    HIT_BALL = "hit-ball",
    HIT_PADDLE = "hit-paddle",
    HIT_WALL = "hit-wall",
}

export enum ASSET_MUSIC_NAMES {
    TRACK_0 = "background-0",
}

export function registerAssets(asset_manager: AssetManager) {
    // Register images
    asset_manager.addImage(ASSET_IMAGE_NAMES.BALL, ball_blue);
    asset_manager.addImage(ASSET_IMAGE_NAMES.BRICK, brick_red);
    asset_manager.addImage(ASSET_IMAGE_NAMES.PADDLE, brick_metal);
    asset_manager.addImage(ASSET_IMAGE_NAMES.BACKGROUND, background);
    asset_manager.addImage(ASSET_IMAGE_NAMES.HEART, heart);
    // // Register sounds
    asset_manager.addSound(ASSET_SFX_NAMES.HIT_BRICK, hit_brick);
    asset_manager.addSound(ASSET_SFX_NAMES.HIT_BALL, hit_ball);
    asset_manager.addSound(ASSET_SFX_NAMES.HIT_WALL, hit_wall);
    asset_manager.addSound(ASSET_SFX_NAMES.HIT_PADDLE, hit_paddle);
    // // Register music
    asset_manager.addMusic(ASSET_MUSIC_NAMES.TRACK_0, background_music );
}