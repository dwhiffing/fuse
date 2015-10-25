import Tile from './Tile.js';

class TileGroup extends Phaser.Group {

  constructor() {
    let scale = 100;
    let x = 80;
    let y = 120;
    let space = 10;
    let grid = 4

    super(game)
  	for (var i = 80; i < scale * grid + x; i += scale + space) {
      for (var j = 120; j < scale * grid + y; j += scale + space) {
        let frame = parseInt(Math.random() * 3) * 3;
        let tile = new Tile(i, j, scale, frame)
        tile.events.onInputDown.add(this.doSelect, this)
        this.add(tile);
      }
    }
  }

  doSelect(tile) {
    if (tile.alive) {
      if (game.selectedTile == null) {
        game.tileSelector.x = tile.x
        game.tileSelector.y = tile.y
        game.selectedTile = tile;
        game.tileSelector.visible = true;
      } else if (game.selectedTile == tile) {
        game.tileSelector.visible = false;
        game.selectedTile = null;
      } else if (tile.frame === game.selectedTile.frame) {
        this.combineTiles(game.selectedTile, tile);
      }
    }
  }

  combineTiles(tile1, tile2) {
    game.tileSelector.visible = false;
    game.selectedTile = null;

    game.add.tween(tile1, tile1.x, tile1.y)
  		.to({
  	    x: tile2.x,
  	    y: tile2.y
  	  }, 300, Phaser.Easing.Quadratic.Out, true, 0, 0)
  		.onComplete.add(tile1.destroy.bind(tile1))

    tile2.frame += 1;

    if (tile1.frame == 2) {
      game.gTimer = 500
    }
    if (tile1.frame == 5) {
      game.rTimer = 500
    }
    if (tile1.frame == 8) {
      game.bTimer = 500
    }
  }
}

export default TileGroup;
