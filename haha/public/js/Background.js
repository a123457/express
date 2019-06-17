(function(){
	var Background = window.Background = function(){
		this.image = game.R.bg_day
		this.y = 0.75*game.canvas.height -396
		this.w =288
		this.h =512
		this.x =0
		this.speedx = 1
	}
	Background.prototype.render = function(){
		game.ctx.drawImage(this.image,this.x,this.y)
		game.ctx.drawImage(this.image,this.x+this.w,this.y)
		game.ctx.drawImage(this.image,this.x+this.w*2,this.y)
		//补天空图片
		game.ctx.fillStyle = "#4EC0CA"
		game.ctx.fillRect(0, 0, game.canvas.width, this.y)
		//补草地图片
		game.ctx.fillStyle = '#5EE270'
		game.ctx.fillRect(0,this.h+this.y,game.canvas.width,game.canvas.height-512-this.y )
	}
		Background.prototype.updata = function(){
			this.x-=this.speedx
			if(this.x + this.w == 0) {
				this.x = 0
			}
			if(game.bird.T <= 0) {
				game.sm.enter(4)
			}
		}
})(window)
