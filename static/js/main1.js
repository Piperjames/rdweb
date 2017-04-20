function openfile(ftype,fname,ffname){
	if (ftype == 'folder'){
		openfolder(ffname);
	}
	else if (ftype == 'pic'){
		openimage(ffname);
	}
	else if (ftype == 'vid'){
		playvideo();
	}
	else if (ftype == 'aud'){
		playmusic();
	}
	else if (ftype == 'doc'){
		viewdoc();
	}
	else if (ftype == 'file'){
		fileviewer();
	}
};

function openfolder(ffname){
	$.get('folder',{
		foldername: ffname
	}, function(data){
		$('ul#directory').html(data);
	});
};

function playvideo(){
	
};

function playmusic(){
	
};

function viewdoc(){
	
};

function fileviewer(){
	
};

function checktype(fname){
	var pictures = ['jpg','jpeg','png','ico','gif'];
	var musicfiles = ['mp3','aac','ogg','m4a'];
	var videos = ['mp4','mkv','flv'];
	var docfile = ['doc', 'docx', 'pdf', 'txt'];
	var dvdfile = fname.split('.');
	if (dvdfile.length > 1){
		var ext = dvdfile[1];
		if ($.inArray(ext, pictures) != -1){
			return 'pic';
		}
		else if ($.inArray(ext, videos) != -1){
			return 'vid';
		}
		else if ($.inArray(ext, docfile) != -1){
			return 'doc';
		}
		else if ($.inArray(ext, musicfiles) != -1){
			return 'aud'
		}
		else {
			return 'file';
		}
	}
	else {
		return 'folder';
	}
	
};

function openimage(fname, ffname){
	$('.image').attr('src',ffname);
	$('div.viewer').css('display', 'block');
	$('.imageviewer').show();
}

jQuery.fn.imageview = function(options){
	var opts = $.extend({}, $.fn.imageview.defaults, options);
	
	var imgsrc = opts.src;
	var img = "<img class='image ui-widget' src='"+imgsrc+"'/>";
	var imgbox = "<div class='imageviewer'>";
	imgbox += img+"</div>";
	imgbox += "<style type='text/stylesheet'>"
	imgbox += "div.imageviewer {display: block; width: 150em;";
	imgbox += "height: 100em; background: #e4e4e43;";
	imgbox += "}</style>";
	this.append(imgbox);
	return this;
}

jQuery.fn.mplayer = function(options){
	var opts = $.extend({}, $.fn.mplayer.defaults, options);
	
	var audsrc = opts.src;
	var audplayer = new Audio();
	audplayer.src = audsrc;
	audplayer.play();
}


$(function(){
	$('.viewer').hide();
	$('ul#directory').on('click','li.direc',function(){
		$('li.direc').removeClass('selected');
		$(this).addClass('selected');
	});
	$('ul#directory').on('dblclick','li.direc',function(e)){
	var ffname = $(this).attr('alt');
	var fname = $(this).attr('title');
	var divfile = fname.split('.');
	if (divfile.length > 1){
		var ext = divfile[1];
		ftype = checktype(fname);
		openfile(ftype,fname,ffname);

		
	}
	else{
		openfolder(ffname);
	}
	});
	
	$('.predir').click(function(){
		$.get('goback',function(data){
			$('ul#directory').html(data);
		});
	});
	$('.permalink').click(function(){
		ffname = $(this).attr('alt');
		openfolder(ffname);
	});
});

jQuery.fn.imageview.defaults = {
	src : 'static/images/images.png'
}

jQuery.fn.mplayer.defaults = {
	src : ''
}