var pageC = function(element) {

	var that =this;
	this.pageC = $(element);

	this.deer = this.pageC.find('.deer');
	this.windowLeft = this.pageC.find('.window-left-c');
	this.windowRight = this.pageC.find('.window-right-c');
	this.sceneBg = this.pageC.find('.window-scene-bg');
	this.closeBg = this.pageC.find('.window-close-bg');

	this.sceneBg.transition({
		opacity: 0,
	}, 3000);
	this.closeBg.css("transform", "translateZ(0)")
	this.closeBg.transition({
		opacity: 1
	}, 5000);

	this.closeWindow(function(){
			that.deerMove();
	});

}

pageC.prototype = {
	closeWindow: function(callback) {
		var count = 1;
		var complete = function() {
			++count
			if (count === 2) {
				callback && callback();
			}
		}
		var bind = function(data) {
			data.one("transitionend webkitTransitionEnd", function(event) {
				data.removeClass("window-transition-c");
				complete()
			})
		}
		bind(this.windowLeft.addClass("window-transition-c").addClass("close"));
		bind(this.windowRight.addClass("window-transition-c").addClass("close"));
	},

	next: function(options) {
		var dfd = $.Deferred();
		this.deer.transition(options.style, options.times,
			'linear',
			function() {
				dfd.resolve();
			})
		return dfd;
	},

	deerMove: function() {
		var that = this;

		that.next({
				'times': '5000',
				'style': {
					'right': '-20rem',
					'bottom': '15rem',
					'scale': '0.9',
				}
			})
			.then(function() {
				return that.next({
					"time": 500,
					"style": {
						"rotateY": "-180",
					}
				})
			})
			.then(function() {
				return that.next({
					'times': '10000',
					'style': {
						'right': '66rem',
						'bottom': '40rem',
						'scale': '0.2',
					}
				})
			})
	}
};