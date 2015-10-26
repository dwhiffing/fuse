window.game = new Phaser.Game(450, 700, Phaser.CANVASs, 'game-container');

game.state.add('boot', require('./states/boot.js'));
game.state.add('load', require('./states/load.js'));
game.state.add('play', require('./states/play.js'));
game.state.start('boot');
