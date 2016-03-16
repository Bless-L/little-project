/*定义各种必须的全局变量---------------------------------------*/

//画板宽高
var width = 400;
var height = 450;


var score = document.getElementById('score');
var time = document.getElementById('time');
//秒数
var secsond;
//得分
var scoreNum;

//canvas画板，h5新标签
var canvas = document.getElementById('myCanvas');
var cxt = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

//等待图片加载完成
var catReady = false;
var goldReady = false;

var goldImage = new Image();

goldImage.onload = function() {
	goldReady = true;
}

goldImage.src = "gold.png";

var catImage = new Image();
catImage.onload = function() {
	catReady = true;
}
catImage.src = "cat.png";


/*定义各种必须的全局变量---------------------------------------*/


//元宝对象
var gold = function(goldImage) {

	var options = {

		img: goldImage,

		width: 60,
		height: 40,

		minX: 0,
		maxX: width - 60,

		y: -50,

		speedY: 2,
	}

	//判断是否被接住的标志
	this.catch = false;
	//判断是否已经溢出画板的标志
	this.overflow = false;

	this.img = options.img;
	this.width = options.width;
	this.height = options.height;
	this.y = options.y;
	this.speedY = options.speedY;
	this.x = Math.random() * options.maxX;

}
//画出元宝
gold.prototype.render = function() {
	if (goldReady) {
		//cxt.clearRect(0, 0, width, height);
		//描绘出元宝
		cxt.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
};
//元宝下降
gold.prototype.update = function() {

	if (!this.catch && this.y < height) {
		this.y += this.speedY;
	} else {
		//标志已经溢出画板
		this.overflow = true;
	}
}


//猫对象
var cat = function(catImage) {

	//数据初始化
	this.img = catImage;
	this.speedX = 25;
	this.width = 70;
	this.height = 100;
	this.x = (width - 70) / 2;
	this.y = height - this.height;
}

//画出猫
cat.prototype.render = function() {
	if (catReady) {
		//描绘出cat
		cxt.clearRect(0, 0, width, height);
		cxt.drawImage(catImage, this.x, this.y, this.width, this.height);
	}
}

//猫移动事件监听
cat.prototype.move = function() {

	var that = this;

	document.onkeydown = function(e) {

		if (that.x > 0) {
			if (e && e.keyCode == 37) {
				that.x -= that.speedX;
			}
		}
		if (that.x < width - that.width) {
			if (e && e.keyCode == 39) {
				that.x += that.speedX;
			}
		}
	}
}

//判断是否接到了元宝

var isCatch = function(cat, gold) {
	if (Math.abs(cat.x - gold.x) <= 60 && cat.y - gold.y <= 20) {
		gold.catch = true;
		//同时增加分数
		++scoreNum;
		score.innerHTML = '得分：' + scoreNum;
	}
}

//游戏开始
var start = function() {


	scoreNum = 0;
	secsond = 60;

	//新游戏时清除上一轮的时间
	window.clearInterval(window.setTime);
	//window.clearInterval(window.goldCreat);

	//计时
	window.setTime = window.setInterval(function() {
		time.innerHTML = '时间：' + secsond-- + 's'
		gameOver();
	}, 1000)


	//最多的元宝数
	var Maxgold = 4;

	//存放元宝
	var goldObj = [];

	//新建猫
	var catObj = new cat(catImage);

	//创建元宝
	window.goldCreat = window.setInterval(function() {
		goldObj.push(new gold(goldImage));
	}, 1500)
	var run = function() {

		catObj.render();
		catObj.move();

		//大于4个则停止创建
		if (goldObj.length >= Maxgold) {
			window.clearInterval(window.goldCreat);
		}
		for (var i = 0; i < goldObj.length; i++) {

			goldObj[i].render();
			goldObj[i].update();

			//判断是否接住元宝
			isCatch(catObj, goldObj[i]);

			//元宝溢出或被接住后，新建一个元宝代替
			if (goldObj[i].catch || goldObj[i].overflow) {
					goldObj.splice(i, 1, new gold(goldImage))
			}
		}

		//动画运行
		window.stop = requestAnimationFrame(run);

	}

	run();
}

//时间够了
var gameOver = function() {
	if (secsond < 0 )
	{
		//停止计时，显示出分数
		window.clearInterval(window.setTime);
		window.cancelAnimationFrame(stop);
		var over = document.getElementById('over');
		over.innerHTML = '<p>游戏结束你的得分是:<br>' + scoreNum +'</p>';
		over.style.display = 'block';
	}
}

//新游戏
var reset = function() {

	//重置各种参数
	window.cancelAnimationFrame(stop);
	over.style.display = 'none';
	time.innerHTML = '时间：60s';
	score.innerHTML = '得分：0';
	cxt.clearRect(0, 0, width, height);
	setTimeout(start(), 500);
}

var newGame = document.getElementById('new_game');
newGame.addEventListener('click', function() {
	reset();
}, false)

