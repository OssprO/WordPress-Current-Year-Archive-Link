/**
 * Handle the custom post type nav menu meta box
 */
jQuery( document ).ready( function($) {
     $( '#submit-current-year-archives' ).click( function( event ) {
		event.preventDefault();
		
		var $cyear_list_items = $( '#' + cyear_obj.metabox_list_id + ' li :checked' );
		var $cyear_submit = $( 'input#submit-current-year-archives' );

		console.log(cyear_obj.ajaxurl);

		// Get checked boxes
		var years = [];
		$cyear_list_items.each( function() {
			years.push( $( this ).val() );
		} );
		
		// Show spinner
		$( '#' + cyear_obj.metabox_id ).find('.spinner').show();
		
		// Disable button
		$cyear_submit.prop( 'disabled', true );

		// Send checked post types with our action, and nonce
		$.post( cyear_obj.ajaxurl, {
				action: cyear_obj.action,
				posttypearchive_nonce: cyear_obj.nonce,
				years: years,
				nonce: cyear_obj.nonce
			},

			// AJAX returns html to add to the menu, hide spinner, remove checks
			function( response ) {
				$( '#menu-to-edit' ).append( response );
				$( '#' + cyear_obj.metabox_id ).find('.spinner').hide();
				$cyear_list_items.prop("checked", false);
				$cyear_submit.prop( 'disabled', false );
			}
		);
	} );
} );
