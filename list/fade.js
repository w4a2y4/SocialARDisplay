var curr = 1;
var timer;

$(document).keyup(function (e){

	// press enter : the list fade IN 
	// (only work when there's nothing on the screen)
    if( e.which === 13 ) { 

    	if( curr > 7 ) {
	    	for (var i = 1; i <= 7; i++) {
	    		var w = ".word[name=w" + i + "]"; 
	    		$(w).fadeTo(1000, 1);
	    	}
	    	curr = 1;
	    }
    	else $('#l1').fadeIn(1000);

    	timer = setTimeout( 'fadeWord()', 4000 );

    }

    // press space : a word fade OUT
    else if( e.which === 32 ) {
    	fadeWord();
    }

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
