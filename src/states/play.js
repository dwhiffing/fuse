import TileGroup from '../entities/TileGroup.js';
import Interface from '../entities/Interface.js';

export default {
  create() {
    game.tiles = new TileGroup();
    game.ui = new Interface();
  },

  update() {
    game.ui.update()
  }
}
