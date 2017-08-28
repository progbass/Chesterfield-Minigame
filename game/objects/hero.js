Hero = function (game, _x, _y) {
    Phaser.Group.call(this, game);
    this.shootIsActive = false;
    this.name = 'hero';
    this.x = _x; this.y = _y;
    
    this.character = this.create(0, 0, 'play_hero');
    this.character.anchor.setTo(.5,.5);
    
    
    this.laser_sprite = this.create(92, -10, 'play_ray'); 
    this.laser_sprite.anchor.setTo(0, 0.5);
    this.laser_sprite.scale.setTo(1,0);
    this.laser_sprite.alpha = 0;
    this.laser_sprite.blendMode = PIXI.blendModes.MULTIPLY;
    

    var width = 250;
    var height = 15;
    var bmd = this.game.make.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = '#f4eb48';
    bmd.ctx.fill();
     
    this.laser = this.create(92, -10, bmd);
    this.game.physics.arcade.enable(this.laser);
    this.laser.anchor.setTo(0,.5);
    this.laser.scale.x = 0;
    this.laser.alpha = 0.32;
    this.laser.blendMode = PIXI.blendModes.MULTIPLY;
};

Hero.prototype = Object.create(Phaser.Group.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.update = function () { 
};


Hero.prototype.shoot = function(){
    if(this.shootIsActive){
       return
    }
    
    // Set status Flag
    this.shootIsActive = true;
    
    // Play Sound FX
    this.game.fx_laser.play();
    
    // Animation
    this.game.add.tween(this.laser.scale).to( { x: 1 }, 60, Phaser.Easing.Back.Out, true, 60);
    this.game.add.tween(this.laser_sprite.scale).to( { y: 1 }, 60, Phaser.Easing.Cubic.In, true);
    this.game.add.tween(this.laser_sprite).to( { alpha: 0.95 }, 100, Phaser.Easing.Cubic.Out, true);
    
    // Reset
    setTimeout(this.shootEnd.bind(this), 120);
};
Hero.prototype.shootEnd = function(){
    this.shootIsActive = false;
    
    this.game.add.tween(this.laser.scale).to( { x: 0 }, 100, Phaser.Easing.Cubic.In, true);
    this.game.add.tween(this.laser_sprite.scale).to( { y: 0 }, 300, Phaser.Easing.Cubic.In, true);
    this.game.add.tween(this.laser_sprite).to( { alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
};


module.exports = Hero;
