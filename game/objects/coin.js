Coin = function (game, _x, _y, _frame) {
	Phaser.Sprite.call(this, game, _x, _y, 'coin');
	var scope = this;

	// Properties
    this.game.physics.arcade.enable(this);
	this.events.onHit = new Phaser.Signal(); 
    this.name = 'coin' + this.game.coins_total.toString();
    this.anchor.setTo(.5,.5);
    this.valid = true;
    this.liveInterval = 0;
	this.timeActive = false;
    this.timeDelay = 4;
    this.timesMoved = 0;

    // 
    this.randomize(_frame);
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.randomize = function(_frame){
    //
    if(_frame != undefined)
    	this.fixFrame(_frame, 0);
   	else
    	this.randomFrame();
};

Coin.prototype.dissapearHandler = function(){
	this.timeActive = false;
    var lostTween = this.game.add.tween(this.scale).to( {x: 0, y: 0}, 600, Phaser.Easing.Back.Out, true);
	lostTween.onComplete.add(function (){
		this.kill();
    }, this);
}


Coin.prototype.move = function(){
    this.timesMoved++;
    if(this.timesMoved > 5){
       this.dissapearHandler();
       return;
    }
    
    var rotationAmount = this.rotation-1;
    this.game.add.tween(this).to( { rotation: rotationAmount }, 240, Phaser.Easing.Circular.InOut, true);
}




Coin.prototype.setupFrame = function() {

	// Sprite Configuration
    this.timesMoved = 0;
	this.valid = (this.frame > 3) ? true : false;
    var targetScale = 0.67;
    var bodyScale = 0.65;
    this.x = 0; this.y = 0;
    this.rotation = 0;
    this.pivot.x = -320;//* Math.sin(this.coinsAngle);
    //coin.pivot.y = 0;
    

	// Living Time Lapse
	this.timeActive = true;
    
	// 
	switch(this.frame){
		case 0:
			break;

		case 1:
            this.pivot.x = -348;
			break;

		case 2:
            //targetScale = 0.7;
            this.pivot.x = -344;
			break;

		case 3:
            this.pivot.x = -305;
			break;

		case 4:
            bodyScale = 1;
            targetScale = 0.55;
            this.pivot.x = -415;
			break;

		case 5:
            targetScale = 0.61;
            this.pivot.x = -400;
			break;

		case 6:
            this.pivot.x = -305;
			break;

		case 7:
            bodyScale = 1;
            targetScale = 0.54;
            this.pivot.x = -440;
			break;

	}
    
    
    // Animation
    this.scale.setTo( targetScale );
    this.body.setSize(this.width*bodyScale, this.height*bodyScale, (this.width*bodyScale)/2, (this.height*bodyScale)/2);
    console.log(this)
    var scaleTween = this.game.add.tween(this.scale).from( {x: 0, y: 0}, 300, Phaser.Easing.Back.Out, true);
};


Coin.prototype.randomFrame = function(){
	// Frame Configuration
    this.frame = this.game.rnd.integerInRange(0, 7);
    this.setupFrame(); 
};



Coin.prototype.fixFrame = function(_frame) {    
	// 
    this.frame = _frame;
    this.setupFrame();
};


module.exports = Coin;
