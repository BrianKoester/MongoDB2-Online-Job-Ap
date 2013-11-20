/***
* Client Side JS
***/

$(function(){

	// hide 'submit' message
	$('#success-message').hide();

	// accept info from form on 'sumbit' button click
	$("#application-form").submit(function(e) {
		e.preventDefault();

		var formData = $('#application-form').serialize();

		$.post('/applicant', formData, function(data) {
			//Delay works with queued / animated methods such as fadeIn / fadeOut
			$('#success-message').fadeIn().delay(3000).fadeOut();

		});

		// clears input fields for new applicant info
		$("#application-form").find('input[type="text"], input[type="number"], textarea').val('');

	});


	// delete applicant from applicants.jade view (multiple applicants)
	$('.delete-btn').click(function(e) {
		e.preventDefault();

		var deleteApplicant = $(this).closest('.applicant-div').children('li:first-child').data('name');
		var response = confirm('Are you sure you want to delete ' + deleteApplicant + '?');

		if (response) {
			$.post('/delete', {name: deleteApplicant}, function(data) {
			});
			
			//This removes the applicant div
			$(this).closest('.applicant-div').remove();
		}
	});


	// delete applicant from applicant.jade view (single applicant)
	$('.delete-btn-applicant').click(function(e) {
		e.preventDefault();

		var deleteApplicant = $("h1").data('name');
		var response = confirm('Are you sure you want to delete ' + deleteApplicant + '?');

		if (response) {
			$.post('/delete', {name: deleteApplicant}, function(data) {
				window.location.href = '/applicants';
			});

			//This removes the applicant div
			$(this).closest('.container').remove();
		}
	});


});