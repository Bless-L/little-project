function getTop(i) {
	return 20 + i * 120;
}

function getLeft(j) {
	return 20 + j * 120;
}

function getBackgroundColor( num ){

	switch( num ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
	return "black";
}

function getColor(num) {
	if (num <= 4)
		return "#776e65";

	return "white";
}

function noSpace(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]==0)return false;
		}
	}
	return true;
}

function canMove(keyCode) {
	switch (keyCode) {
		case 37:
			for (var i = 0; i < 4; i++) {
				for (var j = 1; j < 4; j++) {
					if (board[i][j] != 0 && (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])) return true;
				}
			}
			break;
		case 38:
			for (var i = 1; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					if (board[i][j] != 0 && (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j])) return true;
				}
			}
			break;
		case 39:
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 3; j++) {
					if (board[i][j] != 0 && (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])) return true;
				}
			}
			break;
		case 40:
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 4; j++) {
					if (board[i][j] != 0 && (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j])) return true;
				}
			}
			break;
		default:
			break;
	}
	return false;
}

function moveLeft() {
	while (canMove(37)) {
		for (var i = 0; i < 4; i++) {
			for (var j = 1; j < 4; j++) {
				if (board[i][j - 1] == 0 && board[i][j] != 0) {
					moveNumber(i,j,i,j-1);
					board[i][j - 1] = board[i][j];
					board[i][j] = 0;
				} else if (board[i][j] != 0 && board[i][j] == board[i][j - 1]) {
					moveNumber(i,j,i,j-1),
					board[i][j - 1] = 2 * board[i][j];
					board[i][j] = 0;
					score += board[i][j - 1];
					$("#score").text(score);
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	setTimeout("generateNum()",200);
}

function moveTop() {
	while (canMove(38)) {
		for (var i = 1; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i - 1][j] == 0 && board[i][j] != 0) {
					moveNumber(i,j,i-1,j);
					board[i - 1][j] = board[i][j];
					board[i][j] = 0;
				} else if (board[i][j] != 0 && board[i][j] == board[i - 1][j]) {
					moveNumber(i,j,i-1,j);
					board[i - 1][j] = 2 * board[i][j];
					board[i][j] = 0;
					score += board[i - 1][j];
					$("#score").text(score);
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	setTimeout("generateNum()",200);
}

function moveRight() {
	while (canMove(39)) {
		for (var i = 0; i < 4; i++) {
			for (var j = 2; j > -1; j--) {
				if (board[i][j + 1] == 0 && board[i][j] != 0) {
					moveNumber(i,j,i,j+1);
					board[i][j + 1] = board[i][j];
					board[i][j] = 0;
				} else if (board[i][j] != 0 && board[i][j] == board[i][j + 1]) {
					moveNumber(i,j,i,j+1);
					board[i][j + 1] = 2 * board[i][j];
					board[i][j] = 0;
					score += board[i][j + 1];
					$("#score").text(score);
					hasConflicted[i][j + 1] = true;
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	setTimeout("generateNum()",200);
}

function moveDown() {
	while (canMove(40)) {
		for (var i = 2; i > -1; i--) {
			for (var j = 0; j < 4; j++) {
				if (board[i + 1][j] == 0 && board[i][j] != 0) {
					moveNumber(i,j,i+1,j);
					board[i + 1][j] = board[i][j];
					board[i][j] = 0;
				} else if (board[i][j] != 0 && board[i][j] == board[i + 1][j]) {
					moveNumber(i,j,i+1,j);
					board[i + 1][j] = 2 * board[i][j];
					board[i][j] = 0;
					score += board[i + 1][j];
					console.log(score);
					$("#score").text(score);
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	setTimeout("generateNum()",210);
}

function isGameover() {
    if (canMove(37)||canMove(38)||canMove(39)||canMove(40)) {return};
    console.log(1)
    alert("Game Over!");
}