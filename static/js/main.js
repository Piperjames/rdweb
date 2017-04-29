

$(function(){
	$('.viewer').hide();
	$('.player').hide();
	$('ul#directory').on('click','li.direc',function(){
		$('li.direc').removeClass('selected');
		$(this).addClass('selected');
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
});