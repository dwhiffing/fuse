import Tile from './Tile.js';

class TileGroup extends Phaser.Group {

  constructor() {
    let space = 5;
    let grid = 4
    let scale = game.width/4- 10
    let x = 12;
    let y = game.height-(scale*4+space*4)-100;

    super(game)
  	for (var i = x; i < scale * grid + x; i += scale + space) {
      for (var j = y; j < scale * grid + y; j += scale + space) {
        let frame = parseInt(Math.random() * 3) * 3;
        let tile = new Tile(i, j, scale, frame)
        tile.events.onInputDown.add(this.doSelect, this)
        this.add(tile);
      }
    }
  }

  doSelect(tile) {
    if (tile.alive && !game.blockInput) {
      if (game.selectedTile == null) {
        game.tileSelector.x = tile.x
        game.tileSelector.y = tile.y
        game.selectedTile = tile;
        game.tileSelector.visible = true;
      } else if (game.selectedTile == tile) {
        this.deselect()
      } else if (tile.frame === game.selectedTile.frame) {
        this.combineTiles(game.selectedTile, tile);
      } else {
        game.blockInput = true
        this.deselect()
        game.blockedText.text = "input blocked"
        game.time.events.add(1500,() => {
          game.blockInput = false
          game.blockedText.text = ""
        })
      }
    }
  }

  deselect() {
    game.tileSelector.visible = false;
    game.selectedTile = null;
  }

  combineTiles(tile1, tile2) {
    game.tileSelector.visible = false;
    game.selectedTile = null;

    game.score += game.ui.timers[0]>0 ? 200 : 100
    game.scoreText.text = "Score: " + game.score

    game.add.tween(tile1, tile1.x, tile1.y)
  		.to({
  	    x: tile2.x,
  	    y: tile2.y
  	  }, 300, Phaser.Easing.Quadratic.Out, true, 0, 0)
  		.onComplete.add(tile1.destroy.bind(tile1))

    tile2.frame += 1;
    if (tile1.frame == 2) {
      game.ui.timers[1] = game.powerupDuration
    }
    if (tile1.frame == 5) {
      game.ui.timers[0] = game.powerupDuration
    }
    if (tile1.frame == 8) {
      game.ui.timers[2] = game.powerupDuration
    }
  }
}

export default TileGroup;
