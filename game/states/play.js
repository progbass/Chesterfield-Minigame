'use strict';

// DECLARE MODULE
var Play = function (){};
Play.prototype = {


  /*--------------------------------------
    ON RENDER
  ---------------------------------------*/
  render: function(){
    //this.game.debug.body(this.hero.laser);
      
    // If debug flag is ON show debuggers
    if(this.debug){
      this.coinsGroup.forEachAlive(function(_target){
        this.game.debug.body(_target);
      }, this);
      this.game.debug.body(this.hero);
      this.game.debug.spriteBounds(this.back_display);
    }
  },





  /*------------------------------------------------------
    SCENE SHUTDOWN
  -------------------------------------------------------*/
  shutdown: function() { 
    // this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    
    // Destroy Sprites
    this.hero.destroy();
    this.coinsGroup.destroy();
    this.back.destroy();
    this.score_display.destroy();
  },




  /*--------------------------------------
    ON CREATE
  ---------------------------------------*/
  create: function() {
    // Object Reference
    var scope = this;


    ///////////////////////////
    // RESET GAME PROPERTIES
    ///////////////////////////
    this.debug = false;
    this.gameInit = false;
    this.game.level_speed = 1000;
    this.game.level = 1;
    this.game.score = 0;
    this.game.coins_total = 0;
    this.game.coins_single = 0;
    this.levelsConfig = [
        [6, -1, 4, 2, -1, 7, 1, 0, 5, -1, 5, 6, -1, 7, 5, -1, 6, -1, 7, 5, -1, 6, 5, 4, -1, 7],
        [-1, 7, 5, 0, 5, 6, 2, 3, -1, 7, 1, 0, 5, 6, 7, 5, -1, 0, 7, 5, -1, 6, 7, 5, -1, 5, 6, 3, -1],
        [-1, 7, 1, 0, 5, -1, 7, 5, -1, -1, 6, 4, 2, -1, 7, 3, -1, 7, 1, 0, 5, -1, 7, 6, 1, 5, -1, 6, -1, 7, 5]
    ];
    this.enemy_levelIndex = 0;

 

    ///////////////////////////
    // BACKGROUND
    ///////////////////////////
    this.back = this.game.add.sprite(0, 0, 'background');
    
      
    
      

      

    ///////////////////////////
    // COINS
    ///////////////////////////
    // Create Coins Group
    this.coinsGroup = this.game.add.physicsGroup();
    this.coinsGroup.x = 650; //this.planetGroup.x;
    this.coinsGroup.y = this.world.centerY - 40;
      
      
      
    ///////////////////////////
    // PLANET CONTAINER
    ///////////////////////////
    this.planetGroup = this.game.add.physicsGroup();
    this.planetGroup.x = this.coinsGroup.x;
    this.planetGroup.y = this.coinsGroup.y;
    
    
    ///////////////////////////
    // PLANET
    ///////////////////////////
    this.planet = new Phaser.Group(this.game);
    var sphere1 = this.game.add.sprite(0, 0, 'play_sphere1');
    this.sphere2 = this.game.add.sprite(0, 0, 'play_sphere2');
    sphere1.anchor.setTo(0.5, 0.5);
    this.sphere2.anchor.setTo(0.5, 0.5);
    this.sphere2.alpha = 0;
    this.planet.add(sphere1);
    this.planet.add(this.sphere2);
    this.planetGroup.add(this.planet);
      
      
    




    ///////////////////////////
    // HERO
    ///////////////////////////
    // New Coin
    this.hero = new Hero(this.game, 140, this.planetGroup.y-5);

      
      
      

    ///////////////////////////
    // ERROR OVERLAY
    ///////////////////////////
    this.error_overlay = this.game.add.sprite(0, 0, 'overlay');
    this.error_overlay.alpha = 0;






    ///////////////////////////
    // FOOTER
    ///////////////////////////
    this.footer = this.game.add.sprite(0, 0, 'footer');
    this.footer.alignIn(this.back, Phaser.BOTTOM_CENTER);






    ///////////////////////////
    // 'BACK' BUTTON
    ///////////////////////////
    this.back_display = this.game.add.sprite(this.game.world.width - 155, 35, 'back_button');
    this.back_display.inputEnabled = true;

    // 'Tap/Click' Event
    this.back_display.events.onInputUp.add(function () {
      this.game.endGame = false;

      // PLAY PREVIOUS SCENE
      var slideIn = Phaser.Plugin.StateTransition.Out.SlideRight;
      var slideOut = Phaser.Plugin.StateTransition.In.SlideRight;
      slideIn.duration = 2e3;
      slideOut.duration = 2e3;
      this.game.state.start('features_intro', slideIn, slideOut);
    }, this);







    ///////////////////////////
    // SCORE DISPLAY
    ///////////////////////////
    this.score_display = this.game.add.text(110, 40, '0pts', this.game.font_style);
    this.score_display.fontSize = '28pt';





    ///////////////////////////
    // 'TIMEUP'
    ///////////////////////////
    // Display
    this.timeup_base = this.game.add.sprite(30, 26, 'counter');
    this.timeup_display = this.game.add.text(62, 60, '60', this.game.font_style);
    this.timeup_display.fontSize = '26pt';
    this.timeup_display.anchor.set(0.5);
    this.timeup_display.setTextBounds();
    
    // Timers & Events
    this.timeup_timer = this.game.time.create();
    this.timeup_event = this.timeup_timer.add(this.game.total_timeup, this.timeupEnd, this);
    this.timeup_tick = this.game.time.create();
    this.timeup_tick_event = this.timeup_tick.loop(Phaser.Timer.SECOND, this.updateTimeup, this);
    

    


    ///////////////////////////
    // PAUSE BUTTON
    ///////////////////////////
    this.pause_label = this.game.add.sprite(this.game.world.width - 100, 35, 'pause');//this.game.add.text(this.game.world.width - 200, 20, 'Pause', this.game.font_style);
    //this.pause_label.scale.setTo(.65, .65);

    // Enable INteractivity
    this.pause_label.inputEnabled = true;

    // Events
    this.pause_label.events.onInputUp.add(function () {
        this.game.paused = true;
    }, this);
      
      
    // MAIN GAME ACTION
    this.game.input.onTap.add(function() {
        // Catch Event if game is paused
        if (this.game.paused){
            // Unpause game
            this.game.paused = false;
            return;
        }
        
        // Handle Action
        this.hero.shoot();
    }, this);







    ///////////////////////////
    // LEVEL DISPLAY
    ///////////////////////////
    this.modalWindow_visible = false;

    // create Background
    //var level_overlay = this.game.add.graphics(0,0);
    var level_overlay = this.game.add.sprite(0,0, 'modal_background');
    level_overlay.alpha = 0.9;
    //level_overlay.beginFill(0x000000, .6);
    //level_overlay.boundsPadding = 0;
    //level_overlay.drawRect(0, 0, this.game.width, this.game.height);

    // Label
    //this.level_label = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY-40, 'NIVEL '+this.game.level, this.game.font_style);
    this.level_label = this.game.add.sprite(this.world.centerX, this.world.centerY-20, 'play_level_display');
    this.level_label.anchor.setTo(.5,.5);
    //this.level_label.fontSize = '100pt';
    //this.level_label.fill = '#ffffff';

    // Create Group
    this.levelDisplayGroup = new Phaser.Group(this.game);
    this.levelDisplayGroup.add(level_overlay);
    this.levelDisplayGroup.add(this.level_label);
    this.levelDisplayGroup.alpha = 0;

    // Level Timer / Events
    this.level_timer_update = this.game.time.create();
    this.level_event_update = this.level_timer_update.loop(Phaser.Timer.SECOND * 20, function(){
      
      // If the main timer has stopped, stop level updates
      if(!this.timeup_timer.running){
        this.level_timer_update.stop();
        return;
      }


      // Update game level
      this.game.level++;

      // Show Overlay
      var level = Math.round(this.timeup_event.delay - this.timeup_timer.ms) / 1000;
      this.updateLevel();
      this.showLevel();

    }, this);


    

    ///////////////////////////
    // INIT GAME
    ///////////////////////////
    // Wait some time before initializing the game
    this.initDelayTimer = this.game.time.events.add(Phaser.Timer.SECOND, this.initGame, this);
  },

    
    
  /*--------------------------------------
    PLANET ROTATION
  ---------------------------------------*/
  rotatePlanet: function(){
    // Play FX
    this.game.fx_swoosh.play();
      
    // tween sprite
    var amount = this.planetGroup.angle;
    var tween = this.game.add.tween(this.planetGroup).to( { angle: amount-22.5 }, 240, Phaser.Easing.Circular.InOut, true);

      
    // Make sure that there´s at leat 1 'valid' coin
    this.coinsGroup.forEach(function(_child){
        // Move Icon
        _child.move();    
    }, this);
  },
    
    
   createIcon: function(){  
    let coinType = this.levelsConfig[this.game.level-1][this.enemy_levelIndex];
    
    //Counter
    this.enemy_levelIndex++;
       
    if(coinType == -1){
        return;
    }
    // New Coin 
    this.coinsAngle = 45;
    var coin = new Coin(this.game, 0, 0, coinType);
    this.coinsGroup.add(coin);
   },
    
    
    
    spawnHandler: function(){
        this.createIcon();
        this.rotatePlanet();
    },


  /*--------------------------------------
    INIT GAME
  ---------------------------------------*/
  initGame: function(){
    // remove init delay timer;
    this.game.time.events.remove(this.initDelayTimer );

    // Show Level
    this.updateLevel();
    this.showLevel();

    // Init Timeup
    this.timeup_timer.start();
    this.timeup_tick.start();
    this.level_timer_update.start();

    // Game Init Flag (Start to Spawn Enemies)
    this.gameInit = true;
      
    this.icon_update = this.game.time.create();
    this.loopTimer = this.icon_update.loop(this.game.level_speed, this.spawnHandler, this);
    this.icon_update .start();
    this.rotatePlanet();
  },





  /*--------------------------------------
    UPDATE LEVEL
  ---------------------------------------*/
  updateLevel: function(){

    // If level is greter than 1
    if(this.game.level > 1){
      var levelSpeed = [780, 650, 500, 400];
      
      // Update Level Seed
      this.game.level_speed = levelSpeed[this.game.level-1];//(this.game.level_speed - 80) * .9; 
      this.loopTimer.delay = this.game.level_speed;
      this.enemy_levelIndex = 0;

      // Play Sound FX
      this.game.fx_state.play();
    }
  },




  /*--------------------------------------
    SHOW LEVEL LIGHTBOX
  ---------------------------------------*/
  showLevel: function(){
    // Update Level Text
    //this.level_label.text = 'NIVEL '+this.game.level;
    this.level_label.frame = this.game.level - 1;

    // Update modal window state
    this.modalWindow_visible = true;

    // tween sprite
    var tween = this.game.add.tween(this.levelDisplayGroup).to( { alpha: 1 }, 400, Phaser.Easing.Cubic.Out, true);
    var tween2 = this.game.add.tween(this.levelDisplayGroup).to( { alpha: 0 }, 400, Phaser.Easing.Cubic.Out, false, 1400);
    tween.chain(tween2);
    tween2.onComplete.add(function (){
      // Update modal window state
      this.modalWindow_visible = false;
    }, this);
  },






  /*--------------------------------------
    UPDATE 'TIMEUP' DISPLAY
  ---------------------------------------*/
  updateTimeup: function(){
    //
    var remaining_seconds = Math.ceil( (this.timeup_event.delay - this.timeup_timer.ms) / 1000 )

    // If there´s less than 6 seconds remaining, change text style
    if(remaining_seconds < 6){
      this.timeup_display.fill = "#ff0000"; 
      this.timeup_display.fontSize = "28pt"; 
      
      //this.game.fx_seconds.stop();
      this.game.fx_seconds.play();
    }

    // Update text
    this.timeup_display.text = remaining_seconds; 
  },




  /*--------------------------------------
    ON 'TIMEUP' END
  ---------------------------------------*/
  timeupEnd: function(){
    // Stop Timers
    this.timeup_tick.stop();
    this.timeup_timer.stop();

    /////////////////////
    /// GAME OVER
    /////////////////////
    // Wait some time before initializing the game
    this.gameoverDelayTimer = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOver, this);
  },




  /*--------------------------------------
    GAME OVER HANDLER
  ---------------------------------------*/
  gameOver: function(){
    // Play state
    this.game.endGame = true;
      
    this.game.input.onTap.removeAll();

    /////////////////////
    /// PLAY NEXT SCENE
    /////////////////////
    var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
    var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
    slideIn.duration = 2e3;
    slideOut.duration = 2e3;
    this.game.state.start('gameover', slideIn, slideOut);
  },





  /*--------------------------------------
    UPDATE EVENT
  ---------------------------------------*/
  update: function() {

    
    if(this.gameInit){
        /////////////////////////////////////
        /// HERO DRAG
        /////////////////////////////////////
        /// Check for collisions
        this.game.physics.arcade.overlap(
          this.hero.laser,
          this.coinsGroup,
          this.getCoin,
          this.processHandler,
          this
        ); 
    }
    
      
    return



    /////////////////////////////////////
    /// COINS SPAWN
    //console.log(this.coinsGroup.countLiving())
    if (!this.modalWindow_visible && this.gameInit ) {
        // Spawn new Coin
        this.spawnCoin();
    }
  },







  /*--------------------------------------
    PROCESS HANDLER
  ---------------------------------------*/
  processHandler: function(player, veg){
    //  console.log(player.parent, veg)
    return true;//player.parent.shootIsActive;
  },

  




  /*--------------------------------------
    UPDATE SCORE DISPLAY
  ---------------------------------------*/
  updateScore: function(){
    // LIMIT SCORE VALUE
    if(this.game.score <= 0){
      this.game.score = 0;
    }

    // Update Text
    this.score_display.text = this.game.getFormattedScore()+' pts'; 
  },







  /*--------------------------------------
    'GET COIN' EVENT
  ---------------------------------------*/
  getCoin: function(_body1, _body2){
    // Check Coin Type for calculating score
    var points_content;
    var points_flag = true;
    if(_body2.valid){
      points_content = '+100';
      this.game.score += 100;
      this.updateScore();
      this.game.fx_good.play();

    } else {
      points_content = '-50';
      points_flag = false;
      this.game.score -= 50;
      this.updateScore();
      this.game.fx_bad.play();
    
      var errorTween = this.game.add.tween(this.sphere2).to( { alpha: 1 }, 200, Phaser.Easing.Cubic.Out);
      errorTween.chain(
          this.game.add.tween(this.sphere2).to( { alpha: 0 }, 300, Phaser.Easing.Cubic.Out, false, 300)
      );
      errorTween.start(); 
        
      // Show Overlay
      this.showOverlay();
    }

    // Display Points
    this.pointsDisplay(points_content, {x: this.planetGroup.x, y: this.planetGroup.y}, points_flag);


    // Kill Sprite
    _body2.kill();
  },






  /*--------------------------------------
    SHOW 'POINTS' SPRITE
  ---------------------------------------*/
  pointsDisplay: function(_content, _location, _flag){
    var points_sprite = new HitDisplay(this.game, _content, this.game.font_style, _flag);
    points_sprite.x =  _location.x;
    points_sprite.y =  _location.y;

    // tween sprite
    var tween = this.game.add.tween(points_sprite).from( { alpha: 0, y: points_sprite.y+20 }, 280, Phaser.Easing.Cubic.InOut, true);
    setTimeout(function (){
      points_sprite.destroy();
    }, 800);

  },






  /*------------------------------------------------------
    'COIN OUT OF WORLD' HANDLER
  -------------------------------------------------------*/
  coinOut: function(_target){
    if(_target.valid){

      // Check Coin Type for calculating score
      var points_content = '-50';
      var points_flag = false;
      this.game.score -= 50;
      this.updateScore();

      // Display Points
      this.pointsDisplay(points_content, {x: _target.body.x, y: _target.body.y}, points_flag);
    
      // Show Overlay
      this.showOverlay();

      // Play Sound FX
      this.game.fx_bad.play();
    }
  },




  /*--------------------------------------------------
    SHOW LIGHTBOX OVERLAY
  ---------------------------------------------------*/
  showOverlay: function(){
    var tweenA = this.game.add.tween(this.error_overlay).to( { alpha: .75 }, 200, Phaser.Easing.Quadratic.Out);
    var tweenB = this.game.add.tween(this.error_overlay).to( { alpha: 0 }, 300, Phaser.Easing.Quadratic.Out);
    tweenA.chain(tweenB);
    tweenA.start();
  },






  /*------------------------------------------------------
    SPAWN COIN
  -------------------------------------------------------*/
  spawnCoin: function(){
    var offset = 10;
    var coin;



    // If we have generated more spirtes than the maximum,
    // start recycling from pool of sprites
    if( this.game.coins_single >= this.game.coins_max ){
      // Revive first dead Coin
      //var coin = this.coinsGroup.getFirstDead();
    } else {
      // New Coin
      //var coin = new Coin(this.game, slot_random, xPos, yPos);

      // Add coin to Group
      //this.coinsGroup.add(coin);

      //
      this.game.coins_single++
    }


    // Make sure that there´s at leat 1 'valid' coin
    if(this.coinsGroup.checkAll('valid', false)){
      coin.fixFrame(0, 0);
    }

    
    // Update coins count
    this.game.coins_total++;

  },




  /*------------------------------------------------------
    'ON COIN DOWN' HANDLER
  -------------------------------------------------------*/
  onDown: function(_sprite){
    var points_content;
    var points_flag = true;
    if(!_sprite.valid){
      points_content = '-20';
      points_flag = false;
      this.game.score -= 20;
      this.updateScore();

      // Display Points
      this.pointsDisplay(points_content, {x: _sprite.body.x, y: _sprite.body.y}, points_flag);
    }
  }

};


// EXPORT MODULE
module.exports = Play;
