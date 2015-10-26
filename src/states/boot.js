export default {
  create() {
    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.state.start('load', true, false);
  }
};
