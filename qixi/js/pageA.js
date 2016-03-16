var pageA = function  (element,callback) {


	
	this.pageA = $(element);

	this.chsBoy= this.pageA.find('.chs-boy');

	this.windowsLeft = this.pageA.find('.window-left');

	this.windowsRight = this.pageA.find('.window-right');

	this.run(callback);
}

	pageA.prototype = {

		next: function(options) {
			var dfd = $.Deferred();
			this.chsBoy.transition(options.style, options.time,
				'linear',
				function() {
					dfd.resolve()
				});
			return dfd;
		},

		stopWalk: function() {
			this.chsBoy.removeClass('chs-boy-deer');
		},

		openWindow: function(callback) {
			var count = 1;
			var complete = function() {
				++count
				if (count === 2) {
					callback && callback();
				}
			}
			var bind = function(data) {
				data.one("transitionend webkitTransitionEnd", function(event) {
					data.removeClass("window-transition");
					complete()
				})
			}
			bind(this.windowsLeft.addClass("window-transition").addClass("hover"));
			bind(this.windowsRight.addClass("window-transition").addClass("hover"));
		},


		run:function(callback){
			var that = this;
			var next = function(options){
				return that.next(options);
			};

			next({
				"time": 7000,
        		"style": {
            		"top": "20rem",
           			"right": "88rem",
            		"scale": "1.2"
        			}
			})
			.then(function(){
				return next({
					 	"time":500,
            			"style": {
               				"rotateY" : "-180",
               				"scale": "1.3"
            				}
					})
			})
			.then(function(){
				return next({
					 	"time":7000,
            			"style": {
               				"top" : "30rem",
               				"right": "10rem"
            				}
					})
			})
			.then(function(){
				that.stopWalk();
				that.openWindow(callback);
			})
		},
	}
