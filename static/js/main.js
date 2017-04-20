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
<<<<<<< HEAD
		$('input.fofname').attr('value',ffname);
=======
		$('.fofname').value(ffname);
>>>>>>> 7146f648e544bc31797820a14b1025b7d0b0e88a
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
	$('li.direc').each(function(){
		var mfile = $(this).attr('alt');
		if ((checktype(mfile)=='aud')){
			var mtitle = $(this).attr('title');
			var playfile = "<li class='track'>"+mtitle+"</li>"
			$('#playlist').append(playfile);
			playlist.push($(this).attr('mfile'));
		};
		
	});
	return(playlist);
};

function playmusic(ffname,fname){
	var container = "<div id='player'>";
	container += "<div class='topbar'>";
	container += "<div class='musicname'>";
	container += "<h3>";
	container += "</h3>";
	container += "</div>";
	container += "</div>";
	container += "<div class='board'>"
	container += "<div id='album' class='album parts'>"
	container += "<img src='static/images/albumart.jpg' class='albumart'>"
	container += "</div>"
	container += "<div class='dboard parts'>"
	container += "<div id='controls'>"
	container += "<ul>"
	container += "<li class='cbutton prev ui-button'><img src='static/images/previous.gif'/></li>"
	container += "<li class='cbutton play ui-button'><img class='playpause' src='static/images/play.gif'/></li>"
	container += "<li class='cbutton next ui-button'><img src='static/images/next.gif'/></li>"
	container += "<li class='cbutton repeat ui-button'><img src='static/images/repeat.png'/></li>"
	container += "<li class='cbutton shuffle ui-button'><img src='static/images/shuffle.png'/></li>"
	container += "<li class='cbutton playlist ui-button'><img src='static/images/playlist.png'/></li>"
	container += "</ul>"
	container += "</div>"
	container += "</div>"
	container += "<ol id='playlist'>"
	container += "</ol>"
	container += "<audio>";
	container += "</audio>";
	container += "</div>";
	
	$('section').append(container);
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

function openimage(fname, ffname){
	var container = "<div class='viewer'>";
	container += "<ul class='titlebar'>";
	container += "<li class='title'>Desktop</li>";
	container += "<li class='closebutton ui-button'>x<li>";
	container += "<li class='minbutton ui-button'>-</li>";
	container += "</ul>";
	container += "<div class='viewbox' id='viewbox'>";
	container += "<script type='text/javascript'>";
	container += "</script>";
	container += "</div>";
	container += "</div>";
	
	$('section').append(container);
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
	var container = "<div class='viewer'>";
	container += "<ul class='titlebar'>";
	container += "<li class='title'>Desktop</li>";
	container += "<li class='closebutton ui-button'>x<li>";
	container += "<li class='minbutton ui-button'>-</li>";
	container += "</ul>";
	container += "<div class='viewbox' id='viewbox'>";
	container += "</div>";
	container += "</div>";
	
	$('section').append(container);
	$('.viewbox').html("<script type='text/javascript'>$('.viewbox').docviewer({});</script>");
	$('.doc').attr('data',ffname);
	$('li.title').text(fname);
	$('.closebutton').on('click', function(){
		$('.viewer').hide();
	});
	$('div.viewer').css('display', 'block');
	$('.docviewer').show();
}

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

$(function(){
	$('.viewer').hide();
	$('ul#directory').on('click','li.direc',function(){
		$('li.direc').removeClass('selected');
		$(this).addClass('selected');
	});
	$('ul#directory').on('dblclick','li.direc',function(e){
		var ffname = $(this).attr('alt');
		var fname = $(this).attr('title');
		ftype = checktype(fname);
		openfile(ftype,fname,ffname);
	});
	$('.predir').click(function(){
		$.get('goback',function(data){
			$('ul#directory').html(data);
		});
	});
	$('.permalink').click(function(){
		if ($(this).hasClass('onboard')){
			
		}else if ($(this).hasClass('apps')){
			
		}else {
			ffname = $(this).attr('alt');
			openfolder(ffname);
		};
	});
	
	$('.playlist').on('click',function(){
		alert('hello');
	});
});

jQuery.fn.imageview.defaults = {
	src : 'static/images/images.png'
}

jQuery.fn.mplayer.defaults = {
	src : ''
}
<<<<<<< HEAD

jQuery.fn.docviewer.defaults = {
	src : ''
}
=======
>>>>>>> 7146f648e544bc31797820a14b1025b7d0b0e88a
