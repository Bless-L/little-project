var score = 0;
var board = [];
var hasConflicted = [];

$(document).ready(function() {
	newgame();
})

function newgame() {
	//初始化棋盘格
	init();
	//随机在棋盘生成两个数字
	generateNum();
	generateNum();
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var grid = $("#grid-" + i + "-" + j);
			grid.css("top", getTop(i));
			grid.css("left", getLeft(j));
		}
	}
	for (var i = 0; i < 4; i++) {
		board[i] = [];
		hasConflicted[i] = [];
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();
	score = 0;
}

function updateBoardView() {

	$(".number-grid").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#container").append( '<div class="number-grid" id="number-'+i+'-'+j+'"></div>' );
			var numberGrid = $("#number-" + i + "-" + j);

			if (board[i][j] == 0) {
				numberGrid.css("width", 0);
				numberGrid.css("height", 0);
				numberGrid.css("top", getTop(i));
				numberGrid.css("left", getLeft(j));
			} else {
				numberGrid.css("width", 100);
				numberGrid.css("height", 100);
				numberGrid.css("top", getTop(i));
				numberGrid.css("left", getLeft(j));
				numberGrid.css("background-color", getBackgroundColor(board[i][j]));
				numberGrid.css("color", getColor(board[i][j]));
				numberGrid.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
}

function generateNum() {

	if (noSpace()) return false;

	//随机生成一个位置
	var ranX = parseInt(Math.floor(Math.random() * 4));
	var ranY = parseInt(Math.floor(Math.random() * 4));

	while(true){
		if (board[ranX][ranY] ==0 ) break;
		ranX = parseInt(Math.floor(Math.random() * 4));
		ranY = parseInt(Math.floor(Math.random() * 4));
	}


	//随机生成一个数
	var ranNum = Math.random() < 0.5 ? 2 : 4;

	//把数显示出来
	board[ranX][ranY] = ranNum;
	showNumber(ranX, ranY, ranNum);

	return true;
}

$(document).keydown(function (event){
	switch (event.keyCode){
		case 37:
			//left
			if (canMove(event.keyCode)) {
				moveLeft();			
			}
			isGameover();
			break;
		case 38:
			//top
			if (canMove(event.keyCode)) {
				moveTop();
			}
			isGameover();
			break;
		case 39:
			//right
			if (canMove(event.keyCode)) {
				moveRight();
			}
			isGameover();
			break;
		case 40:
			//down
			if (canMove(event.keyCode)) {
				moveDown();
			}
			isGameover();
			break;
		default:
			break;
	}
})