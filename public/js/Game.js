(function() {
	var Game = window.Game = function(param) {
		this.canvas = document.getElementById(param.id)
		this.ctx = this.canvas.getContext('2d')
		this.Rurl = param.Rurl
		this.pipeArr = []
		this.Fno = 0
		this.scrope = 0
		this.isa = false // 夸奖的提示音
		//设置画布的宽度和高度
		this.init()
		this.loadAllResource(function(){
			this.start()
		})
//		this.bindEvent()
		//实例化场景
	}
	Game.prototype.init = function() {
		var windowW = document.documentElement.clientWidth
		var windowH = document.documentElement.clientHeight
		if(windowW > 414) {
			windowW = 414
		} else if(windowW < 320) {
			windowW = 320
		}
		if(windowH > 736) {
			windowH = 736
		} else if(windowH < 568) {
			windowH = 568
		}
		this.canvas.width = windowW
		this.canvas.height = windowH
	}
	Game.prototype.loadAllResource = function(callback) {
		this.R = {}
		var _this = this
		var alreadyNumber = 0
		var xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function() {
			// readyState == 4说明请求已完成
			if(xhr.readyState == 4 && xhr.status == 200) {
				var Robj = JSON.parse(xhr.responseText)
				for(var i = 0; i< Robj.images.length; i++) {
					_this.R[Robj.images[i].name] = new Image()
					_this.R[Robj.images[i].name].src = Robj.images[i].url
					_this.R[Robj.images[i].name].onload = function(){
						alreadyNumber++
						_this.ctx.font = '18px 微软雅黑'
						_this.ctx.textAlign = "center"
						_this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
						var txt = '正在加载'+ alreadyNumber + '/' + Robj.images.length + '资源'
						_this.ctx.fillText(txt,_this.canvas.width*0.5,_this.canvas.height*(1-0.618))
						if(alreadyNumber == Robj.images.length) {
							_this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
							callback.call(_this)
						}
					}
				}
			}
		}
		xhr.open('get', this.Rurl, true)
		xhr.send(null)
		
	}
	Game.prototype.start = function() {
		var _this = this
		this.sm = new SceneManage()
//		this.background = new Background()
//		this.land = new Land()
//		this.bird = new Bird()
//		this.pipe = new Pipe()
		this.timeInterval()
}
  Game.prototype.timeInterval = function () {
	  var _this = this
		this.timer = setInterval(function(){
			_this.Fno++
			_this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
//			_this.background.updata()
			_this.sm.render()
			_this.sm.updata()
//			_this.land.updata()
//			_this.land.render()
//			for(var i = 0; i < _this.pipeArr.length; i++) {
//				_this.pipeArr[i].updata()
//				_this.pipeArr[i]&&_this.pipeArr[i].render()
//			}
//			if(_this.Fno % 120 == 0) {
//				new Pipe()
//			}
//			_this.bird.updata()
//			_this.bird.render()	
//		 var scropeLength = _this.scrope.toString().length
//		 for (var i = 0; i < scropeLength; i++) {
//		 	_this.ctx.drawImage(_this.R['num'+ _this.scrope.toString().charAt(i)], _this.canvas.width / 2 - scropeLength / 2 * 34 + 34 * i, 20)
//		 }
		},30)
	}
})(window)