function audioPlay(url, loop) {

	var audio = new Audio(url);
	audio.autoplay = true;
	audio.loop = loop || false;
	audio.play();
	return {
		end: function(callback) {
			audio.addEventListener('ended', function() {
				callback();
			}, false);
		}
	}
}



function changePageA(element, effect, callback) {
	$(element)
		.addClass(effect)
		.one("animationend webkitAnimationEnd", function(e) {
				console.log(0)
				callback && callback();
		})
}

function changePageB(element, effect, callback) {
	$(element)
		.addClass(effect)
		.one("animationend webkitAnimationEnd", function(e) {
			if (e.type == 'webkitAnimationEnd') {
				console.log(0)
				callback && callback();
			}
		})
}




var Chrismas = function() {
	// body...

	var $pageA = '.page-a';
	var $pageB = '.page-b';
	var $pageC = '.page-c';


	var observer = new Observer();


	new pageA($pageA,
		function() {
			observer.publish('completeA');
		})

	observer.subscribe('pageB', function() {
		new pageB($pageB, function() {
			observer.publish('completeB');
		})
	})

	observer.subscribe('pageC', function() {

	})


	observer.subscribe('completeA', function() {
		changePageA($pageA, 'effect-out', function() {
			observer.publish("pageB")
		})
	})


	observer.subscribe('completeB', function() {
		changePageB($pageB, 'effect-in', function() {

			snowflake("snowflake");
			new pageC($pageC);
		})
	})
}
audioPlay('./music/scene.mp3');
Chrismas();