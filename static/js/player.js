
function musicplayer(){
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
};

$(function(){
	musicplayer()
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
		alert('hello');
	});
});