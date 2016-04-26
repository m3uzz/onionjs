$(document).ready(function() {
	$('#container').hide();
	$.vegas({
		src : '/vendor/m3uzz/onionjs-0.16.4/dist/img/flamingo.jpg',
		fade : 2000,
		complete : function() {
			$('#container').fadeIn(1000);
			$.vegas('slideshow', {
				delay : 8000,
				backgrounds : [ {
					src : '/vendor/m3uzz/onionjs-0.16.4/dist/img/flamingo.jpg',
					fade : 2000
				}, {
					src : '/vendor/m3uzz/onionjs-0.16.4/dist/img/salar.jpg',
					fade : 2000
				}, {
					src : '/vendor/m3uzz/onionjs-0.16.4/dist/img/trem.jpg',
					fade : 2000
				}, ]
			})('overlay', {
				src : '/vendor/jaysalvat/vegas-2.2.0/dist/overlays/07.png'
			});
		}
	});
	$.vegas('overlay', {
		src : '/vendor/jaysalvat/vegas-2.2.0/dist/overlays/07.png'
	});
});
