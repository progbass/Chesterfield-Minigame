
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {

      //
      this.back = this.game.add.sprite(this.game.width/2, this.game.height/2, 'gameover');
      this.back.anchor.setTo(0.5, 0.5);
      this.back.inputEnabled = true;

      this.text_3 = this.game.add.text(this.world.centerX+185, 205, this.game.getFormattedScore()+' PTS*', this.game.font_style);
      this.text_3.fill = "#FFFFFF";
      this.text_3.fontSize = '60pt';
      //this.text_3.angle = -10;
      this.text_3.anchor.set(0.5);
  },


  update: function () { 
    
    this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
      if(this.game.input.activePointer.justPressed()) {
        // Play state
        this.game.endGame = false;

        // Start Game Over State
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideRight;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideRight;
        slideIn.duration = 500;
        slideOut.duration = 500;
        this.game.state.start('instructions', slideIn, slideOut);
      }
    }, this);  
  }
};
module.exports = GameOver;
