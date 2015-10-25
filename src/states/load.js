export default {
  preload() {
    game.load.spritesheet('tile', 'images/button.png', 300, 300);
    game.load.spritesheet('select', 'images/select.png', 300, 300);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },

  onLoadComplete() {
    game.state.start('play', true, false);
  }
}
