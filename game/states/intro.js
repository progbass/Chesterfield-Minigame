
'use strict';
function Intro() {}

Intro.prototype = {
  preload: function() {

  },
  create: function() {
    this.background = this.game.add.sprite(0, 0, 'intro');
    
    ///////////////////////////
    // FOOTER
    ///////////////////////////
    this.footer = this.game.add.sprite(0, 0, 'footer');
    this.footer.y = 640;

    ///////////////////////////
    // LOGO
    ///////////////////////////
    this.logo = this.game.add.sprite(this.game.world.centerX+10, this.game.world.centerY-40, 'intro_logo');
    this.logo.anchor.setTo(0.5, 0.5);
      
    
    // Animate elements
    this.game.add.tween(this.background).from( { alpha: 0 }, 1600, Phaser.Easing.Quartic.Out, true);
      

      
    // PLAY NEXT SCENE
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
      // State Transition
      var slideIn = Phaser.Plugin.StateTransition.Out.SlideTop;
      var slideOut = Phaser.Plugin.StateTransition.In.SlideTop;
      slideIn.duration = 1500;
      slideOut.duration = 1500;
      this.game.state.start('features_intro', slideIn, slideOut);
    }, this);  
  },

  update: function() {}
};

module.exports = Intro;
