var socket = io.connect();
var curr = 1;
var timer;

// press enter : the list fade IN 
// (only work when there's nothing on the screen)
socket.on('start', function(e) {

	if( curr > 7 ) {
    	for (var i = 1; i <= 7; i++) {
    		var w = ".word[name=w" + i + "]"; 
    		$(w).fadeTo(1000, 1);
    	}
    	curr = 1;
    }
	else $('#l1').fadeIn(1000);

	timer = setTimeout( 'fadeWord()', 4000 );

});

// press space : a word fade OUT
socket.on('click', function(data) {
	fadeWord();
});

function fadeWord() {
	clearTimeout(timer);
	if( curr > 7 ) return;
	var w = ".word[name=w" + curr + "]"; 
	$(w).fadeTo(1000, 0);
	curr += 1;
	timer = setTimeout( 'fadeWord()', 4000 );
	return;
}