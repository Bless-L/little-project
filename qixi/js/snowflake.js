/**
 * 雪球
 * @param {[type]} element [description]
 */

function snowflake(element) {
	var snowElement = document.getElementById(element);

	var context = snowElement.getContext('2d');

	//修正宽高
	var width = docEl.clientWidth;
	var height = docEl.clientHeight;
	snowElement.width = width;
	snowElement.height = height;

	//雪球的数量
	var snowNum = 50;

	//构建雪球对象
	var snowArrObjs = initSnow(snowNum, width, height);

	var snowArrNum = snowArrObjs.length;

	/**
	 * 绘制页面
	 * @return {[type]} [description]
	 */
	var render = function() {
		//清理之前的矩形数据
		context.clearRect(0, 0, width, height);
		for (var i = 0; i < snowArrNum; ++i) {
			snowArrObjs[i].render(context);
		}
	}

		/**
		 * 更新雪花
		 * @return {[type]} [description]
		 */

	var update = function() {
		for (var i = 0; i < snowArrNum; ++i) {
			snowArrObjs[i].update();
		}
	}

	/**
	 * 绘制与更新
	 * @return {[type]} [description]
	 */
	var renderAndUpdate = function() {
		render();
		update();
		requestAnimationFrame(renderAndUpdate);
	}

	renderAndUpdate();

}


function initSnow(snowNumber, width, height) {
	//雪球参数
	var options = {
		//雪球的半球距离
		minRadius: 5,
		maxRadius: 15,
		// 运动的范围区域
		maxX: width,
		maxY: height,
		//速率
		minSpeedY: 0.05,
		maxSpeedY: 2,
		speedX: 0.05,
		//滤镜
		minAlpha: 0.5,
		maxAlpha: 1.0,
		minMoveX: 4,
		maxMoveX: 18
	}
	var snowArr = [];
	for (var i = 0; i < snowNumber; ++i) {
		snowArr[i] = new Snow(options);
	}
	return snowArr;
}


function Snow(snowSettings) {
	this.snowSettings = snowSettings;
	this.radius = randomInRange(snowSettings.minRadius, snowSettings.maxRadius);
	//初始的x位置
	this.initialX = Math.random() * snowSettings.maxX;
	this.y = -(Math.random() * 500);
	//运行的速率
	this.speedY = randomInRange(snowSettings.minSpeedY, snowSettings.maxSpeedY);
	this.speedX = snowSettings.speedX;
	//滤镜
	this.alpha = randomInRange(snowSettings.minAlpha, snowSettings.maxAlpha);
	//角度.默认是360
	this.angle = Math.random(Math.PI * 2);
	//运行的距离
	this.x = this.initialX + Math.sin(this.angle);
	//x移动距离
	this.moveX = randomInRange(snowSettings.minMoveX, snowSettings.maxMoveX);
}


/**
 * 绘制雪球
 * @param  {[type]} canvasContext [description]
 * @return {[type]}               [description]
 */
Snow.prototype.render = function(context) {
	//清除路径
	//开始一个画布中的一条新路径（或者子路径的一个集合）
	context.beginPath();
	//用来填充路径的当前的颜色，白色的雪球
	context.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
	//一个中心点和半径，为一个画布的当前子路径添加一条弧线
	//坐标，圆，沿着圆指定弧的开始点和结束点的一个角度
	//弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
	context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	//关闭子路径
	context.closePath();
	//fill() 方法使用 fillStyle 属性所指定的颜色、渐变和模式来填充当前路径
	context.fill();
}

Snow.prototype.update = function() {
	this.y += this.speedY;
	if (this.y > this.snowSettings.maxY) {
		this.y -= this.snowSettings.maxY;
	}
	this.angle += this.speedX;
	if (this.angle > Math.PI * 2) {
		this.angle -= Math.PI * 2;
	}
	this.x = this.initialX + this.moveX * Math.sin(this.angle);
}


/**
 * 随机处理
 * @param  {[type]} min [description]
 * @param  {[type]} max [description]
 * @return {[type]}     [description]
 */
function randomInRange(min, max) {
	var random = Math.random() * (max - min) + min;
	return random;
}

