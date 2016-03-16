function showNumber(i, j, num) {

	var numberGrid = $("#number-" + i + "-" + j);

	numberGrid.css("background-color", getBackgroundColor(num));
	numberGrid.css("color", getColor(num));
	numberGrid.text(num);

	numberGrid.animate({
		width: "100px",
		height: "100px",
		top: getTop(i),
		left: getLeft(j)
	}, 200);

}

function moveNumber(i, j ,newi, newj) {
	var numberGrid = $("#number-" + i + "-" + j);

	numberGrid.animate({
		top: getTop(newi),
		left: getLeft(newj)
	}, 200);
}
