'use strict';

// DELCARE MODULE
var Instructions = function (){};
Instructions.prototype = {

  /*--------------------------------------
    ON CREATE
  ---------------------------------------*/
  create: function() {

      ///////////////////////////
      // BACKGROUND
      ///////////////////////////
      this.background = this.game.add.sprite(0, 0, 'background');
      this.background2 = this.game.add.sprite(0, 0, 'intro');
      this.background2.alpha = 0;


      ///////////////////////////
      // INSTRUCTIONS
      ///////////////////////////
      this.instructions_2 = this.game.add.sprite(0, 0, 'instructions_1');
      this.instructions_3 = this.game.add.sprite(0, 0, 'instructions_2');
      this.instructions_3.alpha = 0;


      ///////////////////////////
      // STAR
      ///////////////////////////
      this.star_bg = this.game.add.sprite(this.world.centerX, this.world.centerY - 20, 'ajugar');
      this.star_bg.anchor.setTo(.5, .5);


      ///////////////////////////
      // FOOTER
      ///////////////////////////
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.alignIn(this.background, Phaser.BOTTOM_CENTER);


      ///////////////////////////
      // INIT ANIMATION
      ///////////////////////////
      this.initAnimation();




      ///////////////////////////
      // PLAY NEXT SCENE
      ///////////////////////////
      this.game.time.events.add(Phaser.Timer.SECOND * 16, function(){
        // State Transition
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
        slideIn.duration = 1000;
        slideOut.duration = 1000;
        this.game.state.start('play', slideIn, slideOut);
      }, this); 
  },





  /*--------------------------------------
    INIT ANIMATION
  ---------------------------------------*/
  initAnimation: function(){

    // Animate elements
    this.game.add.tween(this.instructions_2).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 8000);
      
    this.game.add.tween(this.instructions_3).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 8000);
    this.game.add.tween(this.instructions_3).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 13000);
    
    this.game.add.tween(this.star_bg.scale).from( { x: 0, y: 0 }, 600, Phaser.Easing.Back.Out, true, 13000);
    this.game.add.tween(this.background2).to( { alpha: 1 }, 300, Phaser.Easing.Back.Out, true, 13000);


    // Play intro sound FX after a fixed interval
    this.game.time.events.add(Phaser.Timer.SECOND * 13, function(){
      this.game.fx_state.play();
    }, this);
  }

};


// EXPORT MODULE
module.exports = Instructions;
