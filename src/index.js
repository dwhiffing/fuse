import bootState from './states/boot'
import loadState from './states/load'
import playState from './states/play'

window.game = new Phaser.Game(450, 700, Phaser.CANVASs, 'game-container')

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('play', playState)
game.state.start('boot')
