var pageB = function(element, callback) {

	this.pageB = $(element);

	var boy = this.pageB.find('.boy');

	var girl = this.pageB.find('.girl');

	var boyAction = {
		
		walk: function() {
			var dfd = $.Deferred();
			boy.animate({
				'right': '23rem'
			}, 4000, 'linear', function() {
				dfd.resolve();
			})
			return dfd;

		},

		runwalk: function() {

		},
		stopWalk: function() {
			boy.removeClass("boy-walk");
			boy.addClass("boy-stand");
		},

		unwrapp: function() {
			var dfd = $.Deferred();
			boy.removeClass("boy-stand");
			boy.addClass("boy-unwrapp");
			boy.one('animationend webkitAnimationEnd', function() {
				dfd.resolve();
			})
			return dfd;
		},

		strip: function() {
			var dfd = $.Deferred();
			setTimeout(function() {
				boy.addClass('boy-strip-' + 1).removeClass('boy-unwrapp');
			}, 1000)
			setTimeout(function() {
				boy.addClass('boy-strip-' + 1).removeClass('boy-unwrapp');
			}, 2000)
			setTimeout(function() {
				boy.addClass('boy-strip-' + 1).removeClass('boy-unwrapp');
				dfd.resolve();
			}, 3000)

			return dfd;
		},

		hug: function(callback) {
			boy.addClass('boy-hug')
				.one('animationend webkitAnimationEnd', function() {
					$(".christmas-boy-head").show();
					callback();
				});

		},

		/*
				run:function(){
					var that = this;
					that.walk()
						.then(function(){
							that.stopWalk();
						})
						.then(function(){
							return that.unwrapp();
						})
						.then(function(){
							//脱衣动作
		            		setTimeout(function(){
		              			that.strip(1)
		            		},1000)
		            		setTimeout(function(){
		                		that.strip(2)
		            		},2000)
		            		setTimeout(function(){
		                		that.strip(3)
		            		},3000)
						})
				}*/
	}

	var girlAction = {


		stand: function() {
			var dfd = $.Deferred();
			girl.addClass('girl-standUp')
				.one('animationend webkitAnimationEnd', function() {
					girl.addClass('girl-throwBook');
					setTimeout(function() {
						$('.cat').css('background-image','url(./images/b/cat-book.png)');
						dfd.resolve();
					}, 400);
				})

			return dfd;
		},

		walk: function() {
			var dfd = $.Deferred();
			girl.addClass('girl-walk');
			girl.animate({
				'left': '25rem'
			}, 4000, 'linear', function() {
				dfd.resolve();
			})
			return dfd;
		},

		stopWalk: function() {
			girl.addClass('walk-stop')
				.removeClass('girl-throwBook')
				.removeClass('girl-standUp')
				.removeClass('girl-walk')
				.addClass('girl-stand');
		},

		choose: function() {
			var dfd = $.Deferred();
			girl.addClass('girl-choose').removeClass("walk-stop");
			girl.one('animationend webkitAnimationEnd', function() {
				dfd.resolve();
			})

			return dfd;
		},

		weepWalk: function() {
			var dfd = $.Deferred();
			girl.addClass('girl-weepWalk').removeClass('girl-choose');
			girl.transition({
				'left': '47.4rem'
			}, 1000, 'linear', function() {
				girl.addClass("walk-stop").removeClass("girl-weepWalk");
				dfd.resolve();
			})

			return dfd;
		},

		hug: function() {
			girl.addClass('girl-hug');
		},

		/*		run:function(){
					var that = this;
					that.stand()
						.then(function(){
							return that.walk();
						})
						.then(function(){
							that.stopWalk();

							that.choose(function(){

								that.weepWalk(function(){

									that.hug();
								})
							})
						})
				}*/
	}


	var car = new carousel('#carousel');


	boyAction.walk()
		.then(function() {
			boyAction.stopWalk();
			return girlAction.stand();
		})
		.then(function() {
			return girlAction.walk();
		})
		.then(function() {
			girlAction.stopWalk();
			return boyAction.unwrapp();
		})
		.then(function() {
			car.init();
			return girlAction.choose();
		})
		.then(function() {
			return car.start();
		})
		.then(function() {
			return boyAction.strip();
		})
		.then(function() {
			return girlAction.weepWalk();
		})
		.then(function() {
			girlAction.hug();
			boyAction.hug(callback);
		})
}