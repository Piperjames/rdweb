function openfile(ftype,fname,ffname){
	if (ftype == 'folder'){
		openfolder(ffname);
	}
	else if (ftype == 'pic'){
		openimage(fname, ffname);
	}
	else if (ftype == 'vid'){
		playvideo();
	}
	else if (ftype == 'aud'){
		playmusic(ffname, fname);
	}
	else if (ftype == 'doc'){
		viewdoc(fname, ffname);
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
		$('input.fofname').attr('value',ffname);
		$('.fofname').attr('value',ffname);
	});
};

function playvideo(){
	
};

function playnext(playlist, player, mcount){
	if ($('li.shuffle').hasClass('on')){
		mcount = Math.floor(Math.random()*playlist.length);
	};
	var src = playlist[mcount];
	var parts = src.split('/');
	fname = parts[parts.length-1];
	$('.musicname').text(fname);
	player.src = src;
	player.play();
};

function getplaylist(){
	var playlist = [];
	$('#playlist').html('');
	$('li.direc').each(function(){
		var mfile = $(this).attr('alt');
		if ((checktype(mfile)=='aud')){
			var mtitle = $(this).attr('title');
			var playfile = "<li class='track'>"+mtitle+"</li>"
			$('#playlist').append(playfile);
			playlist.push(mfile);
		};
	});
	return(playlist);
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
		var ext = dvdfile[dvdfile.length-1];
		if ($.inArray(ext, pictures) != -1){
			return 'pic';
		}
		else if ($.inArray(ext, videos) != -1){
			return 'vid';
		}
		else if ($.inArray(ext,docfile) != -1){
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

jQuery.fn.imageview = function(options){
	var opts = $.extend({}, $.fn.imageview.defaults, options);
	
	var imgsrc = opts.src;
	var img = "<img class='image ui-widget' src='"+imgsrc+"'></img>";
	var imgbox = "<div class='imageviewer'>";
	imgbox += img+"</div>";
	imgbox += "<style type='text/stylesheet'>"
	imgbox += "div.imageviewer {display: block; width: 150em;";
	imgbox += "height: 100em; background: #e4e4e43;";
	imgbox += "}</style>";
	this.append(imgbox);
	return this;
}

jQuery.fn.docviewer = function(options){
	var opts = $.extend({}, $.fn.docviewer.defaults, options);
	
	var docsrc = opts.src;
	var doc = "<object class='doc' data='"+docsrc+"'></object>";
	var docbox = "<div class='docviewer'>";
	docbox += doc+"</div>";
	docbox += "<style type='text/stylesheet'>"
	docbox += "div.docviewer {display: block; width: 150em;";
	docbox += "height: 100em; background: #e4e4e43;";
	docbox += "}</style>";
	this.append(docbox);
	return this;
};

jQuery.fn.mplayer = function(options){
	var opts = $.extend({}, $.fn.mplayer.defaults, options);
	
	var audsrc = opts.src;
	var audplayer = new Audio();
	audplayer.src = audsrc;
	audplayer.play();
}


function openimage(fname, ffname){
	$('.viewbox').html("<script type='text/javascript'>$('.viewbox').imageview({});</script>");
	$('.image').attr('src',ffname);
	$('li.title').text(fname);
	$('.closebutton').on('click', function(){
		$('.viewer').hide();
	});
	$('div.viewer').css('display', 'block');
	$('.imageviewer').show();
}

function viewdoc(fname, ffname){
	$('.viewbox').html("<script type='text/javascript'>$('.viewbox').docviewer({});</script>");
	$('.doc').attr('data',ffname);
	$('li.title').text(fname);
	$('.closebutton').on('click', function(){
		$('.viewer').hide();
	});
	$('div.viewer').css('display', 'block');
	$('.docviewer').show();
}



function playmusic(ffname, fname){
	$('.player').show();
	var player = $('audio')[0];
	player.src = ffname;
	player.play();
	var playlist = getplaylist();
	var mcount = 0
	$('.playpause').attr('src','static/images/pause.ico');
	$('.albumart').attr('src', 'static/images/speaker.gif');
	$('.musicname').text(fname);
	player.addEventListener('timeupdate',function(){
		if (player.currentTime == player.duration){
			if($('li.repeat').hasClass('on')){
				player.play();
			}
			else if (playlist.length > 1){
				mcount += 1;
				playnext(playlist, player, mcount);
			}
			else {
			$('#player').hide();
			};
		};
	});
	
	$('li.play').on('click',function(){
		if ((player.paused)==true){
			player.play();
			$('.playpause').attr('src','static/images/pause.ico');
			$('.albumart').attr('src', 'static/images/speaker.gif');
		}else {
			player.pause();
			$('.playpause').attr('src','static/images/play.gif');
		};
	});
	
	$('li.repeat').on('click', function(){
		if ($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).css('background','whiteSmoke');
		}else{
			$('.repeat').addClass('on');
		};
	});
	
	$('li.shuffle').on('click',function(){
		if ($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).css('background','whiteSmoke');
		}else {
			$('li.shuffle').addClass('on');
		};
	});
	
	$('li.next').on('click', function(){
		mcount += 1;
		playnext(playlist, player, mcount);
	});	
	
	$('.playlist').on('click',function(){
		if ($('#playlist').hasClass('shown')){
			$('#playlist').removeClass('shown');
			$('#playlist').hide();
		}else {
			$('#playlist').addClass('shown');
			$('#playlist').show();
		};
	});
	
	$('.track').on('click',function(){
		var track = $(this).text()
		$.each(playlist,function(i){
			var tb = playlist[i]
			var tc = tb.split('/');
			var tn = tc[tc.length-1];
			
			if (tn == track){
				$('.musicname').text(track);
				player.src = tb;
				player.play();
			}
		});
	});
};

$(function(){
	$('ul#directory').on('dblclick','li.direc',function(e){
		var ffname = $(this).attr('alt');
		var fname = $(this).attr('title');
		ftype = checktype(fname);
		openfile(ftype,fname,ffname);
	});
});

jQuery.fn.imageview.defaults = {
	src : 'static/images/images.png'
}

jQuery.fn.mplayer.defaults = {
	src : ''
}

jQuery.fn.docviewer.defaults = {
	src : ''
}