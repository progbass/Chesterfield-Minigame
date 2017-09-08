HitDisplay = function (game, _content, _style, _flag) {
	Phaser.Group.call(this, game);
	this.valid = true;

	// Label
	var label = new Phaser.Text(this.game, -4, 3, _content, _style);
	label.anchor.setTo(.5,.5);
	label.fontSize = '90pt';
	label.fill = '#FFFFFF';
	if(!_flag){
		this.valid = false;
	}
	this.add(label);
};

HitDisplay.prototype = Object.create(Phaser.Group.prototype);
HitDisplay.prototype.constructor = HitDisplay;

module.exports = HitDisplay;
