(function(){
	var Land = window.Land = function(){
		this.image = game.R.land
		this.x = 0,
		this.y = game.canvas.height*0.75
		this.w = 336
		this.h = 112 
		this.speedx=2
	}
	Land.prototype.render = function(){
		game.ctx.drawImage(this.image,this.x,this.y)
		game.ctx.drawImage(this.image,this.x+this.w,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*2,this.y)
		game.ctx.fillStyle = '#DED895'
		game.ctx.fillRect(0, this.y+this.h, game.canvas.width, game.canvas.height-this.y-this.h)
	}
	Land.prototype.updata = function(){
		this.x -= this.speedx
		if(this.x <= -this.w) {
			this.x = 0
		}
		if(game.bird.B > this.y) {
			game.sm.enter(4)
		}
	}
})(window)
