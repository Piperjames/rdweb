$(function(){
	$('.viewer').hide();
	$('li.direc').click(function(e){
		$('li.direc').removeClass('selected');
		$(this).addClass('selected');
	});
	
	$('.closebutton').click(function(){
		$('.viewer').hide();
	});
	
	$('li.direc').dblclick(function(e){
		var fullfilename = $(this).attr('alt');
		var filename = $(this).attr('title');
		$('.title').text(filename);
		var divfile = filename.split('.');
		var openable = ['jpg','jpeg','png','ico','gif'];
		if (divfile.length > 1){
			var ext = divfile[1];
			if ($.inArray(ext, openable) != -1){
				$('.viewer').show();
				$('.viewbox').html("<script type='text/javascript'>$('.viewbox').imageview({});</script>");
				$('.image').attr('src',fullfilename);
				$('div.viewer').css('display', 'block');
				$('.imageviewer').show();
			}
		}
	});
});

jQuery.fn.imageview = function(options){
	var opts = $.extend({}, $.fn.imageview.defaults, options);

	var imgsrc = opts.src;
	var img = "<img class='image ui-widget' src='"+imgsrc+"'></img>";
	var imgbox = "<div class='imageviewer'>";
	imgbox += img+"</div>";
	imgbox += "<style type='text/stylesheet'>"
	imgbox += "div.imageviewer {display: block; width: 150em;";
	imgbox += "height: 100em; background: #e4e4e43;";
	imgbox += "}</style></div>";
	this.append(imgbox);
	return this;
}

jQuery.fn.imageview.defaults = {
	src : 'static/images/images.png'
}