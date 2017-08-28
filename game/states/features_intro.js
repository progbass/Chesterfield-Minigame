'use strict';

//DECLARE MODULE
function Features(){};
Features.prototype = {

  /*--------------------------------------
    ON CREATE
  ---------------------------------------*/
  create: function() {
      ///////////////////////////
      // BACKGROUND
      ///////////////////////////
      this.background = this.game.add.sprite(0, 0, 'shop');

      // FOOTER
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.y = 640;


      ///////////////////////////
      // CONFIG SCENE
      ///////////////////////////
      this.game.time.events.add(1000, this.configScene.bind(this));


      ///////////////////////////
      // PLAY NEXT SCENE
      ///////////////////////////
      // Play scene after a fixed time interval
      this.delay = Phaser.Timer.SECOND * 8;
      this.game.time.events.add(this.delay, function(){
        // State Transition
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
        slideIn.duration = 1000;
        slideOut.duration = 1000;

        this.game.state.start('instructions', slideIn, slideOut);
      }, this); 
  },



  configScene: function(){
      ///////////////////////////
      // HEADER
      this.header = this.game.add.sprite(150, 30, 'features_logo');
      
      
      ///////////////////////////
      // ICONS
      ///////////////////////////
      this.icon1 =  this.game.add.sprite(220, 500, 'features_a');
      this.icon1.anchor.setTo(.5, .5);

      // Icon 2
      this.icon2 =  this.game.add.sprite(500, 500, 'features_b');
      this.icon2.anchor.setTo(.5, .5);

      // Icon 3
      this.icon3 =  this.game.add.sprite(800, 500, 'features_c');
      this.icon3.anchor.setTo(.5, .5);

      // Icon 4
      this.icon4 =  this.game.add.sprite(810, 230, 'features_d');
      this.icon4.anchor.setTo(.5, .5);


      ///////////////////////////
      // INIT ANIMATION
      ///////////////////////////
      this.initAnimation()

  },




  /*--------------------------------------
    INIT ANIMATION
  ---------------------------------------*/
  initAnimation: function(){

    // Animate elements
    this.game.add.tween(this.header).from( { alpha: 0, y: this.header.y - 40 }, 800, Phaser.Easing.Quartic.Out, true, 240, 0);
    
    // In Icons
    var iconTween1 = this.game.add.tween(this.icon1.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 680, 0);
    var iconTween2 = this.game.add.tween(this.icon2.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 980, 0);
    var iconTween3 = this.game.add.tween(this.icon3.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 1080, 0);
    var iconTween4 = this.game.add.tween(this.icon4.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 1400, 0);
  }
};

//EXPORT MODULE
module.exports = Features;
