(function ($) {
	var myNewUserForm = $("#new-user-form"),
		newUserName = $("#new-username"),
		newPassword = $("#new-password"),
		newConfirmPassword = $("#confirm-password"),
		formAlert = $("#form-alert"),
		idHidden = $("#idHidden"),
		singlenote = $("#singlenote-form");

		idHidden.hide();

	myNewUserForm.submit(function (event) {
		event.preventDefault();

		console.log("I'm here");

		var username = newUserName.val();
		var newDue = newNoteDue.val();
		var newSummary = newNoteSummary.val();
		var newBody = newNoteBody.val();
		var newContent = $("#new-content");

		console.log(newTitle);
		console.log(newDue);
		console.log(newSummary);
		console.log(newBody);

		// reset the form
        formAlert.addClass('hidden');
        formAlert.text('');
        
		if (!newTitle) {
            formAlert.text('You must provide a note title');
            formAlert.removeClass('hidden');
        }
        else if (!newDue) {
            formAlert.text('You must provide a due date');
            formAlert.removeClass('hidden');
        }
        else if (!newSummary) {
            formAlert.text('You must provide a brief summary');
            formAlert.removeClass('hidden');
        }
        else if (!newBody) {
            formAlert.text('You must provide the note body');
            formAlert.removeClass('hidden');
        }

        if(newTitle&&newDue&&newSummary&&newBody){
			var requestConfig = {
				method: "POST",
				url: "/new/newTitle",
				contentType: 'application/json',
				data: JSON.stringify({
					title: newTitle,
					dueDate: newDue,
					summary: newSummary,
					body: newBody,
				})
			};

			$.ajax(requestConfig).then(function (responseMessage){
				console.log(responseMessage.success);
				if(responseMessage.success==true){
					JSON.stringify(responseMessage);
					window.location.href = "/"+responseMessage.message;
				}
				if (responseMessege.success == false) {
    				alert(responseMessege.message);
    			}
				newContent.html(responseMessage.message);
			});
		}
	});
	
	$("#next-note").click(function (event){
		event.preventDefault();
		var nextId = parseInt(idHidden.text());
		var requestConfig = {
				method: "GET",
				url: "/next/"+""+nextId
			};

		$.ajax(requestConfig).then(function (responseMessage) {
			singlenote.html("<h2>Next due date: " + responseMessage.message+"</h2>");
		});
	});
})(window.jQuery);