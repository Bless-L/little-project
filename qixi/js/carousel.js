var carousel = function(element) {


	var that = this;
	that.num = 0;
	that.url = [
		'./images/carousel/1.mp4',
		'./images/carousel/2.mp4',
		'./images/carousel/3.mp4'
	]


	this.carousel = $(element);

	this.spinner = this.carousel.find('#spinner');

	this.pic = this.carousel.find('#spinner').find('figure');

	this.video = $('video');

	this.count = this.pic.length;

}

carousel.prototype = {

	init: function() {

		var that = this;

		that.pic.each(function(i) {
			var angle = 360 / that.count * i;

			$(this).css({
				'transform': 'rotateY(' + angle + 'deg)   translateZ(6rem)',
				'transition': '1s'
			})
		})
		that.carousel.show();;

	},

	run: function(num) {

		var dfd = $.Deferred();
		var that = this;

		var angle = 360 / that.count * (num);

		that.spinner
			.css({
				'transform': 'rotateY(' + angle + 'deg)',
				"transition": "1.5s"
			}).one("transitionend webkitTransitionend", function() {
				dfd.resolve();
			})

		return dfd;

	},

	playVideo: function(url) {

		var dfd = $.Deferred();
		video = $('video');

		video.attr('src', url);

		video.on("loadeddata", function() {
			video[0].play();
		})

		video.on("ended", function() {
			video[0].pause();
			video.attr('src', '');
			dfd.resolve();
		})

		return dfd;
	},

	start: function() {

		var that = this;
		var dfd = $.Deferred();
		that.run(that.num++)
			.then(function() {
				return that.playVideo(that.url[0]);
			})
			.then(function() {
				return that.run(that.num++);
			})
			.then(function() {
				return that.playVideo(that.url[1]);
			})
			.then(function() {
				return that.run(that.num++);
			})
			.then(function() {
				return that.playVideo(that.url[2]);
			})
			.then(function() {
				dfd.resolve();
				that.carousel.css('display', 'none');
			})

		return dfd;
	}
};