(function(){
	var Bird = window.Bird = function() {
		//随机小鸟的颜色
		this.color = parseInt(Math.random() * 3)
		//小鸟图片的数组
		this.imageArr = [
			game.R["bird" + this.color + "_0"],
			game.R["bird" + this.color + "_1"],
			game.R["bird" + this.color + "_2"]
		 ]
		this.wingStep = 0
		this.x = game.canvas.width*(1-0.618) -24
		this.y = 100
		//小鸟的帧数
		this.fno = 0
		//角度
		this.d = 0
		this.hasEnergy = false
		this.R = this.x + 6
		this.L = this.x - 6
		this.T = this.y - 12
		this.B = this.y + 12
	}
	//更新
	Bird.prototype.updata = function() {
		this.wing()
		if(!this.hasEnergy) {
			this.y += this.fno*0.4
		   if(this.y > 0.75*game.canvas.height) {
				this.y = 0.75*game.canvas.height
			}
		} else {
			if(this.y <= 0) {
				this.y = 48
				this.fno = 0
				this.hasEnergy =false
			}
			this.y -=(20-this.fno)*0.3
			if(this.fno >  20) {
				this.hasEnergy = false
				this.fno = 0 
			}
		}
		this.d += 0.04
		this.fno ++
		this.R = this.x + 6
		this.L = this.x - 6
		this.T = this.y - 12
		this.B = this.y + 12
	}
	//加载
	Bird.prototype.render = function() {
		game.ctx.save()
		game.ctx.translate(this.x, this.y)
		game.ctx.rotate(this.d)
		game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24)
		game.ctx.restore()
	}
	Bird.prototype.fly = function(){
		this.hasEnergy = true
		this.d  = -0.6
		this.fno = 0
	}
	Bird.prototype.wing = function() {
	  game.Fno % 3 == 0 && this.wingStep++
		if(this.wingStep > 2) {
			this.wingStep = 0
		}
	}
})(window)
