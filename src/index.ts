import {Game} from "./game/base/Game";
import * as tgt from "./library/index";

declare global {
    let game: Game;
    interface Window {
        game: Game;
    }
}

(async () => {
    const app = tgt.getElementById('app', HTMLDivElement);
    tgt.preventDefault(app);
    window.game = game = new Game(app);
    await window.game.init();
    await window.game.run();
})();