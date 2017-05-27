var curr = 1;

$(document).keyup(function (e){

	// press enter : the list fade IN
    if( e.which === 13 ) { 
    	if( curr > 7 ) {
    		$('#l1').hide();
	    	for (var i = 1; i <= 7; i++) {
	    		var w = ".word[name=w" + i + "]"; 
	    		$(w).show();
	    	}
	    }
    	curr = 1;
    	$('#l1').fadeIn(1000);
    }

    // press space : a word fade OUT
    else if( e.which === 32 ) {
    	if( curr > 7 ) return;
    	var w = ".word[name=w" + curr + "]"; 
    	$(w).fadeOut(1000);
    	curr += 1;
    }

});