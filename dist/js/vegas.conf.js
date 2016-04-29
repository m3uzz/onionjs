var bgVegas = [
    { src: '/vendor/m3uzz/onionjs-0.16.4/dist/img/trem.jpg' },
   	{ src: '/vendor/m3uzz/onionjs-0.16.4/dist/img/salar.jpg' },
   	{ src: '/vendor/m3uzz/onionjs-0.16.4/dist/img/flamingo.jpg' }
];

$(document).ready(function() {
	$('#container').hide();

	$('body').vegas({
	    delay: 12000,
	    timer: true,
	    color: '#333333',
	    overlay: '/vendor/jaysalvat/vegas-2.2.0/dist/overlays/07.png',
	    shuffle: false,
	    transition: 'blur2',
	    animation: 'random',
	    transitionDuration: 4000,
	    slides: bgVegas
	});
});
