function childMenuOpen ()
{
	var parse = document.location;
	link = $(document).find("a[href='" + parse.pathname + "']");
	link.addClass('active');
	parent = link.parent().parent().addClass('in');
	parent.attr('aria-expanded', true);
	parent = parent.parent().find('a[data-toggle=collapse]');
	parent.removeClass('collapsed');
	parent.attr('aria-expanded', true);
	//console.log(link);
}


function hideBtnMenu ()
{
	if ($.cookie("collapse-menu") === 'hide')
	{
		$("#collapse-menu").hide();
	}
	else if ($.cookie("collapse-menu") === 'show')
	{
		$("#collapse-menu").show();
	}
}

function hideMenu ()
{
	$("#collapse-menu-btn").removeClass('glyphicon-menu-left');
	$("#collapse-menu-btn").addClass('glyphicon-menu-hamburger');
	$("#collapse-menu").removeClass('in');
	$("#collapse-menu").addClass('out');	
	$('.sidebar').hide();
	$('.main').removeClass('col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2');
	$('.main').addClass('col-sm-12 col-lg-12 main');
	$.cookie("sidebar", 'hide', { path: '/' });
}

function showMenu ()
{
	$("#collapse-menu-btn").removeClass('glyphicon-menu-right');
	$("#collapse-menu-btn").addClass('glyphicon-menu-left');
	$("#collapse-menu").removeClass('out');
	$("#collapse-menu").addClass('in');	
	$('.main').removeClass('col-sm-12 col-lg-12');
	$('.main').addClass('col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main');
	$('.sidebar').show();
	$('.sidebar').removeAttr('style');
	$.cookie("sidebar", 'show', { path: '/' });
}

function menuBehavior ()
{
	if ($.cookie("sidebar") === 'hide')
	{
		hideMenu();
	}
	else if ($.cookie("sidebar") === 'show')
	{
		showMenu();
	}
}

function windowSize ()
{
	showMenu ();
	
	if ($(window).width() > 768) {
		$.cookie("collapse-menu", 'show', { path: '/' });
		$("#collapse-menu").show();
		$('#sidebar-collapse').collapse('show');
	}

	if ($(window).width() <= 1024 && $(window).width() > 768) {
		$("#collapse-menu").click();
	}

	if ($(window).width() <= 767) {
		$.cookie("collapse-menu", 'hide', { path: '/' });
		$("#collapse-menu").hide();
		$('#sidebar-collapse').collapse('hide');
	}
}

!function($) {
	$(document).on("click", "ul.nav li.parent > a[data-toggle=collapse]", function() {
		$(this).find('em:first').toggleClass("glyphicon-minus");
	});
	
	$(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
}(window.jQuery);


$(window).on('resize', function() {
	if ($('body').attr('class') == 'default')
	{
		windowSize();
	}
});

$(document).ready(function() {
	if ($('body').attr('class') == 'default')
	{
		childMenuOpen();
		menuBehavior();
		hideBtnMenu();
		
		$("#collapse-menu").unbind('click').bind('click', function(){
			if ($(this).hasClass('in'))	{
				hideMenu();
			}
			else {
				showMenu();
			}
		});
	}
});

