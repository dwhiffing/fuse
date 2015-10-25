export default class Interface {

  constructor() {
    this.mainTimer = 3660;
    game.rTimer = 0;
    game.gTimer = 0;
    game.bTimer = 0;
    game.selectedTile = null
    game.stage.backgroundColor = '#182d3b';
  	this.rBar = game.add.sprite(100, 10, 'tile', 3).scale.setTo(0, 0.025);
    this.gBar = game.add.sprite(100, 40, 'tile', 0).scale.setTo(0, 0.025);
    this.bBar = game.add.sprite(100, 70, 'tile', 8).scale.setTo(0, 0.025);
  	game.tileSelector = game.add.sprite(1, 1, 'select')
    game.tileSelector.width =100
    game.tileSelector.height =100
    game.tileSelector.visible = false;
  }

  update() {
  	// decrement the this.mainTimer (half the speed if blue is active)
    if (this.mainTimer > 1) {
      if (game.bTimer > 0) {
        this.mainTimer -= 0.5
      } else {
        this.mainTimer--
      }
    }

    if (this.mainTimer == 1) {
      this.mainTimer = 0;
      game.tiles.callAll('kill', this);
    }

  	// decrement the timers
    if (game.rTimer > 0) {
      game.rTimer--;
      this.rBar.width = game.rTimer / 2
    } else {
      game.rTimer = 0
    }
    if (game.gTimer > 0) {
      game.gTimer--;
      this.gBar.width = game.gTimer / 2
    } else {
      game.gTimer = 0
    }
    if (game.bTimer > 0) {
      game.bTimer--;
      this.bBar.width = game.bTimer / 2
    } else {
      game.bTimer = 0
    }
  }
}
