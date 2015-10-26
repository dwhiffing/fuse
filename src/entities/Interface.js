export default class Interface {

  constructor() {
    game.stage.backgroundColor = '#182d3b';
    this.bars = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff].map((color, i) => {
      let bar = game.add.graphics(25, 70+ (10*(i+1)));
      bar.lineStyle(3, color, 1);
      bar.lineTo(game.width-50, 0);
      bar.scale.x = 0;
      return bar
    })

    game.scoreText = game.add.text(20, 20, "Score: 0", {
      font: '20pt Arial',
      fill: '#ffffff'
    })

    game.highScoreText = game.add.text(20, 60, "", {
      font: '14pt Arial',
      fill: '#ffffff'
    })

    game.blockedText = game.add.text(165,130, "", {
      font: '14pt Arial',
      fill: '#ffffff'
    })

    game.fullscreenButton = game.add.button(400,10, 'full', () => {
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    })

    game.fullscreenButton.width=40
    game.fullscreenButton.height=40

  	game.tileSelector = game.add.sprite(1, 1, 'select')
    game.tileSelector.width = 100
    game.tileSelector.height = 100
    game.tileSelector.visible = false;
  }

  reset() {
    game.tileSelector.visible = false;
    this.mainTimer = game.roundDuration;
    game.selectedTile = null
    this.timers = [ 0, 0, 0 ]
  }

  update() {
  	// decrement the this.mainTimer
    // (half the speed if blue is active)
    if (this.mainTimer > 0) {
      this.mainTimer -= this.timers[2] > 0 ? 0.5 : 1
      this.bars[3].scale.x = this.mainTimer/game.roundDuration
    }
    // decrement powerup timers and adjust bar scale
    this.timers = this.timers.map((timer,i) => {
      if (timer > 0) {
        this.bars[i].scale.x = timer/game.powerupDuration
        return timer -= this.timers[2] > 0 ? 0.5 : 1
      } else {
        return 0
      }
    })
  }
}
