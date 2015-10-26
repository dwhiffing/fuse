import TileGroup from '../entities/TileGroup.js';
import Interface from '../entities/Interface.js';

export default {
  create() {
    game.powerupDuration = 600
    game.roundDuration = 3600
    game.blockInput = false
    game.highScore = 0
    game.tiles = new TileGroup();
    game.ui = new Interface();
    this.startRound()
  },

  startRound() {
    game.score = 0
    game.ui.reset()
  },

  update() {
    if (game.ui.mainTimer == 0) {
      if (game.score > game.highScore) {
        game.highScore = game.score
        game.highScoreText.text = "Highscore: " + game.highScore
      }
      game.score = 0
      game.scoreText.text = "Score: " + game.score

      game.ui.reset()
    }
    game.ui.update()
  }
}
