var socket = io.connect();
var curr = 1;
var timer;
var userID;

socket.on('ID_res', function(n){
	userID = n;
	console.log('my ID is ' + n );
	$('title').text('#' + userID + ' SocialAR proprototype');
});

// press enter : the list fade IN 
// (only work when there's nothing on the screen)
socket.on('start_c', function(dest, list) {
	if( dest == userID ) {
		// if( curr > 7 ) {
	    	for (var i = 1; i <= 7; i++) {
	    		var w = ".word[name=w" + i + "]"; 
	    		$(w).text( list[i-1] );
	    		$(w).fadeTo(1000, 1);
	    	}
	    	curr = 1;
	    // }
		$('#l1').fadeIn(1000);

		timer = setTimeout( 'fadeWord()', 4000 );
	}

});

// press space : a word fade OUT
socket.on('click_c', function(dest) {
	//if( dest != userID ) break;
	fadeWord();
});

function fadeWord() {
	clearTimeout(timer);
	if( curr > 7 ) return;
	var w = ".word[name=w" + curr + "]"; 
	socket.emit('fade_word', curr);
	$(w).fadeTo(1000, 0);
	curr += 1;
	timer = setTimeout( 'fadeWord()', 4000 );
	return;
}