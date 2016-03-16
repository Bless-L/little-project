//change the jpg
function getResult(mychoice) {
	// body...
	document.getElementById('my-result').src = document.getElementById(mychoice.id).src;
	var computerResult = Math.random();
	if (computerResult < 0.33) {
		//jiandao
		document.getElementById('computer-result').src =
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/jiandao.jpg"
		document.getElementById('result-text').innerHTML = compare(mychoice, computerResult);
	} else if (computerResult < 0.67) {
		//shitou
		document.getElementById('computer-result').src =
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/shitou.jpg"
		document.getElementById('result-text').innerHTML = compare(mychoice, computerResult);
	} else {
		//bu
		document.getElementById('computer-result').src =
			"https://raw.githubusercontent.com/baidu-ife/ife/master/2015_summer/asset/bu.jpg"
		document.getElementById('result-text').innerHTML = compare(mychoice, computerResult);
	};

}
//win or lose or tie
function compare(mychoice, computerResult) {
	if (mychoice.id == "jian") {
		if (computerResult < 0.33) {
			return "Result:Tie";
		} else if (computerResult < 0.67) {
			return "Result:Lose";
		} else {
			return "Result:Win";
		};
	} else if (mychoice.id == "shitou") {
		if (computerResult < 0.33) {
			return "Result:Win";
		} else if (computerResult < 0.67) {
			return "Result:Tie";
		} else {
			return "Result:Lose";
		};
	} else {
		if (computerResult < 0.33) {
			return "Result:Lose";
		} else if (computerResult < 0.67) {
			return "Result:Win";
		} else {
			return "Result:Tie";
		};
	};
}