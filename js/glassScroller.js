/*
	You need to define lensElement constant:
	E.g.: const lensElement = ".inner_lens";

	By default, container of lenses is window element (browser scroll).
	But you can point to another element. E.g.: const glassElement = '#glass'; 
	
*/


$(document).ready(function() {
	
	$glassIsWindow = false; 
	if (typeof (glassElement) === 'undefined') {
		glassElement = window;
	}
    
    
	function setGlassParameters(){
		if ($glassIsWindow || glassElement == window) {
			$glassContentHeight =  $(glassElement).innerHeight();
			$glassIsWindow = true;
		} else {
			$glassContentHeight = $(glassElement)[0].scrollHeight;
		}
		$glassHeight = $(glassElement).outerHeight();
		 
	}
	setGlassParameters();
	$( window ).resize(setGlassParameters);
    

    function scrollLenses(){
        $glassScroll = $(glassElement).scrollTop(); 
		
		$(lensElement).each(function() {
			$lensHeight = $(this).height();
			$lensPos = $(this).position().top;

			if ($glassIsWindow){
				$lensAbsPos = $(this).offset().top;
			} else {
				$lensAbsPos = $lensPos + $glassScroll;
			}
			
			$lensContentHeight = $(this).children().first().innerHeight();

			$lensScrollStart = $lensAbsPos - $glassHeight;
			$lensScrollStart = ($lensScrollStart + Math.abs($lensScrollStart)) / 2; // Convert any negative values to 0

			$lensScrollEnd = $glassContentHeight - ($lensAbsPos + $lensHeight) - $glassHeight;
			$lensScrollEnd = ($lensScrollEnd - Math.abs($lensScrollEnd)) / 2 // Convert any positive values to 0
			$lensScrollEnd = $lensHeight + $lensScrollEnd + $lensAbsPos;

		    $lensScrollLength = $lensScrollEnd - $lensScrollStart;
		    $lensScrollAmount = $glassScroll - $lensScrollStart;


		    $lensScrollAmountPercent = $lensScrollAmount / $lensScrollLength;  
		   	$lensScrollContentPx = $lensContentHeight * $lensScrollAmountPercent; 
		    
		    $(this).scrollTop($lensScrollContentPx);
		    
		});
    }
    scrollLenses();
	$(glassElement).scroll(scrollLenses);
});


