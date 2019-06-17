(function(){
	var Pipe = window.Pipe = function(){
		    this.imageup = game.R.pipe_up
			this.imagedown = game.R.pipe_down
			this.pipeheight = 320
			this.allreadyheight =game.canvas.height*0.75
			this.innerspace = 120 + parseInt(Math.random()*30)
			this.w = 52
			this.isAdd = true
			this.x = game.canvas.width
			this.speedx =2
			this.height1 = 100 + parseInt(Math.random()*(320-100))
			this.height2 = this.allreadyheight - this.innerspace - this.height1
			game.pipeArr.push(this)
	}
	//铺数据
	Pipe.prototype.render = function(){
		game.ctx.drawImage(this.imagedown, 0, this.pipeheight-this.height1, 52, this.height1,this.x, 0, 52, this.height1)
		game.ctx.drawImage(this.imageup, 0, 0, 52, this.height2, this.x, this.height1 + this.innerspace, 52, this.height2)
	}
	//更新管子
	Pipe.prototype.updata = function(){
		this.x -= this.speedx
		if(this.x <= -this.w) {
			this.godie()
		}
		//小鸟与管子碰撞检测
		if (game.bird.R > this.x && game.bird.L < (this.x+this.w)) {
			if(game.bird.T < this.height1 || game.bird.B > (this.height1 + this.innerspace)) {
			game.sm.enter(4)
				
			}
		}
		if(this.isAdd) {
			if(game.bird.L > this.x + 52 ) {
				game.scrope += 1
				this.isAdd = false
				
			}
			if(game.bird.L >= this.x + 52 && game.bird.L < this.x + 54){
				game.isa = true
			} else {
				game.isa = false
			}  
		}
	}
	//清除管子
	Pipe.prototype.godie = function() {
		for(var i = 0; i< game.pipeArr.length; i++) {
			if(game.pipeArr[i] == this) {
				game.pipeArr.splice(i,1)
			}
		}
	}
})(window)
