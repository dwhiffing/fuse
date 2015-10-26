class Tile extends Phaser.Sprite {

  constructor(x, y, scale, frame) {
    super(game, x, y, 'tile');
    this._position = {x,y}
    this.width = scale
    this.height = scale
    this.frame = frame
    this.inputEnabled = true;
  }

  update() {
    if (this.frame > 8 && this.alive) this.frame = 0
    if (!this.alive) {
      if (game.ui.timers[1] > 0) {
        this.spawn()
      } else {
        this.alpha += 0.006
      }
      if (this.alpha > 0.7) {
        this.spawn()
      }
    }
  }

  spawn() {
    this.alive = true;
    this.alpha = 1;
    this.frame = parseInt(Math.random() * 3) * 3;
  }

  destroy() {
    this.frame = 9;
    this.alpha = 0;
    this.alive = false;
    this.x = this._position.x
    this.y = this._position.y
  }
}

export default Tile;
