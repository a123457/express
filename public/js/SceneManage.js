/**
 * 场景管理器
 */
(function () {
	var SceneManage = window.SceneManage = function () {
		// 1 表示开始游戏  2便是游戏能容 3表示游戏结束
		this.sceneNumber = 1
		game.background = new Background()
		game.land = new Land()
		game.bird = new Bird()
		game.pipe = new Pipe()
		this.speedY = -48
		this.buttonY = game.canvas.height
		this.buttonX = game.canvas.width / 2
		this.birdX = -48
		this.pauseOrresum = true
		this.bindEvent()
		this.birdFno = 0 //控制落地动画图片的切片
		this.birdSpeed = 0
		this.birdSpeedX = 0 //截取小鸟落地图片的横坐标
		this.birdSpeedY = 0 //截取小鸟落地图片的纵坐标
		this.bengCount = 0 //爆炸图片个数
		this.opacity = 1
		
	}
	SceneManage.prototype.render = function () {
		switch (this.sceneNumber) {
			case 1:
				game.background.render()
				game.land.render()
				game.bird.render()
				game.bird.x = game.canvas.width / 2
				game.bird.y = 200
				game.ctx.drawImage(game.R['logo'], game.canvas.width / 2 - 89, this.speedY)
				game.ctx.drawImage(game.R['button_play'], this.buttonX - 58, this.buttonY)
				break;
			case 2:
				game.background.render()
				game.land.render()
				game.bird.render()
				game.bird.wing()
				game.ctx.save()
				game.ctx.globalAlpha = this.tutorialOpcity
				game.ctx.drawImage(game.R['tutorial'], game.canvas.width / 2 - 57, 200)
				game.ctx.restore()
				break;
			case 3:
				game.background.render()
				game.land.render()
				game.bird.render()
				break;
			case 4:
				game.background.render()
				game.land.render()
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render()
				}
				game.bird.render()
				break;
			case 5:
				game.background.render()
				game.land.render()
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render()
				}
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render()
				}
				game.ctx.drawImage(game.R['text_game_over'], game.canvas.width / 2 - 89, this.speedY)
				game.ctx.drawImage(game.R['button_rate'], this.buttonX - 36, this.buttonY)
				game.ctx.drawImage(game.R['medals'], game.canvas.width / 2 - 22, 200)

		}

	}
	SceneManage.prototype.updata = function () {
		switch (this.sceneNumber) {
			case 1:
				this.speedY += 5
				this.buttonY -= 5
				if (this.speedY >= 120) {
					this.speedY = 120
				}
				if (this.buttonY <= 500) {
					this.buttonY = 500
				}
				break;
			case 2:
				if (this.tutorialOpcity > 1 || this.tutorialOpcity < 0) {
					this.isTutorialDown = !this.isTutorialDown
				}
				this.tutorialOpcity += this.isTutorialDown ? -0.02 : 0.02
				break;
			case 3:
				game.background.updata()
				game.land.updata()
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i].updata()
					game.pipeArr[i] && game.pipeArr[i].render()
				}
				console.log(game.Fno)
				if (game.Fno % 150 == 0) {
					new Pipe()
				}

				game.bird.updata()
				var scropeLength = game.scrope.toString().length
				for (var i = 0; i < scropeLength; i++) {
					game.ctx.drawImage(game.R['num' + game.scrope.toString().charAt(i)], game.canvas.width / 2 - scropeLength / 2 * 34 + 34 * i, 20)
				} 
				console.log(game.isa)
				if(game.isa && game.scrope != 0 && game.scrope % 3 == 0) {
					var guli = document.getElementById('guli')
					guli.play()
				}
				break;
			case 4:
				//游戏结束时候触发
				if(this.opacity <= 0) {
					this.opacity =1 
				}
				this.opacity -= 0.1
				game.ctx.globalAlpha = this.opacity
				if (game.bird.y < (game.canvas.height * 0.75 - 24)) {
					if (game.bird.y < 50) {
						game.bird.y = 50
					} else {
						this.birdSpeed++
						game.bird.y += (this.birdSpeed * 0.4)
					}
				} else {
					if (this.birdSpeedX > 4) {
						this.birdSpeedX = 0
						this.birdSpeedY++
					}
					if (this.birdSpeedY > 2) {
						this.birdSpeedY = 0
					}
					game.ctx.drawImage(game.R['beng'], this.birdSpeedX * 192, this.birdSpeedX * 192, 192, 192, game.canvas.width * (1 - 0.618) - 48, game.canvas.height * 0.75 - 96, 192, 192)
					this.birdSpeedX++
					this.bengCount++
				}
				if (this.bengCount == 12) { //小鸟落地动画结束
					this.enter(5) //gameover界面
				}
				break;
			case 5:
				this.speedY += 5
				this.buttonY -= 5
				if (this.speedY >= 120) {
					this.speedY = 120
				}
				if (this.buttonY <= 500) {
					this.buttonY = 500
				}

				var scropeLength = game.scrope.toString().length
				for (var i = 0; i < scropeLength; i++) {
					game.ctx.drawImage(game.R['num' + game.scrope.toString().charAt(i)], game.canvas.width / 2 - scropeLength / 2 * 34 + 34 * i, 20)
				}
				break;

		}
	}
	SceneManage.prototype.enter = function (number) {
		this.sceneNumber = number
		switch (this.sceneNumber) {
			case 1:
				this.speedY = -48
				this.buttonY = game.canvas.height
				this.buttonX = game.canvas.width / 2
				game.bird = new Bird()
				game.pipeArr = new Array()
				game.scrope = 0
				new Pipe()
				break;
			case 2:
				game.bird.y = 150
				this.tutorialOpcity = 1
				this.isTutorialDown = true
				this.speedY = 0
				this.buttonX = 0
			case 3:
				game.Fno = 0
				break;
			case 4:
				let audio = document.getElementById('audio')
				audio.play()
			case 5: //游戏结束重新开始
				game.ctx.globalAlpha = 1
				game.Fno = 0
				this.speedY = -48
				this.buttonY = game.canvas.height
				this.buttonX = game.canvas.width / 2
				this.birdFno = 0 //控制落地动画图片的切片
				this.birdSpeed = 0
				this.birdSpeedX = 0 //截取小鸟落地图片的横坐标
				this.birdSpeedY = 0 //截取小鸟落地图片的纵坐标
				this.bengCount = 0 //爆炸图片个数


		}
	}
	//canvas 点击事件
	SceneManage.prototype.bindEvent = function () {
		var _this = this
		game.canvas.onclick = function (e) {
			var mouseX = e.clientX
			var mouseY = e.clientY
			switch (_this.sceneNumber) {
				case 1:
					if (mouseX > _this.buttonX - 58 && mouseX < _this.buttonX + 58 && mouseY > _this.buttonY && mouseY < _this.buttonY + 70) {
						_this.enter(2)
					}
					break;
				case 2:
					_this.enter(3)
					break;
				case 3:
					if (mouseX < (game.canvas.width - 40) || mouseX > (game.canvas.width - 12) || mouseY > 20 || mouseY < 48) {
						game.bird.fly()
					}
					break;
				case 5:
					if(_this.buttonY == 500 && mouseX > _this.buttonX - 58 && mouseX < _this.buttonX + 58 && mouseY > _this.buttonY && mouseY < _this.buttonY + 70) {
						_this.enter(1)
					}
					break;

			}
		}
		document.onkeyup = function (e) {
			var e = window.event || e
			var mouseX = e.clientX
			var mouseY = e.clientY
			if (e.keyCode == 32) {
				switch (_this.sceneNumber) {
					case 3:
					case 4:
						_this.pauseOrresum = !_this.pauseOrresum
						_this.startOrEnd()
						break;

				}
			}
		}
	}
	//暂停按钮开始按钮显示
	SceneManage.prototype.startOrEnd = function () {
		let imgurl = this.pauseOrresum ? game.R['pause'] : game.R['resume']
		game.ctx.drawImage(imgurl, game.canvas.width - 40, 20, 26, 28)
		this.pauseOrresum ? game.timeInterval() : clearInterval(game.timer)
	}
})(window)
